import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEO } from '../components/common/SEO';
import { ShieldCheck, Mail, CheckCircle2, Lock, Zap, Sparkles, AlertCircle } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <SEO
        title="About Toolora — Our Mission and Privacy-First Approach"
        description="Learn about Toolora: a suite of fast, free, client-side utility tools for images, math, and everyday tasks with zero server uploads."
        canonicalPath="/about"
      />

      <Breadcrumbs items={[{ label: 'About Toolora' }]} />

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About Toolora
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Simple, fast, free tools for everyday tasks. Built from the ground up to respect user privacy and eliminate artificial barriers.
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
        <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Our Mission</h2>
          <p>
            The internet was intended to empower people with accessible utilities. Yet today, basic everyday tasks like resizing an image, calculating a GPA, or converting a file format are routinely blocked behind account registrations, monthly subscription paywalls, and invasive trackers.
          </p>
          <p>
            <strong>Toolora</strong> exists to offer an honest alternative: a clean, lightning-fast suite of utility tools that anyone can use directly in their browser without registering, entering a credit card, or sacrificing their privacy.
          </p>
        </div>

        <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900">How It Works: 100% Client-Side Processing</h2>
          <p>
            Unlike traditional utility websites that upload your photos, documents, and calculation inputs to remote servers for processing, Toolora leverages modern web standards including the <strong>HTML5 Canvas API</strong>, <strong>Web Audio API</strong>, and modern JavaScript engines.
          </p>
          <p>
            When you compress an image, convert a graphic format, or compile a PDF, your device CPU and browser process the file directly in local memory. Your photos and documents never leave your computer or smartphone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-5 bg-white rounded-xl border border-slate-200/90 text-center shadow-2xs">
            <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-semibold text-slate-900 text-sm">True Privacy</h3>
            <p className="text-xs text-slate-500 mt-1">Zero server uploads. Your data stays on your machine.</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-slate-200/90 text-center shadow-2xs">
            <Zap className="w-6 h-6 text-amber-500 mx-auto mb-2" />
            <h3 className="font-semibold text-slate-900 text-sm">Instant Execution</h3>
            <p className="text-xs text-slate-500 mt-1">No queues or network lag. Instantaneous local results.</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-slate-200/90 text-center shadow-2xs">
            <Lock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-slate-900 text-sm">No Accounts</h3>
            <p className="text-xs text-slate-500 mt-1">No email spam, no passwords, no logins ever required.</p>
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
        description="Read the Toolora Privacy Policy. Learn about our 100% client-side privacy guarantee, local storage usage, and advertising disclosures."
        canonicalPath="/privacy"
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
            <strong>The Core Privacy Guarantee:</strong> Toolora does not upload, inspect, collect, or store your photos, documents, or data inputs on any remote server. All tool processing is executed client-side inside your web browser.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">1. Information We Do Not Collect</h2>
          <p>
            We do not require user accounts, logins, or registration. We do not collect names, email addresses, passwords, phone numbers, or payment credentials. When you use our image tools (such as Image Compressor, Image Resizer, or Image to PDF), files are read into local browser RAM and never transmitted across the network to us.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">2. Local Storage</h2>
          <p>
            Certain productivity tools (such as the GPA Calculator) may offer to save your course list within your browser's local storage (LocalStorage) for your convenience. This data remains on your physical device and can be cleared at any time through your browser settings.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">3. Advertising & Cookies</h2>
          <p>
            Toolora may display non-intrusive advertisements served by ethical third-party advertising partners (such as Google AdSense). These third-party vendors may use cookies or web beacons to serve ads based on your visit to this or other websites. Users may opt out of personalized advertising by visiting Google Ads Settings or www.aboutads.info.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">4. Contact Inquiries</h2>
          <p>
            If you voluntarily submit feedback or report a bug through our contact form, your correspondence is used solely to respond to your technical question or feature suggestion.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">5. Updates to This Policy</h2>
          <p>
            We may occasionally update this Privacy Policy to reflect improvements to our tools or changes in regulatory requirements. The revised date at the top of this page indicates the most recent modification.
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
            You retain 100% ownership of all images, documents, and text processed through our tools. You are solely responsible for ensuring you possess the necessary legal rights or copyright permissions for any materials you process.
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
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill out all required fields.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <SEO
        title="Contact & Feedback — Toolora"
        description="Contact Toolora. Suggest new free tools, submit technical feedback, or reach out to our team."
        canonicalPath="/contact"
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
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h2 className="text-lg font-bold text-slate-900">Thank You for Your Feedback!</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your message has been received. We review user suggestions regularly to prioritize new free browser utilities.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="mt-4 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Your Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="e.g. Alex Johnson"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="alex@example.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Feedback or Tool Suggestion <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Describe your suggestion or technical feedback..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Send Feedback
              </button>
            </form>
          )}
        </div>

        <div className="space-y-4">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h2 className="font-bold text-slate-900 text-sm mb-2">Direct Contact</h2>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Prefer writing directly from your email client? Reach our team anytime at:
            </p>
            <a
              href="mailto:support@toolora.com"
              className="text-xs font-semibold text-blue-600 hover:underline break-all flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 shrink-0" />
              support@toolora.com
            </a>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h2 className="font-bold text-slate-900 text-sm mb-2">Privacy & Respect</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never sell, rent, or share correspondence. Your messages are held strictly confidential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
