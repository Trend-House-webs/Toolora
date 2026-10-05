import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { getCategoryBySlug, TOOLS } from '../data/tools';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ToolCard } from '../components/common/ToolCard';
import { SEO } from '../components/common/SEO';

interface CategoryPageProps {
  categorySlug: string;
}

export function CategoryPage({ categorySlug }: CategoryPageProps) {
  const category = getCategoryBySlug(categorySlug);
  const [filterQuery, setFilterQuery] = useState('');

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <SEO
          title="Category Not Found — Toolora"
          description="The category you requested does not exist on Toolora."
          canonicalPath="/category/not-found"
        />
        <h1 className="text-2xl font-bold text-slate-900">Category Not Found</h1>
        <p className="text-slate-500 mt-2">The category you requested does not exist.</p>
      </div>
    );
  }

  const categoryTools = TOOLS.filter((t) =>
    category.id === 'student-utility'
      ? t.category === 'student' || t.category === 'utility' || t.category === 'student-utility'
      : t.category === category.id
  );
  const filteredTools = categoryTools.filter(
    (t) =>
      t.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.title} — Toolora`,
    description: category.description,
    url: `https://toolora.com/category/${category.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: categoryTools.map((t, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `https://toolora.com/tools/${t.slug}`,
        name: t.name,
      })),
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* SEO & Structured Data */}
      <SEO
        title={`${category.title} — Free Online Utilities | Toolora`}
        description={category.description}
        canonicalPath={`/category/${category.slug}`}
        schema={collectionSchema}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: category.title }]} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            <span>Directory</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>{categoryTools.length} Free Browser Tools</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {category.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Filter input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder={`Filter ${category.title}...`}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            aria-label={`Filter ${category.title}`}
          />
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-slate-500">
          <p className="text-base font-semibold">No tools found matching "{filterQuery}"</p>
          <p className="text-xs text-slate-400 mt-1">Try another search keyword.</p>
        </div>
      )}
    </div>
  );
}
