import React from 'react';
import { ToolItem } from '../types';
import { getToolBySlug } from '../data/tools';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ToolCard } from '../components/common/ToolCard';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { SEO } from '../components/common/SEO';
import { ShieldCheck, Zap, Lock, CheckCircle2, Lightbulb, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from '../context/RouterContext';

// Import all tool workspaces
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

import { JpgToPdfTool } from '../components/tools/pdf/JpgToPdfTool';
import { PngToPdfTool } from '../components/tools/pdf/PngToPdfTool';
import { PdfMetadataViewer } from '../components/tools/pdf/PdfMetadataViewer';

import { PercentageCalculator } from '../components/tools/utility/PercentageCalculator';
import { AgeCalculator } from '../components/tools/utility/AgeCalculator';
import { GpaCalculator } from '../components/tools/utility/GpaCalculator';
import { WordCounter } from '../components/tools/utility/WordCounter';
import { CharacterCounter } from '../components/tools/utility/CharacterCounter';
import { UnitConverter } from '../components/tools/utility/UnitConverter';
import { StudyTimer } from '../components/tools/utility/StudyTimer';
import { QrCodeGenerator } from '../components/tools/utility/QrCodeGenerator';

import { PercentageIncreaseCalc } from '../components/tools/student/PercentageIncreaseCalc';
import { PercentageDecreaseCalc } from '../components/tools/student/PercentageDecreaseCalc';
import { MarksPercentageCalc } from '../components/tools/student/MarksPercentageCalc';
import { DateDifferenceCalc } from '../components/tools/student/DateDifferenceCalc';
import { ReadingTimeCalc } from '../components/tools/student/ReadingTimeCalc';
import { AverageCalc } from '../components/tools/student/AverageCalc';
import { RandomNumberGen } from '../components/tools/student/RandomNumberGen';
import { PomodoroTimerTool } from '../components/tools/student/PomodoroTimerTool';

import { PasswordGen } from '../components/tools/utility/PasswordGen';
import { Base64Tool } from '../components/tools/utility/Base64Tool';
import { UrlEncodeTool } from '../components/tools/utility/UrlEncodeTool';
import { JsonFormatter } from '../components/tools/utility/JsonFormatter';
import { ColorConverterTool } from '../components/tools/utility/ColorConverterTool';
import { TextCaseConverter } from '../components/tools/utility/TextCaseConverter';
import { RemoveDuplicateLines } from '../components/tools/utility/RemoveDuplicateLines';

import { MergePdfTool } from '../components/tools/pdf/MergePdfTool';
import { SplitPdfTool } from '../components/tools/pdf/SplitPdfTool';
import { RotatePdfTool } from '../components/tools/pdf/RotatePdfTool';
import { PdfPageCounter } from '../components/tools/pdf/PdfPageCounter';

import { CgpaCalculator } from '../components/tools/student/CgpaCalculator';
import { GradeCalculator } from '../components/tools/student/GradeCalculator';
import { FractionCalculator } from '../components/tools/student/FractionCalculator';
import { RatioCalculator } from '../components/tools/student/RatioCalculator';
import { ScientificCalculator } from '../components/tools/student/ScientificCalculator';
import { SentenceCounter } from '../components/tools/student/SentenceCounter';
import { NumberToWords } from '../components/tools/student/NumberToWords';

import { UuidGenerator } from '../components/tools/utility/UuidGenerator';
import { TimestampConverter } from '../components/tools/utility/TimestampConverter';
import { TextCleaner } from '../components/tools/utility/TextCleaner';
import { RandomStringGenerator } from '../components/tools/utility/RandomStringGenerator';
import { ImageDpiChecker } from '../components/tools/image/ImageDpiChecker';

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
        return { name: 'Student Tools', href: '/category/student-tools' };
      case 'utility':
        return { name: 'Daily & Text Utilities', href: '/category/utility-tools' };
      default:
        return { name: 'Student & Utility Tools', href: '/category/student-utility' };
    }
  };

  const { name: categoryName, href: categoryHref } = getCategoryDetails();

  // Render proper tool workspace
  const renderWorkspace = () => {
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

  const relatedTools = (tool.relatedSlugs || [])
    .map((s) => getToolBySlug(s))
    .filter((t): t is ToolItem => Boolean(t))
    .slice(0, 4);

  // Schema.org WebApplication specification
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    url: `https://toolora.com/tools/${tool.slug}`,
    description: tool.detailedDescription || tool.description,
    applicationCategory: tool.category === 'image' ? 'MultimediaApplication' : 'UtilitiesApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Dynamic SEO Tags & Structured Data */}
      <SEO
        title={tool.metaTitle || `${tool.name} — Toolora`}
        description={tool.metaDescription || tool.description}
        canonicalPath={`/tools/${tool.slug}`}
        schema={webAppSchema}
        faqItems={tool.faq}
      />

      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: categoryName, href: categoryHref },
            { label: tool.name },
          ]}
        />
      </div>

      {/* Header section with Single H1 */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
          <span>{categoryName.toUpperCase()}</span>
          {tool.badge && (
            <>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">{tool.badge}</span>
            </>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          {tool.name}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
          {tool.detailedDescription || tool.description}
        </p>

        {/* Real browser trust markers */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-4">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            100% Client-Side Processing
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            Zero Server Uploads
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-blue-600" />
            Free & Unlimited
          </span>
        </div>
      </div>

      {/* Primary Tool Workspace */}
      <section aria-label={`${tool.name} Workspace`} className="mb-14">
        {renderWorkspace()}
      </section>

      {/* How to Use Section */}
      {tool.howToUse && tool.howToUse.length > 0 && (
        <section className="mb-14 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
              ?
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                How to Use {tool.name}
              </h2>
              <p className="text-xs text-slate-500">
                Follow these simple steps to get started in seconds.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tool.howToUse.map((step) => (
              <div
                key={step.step}
                className="relative p-5 rounded-xl bg-slate-50/70 border border-slate-200/70 flex flex-col justify-between"
              >
                <div>
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs mb-3 shadow-2xs">
                    {step.step}
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Why Use This Tool? & Key Benefits */}
      {tool.whyUse && tool.whyUse.length > 0 && (
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Why Use This {tool.name}?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Built to provide dependable everyday utility without the usual web friction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tool.whyUse.map((reason, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white border border-slate-200/80 flex items-start gap-3.5 shadow-2xs"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Pro Tips for Best Results */}
      {tool.tips && tool.tips.length > 0 && (
        <section className="mb-14 bg-amber-50/50 rounded-2xl border border-amber-200/70 p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-base sm:text-lg font-bold text-amber-950">
              Tips for Best Results
            </h2>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-amber-900/90 leading-relaxed">
            {tool.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Key Features */}
      {tool.features && tool.features.length > 0 && (
        <section className="mb-14 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
            Key Features of {tool.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {tool.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section with Accordion */}
      {tool.faq && tool.faq.length > 0 && (
        <section className="mb-14" aria-label="Frequently Asked Questions">
          <FaqAccordion
            items={tool.faq}
            title={`Frequently Asked Questions about ${tool.name}`}
          />
        </section>
      )}

      {/* Related Tools (Internal Linking) */}
      {relatedTools.length > 0 && (
        <section className="mt-14 pt-10 border-t border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight sm:text-2xl">
                Related Free Tools
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Explore more client-side utilities that pair well with {tool.name}.
              </p>
            </div>
            <Link
              to={categoryHref}
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
            >
              All {categoryName} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
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
