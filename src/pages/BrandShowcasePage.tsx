import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  Copy,
  Download,
  Eye,
  Layers,
  Palette,
  ShieldCheck,
  Smartphone,
  Globe,
  Maximize2,
} from 'lucide-react';
import { TooloraLogo, TooloraIcon } from '../components/common/Logo';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export function BrandShowcasePage() {
  const [bgMode, setBgMode] = useState<'white' | 'light' | 'dark' | 'slate'>('white');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const svgIconCode = `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Toolora Precision Apex T -->
  <path d="M21 14.5 L47.5 14.5 C49.4 14.5 50.5 15.6 50.5 17.5 L50.5 20 C50.5 21.9 49.4 23 47.5 23 L15.5 23 C14.3 23 13.8 21.7 14.5 20.8 L18.8 15.6 C19.4 14.9 20.2 14.5 21 14.5 Z" fill="#2563EB" />
  <path d="M30.5 26.5 L37 26.5 C38.4 26.5 39.5 27.6 39.5 29 L39.5 46.5 C39.5 48.4 38 49.5 36 49.5 L29.5 49.5 C27.6 49.5 26.5 48.4 26.5 46.5 L26.5 30.5 C26.5 29.7 26.9 28.9 27.5 28.3 L29.3 26.9 C29.7 26.6 30.1 26.5 30.5 26.5 Z" fill="#1D4ED8" />
</svg>`;

  const svgFaviconCode = `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Solid White Container -->
  <rect width="64" height="64" fill="#FFFFFF" />
  <!-- Toolora Precision Apex T -->
  <path d="M21 14.5 L47.5 14.5 C49.4 14.5 50.5 15.6 50.5 17.5 L50.5 20 C50.5 21.9 49.4 23 47.5 23 L15.5 23 C14.3 23 13.8 21.7 14.5 20.8 L18.8 15.6 C19.4 14.9 20.2 14.5 21 14.5 Z" fill="#2563EB" />
  <path d="M30.5 26.5 L37 26.5 C38.4 26.5 39.5 27.6 39.5 29 L39.5 46.5 C39.5 48.4 38 49.5 36 49.5 L29.5 49.5 C27.6 49.5 26.5 48.4 26.5 46.5 L26.5 30.5 C26.5 29.7 26.9 28.9 27.5 28.3 L29.3 26.9 C29.7 26.6 30.1 26.5 30.5 26.5 Z" fill="#1D4ED8" />
</svg>`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      <SEO
        title="Toolora Brand Identity & Master Logo"
        description="The luxury minimalist brand identity for Toolora. Explore the Precision Apex mark, solid white favicon, typography system, and vector assets."
        canonicalPath="/brand"
      />

      {/* Header & Breadcrumbs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Brand Identity', href: '/brand' },
            ]}
          />
          <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Brand Identity Specification
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                The New Toolora Identity
              </h1>
              <p className="text-slate-600 mt-1 max-w-2xl text-sm sm:text-base">
                A luxury minimalist mark engineered for clarity, architectural balance, and iconic tech presence across all scales.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/brand/toolora-icon.svg"
                download="toolora-icon.svg"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                Download SVG Pack
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        {/* SECTION 1: MASTER HERO STAGE */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-slate-50/60">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Interactive Background Preview
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-lg">
              <button
                onClick={() => setBgMode('white')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                  bgMode === 'white'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pure White
              </button>
              <button
                onClick={() => setBgMode('light')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                  bgMode === 'light'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Gallery (#F8FAFC)
              </button>
              <button
                onClick={() => setBgMode('dark')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                  bgMode === 'dark'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Obsidian (#0A0F1D)
              </button>
              <button
                onClick={() => setBgMode('slate')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                  bgMode === 'slate'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Slate (#0F172A)
              </button>
            </div>
          </div>

          {/* Canvas Presentation */}
          <div
            className={`p-12 sm:p-20 flex flex-col items-center justify-center transition-colors duration-300 min-h-[380px] ${
              bgMode === 'white'
                ? 'bg-white text-slate-900'
                : bgMode === 'light'
                ? 'bg-slate-50 text-slate-900'
                : bgMode === 'dark'
                ? 'bg-[#0A0F1D] text-white'
                : 'bg-[#0F172A] text-white'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              {/* Scaled High-Res Brand Mark */}
              <div className="relative mb-6 transform transition-transform hover:scale-105 duration-300">
                <TooloraIcon
                  className="w-24 h-24 sm:w-32 sm:h-32 drop-shadow-sm"
                  variant={bgMode === 'dark' || bgMode === 'slate' ? 'light' : 'default'}
                />
              </div>

              {/* Wordmark */}
              <h2
                className={`text-4xl sm:text-5xl font-extrabold tracking-[-0.035em] leading-tight ${
                  bgMode === 'dark' || bgMode === 'slate' ? 'text-white' : 'text-slate-900'
                }`}
                style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
              >
                Toolora
              </h2>

              {/* Tagline */}
              <p
                className={`mt-2 text-base sm:text-lg font-medium tracking-normal ${
                  bgMode === 'dark' || bgMode === 'slate' ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Everyday tools, made simple.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 2: THE FAVICON / APP ICON (STRICT SOLID WHITE BACKGROUND REQUIREMENT) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full mb-1">
                <Check className="w-3.5 h-3.5" />
                Solid White Background Standard
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Favicon & App Icon Specification
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Strictly rendered on a pure solid white container (<code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">#FFFFFF</code>) for maximum contrast against dark OS themes and browser chrome.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(svgFaviconCode, 'favicon')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
              >
                {copiedKey === 'favicon' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Copied SVG
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy SVG Code
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Display 1: High-Res Master Squircle */}
            <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-xs font-semibold text-slate-500 mb-4 uppercase tracking-wider">
                App Icon / Squircle
              </span>
              <div className="w-32 h-32 rounded-3xl bg-white shadow-lg border border-slate-200/80 flex items-center justify-center transition hover:scale-105 duration-200">
                <TooloraIcon className="w-20 h-20" />
              </div>
              <span className="text-xs text-slate-400 mt-4">128 × 128 px Solid White</span>
            </div>

            {/* Display 2: Dark Theme Browser Tab Simulation */}
            <div className="flex flex-col items-center justify-center p-8 bg-slate-900 rounded-xl text-center">
              <span className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                Dark Browser Tab Simulation
              </span>
              {/* Fake Dark Browser Tab */}
              <div className="bg-slate-800 border border-slate-700 rounded-t-lg px-4 py-2.5 flex items-center gap-3 shadow-md max-w-[220px] w-full">
                <div className="w-5 h-5 rounded-md bg-white p-0.5 shadow-sm flex items-center justify-center shrink-0">
                  <TooloraIcon className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left overflow-hidden">
                  <span className="text-xs text-slate-200 font-medium truncate">Toolora — Everyday Tools</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-4 leading-normal">
                Solid white container ensures the blue mark remains razor-sharp in dark mode browser tabs.
              </p>
            </div>

            {/* Display 3: Mobile Home Screen Simulation */}
            <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 rounded-xl text-center">
              <span className="text-xs font-semibold text-slate-300 mb-4 uppercase tracking-wider flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" />
                Mobile Home Screen
              </span>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-2xl border border-white/20 flex items-center justify-center">
                  <TooloraIcon className="w-10 h-10" />
                </div>
                <span className="text-xs text-white/90 font-medium mt-2">Toolora</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-4">
                Crisp stand-out presence against complex wallpapers.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: SCALABILITY & OPTICAL LEGIBILITY GRID */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="pb-6 border-b border-slate-100">
            <h3 className="text-xl font-bold text-slate-900">
              Micro-Scale Legibility Matrix
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Tested rigorously across physical UI contexts: from 16px micro-favicons up to 256px showcase displays.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-8">
            {/* 16px */}
            <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-[11px] font-semibold text-slate-500 mb-3">16 × 16 px</span>
              <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center shadow-xs">
                <TooloraIcon className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-slate-400 mt-2">Favicon</span>
            </div>

            {/* 24px */}
            <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-[11px] font-semibold text-slate-500 mb-3">24 × 24 px</span>
              <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center shadow-xs">
                <TooloraIcon className="w-6 h-6" />
              </div>
              <span className="text-[10px] text-slate-400 mt-2">Compact UI</span>
            </div>

            {/* 32px */}
            <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-[11px] font-semibold text-slate-500 mb-3">32 × 32 px</span>
              <div className="w-14 h-14 bg-white rounded-lg border border-slate-200 flex items-center justify-center shadow-xs">
                <TooloraIcon className="w-8 h-8" />
              </div>
              <span className="text-[10px] text-slate-400 mt-2">Navbar</span>
            </div>

            {/* 48px */}
            <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-[11px] font-semibold text-slate-500 mb-3">48 × 48 px</span>
              <div className="w-16 h-16 bg-white rounded-lg border border-slate-200 flex items-center justify-center shadow-xs">
                <TooloraIcon className="w-12 h-12" />
              </div>
              <span className="text-[10px] text-slate-400 mt-2">Hero / Header</span>
            </div>

            {/* 64px */}
            <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-[11px] font-semibold text-slate-500 mb-3">64 × 64 px</span>
              <div className="w-20 h-20 bg-white rounded-xl border border-slate-200 flex items-center justify-center shadow-xs">
                <TooloraIcon className="w-16 h-16" />
              </div>
              <span className="text-[10px] text-slate-400 mt-2">App Tile</span>
            </div>

            {/* 96px */}
            <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-[11px] font-semibold text-slate-500 mb-3">96 × 96 px</span>
              <div className="w-24 h-24 bg-white rounded-2xl border border-slate-200 flex items-center justify-center shadow-xs">
                <TooloraIcon className="w-20 h-20" />
              </div>
              <span className="text-[10px] text-slate-400 mt-2">Marketing</span>
            </div>
          </div>
        </div>

        {/* SECTION 4: DESIGN RATIONALE — OLD VS. NEW EVOLUTION */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="pb-6 border-b border-slate-100">
            <h3 className="text-xl font-bold text-slate-900">
              Identity Evolution: Why This Design Is Superior
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Moving from dated multi-color gradients to timeless architectural minimalism.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* The Previous Concept */}
            <div className="p-6 rounded-xl bg-rose-50/50 border border-rose-100">
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
                Previous Iteration (2018-era Ribbon)
              </span>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>Excessive Gradient Complexity:</strong> Cyan-to-purple multi-stop blend suffered from muddy color banding in sRGB monitors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>Fold Confusion at Small Sizes:</strong> Overlapping origami folds blurred together at 16px and 24px favicon resolutions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>Generic Vector Template Aesthetic:</strong> Resembled off-the-shelf stock icons rather than proprietary SaaS design.</span>
                </li>
              </ul>
            </div>

            {/* The New Concept */}
            <div className="p-6 rounded-xl bg-emerald-50/50 border border-emerald-100">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                New Identity: The Precision Apex T
              </span>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Architectural Precision:</strong> Mathematically harmonized 45° chamfers convey tool craftsmanship, precision, and efficiency.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Zero Clutter:</strong> Two interlocking structural facets with intentional negative space channel—no cheesy shadows or fake bevels.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Flawless High-Contrast Favicon:</strong> Dedicated pure solid white squircle container guarantees visibility on every OS and browser mode.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SECTION 5: COLOR SYSTEM & TYPOGRAPHY TOKENS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Color System */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Palette className="w-5 h-5 text-blue-600" />
              Signature Color Palette
            </h3>
            <div className="space-y-3.5">
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#2563EB] shadow-xs" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Royal Cobalt</span>
                    <span className="text-[11px] text-slate-500">Top Cantilever / Primary Accent</span>
                  </div>
                </div>
                <code className="text-xs font-mono text-slate-600 bg-white px-2 py-1 rounded border border-slate-200">#2563EB</code>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1D4ED8] shadow-xs" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Deep Sapphire</span>
                    <span className="text-[11px] text-slate-500">Vertical Keystone Monolith</span>
                  </div>
                </div>
                <code className="text-xs font-mono text-slate-600 bg-white px-2 py-1 rounded border border-slate-200">#1D4ED8</code>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FFFFFF] border border-slate-300 shadow-xs" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Pure Solid White</span>
                    <span className="text-[11px] text-slate-500">Favicon Background Tile</span>
                  </div>
                </div>
                <code className="text-xs font-mono text-slate-600 bg-white px-2 py-1 rounded border border-slate-200">#FFFFFF</code>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0F172A] shadow-xs" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Slate 900 / Onyx</span>
                    <span className="text-[11px] text-slate-500">Wordmark Typography</span>
                  </div>
                </div>
                <code className="text-xs font-mono text-slate-600 bg-white px-2 py-1 rounded border border-slate-200">#0F172A</code>
              </div>
            </div>
          </div>

          {/* Typography System */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              Typography & Kerning Rationale
            </h3>
            <div className="space-y-4 text-sm text-slate-600">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-bold text-slate-900 block mb-1">
                  Primary Wordmark: Plus Jakarta Sans (Extrabold 800)
                </span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Engineered with an optical tracking of <code className="bg-white px-1 py-0.5 rounded border border-slate-200 text-slate-700">-0.035em</code> to provide tight, authoritative SaaS presence that holds ground alongside Stripe and Linear.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-bold text-slate-900 block mb-1">
                  Tagline: "Everyday tools, made simple."
                </span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Rendered in Medium (500) weight in Slate 500 (<code className="bg-white px-1 py-0.5 rounded border border-slate-200 text-slate-700">#64748B</code>) with clean sentence casing. Ensures high legibility without competing with the primary wordmark.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-bold text-slate-900 block mb-1">
                  Optical Vertical Alignment
                </span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  The geometric apex of the icon's top cantilever aligns precisely with the cap-height of the initial capital "T", preserving harmonious baseline rhythm.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 6: READY-TO-USE VECTOR ASSETS */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Production Deliverables
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                Vector Master Files
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                All production SVG files are packaged in the repository and ready for instant deployment.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <a
              href="/favicon.svg"
              download="favicon.svg"
              className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 flex flex-col justify-between transition group"
            >
              <div>
                <span className="text-xs font-bold text-white block group-hover:text-blue-400 transition">
                  favicon.svg
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Solid white background browser favicon
                </span>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-blue-400 font-medium">
                <Download className="w-3.5 h-3.5" />
                Download
              </div>
            </a>

            <a
              href="/brand/toolora-icon.svg"
              download="toolora-icon.svg"
              className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 flex flex-col justify-between transition group"
            >
              <div>
                <span className="text-xs font-bold text-white block group-hover:text-blue-400 transition">
                  toolora-icon.svg
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Standalone transparent vector mark
                </span>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-blue-400 font-medium">
                <Download className="w-3.5 h-3.5" />
                Download
              </div>
            </a>

            <a
              href="/brand/toolora-app-icon.svg"
              download="toolora-app-icon.svg"
              className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 flex flex-col justify-between transition group"
            >
              <div>
                <span className="text-xs font-bold text-white block group-hover:text-blue-400 transition">
                  toolora-app-icon.svg
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Solid white squircle app tile
                </span>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-blue-400 font-medium">
                <Download className="w-3.5 h-3.5" />
                Download
              </div>
            </a>

            <a
              href="/brand/toolora-logo-dark.svg"
              download="toolora-logo-dark.svg"
              className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 flex flex-col justify-between transition group"
            >
              <div>
                <span className="text-xs font-bold text-white block group-hover:text-blue-400 transition">
                  toolora-logo-dark.svg
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Master logo for dark backgrounds
                </span>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-blue-400 font-medium">
                <Download className="w-3.5 h-3.5" />
                Download
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
