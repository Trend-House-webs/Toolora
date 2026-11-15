import React, { Suspense } from 'react';
import { ToolItem } from '../types';
import { getToolBySlug, TOOLS } from '../data/tools';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ToolCard } from '../components/common/ToolCard';
import { SEO } from '../components/common/SEO';
import { ArrowRight } from 'lucide-react';
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
        title={tool.metaTitle || `${tool.name} — Toolora`}
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
          <span>{categoryName.toUpperCase()}</span>
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

      {/* Short, Unique Tool-Specific Guide Paragraph */}
      <section className="mb-12 bg-white rounded-2xl border border-[#E5EAF2] p-6 sm:p-7 shadow-[0_2px_12px_rgba(15,23,42,0.03)]">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5">
          How to Use {tool.name}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          {renderFormattedText(tool.usageGuide || tool.detailedDescription || tool.description)}
        </p>
      </section>

      {/* Related Tools (Internal Linking) */}
      {relatedTools.length > 0 && (
        <section className="pt-8 border-t border-[#E5EAF2]">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight sm:text-2xl">
                Related Free Tools
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                Explore more client-side utilities that pair well with {tool.name}.
              </p>
            </div>
            <Link
              to={categoryHref}
              className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
            >
              <span>All {categoryName}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
