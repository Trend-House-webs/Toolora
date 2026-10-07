import React from 'react';
import { ShieldCheck, Zap, Lock } from 'lucide-react';
import { Link } from '../../context/RouterContext';
import { TooloraLogo } from '../common/Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand & Value Proposition */}
          <div className="space-y-4">
            <Link to="/" className="inline-block" aria-label="Toolora Homepage">
              <TooloraLogo size="md" showTagline />
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed">
              Everyday tools, made simple. Built with client-side browser technology so your files and calculations are processed locally without server file uploads.
            </p>
            <div className="flex flex-col gap-2 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Client-Side Processing
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                Instant Execution
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-blue-600" />
                No Accounts Required
              </span>
            </div>
          </div>

          {/* Tools Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Tools Catalog
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link to="/tools" className="hover:text-blue-600 transition-colors">
                  All Tools Directory
                </Link>
              </li>
              <li>
                <Link to="/category/image-tools" className="hover:text-blue-600 transition-colors">
                  Image Tools (22)
                </Link>
              </li>
              <li>
                <Link to="/category/pdf-tools" className="hover:text-blue-600 transition-colors">
                  PDF Tools (7)
                </Link>
              </li>
              <li>
                <Link to="/category/student-tools" className="hover:text-blue-600 transition-colors">
                  Student Tools (18)
                </Link>
              </li>
              <li>
                <Link to="/category/utility-tools" className="hover:text-blue-600 transition-colors">
                  Daily Utilities (16)
                </Link>
              </li>
              <li>
                <Link to="/category/student-utility" className="hover:text-blue-600 transition-colors">
                  Student & Utility Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Practical Guides */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Helpful Guides
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link to="/guides/how-to-compress-images-online" className="hover:text-blue-600 transition-colors">
                  Compress Images Cleanly
                </Link>
              </li>
              <li>
                <Link to="/guides/jpg-vs-png-vs-webp" className="hover:text-blue-600 transition-colors">
                  JPG vs PNG vs WebP
                </Link>
              </li>
              <li>
                <Link to="/guides/how-to-resize-an-image-without-losing-quality" className="hover:text-blue-600 transition-colors">
                  Resize Without Quality Loss
                </Link>
              </li>
              <li>
                <Link to="/guides/how-to-convert-images-to-pdf" className="hover:text-blue-600 transition-colors">
                  Convert Images to PDF
                </Link>
              </li>
              <li className="pt-1">
                <Link to="/guides" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors flex items-center gap-1">
                  All Guides & Tutorials →
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Company */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Information & Legal
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link to="/about" className="hover:text-blue-600 transition-colors">
                  About Toolora
                </Link>
              </li>
              <li>
                <Link to="/brand" className="hover:text-blue-600 transition-colors">
                  Brand Identity & Assets
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-600 transition-colors">
                  Contact & Feedback
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-blue-600 transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Toolora. Everyday tools, made simple. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Runs locally in your modern web browser</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
