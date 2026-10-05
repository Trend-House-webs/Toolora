import React, { useState } from 'react';
import { Search, Menu, X, Layers, Image as ImageIcon, GraduationCap, Wrench } from 'lucide-react';
import { Link, useRouter } from '../../context/RouterContext';
import { TooloraLogo } from '../common/Logo';

interface NavbarProps {
  onOpenSearch: () => void;
}

export function Navbar({ onOpenSearch }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPath } = useRouter();

  const navLinks = [
    { label: 'All Tools', href: '/tools' },
    { label: 'Image Tools', href: '/category/image-tools' },
    { label: 'PDF Tools', href: '/category/pdf-tools' },
    { label: 'Student Tools', href: '/category/student-tools' },
    { label: 'Utilities', href: '/category/utility-tools' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Zone 1: Toolora Brand Logo */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center hover:opacity-90 transition-opacity"
              aria-label="Toolora Homepage"
            >
              <TooloraLogo size="md" />
            </Link>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = currentPath === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`hover:text-blue-600 transition-colors py-1 whitespace-nowrap ${
                    isActive ? 'text-blue-600 font-semibold' : 'text-slate-600'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Search Action & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200/80 active:bg-slate-200 rounded-lg border border-slate-200 transition-colors cursor-pointer"
              aria-label="Search all tools"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline font-medium">Search...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white text-slate-500 border border-slate-300 rounded shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="grid grid-cols-1 gap-1">
            <Link
              to="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
            >
              <Wrench className="w-4 h-4 text-slate-400" />
              All Tools Directory
            </Link>
            <Link
              to="/category/image-tools"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
            >
              <ImageIcon className="w-4 h-4 text-slate-400" />
              Image Tools
            </Link>
            <Link
              to="/category/pdf-tools"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
            >
              <Layers className="w-4 h-4 text-slate-400" />
              PDF Tools
            </Link>
            <Link
              to="/category/student-utility"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
            >
              <GraduationCap className="w-4 h-4 text-slate-400" />
              Student & Utility Tools
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
            >
              <Layers className="w-4 h-4 text-slate-400" />
              About Toolora
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600"
            >
              Contact & Feedback
            </Link>
            <div className="flex items-center gap-3 px-3 py-2 text-xs text-slate-500 border-t border-slate-100 mt-2">
              <Link to="/privacy" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">Privacy</Link>
              <span>·</span>
              <Link to="/terms" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">Terms</Link>
              <span>·</span>
              <Link to="/disclaimer" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">Disclaimer</Link>
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-400 text-center">
            Toolora · Everyday tools, made simple.
          </div>
        </div>
      )}
    </header>
  );
}
