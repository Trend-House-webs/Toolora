import React, { Suspense } from 'react';
import { ToolItem } from '../types';
import { getToolBySlug, TOOLS } from '../data/tools';
import { getGuidesForTool } from '../data/guides';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ToolCard } from '../components/common/ToolCard';
import { SEO } from '../components/common/SEO';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from '../context/RouterContext';
import { SITE_URL } from '../config/site';
import { AdSenseBanner } from '../components/common/AdSenseBanner';

// Tool workspace components
import { ImageCompressor } from '../components/tools/image/ImageCompressor';
import { ImageResizer } from '../components/tools/image/ImageResizer';
import { FormatConverter } from '../components/tools/image/FormatConverter';
import { ImageToPdf } from '../components/tools/image/ImageToPdf';
import { CropImage } from '../components/tools/image/CropImage';
import { RotateFlipImage } from '../components/tools/image/RotateFlipImage';
import { WatermarkTool } from '../components/tools/image/WatermarkTool';
import { SocialMediaResizer } from '../components/tools/image/SocialMediaResizer';
import { RotateTool } from '../components/tools/image/RotateTool';
import { FlipTool } from '../components/tools/image/FlipTool';
import { ImageMetadataViewer } from '../components/tools/image/ImageMetadataViewer';
import { PassportPhotoResizer } from '../components/tools/image/PassportPhotoResizer';
import { PhotoSizeReducer } from '../components/tools/image/PhotoSizeReducer';
import { BmpToJpgTool } from '../components/tools/image/BmpToJpgTool';
import { TransparentBgChecker } from '../components/tools/image/TransparentBgChecker';
import { AspectRatioCalc } from '../components/tools/image/AspectRatioCalc';
import { ImageDpiChecker } from '../components/tools/image/ImageDpiChecker';

import { JpgToPdfTool } from '../components/tools/pdf/JpgToPdfTool';
import { PngToPdfTool } from '../components/tools/pdf/PngToPdfTool';
import { PdfMetadataViewer } from '../components/tools/pdf/PdfMetadataViewer';
import { MergePdfTool } from '../components/tools/pdf/MergePdfTool';
import { SplitPdfTool } from '../components/tools/pdf/SplitPdfTool';
import { RotatePdfTool } from '../components/tools/pdf/RotatePdfTool';
import { PdfPageCounter } from '../components/tools/pdf/PdfPageCounter';

import { PercentageCalculator } from '../components/tools/utility/PercentageCalculator';
import { AgeCalculator } from '../components/tools/utility/AgeCalculator';
import { GpaCalculator } from '../components/tools/utility/GpaCalculator';
import { WordCounter } from '../components/tools/utility/WordCounter';
import { CharacterCounter } from '../components/tools/utility/CharacterCounter';
import { UnitConverter } from '../components/tools/utility/UnitConverter';
import { StudyTimer } from '../components/tools/utility/StudyTimer';
import { QrCodeGenerator } from '../components/tools/utility/QrCodeGenerator';
import { PasswordGen } from '../components/tools/utility/PasswordGen';
import { Base64Tool } from '../components/tools/utility/Base64Tool';
import { UrlEncodeTool } from '../components/tools/utility/UrlEncodeTool';
import { JsonFormatter } from '../components/tools/utility/JsonFormatter';
import { ColorConverterTool } from '../components/tools/utility/ColorConverterTool';
import { TextCaseConverter } from '../components/tools/utility/TextCaseConverter';
import { RemoveDuplicateLines } from '../components/tools/utility/RemoveDuplicateLines';
import { UuidGenerator } from '../components/tools/utility/UuidGenerator';
import { TimestampConverter } from '../components/tools/utility/TimestampConverter';
import { TextCleaner } from '../components/tools/utility/TextCleaner';
import { RandomStringGenerator } from '../components/tools/utility/RandomStringGenerator';

import { PercentageIncreaseCalc } from '../components/tools/student/PercentageIncreaseCalc';
import { PercentageDecreaseCalc } from '../components/tools/student/PercentageDecreaseCalc';
import { MarksPercentageCalc } from '../components/tools/student/MarksPercentageCalc';
import { DateDifferenceCalc } from '../components/tools/student/DateDifferenceCalc';
import { ReadingTimeCalc } from '../components/tools/student/ReadingTimeCalc';
import { AverageCalc } from '../components/tools/student/AverageCalc';
import { RandomNumberGen } from '../components/tools/student/RandomNumberGen';
import { PomodoroTimerTool } from '../components/tools/student/PomodoroTimerTool';
import { CgpaCalculator } from '../components/tools/student/CgpaCalculator';
import { GradeCalculator } from '../components/tools/student/GradeCalculator';
import { FractionCalculator } from '../components/tools/student/FractionCalculator';
import { RatioCalculator } from '../components/tools/student/RatioCalculator';
import { ScientificCalculator } from '../components/tools/student/ScientificCalculator';
import { SentenceCounter } from '../components/tools/student/SentenceCounter';
import { NumberToWords } from '../components/tools/student/NumberToWords';

function WorkspaceSkeleton({ toolName }: { toolName: string }) {
  return (
    <div
      role="status"
      aria-label={`Loading ${toolName} workspace`}
      className="w-full min-h-[300px] flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-slate-200/90 shadow-xs"
    >
      <div className="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
      <span className="text-sm font-semibold text-slate-800">Loading {toolName}...</span>
      <span className="text-xs text-slate-500 mt-1">Initializing client-side workspace in your browser</span>
    </div>
  );
}

function renderFormattedText(text: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const linkText = match[1];
    const linkHref = match[2];
    parts.push(
      <Link
        key={`${linkHref}-${match.index}`}
        to={linkHref}
        className="font-semibold text-blue-600 hover:text-blue-800 underline decoration-blue-300 underline-offset-2 transition-colors"
      >
        {linkText}
      </Link>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

interface ToolPageWrapperProps {
  tool: ToolItem;
}

export function ToolPageWrapper({ tool }: ToolPageWrapperProps) {
  const getCategoryDetails = () => {
    switch (tool.category) {
      case 'image':
        return { name: 'Image Tools', href: '/category/image-tools' };
      case 'pdf':
        return { name: 'PDF Tools', href: '/category/pdf-tools' };
      case 'student':
        return { name: 'Student & Academic Tools', href: '/category/student-tools' };
      case 'utility':
        return { name: 'Daily & Text Utilities', href: '/category/utility-tools' };
      default:
        return { name: 'Student & Utility Tools', href: '/category/student-utility' };
    }
  };

  const { name: categoryName, href: categoryHref } = getCategoryDetails();

  // Render proper tool workspace content
  const renderWorkspaceContent = () => {
    switch (tool.slug) {
      case 'image-compressor':
        return <ImageCompressor />;
      case 'image-resizer':
        return <ImageResizer />;
      case 'jpg-to-png':
        return (
          <FormatConverter
            sourceFormatName="JPG"
            targetFormatName="PNG"
            targetMime="image/png"
            targetExtension="png"
            accept="image/jpeg"
          />
        );
      case 'png-to-jpg':
        return (
          <FormatConverter
            sourceFormatName="PNG"
            targetFormatName="JPG"
            targetMime="image/jpeg"
            targetExtension="jpg"
            accept="image/png"
          />
        );
      case 'jpg-to-webp':
        return (
          <FormatConverter
            sourceFormatName="JPG"
            targetFormatName="WebP"
            targetMime="image/webp"
            targetExtension="webp"
            accept="image/jpeg"
          />
        );
      case 'png-to-webp':
        return (
          <FormatConverter
            sourceFormatName="PNG"
            targetFormatName="WebP"
            targetMime="image/webp"
            targetExtension="webp"
            accept="image/png"
          />
        );
      case 'webp-to-jpg':
        return (
          <FormatConverter
            sourceFormatName="WebP"
            targetFormatName="JPG"
            targetMime="image/jpeg"
            targetExtension="jpg"
            accept="image/webp"
          />
        );
      case 'webp-to-png':
        return (
          <FormatConverter
            sourceFormatName="WebP"
            targetFormatName="PNG"
            targetMime="image/png"
            targetExtension="png"
            accept="image/webp"
          />
        );
      case 'image-to-pdf':
        return <ImageToPdf />;
      case 'crop-image':
        return <CropImage />;
      case 'rotate-flip-image':
        return <RotateFlipImage />;
      case 'rotate-image':
        return <RotateTool />;
      case 'flip-image':
        return <FlipTool />;
      case 'image-metadata-viewer':
      case 'image-dimension-checker':
        return <ImageMetadataViewer />;
      case 'passport-photo-resizer':
        return <PassportPhotoResizer />;
      case 'photo-size-reducer':
        return <PhotoSizeReducer />;
      case 'bmp-to-jpg':
        return <BmpToJpgTool />;
      case 'transparent-background-checker':
        return <TransparentBgChecker />;
      case 'aspect-ratio-calculator':
        return <AspectRatioCalc />;
      case 'add-watermark':
        return <WatermarkTool />;
      case 'social-media-resizer':
        return <SocialMediaResizer />;
      case 'jpg-to-pdf':
        return <JpgToPdfTool />;
      case 'png-to-pdf':
        return <PngToPdfTool />;
      case 'pdf-metadata-viewer':
        return <PdfMetadataViewer />;
      case 'percentage-calculator':
        return <PercentageCalculator />;
      case 'percentage-increase-calculator':
        return <PercentageIncreaseCalc />;
      case 'percentage-decrease-calculator':
        return <PercentageDecreaseCalc />;
      case 'marks-percentage-calculator':
        return <MarksPercentageCalc />;
      case 'date-difference-calculator':
        return <DateDifferenceCalc />;
      case 'reading-time-calculator':
        return <ReadingTimeCalc />;
      case 'average-calculator':
        return <AverageCalc />;
      case 'random-number-generator':
        return <RandomNumberGen />;
      case 'pomodoro-timer':
        return <PomodoroTimerTool />;
      case 'password-generator':
        return <PasswordGen />;
      case 'base64-encoder-decoder':
        return <Base64Tool />;
      case 'url-encoder-decoder':
        return <UrlEncodeTool />;
      case 'json-formatter':
        return <JsonFormatter />;
      case 'color-converter':
        return <ColorConverterTool />;
      case 'text-case-converter':
        return <TextCaseConverter />;
      case 'remove-duplicate-lines':
        return <RemoveDuplicateLines />;
      case 'age-calculator':
        return <AgeCalculator />;
      case 'gpa-calculator':
        return <GpaCalculator />;
      case 'word-counter':
        return <WordCounter />;
      case 'character-counter':
        return <CharacterCounter />;
      case 'unit-converter':
        return <UnitConverter />;
      case 'study-timer':
        return <StudyTimer />;
      case 'qr-code-generator':
        return <QrCodeGenerator />;
      case 'merge-pdf':
        return <MergePdfTool />;
      case 'split-pdf':
        return <SplitPdfTool />;
      case 'rotate-pdf':
        return <RotatePdfTool />;
      case 'pdf-page-counter':
        return <PdfPageCounter />;
      case 'cgpa-calculator':
        return <CgpaCalculator />;
      case 'grade-calculator':
        return <GradeCalculator />;
      case 'fraction-calculator':
        return <FractionCalculator />;
      case 'ratio-calculator':
        return <RatioCalculator />;
      case 'scientific-calculator':
        return <ScientificCalculator />;
      case 'sentence-counter':
        return <SentenceCounter />;
      case 'number-to-words':
        return <NumberToWords />;
      case 'uuid-generator':
        return <UuidGenerator />;
      case 'timestamp-converter':
        return <TimestampConverter />;
      case 'text-cleaner':
        return <TextCleaner />;
      case 'random-string-generator':
        return <RandomStringGenerator />;
      case 'image-dpi-checker':
        return <ImageDpiChecker />;
      default:
        return (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <h3 className="text-base font-semibold text-slate-800">Workspace</h3>
            <p className="text-sm text-slate-500 mt-2">Loading tool components...</p>
          </div>
        );
    }
  };

  const renderWorkspace = () => (
    <Suspense fallback={<WorkspaceSkeleton toolName={tool.name} />}>
      {renderWorkspaceContent()}
    </Suspense>
  );

  const explicitRelated = (tool.relatedSlugs || [])
    .map((s) => getToolBySlug(s))
    .filter((t): t is ToolItem => Boolean(t));

  // Guarantee 4 sibling tools by filling with other tools from the same category
  const fallbackRelated = TOOLS.filter(
    (t) => t.category === tool.category && t.slug !== tool.slug && !explicitRelated.some((er) => er.slug === t.slug)
  );

  const relatedTools = [...explicitRelated, ...fallbackRelated].slice(0, 4);
  const relatedGuides = getGuidesForTool(tool.slug);

  // Schema.org WebApplication specification
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    url: `${SITE_URL}/tools/${tool.slug}`,
    description: tool.detailedDescription || tool.description,
    applicationCategory:
      tool.category === 'image'
        ? 'MultimediaApplication'
        : tool.category === 'student'
        ? 'EducationalApplication'
        : 'UtilitiesApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
  };

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
      {
        '@type': 'ListItem',
        position: 3,
        name: categoryName,
        item: `${SITE_URL}${categoryHref}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: tool.name,
        item: `${SITE_URL}/tools/${tool.slug}`,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Dynamic SEO Tags & Structured Data */}
      <SEO
        title={tool.metaTitle || `${tool.name} | Toolora`}
        description={tool.metaDescription || tool.description}
        canonicalPath={`/tools/${tool.slug}`}
        schema={[webAppSchema, breadcrumbSchema]}
      />

      {/* Breadcrumb Navigation: Home -> All Tools -> Category -> Tool */}
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: 'All Tools', href: '/tools' },
            { label: categoryName, href: categoryHref },
            { label: tool.name },
          ]}
        />
      </div>

      {/* Header section with Single H1 and short introduction */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-2 text-2xs sm:text-xs font-bold text-blue-600 mb-2">
          <Link to={categoryHref} className="hover:text-blue-800 transition-colors">
            {categoryName.toUpperCase()}
          </Link>
          {tool.badge && (
            <>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-medium">{tool.badge}</span>
            </>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          {tool.name}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed font-normal">
          {renderFormattedText(tool.detailedDescription || tool.description)}
        </p>
      </div>

      {/* Primary Tool Workspace */}
      <section
        aria-label={
          tool.slug === 'fraction-calculator'
            ? 'Fraction Calculator with Steps Workspace'
            : `${tool.name} Workspace`
        }
        className="mb-12"
      >
        {renderWorkspace()}
      </section>

      {/* Non-intrusive Ad Placement */}
      <AdSenseBanner className="mb-12" />

      {/* Concise "How to Use" Section with 3-5 Tool-Specific Steps */}
      <section
        aria-labelledby="how-to-use-heading"
        className="mb-10 bg-white rounded-2xl border border-[#E5EAF2] p-6 sm:p-8 shadow-[0_2px_12px_rgba(15,23,42,0.03)]"
      >
        <div className="max-w-3xl">
          <h2 id="how-to-use-heading" className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5">
            How to Use {tool.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {renderFormattedText(tool.usageGuide || tool.detailedDescription || tool.description)}
          </p>
        </div>

        {tool.howToUse && tool.howToUse.length > 0 && (
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {tool.howToUse.map((stepItem) => (
              <li
                key={stepItem.step}
                className="bg-slate-50/80 rounded-xl border border-slate-200/80 p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="w-6 h-6 rounded-md bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 tabular-nums">
                      {stepItem.step}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {stepItem.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {renderFormattedText(stepItem.description)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>

      {/* Lightweight Page-Specific Visual / Input-Output Example Card */}
      {tool.visualExample && (
        <section
          aria-labelledby="visual-example-heading"
          className="mb-12 bg-white rounded-2xl border border-[#E5EAF2] p-6 sm:p-8 shadow-[0_2px_12px_rgba(15,23,42,0.03)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
            <div>
              <span className="text-2xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
                Worked Input &amp; Output Example
              </span>
              <h2 id="visual-example-heading" className="text-lg sm:text-xl font-bold text-slate-900">
                {tool.visualExample.title}
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              {tool.visualExample.caption}
            </p>
          </div>

          {/* 3-Stage Input -> Process -> Output Visual Diagram */}
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-3.5 items-stretch">
            {/* Stage 1: Input */}
            <div className="lg:col-span-4 rounded-xl bg-slate-50 border border-slate-200/90 p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-2xs font-bold uppercase tracking-wider text-slate-500">
                    1. {tool.visualExample.inputLabel}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-slate-400" aria-hidden="true" />
                </div>
                <div className="font-mono text-xs sm:text-sm font-bold text-slate-900 bg-white rounded-lg border border-slate-200/80 px-3 py-2.5 mb-2.5 break-words tabular-nums">
                  {tool.visualExample.inputValue}
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {tool.visualExample.inputDetail}
              </p>
            </div>

            {/* Flow Arrow SVG 1 */}
            <div className="hidden lg:flex lg:col-span-1 items-center justify-center" aria-hidden="true">
              <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5 5 5-5 5" />
              </svg>
            </div>

            {/* Stage 2: Transformation / Formula */}
            <div className="lg:col-span-2 rounded-xl bg-blue-50/60 border border-blue-200/80 p-4 flex flex-col justify-between">
              <div>
                <span className="text-2xs font-bold uppercase tracking-wider text-blue-700 block mb-2">
                  2. {tool.visualExample.processLabel}
                </span>
                <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                  {tool.visualExample.processDetail}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-blue-200/60 text-2xs font-medium text-blue-700">
                Client-side calculation
              </div>
            </div>

            {/* Flow Arrow SVG 2 */}
            <div className="hidden lg:flex lg:col-span-1 items-center justify-center" aria-hidden="true">
              <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5 5 5-5 5" />
              </svg>
            </div>

            {/* Stage 3: Output */}
            <div className="lg:col-span-3 rounded-xl bg-emerald-50/50 border border-emerald-200/90 p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-2xs font-bold uppercase tracking-wider text-emerald-800">
                    3. {tool.visualExample.outputLabel}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
                </div>
                <div className="font-mono text-xs sm:text-sm font-bold text-emerald-950 bg-white rounded-lg border border-emerald-200/90 px-3 py-2.5 mb-2.5 break-words tabular-nums">
                  {tool.visualExample.outputValue}
                </div>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {tool.visualExample.outputDetail}
              </p>
            </div>
          </div>

          {/* Reference Metrics Strip */}
          {tool.visualExample.metrics && tool.visualExample.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100">
              {tool.visualExample.metrics.map((metric, idx) => (
                <div key={idx} className="bg-slate-50/70 rounded-lg border border-slate-200/70 px-3.5 py-2.5">
                  <span className="text-2xs font-semibold text-slate-500 block">
                    {metric.label}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 tabular-nums block mt-0.5">
                    {metric.value}
                  </span>
                  {metric.subtext && (
                    <span className="text-2xs text-slate-500 block mt-0.5">
                      {metric.subtext}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Optional Local SVG Diagram */}
          {tool.visualExample.svgPath && (
            <figure className="mt-6 pt-5 border-t border-slate-100">
              <img
                src={tool.visualExample.svgPath}
                alt={tool.visualExample.svgAlt || `${tool.name} visual reference diagram`}
                loading="lazy"
                width={960}
                height={420}
                className="w-full h-auto rounded-xl border border-slate-200/80 bg-slate-50/40"
              />
            </figure>
          )}
        </section>
      )}

      {/* Contextual Tutorial Guides Link Block (when matching guides exist) */}
      {relatedGuides.length > 0 && (
        <section className="mb-12 bg-slate-50/90 rounded-2xl border border-[#E5EAF2] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4 mb-3.5">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Step-by-Step Guides for {tool.name}
              </h2>
            </div>
            <Link
              to="/guides"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>All Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedGuides.map((guide) => (
              <Link
                key={guide.slug}
                to={`/guides/${guide.slug}`}
                className="group bg-white rounded-xl border border-slate-200/90 p-4 hover:border-blue-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xs font-bold uppercase tracking-wider text-blue-600">
                    {guide.categoryName} · {guide.readTime}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-1">
                    {guide.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">
                  {guide.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Tools (Internal Linking to Sibling Tools, Category & All Tools Directory) */}
      {relatedTools.length > 0 && (
        <section className="pt-8 border-t border-[#E5EAF2]">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight sm:text-2xl">
                Related Free Tools
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                Explore more browser-based tools in{' '}
                <Link to={categoryHref} className="font-semibold text-blue-600 hover:text-blue-800 underline decoration-blue-200 underline-offset-2">
                  {categoryName}
                </Link>{' '}
                or browse the complete{' '}
                <Link to="/tools" className="font-semibold text-blue-600 hover:text-blue-800 underline decoration-blue-200 underline-offset-2">
                  All Tools Directory
                </Link>
                .
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to={categoryHref}
                className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
              >
                <span>All {categoryName}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/tools"
                className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <span>All 63 Tools</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map((relTool) => (
              <ToolCard key={relTool.id} tool={relTool} variant="compact" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

