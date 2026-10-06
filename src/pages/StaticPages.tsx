import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEO } from '../components/common/SEO';
import { ShieldCheck, Mail, CheckCircle2, Lock, Zap, AlertCircle, Copy, Check, ExternalLink, ArrowLeft } from 'lucide-react';
import { SITE_URL } from '../config/site';

const getStaticBreadcrumbSchema = (name: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${SITE_URL}/`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name,
      item: `${SITE_URL}${path}`,
    },
  ],
});

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <SEO
        title="About Toolora — Our Mission and Privacy-First Approach"
        description="Learn about Toolora: a suite of fast, free, client-side utility tools for images, math, and everyday tasks with in-browser processing."
        canonicalPath="/about"
        schema={getStaticBreadcrumbSchema('About Toolora', '/about')}
      />

      <Breadcrumbs items={[{ label: 'About Toolora' }]} />

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About Toolora
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Simple, fast, free tools for everyday tasks. Built to prioritize client-side execution and eliminate unnecessary barriers.
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
        <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Our Mission</h2>
          <p>
            The internet was intended to empower people with accessible utilities. Yet today, basic everyday tasks like resizing an image, calculating a GPA, or converting a file format are frequently blocked behind account registrations, monthly subscription paywalls, and invasive trackers.
          </p>
          <p>
            <strong>Toolora</strong> provides an honest, open alternative: a clean, fast suite of utility tools that anyone can use directly in their browser without registering, entering a credit card, or waiting on remote queues.
          </p>
        </div>

        <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900">How It Works: In-Browser Client-Side Processing</h2>
          <p>
            Rather than sending your images, documents, and calculation inputs to remote servers for processing, Toolora leverages standard web APIs including the <strong>HTML5 Canvas API</strong>, <strong>Web Audio API</strong>, and modern JavaScript engines.
          </p>
          <p>
            When you compress an image, convert a graphic format, or compile a PDF, your device CPU and browser process the file directly in local memory. Files processed through our tools are not uploaded to Toolora servers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-5 bg-white rounded-xl border border-slate-200/90 text-center shadow-2xs">
            <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-semibold text-slate-900 text-sm">Client-Side Processing</h3>
            <p className="text-xs text-slate-500 mt-1">Tools run locally in browser memory without server file uploads.</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-slate-200/90 text-center shadow-2xs">
            <Zap className="w-6 h-6 text-amber-500 mx-auto mb-2" />
            <h3 className="font-semibold text-slate-900 text-sm">Instant Execution</h3>
            <p className="text-xs text-slate-500 mt-1">No queues or network upload lag. Immediate local results.</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-slate-200/90 text-center shadow-2xs">
            <Lock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-slate-900 text-sm">No Accounts Required</h3>
            <p className="text-xs text-slate-500 mt-1">No registration, passwords, or logins required to use the tools.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <SEO
        title="Privacy Policy — Toolora"
        description="Read the Toolora Privacy Policy. Learn about client-side tool processing, local storage, hosting logs, and advertising disclosures."
        canonicalPath="/privacy"
        schema={getStaticBreadcrumbSchema('Privacy Policy', '/privacy')}
      />

      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">Effective Date: October 2026</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed shadow-xs">
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-emerald-950 text-xs sm:text-sm">
            <strong>Client-Side Tool Processing:</strong> Toolora does not upload your photos, documents, or calculation inputs to remote servers. All tool operations run locally in your browser memory.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">1. Tool File & Data Handling</h2>
          <p>
            When you use our utilities (such as Image Compressor, PDF Merge, GPA Calculator, or Text Formatter), your files and text inputs are loaded into local browser memory. Toolora operates no server-side file processing infrastructure; your files and calculation inputs are not uploaded to our servers.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">2. Local Storage Usage</h2>
          <p>
            Certain convenience tools (such as the GPA Calculator) store data within your browser's local storage (LocalStorage) on your device so your coursework entries remain available across visits. This data is stored strictly on your local device and is not synchronized to any server. You can remove it at any time by clearing your browser cache and local storage.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">3. Hosting & Web Server Logs</h2>
          <p>
            Like virtually all websites, when you visit Toolora, our web hosting provider (such as Vercel) receives and records standard technical connection data. This may include your IP address, browser type, operating system, referring URL, and the date and time of page requests. This data is processed by the hosting provider to deliver web assets and protect against cyberattacks and abuse.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">4. Third-Party Web Assets & Fonts</h2>
          <p>
            Our web pages load typography from Google Fonts. When your browser fetches these font stylesheets and font files, standard network requests are made to Google's content delivery servers in accordance with Google's privacy policies.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">5. Advertising & Cookies</h2>
          <p>
            Toolora may display advertisements served by third-party advertising partners (such as Google AdSense). These third-party vendors may use cookies, web beacons, or unique device identifiers to serve ads based on prior visits to this or other websites. Users may opt out of personalized advertising by visiting Google Ads Settings or www.aboutads.info.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">6. Communications & Contact Inquiries</h2>
          <p>
            Toolora does not operate a server-side message collection backend. Contact submissions are prepared as email drafts addressed to support@toolora.com. Any correspondence you choose to send directly via email is used solely to respond to your technical questions, bug reports, or feature suggestions.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">7. Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to accurately reflect technical changes or legal standards. The effective date at the top indicates the most recent revision.
          </p>
        </div>
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <SEO
        title="Terms of Service — Toolora"
        description="Toolora Terms of Service. Understand the terms, permissions, and conditions governing the free use of our client-side web tools."
        canonicalPath="/terms"
        schema={getStaticBreadcrumbSchema('Terms of Service', '/terms')}
      />

      <Breadcrumbs items={[{ label: 'Terms of Service' }]} />

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-400">Effective Date: October 2026</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Toolora, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, you should discontinue using the website and its utilities.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">2. Free Use License</h2>
          <p>
            Toolora grants you a free, non-exclusive, revocable license to utilize our browser-based tools for personal, educational, creative, and commercial projects without subscription fees.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">3. User Responsibility & Content Rights</h2>
          <p>
            You retain full ownership of all images, documents, and text processed through our tools. You are solely responsible for ensuring you possess the necessary legal rights or copyright permissions for any materials you process.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">4. Availability & Modifications</h2>
          <p>
            While we strive for continuous availability, our utilities are provided on an "as is" and "as available" basis without warranty of any kind. We reserve the right to update or enhance tools at any time.
          </p>
        </div>
      </div>
    </div>
  );
}

export function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <SEO
        title="Disclaimer — Toolora"
        description="Legal and operational disclaimer for Toolora calculations, conversions, and client-side utilities."
        canonicalPath="/disclaimer"
        schema={getStaticBreadcrumbSchema('Disclaimer', '/disclaimer')}
      />

      <Breadcrumbs items={[{ label: 'Disclaimer' }]} />

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Legal & Operational Disclaimer
        </h1>
        <p className="text-xs text-slate-400">Effective Date: October 2026</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">1. Educational & General Utility Only</h2>
          <p>
            All calculations and conversions provided by Toolora (including Percentage Calculator, GPA Calculator, and Unit Converter) are offered for general informational and educational convenience. While formulas are mathematically validated, users should confirm critical grades or technical figures with their respective academic institutions or certified regulatory bodies.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">2. Hardware & Device Performance</h2>
          <p>
            Because all processing executes client-side on your local machine, performance, processing speed, and file handling capabilities depend entirely upon your device hardware, available RAM, and browser software version.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">3. Limitation of Liability</h2>
          <p>
            Under no circumstances shall Toolora or its operators be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our free utilities.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Tool Suggestion');
  const [message, setMessage] = useState('');

  // Drafted state - shown after user clicks to draft/open in email client
  const [draftPrepared, setDraftPrepared] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState('');
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Field-specific validation errors for accessibility
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const validate = (): boolean => {
    const errors: { name?: string; email?: string; message?: string } = {};

    if (!name.trim()) {
      errors.name = 'Please enter your name.';
    }

    if (!email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    if (!message.trim()) {
      errors.message = 'Please enter your feedback or suggestion message.';
    } else if (message.trim().length < 5) {
      errors.message = 'Please enter a slightly more detailed message (at least 5 characters).';
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setGeneralError('Please correct the highlighted fields before proceeding.');
      return false;
    }

    setGeneralError(null);
    return true;
  };

  const getFullDraftBody = () => {
    return `Name: ${name.trim()}\nEmail: ${email.trim()}\nTopic: ${subject}\n\nMessage:\n${message.trim()}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const emailSubject = `[Toolora] ${subject} from ${name.trim()}`;
    const emailBody = getFullDraftBody();
    const mailto = `mailto:support@toolora.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    setMailtoUrl(mailto);
    setDraftPrepared(true);

    // Attempt to open email client safely via standard browser protocol
    try {
      window.location.href = mailto;
    } catch {
      // If browser blocks location change, the UI provides direct button & copy options
    }
  };

  const copyDraftToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getFullDraftBody());
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2500);
    } catch {
      // Fallback
    }
  };

  const copyEmailAddress = async () => {
    try {
      await navigator.clipboard.writeText('support@toolora.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <SEO
        title="Contact & Feedback — Toolora"
        description="Contact Toolora. Suggest new free tools, submit technical feedback, or reach our support team directly via email."
        canonicalPath="/contact"
        schema={getStaticBreadcrumbSchema('Contact & Feedback', '/contact')}
      />

      <Breadcrumbs items={[{ label: 'Contact & Feedback' }]} />

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Contact & Feedback
        </h1>
        <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
          Have an idea for a new free tool or noticed something that could be improved? We welcome your thoughts and technical feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          {draftPrepared ? (
            /* Honest State: Explains that message was drafted for email client, NOT server-delivered */
            <div className="space-y-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-blue-950 space-y-1">
                  <h2 className="font-bold text-sm text-blue-900">Email Draft Prepared</h2>
                  <p className="text-slate-700 leading-relaxed">
                    Toolora operates as a client-side application without a message-handling backend server. We have generated an email draft addressed to <strong>support@toolora.com</strong> in your default mail application.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200">
                  <span className="font-semibold text-slate-700">Draft Summary</span>
                  <span>To: support@toolora.com</span>
                </div>
                <div className="text-xs font-mono bg-white p-3 rounded-lg border border-slate-200 text-slate-800 whitespace-pre-wrap break-words max-h-48 overflow-y-auto">
                  {getFullDraftBody()}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={mailtoUrl}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-xs"
                >
                  <ExternalLink className="w-4 h-4" />
                  Launch Email Client Again
                </a>

                <button
                  type="button"
                  onClick={copyDraftToClipboard}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  {copiedDraft ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      Draft Copied to Clipboard
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-500" />
                      Copy Draft Text
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setDraftPrepared(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Edit Form Inputs
                </button>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                If your device does not have a desktop email client configured (e.g. if you use browser webmail), simply click <strong>Copy Draft Text</strong> and paste it into a new email sent to <strong>support@toolora.com</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {generalError && (
                <div
                  role="alert"
                  className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{generalError}</span>
                </div>
              )}

              {/* Topic / Category */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Feedback Topic
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="Tool Suggestion">Suggest a New Free Tool</option>
                  <option value="Bug Report">Bug Report / Technical Issue</option>
                  <option value="General Feedback">General Feedback</option>
                  <option value="Privacy Question">Privacy or Data Question</option>
                  <option value="Other">Other Inquiry</option>
                </select>
              </div>

              {/* Name field */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Your Name <span className="text-rose-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (fieldErrors.name) {
                      setFieldErrors((prev) => ({ ...prev, name: undefined }));
                    }
                  }}
                  placeholder="e.g. Alex Johnson"
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 ${
                    fieldErrors.name
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                />
                {fieldErrors.name && (
                  <p id="contact-name-error" className="text-xs text-rose-600 mt-1" role="alert">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Your Email Address <span className="text-rose-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) {
                      setFieldErrors((prev) => ({ ...prev, email: undefined }));
                    }
                  }}
                  placeholder="alex@example.com"
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 ${
                    fieldErrors.email
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                />
                {fieldErrors.email && (
                  <p id="contact-email-error" className="text-xs text-rose-600 mt-1" role="alert">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Message field */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Feedback or Tool Suggestion <span className="text-rose-500" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  aria-required="true"
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (fieldErrors.message) {
                      setFieldErrors((prev) => ({ ...prev, message: undefined }));
                    }
                  }}
                  placeholder="Describe your suggestion or technical feedback..."
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 ${
                    fieldErrors.message
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                />
                {fieldErrors.message && (
                  <p id="contact-message-error" className="text-xs text-rose-600 mt-1" role="alert">
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              {/* Honest delivery explanation */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-800">How Delivery Works: </span>
                Toolora runs client-side with no centralized message database. Clicking below formats an email draft addressed to <strong>support@toolora.com</strong> in your default mail application.
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-xs inline-flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Compose in Email Client
              </button>
            </form>
          )}
        </div>

        {/* Sidebar / Direct Contact */}
        <div className="space-y-4">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h2 className="font-bold text-slate-900 text-sm">Direct Email</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prefer writing directly from your email client or webmail? Reach our team anytime at:
            </p>
            <div className="pt-1">
              <a
                href="mailto:support@toolora.com"
                className="text-xs font-semibold text-blue-600 hover:underline break-all flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                support@toolora.com
              </a>
            </div>
            <button
              type="button"
              onClick={copyEmailAddress}
              className="mt-2 w-full px-3 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Email Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h2 className="font-bold text-slate-900 text-sm mb-2">Technical Questions & Bugs</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              When reporting a bug, including your operating system, browser version, and the specific tool name helps us replicate and fix the issue quickly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
