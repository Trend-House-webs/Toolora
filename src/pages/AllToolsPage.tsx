import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { TOOLS } from '../data/tools';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ToolCard } from '../components/common/ToolCard';
import { SEO } from '../components/common/SEO';
import { SITE_URL } from '../config/site';

export function AllToolsPage() {
  const [filter, setFilter] = useState<'all' | 'image' | 'pdf' | 'student' | 'utility'>('all');
  const [search, setSearch] = useState('');

  const imageCount = TOOLS.filter((t) => t.category === 'image').length;
  const pdfCount = TOOLS.filter((t) => t.category === 'pdf').length;
  const studentCount = TOOLS.filter((t) => t.category === 'student').length;
  const utilityCount = TOOLS.filter((t) => t.category === 'utility').length;

  const filtered = TOOLS.filter((t) => {
    if (filter !== 'all' && t.category !== filter) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.slug.toLowerCase().includes(q)
    );
  });

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
        name: 'All Tools Directory',
        item: `${SITE_URL}/tools`,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* SEO & Structured Data */}
      <SEO
        title="All Free Online Tools Directory — Toolora"
        description="Browse our complete directory of free online browser utilities. Fast, client-side, with zero sign-up or payments."
        canonicalPath="/tools"
        schema={breadcrumbSchema}
      />

      <Breadcrumbs items={[{ label: 'All Tools Directory' }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            Complete Index
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            All Free Online Tools ({TOOLS.length})
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed max-w-2xl">
            Browse our full catalog of free online browser utilities. Fast, client-side, with zero sign-ups or payments.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Category tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto" role="tablist">
            <button
              role="tab"
              aria-selected={filter === 'all'}
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({TOOLS.length})
            </button>
            <button
              role="tab"
              aria-selected={filter === 'image'}
              onClick={() => setFilter('image')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'image' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Image ({imageCount})
            </button>
            <button
              role="tab"
              aria-selected={filter === 'pdf'}
              onClick={() => setFilter('pdf')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'pdf' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              PDF ({pdfCount})
            </button>
            <button
              role="tab"
              aria-selected={filter === 'student'}
              onClick={() => setFilter('student')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'student' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Student ({studentCount})
            </button>
            <button
              role="tab"
              aria-selected={filter === 'utility'}
              onClick={() => setFilter('utility')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'utility' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Utility ({utilityCount})
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search all tools..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              aria-label="Search all tools directory"
            />
          </div>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-slate-500">
          <p className="text-base font-semibold">No tools found matching your criteria</p>
          <p className="text-xs text-slate-400 mt-1">Try resetting the search or category filter.</p>
        </div>
      )}
    </div>
  );
}
