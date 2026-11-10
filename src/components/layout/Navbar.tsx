import React, { useState, useRef, useEffect } from 'react';
import { Search, Menu, X, ChevronDown, Image as ImageIcon, FileText, GraduationCap, Wrench, Layers, BookOpen, Info } from 'lucide-react';
import { Link, useRouter } from '../../context/RouterContext';
import { TooloraLogo } from '../common/Logo';

interface NavbarProps {
  onOpenSearch: () => void;
}

export function Navbar({ onOpenSearch }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { currentPath } = useRouter();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoriesDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu and dropdown on path change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
  }, [currentPath]);

  const categoryLinks = [
    { label: 'Image Tools', href: '/category/image-tools', count: '22', icon: ImageIcon, desc: 'Compress, resize & convert photos' },
    { label: 'PDF Tools', href: '/category/pdf-tools', count: '7', icon: FileText, desc: 'Merge, split & convert to PDF' },
    { label: 'Student Tools', href: '/category/student-tools', count: '18', icon: GraduationCap, desc: 'GPA, grades & math solvers' },
    { label: 'Daily Utilities', href: '/category/utility-tools', count: '16', icon: Wrench, desc: 'UUIDs, timestamps, JSON & text' },
    { label: 'Productivity Hub', href: '/category/student-utility', count: '34', icon: Layers, desc: 'Combined academic and daily tools' },
  ];

  const isCategoryActive = currentPath.startsWith('/category');

  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-6 lg:px-8 pt-3 pb-1">
      <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md border border-[#E5EAF2] rounded-2xl shadow-[0_2px_12px_rgba(15,23,42,0.04)] px-4 sm:px-6 transition-all">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center hover:opacity-90 transition-opacity"
              aria-label="Toolora Homepage"
            >
              <TooloraLogo size="md" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2 lg:gap-6 text-sm font-medium text-slate-600">
            <Link
              to="/tools"
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                currentPath === '/tools'
                  ? 'text-blue-600 font-semibold bg-blue-50/60'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Tools Directory
            </Link>

            {/* Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                onMouseEnter={() => setCategoriesDropdownOpen(true)}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isCategoryActive
                    ? 'text-blue-600 font-semibold bg-blue-50/60'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
                aria-expanded={categoriesDropdownOpen}
                aria-haspopup="true"
              >
                <span>Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${categoriesDropdownOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>

              {categoriesDropdownOpen && (
                <div
                  onMouseLeave={() => setCategoriesDropdownOpen(false)}
                  className="absolute left-0 mt-2 w-72 bg-white rounded-2xl border border-[#E5EAF2] shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3 py-1.5 text-2xs font-semibold text-slate-600 uppercase tracking-wider">
                    Browse Categories
                  </div>
                  <div className="space-y-1">
                    {categoryLinks.map((cat) => {
                      const Icon = cat.icon;
                      const isActive = currentPath === cat.href;
                      return (
                        <Link
                          key={cat.href}
                          to={cat.href}
                          onClick={() => setCategoriesDropdownOpen(false)}
                          className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                            isActive
                              ? 'bg-blue-50 text-blue-700'
                              : 'hover:bg-slate-50 text-slate-700 hover:text-blue-600'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold">{cat.label}</span>
                              <span className="text-2xs font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                {cat.count}
                              </span>
                            </div>
                            <p className="text-2xs text-slate-500 line-clamp-1 mt-0.5">
                              {cat.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/guides"
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                currentPath.startsWith('/guides')
                  ? 'text-blue-600 font-semibold bg-blue-50/60'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Guides
            </Link>

            <Link
              to="/about"
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                currentPath === '/about'
                  ? 'text-blue-600 font-semibold bg-blue-50/60'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              About
            </Link>
          </nav>

          {/* Search Trigger & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2.5 px-3 sm:px-3.5 py-2 min-h-[40px] text-xs text-slate-600 bg-slate-50 hover:bg-slate-100 active:bg-slate-150 rounded-xl border border-[#E5EAF2] transition-all cursor-pointer shadow-2xs group"
              aria-label="Search all tools"
            >
              <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              <span className="hidden sm:inline font-medium text-slate-600">Search tools...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white text-slate-500 border border-slate-200 rounded-md shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer inside capsule */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E5EAF2] py-4 space-y-3 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 gap-1">
              <Link
                to="/tools"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600"
              >
                <Wrench className="w-4 h-4 text-blue-600" />
                All Tools Directory
              </Link>
              <div className="pt-2 pb-1 px-3 text-2xs font-bold text-slate-500 uppercase tracking-wider">
                Categories
              </div>
              {categoryLinks.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.href}
                    to={cat.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span>{cat.label}</span>
                    </div>
                    <span className="text-2xs text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                      {cat.count}
                    </span>
                  </Link>
                );
              })}
              <div className="pt-2 pb-1 px-3 text-2xs font-bold text-slate-500 uppercase tracking-wider">
                Resources
              </div>
              <Link
                to="/guides"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
              >
                <BookOpen className="w-4 h-4 text-slate-400" />
                Guides & Tutorials
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
              >
                <Info className="w-4 h-4 text-slate-400" />
                About Toolora
              </Link>
              <div className="flex items-center gap-3 px-3 py-2 text-xs text-slate-600 border-t border-slate-100 mt-2">
                <Link to="/privacy" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">Privacy</Link>
                <span>·</span>
                <Link to="/terms" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">Terms</Link>
                <span>·</span>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">Contact</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
