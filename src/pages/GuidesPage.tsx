import React from 'react';
import { BookOpen, Clock, ArrowRight, ShieldCheck, Sparkles, Layers, Image as ImageIcon, FileText } from 'lucide-react';
import { GUIDES } from '../data/guides';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEO } from '../components/common/SEO';
import { SITE_URL } from '../config/site';
import { Link } from '../context/RouterContext';

export function GuidesPage() {
  const breadcrumbSchema = {
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
        name: 'Guides',
        item: `${SITE_URL}/guides`,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <SEO
        title="Practical Guides & Browser Tool Tutorials — Toolora"
        description="Clear, practical tutorials on image compression, format selection, resizing without quality loss, and converting images to PDF directly in your browser."
        canonicalPath="/guides"
        schema={breadcrumbSchema}
      />

      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Guides' },
          ]}
        />
      </div>

      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Practical Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How-To Guides & Tool Tutorials
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          Concise, practical walk-throughs designed to help you optimize image assets, navigate file format differences, and handle documents efficiently using Toolora’s private, client-side tools.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-4">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            100% Client-Side Workflows
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>Zero Server Uploads</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>Actionable Step-by-Step Solutions</span>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {GUIDES.map((guide) => (
          <article
            key={guide.slug}
            className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-3 text-xs">
                <Link
                  to={guide.categoryPath}
                  className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-md transition-colors"
                >
                  {guide.categorySlug === 'image-tools' ? (
                    <ImageIcon className="w-3 h-3" />
                  ) : (
                    <FileText className="w-3 h-3" />
                  )}
                  <span>{guide.categoryName}</span>
                </Link>
                <span className="flex items-center gap-1 text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>{guide.readTime}</span>
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
                <Link
                  to={`/guides/${guide.slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {guide.title}
                </Link>
              </h2>

              <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {guide.summary}
              </p>

              {/* Primary tool featured badge */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Featured Tool: <strong className="text-slate-800">{guide.primaryTool.name}</strong>
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                to={`/guides/${guide.slug}`}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 group"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to={guide.primaryTool.path}
                className="text-2xs sm:text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
              >
                Launch Tool →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Quick Category Jump Navigation */}
      <div className="p-8 rounded-2xl bg-slate-900 text-white">
        <div className="max-w-2xl mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1 flex items-center gap-1.5">
            <Layers className="w-4 h-4" />
            Explore Tool Categories
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Looking for a specific utility?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
            Every tool on Toolora is free, runs locally in your web browser, and requires no account or installation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            to="/category/image-tools"
            className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-colors"
          >
            <div className="font-semibold text-sm text-white">Image Tools</div>
            <div className="text-2xs text-slate-400 mt-0.5">22 client-side photo utilities</div>
          </Link>
          <Link
            to="/category/pdf-tools"
            className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-colors"
          >
            <div className="font-semibold text-sm text-white">PDF Tools</div>
            <div className="text-2xs text-slate-400 mt-0.5">7 browser document utilities</div>
          </Link>
          <Link
            to="/category/student-tools"
            className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-colors"
          >
            <div className="font-semibold text-sm text-white">Student & Academic</div>
            <div className="text-2xs text-slate-400 mt-0.5">18 math & GPA calculators</div>
          </Link>
          <Link
            to="/category/utility-tools"
            className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-colors"
          >
            <div className="font-semibold text-sm text-white">Daily & Text Utilities</div>
            <div className="text-2xs text-slate-400 mt-0.5">16 everyday productivity tools</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
