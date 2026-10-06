import React, { Suspense, lazy } from 'react';
import { ToolItem } from '../types';
import { getToolBySlug } from '../data/tools';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ToolCard } from '../components/common/ToolCard';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { SEO } from '../components/common/SEO';
import { ShieldCheck, Zap, Lock, CheckCircle2, Lightbulb, HelpCircle, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from '../context/RouterContext';
import { SITE_URL } from '../config/site';
import { getGuidesForTool } from '../data/guides';

// Code-split all tool workspaces on demand
const ImageCompressor = lazy(() => import('../components/tools/image/ImageCompressor').then((m) => ({ default: m.ImageCompressor })));
const ImageResizer = lazy(() => import('../components/tools/image/ImageResizer').then((m) => ({ default: m.ImageResizer })));
const FormatConverter = lazy(() => import('../components/tools/image/FormatConverter').then((m) => ({ default: m.FormatConverter })));
const ImageToPdf = lazy(() => import('../components/tools/image/ImageToPdf').then((m) => ({ default: m.ImageToPdf })));
const CropImage = lazy(() => import('../components/tools/image/CropImage').then((m) => ({ default: m.CropImage })));
const RotateFlipImage = lazy(() => import('../components/tools/image/RotateFlipImage').then((m) => ({ default: m.RotateFlipImage })));
const WatermarkTool = lazy(() => import('../components/tools/image/WatermarkTool').then((m) => ({ default: m.WatermarkTool })));
const SocialMediaResizer = lazy(() => import('../components/tools/image/SocialMediaResizer').then((m) => ({ default: m.SocialMediaResizer })));
const RotateTool = lazy(() => import('../components/tools/image/RotateTool').then((m) => ({ default: m.RotateTool })));
const FlipTool = lazy(() => import('../components/tools/image/FlipTool').then((m) => ({ default: m.FlipTool })));
const ImageMetadataViewer = lazy(() => import('../components/tools/image/ImageMetadataViewer').then((m) => ({ default: m.ImageMetadataViewer })));
const PassportPhotoResizer = lazy(() => import('../components/tools/image/PassportPhotoResizer').then((m) => ({ default: m.PassportPhotoResizer })));
const PhotoSizeReducer = lazy(() => import('../components/tools/image/PhotoSizeReducer').then((m) => ({ default: m.PhotoSizeReducer })));
const BmpToJpgTool = lazy(() => import('../components/tools/image/BmpToJpgTool').then((m) => ({ default: m.BmpToJpgTool })));
const TransparentBgChecker = lazy(() => import('../components/tools/image/TransparentBgChecker').then((m) => ({ default: m.TransparentBgChecker })));
const AspectRatioCalc = lazy(() => import('../components/tools/image/AspectRatioCalc').then((m) => ({ default: m.AspectRatioCalc })));
const ImageDpiChecker = lazy(() => import('../components/tools/image/ImageDpiChecker').then((m) => ({ default: m.ImageDpiChecker })));

const JpgToPdfTool = lazy(() => import('../components/tools/pdf/JpgToPdfTool').then((m) => ({ default: m.JpgToPdfTool })));
const PngToPdfTool = lazy(() => import('../components/tools/pdf/PngToPdfTool').then((m) => ({ default: m.PngToPdfTool })));
const PdfMetadataViewer = lazy(() => import('../components/tools/pdf/PdfMetadataViewer').then((m) => ({ default: m.PdfMetadataViewer })));
const MergePdfTool = lazy(() => import('../components/tools/pdf/MergePdfTool').then((m) => ({ default: m.MergePdfTool })));
const SplitPdfTool = lazy(() => import('../components/tools/pdf/SplitPdfTool').then((m) => ({ default: m.SplitPdfTool })));
const RotatePdfTool = lazy(() => import('../components/tools/pdf/RotatePdfTool').then((m) => ({ default: m.RotatePdfTool })));
const PdfPageCounter = lazy(() => import('../components/tools/pdf/PdfPageCounter').then((m) => ({ default: m.PdfPageCounter })));

const PercentageCalculator = lazy(() => import('../components/tools/utility/PercentageCalculator').then((m) => ({ default: m.PercentageCalculator })));
const AgeCalculator = lazy(() => import('../components/tools/utility/AgeCalculator').then((m) => ({ default: m.AgeCalculator })));
const GpaCalculator = lazy(() => import('../components/tools/utility/GpaCalculator').then((m) => ({ default: m.GpaCalculator })));
const WordCounter = lazy(() => import('../components/tools/utility/WordCounter').then((m) => ({ default: m.WordCounter })));
const CharacterCounter = lazy(() => import('../components/tools/utility/CharacterCounter').then((m) => ({ default: m.CharacterCounter })));
const UnitConverter = lazy(() => import('../components/tools/utility/UnitConverter').then((m) => ({ default: m.UnitConverter })));
const StudyTimer = lazy(() => import('../components/tools/utility/StudyTimer').then((m) => ({ default: m.StudyTimer })));
const QrCodeGenerator = lazy(() => import('../components/tools/utility/QrCodeGenerator').then((m) => ({ default: m.QrCodeGenerator })));
const PasswordGen = lazy(() => import('../components/tools/utility/PasswordGen').then((m) => ({ default: m.PasswordGen })));
const Base64Tool = lazy(() => import('../components/tools/utility/Base64Tool').then((m) => ({ default: m.Base64Tool })));
const UrlEncodeTool = lazy(() => import('../components/tools/utility/UrlEncodeTool').then((m) => ({ default: m.UrlEncodeTool })));
const JsonFormatter = lazy(() => import('../components/tools/utility/JsonFormatter').then((m) => ({ default: m.JsonFormatter })));
const ColorConverterTool = lazy(() => import('../components/tools/utility/ColorConverterTool').then((m) => ({ default: m.ColorConverterTool })));
const TextCaseConverter = lazy(() => import('../components/tools/utility/TextCaseConverter').then((m) => ({ default: m.TextCaseConverter })));
const RemoveDuplicateLines = lazy(() => import('../components/tools/utility/RemoveDuplicateLines').then((m) => ({ default: m.RemoveDuplicateLines })));
const UuidGenerator = lazy(() => import('../components/tools/utility/UuidGenerator').then((m) => ({ default: m.UuidGenerator })));
const TimestampConverter = lazy(() => import('../components/tools/utility/TimestampConverter').then((m) => ({ default: m.TimestampConverter })));
const TextCleaner = lazy(() => import('../components/tools/utility/TextCleaner').then((m) => ({ default: m.TextCleaner })));
const RandomStringGenerator = lazy(() => import('../components/tools/utility/RandomStringGenerator').then((m) => ({ default: m.RandomStringGenerator })));

const PercentageIncreaseCalc = lazy(() => import('../components/tools/student/PercentageIncreaseCalc').then((m) => ({ default: m.PercentageIncreaseCalc })));
const PercentageDecreaseCalc = lazy(() => import('../components/tools/student/PercentageDecreaseCalc').then((m) => ({ default: m.PercentageDecreaseCalc })));
const MarksPercentageCalc = lazy(() => import('../components/tools/student/MarksPercentageCalc').then((m) => ({ default: m.MarksPercentageCalc })));
const DateDifferenceCalc = lazy(() => import('../components/tools/student/DateDifferenceCalc').then((m) => ({ default: m.DateDifferenceCalc })));
const ReadingTimeCalc = lazy(() => import('../components/tools/student/ReadingTimeCalc').then((m) => ({ default: m.ReadingTimeCalc })));
const AverageCalc = lazy(() => import('../components/tools/student/AverageCalc').then((m) => ({ default: m.AverageCalc })));
const RandomNumberGen = lazy(() => import('../components/tools/student/RandomNumberGen').then((m) => ({ default: m.RandomNumberGen })));
const PomodoroTimerTool = lazy(() => import('../components/tools/student/PomodoroTimerTool').then((m) => ({ default: m.PomodoroTimerTool })));
const CgpaCalculator = lazy(() => import('../components/tools/student/CgpaCalculator').then((m) => ({ default: m.CgpaCalculator })));
const GradeCalculator = lazy(() => import('../components/tools/student/GradeCalculator').then((m) => ({ default: m.GradeCalculator })));
const FractionCalculator = lazy(() => import('../components/tools/student/FractionCalculator').then((m) => ({ default: m.FractionCalculator })));
const RatioCalculator = lazy(() => import('../components/tools/student/RatioCalculator').then((m) => ({ default: m.RatioCalculator })));
const ScientificCalculator = lazy(() => import('../components/tools/student/ScientificCalculator').then((m) => ({ default: m.ScientificCalculator })));
const SentenceCounter = lazy(() => import('../components/tools/student/SentenceCounter').then((m) => ({ default: m.SentenceCounter })));
const NumberToWords = lazy(() => import('../components/tools/student/NumberToWords').then((m) => ({ default: m.NumberToWords })));

function WorkspaceSkeleton({ toolName }: { toolName: string }) {
  return (
    <div
      role="status"
      aria-label={`Loading ${toolName} workspace`}
      className="w-full min-h-[300px] flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-slate-200/90 shadow-xs"
    >
      <div className="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
      <span className="text-sm font-semibold text-slate-800">Loading {toolName}...</span>
      <span className="text-xs text-slate-400 mt-1">Initializing client-side workspace in your browser</span>
    </div>
  );
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

  const relatedTools = (tool.relatedSlugs || [])
    .map((s) => getToolBySlug(s))
    .filter((t): t is ToolItem => Boolean(t))
    .slice(0, 4);

  const relevantGuides = getGuidesForTool(tool.slug);

  // Schema.org WebApplication specification
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    url: `${SITE_URL}/tools/${tool.slug}`,
    description: tool.detailedDescription || tool.description,
    applicationCategory: tool.category === 'image' ? 'MultimediaApplication' : 'UtilitiesApplication',
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
        name: categoryName,
        item: `${SITE_URL}${categoryHref}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.name,
        item: `${SITE_URL}/tools/${tool.slug}`,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Dynamic SEO Tags & Structured Data */}
      <SEO
        title={tool.metaTitle || `${tool.name} — Toolora`}
        description={tool.metaDescription || tool.description}
        canonicalPath={`/tools/${tool.slug}`}
        schema={[webAppSchema, breadcrumbSchema]}
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
            Client-Side Processing
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            No Server File Uploads
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

      {/* How to Use Step-by-Step Guide */}
      {tool.howToUse && tool.howToUse.length > 0 && (
        <section className="mb-14 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span>How to Use {tool.name}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tool.howToUse.map((step) => (
              <div key={step.step} className="relative flex flex-col space-y-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 font-bold text-sm flex items-center justify-center shrink-0">
                  {step.step}
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Why Choose Toolora / Use Cases */}
      {tool.whyUse && tool.whyUse.length > 0 && (
        <section className="mb-14 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">
            Why Use Toolora for {tool.name}?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tool.whyUse.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
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

      {/* Relevant Step-by-Step Guides & Tutorials */}
      {relevantGuides.length > 0 && (
        <section className="mb-14 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 border border-blue-100 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Helpful Guide & Tutorial</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Recommended Reading for This Workflow
              </h2>
            </div>
            <Link
              to="/guides"
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
            >
              All Guides <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relevantGuides.map((guide) => (
              <Link
                key={guide.slug}
                to={`/guides/${guide.slug}`}
                className="group p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-2xs text-slate-500 mb-1.5">
                    <span className="font-semibold text-blue-600">{guide.categoryName}</span>
                    <span>{guide.readTime}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {guide.summary}
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold group-hover:text-blue-700">
                  <span>Read Tutorial</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
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
