import React from 'react';
import { ShieldCheck, Zap, Lock } from 'lucide-react';
import { Link } from '../../context/RouterContext';
import { TooloraLogo } from '../common/Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Value Proposition */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-block" aria-label="Toolora Homepage">
              <TooloraLogo size="md" showTagline />
            </Link>
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              Everyday tools, made simple. Built with client-side browser technology to ensure your files and calculations remain private and never touch our servers.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                100% Client-Side Privacy
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                Instant Execution
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
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
                  Image Tools
                </Link>
              </li>
              <li>
                <Link to="/category/pdf-tools" className="hover:text-blue-600 transition-colors">
                  PDF Tools
                </Link>
              </li>
              <li>
                <Link to="/category/student-utility" className="hover:text-blue-600 transition-colors">
                  Student & Utility Tools
                </Link>
              </li>
              <li>
                <Link to="/tools/merge-pdf" className="hover:text-blue-600 transition-colors">
                  Merge PDF
                </Link>
              </li>
              <li>
                <Link to="/tools/cgpa-calculator" className="hover:text-blue-600 transition-colors">
                  CGPA Calculator
                </Link>
              </li>
              <li>
                <Link to="/tools/image-compressor" className="hover:text-blue-600 transition-colors">
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link to="/tools/jpg-to-pdf" className="hover:text-blue-600 transition-colors">
                  JPG to PDF
                </Link>
              </li>
              <li>
                <Link to="/tools/password-generator" className="hover:text-blue-600 transition-colors">
                  Password Generator
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
