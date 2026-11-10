import React, { useState } from 'react';
import { Search, Shield, Zap, Sparkles, UserX, ArrowRight, Image as ImageIcon, GraduationCap, FileText, Wrench, Layers, BookOpen, Clock, Lock, CheckCircle2 } from 'lucide-react';
import { TOOLS, FEATURED_TOOLS, POPULAR_TOOLS, IMAGE_TOOLS, PDF_TOOLS, STUDENT_TOOLS, UTILITY_TOOLS } from '../data/tools';
import { GUIDES } from '../data/guides';
import { ToolCard } from '../components/common/ToolCard';
import { SEO } from '../components/common/SEO';
import { AdSenseBanner } from '../components/common/AdSenseBanner';
import { Link, useRouter } from '../context/RouterContext';
import { SITE_DESCRIPTION, SITE_URL } from '../config/site';

interface HomePageProps {
  onOpenSearchModal: () => void;
}

export function HomePage({ onOpenSearchModal }: HomePageProps) {
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<'all' | 'image' | 'pdf' | 'student' | 'utility'>('all');
  const [heroSearch, setHeroSearch] = useState('');
  const { navigate } = useRouter();

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroSearch.trim()) {
      onOpenSearchModal();
      return;
    }
    const query = heroSearch.toLowerCase().trim();
    const matched = TOOLS.find((t) =>
      t.name.toLowerCase().includes(query) ||
      t.slug.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query)
    );
    if (matched) {
      navigate(`/tools/${matched.slug}`);
    } else {
      onOpenSearchModal();
    }
  };

  const displayedCategoryTools =
    selectedCategoryTab === 'all'
      ? TOOLS.slice(0, 12)
      : selectedCategoryTab === 'image'
      ? IMAGE_TOOLS
      : selectedCategoryTab === 'pdf'
      ? PDF_TOOLS
      : selectedCategoryTab === 'student'
      ? STUDENT_TOOLS
      : UTILITY_TOOLS;

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Toolora',
    url: `${SITE_URL}/`,
    description: 'Everyday tools, made simple. Fast, free tools for images, files, calculations and everyday tasks.',
  };

  return (
    <div className="space-y-16 sm:space-y-20 lg:space-y-24 pb-16">
      {/* Dynamic SEO Tags & WebSite Structured Data */}
      <SEO
        title="Toolora — Everyday tools, made simple."
        description={SITE_DESCRIPTION}
        canonicalPath="/"
        schema={websiteSchema}
      />

      {/* 1. Spacious, Modern Hero Section */}
      <section className="relative pt-6 pb-2 sm:pt-12 sm:pb-6 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {/* Subtle Top Kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-xs font-semibold text-blue-700 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>100% Free · Client-Side Execution · Zero Sign-Up</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Free Online Tools for Everyday Tasks
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Toolora offers a comprehensive collection of free browser tools—including image tools online, free online calculators, and online utility tools. Process photos, assemble PDF documents, calculate academic marks, and format text directly in your web browser with zero sign-up or server file uploads.
          </p>

          {/* Primary Tool Search Bar */}
          <div className="max-w-2xl mx-auto pt-2">
            <form
              onSubmit={handleHeroSubmit}
              className="relative flex items-center shadow-[0_4px_24px_rgba(37,99,235,0.08)] rounded-2xl bg-white border border-[#E5EAF2] hover:border-blue-400 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all p-1.5 sm:p-2"
            >
              <Search className="w-5 h-5 text-slate-400 ml-3.5 shrink-0" />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Search any tool (e.g. Image Compressor, Word Counter, GPA, PDF)..."
                className="w-full py-2.5 px-3 min-h-[44px] text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-hidden"
                aria-label="Search tools"
              />
              <button
                type="submit"
                className="px-5 sm:px-6 py-2.5 min-h-[44px] bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer shrink-0 shadow-xs flex items-center gap-1.5"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4 hidden sm:inline" />
              </button>
            </form>
          </div>

          {/* Real Trust Markers */}
          <div className="pt-2 text-xs text-slate-600 font-medium flex items-center justify-center flex-wrap gap-x-5 gap-y-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              Free to use
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1.5">
              <UserX className="w-3.5 h-3.5 text-slate-500" />
              No sign-up required
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              In-browser processing
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              Zero server file uploads
            </span>
          </div>

          {/* Choose a Tool Category Cards */}
          <div className="pt-8 max-w-5xl mx-auto text-left">
            <div className="text-2xs sm:text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 text-center">
              Choose a Tool Category
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              <Link
                to="/category/image-tools"
                className="group p-4 rounded-2xl bg-white border border-[#E5EAF2] hover:border-blue-400 hover:shadow-[0_4px_16px_rgba(37,99,235,0.06)] hover:-translate-y-0.5 transition-all flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                    Image Tools
                  </div>
                  <div className="text-2xs text-slate-600 mt-1 line-clamp-1 font-normal">
                    Compress, resize & convert
                  </div>
                </div>
                <div className="text-2xs font-semibold text-blue-600 mt-3 flex items-center gap-1">
                  <span>22 Tools</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>

              <Link
                to="/category/pdf-tools"
                className="group p-4 rounded-2xl bg-white border border-[#E5EAF2] hover:border-blue-400 hover:shadow-[0_4px_16px_rgba(37,99,235,0.06)] hover:-translate-y-0.5 transition-all flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                    PDF Tools
                  </div>
                  <div className="text-2xs text-slate-600 mt-1 line-clamp-1 font-normal">
                    Merge, split & convert to PDF
                  </div>
                </div>
                <div className="text-2xs font-semibold text-blue-600 mt-3 flex items-center gap-1">
                  <span>7 Tools</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>

              <Link
                to="/category/student-tools"
                className="group p-4 rounded-2xl bg-white border border-[#E5EAF2] hover:border-blue-400 hover:shadow-[0_4px_16px_rgba(37,99,235,0.06)] hover:-translate-y-0.5 transition-all flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                    Student Tools
                  </div>
                  <div className="text-2xs text-slate-600 mt-1 line-clamp-1 font-normal">
                    GPA, grades & math solvers
                  </div>
                </div>
                <div className="text-2xs font-semibold text-blue-600 mt-3 flex items-center gap-1">
                  <span>18 Tools</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>

              <Link
                to="/category/utility-tools"
                className="group p-4 rounded-2xl bg-white border border-[#E5EAF2] hover:border-blue-400 hover:shadow-[0_4px_16px_rgba(37,99,235,0.06)] hover:-translate-y-0.5 transition-all flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                    Daily Utilities
                  </div>
                  <div className="text-2xs text-slate-600 mt-1 line-clamp-1 font-normal">
                    UUIDs, timestamps & JSON
                  </div>
                </div>
                <div className="text-2xs font-semibold text-blue-600 mt-3 flex items-center gap-1">
                  <span>16 Tools</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>

              <Link
                to="/category/student-utility"
                className="group p-4 rounded-2xl bg-white border border-[#E5EAF2] hover:border-blue-400 hover:shadow-[0_4px_16px_rgba(37,99,235,0.06)] hover:-translate-y-0.5 transition-all flex flex-col justify-between col-span-2 sm:col-span-1 cursor-pointer"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                    Productivity Hub
                  </div>
                  <div className="text-2xs text-slate-600 mt-1 line-clamp-1 font-normal">
                    Unified productivity index
                  </div>
                </div>
                <div className="text-2xs font-semibold text-blue-600 mt-3 flex items-center gap-1">
                  <span>34 Tools</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Popular Utilities (Immediate First Screen Value) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 pb-2 border-b border-[#E5EAF2]">
          <div>
            <div className="text-2xs sm:text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              Top Utilities
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-normal">
              Instant browser utilities ready to use right now with zero setup.
            </p>
          </div>

          <Link
            to="/tools"
            className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 group whitespace-nowrap"
          >
            <span>All {TOOLS.length} tools</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {POPULAR_TOOLS.slice(0, 8).map((tool) => (
            <ToolCard key={tool.id} tool={tool} variant="compact" />
          ))}
        </div>
      </section>

      {/* AdSense Unit (Between Popular and Featured Tools) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSenseBanner className="my-0" />
      </div>

      {/* 3. Featured Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 border-b border-[#E5EAF2] gap-3">
          <div>
            <div className="text-2xs sm:text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              Curated Utilities
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-normal">
              High-frequency image, PDF, and academic utilities designed for efficiency.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED_TOOLS.slice(0, 6).map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* 4. Categorized Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-2 border-b border-[#E5EAF2] gap-4">
          <div>
            <div className="text-2xs sm:text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              Browse Tools
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore by Category
            </h2>
          </div>

          {/* Category Tabs */}
          <div
            className="flex items-center gap-1.5 p-1.5 bg-white border border-[#E5EAF2] rounded-2xl shadow-2xs overflow-x-auto max-w-full"
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
            role="tablist"
            aria-label="Filter tools by category"
          >
            <button
              role="tab"
              aria-selected={selectedCategoryTab === 'all'}
              onClick={() => setSelectedCategoryTab('all')}
              className={`min-h-[38px] px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center justify-center ${
                selectedCategoryTab === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              All ({TOOLS.length})
            </button>
            <button
              role="tab"
              aria-selected={selectedCategoryTab === 'image'}
              onClick={() => setSelectedCategoryTab('image')}
              className={`min-h-[38px] px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center justify-center ${
                selectedCategoryTab === 'image'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Image ({IMAGE_TOOLS.length})
            </button>
            <button
              role="tab"
              aria-selected={selectedCategoryTab === 'pdf'}
              onClick={() => setSelectedCategoryTab('pdf')}
              className={`min-h-[38px] px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center justify-center ${
                selectedCategoryTab === 'pdf'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              PDF ({PDF_TOOLS.length})
            </button>
            <button
              role="tab"
              aria-selected={selectedCategoryTab === 'student'}
              onClick={() => setSelectedCategoryTab('student')}
              className={`min-h-[38px] px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center justify-center ${
                selectedCategoryTab === 'student'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Student ({STUDENT_TOOLS.length})
            </button>
            <button
              role="tab"
              aria-selected={selectedCategoryTab === 'utility'}
              onClick={() => setSelectedCategoryTab('utility')}
              className={`min-h-[38px] px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center justify-center ${
                selectedCategoryTab === 'utility'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Utilities ({UTILITY_TOOLS.length})
            </button>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedCategoryTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* Directory CTA when "All" tab is active */}
        {selectedCategoryTab === 'all' && (
          <div className="mt-10 text-center bg-white border border-[#E5EAF2] rounded-2xl p-8 sm:p-10 shadow-xs">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">
              Looking for our full tool collection?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mb-6 leading-relaxed font-normal">
              Explore our complete directory of all {TOOLS.length} free browser tools across Image, PDF, Academic, and Utility categories with instant search and filtering.
            </p>
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors"
            >
              <span>Explore All {TOOLS.length} Tools in Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </section>

      {/* AdSense Unit (Between Catalog and Guides) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSenseBanner className="my-0" />
      </div>

      {/* 5. Toolora Principles (Why Toolora?) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E5EAF2] p-8 sm:p-12 shadow-[0_2px_12px_rgba(15,23,42,0.03)]">
          <div className="max-w-xl mb-10">
            <div className="text-2xs sm:text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              Core Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Toolora?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
              Everyday utility built without logins, subscriptions, paywalls, or server file uploads.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">100% Free</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                All {TOOLS.length} tools are completely free to use. No hidden fees, no subscriptions, and no trial limits.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Lightning Fast</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Tools run natively inside your browser. No slow server upload queues or processing delays.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">In-Browser Execution</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Your images, documents, and calculations are processed directly in your browser without server file uploads.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <UserX className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Zero Sign-Up</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                No email requests, no password prompts, and no verification codes. Just open and use immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Practical Guides & Workflow Tutorials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E5EAF2] p-8 sm:p-12 shadow-[0_2px_12px_rgba(15,23,42,0.03)] space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E5EAF2]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-2xs sm:text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Knowledge Base</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
                Practical Guides & Workflow Tutorials
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed font-normal">
                Step-by-step walk-throughs and format comparisons to help you optimize images, choose formats, resize cleanly, and assemble documents.
              </p>
            </div>
            <Link
              to="/guides"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors shrink-0 group"
            >
              <span>View All Guides & Tutorials</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GUIDES.map((g) => (
              <Link
                key={g.slug}
                to={`/guides/${g.slug}`}
                className="group p-5 bg-[#F8FAFC] rounded-2xl border border-[#E5EAF2] hover:border-blue-400 hover:bg-white hover:shadow-[0_4px_16px_rgba(37,99,235,0.06)] hover:-translate-y-0.5 transition-all flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between text-2xs text-slate-500 mb-2.5">
                    <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{g.categoryName}</span>
                    <span className="flex items-center gap-1 font-medium text-slate-500">
                      <Clock className="w-3 h-3" />
                      {g.readTime}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {g.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed font-normal">
                    {g.summary}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#E5EAF2] flex items-center justify-between text-xs text-blue-600 font-bold group-hover:text-blue-700">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
