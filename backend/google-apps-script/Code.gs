/**
 * ============================================================================
 * Toolora Feedback Backend — Google Apps Script Web App
 * ============================================================================
 * Production backend script for processing Toolora feedback submissions
 * and appending records to a private Google Sheet.
 *
 * Architecture Highlights:
 * - Listens for standard HTML form POSTs via hidden iframe target.
 * - Requires no cross-origin fetch(), CORS headers, or custom headers.
 * - Dispatches a secure postMessage to https://toolorahub.vercel.app.
 * - Protects against CSV/Formula Injection (CWE-1236).
 * - Ignores spam via a silent honeypot field.
 * - Minimizes race conditions with LockService.
 * - Zero external dependencies, zero email sending, zero secrets in response.
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
 * Handles incoming HTTP GET requests. Returns a benign status message only.
 * Never exposes sheet contents, account details, or configuration secrets.
 *
 * @param {Object} e Event object.
 * @return {HtmlOutput} Harmless status page.
 */
function doGet(e) {
  var html = '<!DOCTYPE html><html><head><meta charset="utf-8">' +
    '<title>Toolora Feedback Service</title>' +
    '<style>body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;padding:3rem;color:#1e293b;line-height:1.5;max-width:600px;margin:auto;}h1{font-size:1.25rem;color:#0f172a;}p{color:#64748b;font-size:0.875rem;}</style>' +
    '</head><body>' +
    '<h1>Toolora Feedback Service</h1>' +
    '<p>Service is active and operational. Submissions are accepted via HTTP POST.</p>' +
    '</body></html>';

  var output = HtmlService.createHtmlOutput(html);
  output.setTitle('Toolora Feedback Service');
  return output;
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
