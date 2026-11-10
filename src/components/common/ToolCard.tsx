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
  const categoryLabel =
    tool.category === 'image'
      ? 'Image Tool'
      : tool.category === 'pdf'
      ? 'PDF Tool'
      : tool.category === 'student'
      ? 'Student Tool'
      : tool.category === 'utility'
      ? 'Daily Utility'
      : 'Productivity Tool';

  if (variant === 'compact') {
    return (
      <Link
        to={`/tools/${tool.slug}`}
        aria-label={`Open ${tool.name}`}
        className="group flex items-center gap-3.5 p-3.5 min-h-[72px] rounded-2xl bg-white border border-[#E5EAF2] hover:border-blue-400 hover:shadow-[0_4px_16px_rgba(37,99,235,0.06)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
      >
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
          <IconRenderer name={tool.icon} className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1.5">
            <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate block">
              {tool.name}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>
          <p className="text-2xs sm:text-xs text-slate-600 line-clamp-1 mt-0.5 font-normal">
            {tool.description}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/tools/${tool.slug}`}
      aria-label={`Open ${tool.name}`}
      className="group relative flex flex-col justify-between p-6 min-h-[210px] rounded-2xl bg-white border border-[#E5EAF2] hover:border-blue-400 hover:shadow-[0_4px_20px_rgba(37,99,235,0.08)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
            <IconRenderer name={tool.icon} className="w-6 h-6" />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span>{categoryLabel}</span>
            {tool.badge && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-blue-600 font-semibold">{tool.badge}</span>
              </>
            )}
          </div>
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5">
          {tool.name}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal">
          {tool.description}
        </p>
      </div>

      <div className="mt-5 pt-3.5 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
        <span className="inline-flex items-center gap-1">
          <span>Open {tool.name}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
        <span className="text-2xs font-medium text-slate-500">Browser-only</span>
      </div>
    </Link>
  );
}

