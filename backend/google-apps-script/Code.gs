/**
 * ============================================================================
 * Toolora Feedback Backend — Google Apps Script Web App
 * ============================================================================
 * Production backend script for processing Toolora feedback submissions
 * and appending records to a private Google Sheet.
 *
 * Supported Request Handlers:
 * - doGet(e): Returns a clean health/status check ("Status: Online")
 * - doPost(e): Processes feedback form POSTs via hidden iframe
 *
 * Architecture Highlights:
 * - Listens for standard HTML form POSTs via hidden iframe target.
 * - Requires no cross-origin fetch(), CORS headers, or custom headers.
 * - Dispatches a secure postMessage to https://toolorahub.vercel.app.
 * - Protects against CSV/Formula Injection (CWE-1236).
 * - Ignores spam via a silent honeypot field ("website").
 * - Minimizes race conditions with LockService.
 * - Zero external dependencies, zero email sending, zero secrets in responses.
 */

// Configuration constants
var CONFIG = {
  SPREADSHEET_ID: '1OooXa3cnIQgRJuA8kHn1kGmgQuhxKQdUYUmtjD4RvDA',
  SHEET_NAME: 'Toolora Feedback',
  ALLOWED_ORIGIN: 'https://toolorahub.vercel.app',
  LOCK_TIMEOUT_MS: 15000,
  MESSAGE_TYPE: 'TOOLORA_FEEDBACK_RESULT',
  HEADERS: ['Timestamp', 'Name', 'Email', 'Topic', 'Message', 'Page']
};

/**
 * Handles incoming HTTP GET requests.
 * Returns a simple, secure HTML health/status page.
 * Does NOT expose the Spreadsheet ID, sheet data, account info, or secrets.
 *
 * @param {Object} e Event object passed by Apps Script runtime.
 * @return {HtmlOutput} Iframe-compatible HTML status page.
 */
function doGet(e) {
  var html = '<!DOCTYPE html>\n' +
    '<html>\n' +
    '<head>\n' +
    '  <meta charset="utf-8">\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
    '  <title>Toolora Feedback Service</title>\n' +
    '  <style>\n' +
    '    body {\n' +
    '      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n' +
    '      background: #f8fafc;\n' +
    '      color: #0f172a;\n' +
    '      display: flex;\n' +
    '      align-items: center;\n' +
    '      justify-content: center;\n' +
    '      min-height: 100vh;\n' +
    '      margin: 0;\n' +
    '      padding: 1.5rem;\n' +
    '      box-sizing: border-box;\n' +
    '    }\n' +
    '    .card {\n' +
    '      background: #ffffff;\n' +
    '      border: 1px solid #e2e8f0;\n' +
    '      border-radius: 1rem;\n' +
    '      padding: 2rem;\n' +
    '      max-width: 420px;\n' +
    '      width: 100%;\n' +
    '      box-shadow: 0 1px 3px rgba(0,0,0,0.05);\n' +
    '      text-align: center;\n' +
    '    }\n' +
    '    h1 {\n' +
    '      font-size: 1.25rem;\n' +
    '      font-weight: 700;\n' +
    '      margin: 0 0 0.75rem;\n' +
    '      color: #0f172a;\n' +
    '    }\n' +
    '    .badge {\n' +
    '      display: inline-flex;\n' +
    '      align-items: center;\n' +
    '      gap: 0.375rem;\n' +
    '      background: #ecfdf5;\n' +
    '      color: #047857;\n' +
    '      padding: 0.25rem 0.75rem;\n' +
    '      border-radius: 9999px;\n' +
    '      font-size: 0.75rem;\n' +
    '      font-weight: 600;\n' +
    '      margin-bottom: 1rem;\n' +
    '    }\n' +
    '    .dot {\n' +
    '      width: 0.5rem;\n' +
    '      height: 0.5rem;\n' +
    '      background: #10b981;\n' +
    '      border-radius: 9999px;\n' +
    '    }\n' +
    '    p {\n' +
    '      font-size: 0.875rem;\n' +
    '      color: #64748b;\n' +
    '      margin: 0;\n' +
    '      line-height: 1.5;\n' +
    '    }\n' +
    '  </style>\n' +
    '</head>\n' +
    '<body>\n' +
    '  <div class="card">\n' +
    '    <h1>Toolora Feedback Service</h1>\n' +
    '    <div class="badge"><span class="dot"></span>Status: Online</div>\n' +
    '    <p>The feedback service is active and operational. Submissions are received via HTTP POST.</p>\n' +
    '  </div>\n' +
    '</body>\n' +
    '</html>';

  var output = HtmlService.createHtmlOutput(html);
  output.setTitle('Toolora Feedback Service — Status: Online');
  // Iframe-compatible mode so it renders properly when requested inside an iframe
  output.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return output;
}

/**
 * Handles incoming HTTP POST requests from the HTML form inside the iframe.
 *
 * @param {Object} e Event object passed by Apps Script runtime.
 * @return {HtmlOutput} HTML document sending postMessage back to parent window.
 */
function doPost(e) {
  try {
    if (!e || !e.parameter) {
      console.warn('doPost invoked with empty or missing parameters');
      return createIframeResponse(false);
    }

    var params = e.parameter;

    // 1. Honeypot evaluation (blocks simple spam bots silently)
    var honeypot = params.website ? String(params.website).trim() : '';
    if (honeypot.length > 0) {
      console.info('Honeypot triggered; discarding submission without saving.');
      // Return benign success response so bots do not retry or adapt
      return createIframeResponse(true);
    }

    // 2. Validate input parameters
    var validation = validateAndSanitize(params);
    if (!validation.isValid) {
      console.warn('Submission validation failed:', validation.errorReason);
      return createIframeResponse(false);
    }

    // 3. Acquire script lock to prevent race conditions during concurrent writes
    var lock = LockService.getScriptLock();
    var hasLock = false;

    try {
      hasLock = lock.tryLock(CONFIG.LOCK_TIMEOUT_MS);
      if (!hasLock) {
        console.error('Lock timeout: Could not acquire script lock within ' + CONFIG.LOCK_TIMEOUT_MS + 'ms');
        return createIframeResponse(false);
      }

      // 4. Append row to Google Sheet
      var appendSuccess = appendRowToSheet(validation.row);
      if (!appendSuccess) {
        return createIframeResponse(false);
      }

      return createIframeResponse(true);
    } finally {
      if (hasLock) {
        lock.releaseLock();
      }
    }
  } catch (error) {
    // Log technical error securely in Google Cloud / Apps Script execution log
    console.error('Unhandled error in doPost:', error && error.stack ? error.stack : error);
    // Never expose stack trace or technical details to client
    return createIframeResponse(false);
  }
}

/**
 * Validates form parameters against business rules and sanitizes values
 * against Spreadsheet Formula Injection (CWE-1236).
 *
 * @param {Object} params Raw parameters from e.parameter.
 * @return {Object} Validation result { isValid: boolean, row: Array, errorReason?: string }
 */
function validateAndSanitize(params) {
  // --- Name (optional, max 100 chars) ---
  var rawName = params.name ? String(params.name).trim() : '';
  if (rawName.length > 100) {
    return { isValid: false, errorReason: 'Name exceeds 100 characters' };
  }

  // --- Email (optional, max 254 chars, basic format check if supplied) ---
  var rawEmail = params.email ? String(params.email).trim() : '';
  if (rawEmail.length > 254) {
    return { isValid: false, errorReason: 'Email exceeds 254 characters' };
  }
  if (rawEmail.length > 0) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(rawEmail)) {
      return { isValid: false, errorReason: 'Invalid email format' };
    }
  }

  // --- Topic (required, max 100 chars) ---
  var rawTopic = params.topic ? String(params.topic).trim() : '';
  if (rawTopic.length === 0) {
    return { isValid: false, errorReason: 'Topic is required' };
  }
  if (rawTopic.length > 100) {
    return { isValid: false, errorReason: 'Topic exceeds 100 characters' };
  }

  // --- Message (required, min 5 chars, max 5000 chars) ---
  var rawMessage = params.message ? String(params.message).trim() : '';
  if (rawMessage.length < 5) {
    return { isValid: false, errorReason: 'Message must be at least 5 characters' };
  }
  if (rawMessage.length > 5000) {
    return { isValid: false, errorReason: 'Message exceeds 5000 characters' };
  }

  // --- Page (optional, max 500 chars, basic URL/path validation) ---
  var rawPage = params.page ? String(params.page).trim() : '';
  if (rawPage.length > 500) {
    return { isValid: false, errorReason: 'Page URL exceeds 500 characters' };
  }
  if (rawPage.length > 0) {
    // Only accept reasonable URL or relative path strings
    var pageRegex = /^(https?:\/\/[^\s<>"']+|\/[^\s<>"']*)$/i;
    if (!pageRegex.test(rawPage)) {
      rawPage = ''; // Fallback to empty if unexpected format, but do not block legitimate feedback
    }
  }

  // --- Server-side UTC Timestamp ---
  var timestamp = new Date().toISOString();

  // --- Spreadsheet Formula Injection Defense (CWE-1236) ---
  var cleanName = sanitizeSpreadsheetValue(rawName);
  var cleanEmail = sanitizeSpreadsheetValue(rawEmail);
  var cleanTopic = sanitizeSpreadsheetValue(rawTopic);
  var cleanMessage = sanitizeSpreadsheetValue(rawMessage);
  var cleanPage = sanitizeSpreadsheetValue(rawPage);

  var row = [
    timestamp,
    cleanName,
    cleanEmail,
    cleanTopic,
    cleanMessage,
    cleanPage
  ];

  return {
    isValid: true,
    row: row
  };
}

/**
 * Prevents CSV/Spreadsheet formula injection.
 * If a value starts with '=', '+', '-', or '@', prepends a single apostrophe (')
 * so Google Sheets stores and displays it as a plain text string literal.
 *
 * @param {string} value String to sanitize.
 * @return {string} Sanitized string safe for spreadsheet insertion.
 */
function sanitizeSpreadsheetValue(value) {
  if (!value || typeof value !== 'string') {
    return '';
  }
  var trimmed = value.trim();
  if (trimmed.length === 0) {
    return '';
  }
  // Formula execution triggers in Google Sheets
  if (/^[=+\-@]/.test(trimmed)) {
    return "'" + trimmed;
  }
  return trimmed;
}

/**
 * Opens the target spreadsheet by ID, verifies tab existence, and appends the row.
 * Creates the header row automatically if the sheet is completely empty.
 *
 * @param {Array} rowValues The sanitized row values to append.
 * @return {boolean} True if write succeeded, false otherwise.
 */
function appendRowToSheet(rowValues) {
  try {
    var spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    if (!spreadsheet) {
      console.error('Could not open spreadsheet with ID:', CONFIG.SPREADSHEET_ID);
      return false;
    }

    var sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
    if (!sheet) {
      console.error('Target sheet tab not found:', CONFIG.SHEET_NAME);
      return false;
    }

    // Auto-initialize header row if sheet is fresh/empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(CONFIG.HEADERS);
    }

    sheet.appendRow(rowValues);
    return true;
  } catch (err) {
    console.error('Error writing to spreadsheet:', err && err.stack ? err.stack : err);
    return false;
  }
}

/**
 * Creates the minimal HTML document rendered inside the hidden iframe.
 * Dispatches a postMessage to parent window strictly scoped to CONFIG.ALLOWED_ORIGIN.
 *
 * @param {boolean} success Whether the submission was processed successfully.
 * @return {HtmlOutput} Minimal HTML document with postMessage invocation.
 */
function createIframeResponse(success) {
  var payload = {
    type: CONFIG.MESSAGE_TYPE,
    success: Boolean(success)
  };

  var payloadJson = JSON.stringify(payload);
  var targetOrigin = CONFIG.ALLOWED_ORIGIN;

  var html = '<!DOCTYPE html>\n' +
    '<html>\n' +
    '<head>\n' +
    '  <meta charset="utf-8">\n' +
    '  <title>Toolora Feedback Handler</title>\n' +
    '</head>\n' +
    '<body>\n' +
    '  <script>\n' +
    '    (function() {\n' +
    '      try {\n' +
    '        var targetOrigin = ' + JSON.stringify(targetOrigin) + ';\n' +
    '        var payload = ' + payloadJson + ';\n' +
    '        if (window.parent && window.parent !== window) {\n' +
    '          window.parent.postMessage(payload, targetOrigin);\n' +
    '        }\n' +
    '      } catch (e) {\n' +
    '        // Silently swallow error\n' +
    '      }\n' +
    '    })();\n' +
    '  </script>\n' +
    '</body>\n' +
    '</html>';

  var output = HtmlService.createHtmlOutput(html);
  // Required so the hidden iframe embedded in toolorahub.vercel.app can render this response
  output.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return output;
}
