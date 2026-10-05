import React, { useState } from 'react';
import { Copy, Check, RotateCcw, FileText } from 'lucide-react';

const SAMPLE_TEXT = `Technology has profoundly altered the modern landscape of education and knowledge dissemination. Through digital connectivity, students and researchers worldwide access comprehensive libraries, interactive computational models, and peer-reviewed literature in seconds. As digital tools become more refined, lightweight browser applications play an essential role in everyday productivity, facilitating calculation, document transformation, and focus without cumbersome software installations.`;

export function WordCounter() {
  const [text, setText] = useState<string>(SAMPLE_TEXT);
  const [copied, setCopied] = useState<boolean>(false);

  // Statistics
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const charactersWithSpaces = text.length;
  const charactersWithoutSpaces = text.replace(/\s+/g, '').length;
  const sentences = trimmed ? (text.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || (words > 0 ? 1 : 0) : 0;
  const paragraphs = trimmed ? text.split(/\n+/).filter((p) => p.trim().length > 0).length : 0;

  // Reading time (225 wpm)
  const readingSeconds = Math.ceil((words / 225) * 60);
  const readingMin = Math.floor(readingSeconds / 60);
  const readingSec = readingSeconds % 60;
  const readingDisplay = `${readingMin}m ${readingSec}s`;

  // Speaking time (130 wpm)
  const speakingSeconds = Math.ceil((words / 130) * 60);
  const speakingMin = Math.floor(speakingSeconds / 60);
  const speakingSec = speakingSeconds % 60;
  const speakingDisplay = `${speakingMin}m ${speakingSec}s`;

  // Keyword density
  const getTopKeywords = () => {
    if (!trimmed) return [];
    const stopWords = new Set(['the', 'and', 'a', 'to', 'of', 'in', 'is', 'it', 'that', 'as', 'for', 'with', 'on', 'was', 'by', 'at', 'an', 'be', 'this', 'which', 'or', 'from', 'are', 'not', 'have', 'has', 'had']);
    const wordList = trimmed.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const freq: Record<string, number> = {};
    for (const w of wordList) {
      if (!stopWords.has(w)) {
        freq[w] = (freq[w] || 0) + 1;
      }
    }
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const topKeywords = getTopKeywords();

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        <div className="p-3 bg-blue-50/70 border border-blue-200/60 rounded-xl text-center">
          <span className="text-[11px] font-semibold text-blue-700 uppercase">Words</span>
          <p className="text-2xl sm:text-3xl font-bold font-mono text-blue-600 mt-1">{words}</p>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Characters</span>
          <p className="text-2xl sm:text-3xl font-bold font-mono text-slate-800 mt-1">{charactersWithSpaces}</p>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">No Spaces</span>
          <p className="text-2xl sm:text-3xl font-bold font-mono text-slate-800 mt-1">{charactersWithoutSpaces}</p>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Sentences</span>
          <p className="text-2xl sm:text-3xl font-bold font-mono text-slate-800 mt-1">{sentences}</p>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Paragraphs</span>
          <p className="text-2xl sm:text-3xl font-bold font-mono text-slate-800 mt-1">{paragraphs}</p>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Read Time</span>
          <p className="text-base sm:text-lg font-bold font-mono text-slate-800 mt-2">{readingDisplay}</p>
        </div>
      </div>

      {/* Main Textarea */}
      <div className="relative">
        <textarea
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or write your text here to analyze..."
          className="w-full p-4 text-base text-slate-800 bg-slate-50/60 border border-slate-300 rounded-2xl focus:bg-white focus:outline-hidden focus:border-blue-500 leading-relaxed font-sans"
        />
      </div>

      {/* Action Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Text'}
          </button>
          <button
            type="button"
            onClick={() => setText(SAMPLE_TEXT)}
            className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Load Sample
          </button>
          <button
            type="button"
            onClick={() => setText('')}
            className="px-3 py-1.5 text-slate-500 hover:text-red-600 transition-colors"
          >
            Clear Text
          </button>
        </div>

        <div className="text-slate-500">
          Estimated speaking duration: <span className="font-semibold text-slate-800">{speakingDisplay}</span>
        </div>
      </div>

      {/* Top Keywords Pill-less Table */}
      {topKeywords.length > 0 && (
        <div className="mt-6 pt-5 border-t border-slate-200">
          <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Top Keyword Frequency
          </h4>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
            {topKeywords.map(([kw, count], idx) => (
              <span key={kw} className="flex items-center gap-1.5">
                <span className="font-medium text-slate-900">{kw}</span>
                <span className="font-mono text-slate-400">({count}x)</span>
                {idx < topKeywords.length - 1 && <span className="text-slate-300" aria-hidden="true">·</span>}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
