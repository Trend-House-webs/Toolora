import { ToolItem, CategoryInfo } from '../types';
import { ADDITIONAL_TOOLS } from './additionalTools';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'image',
    slug: 'image-tools',
    title: 'Image Tools',
    description: 'Compress, convert, resize, crop, rotate, and format photos directly in your browser without uploading to external servers.',
    icon: 'ImageIcon',
    metaTitle: 'Image Tools — Free Browser Photo Editors & Converters | Toolora',
    metaDescription: 'Explore free client-side image tools: compress, resize, crop, rotate, and convert JPG, PNG, and WebP photos with in-browser processing and no server file uploads.',
    introParagraph: 'Toolora\'s free online image tools provide comprehensive photo editing, optimization, and conversion directly in your browser. Utilizing modern HTML5 Canvas technology, operations run locally in system memory without transmitting your pictures to external servers. These online photo editor tools differentiate between distinct graphical tasks: compression reduces file byte weight without altering pixel dimensions; resizing alters pixel width and height or enforces fixed aspect ratios; cropping trims unwanted canvas margins; conversion transcodes between JPG, PNG, WebP, and BMP; rotation corrects 90-degree and 180-degree orientations without re-encoding quality loss; and metadata inspection audits camera EXIF tags, print DPI resolution, and alpha transparency channels.',
    highlights: [
      'In-browser image compression tools that optimize file size via visual quality or exact kilobyte caps',
      'Precise image resizing tools with aspect ratio locking, social media presets, and passport dimensions',
      'Lossless 90°, 180°, and 270° photo rotation and horizontal/vertical canvas flipping',
      'Multi-format image converter tools supporting JPG, PNG, WebP, and BMP with transparency preservation',
      'Inspection utilities for EXIF metadata tags, 300 DPI print verification, and alpha channel validation',
    ],
    toolTypes: [
      {
        title: 'Image Compression & File Size Optimization',
        description: 'Shrink photo file sizes for website speed, email limits, and upload forms without noticeable quality loss.',
        whenToChoose: 'Choose Image Compressor for fine-tuned visual quality or Photo Size Reducer to hit strict kilobyte caps (e.g. under 200 KB or 500 KB).',
        toolSlugs: ['image-compressor', 'photo-size-reducer'],
      },
      {
        title: 'Image Resizing, Aspect Ratios & Cropping',
        description: 'Scale pixel dimensions, calculate proportional aspect ratios, trim unwanted canvas borders, and format document photos.',
        whenToChoose: 'Choose Image Resizer to scale pixel width and height, Aspect Ratio Calculator to prevent stretching, Crop Image to isolate framing, or Passport and Social Media resizers for standardized dimensions.',
        toolSlugs: ['image-resizer', 'crop-image', 'aspect-ratio-calculator', 'passport-photo-resizer', 'social-media-resizer'],
      },
      {
        title: 'Image Format Conversion',
        description: 'Convert photos and graphics between JPG, PNG, WebP, and BMP directly in browser memory.',
        whenToChoose: 'Choose format converters when an application requires a specific format, when you need transparent backgrounds (PNG/WebP), or when modernizing web galleries.',
        toolSlugs: ['jpg-to-png', 'png-to-jpg', 'jpg-to-webp', 'png-to-webp', 'webp-to-jpg', 'webp-to-png', 'bmp-to-jpg'],
      },
      {
        title: 'Rotation, Flipping, Watermarking & Inspection',
        description: 'Correct orientation, flip axes, overlay copyright watermarks, inspect EXIF metadata, and verify alpha transparency.',
        whenToChoose: 'Choose Rotate Image or Flip Image for orientation correction without quality loss, Add Watermark to protect graphics, or Metadata and DPI checkers to inspect camera data and print sharpness.',
        toolSlugs: ['rotate-image', 'flip-image', 'rotate-flip-image', 'add-watermark', 'image-metadata-viewer', 'image-dpi-checker', 'transparent-background-checker'],
      },
    ],
    get count() {
      return TOOLS.filter((t) => t.category === 'image').length;
    },
  },
  {
    id: 'pdf',
    slug: 'pdf-tools',
    title: 'PDF Tools',
    description: 'Merge, split, rotate, convert, and inspect PDF files with high-speed client-side processing.',
    icon: 'FileText',
    metaTitle: 'PDF Tools — Merge, Split & Convert PDFs Privately | Toolora',
    metaDescription: 'Manage PDF files in your browser: merge multiple documents, extract specific pages, rotate orientation, check page counts, and convert images to PDF.',
    introParagraph: 'Toolora\'s free online PDF tools enable private document assembly, inspection, and manipulation without third-party cloud uploads. Powered by client-side WebAssembly and pdf-lib libraries, you can combine multiple contracts into one ordered document, extract specific chapter page ranges, fix inverted page scans, inspect page dimensions, and package photos into standard PDF files. Toolora does not offer unsupported features like OCR text recognition, electronic signatures, or heavy document editing—we focus on fast, dependable PDF page tools, conversion, and organization.',
    highlights: [
      'Assemble multi-document PDF packages with drag-and-drop page ordering',
      'Extract custom page ranges and individual sheets into separate files',
      'Permanently rotate upside-down or sideways scanned pages by 90°, 180°, or 270°',
      'Compile JPG, PNG, and WebP photo albums into standard PDF portfolios with custom margins',
      'Inspect total page counts, paper dimensions (A4, Letter), and embedded metadata properties',
    ],
    toolTypes: [
      {
        title: 'PDF Assembly & Splitting (Combine / Extract)',
        description: 'Merge multiple separate documents into one ordered packet, or extract specific page ranges and chapters.',
        whenToChoose: 'Choose Merge PDF to assemble contracts, forms, and portfolios into one file. Choose Split PDF when you only need to submit specific pages from a larger document.',
        toolSlugs: ['merge-pdf', 'split-pdf'],
      },
      {
        title: 'Orientation & Page Layout Corrections',
        description: 'Permanently rotate upside-down or sideways pages from smartphone camera scans and office copiers.',
        whenToChoose: 'Choose Rotate PDF when scanned forms, invoices, or legal filings are rotated 90° or 180° out of alignment.',
        toolSlugs: ['rotate-pdf'],
      },
      {
        title: 'Image to PDF Document Assembly',
        description: 'Package single or multi-page photos, receipts, and screenshots into standard, printable PDF files.',
        whenToChoose: 'Choose these tools when an institution (school, tax portal, visa office) requires PDF submissions instead of raw image files.',
        toolSlugs: ['image-to-pdf', 'jpg-to-pdf', 'png-to-pdf'],
      },
      {
        title: 'Document Inspection & Verification',
        description: 'Inspect page counts, page dimensions (A4, US Letter), document titles, and encryption status.',
        whenToChoose: 'Choose these tools before submitting official papers to confirm exact page counts and check structural PDF properties.',
        toolSlugs: ['pdf-page-counter', 'pdf-metadata-viewer'],
      },
    ],
    get count() {
      return TOOLS.filter((t) => t.category === 'pdf').length;
    },
  },
  {
    id: 'student',
    slug: 'student-tools',
    title: 'Student & Academic Tools',
    description: 'Calculators for CGPA, grades, fractions, ratios, scientific computations, reading durations, and sentence analysis.',
    icon: 'GraduationCapIcon',
    metaTitle: 'Student & Academic Tools — GPA, Grade & Math Solvers | Toolora',
    metaDescription: 'Free online student calculators: calculate cumulative CGPA, weighted coursework grades, required final exam scores, fractions, ratios, and study intervals.',
    introParagraph: 'Designed for middle school, high school, and university students, our student calculators online suite helps you plan academic progress and solve coursework problems accurately. Calculate weighted semester grades, determine the exact score needed on your final exam to achieve a target letter grade, break down multi-step fraction arithmetic with lowest common denominators, and evaluate mathematical proportions. Please note that GPA and CGPA calculations vary by institution: colleges and secondary schools use different grading scales (such as 4.0, 5.0, or 10.0) and weighting policies. Toolora supports customizable scale configurations so you can match your institution\'s specific grading system.',
    highlights: [
      'Course-level GPA and multi-semester cumulative CGPA tracking with customizable grading scales',
      'Target final exam planning based on current weighted assignments and desired course marks',
      'Step-by-step fraction arithmetic with greatest common divisor (GCD) reductions',
      'Mathematical ratio and proportion solving with step-by-step simplification',
      'Study productivity tools including flexible interval timers and structured 25/5 Pomodoro sessions',
    ],
    toolTypes: [
      {
        title: 'Academic Performance, Grades & Marks',
        description: 'Calculate weighted coursework grades, required final exam target scores, and marks percentages.',
        whenToChoose: 'Choose Grade Calculator or Marks Percentage Calculator mid-term or before finals to find the exact score you need on remaining exams.',
        toolSlugs: ['grade-calculator', 'marks-percentage-calculator'],
      },
      {
        title: 'GPA & CGPA Calculations',
        description: 'Calculate semester-level GPA and cumulative multi-term CGPA with customizable credit hours and grading scales.',
        whenToChoose: 'Choose GPA Calculator for single-term coursework or CGPA Calculator across multiple semesters. Verify grade point values against your school\'s official scale.',
        toolSlugs: ['gpa-calculator', 'cgpa-calculator'],
      },
      {
        title: 'Math, Fractions & Proportions',
        description: 'Step-by-step fraction arithmetic, mathematical ratio simplifications, percentages, and scientific formulas.',
        whenToChoose: 'Choose Fraction Calculator or Ratio Calculator for step-by-step homework solutions. Choose Percentage or Percentage Increase calculators for comparison problems.',
        toolSlugs: ['fraction-calculator', 'ratio-calculator', 'scientific-calculator', 'percentage-calculator', 'percentage-increase-calculator', 'percentage-decrease-calculator', 'average-calculator'],
      },
      {
        title: 'Study Productivity & Text Analysis',
        description: 'Estimate essay reading times, analyze sentence flow, and pace focused study intervals.',
        whenToChoose: 'Choose Reading Time Calculator or Sentence Counter when writing and proofreading papers. Choose Pomodoro Timer or Study Timer to structure focused revision blocks.',
        toolSlugs: ['reading-time-calculator', 'sentence-counter', 'pomodoro-timer', 'study-timer', 'date-difference-calculator'],
      },
    ],
    get count() {
      return TOOLS.filter((t) => t.category === 'student').length;
    },
  },
  {
    id: 'utility',
    slug: 'utility-tools',
    title: 'Daily & Text Utilities',
    description: 'UUID generators, timestamp converters, text cleaners, password creators, Base64/URL encoders, and JSON tools.',
    icon: 'Wrench',
    metaTitle: 'Daily & Text Utilities — UUID, Timestamp & Encoding Tools | Toolora',
    metaDescription: 'Fast browser utilities for developers and everyday digital work: RFC 4122 UUID generators, Unix timestamp converters, JSON formatters, and text cleaners.',
    introParagraph: 'Toolora\'s online utility tools provide a lightweight, high-performance toolkit for developers, technical writers, and digital professionals. Generate cryptographically secure RFC 4122 version 4 UUIDs in bulk, convert Unix epoch timestamps between UTC and local system time with a live clock, validate and format nested JSON payloads with syntax error diagnostics, safely encode URL query parameters and UTF-8 Base64 strings, and clean redundant whitespace and duplicate lines from copied text—all running instantaneously in your web browser.',
    highlights: [
      'Cryptographically secure RFC 4122 UUID v4 generation in bulk batches',
      'Bidirectional Unix epoch timestamp conversion with live local and UTC clocks',
      'JSON formatter and beautifier with automated syntax validation and bracket matching',
      'URL query string and UTF-8 Base64 encoding/decoding utilities',
      'Text formatting operations including duplicate line removal, whitespace cleanup, and case conversion',
    ],
    toolTypes: [
      {
        title: 'Developer Identifiers & Security Generators',
        description: 'Generate cryptographically secure version 4 UUIDs, high-entropy passwords, and random alphanumeric strings.',
        whenToChoose: 'Choose UUID Generator when creating database keys or API identifiers. Choose Password Generator when securing accounts with custom entropy.',
        toolSlugs: ['uuid-generator', 'password-generator', 'random-string-generator'],
      },
      {
        title: 'Data Encoding, Formats & JSON Tools',
        description: 'Validate and beautify JSON trees, encode URL parameters, convert binary to Base64, and switch color codes.',
        whenToChoose: 'Choose JSON Formatter when debugging API payloads. Choose Base64 or URL Encode tools when transferring data through URLs, headers, or web forms.',
        toolSlugs: ['json-formatter', 'base64-encoder-decoder', 'url-encoder-decoder', 'color-converter'],
      },
      {
        title: 'Text Cleanup & Content Auditing',
        description: 'Remove duplicate lines, clean redundant whitespace, convert letter cases, and audit word/character lengths.',
        whenToChoose: 'Choose Text Cleaner or Remove Duplicate Lines when sanitizing messy exports or copied lists. Choose Word and Character counters for character-limit meters.',
        toolSlugs: ['text-cleaner', 'remove-duplicate-lines', 'text-case-converter', 'word-counter', 'character-counter'],
      },
      {
        title: 'Everyday Time, Measurement & Sharing',
        description: 'Convert Unix timestamps, generate scannable QR codes, calculate exact age, and convert physical units.',
        whenToChoose: 'Choose Timestamp Converter when analyzing server logs. Choose QR Code Generator to share links, Wi-Fi credentials, or text snippets.',
        toolSlugs: ['timestamp-converter', 'qr-code-generator', 'age-calculator', 'unit-converter', 'study-timer'],
      },
    ],
    get count() {
      return TOOLS.filter((t) => t.category === 'utility').length;
    },
  },
  {
    id: 'student-utility',
    slug: 'student-utility',
    title: 'Student & Utility Tools',
    description: 'Calculators, text analyzers, unit converters, and study timers designed to make daily academic and productivity tasks effortless.',
    icon: 'GraduationCapIcon',
    metaTitle: 'Student & Utility Tools Hub — Academic & Everyday Productivity | Toolora',
    metaDescription: 'Unified productivity directory combining Toolora\'s student academic calculators, math solvers, and daily text utilities in a single browsable workspace.',
    introParagraph: 'The Student & Utility Tools Hub functions as a unified browsing directory combining Toolora\'s academic calculators, math problem solvers, and everyday text utilities into a single browsable workspace. While dedicated sections exist for focused study tools (such as GPA, weighted grades, and fractions) and dedicated developer utilities (such as UUIDs, Unix timestamps, and JSON formatting), this combined hub provides a versatile overview for students and productivity-focused users who need both academic formulas and daily text or data utilities in one convenient view.',
    highlights: [
      'Combined browsing hub unifying coursework calculators, math solvers, and everyday productivity utilities',
      'Step-by-step math solvers for fractions, ratios, percentages, and coursework grades',
      'Text manipulation tools for word counting, character limits, whitespace cleanup, and reading durations',
      'Direct cross-links to specialized Student Tools and Daily Utilities categories',
    ],
    toolTypes: [
      {
        title: 'Academic Coursework & GPA Solvers',
        description: 'Coursework calculators for weighted grades, target final exams, and semester or cumulative GPA.',
        whenToChoose: 'Choose these tools when planning semester grades or calculating academic standing. For our full academic suite, visit the dedicated Student Tools category.',
        toolSlugs: ['gpa-calculator', 'cgpa-calculator', 'grade-calculator', 'marks-percentage-calculator'],
      },
      {
        title: 'Math, Arithmetic & Fractions',
        description: 'Step-by-step arithmetic solvers for fractions, ratios, scientific calculations, and percentages.',
        whenToChoose: 'Choose math problem solvers when simplifying fractions with lowest common denominators, calculating ratios, or solving percentage increases and discounts.',
        toolSlugs: ['fraction-calculator', 'ratio-calculator', 'scientific-calculator', 'percentage-calculator'],
      },
      {
        title: 'Developer Identifiers & Data Encoders',
        description: 'Cryptographically secure UUID generators, Unix timestamp converters, JSON formatters, and Base64 encoders.',
        whenToChoose: 'Choose developer utilities when generating mock data, inspecting and beautifying API payloads, or encoding URL query strings safely.',
        toolSlugs: ['uuid-generator', 'timestamp-converter', 'json-formatter', 'base64-encoder-decoder'],
      },
      {
        title: 'Text Cleaning, Word Counts & Study Timers',
        description: 'Text formatting tools, word and character counters, reading time estimators, and Pomodoro study timers.',
        whenToChoose: 'Choose text and productivity utilities when writing essays, auditing character limits, cleaning copied lists, or pacing focused study blocks.',
        toolSlugs: ['text-cleaner', 'word-counter', 'reading-time-calculator', 'pomodoro-timer'],
      },
    ],
    get count() {
      return TOOLS.filter(
        (t) => t.category === 'student' || t.category === 'utility' || t.category === 'student-utility'
      ).length;
    },
  },
];

export const TOOLS: ToolItem[] = [
  // 1. IMAGE COMPRESSOR
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    slug: 'image-compressor',
    category: 'image',
    description: 'Reduce JPG, PNG, WebP, and BMP file sizes while keeping original pixel dimensions intact.',
    detailedDescription: 'Lower the storage weight of photographs and web graphics without altering their width or height. Adjust compression from 10% to 100%, compare original and compressed views before downloading, and process files directly in your browser.',
    metaTitle: 'Image Compressor — Reduce JPG, PNG & WebP File Size | Toolora',
    metaDescription: 'Reduce JPG, PNG, WebP, and BMP file sizes without changing pixel dimensions. Adjust compression quality from 10% to 100% and compare previews in your browser.',
    icon: 'Minimize2',
    isFeatured: true,
    isPopular: true,
    badge: 'Popular',
    usageGuide: 'Upload a JPG, PNG, WebP, or BMP image and adjust the compression slider between 10% and 100%—or select the Max Compression (50%), Balanced (75%), or High Clarity (90%) preset—to reduce byte weight while preserving your original pixel dimensions. Toggle between the Compressed Preview and Original View to inspect visual sharpness, check your exact KB or MB savings in the summary bar, and download the optimized file directly to your device. For step-by-step optimization tips, see our [How to Compress Images Online](/guides/how-to-compress-images-online) guide.',
    relatedSlugs: ['image-resizer', 'photo-size-reducer', 'jpg-to-webp', 'png-to-webp', 'crop-image'],
  },

  // 2. IMAGE RESIZER
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    slug: 'image-resizer',
    category: 'image',
    description: 'Change image width and height in pixels or scale by percentage while locking aspect ratio proportions.',
    detailedDescription: 'Resize JPG, PNG, WebP, GIF, and BMP images to exact pixel dimensions or percentage scales directly in your browser. Keep your aspect ratio locked to prevent stretching, preview the new dimensions live, and export as JPEG, PNG, or WebP.',
    metaTitle: 'Image Resizer — Resize Image Dimensions in Pixels | Toolora',
    metaDescription: 'Resize images to exact pixel width and height or scale by percentage while preserving aspect ratio proportions. Export as JPEG, PNG, or WebP in your browser.',
    icon: 'Scaling',
    isFeatured: true,
    isPopular: true,
    badge: 'Essential',
    usageGuide: 'Select an image file and enter your target width or height in pixels, or click a quick percentage preset (25%, 50%, 75%, or 200%) to scale dimensions relative to the original resolution. Keep Ratio Locked enabled so the paired dimension updates automatically without stretching your photo, choose JPEG, PNG, or WebP as your output format, and download the resized image with its updated pixel dimensions and estimated file size. Learn more in our [How to Resize an Image Without Losing Quality](/guides/how-to-resize-an-image-without-losing-quality) tutorial.',
    relatedSlugs: ['image-compressor', 'aspect-ratio-calculator', 'crop-image', 'social-media-resizer'],
  },

  // 3. JPG TO PNG
  {
    id: 'jpg-to-png',
    name: 'JPG to PNG',
    slug: 'jpg-to-png',
    category: 'image',
    description: 'Convert JPG and JPEG images into lossless PNG files in your browser.',
    detailedDescription: 'Re-encode JPG and JPEG images into standard lossless PNG format at their original pixel dimensions. Compare original and converted file sizes before downloading—ideal when a platform requires a .png file or before editing layers in graphic software.',
    metaTitle: 'JPG to PNG Converter — Convert JPEG to PNG Online | Toolora',
    metaDescription: 'Convert JPG and JPEG images to lossless PNG format in your browser. Understand what changes in file size, quality, and transparency when converting JPG to PNG.',
    icon: 'FileImage',
    isPopular: true,
    usageGuide: 'Upload any `.jpg` or `.jpeg` photo into the converter workspace to decode and re-encode it into a lossless `.png` file at its exact original pixel width and height. Review the live preview along with the original JPEG and converted PNG file sizes, then click Download Converted Image to save your new PNG graphic for design layers or portals that require PNG uploads. To compare image formats in detail, read our [JPG vs PNG vs WebP Format Guide](/guides/jpg-vs-png-vs-webp).',
    relatedSlugs: ['png-to-jpg', 'png-to-webp', 'image-compressor', 'transparent-background-checker', 'image-resizer'],
  },

  // 4. PNG TO JPG
  {
    id: 'png-to-jpg',
    name: 'PNG to JPG',
    slug: 'png-to-jpg',
    category: 'image',
    description: 'Convert PNG images to JPG format with custom background color fill and adjustable JPEG quality.',
    detailedDescription: 'Convert PNG files into standard JPEG images directly in your browser. Choose a solid background color (white, black, or custom hex) to flatten transparent areas, adjust JPEG output quality from 10% to 100%, and compare file sizes before downloading.',
    metaTitle: 'PNG to JPG Converter — Flatten Transparency & Control Quality | Toolora',
    metaDescription: 'Convert PNG to JPG in your browser. Fill transparent PNG backgrounds with white, black, or a custom hex color and adjust JPEG quality from 10% to 100%.',
    icon: 'ArrowRightLeft',
    isPopular: true,
    usageGuide: 'Drop a PNG image into the converter, choose a solid background fill color (White `#FFFFFF`, Black `#000000`, or a custom color picker value) to replace any transparent pixels, and adjust the JPEG output quality slider between 10% and 100%. The tool immediately displays the converted `.jpg` preview and byte size reduction so you can download a compact, universally compatible JPEG file.',
    relatedSlugs: ['jpg-to-png', 'png-to-webp', 'image-compressor', 'transparent-background-checker'],
  },

  // 5. JPG TO WEBP
  {
    id: 'jpg-to-webp',
    name: 'JPG to WebP',
    slug: 'jpg-to-webp',
    category: 'image',
    description: 'Modernize JPG images into high-performance WebP format for fast web delivery.',
    detailedDescription: 'Convert your JPEG photos to next-generation Google WebP format. WebP produces images that are 25–35% smaller than comparable JPEGs at equivalent visual quality.',
    metaTitle: 'Free JPG to WebP Converter — Next-Gen Image Optimization',
    metaDescription: 'Convert JPG to WebP online for 25%–35% smaller files and faster website speeds. Free and processed client-side in your browser.',
    icon: 'Zap',
    isFeatured: true,
    badge: 'Next-Gen',
    usageGuide: 'Select a JPG or JPEG image and adjust the WebP encoding quality slider (defaulting to 85%) to balance visual sharpness and byte reduction. The workspace renders a live `.webp` preview alongside a side-by-side comparison of your original JPEG size and new WebP output size, allowing you to download a lighter web-ready image in one click.',
    relatedSlugs: ['webp-to-jpg', 'png-to-webp', 'image-compressor', 'jpg-to-png'],
  },

  // 6. PNG TO WEBP
  {
    id: 'png-to-webp',
    name: 'PNG to WebP',
    slug: 'png-to-webp',
    category: 'image',
    description: 'Convert PNG images to WebP while fully preserving transparent backgrounds.',
    detailedDescription: 'Convert PNG illustrations, icons, and logos into modern WebP images while maintaining full alpha-channel transparency with adjustable quality controls in your browser.',
    metaTitle: 'Free PNG to WebP Converter — Transparent WebP Online',
    metaDescription: 'Convert PNG to WebP while keeping full transparent backgrounds. Reduce web graphic file sizes client-side without server file uploads.',
    icon: 'Layers',
    usageGuide: 'Upload a transparent or opaque PNG graphic and use the WebP quality slider to set your preferred compression level while keeping full alpha-channel transparency intact. Inspect the converted preview on the checkerboard backdrop, compare the original PNG byte weight against the smaller WebP output, and download the finished `.webp` file for faster website loading.',
    relatedSlugs: ['webp-to-png', 'png-to-jpg', 'transparent-background-checker', 'jpg-to-webp'],
  },

  // 7. WEBP TO JPG
  {
    id: 'webp-to-jpg',
    name: 'WebP to JPG',
    slug: 'webp-to-jpg',
    category: 'image',
    description: 'Convert downloaded WebP pictures into universally compatible JPG files.',
    detailedDescription: 'Convert WebP images to universal JPG format in your browser. Solid background fill for transparent areas, adjustable quality controls, and instant download without server uploads.',
    metaTitle: 'Free WebP to JPG Converter — Convert WebP to JPEG Online',
    metaDescription: 'Convert WebP images to universal JPG format for compatibility with older software, printers, and photo editors. Fast, private, and client-side.',
    icon: 'Repeat',
    usageGuide: 'Upload a `.webp` image, pick a background fill color (White, Black, or custom hex) in case the WebP file contains transparent regions, and set the JPEG quality slider from 10% to 100%. The tool transcodes the image in your browser and provides an instant `.jpg` download compatible with legacy photo editors, document portals, and print software.',
    relatedSlugs: ['webp-to-png', 'png-to-webp', 'image-compressor', 'jpg-to-webp'],
  },

  // 8. WEBP TO PNG
  {
    id: 'webp-to-png',
    name: 'WebP to PNG',
    slug: 'webp-to-png',
    category: 'image',
    description: 'Convert WebP images to high-resolution PNG format with alpha transparency.',
    detailedDescription: 'Convert WebP images into crisp, uncompressed PNG format in your browser. Fully preserves transparent alpha backgrounds for graphic design software and video editors.',
    metaTitle: 'Free WebP to PNG Converter — Convert WebP to PNG Online',
    metaDescription: 'Convert WebP graphics to lossless PNG format with transparency preservation. Free, instant client-side conversion with zero server uploads.',
    icon: 'RefreshCw',
    usageGuide: 'Select a `.webp` image from your device to decode it onto an HTML5 canvas and re-encode it as an uncompressed, lossless `.png` file with all transparent pixels preserved. Verify the output dimensions and file size in the preview card, then click Download Converted Image to save a standard PNG ready for design suites and presentation slides.',
    relatedSlugs: ['png-to-webp', 'webp-to-jpg', 'transparent-background-checker', 'image-compressor'],
  },

  // 9. IMAGE TO PDF
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    slug: 'image-to-pdf',
    category: 'image',
    description: 'Combine one or multiple images into an organized PDF with custom page order, orientation, paper size, and margins.',
    detailedDescription: 'Assemble JPG, PNG, WebP, GIF, and BMP images into a single multi-page PDF document in your browser. Arrange page sequence with Move Up/Down controls, choose Portrait or Landscape orientation, select A4 or US Letter paper, and set page margins.',
    metaTitle: 'Image to PDF Converter — Combine Images into One PDF | Toolora',
    metaDescription: 'Turn one or multiple JPG, PNG, WebP, GIF, and BMP images into an organized PDF in your browser. Set page order, Portrait or Landscape, A4 or US Letter, and margins.',
    icon: 'FileText',
    isFeatured: true,
    isPopular: true,
    badge: 'Popular',
    usageGuide: 'Upload one or multiple JPG, PNG, WebP, GIF, or BMP images and arrange their sequence using the Move Up and Move Down buttons on each image card. Select your preferred Page Orientation (Portrait or Landscape), Page Size (A4, US Letter, or Fit to Image), and Margin spacing (None, Small, or Large), then click Generate & Download PDF to compile all images into a single multi-page PDF document. For more tips, see our [How to Convert Images to PDF](/guides/how-to-convert-images-to-pdf) guide.',
    relatedSlugs: ['jpg-to-pdf', 'png-to-pdf', 'merge-pdf', 'image-compressor'],
  },

  // 10. CROP IMAGE
  {
    id: 'crop-image',
    name: 'Crop Image',
    slug: 'crop-image',
    category: 'image',
    description: 'Trim photos with custom bounding boxes or popular aspect ratios like 1:1, 16:9, and 4:3.',
    detailedDescription: 'Crop unwanted areas from photos. Choose from standard aspect ratio presets (Square, 16:9, 4:3, 3:2) or use freeform cropping with intuitive draggable handles and exact pixel coordinate inputs.',
    metaTitle: 'Crop Image Online — Free Photo Cropper with Aspect Ratios | Toolora',
    metaDescription: 'Crop image online with freeform or aspect ratio presets (1:1, 16:9, 4:3, 3:2). Precise pixel controls, draggable crop box, and client-side PNG download.',
    icon: 'Crop',
    badge: 'Popular',
    usageGuide: 'Upload an image and drag the interactive crop handles or enter exact X, Y, Width, and Height pixel coordinates to frame the region you want to keep. You can lock the selection to preset ratios (1:1 Square, 16:9 Widescreen, 4:3 Standard, or 3:2 Photo) or use Freeform mode, preview the trimmed area in real time, and download the cropped result as a crisp PNG file.',
    relatedSlugs: ['image-resizer', 'photo-size-reducer', 'image-compressor', 'flip-image', 'rotate-flip-image'],
  },

  // 11. ROTATE & FLIP IMAGE
  {
    id: 'rotate-flip-image',
    name: 'Rotate & Flip Image',
    slug: 'rotate-flip-image',
    category: 'image',
    description: 'Rotate photos 90° clockwise, counter-clockwise, or flip horizontally and vertically.',
    detailedDescription: 'All-in-one orientation workspace to rotate and mirror photos. Fix sideways orientations and inverted selfie cameras simultaneously in a single client-side editing session.',
    metaTitle: 'Rotate and Flip Image Online — Free Photo Orientation Tool | Toolora',
    metaDescription: 'Rotate and flip image online in a single workflow. Turn photos 90° clockwise or counter-clockwise and mirror horizontally or vertically with local PNG download.',
    icon: 'RotateCw',
    usageGuide: 'Load a photo into the workspace and use the 90° Left, 90° Right, Flip Horizontal, and Flip Vertical controls in any combination to fix sideways camera scans or mirrored selfies. The live canvas updates immediately to show your combined rotation angle and flip state, and clicking Download Transformed Image saves the corrected image at full resolution.',
    relatedSlugs: ['rotate-image', 'flip-image', 'crop-image', 'image-resizer', 'image-compressor'],
  },

  // 12. ADD WATERMARK
  {
    id: 'add-watermark',
    name: 'Add Watermark',
    slug: 'add-watermark',
    category: 'image',
    description: 'Add watermark to photo online with customizable text, opacity, color, and 9-point positioning.',
    detailedDescription: 'Free photo watermark tool to protect your pictures. Add custom text watermarks to images, adjust opacity sliders, select colors, and position stamps across 9 anchor points.',
    metaTitle: 'Add Watermark to Photo Online — Free Photo Watermark Tool | Toolora',
    metaDescription: 'Add watermark to photo online with our free photo watermark tool. Add custom text watermark to image, adjust opacity, choose positions, and download free.',
    icon: 'Stamp',
    badge: 'Popular',
    usageGuide: 'Upload your image, type your custom copyright or brand text into the Watermark Text field, and customize the font size, text color, and opacity percentage slider. Select one of the 9 anchor positions (such as Bottom Right, Center, or Top Left) while watching the live canvas preview, then click Download Watermarked Image to export your protected PNG photo.',
    relatedSlugs: ['image-compressor', 'social-media-resizer', 'transparent-background-checker', 'image-resizer'],
  },

  // 13. SOCIAL MEDIA RESIZER
  {
    id: 'social-media-resizer',
    name: 'Social Media Image Resizer',
    slug: 'social-media-resizer',
    category: 'image',
    description: 'Resize photos for Instagram, YouTube thumbnails, LinkedIn, and X/Twitter with preset dimensions.',
    detailedDescription: 'Free social media photo resizer. Easily format graphics for Instagram posts and stories, YouTube thumbnails, Facebook feed posts, and LinkedIn shares with cover and contain framing controls.',
    metaTitle: 'Social Media Image Resizer — Instagram & YouTube Sizes | Toolora',
    metaDescription: 'Resize photos for Instagram, YouTube thumbnails, Facebook, and LinkedIn with our social media image resizer. Free preset canvas sizing and padding controls.',
    icon: 'Share2',
    badge: 'Popular',
    usageGuide: 'Upload a photo and pick a platform preset—such as Instagram Square (1080×1080), Story/Reel (1080×1920), YouTube Thumbnail (1280×720), LinkedIn Post (1200×627), or X/Twitter Post (1600×900). Switch between Cover (Fill & Crop) to fill the entire frame or Contain (Fit with Padding) with your choice of background color so nothing gets cut off, then download the ready-to-post JPEG.',
    relatedSlugs: ['aspect-ratio-calculator', 'crop-image', 'passport-photo-resizer', 'add-watermark', 'image-resizer'],
  },

  // 14. PERCENTAGE CALCULATOR
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    slug: 'percentage-calculator',
    category: 'student',
    description: 'Calculate percentages, compare parts and totals, and find percentage changes with three simple calculation modes.',
    detailedDescription: 'Toolora\'s free online Percentage Calculator solves three common percentage problems: finding a percentage of a number, finding what percentage one number is of another, and calculating the percentage increase or decrease between an initial and final value. Enter your numbers to see instant results, clear formulas and worked examples.',
    metaTitle: 'Free Percentage Calculator – % of a Number & % Change | Toolora',
    metaDescription: 'Calculate X% of Y, find what percentage one number is of another, and work out percentage increases or decreases with instant formulas and examples.',
    icon: 'Percent',
    isFeatured: true,
    isPopular: true,
    badge: 'Popular',
    usageGuide: 'Select one of the three calculation tabs—X% of Y, X is what % of Y, or % Change—and enter your numbers or click a quick sample preset to compute the result immediately. The calculator displays the exact percentage or value alongside the substituted mathematical formula, decimal and fraction equivalents, and a one-click Copy Result button. For dedicated growth or discount workflows, try our [Percentage Increase Calculator](/tools/percentage-increase-calculator) or [Percentage Decrease Calculator](/tools/percentage-decrease-calculator).',
    relatedSlugs: ['percentage-increase-calculator', 'percentage-decrease-calculator', 'marks-percentage-calculator', 'gpa-calculator'],
  },

  // 15. AGE CALCULATOR
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    slug: 'age-calculator',
    category: 'utility',
    description: 'Calculate chronological age in years, months, and days from a date of birth and comparison date, with a birthday countdown and total days, weeks, and hours.',
    detailedDescription: 'Calculate exact chronological age in completed years, months, and days between a Date of Birth and today or any past or future target date. View your birth weekday, next birthday countdown, and cumulative totals in months, weeks, days, and hours.',
    metaTitle: 'Age Calculator — Years, Months & Days from Birth Date | Toolora',
    metaDescription: 'Calculate chronological age in years, months, and days from a birth date or target date. View birthday countdown, weekday born, and total days, weeks, and hours.',
    icon: 'Calendar',
    isPopular: true,
    usageGuide: 'Select your Date of Birth and keep the comparison date set to today—or pick any past or future date—to calculate your exact chronological age in completed years, remaining months, and days. The results panel also breaks down your total elapsed months, weeks, days, hours, and minutes, identifies the day of the week you were born, and shows how many days remain until your next birthday.',
    relatedSlugs: ['date-difference-calculator', 'timestamp-converter', 'study-timer'],
  },

  // 16. GPA CALCULATOR
  {
    id: 'gpa-calculator',
    name: 'GPA Calculator',
    slug: 'gpa-calculator',
    category: 'student',
    description: 'Calculate semester and cumulative GPA on 4.0, 4.33, and 5.0 scales with credit hours with our free GPA calculator.',
    detailedDescription: 'Comprehensive college GPA calculator and semester GPA calculator. Add courses, credit hours, and letter grades with credit weighting on 4.0, honors 4.33, and weighted 5.0 scales, including prior cumulative GPA projection.',
    metaTitle: 'GPA Calculator — College Semester GPA with Credit Hours | Toolora',
    metaDescription: 'Calculate term and cumulative GPA with our free GPA calculator. College GPA calculator, weighted GPA calculator with credit hours, and multiple scales.',
    icon: 'GraduationCap',
    isFeatured: true,
    isPopular: true,
    badge: 'Academic',
    usageGuide: 'Choose your institution\'s grading scale (Standard 4.0, Honors A+ 4.33, or Weighted AP/IB 5.0), enter each course\'s credit hours and letter grade, and optionally fill in your prior cumulative GPA and completed credits. The calculator updates your Term GPA, Cumulative GPA, total credit hours, and total quality points in real time as you add or adjust courses. To combine semester averages across multiple terms, use our [CGPA Calculator](/tools/cgpa-calculator).',
    relatedSlugs: ['cgpa-calculator', 'grade-calculator', 'percentage-calculator', 'marks-percentage-calculator'],
  },

  // 17. WORD COUNTER
  {
    id: 'word-counter',
    name: 'Word Counter',
    slug: 'word-counter',
    category: 'utility',
    description: 'Count words, characters, sentences and paragraphs as you type or paste text.',
    detailedDescription: 'Paste or type text to count words, characters with and without spaces, sentences, and line-separated text blocks in real time. Track an essay word goal, set a character limit, estimate reading and speaking time, review repeated words, and check an English readability estimate—all in your browser.',
    metaTitle: 'Free Online Word Counter & Word Count Checker | Toolora',
    metaDescription: 'Count words, characters with and without spaces, sentences, and paragraphs instantly. Track essay goals, reading and speaking time, and repeated words.',
    icon: 'AlignLeft',
    isPopular: true,
    badge: 'Essential',
    usageGuide: 'Type or paste your text into the editor—or import a `.txt` file—to see live counts for words, characters with and without spaces, sentences, paragraphs, and estimated reading and speaking times. You can also set a custom word target or character limit to monitor progress, inspect the Flesch Reading Ease score, and expand the Word Frequency panel to review your most-used terms.',
    relatedSlugs: ['character-counter', 'sentence-counter', 'reading-time-calculator', 'text-cleaner', 'remove-duplicate-lines'],
  },

  // 18. CHARACTER COUNTER
  {
    id: 'character-counter',
    name: 'Character Counter',
    slug: 'character-counter',
    category: 'utility',
    description: 'Track exact character limits for Twitter/X, SMS, meta descriptions, and bios.',
    detailedDescription: 'Count characters with and without whitespace. Features built-in limit meters for Twitter/X (280 chars), SMS messages (160 chars), and SEO title tags (60 chars).',
    metaTitle: 'Character Counter Online — Free Character Count Tool | Toolora',
    metaDescription: 'Count characters with and without spaces, calculate word count, and check live limit meters for Twitter, SMS, Google meta titles, and SEO meta descriptions.',
    icon: 'Type',
    badge: 'Popular',
    usageGuide: 'Paste or type your copy into the text box to view instant counts for total characters (with spaces), characters excluding spaces, words, and lines. As you edit, live progress bars track your length against standard platform limits—including Google Meta Title (60 chars), SMS Text (160 chars), SEO Meta Description (160 chars), Twitter/X Post (280 chars), and Instagram Caption (2,200 chars).',
    relatedSlugs: ['word-counter', 'sentence-counter', 'reading-time-calculator', 'text-cleaner', 'text-case-converter', 'remove-duplicate-lines'],
  },

  // 19. UNIT CONVERTER
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    slug: 'unit-converter',
    category: 'utility',
    description: 'Convert length, weight, temperature, area, volume, time, data storage, and speed units.',
    detailedDescription: 'Quickly convert between metric, imperial, and international scientific measurement systems. Features 8 categories: Length, Weight, Temperature, Area, Volume, Time, Data Storage, and Speed with real-time conversion and reference formulas.',
    metaTitle: 'Unit Converter Online — Metric & Imperial Converter | Toolora',
    metaDescription: 'Convert length, weight, temperature, area, volume, time, data, and speed between metric and imperial units. Free instant measurement converter.',
    icon: 'ArrowRightLeft',
    isPopular: true,
    usageGuide: 'Select a measurement category tab (Length, Weight, Temperature, Area, Volume, Time, Data Storage, or Speed), enter a numeric value, and choose your From and To units from the dropdown menus. The converted value updates immediately alongside a Swap Units button and a reference table showing equivalent values across all units in that category.',
    relatedSlugs: ['percentage-calculator', 'aspect-ratio-calculator', 'scientific-calculator', 'ratio-calculator'],
  },

  // 20. STUDY TIMER
  {
    id: 'study-timer',
    name: 'Study Timer',
    slug: 'study-timer',
    category: 'student',
    description: 'Online study timer with customizable study intervals, break alerts, and session counters.',
    detailedDescription: 'Focus timer for studying with customizable intervals. Configure flexible study blocks, short and long breaks, audio chime alerts, and session counters.',
    metaTitle: 'Study Timer Online — Focus Timer for Studying with Intervals | Toolora',
    metaDescription: 'Stay focused with our free online study timer. Features customizable study session intervals, break timers, session counter, and audio chime.',
    icon: 'Clock',
    isPopular: true,
    badge: 'Popular',
    usageGuide: 'Choose a focus duration preset (such as 25, 45, or 60 minutes) or set custom minutes for your Study Session, Short Break, and Long Break intervals, then click Start to begin the countdown. The workspace tracks your completed study sessions, plays an optional browser audio chime when an interval finishes, and lets you pause, reset, or switch modes at any time.',
    relatedSlugs: ['pomodoro-timer', 'reading-time-calculator', 'gpa-calculator', 'word-counter'],
  },

  // 21. QR CODE GENERATOR
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    slug: 'qr-code-generator',
    category: 'utility',
    description: 'Generate static 400×400 PNG QR codes for website URLs, Wi-Fi networks, plain text, email links, and phone numbers.',
    detailedDescription: 'Create scannable static QR codes in your browser across five data formats: Website URL, Plain Text, Wi-Fi Network (WPA/WPA2/WPA3, WEP, or Open), Email, and Phone Number. Customize foreground and background colors and download a 400×400 px PNG.',
    metaTitle: 'QR Code Generator — Make URL, Wi-Fi & Text QR Codes | Toolora',
    metaDescription: 'Generate free static QR codes for website URLs, Wi-Fi networks, text, email, and phone numbers. Customize colors and download 400×400 px PNG files in your browser.',
    icon: 'QrCode',
    isFeatured: true,
    isPopular: true,
    badge: 'Popular',
    usageGuide: 'Select one of the five QR payload tabs—Website URL, Wi-Fi Network, Plain Text, Email, or Phone Number—and fill in the corresponding fields to generate a live static QR code with high-redundancy Level H error correction. Customize the foreground and background colors if desired, then click Download PNG to save a 400×400 pixel barcode image or Copy Image to paste it directly.',
    relatedSlugs: ['password-generator', 'url-encoder-decoder', 'image-compressor'],
  },
  ...ADDITIONAL_TOOLS,
];

export function getToolBySlug(slug: string): ToolItem | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export const FEATURED_TOOLS = TOOLS.filter((t) => t.isFeatured);
export const POPULAR_TOOLS = TOOLS.filter((t) => t.isPopular);
export const IMAGE_TOOLS = TOOLS.filter((t) => t.category === 'image');
export const PDF_TOOLS = TOOLS.filter((t) => t.category === 'pdf');
export const STUDENT_TOOLS = TOOLS.filter((t) => t.category === 'student');
export const UTILITY_TOOLS = TOOLS.filter((t) => t.category === 'utility');
export const STUDENT_UTILITY_TOOLS = TOOLS.filter(
  (t) => t.category === 'student' || t.category === 'utility' || t.category === 'student-utility'
);
