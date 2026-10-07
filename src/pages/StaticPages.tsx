import React, { useState, useEffect, useRef } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEO } from '../components/common/SEO';
import { ShieldCheck, CheckCircle2, Lock, Zap, AlertCircle, Send, Loader2, MessageSquare, RotateCcw } from 'lucide-react';
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
          <h2 className="text-base font-bold text-slate-900 mb-2">6. Communications & Feedback</h2>
          <p>
            When you submit feedback or tool suggestions through our feedback form, your message, selected topic, and optional contact details are securely transmitted to our feedback system solely for reviewing suggestions, resolving technical bugs, and improving Toolora. No account is required and submissions are never sold or shared with advertisers.
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
  const [topic, setTopic] = useState('Tool Suggestion');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // Honeypot
  const [pageUrl, setPageUrl] = useState('https://toolorahub.vercel.app/contact');

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    topic?: string;
    message?: string;
  }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initialize page URL safely
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPageUrl(window.location.href);
    }
  }, []);

  // Listen for Apps Script postMessage notification from hidden iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== 'object') return;

      if (event.data.type === 'TOOLORA_FEEDBACK_RESULT') {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        if (event.data.success === true) {
          setStatus('success');
          setName('');
          setEmail('');
          setMessage('');
          setWebsite('');
          setFieldErrors({});
          setGeneralError(null);
        } else {
          setStatus('error');
          setGeneralError("Sorry, we couldn't send your feedback right now. Please try again.");
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const validate = (): boolean => {
    const errors: { name?: string; email?: string; topic?: string; message?: string } = {};

    if (name.trim().length > 100) {
      errors.name = 'Name must be 100 characters or fewer.';
    }

    if (email.trim().length > 254) {
      errors.email = 'Email address must be 254 characters or fewer.';
    } else if (email.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      errors.email = 'Please enter a valid email address (e.g. name@example.com) or leave it blank.';
    }

    if (!topic.trim()) {
      errors.topic = 'Please select a feedback topic.';
    } else if (topic.trim().length > 100) {
      errors.topic = 'Topic must be 100 characters or fewer.';
    }

    if (!message.trim()) {
      errors.message = 'Please enter your feedback message.';
    } else if (message.trim().length < 5) {
      errors.message = 'Please enter a slightly more detailed message (at least 5 characters).';
    } else if (message.trim().length > 5000) {
      errors.message = 'Message must be 5000 characters or fewer.';
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setGeneralError('Please correct the highlighted fields before submitting.');
      return false;
    }

    setGeneralError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (status === 'submitting') {
      e.preventDefault();
      return;
    }

    if (!validate()) {
      e.preventDefault();
      return;
    }

    setStatus('submitting');
    setGeneralError(null);

    // Safety timeout: if iframe never responds, release submitting state and show helpful error
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setStatus((current) => {
        if (current === 'submitting') {
          setGeneralError("Sorry, we couldn't send your feedback right now. Please try again.");
          return 'error';
        }
        return current;
      });
    }, 20000);

    // Form submission naturally proceeds via target="toolora-feedback-frame"
  };

  const resetForm = () => {
    setStatus('idle');
    setGeneralError(null);
    setFieldErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <SEO
        title="Contact & Feedback — Toolora"
        description="Contact Toolora. Suggest new free tools, submit technical feedback, or share ideas with our team."
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
          {status === 'success' ? (
            <div className="space-y-6" aria-live="polite">
              <div className="flex items-start gap-3.5 p-5 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1 text-emerald-950">
                  <h2 className="font-bold text-base text-emerald-900">
                    Feedback Received
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                    Thanks! Your feedback has been received.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-800">What happens next?</p>
                <p className="leading-relaxed">
                  We review every suggestion to refine existing tools, add edge-case support, and prioritize new features. Thank you for helping make Toolora better!
                </p>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Send Another Note
              </button>
            </div>
          ) : (
            <form
              method="POST"
              action="https://script.google.com/macros/s/AKfycbzP0xWxpQlsbSdkZH5liBI1-4IvdiAKYWTfkGDDFC2F1IxRR9_Yae425oqFCQzi6_Av/exec"
              target="toolora-feedback-frame"
              onSubmit={handleSubmit}
              className="space-y-4.5"
              noValidate
            >
              {/* Hidden honeypot field for bot suppression */}
              <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              {/* Hidden page URL context */}
              <input type="hidden" name="page" value={pageUrl} />

              {/* General submission error banner */}
              {generalError && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm rounded-xl flex items-start gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="font-semibold">{generalError}</p>
                    {status === 'error' && (
                      <p className="text-xs text-rose-600">Your message is preserved below so you can try submitting again.</p>
                    )}
                  </div>
                </div>
              )}

              {/* Feedback Topic */}
              <div>
                <label
                  htmlFor="contact-topic"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Feedback Topic <span className="text-rose-500" aria-hidden="true">*</span>
                </label>
                <select
                  id="contact-topic"
                  name="topic"
                  value={topic}
                  onChange={(e) => {
                    setTopic(e.target.value);
                    if (fieldErrors.topic) {
                      setFieldErrors((prev) => ({ ...prev, topic: undefined }));
                    }
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="Tool Suggestion">Suggest a New Free Tool</option>
                  <option value="Bug Report">Bug Report / Technical Issue</option>
                  <option value="General Feedback">General Feedback</option>
                  <option value="Feature Improvement">Feature Improvement</option>
                  <option value="Other">Other Inquiry</option>
                </select>
                {fieldErrors.topic && (
                  <p id="contact-topic-error" className="text-xs text-rose-600 mt-1" role="alert">
                    {fieldErrors.topic}
                  </p>
                )}
              </div>

              {/* Name field (optional) */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Your Name <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  maxLength={100}
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

              {/* Email field (optional) */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Your Email Address <span className="text-slate-400 font-normal">(optional — for follow-up only)</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  maxLength={254}
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

              {/* Feedback Message (required) */}
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
                  maxLength={5000}
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

              {/* Privacy and delivery notice */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 leading-relaxed">
                Feedback is submitted securely to our feedback system. No account is required.
              </div>

              {/* Action button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-xs inline-flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Feedback...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Feedback</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Hidden iframe target for silent Apps Script form POST */}
          <iframe
            name="toolora-feedback-frame"
            id="toolora-feedback-frame"
            title="Feedback submission"
            aria-hidden="true"
            tabIndex={-1}
            className="hidden"
            style={{ display: 'none', width: 0, height: 0, border: 0 }}
          />
        </div>

        {/* Sidebar / Helpful Guidance */}
        <div className="space-y-4">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              How Feedback Helps
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              We review every suggestion to improve existing utilities, fix edge cases, and prioritize new tool requests.
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              Technical Issues & Bugs
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              When reporting a bug, including your browser version, operating system, and the specific tool name or input file format helps us resolve it quickly.
            </p>
          </div>

          <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-1.5">
            <h3 className="font-semibold text-blue-900 text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Secure Submission
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Feedback is submitted securely to our feedback system. No account is required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
