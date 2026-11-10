import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { TOOLS } from '../../data/tools';
import { useRouter } from '../../context/RouterContext';
import { IconRenderer } from './IconRenderer';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { navigate } = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          onClose(); // This would toggle if handled higher, but we listen for opening globally
        }
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredTools = TOOLS.filter((t) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.slug.toLowerCase().includes(q) ||
      (t.category === 'image' ? 'image' : 'student utility math calculator').includes(q)
    );
  });

  const handleSelect = (slug: string) => {
    onClose();
    navigate(`/tools/${slug}`);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search tools"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E5EAF2] overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 sm:px-6 border-b border-[#E5EAF2] bg-white">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev < filteredTools.length - 1 ? prev + 1 : prev));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
              } else if (e.key === 'Enter' && filteredTools[selectedIndex]) {
                e.preventDefault();
                handleSelect(filteredTools[selectedIndex].slug);
              }
            }}
            placeholder={`Search all ${TOOLS.length} tools (e.g. compress, pdf, gpa, percentage, qr)...`}
            className="w-full py-4 px-3 text-sm sm:text-base bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-hidden font-normal"
          />
          <button
            onClick={onClose}
            className="p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center text-slate-500 hover:text-slate-700 rounded-xl hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus:outline-hidden transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results list */}
        <div className="overflow-y-auto p-3 divide-y divide-[#F1F5F9] flex-1">
          {filteredTools.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <p className="text-base font-bold text-slate-800">No tools match "{query}"</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for "image", "calculator", "resizer", or "word".</p>
            </div>
          ) : (
            filteredTools.map((tool, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={tool.id}
                  onClick={() => handleSelect(tool.slug)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left flex items-center justify-between p-3 rounded-2xl transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus:outline-hidden cursor-pointer ${
                    isSelected ? 'bg-blue-50 text-blue-900' : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      <IconRenderer name={tool.icon} className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 truncate">{tool.name}</span>
                        <span className="text-2xs text-slate-500 font-medium bg-slate-100 px-1.5 py-0.5 rounded">
                          {tool.category === 'image' ? 'Image' : tool.category === 'pdf' ? 'PDF' : tool.category === 'student' ? 'Student' : 'Utility'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 truncate mt-0.5 font-normal">{tool.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 ml-3 text-slate-400">
                    {isSelected && (
                      <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
                        Select <CornerDownLeft className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-[#F8FAFC] border-t border-[#E5EAF2] text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-300 rounded-md shadow-2xs">↑</kbd>{' '}
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-300 rounded-md shadow-2xs">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-300 rounded-md shadow-2xs">ESC</kbd> to close
            </span>
          </div>
          <span className="font-medium">{filteredTools.length} tools available</span>
        </div>
      </div>
    </div>
  );
}
