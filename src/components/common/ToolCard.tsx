import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ToolItem } from '../../types';
import { Link } from '../../context/RouterContext';
import { IconRenderer } from './IconRenderer';

interface ToolCardProps {
  tool: ToolItem;
  variant?: 'default' | 'compact';
}

export function ToolCard({ tool, variant = 'default' }: ToolCardProps) {
  const categoryLabel = tool.category === 'image' ? 'Image Tool' : 'Student & Utility';

  if (variant === 'compact') {
    return (
      <Link
        to={`/tools/${tool.slug}`}
        className="group flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200/80 hover:border-blue-500/60 hover:shadow-md transition-all duration-200"
      >
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
          <IconRenderer name={tool.icon} className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
              {tool.name}
            </h4>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>
          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
            {tool.description}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/tools/${tool.slug}`}
      className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-500/60 hover:shadow-lg transition-all duration-200"
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shadow-xs">
            <IconRenderer name={tool.icon} className="w-6 h-6" />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <span>{categoryLabel}</span>
            {tool.badge && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-blue-600 font-semibold">{tool.badge}</span>
              </>
            )}
          </div>
        </div>

        <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
          {tool.name}
        </h3>

        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-blue-600 group-hover:text-blue-700">
        <span className="inline-flex items-center gap-1.5">
          Open Tool
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
        <span className="text-xs font-normal text-slate-400">Browser-only</span>
      </div>
    </Link>
  );
}
