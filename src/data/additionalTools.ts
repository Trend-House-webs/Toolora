import { ToolItem } from '../types';

export const ADDITIONAL_TOOLS: ToolItem[] = [
  // 22. ROTATE IMAGE
  {
    id: 'rotate-image',
    name: 'Rotate Image',
    slug: 'rotate-image',
    category: 'image',
    description: 'Rotate photos 90 degrees left, right, 180 degrees, or custom angles instantly in your browser.',
    detailedDescription: 'Rotate JPG, PNG, and WebP images client-side without quality degradation. Perfect for fixing sideways smartphone photos and orientation glitches.',
    metaTitle: 'Free Image Rotator — Rotate JPG, PNG & WebP Photos Online',
    metaDescription: 'Rotate images 90°, 180°, 270° or arbitrary angles directly in your browser. Fast, free, private, and 100% client-side with instant download.',
    icon: 'RotateCw',
    badge: 'Essential',
    features: [
      'Rotate 90° clockwise, counter-clockwise, or 180° flip',
      'Supports JPG, PNG, WebP, and BMP',
      'Lossless pixel transformation via HTML5 Canvas',
      'Zero server uploads for complete photo privacy',
    ],
    howToUse: [
      { step: 1, title: 'Upload Image', description: 'Drag and drop your photo or click to browse files from your device.' },
      { step: 2, title: 'Rotate Angle', description: 'Click Rotate Left 90°, Rotate Right 90°, or 180° until orientation is correct.' },
      { step: 3, title: 'Download Image', description: 'Click Download Rotated Image to save your newly oriented photo.' },
    ],
    whyUse: [
      'Fix Smartphone Orientation: Fix photos that were accidentally shot upside down or sideways.',
      '100% Private: Image rendering runs on your device graphics hardware without touching a server.',
      'Instant Processing: Avoid slow upload and download roundtrips on large photo files.',
    ],
    tips: [
      'Rotating an image preserves original pixel resolution without compressing or downsampling.',
      'If your photo also needs cropping, rotate it first before cropping for better alignment.',
    ],
    faq: [
      {
        question: 'Does rotating reduce the visual quality of my image?',
        answer: 'No. The rotation is performed directly on canvas pixel data at full native resolution and exported with high quality.',
      },
      {
        question: 'What file formats can I rotate?',
        answer: 'You can rotate JPEG, PNG, WebP, and BMP images directly in your browser.',
      },
      {
        question: 'Are my personal photos uploaded to a cloud server?',
        answer: 'No. All processing happens locally on your computer or phone using modern browser canvas APIs.',
      },
    ],
    relatedSlugs: ['flip-image', 'crop-image', 'image-resizer', 'image-compressor'],
  },

  // 23. FLIP IMAGE
  {
    id: 'flip-image',
    name: 'Flip Image (Mirror Photo)',
    slug: 'flip-image',
    category: 'image',
    description: 'Mirror images horizontally or vertically to correct inverted selfies and camera angles.',
    detailedDescription: 'Flip photos horizontally or vertically in seconds. Great for correcting mirrored front-facing camera selfies, symmetrical designs, and graphic assets.',
    metaTitle: 'Free Flip Image Online — Mirror Photos Horizontally & Vertically',
    metaDescription: 'Mirror and flip images horizontally or vertically client-side. Fast and free with in-browser processing and instant download.',
    icon: 'FlipHorizontal',
    badge: 'Popular',
    features: [
      'Horizontal mirror flip (ideal for selfie correction)',
      'Vertical mirror flip (upside-down inversion)',
      'Simultaneous dual-axis mirroring',
      'Full-resolution client-side canvas processing',
    ],
    howToUse: [
      { step: 1, title: 'Select Image', description: 'Drag & drop any photo or graphic into the dropzone.' },
      { step: 2, title: 'Toggle Flip Direction', description: 'Click Flip Horizontal or Flip Vertical to preview the mirrored result.' },
      { step: 3, title: 'Export & Save', description: 'Click Download Flipped Image to save your mirrored picture.' },
    ],
    whyUse: [
      'Selfie Inversion Fix: Smartphone front cameras frequently save mirrored selfies; flip them back to reality instantly.',
      'Symmetry Design: Create mirrored graphic patterns, reflections, and artwork.',
      'Local Security: No personal photos are transmitted over the web.',
    ],
    tips: [
      'Flip Horizontal is the most common tool used to invert flipped selfie text or logos on t-shirts.',
    ],
    faq: [
      {
        question: 'Can I flip both horizontally and vertically at the same time?',
        answer: 'Yes! You can toggle both axes simultaneously to achieve a 180° inverted mirror effect.',
      },
      {
        question: 'Is there a file size limit?',
        answer: 'Because processing runs directly on your machine hardware, Toolora can flip high-resolution DSLR photos up to your available device memory.',
      },
    ],
    relatedSlugs: ['rotate-image', 'crop-image', 'image-compressor', 'image-resizer'],
  },

  // 24. IMAGE METADATA VIEWER
  {
    id: 'image-metadata-viewer',
    name: 'Image Metadata & Property Viewer',
    slug: 'image-metadata-viewer',
    category: 'image',
    description: 'Inspect exact image dimensions, megapixels, aspect ratio, color depth, and MIME media format.',
    detailedDescription: 'View comprehensive technical specifications of any picture. Check exact pixel width and height, total megapixel count, aspect ratio, and file size without uploading.',
    metaTitle: 'Free Image Metadata Viewer — Inspect Photo Dimensions & Properties',
    metaDescription: 'Inspect image dimensions, megapixels, aspect ratio, file size, and technical properties online. Fast client-side photo analyzer without file uploads.',
    icon: 'FileText',
    features: [
      'Exact pixel dimensions and megapixel calculation',
      'Simplified aspect ratio detection with orientation analysis',
      'Accurate byte size and MIME type identification',
      'One-click summary copy to clipboard',
    ],
    howToUse: [
      { step: 1, title: 'Select Image', description: 'Choose any image file from your computer or phone.' },
      { step: 2, title: 'View Technical Specs', description: 'Inspect width, height, resolution, aspect ratio, and properties in the report table.' },
      { step: 3, title: 'Copy Metadata', description: 'Click Copy Data to copy the complete technical specification to your clipboard.' },
    ],
    whyUse: [
      'Design & Web Verification: Verify whether images meet strict ad banner, hero section, or marketplace dimension requirements.',
      'Print Calculation: Check total megapixels to see if a photo has sufficient resolution for physical printing.',
    ],
    tips: [
      'Megapixels are calculated as (Width × Height) / 1,000,000. A standard 4K image is roughly 8.3 Megapixels.',
    ],
    faq: [
      {
        question: 'Does this tool strip or view EXIF GPS data?',
        answer: 'This tool inspects image dimensions and container properties directly in browser RAM without uploading your photo to any third-party server.',
      },
      {
        question: 'Which formats are supported?',
        answer: 'All modern browser-supported formats including JPG, PNG, WebP, SVG, GIF, and BMP.',
      },
    ],
    relatedSlugs: ['image-dpi-checker', 'aspect-ratio-calculator', 'image-resizer'],
  },

  // 25. PASSPORT PHOTO RESIZER
  {
    id: 'passport-photo-resizer',
    name: 'Passport Photo Resizer',
    slug: 'passport-photo-resizer',
    category: 'image',
    description: 'Format photos to official 2x2 inch and 35x45 mm passport and visa dimensions with 300 DPI compliance.',
    detailedDescription: 'Resize and prepare portrait photos for passport and visa applications. Supports official specifications for US, UK, Schengen Europe, Canada, India, and Australia.',
    metaTitle: 'Free Passport Photo Resizer — Format 2x2 & 35x45mm Photos Online',
    metaDescription: 'Resize photos to official passport and visa sizes: US 2x2 inch (600x600 px), UK/EU 35x45mm, India, Canada. 100% free and client-side.',
    icon: 'Maximize2',
    isFeatured: true,
    badge: 'Popular',
    features: [
      'Presets for US Passport/Visa (2×2 inch / 600×600 px @ 300 DPI)',
      'Presets for UK / Schengen / EU (35×45 mm @ 300 DPI)',
      'Presets for India, Canada, China, and Australia',
      'Clean background border options (Pure White or Off-White)',
    ],
    howToUse: [
      { step: 1, title: 'Upload Portrait', description: 'Upload a clear, front-facing portrait photo with neutral lighting.' },
      { step: 2, title: 'Choose Country Standard', description: 'Select your target country requirement (e.g. US 2x2 or UK/EU 35x45mm).' },
      { step: 3, title: 'Download Photo', description: 'Download your passport-compliant JPEG file ready for upload or printing.' },
    ],
    whyUse: [
      'Save Expensive Studio Fees: Format your own passport pictures at home in seconds for free.',
      'Meet Government Standards: Exactly aligns with 300 DPI dimensional requirements for online application portals.',
      'Guaranteed Privacy: Biometric portrait photos never travel over the network to any server.',
    ],
    tips: [
      'Ensure your face occupies roughly 70% to 80% of the overall photo frame for standard passport compliance.',
      'Avoid smiling with teeth showing, tilt, sunglasses, or head coverings unless required for religious reasons.',
    ],
    faq: [
      {
        question: 'What is the standard pixel size for a US 2x2 passport photo?',
        answer: 'At standard 300 DPI printing resolution, a 2x2 inch photo is exactly 600 × 600 pixels.',
      },
      {
        question: 'What is the standard UK and Schengen visa photo size?',
        answer: 'The official UK and Schengen standard is 35 mm wide by 45 mm high, which translates to 413 × 531 pixels at 300 DPI.',
      },
    ],
    relatedSlugs: ['photo-size-reducer', 'crop-image', 'image-resizer', 'image-compressor'],
  },

  // 26. PHOTO SIZE REDUCER
  {
    id: 'photo-size-reducer',
    name: 'Photo Size Reducer (KB Limit)',
    slug: 'photo-size-reducer',
    category: 'image',
    description: 'Compress photos to strictly under 20KB, 50KB, 100KB, 200KB or any target ceiling for application portals.',
    detailedDescription: 'Strictly reduce photo file sizes to meet university, job portal, and government upload limits. Uses intelligent binary search optimization to ensure your image falls below your specified KB limit while maintaining maximum clarity.',
    metaTitle: 'Free Photo Size Reducer — Compress Under 20KB, 50KB, 100KB Online',
    metaDescription: 'Reduce photo file size to exact KB limits (under 50KB, 100KB, 200KB). Ideal for government portals, job applications, and admissions without server file uploads.',
    icon: 'Sliders',
    isPopular: true,
    badge: 'Essential',
    features: [
      'Target ceiling presets: <20 KB, <50 KB, <100 KB, <200 KB, <500 KB',
      'Custom numeric KB target input',
      'Iterative binary search for optimal visual fidelity at minimum size',
      'Instant client-side JPEG export',
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo', description: 'Select your photo or document scan.' },
      { step: 2, title: 'Pick Target KB', description: 'Choose a preset like Under 50 KB or type your portal exact maximum file size.' },
      { step: 3, title: 'Download Compressed Photo', description: 'Save your optimized photo guaranteed to pass portal file size limits.' },
    ],
    whyUse: [
      'Pass Portal Validation: Government websites, civil service exams, and admissions portals strictly reject files over 50KB or 100KB.',
      'No Quality Guesswork: Automatically calculates the exact mathematical compression ratio needed to fit your ceiling.',
    ],
    tips: [
      'If an image is very large (e.g. 5000px wide), the algorithm automatically scales resolution slightly to achieve sub-50KB sizes with excellent clarity.',
    ],
    faq: [
      {
        question: 'Will my image look blurry after compression?',
        answer: 'Toolora optimizes the trade-off between image dimensions and compression quality to keep faces and text legible while staying below your target byte limit.',
      },
      {
        question: 'Can I set a custom KB size like 40 KB?',
        answer: 'Yes! Simply type 40 in the custom target box and Toolora will compress your photo to 40 KB or less.',
      },
    ],
    relatedSlugs: ['image-compressor', 'passport-photo-resizer', 'image-resizer'],
  },

  // 27. BMP TO JPG
  {
    id: 'bmp-to-jpg',
    name: 'BMP to JPG Converter',
    slug: 'bmp-to-jpg',
    category: 'image',
    description: 'Convert uncompressed BMP bitmap graphics to lightweight, high-compatibility JPG photos.',
    detailedDescription: 'Convert legacy Windows Bitmap (.bmp) files to compressed JPEG pictures in your browser. Dramatically reduce file sizes by 90% or more with zero loss in practical visual quality.',
    metaTitle: 'Free BMP to JPG Converter — Convert Bitmap to JPEG Online',
    metaDescription: 'Convert BMP files to JPG online for free. Reduce file size by 90%+, preserve photo clarity, and download instantly without uploading to servers.',
    icon: 'RefreshCw',
    features: [
      'Instant client-side BMP raster decoding',
      'Reduces file sizes by 85% to 95%',
      'Configurable JPEG quality output',
      'Zero server upload requirement',
    ],
    howToUse: [
      { step: 1, title: 'Choose BMP File', description: 'Select any .bmp bitmap image from your computer.' },
      { step: 2, title: 'Review Preview', description: 'Inspect the converted JPEG and file size reduction comparison.' },
      { step: 3, title: 'Download JPG', description: 'Click Download JPG to save your modern web-compatible image.' },
    ],
    whyUse: [
      'Massive File Size Savings: BMP files are raw uncompressed pixel maps that take up huge disk space; JPG reduces this footprint by over 90%.',
      'Universal Compatibility: BMP files often fail to load in modern web apps and email clients; JPG works everywhere.',
    ],
    tips: [
      'Converting from BMP to JPG is one of the easiest ways to free up storage space without noticeable visual loss.',
    ],
    faq: [
      {
        question: 'Why are BMP files so large?',
        answer: 'Bitmap files store every individual pixel without compression. Converting to JPG compresses redundant color data.',
      },
    ],
    relatedSlugs: ['jpg-to-png', 'png-to-jpg', 'image-compressor'],
  },

  // 28. TRANSPARENT BACKGROUND CHECKER
  {
    id: 'transparent-background-checker',
    name: 'Transparent Background Checker',
    slug: 'transparent-background-checker',
    category: 'image',
    description: 'Verify if PNG or WebP images have real transparent backgrounds or fake checkered backgrounds.',
    detailedDescription: 'Inspect image transparency with real alpha channel pixel analysis. Test logos, cutouts, and stickers against checkerboard, black, white, and custom color backdrops.',
    metaTitle: 'Free Transparent Background Checker — Test PNG Alpha Channel',
    metaDescription: 'Test if your PNG or WebP has a genuine transparent background or a fake checkerboard pattern. Analyzes alpha channel pixels client-side.',
    icon: 'CheckCircle2',
    features: [
      'Algorithmic alpha channel pixel analysis',
      'Inspect against Dark, Light, Solid Black, and Neon backdrops',
      'Custom color background testing',
      'Detects fake rasterized checkerboard patterns',
    ],
    howToUse: [
      { step: 1, title: 'Upload Cutout or Logo', description: 'Select your PNG, WebP, or SVG graphic.' },
      { step: 2, title: 'Inspect Status', description: 'Read the automated transparency verdict and percentage of alpha pixels.' },
      { step: 3, title: 'Test Against Colors', description: 'Toggle backdrops to inspect edge fringing and cutout quality.' },
    ],
    whyUse: [
      'Spot Fake Stock Graphics: Many online image results pretend to be transparent but actually have a printed checkerboard pattern.',
      'Check Edge Halos: Easily spot white halos or rough edges around cutouts by placing them over a solid black backdrop.',
    ],
    tips: [
      'If you see a checkerboard on black background mode, your image has a fake checkered background and is not a real transparent cutout.',
    ],
    faq: [
      {
        question: 'What is an alpha channel?',
        answer: 'An alpha channel is an 8-bit layer in graphics that defines the opacity level of each pixel, allowing backgrounds to show through.',
      },
    ],
    relatedSlugs: ['png-to-webp', 'crop-image', 'image-compressor'],
  },

  // 29. ASPECT RATIO CALCULATOR
  {
    id: 'aspect-ratio-calculator',
    name: 'Aspect Ratio Calculator',
    slug: 'aspect-ratio-calculator',
    category: 'image',
    description: 'Calculate proportional dimensions for 16:9, 4:3, 9:16, 1:1, and custom aspect ratios without distortion.',
    detailedDescription: 'Calculate missing widths or heights while maintaining perfect proportions. Compute simplified aspect ratios from any pixel dimensions for video, photos, and web banners.',
    metaTitle: 'Free Aspect Ratio Calculator — 16:9, 4:3, 9:16 Image & Video Resizing',
    metaDescription: 'Calculate proportional image and video dimensions for 16:9, 9:16, 4:3, 1:1, and custom ratios. Prevent distortion and find aspect ratios from pixels.',
    icon: 'Scaling',
    isPopular: true,
    features: [
      'Calculate missing height from width (or width from height)',
      'Presets for 16:9 HD, 9:16 Reels/TikTok, 4:3, 1:1 Square, 21:9 Ultrawide',
      'Compute simplified ratio from custom pixel dimensions',
      'Instant copy to clipboard',
    ],
    howToUse: [
      { step: 1, title: 'Select Target Ratio', description: 'Choose a preset like 16:9 or enter your custom proportion.' },
      { step: 2, title: 'Enter Known Dimension', description: 'Type your known width or height in pixels.' },
      { step: 3, title: 'Get Calculated Dimension', description: 'Instantly view the exact pixel dimension to prevent image stretching.' },
    ],
    whyUse: [
      'Prevent Stretched Graphics: Ensures resized photos and video frames maintain their natural appearance without squishing.',
      'Video Production: Perfect for framing 1080p, 4K, YouTube thumbnails, and Instagram Reels.',
    ],
    tips: [
      '1920 × 1080 and 3840 × 2160 both represent the classic 16:9 widescreen television aspect ratio.',
    ],
    faq: [
      {
        question: 'What aspect ratio is used for Instagram Reels and TikTok?',
        answer: '9:16 vertical video (commonly 1080 × 1920 pixels).',
      },
    ],
    relatedSlugs: ['image-resizer', 'social-media-resizer', 'image-metadata-viewer'],
  },

  // 30. JPG TO PDF
  {
    id: 'jpg-to-pdf',
    name: 'JPG to PDF Converter',
    slug: 'jpg-to-pdf',
    category: 'pdf',
    description: 'Convert JPG photos and documents into a clean multi-page PDF with custom margins and page sizes.',
    detailedDescription: 'Combine single or multiple JPG images into a professional PDF document. Choose between A4 and US Letter page sizes, portrait or landscape orientations, and adjustable margins.',
    metaTitle: 'Free JPG to PDF Converter — Convert Images to PDF Online',
    metaDescription: 'Convert JPG to PDF online for free. Merge multiple pictures into one PDF with custom page size and margins. Fast client-side processing without file uploads.',
    icon: 'FileText',
    isFeatured: true,
    isPopular: true,
    badge: 'Popular',
    features: [
      'Merge multiple JPG photos into a single PDF',
      'Reorder pages with drag and drop or arrow controls',
      'Choose standard A4 or US Letter formats',
      'Configurable margins from borderless to wide',
    ],
    howToUse: [
      { step: 1, title: 'Add JPG Images', description: 'Upload one or multiple JPG photos into the queue.' },
      { step: 2, title: 'Arrange & Configure', description: 'Reorder pages, set page orientation (portrait/landscape), and adjust margins.' },
      { step: 3, title: 'Download PDF', description: 'Click Download PDF to compile and save your document instantly.' },
    ],
    whyUse: [
      'Document Submissions: Convert photo scans of IDs, homework assignments, or receipts into acceptable PDF format.',
      'Zero Server Upload: Sensitive personal documents stay safely on your computer without privacy risks.',
    ],
    tips: [
      'Use Portrait orientation for letter scans and Landscape for certificates and wide photos.',
    ],
    faq: [
      {
        question: 'Can I add multiple photos into one PDF?',
        answer: 'Yes! You can queue multiple JPG photos and arrange them in any order to generate a multi-page PDF.',
      },
      {
        question: 'Are my document photos uploaded to a server?',
        answer: 'No. Toolora compiles PDF documents directly in local browser memory without uploading your files.',
      },
    ],
    relatedSlugs: ['png-to-pdf', 'image-to-pdf', 'image-compressor'],
  },

  // 31. PNG TO PDF
  {
    id: 'png-to-pdf',
    name: 'PNG to PDF Converter',
    slug: 'png-to-pdf',
    category: 'pdf',
    description: 'Convert PNG graphics and screenshots to high-resolution PDF documents with white background backing.',
    detailedDescription: 'Turn PNG images into professional PDF files. Automatically backs transparent graphics with clean white paper background to prevent dark transparency rendering glitches in PDF viewers.',
    metaTitle: 'Free PNG to PDF Converter — Convert PNG Images to PDF Online',
    metaDescription: 'Convert PNG images to PDF online for free. Clean white background backing, custom page sizes, and 100% client-side compilation.',
    icon: 'FileText',
    badge: 'Essential',
    features: [
      'Automatic white background fill for transparent illustrations',
      'Supports multi-page PNG document compilation',
      'A4 and US Letter page sizing options',
      'Zero dependency high-speed local processing',
    ],
    howToUse: [
      { step: 1, title: 'Select PNG Files', description: 'Upload diagrams, screenshots, or PNG graphics.' },
      { step: 2, title: 'Adjust Layout', description: 'Configure orientation, page size, and margins.' },
      { step: 3, title: 'Download PDF', description: 'Save your compiled PDF document.' },
    ],
    whyUse: [
      'Fix Transparent PNG Artifacts: When viewing transparent PNGs in standard PDF viewers, transparency can appear black; Toolora backs them with crisp white paper.',
      'Combine Screenshots: Merge software workflow screenshots into a single instructional PDF manual.',
    ],
    tips: [
      'Choose standard A4 paper size for academic and international submissions.',
    ],
    faq: [
      {
        question: 'Will transparent PNGs look normal in the PDF?',
        answer: 'Yes! Toolora automatically renders transparent PNGs against a pure white background so text and illustrations appear crisp.',
      },
    ],
    relatedSlugs: ['jpg-to-pdf', 'image-to-pdf', 'png-to-jpg'],
  },

  // 32. PDF METADATA VIEWER
  {
    id: 'pdf-metadata-viewer',
    name: 'PDF Metadata Viewer & Page Counter',
    slug: 'pdf-metadata-viewer',
    category: 'pdf',
    description: 'Inspect PDF page counts, software producer metadata, PDF specification version, and encryption status.',
    detailedDescription: 'Analyze internal PDF structure client-side. Instantly check exact page count, standard specification version (e.g. PDF 1.4, 1.7), document title, author, and security encryption.',
    metaTitle: 'Free PDF Metadata Viewer — Count Pages & Check PDF Info Online',
    metaDescription: 'Inspect PDF page counts, version, title, author, producer, and encryption status directly in your browser. Client-side PDF analyzer without file uploads.',
    icon: 'FileCheck',
    features: [
      'Exact page count calculation',
      'PDF specification version detection (%PDF-1.x)',
      'Password protection and encryption verification',
      'Metadata attribute inspection (Title, Author, Producer)',
    ],
    howToUse: [
      { step: 1, title: 'Select PDF', description: 'Choose any PDF file from your device.' },
      { step: 2, title: 'Read Properties', description: 'Inspect page count, PDF version, security, and internal document metadata.' },
      { step: 3, title: 'Copy Summary', description: 'Click Copy Data to export properties to your clipboard.' },
    ],
    whyUse: [
      'Print Estimation: Rapidly check page count before sending large documents to commercial print shops.',
      'Security Verification: Confirm whether a confidential PDF is encrypted before emailing.',
    ],
    tips: [
      'Linearized PDFs (Fast Web View) are optimized to begin rendering page 1 before the entire file finishes downloading.',
    ],
    faq: [
      {
        question: 'Is my PDF uploaded anywhere?',
        answer: 'No. The file is analyzed strictly within browser memory using JavaScript TypedArrays.',
      },
    ],
    relatedSlugs: ['jpg-to-pdf', 'png-to-pdf', 'image-metadata-viewer'],
  },

  // 33. PERCENTAGE INCREASE CALCULATOR
  {
    id: 'percentage-increase-calculator',
    name: 'Percentage Increase Calculator',
    slug: 'percentage-increase-calculator',
    category: 'student',
    description: 'Calculate percentage growth, price inflation, salary raises, and investment gains with step-by-step formulas.',
    detailedDescription: 'Find the exact percentage increase from an initial starting value to a new final value. Displays step-by-step mathematical formulas, absolute difference, and growth multiplier.',
    metaTitle: 'Free Percentage Increase Calculator — Calculate Growth & Raises',
    metaDescription: 'Calculate percentage increase from one value to another with step-by-step formula breakdown. Free online calculator for salary raises, inflation, and growth.',
    icon: 'TrendingUp',
    isPopular: true,
    features: [
      'Computes percentage increase: ((New - Old) / Old) * 100',
      'Step-by-step mathematical breakdown',
      'Growth multiplier calculation (e.g. 1.25x)',
      'Instant copy to clipboard',
    ],
    howToUse: [
      { step: 1, title: 'Enter Initial Value', description: 'Type the starting number, original salary, or baseline price.' },
      { step: 2, title: 'Enter Final Value', description: 'Type the updated number, new salary, or current price.' },
      { step: 3, title: 'View Result', description: 'Read the percentage increase and copy the solution.' },
    ],
    whyUse: [
      'Salary Raise Calculations: Calculate the exact percentage increase offered during compensation reviews.',
      'Inflation & Pricing: Understand price hikes and commercial margin expansions.',
    ],
    tips: [
      'If your final value is double your initial value, your percentage increase is exactly 100%.',
    ],
    faq: [
      {
        question: 'What is the formula for percentage increase?',
        answer: 'Percentage Increase = ((Final Value - Initial Value) / Initial Value) × 100.',
      },
    ],
    relatedSlugs: ['percentage-calculator', 'percentage-decrease-calculator', 'marks-percentage-calculator'],
  },

  // 34. PERCENTAGE DECREASE CALCULATOR
  {
    id: 'percentage-decrease-calculator',
    name: 'Percentage Decrease Calculator',
    slug: 'percentage-decrease-calculator',
    category: 'student',
    description: 'Calculate discounts, sales reductions, weight loss percentages, and price drops with full math steps.',
    detailedDescription: 'Calculate the percentage drop or discount between an original price and a reduced price. Shows step-by-step arithmetic, absolute savings amount, and remaining value percentage.',
    metaTitle: 'Free Percentage Decrease Calculator — Calculate Discounts & Drops',
    metaDescription: 'Calculate percentage decrease and sale discounts online. Clear step-by-step math formula, savings breakdown, and instant copy.',
    icon: 'TrendingDown',
    features: [
      'Formula: ((Original - New) / Original) * 100',
      'Calculates total reduction and remaining percentage',
      'Step-by-step instructional explanation',
      'Handles decimal values and currency amounts',
    ],
    howToUse: [
      { step: 1, title: 'Enter Original Value', description: 'Type the initial price, starting weight, or baseline score.' },
      { step: 2, title: 'Enter Reduced Value', description: 'Type the discounted price or new lower value.' },
      { step: 3, title: 'View Discount', description: 'Read the percentage reduction and total amount saved.' },
    ],
    whyUse: [
      'Shopping Discounts: Verify promotional discounts on consumer goods and retail sales.',
      'Weight Loss Tracking: Calculate bodyweight reduction percentage for fitness milestones.',
    ],
    tips: [
      'A decrease from $100 to $80 represents a 20% decrease, leaving 80% of the original value.',
    ],
    faq: [
      {
        question: 'How do I calculate a 25% discount?',
        answer: 'Multiply the original price by 0.25 to find the savings, then subtract that from the original price.',
      },
    ],
    relatedSlugs: ['percentage-calculator', 'percentage-increase-calculator', 'marks-percentage-calculator'],
  },

  // 35. MARKS PERCENTAGE CALCULATOR
  {
    id: 'marks-percentage-calculator',
    name: 'Marks Percentage Calculator',
    slug: 'marks-percentage-calculator',
    category: 'student',
    description: 'Calculate student exam score percentage, letter grade, passing status, and GPA equivalence.',
    detailedDescription: 'Calculate student academic percentages from test scores and total marks. Supports aggregate marks or multi-subject score entry with automatic grade assignment and passing status.',
    metaTitle: 'Free Marks Percentage Calculator — Calculate Exam Grade & Score',
    metaDescription: 'Calculate student exam percentage, letter grade (A+, A, B), and passing status. Enter single total marks or multiple subject scores online for free.',
    icon: 'GraduationCap',
    isFeatured: true,
    isPopular: true,
    badge: 'Student',
    features: [
      'Calculate percentage from marks obtained vs total maximum marks',
      'Multi-subject score table with dynamic course rows',
      'Automated letter grade assignment (A+, A, B, C, D, F)',
      'Passing status and GPA equivalence indicators',
    ],
    howToUse: [
      { step: 1, title: 'Choose Mode', description: 'Select Total Score Calculation or Subject-by-Subject Marks.' },
      { step: 2, title: 'Enter Marks', description: 'Input your scored marks and the maximum possible marks.' },
      { step: 3, title: 'View Grade', description: 'Read your overall percentage, letter grade, and passing distinction.' },
    ],
    whyUse: [
      'Report Card Verification: Check semester and annual academic report card calculations.',
      'College Admissions: Calculate aggregate percentages required for university application minimum cut-offs.',
    ],
    tips: [
      'To convert percentage to a 10-point GPA scale, commonly divide percentage by 9.5 or 10 depending on your board curriculum.',
    ],
    faq: [
      {
        question: 'What is the formula to calculate marks percentage?',
        answer: 'Percentage = (Total Marks Obtained / Maximum Total Marks) × 100.',
      },
    ],
    relatedSlugs: ['gpa-calculator', 'percentage-calculator', 'average-calculator'],
  },

  // 36. DATE DIFFERENCE CALCULATOR
  {
    id: 'date-difference-calculator',
    name: 'Date Difference Calculator',
    slug: 'date-difference-calculator',
    category: 'student',
    description: 'Calculate days, weeks, months, working days, and weekend days between any two dates on a calendar.',
    detailedDescription: 'Find the exact span of time between two dates. Breaks down intervals into total days, years/months/days, business working days, and weekend days with optional inclusive end date.',
    metaTitle: 'Free Date Difference Calculator — Days Between Two Dates Online',
    metaDescription: 'Calculate exact days, weeks, months, years, and business days between any two dates. Free calendar date calculator with working days count.',
    icon: 'Calendar',
    isPopular: true,
    features: [
      'Total days, weeks, and hours between two dates',
      'Breakdown in exact Years, Months, and Days',
      'Working business days vs weekend days calculation',
      'Toggle to include or exclude the final day',
    ],
    howToUse: [
      { step: 1, title: 'Pick Start Date', description: 'Select the beginning date on the calendar picker.' },
      { step: 2, title: 'Pick End Date', description: 'Select the final date on the calendar picker.' },
      { step: 3, title: 'View Time Span', description: 'Read total elapsed days and working business days.' },
    ],
    whyUse: [
      'Project Planning: Calculate how many working days remain before a project deadline or sprint deliverable.',
      'Tenancy & Contracts: Determine exact days between lease commencement and termination.',
    ],
    tips: [
      'Toggle "Include end date" when calculating contractual hotel stays or billing periods where day 1 and the final day both count.',
    ],
    faq: [
      {
        question: 'Does this calculator exclude weekends?',
        answer: 'Yes! The calculator provides both total calendar days and a separate count of Monday–Friday working business days.',
      },
    ],
    relatedSlugs: ['age-calculator', 'study-timer', 'reading-time-calculator'],
  },

  // 37. READING TIME CALCULATOR
  {
    id: 'reading-time-calculator',
    name: 'Reading Time Calculator',
    slug: 'reading-time-calculator',
    category: 'student',
    description: 'Estimate silent reading duration and spoken speech time based on word count and words per minute (WPM).',
    detailedDescription: 'Calculate how long it will take an audience to read or listen to your text. Features slow, average, and fast reading benchmarks alongside spoken presentation timing.',
    metaTitle: 'Free Reading Time Calculator — Estimate Speech & Article Duration',
    metaDescription: 'Calculate reading and speaking duration for articles, essays, and speeches based on word count. Configurable words-per-minute (WPM) speeds.',
    icon: 'BookOpen',
    features: [
      'Average reading pace (225 WPM)',
      'Speaking pace for presentations and podcasts (130 WPM)',
      'Fast skimming pace (300 WPM) and slow study pace (150 WPM)',
      'Custom configurable WPM slider',
    ],
    howToUse: [
      { step: 1, title: 'Paste Text', description: 'Paste your draft article, script, speech, or chapter.' },
      { step: 2, title: 'Check Times', description: 'Read estimated reading duration and speaking duration.' },
      { step: 3, title: 'Adjust WPM', description: 'Customize words per minute to match your personal pacing.' },
    ],
    whyUse: [
      'Speech Pacing: Prepare for timed presentations (e.g. 5-minute lightning talk or 15-minute keynote).',
      'Blog & Article Headers: Provide an accurate "X min read" badge on your articles and newsletters.',
    ],
    tips: [
      'The average adult reads silently at roughly 200–250 words per minute, but speaks aloud at 125–150 words per minute.',
    ],
    faq: [
      {
        question: 'What is the standard words-per-minute rate for audiobooks and podcasts?',
        answer: 'Most narrators speak at roughly 130 to 150 words per minute for clear audience comprehension.',
      },
    ],
    relatedSlugs: ['word-counter', 'character-counter', 'study-timer'],
  },

  // 38. AVERAGE CALCULATOR
  {
    id: 'average-calculator',
    name: 'Average Calculator (Mean, Median, Mode)',
    slug: 'average-calculator',
    category: 'student',
    description: 'Calculate Arithmetic Mean, Median, Mode, Range, and Sum from any list of numbers.',
    detailedDescription: 'Statistical average calculator for students and researchers. Paste numbers separated by commas, spaces, or lines to calculate Mean, Median, Mode, Range, Min, Max, and Total Sum.',
    metaTitle: 'Free Average Calculator — Calculate Mean, Median & Mode Online',
    metaDescription: 'Calculate mean, median, mode, range, and sum from any set of numbers. Free online statistics calculator with instant results and copy.',
    icon: 'Calculator',
    features: [
      'Calculates Arithmetic Mean, Median, Mode, and Range',
      'Computes total sum, count, min, and max values',
      'Accepts comma, space, semicolon, or newline separated inputs',
      'One-click statistical summary copy',
    ],
    howToUse: [
      { step: 1, title: 'Enter Numbers', description: 'Paste or type numbers separated by commas or spaces.' },
      { step: 2, title: 'View Statistics', description: 'Instantly view Mean, Median, Mode, Range, and Sum.' },
      { step: 3, title: 'Copy Summary', description: 'Click Copy Statistics to paste results into your homework or spreadsheet.' },
    ],
    whyUse: [
      'Math & Statistics Homework: Quickly verify statistical calculations on datasets.',
      'Grade & Metric Averages: Find the central tendency of scores, prices, temperatures, or survey responses.',
    ],
    tips: [
      'Median is less affected by extreme statistical outliers than the arithmetic mean.',
    ],
    faq: [
      {
        question: 'What is the difference between Mean and Median?',
        answer: 'The Mean is the sum divided by the count. The Median is the exact middle value when numbers are sorted in order.',
      },
    ],
    relatedSlugs: ['percentage-calculator', 'marks-percentage-calculator', 'gpa-calculator'],
  },

  // 39. RANDOM NUMBER GENERATOR
  {
    id: 'random-number-generator',
    name: 'Random Number Generator',
    slug: 'random-number-generator',
    category: 'student',
    description: 'Generate single or multiple random integers within custom ranges using Web Crypto.',
    detailedDescription: 'Pick random numbers within any minimum and maximum range. Supports generating single or bulk numbers, optional non-repeating unique numbers, and sorting.',
    metaTitle: 'Free Random Number Generator — Pick Random Numbers Online',
    metaDescription: 'Generate random numbers between any min and max. Non-repeating options, bulk generation, cryptographically secure Web Crypto randomization.',
    icon: 'Dices',
    features: [
      'Custom minimum and maximum range bounds',
      'Pick 1 to 500 random numbers at once',
      'Option to disallow duplicates (unique lottery / raffle picks)',
      'Sort output ascending, descending, or random order',
    ],
    howToUse: [
      { step: 1, title: 'Set Range', description: 'Enter minimum (e.g. 1) and maximum (e.g. 100).' },
      { step: 2, title: 'Choose Quantity', description: 'Choose how many numbers to generate and duplicate settings.' },
      { step: 3, title: 'Generate & Copy', description: 'Click Generate to roll numbers and copy results.' },
    ],
    whyUse: [
      'Contests & Giveaways: Conduct unbiased, verifiable raffle and prize draws.',
      'Classroom Activities: Randomly select student numbers or problem assignments without favoritism.',
    ],
    tips: [
      'Powered by window.crypto for cryptographically sound pseudorandom distribution.',
    ],
    faq: [
      {
        question: 'Can this tool generate unique numbers without duplicates?',
        answer: 'Yes! Simply leave "Allow Duplicate Numbers" unchecked and Toolora will ensure every number in the batch is unique.',
      },
    ],
    relatedSlugs: ['password-generator', 'average-calculator', 'study-timer'],
  },

  // 40. POMODORO TIMER
  {
    id: 'pomodoro-timer',
    name: 'Pomodoro Timer',
    slug: 'pomodoro-timer',
    category: 'student',
    description: 'Dedicated Pomodoro study timer with 25m work sessions, 5m breaks, streaks, and audio chime.',
    detailedDescription: 'Maximize academic productivity and deep work with structured Pomodoro cycles. Automated 25-minute focus intervals, 5-minute short breaks, 15-minute long breaks, and session counters.',
    metaTitle: 'Free Pomodoro Timer — 25/5 Study & Deep Work Timer Online',
    metaDescription: 'Free online Pomodoro timer for deep work and study. 25m work and 5m break intervals, automated cycles, audio chime, and session streak counter.',
    icon: 'Clock',
    isFeatured: true,
    isPopular: true,
    badge: 'Popular',
    features: [
      '25-minute Focus, 5-minute Short Break, 15-minute Long Break',
      'Completed session counter with streak tracking',
      'Pleasant Web Audio chime notifications',
      'Visual circular time progress indicators',
    ],
    howToUse: [
      { step: 1, title: 'Start Focus', description: 'Click Start Focus to launch your 25-minute work block.' },
      { step: 2, title: 'Work Singly', description: 'Eliminate tab switching and work until the chime rings.' },
      { step: 3, title: 'Recharge', description: 'Enjoy your 5-minute break away from screens.' },
    ],
    whyUse: [
      'Beat Procrastination: 25 minutes is short enough to overcome psychological resistance.',
      'Sustain Concentration: Regular breaks preserve executive function and problem-solving endurance.',
    ],
    tips: [
      'Complete 4 Pomodoro cycles before taking a longer 15–30 minute rest break.',
    ],
    faq: [
      {
        question: 'Why 25 minutes?',
        answer: 'Research shows 25 minutes strikes the sweet spot between building deep immersion and avoiding mental fatigue.',
      },
    ],
    relatedSlugs: ['study-timer', 'reading-time-calculator', 'word-counter'],
  },

  // 41. PASSWORD GENERATOR
  {
    id: 'password-generator',
    name: 'Password Generator',
    slug: 'password-generator',
    category: 'utility',
    description: 'Generate strong, cryptographically secure passwords with custom lengths and symbol rules.',
    detailedDescription: 'Create highly secure, uncrackable passwords using the browser native Web Crypto API. Customize character sets (uppercase, lowercase, numbers, symbols) and avoid ambiguous characters.',
    metaTitle: 'Free Password Generator — Create Secure Passwords Online',
    metaDescription: 'Generate strong, cryptographically secure passwords online. Custom length, symbols, entropy strength meter, and local browser generation.',
    icon: 'Key',
    isFeatured: true,
    isPopular: true,
    badge: 'Security',
    features: [
      'Cryptographically secure randomization via window.crypto.getRandomValues',
      'Configurable length from 6 to 64 characters',
      'Uppercase, lowercase, numeric, and symbol toggles',
      'Avoid easily confused ambiguous characters (e.g. 1, l, I, 0, O)',
      'Real-time entropy and security strength meter',
    ],
    howToUse: [
      { step: 1, title: 'Set Length', description: 'Slide the length selector between 16 and 32 characters for optimal security.' },
      { step: 2, title: 'Choose Character Rules', description: 'Toggle uppercase, lowercase, numbers, and symbols.' },
      { step: 3, title: 'Copy Password', description: 'Click Copy to save your secure password directly to your clipboard.' },
    ],
    whyUse: [
      'Zero Cloud Transmission: Your passwords are generated strictly on your CPU and never saved or sent to any server.',
      'True Cryptographic Randomness: Uses hardware entropy rather than predictable pseudo-random seeds.',
    ],
    tips: [
      'A 16-character password with letters, numbers, and symbols would take billions of years for modern supercomputers to crack.',
    ],
    faq: [
      {
        question: 'Does Toolora store or see my generated passwords?',
        answer: 'Never. Passwords are generated exclusively in local JavaScript memory and are wiped when the page refreshes.',
      },
    ],
    relatedSlugs: ['base64-encoder-decoder', 'qr-code-generator', 'random-number-generator'],
  },

  // 42. BASE64 ENCODER & DECODER
  {
    id: 'base64-encoder-decoder',
    name: 'Base64 Encoder & Decoder',
    slug: 'base64-encoder-decoder',
    category: 'utility',
    description: 'Encode plain text to Base64 or decode Base64 strings to UTF-8 text in real time.',
    detailedDescription: 'Fast, two-way Base64 converter. Encode strings and payloads into standard Base64 format or decode encoded strings back into clean UTF-8 text with instant error checking.',
    metaTitle: 'Free Base64 Encoder & Decoder — Encode & Decode Base64 Online',
    metaDescription: 'Encode text to Base64 or decode Base64 strings to readable UTF-8 text online. Client-side browser processing with instant copy.',
    icon: 'Code',
    isPopular: true,
    features: [
      'Two-way encoding and decoding',
      'Full UTF-8 unicode compatibility',
      'Instant syntax validation with error diagnostics',
      'One-click swap and clipboard copy',
    ],
    howToUse: [
      { step: 1, title: 'Select Mode', description: 'Choose Encode to Base64 or Decode from Base64.' },
      { step: 2, title: 'Paste Input', description: 'Enter your string in the left input box.' },
      { step: 3, title: 'Copy Result', description: 'Click Copy to take your converted payload.' },
    ],
    whyUse: [
      'Developer Productivity: Quickly inspect JWT payloads, API authentication strings, and embedded data URIs.',
      'Safe Data Transfer: Ensure text containing special characters can safely pass through email and URL protocols.',
    ],
    tips: [
      'Base64 expands data by roughly 33% because every 3 binary bytes are represented by 4 ASCII characters.',
    ],
    faq: [
      {
        question: 'Is Base64 considered encryption?',
        answer: 'No. Base64 is an encoding format designed for safe data transmission, not a cryptographic security measure.',
      },
    ],
    relatedSlugs: ['url-encoder-decoder', 'json-formatter', 'password-generator'],
  },

  // 43. URL ENCODER & DECODER
  {
    id: 'url-encoder-decoder',
    name: 'URL Encoder & Decoder',
    slug: 'url-encoder-decoder',
    category: 'utility',
    description: 'Encode query parameters into percent-encoded URLs or decode escaped strings into readable text.',
    detailedDescription: 'Convert special characters and spaces into valid percent-encoded URL formats (%20, %26, etc.) or decode complex URLs into human-readable parameters in your browser.',
    metaTitle: 'Free URL Encoder & Decoder — Percent-Encode URLs Online',
    metaDescription: 'Encode and decode URLs and query string parameters online. Supports encodeURIComponent and full URI decoding client-side.',
    icon: 'Code',
    features: [
      'Two-way URL encoding and decoding',
      'Supports encodeURIComponent and encodeURI modes',
      'Handles UTF-8 non-ASCII characters and emojis',
      'Instant copy and input swap',
    ],
    howToUse: [
      { step: 1, title: 'Choose Action', description: 'Select URL Encode or URL Decode.' },
      { step: 2, title: 'Input Text or Link', description: 'Type or paste your query parameters or link.' },
      { step: 3, title: 'Copy Encoded URL', description: 'Copy the escaped link ready for HTTP requests.' },
    ],
    whyUse: [
      'Fix Broken Links: Prevent web servers from breaking when URLs contain spaces, ampersands, or non-Latin characters.',
      'API Parameter Safety: Ensure GET query strings are formatted according to RFC 3986 standards.',
    ],
    tips: [
      'Use encodeURIComponent when encoding individual parameter values, and encodeURI for whole URL addresses.',
    ],
    faq: [
      {
        question: 'Why do spaces turn into %20?',
        answer: 'Spaces are not permissible in standard URLs; RFC 3986 dictates that spaces must be percent-encoded as %20 or +.',
      },
    ],
    relatedSlugs: ['base64-encoder-decoder', 'json-formatter', 'qr-code-generator'],
  },

  // 44. JSON FORMATTER & VALIDATOR
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    slug: 'json-formatter',
    category: 'utility',
    description: 'Format, beautify, validate, and minify JSON data with exact syntax error diagnostics.',
    detailedDescription: 'Clean and inspect raw JSON payloads. Beautify messy JSON with 2-space or 4-space indentation, minify for production payload transfer, and diagnose syntax errors instantly.',
    metaTitle: 'Free JSON Formatter & Validator — Beautify & Minify JSON Online',
    metaDescription: 'Format, beautify, minify, and validate JSON online for free. Accurate syntax error diagnostics, copy, and file download without server uploads.',
    icon: 'Code',
    isFeatured: true,
    isPopular: true,
    badge: 'Popular',
    features: [
      'Beautify messy JSON with 2 or 4 space indentation',
      'Minify JSON to compact single-line payloads',
      'Precise syntax validation with line diagnostics',
      'Download formatted .json files directly',
    ],
    howToUse: [
      { step: 1, title: 'Paste JSON', description: 'Paste unformatted JSON into the editor window.' },
      { step: 2, title: 'Format or Minify', description: 'Click Format / Beautify to indent or Minify to compact.' },
      { step: 3, title: 'Export', description: 'Click Copy to clipboard or Download to save as formatted.json.' },
    ],
    whyUse: [
      'API Debugging: Turn illegible minified server responses into structured, readable data trees.',
      'Catch Subtle Errors: Immediately identify missing commas, trailing commas, or unquoted keys.',
    ],
    tips: [
      'Unlike JavaScript objects, strict standard JSON requires double quotes around both property keys and string values.',
    ],
    faq: [
      {
        question: 'Are trailing commas allowed in standard JSON?',
        answer: 'No. The JSON standard (RFC 8259) forbids trailing commas after the final element in arrays and objects.',
      },
    ],
    relatedSlugs: ['base64-encoder-decoder', 'url-encoder-decoder', 'text-case-converter'],
  },

  // 45. COLOR CONVERTER
  {
    id: 'color-converter',
    name: 'Color Converter (HEX to RGB & HSL)',
    slug: 'color-converter',
    category: 'utility',
    description: 'Convert color codes between HEX, RGB, and HSL with live visual swatch preview.',
    detailedDescription: 'Convert web and design colors between HEX (#RRGGBB), RGB (rgb(r,g,b)), and HSL formats. Features interactive color picker, contrast evaluation, and CSS variable output.',
    metaTitle: 'Free Color Converter — Convert HEX to RGB & HSL Online',
    metaDescription: 'Convert color codes between HEX, RGB, and HSL. Live visual swatch preview, CSS variables, and one-click copy. 100% free web utility.',
    icon: 'Palette',
    features: [
      'Instant conversion between HEX, RGB, HSL, and CMYK',
      'Interactive visual color swatch picker',
      'CSS custom property export format (--color: #HEX)',
      'Contrast-aware dynamic text preview',
    ],
    howToUse: [
      { step: 1, title: 'Pick or Enter Color', description: 'Click the color square or type a HEX code (e.g. #2563EB).' },
      { step: 2, title: 'View Equivalents', description: 'Inspect corresponding RGB and HSL values in the table.' },
      { step: 3, title: 'Copy Format', description: 'Click Copy next to the desired format for CSS stylesheets.' },
    ],
    whyUse: [
      'Frontend Styling: Rapidly convert Figma or Photoshop HEX codes into CSS rgba() transparency values.',
      'Brand Consistency: Maintain exact color matching across web, print, and mobile platforms.',
    ],
    tips: [
      'HEX colors with 3 characters like #FFF automatically expand to 6 characters (#FFFFFF).',
    ],
    faq: [
      {
        question: 'What is HSL and why use it over RGB?',
        answer: 'HSL stands for Hue, Saturation, and Lightness. It makes creating lighter tints or darker shades of a color much more intuitive.',
      },
    ],
    relatedSlugs: ['transparent-background-checker', 'image-metadata-viewer', 'qr-code-generator'],
  },

  // 46. TEXT CASE CONVERTER
  {
    id: 'text-case-converter',
    name: 'Text Case Converter',
    slug: 'text-case-converter',
    category: 'utility',
    description: 'Transform text into UPPERCASE, lowercase, Title Case, camelCase, snake_case, or kebab-case.',
    detailedDescription: 'Convert text case formatting for copywriters, students, and programmers. Easily switch between Title Case, Sentence case, UPPERCASE, lowercase, camelCase, snake_case, and kebab-case.',
    metaTitle: 'Free Text Case Converter — Uppercase, Lowercase, Title Case Online',
    metaDescription: 'Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case. Fast, free, and private text transformer.',
    icon: 'Type',
    isPopular: true,
    features: [
      'Sentence case and Title Case formatting',
      'UPPERCASE and lowercase transformation',
      'Developer formats: camelCase, snake_case, kebab-case, PascalCase',
      'Live word and character count tracking',
    ],
    howToUse: [
      { step: 1, title: 'Paste Text', description: 'Enter or paste your text into the editor box.' },
      { step: 2, title: 'Choose Case', description: 'Click any format button (e.g. Title Case, UPPERCASE, camelCase).' },
      { step: 3, title: 'Copy Result', description: 'Click Copy Text to paste your converted copy anywhere.' },
    ],
    whyUse: [
      'Headlines & Titles: Format article and essay headings according to standard Title Case capitalisation rules.',
      'Coding Identifiers: Quickly convert human phrases into variable names or URL slugs.',
    ],
    tips: [
      'Use Title Case for titles and headlines, and Sentence case for standard body paragraphs.',
    ],
    faq: [
      {
        question: 'What is the difference between camelCase and PascalCase?',
        answer: 'camelCase starts with a lowercase letter (myVariableName) while PascalCase capitalizes the first letter (MyVariableName).',
      },
    ],
    relatedSlugs: ['word-counter', 'character-counter', 'remove-duplicate-lines'],
  },

  // 47. REMOVE DUPLICATE LINES
  {
    id: 'remove-duplicate-lines',
    name: 'Remove Duplicate Lines & Sort',
    slug: 'remove-duplicate-lines',
    category: 'utility',
    description: 'Deduplicate lists, emails, keywords, and text lines with optional alphabetical sorting.',
    detailedDescription: 'Clean and deduplicate text lists in seconds. Remove duplicate lines, trim whitespace, eliminate blank lines, and sort entries alphabetically from A-Z or Z-A completely client-side.',
    metaTitle: 'Free Remove Duplicate Lines Tool — Deduplicate & Sort Lists Online',
    metaDescription: 'Remove duplicate lines from text, email lists, and keywords online. Clean whitespace, sort alphabetically (A-Z), and copy deduplicated lists for free.',
    icon: 'ArrowUpDown',
    badge: 'Utility',
    features: [
      'Instant duplicate line removal',
      'Alphabetical sorting (A-Z and Z-A)',
      'Optional case-sensitive or case-insensitive matching',
      'Automatic whitespace trimming and empty line removal',
    ],
    howToUse: [
      { step: 1, title: 'Paste List', description: 'Paste your list of emails, keywords, or lines into the text area.' },
      { step: 2, title: 'Remove Duplicates', description: 'Click Remove Duplicates or Dedupe & Sort (A-Z).' },
      { step: 3, title: 'Copy Cleaned List', description: 'Copy your unique list directly to your clipboard.' },
    ],
    whyUse: [
      'Clean Email Lists: Eliminate accidental duplicate email subscribers before sending newsletters.',
      'SEO Keyword Lists: Deduplicate search queries and target keywords before campaign launch.',
    ],
    tips: [
      'Keep "Trim Whitespace" checked so lines with invisible trailing spaces are correctly identified as duplicates.',
    ],
    faq: [
      {
        question: 'Will this tool delete blank or empty lines?',
        answer: 'Yes! The "Remove Empty Lines" toggle automatically cleans out empty rows while preserving all unique content.',
      },
    ],
    relatedSlugs: ['text-case-converter', 'word-counter', 'json-formatter'],
  },

  // 48. MERGE PDF
  {
    id: 'merge-pdf',
    name: 'Merge PDF',
    slug: 'merge-pdf',
    category: 'pdf',
    description: 'Combine multiple PDF files into a single document in any order. Fast client-side processing in your browser.',
    detailedDescription: 'Merge two or more PDF files into one clean document. Drag to reorder, view page counts, and download the combined PDF instantly without server uploads.',
    metaTitle: 'Free Merge PDF Online — Combine Multiple PDF Files Privately',
    metaDescription: 'Merge multiple PDF documents into a single file directly in your browser. 100% free, client-side, with no file size limits or sign-up needed.',
    icon: 'Layers',
    isPopular: true,
    isFeatured: true,
    badge: 'Popular',
    features: [
      'Pure client-side merging without server file uploads',
      'Reorder documents before combining',
      'Preview total page count and file sizes',
      'Preserves original vector sharpness and embedded fonts',
    ],
    howToUse: [
      { step: 1, title: 'Upload PDF Files', description: 'Click or drag and drop 2 or more PDF documents into the upload box.' },
      { step: 2, title: 'Arrange Order', description: 'Use the up and down arrow buttons to set the exact sequence of pages.' },
      { step: 3, title: 'Merge & Download', description: 'Click Merge & Download PDF to assemble and save your combined file.' },
    ],
    whyUse: [
      'Complete Document Confidentiality: Legal contracts, invoices, and financial records are processed locally in RAM.',
      'No Artificial Limits: Merge as many documents as your device memory supports without daily caps.',
    ],
    tips: [
      'Check page counts on each file before merging to ensure no blank trailing pages are included.',
    ],
    faq: [
      {
        question: 'Is it safe to merge sensitive financial or legal PDFs here?',
        answer: 'Yes, absolutely. All PDF merging takes place entirely inside your web browser using WebAssembly and client-side JavaScript. Your files are never sent over the Internet.',
      },
      {
        question: 'Does merging compress or degrade the quality of PDF pages?',
        answer: 'No. The pages, vector typography, and embedded images are copied bit-for-bit into the destination document.',
      },
      {
        question: 'Can I reorder files before merging?',
        answer: 'Yes! Use the Up and Down arrow buttons next to each file to arrange them in your exact desired order.',
      },
      {
        question: 'Can I merge password-protected PDFs?',
        answer: 'Encrypted PDFs must have passwords removed first so the browser can access and copy page streams.',
      },
    ],
    relatedSlugs: ['split-pdf', 'rotate-pdf', 'pdf-page-counter', 'jpg-to-pdf'],
  },

  // 49. SPLIT PDF
  {
    id: 'split-pdf',
    name: 'Split PDF (Extract Pages)',
    slug: 'split-pdf',
    category: 'pdf',
    description: 'Extract specific pages or page ranges from any PDF document into a new file.',
    detailedDescription: 'Split large PDF documents into smaller files. Select custom page ranges (e.g. 1-3, 5) or separate odd and even pages client-side with zero data uploads.',
    metaTitle: 'Free Split PDF Online — Extract Pages from PDF Privately',
    metaDescription: 'Extract specific pages or ranges from PDF files online for free. Browser-based extraction with instant download and no server file uploads.',
    icon: 'Crop',
    isPopular: true,
    badge: 'Essential',
    features: [
      'Extract custom ranges like 1-5, 8, 12-15',
      'Filter even or odd pages with one click',
      'Retains original vector graphics and text clarity',
      'No file size restrictions or watermark overlays',
    ],
    howToUse: [
      { step: 1, title: 'Choose PDF File', description: 'Select or drag and drop your PDF document into the workspace.' },
      { step: 2, title: 'Specify Pages', description: 'Type the page numbers or ranges to extract (e.g., 1-4, 7).' },
      { step: 3, title: 'Download Split PDF', description: 'Click Extract & Download to immediately save your new document.' },
    ],
    whyUse: [
      'Share Only What Matters: Send single chapters, receipts, or forms without disclosing an entire 100-page book.',
      'Instant Local Speed: No upload lag or queue waiting.',
    ],
    tips: [
      'You can combine commas and hyphens in the page input, such as "1-3, 5, 8-10".',
    ],
    faq: [
      {
        question: 'How do I specify multiple separate page ranges?',
        answer: 'Separate each page or range with a comma. For example, typing "1-3, 5, 7-10" extracts pages 1 through 3, page 5, and pages 7 through 10.',
      },
      {
        question: 'Are extracted pages saved in high resolution?',
        answer: 'Yes, original vector curves, fonts, and high-DPI graphics are preserved losslessly.',
      },
      {
        question: 'Can I extract even and odd pages for double-sided printing?',
        answer: 'Yes, switch to "Even / Odd Pages" mode to extract only odd or even pages in one step.',
      },
      {
        question: 'Does Toolora store a copy of my PDF?',
        answer: 'No. Toolora operates with zero backend servers. All processing executes locally on your machine.',
      },
    ],
    relatedSlugs: ['merge-pdf', 'rotate-pdf', 'pdf-page-counter', 'image-to-pdf'],
  },

  // 50. ROTATE PDF
  {
    id: 'rotate-pdf',
    name: 'Rotate PDF',
    slug: 'rotate-pdf',
    category: 'pdf',
    description: 'Permanently rotate PDF pages 90°, 180°, or 270° clockwise. Fix sideways scanned documents.',
    detailedDescription: 'Fix upside-down or sideways PDF scans. Rotate all pages or specific pages 90 degrees right, left, or 180 degrees upside-down directly in your browser.',
    metaTitle: 'Free Rotate PDF Online — Permanently Rotate PDF Pages 90° or 180°',
    metaDescription: 'Rotate PDF pages permanently in your browser. Fix orientation on scans and receipts. 100% free, private, and client-side.',
    icon: 'RotateCw',
    badge: 'Tool',
    features: [
      'Rotate 90° clockwise, 180° upside down, or 270° counter-clockwise',
      'Apply to all pages or selective custom page numbers',
      'Zero server upload for total document privacy',
      'Instant download without watermarks',
    ],
    howToUse: [
      { step: 1, title: 'Upload PDF', description: 'Drag and drop your PDF file or click to browse.' },
      { step: 2, title: 'Choose Angle', description: 'Select 90° Clockwise, 180° Flip, or 270° (Rotate Left).' },
      { step: 3, title: 'Save Rotated PDF', description: 'Click Rotate & Download PDF to save your fixed file.' },
    ],
    whyUse: [
      'Fix Mobile Scans: Scanners often save landscape pages vertically; rotate them in one click for comfortable reading.',
    ],
    tips: [
      'If only page 1 is sideways, select "Specific pages only" and enter "1" to leave the rest untouched.',
    ],
    faq: [
      {
        question: 'Is the rotation permanent in PDF readers like Adobe Acrobat?',
        answer: 'Yes. The rotation tag is written directly to the PDF page dictionary, so every viewer will open it in the corrected orientation.',
      },
      {
        question: 'Does rotating degrade PDF text sharpness?',
        answer: 'No. Rotating only updates the orientation metadata angle. The underlying vector glyphs and bitmaps are untouched.',
      },
      {
        question: 'Can I rotate only odd pages?',
        answer: 'Yes, select specific pages and list the odd numbers (e.g. 1, 3, 5).',
      },
      {
        question: 'Is there a limit on PDF file size?',
        answer: 'Because processing runs in client RAM, files up to 200MB+ can be rotated without bandwidth issues.',
      },
    ],
    relatedSlugs: ['merge-pdf', 'split-pdf', 'pdf-page-counter', 'rotate-image'],
  },

  // 51. PDF PAGE COUNTER
  {
    id: 'pdf-page-counter',
    name: 'PDF Page Counter & Size Inspector',
    slug: 'pdf-page-counter',
    category: 'pdf',
    description: 'Count total pages, inspect physical page dimensions (inches, mm), and check PDF metadata.',
    detailedDescription: 'Fast client-side inspector for PDF documents. Instantly view total page count, average size per page, physical print dimensions, and author metadata without installing heavy software.',
    metaTitle: 'Free PDF Page Counter — Count Pages & Check PDF Size Online',
    metaDescription: 'Count pages in any PDF file instantly online. Inspect dimensions in mm and inches, file sizes, and metadata without server file uploads.',
    icon: 'FileText',
    badge: 'Utility',
    features: [
      'Instant page count calculation',
      'Physical page dimensions in mm, inches, and PostScript points',
      'Average size per page breakdown',
      'Metadata extraction (Author, Title, Producer, Dates)',
    ],
    howToUse: [
      { step: 1, title: 'Select PDF', description: 'Drop any PDF into the inspector zone.' },
      { step: 2, title: 'View Metrics', description: 'Review total page count, dimensions, and file size.' },
      { step: 3, title: 'Copy Details', description: 'Copy page dimensions or document details for print planning.' },
    ],
    whyUse: [
      'Print Estimation: Determine exact page counts for commercial book printing, thesis binding, or exam copies.',
    ],
    tips: [
      'Standard A4 is 210 × 297 mm (8.27 × 11.69 in). Standard US Letter is 216 × 279 mm (8.5 × 11.0 in).',
    ],
    faq: [
      {
        question: 'Can this inspect multi-hundred page documents?',
        answer: 'Yes! The parser streams PDF object trees in milliseconds directly inside browser memory.',
      },
      {
        question: 'Does this tool view password-protected files?',
        answer: 'Encrypted PDFs require decryption before structural dictionaries can be read.',
      },
      {
        question: 'Are my PDF documents uploaded to an external server?',
        answer: 'No. The file is analyzed strictly within your local browser environment.',
      },
      {
        question: 'Can I check whether a PDF is in portrait or landscape?',
        answer: 'Yes, the inspector lists the orientation and width-to-height ratio for the pages.',
      },
    ],
    relatedSlugs: ['merge-pdf', 'split-pdf', 'pdf-metadata-viewer', 'image-dpi-checker'],
  },

  // 52. CGPA CALCULATOR
  {
    id: 'cgpa-calculator',
    name: 'CGPA Calculator',
    slug: 'cgpa-calculator',
    category: 'student',
    description: 'Calculate Cumulative Grade Point Average across multiple semesters with credit weighting and percentage conversion.',
    detailedDescription: 'Calculate your college or university Cumulative GPA (CGPA) effortlessly. Supports 4.0, 5.0, and 10.0 grading scales, weights by credit hours, and gives percentage equivalents and honors distinctions.',
    metaTitle: 'Free CGPA Calculator — Calculate Cumulative GPA & Percentage Online',
    metaDescription: 'Calculate your CGPA across college semesters online. Supports 4.0, 5.0, and 10.0 scales with credit hours, percentage equivalent, and honors ranking.',
    icon: 'GraduationCap',
    isPopular: true,
    isFeatured: true,
    badge: 'Academic',
    features: [
      'Support for 4.0, 5.0, and 10.0 grading scales',
      'Weighted calculation based on semester credit hours',
      'Automatic percentage conversion and academic honors standing',
      'Exportable summary report with one-click clipboard copy',
    ],
    howToUse: [
      { step: 1, title: 'Choose Grading Scale', description: 'Select 4.0, 5.0, or 10.0 scale matching your university system.' },
      { step: 2, title: 'Enter Semester Data', description: 'Input your GPA (SGPA) and credit hours for each semester.' },
      { step: 3, title: 'Get CGPA & Percentage', description: 'View your cumulative GPA and copy the detailed summary report.' },
    ],
    whyUse: [
      'Graduate School Applications: Calculate cumulative standing for master’s and PhD program requirements.',
      'Scholarship Eligibility: Verify whether your academic performance meets GPA thresholds.',
    ],
    tips: [
      'Make sure credit hours match your official transcript, as courses with higher credits impact CGPA more.',
    ],
    faq: [
      {
        question: 'What is the difference between GPA and CGPA?',
        answer: 'GPA (Grade Point Average) usually refers to performance in a single semester or term (SGPA), whereas CGPA (Cumulative Grade Point Average) is the credit-weighted average across all semesters completed to date.',
      },
      {
        question: 'How is CGPA converted to percentage on a 10.0 scale?',
        answer: 'Most standard institutions (like CBSE and technical universities) use the formula: Percentage = CGPA × 9.5.',
      },
      {
        question: 'Does this calculator save my grades on a server?',
        answer: 'No. Everything stays in your browser memory; your academic data is not transmitted to any server.',
      },
      {
        question: 'Can I add more than 8 semesters?',
        answer: 'Yes! Click "Add Another Semester" to include as many terms as required for your degree program.',
      },
    ],
    relatedSlugs: ['gpa-calculator', 'grade-calculator', 'marks-percentage-calculator', 'percentage-calculator'],
  },

  // 53. GRADE CALCULATOR
  {
    id: 'grade-calculator',
    name: 'Grade & Final Exam Calculator',
    slug: 'grade-calculator',
    category: 'student',
    description: 'Calculate weighted class grades or determine the exact score needed on your final exam to pass or earn an A.',
    detailedDescription: 'Weighted course grade calculator and final exam target finder. Enter your homework, quiz, and midterm scores with weights to see your current standing and required final exam score.',
    metaTitle: 'Free Grade Calculator — Weighted Class Grade & Final Exam Target',
    metaDescription: 'Calculate your weighted course grade and find out what score you need on your final exam to get an A, B, or passing grade. Free student tool.',
    icon: 'Calculator',
    isPopular: true,
    badge: 'Popular',
    features: [
      'Weighted category grading (Homework, Quizzes, Midterms, Projects)',
      'Final exam score predictor for target grades (A, B, C, Passing)',
      'Letter grade and 4.0 GPA equivalent breakdown',
      'Automatic weight normalization when totals differ from 100%',
    ],
    howToUse: [
      { step: 1, title: 'Enter Grades & Weights', description: 'Add your coursework categories with their percentage weights and scores.' },
      { step: 2, title: 'Inspect Weighted Grade', description: 'See your current grade percentage and corresponding letter grade.' },
      { step: 3, title: 'Calculate Final Target', description: 'Switch to Final Exam Target to see what you need on the final test.' },
    ],
    whyUse: [
      'Finals Week Planning: Prioritize study hours based on exact required test scores instead of guessing.',
    ],
    tips: [
      'Check your syllabus to find the exact percentage weight of each assessment category.',
    ],
    faq: [
      {
        question: 'How do I calculate what score I need on the final exam?',
        answer: 'Formula: Final Score = [Target Grade - (Current Grade × (100 - Final Weight)%)] / Final Weight%. Our tool computes this automatically.',
      },
      {
        question: 'What if my category weights do not add up to 100%?',
        answer: 'The calculator automatically normalizes your scores by dividing by the sum of completed weights.',
      },
      {
        question: 'What is considered an A letter grade?',
        answer: 'In standard US college grading, 93% or higher is an A (4.0), and 90%–92% is an A- (3.7).',
      },
      {
        question: 'Is my course data private?',
        answer: 'Yes, no student information or grades are ever transmitted to any database or server.',
      },
    ],
    relatedSlugs: ['cgpa-calculator', 'gpa-calculator', 'marks-percentage-calculator', 'percentage-calculator'],
  },

  // 54. FRACTION CALCULATOR
  {
    id: 'fraction-calculator',
    name: 'Fraction Calculator with Steps',
    slug: 'fraction-calculator',
    category: 'student',
    description: 'Add, subtract, multiply, and divide fractions with automated step-by-step reduction, mixed numbers, and decimals.',
    detailedDescription: 'Solve fraction math problems with ease. Compute addition, subtraction, multiplication, and division of fractions with complete step-by-step explanations, GCD reduction, and decimal conversions.',
    metaTitle: 'Free Fraction Calculator — Add, Subtract, Multiply & Divide Fractions',
    metaDescription: 'Calculate fractions online with step-by-step solutions. Simplifies to lowest terms, mixed fractions, and decimals. 100% free and private.',
    icon: 'Scale',
    badge: 'Math',
    features: [
      'Addition, subtraction, multiplication, and division of fractions',
      'Step-by-step explanation with common denominator steps',
      'Automatic reduction using Greatest Common Divisor (GCD)',
      'Mixed number and decimal equivalents',
    ],
    howToUse: [
      { step: 1, title: 'Enter Numerators & Denominators', description: 'Type the top and bottom values for both fractions.' },
      { step: 2, title: 'Choose Operator', description: 'Select + (Add), - (Subtract), × (Multiply), or ÷ (Divide).' },
      { step: 3, title: 'Read Solution', description: 'Inspect simplest fraction, mixed number, decimal value, and math steps.' },
    ],
    whyUse: [
      'Homework Assistance: Check your math homework and understand where reduction steps occur.',
      'Recipe & Woodworking Scaling: Quickly combine fractional measurements like 3/4 and 2/5.',
    ],
    tips: [
      'Denominators cannot be zero in mathematics; the calculator automatically guards against division by zero.',
    ],
    faq: [
      {
        question: 'How do you multiply two fractions?',
        answer: 'Multiply the numerators together and multiply the denominators together, then simplify by dividing both by their greatest common divisor.',
      },
      {
        question: 'How do you divide fractions?',
        answer: 'Multiply the first fraction by the reciprocal (flip) of the second fraction.',
      },
      {
        question: 'What is a mixed fraction?',
        answer: 'A mixed fraction expresses an improper fraction (where numerator > denominator) as a whole number plus a proper fraction, like 1 3/4 instead of 7/4.',
      },
      {
        question: 'Can I copy the solution steps?',
        answer: 'Yes, click "Copy Result" to paste the entire problem and simplified answer.',
      },
    ],
    relatedSlugs: ['ratio-calculator', 'scientific-calculator', 'percentage-calculator', 'average-calculator'],
  },

  // 55. RATIO CALCULATOR
  {
    id: 'ratio-calculator',
    name: 'Ratio & Proportion Calculator',
    slug: 'ratio-calculator',
    category: 'student',
    description: 'Solve proportions (A : B = C : D) for unknown variables or simplify ratios to lowest terms.',
    detailedDescription: 'Calculate ratios and solve proportions online. Determine missing variables with cross-multiplication or simplify aspect ratios (like 1920:1080 to 16:9) in seconds.',
    metaTitle: 'Free Ratio Calculator — Solve Proportions & Simplify Ratios Online',
    metaDescription: 'Solve for unknown values in proportions (A:B = C:D) and simplify ratios to lowest terms online. Free, instant, and private math tool.',
    icon: 'ArrowRightLeft',
    badge: 'Math',
    features: [
      'Solve for any variable (A, B, C, or D) using cross multiplication',
      'Ratio simplification to lowest whole terms',
      'Normalized decimal ratio representation (X : 1)',
      'Instant copy of solutions and step formulas',
    ],
    howToUse: [
      { step: 1, title: 'Select Unknown', description: 'Choose whether you are solving for A, B, C, or D.' },
      { step: 2, title: 'Input Known Values', description: 'Enter the three known values in the proportion formula.' },
      { step: 3, title: 'View Solved Ratio', description: 'The missing value is computed instantly with cross multiplication.' },
    ],
    whyUse: [
      'Scaling Graphics & Video: Maintain exact aspect ratios when resizing resolutions or assets.',
      'Recipe Scaling: Multiply ingredient proportions up or down accurately.',
    ],
    tips: [
      'Cross multiplication rule: If A/B = C/D, then A × D = B × C.',
    ],
    faq: [
      {
        question: 'What is the formula to solve a proportion?',
        answer: 'If solving for D: D = (B × C) / A. If solving for C: C = (A × D) / B.',
      },
      {
        question: 'How do I simplify a ratio like 1920:1080?',
        answer: 'Switch to the "Simplify Ratio" tab, enter 1920 and 1080, and the tool divides both by their GCD (120) to give 16:9.',
      },
      {
        question: 'Can ratios handle decimal numbers?',
        answer: 'Yes, proportions support floating point and decimal values.',
      },
      {
        question: 'Is this tool completely free?',
        answer: 'Yes, 100% free with no registration or limits.',
      },
    ],
    relatedSlugs: ['aspect-ratio-calculator', 'fraction-calculator', 'percentage-calculator', 'unit-converter'],
  },

  // 56. SCIENTIFIC CALCULATOR
  {
    id: 'scientific-calculator',
    name: 'Scientific Calculator',
    slug: 'scientific-calculator',
    category: 'student',
    description: 'Perform advanced mathematical operations with trigonometry, logarithms, powers, roots, and calculation history.',
    detailedDescription: 'Full-featured online scientific calculator. Calculate sin, cos, tan (in degrees or radians), logarithms (log, ln), exponents, square roots, factorials, and parentheses with a responsive keypad.',
    metaTitle: 'Free Scientific Calculator Online — Trig, Log, Exponents & Roots',
    metaDescription: 'Free online scientific calculator with trigonometric functions, logarithms, powers, factorials, and history. Responsive and 100% client-side.',
    icon: 'Calculator',
    isPopular: true,
    badge: 'Essential',
    features: [
      'Trigonometric functions (sin, cos, tan) with DEG/RAD switch',
      'Logarithms (log10 and natural ln)',
      'Powers (x², xʸ), square roots (√), and factorials (n!)',
      'Constants Pi (π) and Euler’s number (e)',
      'Calculation history and quick clipboard copy',
    ],
    howToUse: [
      { step: 1, title: 'Enter Equation', description: 'Use the interactive buttons or your keyboard to input math expressions.' },
      { step: 2, title: 'Press Equals (=)', description: 'Click = to evaluate the expression safely with high precision.' },
      { step: 3, title: 'Copy or View History', description: 'Copy the result or review recent calculations in the history log.' },
    ],
    whyUse: [
      'Fast Academic Calculations: Physics, engineering, chemistry, and calculus problem solving without carrying a physical calculator.',
    ],
    tips: [
      'Remember to toggle DEG or RAD depending on whether your angles are in degrees or radians.',
    ],
    faq: [
      {
        question: 'Does the calculator follow standard order of operations (PEMDAS)?',
        answer: 'Yes. Parentheses, exponents, multiplication, division, addition, and subtraction are evaluated strictly according to algebraic precedence.',
      },
      {
        question: 'How do I calculate sin or cos in degrees?',
        answer: 'Ensure the top "DEG" button is selected before evaluating trigonometric expressions.',
      },
      {
        question: 'What is the largest factorial supported?',
        answer: 'The calculator safely handles factorials up to 170! before reaching JavaScript floating-point infinity.',
      },
      {
        question: 'Does the calculator run offline?',
        answer: 'Yes! The calculator logic runs 100% inside your browser and works seamlessly even without an active internet connection once loaded.',
      },
    ],
    relatedSlugs: ['percentage-calculator', 'average-calculator', 'fraction-calculator', 'ratio-calculator'],
  },

  // 57. SENTENCE COUNTER
  {
    id: 'sentence-counter',
    name: 'Sentence Counter & Text Flow Analyzer',
    slug: 'sentence-counter',
    category: 'student',
    description: 'Count sentences, paragraphs, average sentence length, and check Flesch-Kincaid readability scores.',
    detailedDescription: 'Analyze your writing structure in real time. Count sentences, words, syllables, paragraphs, average words per sentence, and evaluate Flesch Reading Ease grade levels for essays and articles.',
    metaTitle: 'Free Sentence Counter — Count Sentences & Check Readability Online',
    metaDescription: 'Count sentences, words, and paragraphs online. Check average sentence length and Flesch reading ease score. Free, private, and instant.',
    icon: 'AlignLeft',
    badge: 'Writing',
    features: [
      'Accurate sentence splitting based on terminal punctuation (. ! ?)',
      'Live paragraph, word, character, and syllable counters',
      'Average words per sentence and characters per word metrics',
      'Flesch Reading Ease score and grade level assessment',
    ],
    howToUse: [
      { step: 1, title: 'Paste Your Text', description: 'Paste or type your writing into the editor text area.' },
      { step: 2, title: 'View Metrics', description: 'See sentence counts, paragraphs, and readability scores in real time.' },
      { step: 3, title: 'Copy Stats', description: 'Click Copy Stats to record your structural metrics for editorial review.' },
    ],
    whyUse: [
      'Improve Essay Readability: Keep average sentence lengths between 15 and 20 words for optimal academic clarity.',
      'SEO Content Optimization: Improve user engagement by avoiding overly dense sentence structures.',
    ],
    tips: [
      'Aim for a Flesch score of 60–70 for general web articles, and 50–60 for academic whitepapers.',
    ],
    faq: [
      {
        question: 'How are sentences detected in the text?',
        answer: 'The counter identifies sentence boundaries using punctuation marks (. ! ?) followed by whitespace or line breaks, while ignoring decimal numbers.',
      },
      {
        question: 'What is a good average sentence length?',
        answer: 'In clear modern prose, an average of 14 to 18 words per sentence creates engaging and readable rhythm.',
      },
      {
        question: 'What does the Flesch Reading Ease score mean?',
        answer: 'Scores from 90–100 indicate easy 5th-grade English; 60–70 is standard conversational English; below 50 indicates college-level or academic text.',
      },
      {
        question: 'Is my essay uploaded to any server or AI model?',
        answer: 'No. Toolora has no backend servers or AI models. Your text stays entirely inside your browser.',
      },
    ],
    relatedSlugs: ['word-counter', 'character-counter', 'reading-time-calculator', 'text-cleaner'],
  },

  // 58. NUMBER TO WORDS
  {
    id: 'number-to-words',
    name: 'Number to Words Converter',
    slug: 'number-to-words',
    category: 'student',
    description: 'Convert any numeric figure into English words, bank check currency format, and Indian lakhs/crores.',
    detailedDescription: 'Convert numbers into words for bank checks, financial receipts, legal contracts, and school assignments. Supports standard international words, currency formats (dollars & cents), and South Asian lakh/crore numbering.',
    metaTitle: 'Free Number to Words Converter — Convert Numbers to Words Online',
    metaDescription: 'Convert numbers to English words online. Generate check writing currency text and Indian numbering (lakhs & crores) with one-click copy.',
    icon: 'Hash',
    badge: 'Utility',
    features: [
      'Standard International English words conversion',
      'Bank check writing currency format (dollars and cents)',
      'Indian numbering system (Lakhs and Crores)',
      'Case formatting: Title Case, UPPERCASE, and lowercase',
    ],
    howToUse: [
      { step: 1, title: 'Type or Paste Number', description: 'Enter any number (e.g., 25400.50) into the input box.' },
      { step: 2, title: 'Choose Case', description: 'Select Title Case, UPPERCASE, or lowercase formatting.' },
      { step: 3, title: 'Copy Result', description: 'Click Copy next to your desired format for instant pasting.' },
    ],
    whyUse: [
      'Writing Bank Checks: Never make a spelling mistake when writing out amounts on personal or business checks.',
      'Invoices & Contracts: Formal agreements often require spelling out financial totals in full words.',
    ],
    tips: [
      'For check writing, standard practice is: "Twenty-five thousand four hundred dollars and 50/100 cents".',
    ],
    faq: [
      {
        question: 'Can this convert decimal amounts like cents?',
        answer: 'Yes! Decimal parts are automatically converted into fractional cents or spoken decimal points.',
      },
      {
        question: 'What is the largest number I can convert?',
        answer: 'The tool supports numbers well into the trillions and quadrillions with high precision.',
      },
      {
        question: 'What is the Indian numbering format?',
        answer: 'Instead of grouping by millions and billions, the Indian system groups by hundreds, thousands, lakhs (100,000), and crores (10,000,000).',
      },
      {
        question: 'Is this tool free?',
        answer: 'Yes, 100% free with unlimited conversions.',
      },
    ],
    relatedSlugs: ['percentage-calculator', 'scientific-calculator', 'unit-converter'],
  },

  // 59. UUID GENERATOR
  {
    id: 'uuid-generator',
    name: 'UUID / GUID Generator',
    slug: 'uuid-generator',
    category: 'utility',
    description: 'Generate cryptographically secure RFC 4122 Version 4 UUIDs (GUIDs) in bulk with custom formatting.',
    detailedDescription: 'Online RFC 4122 v4 UUID generator for software engineers, database administrators, and developers. Generate single or bulk unique identifiers using secure browser CSPRNG with uppercase or hyphen toggles.',
    metaTitle: 'Free UUID Generator — Generate RFC 4122 v4 UUIDs / GUIDs Online',
    metaDescription: 'Generate secure Version 4 UUIDs (GUIDs) in bulk online. RFC 4122 compliant, uppercase toggle, hyphen formatting, and instant copy.',
    icon: 'Key',
    isPopular: true,
    badge: 'Developer',
    features: [
      'RFC 4122 Version 4 compliant universally unique identifiers',
      'Cryptographically secure pseudo-random number generator (crypto.getRandomValues)',
      'Generate up to 50 UUIDs in one click',
      'Toggle uppercase/lowercase and include/exclude hyphens',
    ],
    howToUse: [
      { step: 1, title: 'Configure Options', description: 'Choose your desired quantity, letter case, and hyphen format.' },
      { step: 2, title: 'Generate UUIDs', description: 'Click Generate New to create fresh cryptographically secure UUIDs.' },
      { step: 3, title: 'Copy Identifiers', description: 'Copy individual UUIDs or click "Copy All" to paste the entire batch.' },
    ],
    whyUse: [
      'Database Primary Keys: Create collision-free IDs for distributed databases like PostgreSQL, MongoDB, and Firebase.',
      'API Testing: Quickly mock transaction IDs, user IDs, and trace headers.',
    ],
    tips: [
      'Standard UUID v4 format is 8-4-4-4-12 hexadecimal digits (e.g. 123e4567-e89b-42d3-a456-426614174000).',
    ],
    faq: [
      {
        question: 'Are these UUIDs cryptographically secure?',
        answer: 'Yes. They are generated using the browser Web Cryptography API (crypto.getRandomValues / crypto.randomUUID), providing true cryptographic randomness.',
      },
      {
        question: 'What is the probability of a UUID collision?',
        answer: 'The chance of generating duplicate UUIDs is roughly 1 in 2.71 quintillion, which is statistically negligible for all practical purposes.',
      },
      {
        question: 'What is the difference between a UUID and a GUID?',
        answer: 'GUID (Globally Unique Identifier) is Microsoft’s terminology for a standard RFC 4122 UUID (Universally Unique Identifier). They represent the exact same 128-bit structure.',
      },
      {
        question: 'Can I generate UUIDs without hyphens?',
        answer: 'Yes! Uncheck "Include Hyphens" to generate compact 32-character hexadecimal strings.',
      },
    ],
    relatedSlugs: ['random-string-generator', 'password-generator', 'base64-encoder-decoder'],
  },

  // 60. TIMESTAMP CONVERTER
  {
    id: 'timestamp-converter',
    name: 'Unix Timestamp Converter',
    slug: 'timestamp-converter',
    category: 'utility',
    description: 'Convert Unix epoch timestamps to human dates (UTC & local), and convert dates back into timestamps.',
    detailedDescription: 'Two-way Unix timestamp converter with live ticking epoch clock. Convert seconds and milliseconds into UTC, ISO 8601, and local date formats, or pick any calendar date to find its epoch timestamp.',
    metaTitle: 'Free Unix Timestamp Converter — Epoch to Human Date Online',
    metaDescription: 'Convert Unix epoch timestamps (seconds & milliseconds) to human readable UTC and local dates online. Includes live ticking clock and date-to-epoch converter.',
    icon: 'Clock',
    isPopular: true,
    badge: 'Developer',
    features: [
      'Live ticking Unix epoch clock with one-click copy',
      'Supports seconds (10 digits) and milliseconds (13 digits)',
      'Outputs UTC, local browser time, ISO 8601, and relative time',
      'Date & time picker to generate Unix timestamps',
    ],
    howToUse: [
      { step: 1, title: 'Enter Timestamp or Date', description: 'Paste a timestamp into the left field or pick a date on the right.' },
      { step: 2, title: 'Inspect Formats', description: 'View UTC, local time zone, and ISO 8601 equivalents.' },
      { step: 3, title: 'Copy Values', description: 'Copy converted seconds or formatted date strings with one click.' },
    ],
    whyUse: [
      'Debugging Server Logs: Understand when an error occurred from an epoch timestamp logged in AWS CloudWatch or Docker.',
      'API Development: Verify JWT token expiration timestamps and database created_at fields.',
    ],
    tips: [
      'If your timestamp has 13 digits (like 1700000000000), it is in milliseconds. If it has 10 digits, it is in seconds.',
    ],
    faq: [
      {
        question: 'What is Unix Epoch time?',
        answer: 'Unix epoch time is the number of seconds that have elapsed since midnight Coordinated Universal Time (UTC) on January 1, 1970, not counting leap seconds.',
      },
      {
        question: 'What is the Year 2038 problem (Y2038)?',
        answer: 'Older 32-bit systems store timestamps as signed 32-bit integers, which overflow on January 19, 2038. Modern 64-bit systems are immune for billions of years.',
      },
      {
        question: 'How do I get current timestamp in JavaScript?',
        answer: 'Math.floor(Date.now() / 1000) returns current seconds, while Date.now() returns milliseconds.',
      },
      {
        question: 'Does this converter account for time zones?',
        answer: 'Yes, it clearly distinguishes between universal Coordinated Universal Time (UTC) and your device’s local time zone.',
      },
    ],
    relatedSlugs: ['date-difference-calculator', 'age-calculator', 'uuid-generator'],
  },

  // 61. TEXT CLEANER
  {
    id: 'text-cleaner',
    name: 'Text Cleaner & Whitespace Remover',
    slug: 'text-cleaner',
    category: 'utility',
    description: 'Remove extra spaces, trailing spaces, tabs, duplicate blank lines, and strip HTML tags.',
    detailedDescription: 'Clean and format messy text strings. Eliminate duplicate spaces, trim whitespace from line start and ends, collapse multiple blank lines, strip HTML code, and convert paragraphs to single-line text.',
    metaTitle: 'Free Text Cleaner Online — Remove Extra Spaces & Clean Formatting',
    metaDescription: 'Clean text formatting online. Remove duplicate spaces, trim line whitespace, strip HTML tags, and eliminate empty lines. Fast and private text tool.',
    icon: 'Sparkles',
    badge: 'Utility',
    features: [
      'Remove duplicate consecutive spaces and tabs',
      'Trim leading and trailing spaces on every line',
      'Remove blank or empty lines',
      'Strip HTML and XML tags from rich text',
      'Join lines into a clean single line',
      'Strip non-ASCII characters and emojis',
    ],
    howToUse: [
      { step: 1, title: 'Paste Messy Text', description: 'Paste your unformatted copy into the original text editor.' },
      { step: 2, title: 'Toggle Rules', description: 'Check or uncheck the cleaning options matching your needs.' },
      { step: 3, title: 'Copy Cleaned Copy', description: 'Copy the instantly cleaned text to your clipboard.' },
    ],
    whyUse: [
      'Preparing Copy for Publishing: Fix copied text from PDFs that have unwanted line breaks and erratic indentation.',
      'Data Cleaning: Normalize raw CSV or text inputs before importing into spreadsheets.',
    ],
    tips: [
      'Enable "Convert into Single Line" if you copied text from a PDF with hard wrap line breaks.',
    ],
    faq: [
      {
        question: 'Will this remove HTML tags like <p> and <br>?',
        answer: 'Yes! Check "Strip HTML Tags" to remove all tags while keeping the plain inner text.',
      },
      {
        question: 'Can this remove invisible spaces like non-breaking spaces (&nbsp;)?',
        answer: 'Yes, standard whitespace normalization collapses consecutive spaces and irregular tab characters.',
      },
      {
        question: 'Does Toolora retain my text?',
        answer: 'No. All string processing executes on your device. Nothing is saved or sent to any server.',
      },
      {
        question: 'Is there a limit on text length?',
        answer: 'You can process thousands of lines without lag since the tool uses native browser regex parsing.',
      },
    ],
    relatedSlugs: ['text-case-converter', 'remove-duplicate-lines', 'word-counter', 'sentence-counter'],
  },

  // 62. RANDOM STRING GENERATOR
  {
    id: 'random-string-generator',
    name: 'Random String & Token Generator',
    slug: 'random-string-generator',
    category: 'utility',
    description: 'Generate secure random alphanumeric strings, API tokens, session IDs, and secret keys.',
    detailedDescription: 'Generate cryptographically random strings for developers and IT professionals. Customize string length from 4 to 128 characters, configure character sets (letters, numbers, symbols), and generate in bulk.',
    metaTitle: 'Free Random String Generator — Generate Secure Alphanumeric Tokens',
    metaDescription: 'Generate random alphanumeric strings and secure tokens online. Choose length, character sets (A-Z, 0-9, symbols), and quantity. 100% client-side.',
    icon: 'Key',
    badge: 'Developer',
    features: [
      'Cryptographically secure randomness using crypto.getRandomValues',
      'Custom length slider from 4 to 128 characters',
      'Toggle uppercase, lowercase, numbers, and special symbols',
      'Bulk generation with one-click copy all',
    ],
    howToUse: [
      { step: 1, title: 'Choose Length & Count', description: 'Adjust sliders for desired string length and number of outputs.' },
      { step: 2, title: 'Select Characters', description: 'Pick which character types to include (e.g., A-Z, 0-9).' },
      { step: 3, title: 'Copy Generated Strings', description: 'Copy single tokens or click "Copy All" to save the batch.' },
    ],
    whyUse: [
      'Secret Key Generation: Create random encryption salts, API tokens, and temporary verification codes.',
    ],
    tips: [
      'For cryptographic security, use strings of at least 32 characters containing mixed case and numbers.',
    ],
    faq: [
      {
        question: 'How random are these strings?',
        answer: 'They use the Web Cryptography API’s CSPRNG (Cryptographically Secure Pseudo-Random Number Generator), suitable for high-security secrets.',
      },
      {
        question: 'Can I generate pure alphanumeric strings without symbols?',
        answer: 'Yes! Simply uncheck the "Symbols" checkbox to generate clean letters and numbers only.',
      },
      {
        question: 'Are generated tokens logged or saved?',
        answer: 'Never. No records are kept; tokens exist only in your browser memory until closed.',
      },
      {
        question: 'Can I generate 64-character hex strings?',
        answer: 'Yes! Use length 64 with numbers and lowercase letters or custom hex charset.',
      },
    ],
    relatedSlugs: ['password-generator', 'uuid-generator', 'base64-encoder-decoder'],
  },

  // 63. IMAGE DPI CHECKER
  {
    id: 'image-dpi-checker',
    name: 'Image DPI & Print Dimension Checker',
    slug: 'image-dpi-checker',
    category: 'image',
    description: 'Inspect exact pixel dimensions, megapixels, and calculated physical print sizes at 300, 150, and 72 DPI.',
    detailedDescription: 'Find out if your photo is high enough resolution to print. Calculate physical print sizes in inches and centimeters at 300 DPI (photo lab), 150 DPI (posters), and 72 DPI (web), and check total sensor megapixels.',
    metaTitle: 'Free Image DPI Checker — Check Resolution & Print Size at 300 DPI',
    metaDescription: 'Inspect image pixel dimensions, megapixels, and print size at 300, 150, and 72 DPI online. Free client-side photo checker without file uploads.',
    icon: 'Scaling',
    isPopular: true,
    badge: 'Photo',
    features: [
      'Instant resolution and megapixel breakdown',
      'Calculates physical print dimensions at 300, 150, and 72 DPI in inches and cm',
      'Aspect ratio determination and file size check',
      'In-browser analysis without server file uploads',
    ],
    howToUse: [
      { step: 1, title: 'Upload Image', description: 'Drag and drop any JPG, PNG, or WebP photo into the dropzone.' },
      { step: 2, title: 'Inspect Print Sizes', description: 'Review maximum print sizes at 300 DPI for crisp photographic results.' },
      { step: 3, title: 'Plan Your Print', description: 'Compare your photo dimensions against standard frames or canvas sizes.' },
    ],
    whyUse: [
      'Avoid Blurry Prints: Check whether a photo has sufficient pixels before ordering expensive canvas or photo album prints.',
      'Graphic Design Verification: Verify banner dimensions before sending files to print shops.',
    ],
    tips: [
      'For crisp, professional photo prints, always ensure resolution provides at least 300 DPI for your target print size.',
    ],
    faq: [
      {
        question: 'What is the formula for calculating print size from pixel dimensions?',
        answer: 'Print Width (inches) = Pixel Width ÷ DPI. For example, a 3000 × 2400 pixel image printed at 300 DPI yields a 10" × 8" photo.',
      },
      {
        question: 'What is the minimum DPI for high-quality printing?',
        answer: '300 DPI is the standard resolution used by professional photo labs and magazines. 150 DPI is acceptable for larger posters viewed from a distance.',
      },
      {
        question: 'Does this tool upload my high-resolution photos to a server?',
        answer: 'No. The image is loaded solely into your browser’s HTML Image object in local memory.',
      },
      {
        question: 'What image formats can I check?',
        answer: 'You can check JPG, PNG, WebP, GIF, and SVG images.',
      },
    ],
    relatedSlugs: ['image-resizer', 'aspect-ratio-calculator', 'passport-photo-resizer', 'photo-size-reducer'],
  },
];

