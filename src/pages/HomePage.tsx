import React, { useState } from 'react';
import { Search, Shield, Zap, Sparkles, UserX, ArrowRight, Image as ImageIcon, GraduationCap, FileText, Wrench, Layers, BookOpen, Clock } from 'lucide-react';
import { TOOLS, FEATURED_TOOLS, POPULAR_TOOLS, IMAGE_TOOLS, PDF_TOOLS, STUDENT_TOOLS, UTILITY_TOOLS, STUDENT_UTILITY_TOOLS } from '../data/tools';
import { GUIDES } from '../data/guides';
import { ToolCard } from '../components/common/ToolCard';
import { SEO } from '../components/common/SEO';
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
      ? TOOLS
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
    <div className="space-y-12 sm:space-y-16 lg:space-y-20">
      {/* Dynamic SEO Tags & WebSite Structured Data */}
      <SEO
        title="Toolora — Everyday tools, made simple."
        description={SITE_DESCRIPTION}
        canonicalPath="/"
        schema={websiteSchema}
      />

      {/* 1. Compact, Immediate Hero Section */}
      <section className="relative pt-8 pb-4 sm:pt-12 sm:pb-8 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Everyday tools, made simple.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Free online tools for images, PDF documents, academic calculations, and daily digital tasks. Process files directly in your web browser with zero sign-up and complete confidentiality.
          </p>

          {/* Primary Tool Search Bar */}
          <div className="max-w-xl mx-auto pt-2">
            <form
              onSubmit={handleHeroSubmit}
              className="relative flex items-center shadow-sm rounded-xl bg-white border border-slate-300 hover:border-blue-500 transition-all p-1.5 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500"
            >
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Search a tool..."
                className="w-full py-2.5 px-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-hidden"
                aria-label="Search tools"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
              >
                Search
              </button>
            </form>
          </div>

          {/* Trust Statement */}
          <div className="pt-1 text-xs text-slate-500 font-medium flex items-center justify-center flex-wrap gap-2">
            <span>Free to use</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>No sign-up</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Client-side processing</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Zero server file uploads</span>
          </div>

          {/* Choose a Tool Category (Immediate First Visible Action) */}
          <div className="pt-5 max-w-4xl mx-auto text-left">
            <div className="text-2xs sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 text-center">
              Choose a Tool Category
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              <Link
                to="/category/image-tools"
                className="group p-3 rounded-xl bg-white border border-slate-200/90 hover:border-blue-500/80 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                    Image Tools
                  </div>
                  <div className="text-2xs text-slate-500 mt-0.5 line-clamp-1">
                    Compress, resize & convert
                  </div>
                </div>
                <div className="text-2xs font-semibold text-blue-600 mt-2 flex items-center gap-0.5">
                  <span>Browse</span>
                  <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>

              <Link
                to="/category/pdf-tools"
                className="group p-3 rounded-xl bg-white border border-slate-200/90 hover:border-blue-500/80 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                    PDF Tools
                  </div>
                  <div className="text-2xs text-slate-500 mt-0.5 line-clamp-1">
                    Merge, split & convert to PDF
                  </div>
                </div>
                <div className="text-2xs font-semibold text-blue-600 mt-2 flex items-center gap-0.5">
                  <span>Browse</span>
                  <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>

              <Link
                to="/category/student-tools"
                className="group p-3 rounded-xl bg-white border border-slate-200/90 hover:border-blue-500/80 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                    Student Tools
                  </div>
                  <div className="text-2xs text-slate-500 mt-0.5 line-clamp-1">
                    CGPA, grades & math solvers
                  </div>
                </div>
                <div className="text-2xs font-semibold text-blue-600 mt-2 flex items-center gap-0.5">
                  <span>Browse</span>
                  <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>

              <Link
                to="/category/utility-tools"
                className="group p-3 rounded-xl bg-white border border-slate-200/90 hover:border-blue-500/80 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                    Daily Utilities
                  </div>
                  <div className="text-2xs text-slate-500 mt-0.5 line-clamp-1">
                    UUIDs, timestamps & JSON
                  </div>
                </div>
                <div className="text-2xs font-semibold text-blue-600 mt-2 flex items-center gap-0.5">
                  <span>Browse</span>
                  <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>

              <Link
                to="/category/student-utility"
                className="group p-3 rounded-xl bg-white border border-slate-200/90 hover:border-blue-500/80 hover:shadow-xs transition-all flex flex-col justify-between col-span-2 sm:col-span-1"
              >
                <div>
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                    Productivity Hub
                  </div>
                  <div className="text-2xs text-slate-500 mt-0.5 line-clamp-1">
                    Unified productivity index
                  </div>
                </div>
                <div className="text-2xs font-semibold text-blue-600 mt-2 flex items-center gap-0.5">
                  <span>Browse</span>
                  <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Popular Utilities (Immediate First Screen Value) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Popular Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Instant browser utilities ready to use right now.
            </p>
          </div>

          <Link
            to="/tools"
            className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
          >
            All {TOOLS.length} tools <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {POPULAR_TOOLS.slice(0, 8).map((tool) => (
            <ToolCard key={tool.id} tool={tool} variant="compact" />
          ))}
        </div>
      </section>

      {/* 3. Featured Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
              Curated Utilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Featured Tools
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              High-frequency image, PDF, and academic utilities.
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Explore by Category
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto" role="tablist">
            <button
              role="tab"
              aria-selected={selectedCategoryTab === 'all'}
              onClick={() => setSelectedCategoryTab('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategoryTab === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({TOOLS.length})
            </button>
            <button
              role="tab"
              aria-selected={selectedCategoryTab === 'image'}
              onClick={() => setSelectedCategoryTab('image')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategoryTab === 'image'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Image ({IMAGE_TOOLS.length})
            </button>
            <button
              role="tab"
              aria-selected={selectedCategoryTab === 'pdf'}
              onClick={() => setSelectedCategoryTab('pdf')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategoryTab === 'pdf'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              PDF ({PDF_TOOLS.length})
            </button>
            <button
              role="tab"
              aria-selected={selectedCategoryTab === 'student'}
              onClick={() => setSelectedCategoryTab('student')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategoryTab === 'student'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Student ({STUDENT_TOOLS.length})
            </button>
            <button
              role="tab"
              aria-selected={selectedCategoryTab === 'utility'}
              onClick={() => setSelectedCategoryTab('utility')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategoryTab === 'utility'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Utilities ({UTILITY_TOOLS.length})
            </button>
          </div>
        </div>

        {/* Category Cards Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-6">
          <Link
            to="/category/image-tools"
            className="group p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-500/60 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors mb-3">
                <ImageIcon className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between gap-1">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Image Tools
                </h3>
                <span className="text-2xs text-slate-400 font-medium">{IMAGE_TOOLS.length}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                Compress, convert, resize, crop, rotate, and format photos in-browser.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 mt-3 group-hover:translate-x-0.5 transition-transform">
              Browse Image Tools <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          <Link
            to="/category/pdf-tools"
            className="group p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-500/60 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors mb-3">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between gap-1">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  PDF Tools
                </h3>
                <span className="text-2xs text-slate-400 font-medium">{PDF_TOOLS.length}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                Merge, split, rotate, convert JPG/PNG to PDF, and inspect metadata.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 mt-3 group-hover:translate-x-0.5 transition-transform">
              Browse PDF Tools <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          <Link
            to="/category/student-tools"
            className="group p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-500/60 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors mb-3">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between gap-1">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Student Tools
                </h3>
                <span className="text-2xs text-slate-400 font-medium">{STUDENT_TOOLS.length}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                CGPA, weighted grades, fractions, ratios, scientific math, and timers.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 mt-3 group-hover:translate-x-0.5 transition-transform">
              Browse Student Tools <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          <Link
            to="/category/utility-tools"
            className="group p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-500/60 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors mb-3">
                <Wrench className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between gap-1">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Daily Utilities
                </h3>
                <span className="text-2xs text-slate-400 font-medium">{UTILITY_TOOLS.length}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                UUIDs, timestamps, text cleaner, password generator, Base64 & QR codes.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 mt-3 group-hover:translate-x-0.5 transition-transform">
              Browse Utility Tools <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          <Link
            to="/category/student-utility"
            className="group p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-500/60 hover:shadow-xs transition-all flex flex-col justify-between col-span-1 sm:col-span-2 lg:col-span-1"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors mb-3">
                <Layers className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between gap-1">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Productivity Hub
                </h3>
                <span className="text-2xs text-slate-400 font-medium">{STUDENT_UTILITY_TOOLS.length}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                Unified workspace combining academic solvers and daily productivity utilities.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 mt-3 group-hover:translate-x-0.5 transition-transform">
              Browse Productivity Hub <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedCategoryTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* 5. Practical Guides & Workflow Tutorials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50/80 rounded-2xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Knowledge Base</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Practical Guides & Workflow Tutorials
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Step-by-step walk-throughs and format comparisons to help you optimize images, choose formats, resize cleanly, and assemble documents.
              </p>
            </div>
            <Link
              to="/guides"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline shrink-0"
            >
              <span>View All Guides & Tutorials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GUIDES.map((g) => (
              <Link
                key={g.slug}
                to={`/guides/${g.slug}`}
                className="group p-4 bg-white rounded-xl border border-slate-200/90 hover:border-blue-400 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-2xs text-slate-500 mb-2">
                    <span className="font-semibold text-blue-600">{g.categoryName}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {g.readTime}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {g.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {g.summary}
                  </p>
                </div>
                <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold group-hover:text-blue-700">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Toolora Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-10 lg:p-12">
          <div className="max-w-xl mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Why Toolora?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              Everyday utility without logins, subscriptions, paywalls, or server uploads.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">100% Free</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All {TOOLS.length} tools are completely free to use. No hidden fees, no subscriptions, and no trial limits.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Lightning Fast</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tools run natively inside your browser. No slow server upload queues or processing delays.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">In-Browser Execution</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your images, documents, and calculations are processed directly in your browser without server file uploads.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <UserX className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Zero Sign-Up</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No email requests, no password prompts, and no verification codes. Just open and use.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
