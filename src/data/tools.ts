import { ToolItem, CategoryInfo } from '../types';
import { ADDITIONAL_TOOLS } from './additionalTools';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'image',
    slug: 'image-tools',
    title: 'Image Tools',
    description: 'Compress, convert, resize, crop, rotate, and format photos directly in your browser without uploading to external servers.',
    icon: 'ImageIcon',
    count: 22,
  },
  {
    id: 'pdf',
    slug: 'pdf-tools',
    title: 'PDF Tools',
    description: 'Merge, split, rotate, convert, and inspect PDF files with high-speed client-side processing.',
    icon: 'FileText',
    count: 7,
  },
  {
    id: 'student',
    slug: 'student-tools',
    title: 'Student & Academic Tools',
    description: 'Calculators for CGPA, grades, fractions, ratios, scientific computations, reading durations, and sentence analysis.',
    icon: 'GraduationCapIcon',
    count: 15,
  },
  {
    id: 'utility',
    slug: 'utility-tools',
    title: 'Daily & Text Utilities',
    description: 'UUID generators, timestamp converters, text cleaners, password creators, Base64/URL encoders, and JSON tools.',
    icon: 'Wrench',
    count: 11,
  },
  {
    id: 'student-utility',
    slug: 'student-utility',
    title: 'Student & Utility Tools',
    description: 'Calculators, text analyzers, unit converters, and study timers designed to make daily academic and productivity tasks effortless.',
    icon: 'GraduationCapIcon',
    count: 34,
  },
];

export const TOOLS: ToolItem[] = [
  // 1. IMAGE COMPRESSOR
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    slug: 'image-compressor',
    category: 'image',
    description: 'Reduce image file size with adjustable compression quality while preserving visual fidelity.',
    detailedDescription: 'Compress JPG, PNG, and WebP images directly in your browser. Real-time before-and-after comparison with zero server uploads.',
    metaTitle: 'Free Image Compressor — Compress JPG, PNG & WebP Online',
    metaDescription: 'Reduce image file sizes instantly in your browser with adjustable quality. Private, fast, and 100% free with no file uploads or sign-up.',
    icon: 'Minimize2',
    isFeatured: true,
    isPopular: true,
    badge: 'Popular',
    features: [
      'Client-side instant compression with HTML5 Canvas',
      'Configurable quality slider from 1% to 100%',
      'Live before-and-after file size preview',
      'Supports JPG, PNG, and WebP formats',
    ],
    howToUse: [
      { step: 1, title: 'Upload Your Image', description: 'Drag and drop any JPG, PNG, or WebP photo into the dropzone or click to browse files.' },
      { step: 2, title: 'Adjust Quality', description: 'Use the slider to balance visual clarity against file size. A 75% to 80% setting is optimal for most web uses.' },
      { step: 3, title: 'Compare & Download', description: 'Inspect the calculated size reduction percentage and click Download to save your compressed image instantly.' },
    ],
    whyUse: [
      '100% Private & Secure: Your photos never leave your device or travel across any network.',
      'Lightning Fast: Instant processing powered by your device hardware, avoiding network lag.',
      'Web-Ready Optimization: Drastically speed up website loading times and email attachments without visible quality loss.',
      'Completely Free: No daily quotas, no watermarks, and no registration required.',
    ],
    tips: [
      'For web publishing, aim for 75% quality to reduce file size by 60%–80% without noticeable artifacts.',
      'If compressing a PNG with solid colors or text, try converting to WebP first for even smaller files.',
      'Check the dimensions: if your original photo is 4000px wide, resizing it first can save even more space.',
    ],
    faq: [
      {
        question: 'Are my photos uploaded to any server?',
        answer: 'No. All compression is executed entirely inside your web browser via the HTML5 Canvas API. Your files remain on your device.',
      },
      {
        question: 'What is the optimal compression level?',
        answer: 'For most web, email, and social uses, setting the quality slider between 70% and 80% achieves a 50% to 80% reduction in file size with virtually no visible degradation.',
      },
      {
        question: 'Can I compress PNG and WebP files?',
        answer: 'Yes, this tool seamlessly handles JPEG, PNG, and WebP images.',
      },
      {
        question: 'Is there a limit on how many images I can compress?',
        answer: 'There are no artificial usage limits. Because processing runs locally on your machine, you can compress as many images as you need.',
      },
    ],
    relatedSlugs: ['image-resizer', 'jpg-to-webp', 'crop-image', 'image-to-pdf'],
  },

  // 2. IMAGE RESIZER
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    slug: 'image-resizer',
    category: 'image',
    description: 'Scale photos to exact pixel dimensions or percentages with aspect ratio locking.',
    detailedDescription: 'Resize images by width, height, or scaling percentage. Keep proportions locked or enter custom dimensions for exact web or print requirements.',
    metaTitle: 'Free Image Resizer — Resize Photos by Pixels or Percentage',
    metaDescription: 'Scale and resize images by pixel dimensions or percentages with aspect ratio lock. Fast client-side tool with instant download and zero uploads.',
    icon: 'Scaling',
    isFeatured: true,
    isPopular: true,
    badge: 'Essential',
    features: [
      'Resize by custom pixel width and height',
      'Convenient preset scale shortcuts (25%, 50%, 75%, 200%)',
      'Aspect ratio constraint lock to prevent distortion',
      'High-quality bi-cubic interpolation canvas rendering',
    ],
    howToUse: [
      { step: 1, title: 'Choose Photo', description: 'Upload the image you want to resize by dropping it onto the workspace.' },
      { step: 2, title: 'Set Dimensions', description: 'Enter your desired width or height, or pick a percentage scaling preset like 50%.' },
      { step: 3, title: 'Lock Ratio & Export', description: 'Keep the aspect ratio locked to prevent stretching, then click Download Resized Image.' },
    ],
    whyUse: [
      'Exact Fit: Meet strict dimension requirements for application portals, CMS uploads, and social platforms.',
      'Zero Distortion: Proportional auto-scaling ensures photos never appear squished or stretched.',
      'Device Privacy: Local memory processing guarantees sensitive personal photos are never transmitted.',
      'Saves Bandwidth: Downscaling massive camera photos dramatically cuts storage and loading time.',
    ],
    tips: [
      'Keep "Lock Aspect Ratio" enabled unless you specifically need to stretch an image to non-proportional dimensions.',
      'When downscaling for email or chat, 1200px to 1600px width is usually sufficient for crystal-clear viewing.',
      'If you need specific social media header dimensions, check out our Social Media Resizer for pre-configured templates.',
    ],
    faq: [
      {
        question: 'How do I prevent my photo from getting stretched?',
        answer: 'Keep the "Lock Aspect Ratio" toggle checked. Changing the width will automatically update the height proportionally, and vice-versa.',
      },
      {
        question: 'Does downscaling reduce the file size?',
        answer: 'Yes, reducing the pixel resolution of an image substantially lowers the total number of pixels, resulting in much smaller file sizes.',
      },
      {
        question: 'Can I enlarge a small photo?',
        answer: 'You can increase dimensions, but keep in mind that enlarging a low-resolution image cannot invent new pixel details and may look softer.',
      },
    ],
    relatedSlugs: ['image-compressor', 'crop-image', 'social-media-resizer', 'rotate-flip-image'],
  },

  // 3. JPG TO PNG
  {
    id: 'jpg-to-png',
    name: 'JPG to PNG',
    slug: 'jpg-to-png',
    category: 'image',
    description: 'Convert JPG images to lossless PNG format with transparent canvas readiness.',
    detailedDescription: 'Convert any JPG/JPEG graphic into high-definition PNG format. Ideal when you need lossless rendering, crisp text, or preparing images for editing software.',
    metaTitle: 'Free JPG to PNG Converter — Convert JPEG to PNG Online',
    metaDescription: 'Convert JPG photos to lossless 24-bit PNG format in your browser. Fast, private, zero server uploads, and completely free.',
    icon: 'FileImage',
    isPopular: true,
    features: [
      'Lossless 24-bit PNG export',
      'Client-side canvas conversion',
      'No quality loss from re-compression',
      'Preserves original color fidelity',
    ],
    howToUse: [
      { step: 1, title: 'Select JPG File', description: 'Upload your JPEG image using the file selector or drag and drop.' },
      { step: 2, title: 'Inspect Preview', description: 'Review the original image dimensions and preview rendering.' },
      { step: 3, title: 'Export PNG', description: 'Click Convert to PNG to immediately generate and download the lossless PNG file.' },
    ],
    whyUse: [
      'Lossless Archiving: PNG prevents generation loss during repeated saves in photo editors.',
      'Crisp Text & Icons: Ideal format for screenshots, diagrams, and digital graphics with sharp boundaries.',
      'Universal Editing Support: Compatible with Figma, Photoshop, Canva, and all design workflows.',
      'Completely Private: Files stay locally in your browser memory throughout the entire conversion.',
    ],
    tips: [
      'Converting from JPG to PNG does not automatically make the background transparent, but it prepares the file for alpha editing.',
      'If file size is a priority, consider WebP instead, which offers similar benefits with smaller payloads.',
    ],
    faq: [
      {
        question: 'Does converting JPG to PNG improve existing image quality?',
        answer: 'Converting will not restore compression artifacts already present in a low-quality JPG, but it prevents any further quality degradation during subsequent saves and edits.',
      },
      {
        question: 'Why is the resulting PNG file larger than the JPG?',
        answer: 'PNG uses lossless compression to preserve every pixel perfectly, whereas JPG uses lossy compression that discards subtle color variations to keep files small.',
      },
    ],
    relatedSlugs: ['png-to-jpg', 'jpg-to-webp', 'image-compressor'],
  },

  // 4. PNG TO JPG
  {
    id: 'png-to-jpg',
    name: 'PNG to JPG',
    slug: 'png-to-jpg',
    category: 'image',
    description: 'Convert PNG graphics to lightweight JPGs with a customizable background color.',
    detailedDescription: 'Turn heavy PNG graphics into lightweight JPG images. Choose background fill color for transparent areas and adjust compression quality.',
    metaTitle: 'Free PNG to JPG Converter — Convert PNG to JPEG Online',
    metaDescription: 'Convert PNG images to lightweight JPG format with custom background fill and adjustable compression. 100% client-side with no file uploads.',
    icon: 'ArrowRightLeft',
    isPopular: true,
    features: [
      'Custom background color selector for transparency fill',
      'Adjustable JPEG output quality slider',
      'Drastically reduces graphic file sizes',
      'Instant one-click browser download',
    ],
    howToUse: [
      { step: 1, title: 'Upload PNG', description: 'Select or drag your PNG image into the converter.' },
      { step: 2, title: 'Choose Background Fill', description: 'If your PNG has transparent areas, select a solid background color (default is clean white).' },
      { step: 3, title: 'Convert & Save', description: 'Set your preferred JPEG quality and download the lightweight JPG file.' },
    ],
    whyUse: [
      'Huge File Savings: Photographs accidentally saved as PNG can often be reduced by 70%–90% as JPG.',
      'Website Compatibility: Standard format supported by every email client, printer, and legacy system.',
      'Clean Background Handling: Prevents transparent areas from turning into black boxes on older viewers.',
    ],
    tips: [
      'Use a white background fill for documents and receipts with transparent areas.',
      'Set quality to 85% for an ideal balance of sharp detail and compact file size.',
    ],
    faq: [
      {
        question: 'What happens to transparent backgrounds in PNG?',
        answer: 'Since JPG does not support transparency, transparent areas are filled with your chosen solid background color (white by default).',
      },
      {
        question: 'Why convert PNG to JPG?',
        answer: 'Photographs saved as PNG can be 5x to 10x larger than necessary. Converting them to JPG significantly speeds up page loading and saves storage.',
      },
    ],
    relatedSlugs: ['jpg-to-png', 'png-to-webp', 'image-compressor'],
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
    metaDescription: 'Convert JPG to WebP online for 25%–35% smaller files and faster website speeds. Client-side, free, and completely private.',
    icon: 'Zap',
    isFeatured: true,
    badge: 'Next-Gen',
    features: [
      'Next-generation WebP compression format',
      '25% to 35% smaller file sizes than standard JPG',
      'Supported by all modern desktop and mobile browsers',
      'Adjustable quality compression controls',
    ],
    howToUse: [
      { step: 1, title: 'Select JPG', description: 'Upload your JPEG photo into the workspace.' },
      { step: 2, title: 'Configure Quality', description: 'Select your preferred WebP compression quality.' },
      { step: 3, title: 'Download WebP', description: 'Click Convert and immediately download the lightweight WebP file.' },
    ],
    whyUse: [
      'Boost Google PageSpeed: Modern search engines favor WebP images for faster Core Web Vitals.',
      'Bandwidth Savings: Delivers the same visual fidelity while cutting user data usage by up to a third.',
      'Broad Support: Supported natively by Chrome, Safari, Firefox, Edge, iOS, and Android.',
    ],
    tips: [
      'Replacing JPG with WebP on blogs and e-commerce stores is one of the fastest ways to improve page speed scores.',
      'A quality setting of 80% in WebP often looks identical to a 90% JPG while using half the bytes.',
    ],
    faq: [
      {
        question: 'What is WebP?',
        answer: 'WebP is a modern image format developed by Google that provides superior lossless and lossy compression for web images.',
      },
      {
        question: 'Do all modern browsers support WebP?',
        answer: 'Yes! Chrome, Safari, Firefox, Edge, and all modern mobile operating systems have full native support for WebP.',
      },
    ],
    relatedSlugs: ['webp-to-jpg', 'png-to-webp', 'image-compressor'],
  },

  // 6. PNG TO WEBP
  {
    id: 'png-to-webp',
    name: 'PNG to WebP',
    slug: 'png-to-webp',
    category: 'image',
    description: 'Convert PNG images to WebP while fully preserving transparent backgrounds.',
    detailedDescription: 'Convert PNG illustrations, icons, and logos into lightweight WebP images while maintaining full alpha-channel transparency at a fraction of the file size.',
    metaTitle: 'Free PNG to WebP Converter — Transparent WebP Online',
    metaDescription: 'Convert PNG to WebP while keeping full transparent backgrounds. Drastically reduce web graphic file sizes client-side without server uploads.',
    icon: 'Layers',
    features: [
      'Full preservation of transparent alpha channels',
      'Up to 70% smaller file size than heavy PNGs',
      'Ideal for web developers and UI designers',
      'Instant browser-based processing',
    ],
    howToUse: [
      { step: 1, title: 'Upload Transparent PNG', description: 'Drag and drop your PNG logo, icon, or illustration.' },
      { step: 2, title: 'Set Quality', description: 'Choose your desired compression quality setting.' },
      { step: 3, title: 'Save WebP', description: 'Download your lightweight WebP file with full transparency intact.' },
    ],
    whyUse: [
      'Transparency Without Bloat: Enjoy transparency benefits without the massive file size penalty of PNG.',
      'Faster UI Assets: Dramatically speeds up website headers, hero illustrations, and transparent product photos.',
    ],
    tips: [
      'WebP is ideal for logos with transparent backgrounds on landing pages.',
    ],
    faq: [
      {
        question: 'Will my transparent background remain transparent?',
        answer: 'Yes! WebP fully supports 8-bit alpha transparency with significantly smaller file sizes than standard PNG.',
      },
    ],
    relatedSlugs: ['webp-to-png', 'jpg-to-webp', 'png-to-jpg'],
  },

  // 7. WEBP TO JPG
  {
    id: 'webp-to-jpg',
    name: 'WebP to JPG',
    slug: 'webp-to-jpg',
    category: 'image',
    description: 'Convert downloaded WebP pictures into universally compatible JPG files.',
    detailedDescription: 'Encountering WebP files that older software, legacy printers, or email clients cannot open? Convert them to universal JPG format in a single second.',
    metaTitle: 'Free WebP to JPG Converter — Convert WebP to JPEG Online',
    metaDescription: 'Convert WebP images to universal JPG format for compatibility with older software, printers, and photo editors. Fast, private, and client-side.',
    icon: 'Repeat',
    features: [
      'Universal compatibility with all legacy software and printers',
      'Solid background fill for transparency',
      'Adjustable quality output',
      'Zero server upload requirement',
    ],
    howToUse: [
      { step: 1, title: 'Select WebP', description: 'Upload the WebP image you want to convert.' },
      { step: 2, title: 'Review Settings', description: 'Choose your background color and output quality.' },
      { step: 3, title: 'Download JPG', description: 'Click Convert to save your universally compatible JPEG file.' },
    ],
    whyUse: [
      'Universal Compatibility: Guaranteed to open in legacy photo viewers, office software, and older operating systems.',
      'Easy Printing: Standard photo print kiosks and home printers universally accept JPG files.',
    ],
    tips: [
      'If you need to upload a photo to a government or school portal that rejects WebP, converting to JPG solves the issue immediately.',
    ],
    faq: [
      {
        question: 'Why do I need to convert WebP to JPG?',
        answer: 'Many legacy desktop software suites, older operating systems, and some upload portals do not yet accept WebP. Converting to JPG guarantees total compatibility.',
      },
    ],
    relatedSlugs: ['webp-to-png', 'jpg-to-webp', 'jpg-to-png'],
  },

  // 8. WEBP TO PNG
  {
    id: 'webp-to-png',
    name: 'WebP to PNG',
    slug: 'webp-to-png',
    category: 'image',
    description: 'Convert WebP images to high-resolution PNG format with alpha transparency.',
    detailedDescription: 'Turn WebP files into crisp PNG images. Perfect for graphic designers wanting to import web assets into Photoshop, Figma, Illustrator, or video editors.',
    metaTitle: 'Free WebP to PNG Converter — Convert WebP to PNG Online',
    metaDescription: 'Convert WebP graphics to lossless PNG format with transparency preservation. Free, instant client-side conversion with zero server uploads.',
    icon: 'RefreshCw',
    features: [
      'Extracts transparent layers into PNG',
      'Lossless pixel extraction',
      'Compatible with all creative software suites',
    ],
    howToUse: [
      { step: 1, title: 'Upload WebP', description: 'Select the WebP file you want to convert.' },
      { step: 2, title: 'Convert', description: 'Click Convert to PNG to render the lossless image.' },
      { step: 3, title: 'Download', description: 'Save your PNG file directly to your device.' },
    ],
    whyUse: [
      'Design Software Readiness: Seamlessly import assets into creative software that does not support WebP.',
      'Preserves Transparency: Alpha channels in WebP are accurately transferred to PNG.',
    ],
    tips: [
      'Ideal for converting web icons into PNG for presentation decks and print materials.',
    ],
    faq: [
      {
        question: 'Is any quality lost during conversion?',
        answer: 'No. The conversion from WebP to PNG decodes the raw pixels faithfully and saves them into the lossless PNG container.',
      },
    ],
    relatedSlugs: ['webp-to-jpg', 'png-to-webp', 'jpg-to-png'],
  },

  // 9. IMAGE TO PDF
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    slug: 'image-to-pdf',
    category: 'image',
    description: 'Combine one or multiple images into a clean, downloadable PDF document.',
    detailedDescription: 'Turn photos, scans, receipts, or documents into standard PDF pages. Reorder images, choose page orientation (portrait/landscape), and export immediately.',
    metaTitle: 'Free Image to PDF Converter — Combine Photos into PDF',
    metaDescription: 'Convert JPG, PNG, and WebP images into a multi-page PDF document online. Set orientation, margins, and reorder pages client-side with 100% privacy.',
    icon: 'FileText',
    isFeatured: true,
    isPopular: true,
    badge: 'Popular',
    features: [
      'Combine multiple photos into a single PDF document',
      'Choose between A4 and US Letter page dimensions',
      'Select Portrait or Landscape orientation',
      'Configurable margins with automatic aspect ratio scaling',
    ],
    howToUse: [
      { step: 1, title: 'Add Images', description: 'Upload one or multiple photos, scans, or receipts.' },
      { step: 2, title: 'Reorder & Configure', description: 'Use the up and down arrows to arrange pages. Select page size, orientation, and margins.' },
      { step: 3, title: 'Generate PDF', description: 'Click Generate PDF to immediately compile and download your document.' },
    ],
    whyUse: [
      'Document Submission Ready: Perfect for sending multi-page receipts, invoices, assignments, or IDs in one clean PDF.',
      'Total Privacy: Sensitive IDs and financial scans are compiled strictly in your browser memory and never uploaded.',
      'Zero Watermarks: Clean, professional PDF documents without branding or limitations.',
    ],
    tips: [
      'For receipts and forms, use A4 Portrait with 10mm margins for a standard printed look.',
      'For landscape presentations or artwork, switch the layout to Landscape.',
    ],
    faq: [
      {
        question: 'Can I combine multiple images into a single PDF?',
        answer: 'Yes! You can upload multiple images, reorder them as desired, and compile them into a unified multi-page PDF document.',
      },
      {
        question: 'Are my confidential documents uploaded to a server?',
        answer: 'No. The PDF is constructed purely client-side using JavaScript in your browser memory. Your documents never touch external servers.',
      },
    ],
    relatedSlugs: ['image-compressor', 'image-resizer', 'crop-image'],
  },

  // 10. CROP IMAGE
  {
    id: 'crop-image',
    name: 'Crop Image',
    slug: 'crop-image',
    category: 'image',
    description: 'Trim photos with custom bounding boxes or popular aspect ratios like 1:1, 16:9, and 4:3.',
    detailedDescription: 'Crop unwanted areas from photos. Choose from standard aspect ratio presets (Square, 16:9, 4:3) or use freeform cropping with intuitive draggable handles.',
    metaTitle: 'Free Image Cropper — Crop Photos Online with Aspect Ratios',
    metaDescription: 'Crop images online with freeform or aspect ratio presets (1:1, 16:9, 4:3). Private, fast, client-side photo trimmer with instant download.',
    icon: 'Crop',
    features: [
      'Pre-configured aspect ratios (Freeform, 1:1 Square, 16:9 Widescreen, 4:3 Standard)',
      'Real-time crop rectangle dimensions indicator',
      'Pixel-perfect canvas export',
      'Zero server upload requirement',
    ],
    howToUse: [
      { step: 1, title: 'Upload Image', description: 'Drop your photo into the workspace to view the cropping canvas.' },
      { step: 2, title: 'Select Aspect Ratio', description: 'Choose a preset like Square (1:1) for profile avatars or drag freely.' },
      { step: 3, title: 'Crop & Download', description: 'Position the crop area and click Download Cropped Image.' },
    ],
    whyUse: [
      'Focus on the Subject: Remove distracting borders, photobombers, or unnecessary background space.',
      'Avatar Perfection: Quickly frame 1:1 square headshots for LinkedIn, Discord, and resume profiles.',
    ],
    tips: [
      'Use 16:9 for YouTube thumbnails and desktop wallpapers, and 1:1 for social profile avatars.',
    ],
    faq: [
      {
        question: 'Does cropping reduce photo quality?',
        answer: 'No. Cropping only removes the unselected pixels; the cropped region retains its original sharpness and resolution.',
      },
    ],
    relatedSlugs: ['image-resizer', 'rotate-flip-image', 'image-compressor'],
  },

  // 11. ROTATE & FLIP IMAGE
  {
    id: 'rotate-flip-image',
    name: 'Rotate & Flip Image',
    slug: 'rotate-flip-image',
    category: 'image',
    description: 'Rotate photos 90° clockwise, counter-clockwise, or flip horizontally and vertically.',
    detailedDescription: 'Fix sideways smartphone photos or mirror images horizontally and vertically with instant canvas re-orientation and zero quality loss.',
    metaTitle: 'Free Image Rotator & Mirror — Rotate and Flip Photos Online',
    metaDescription: 'Rotate photos 90 degrees or mirror horizontally and vertically online. Instant client-side tool with lossless canvas rendering and zero uploads.',
    icon: 'RotateCw',
    features: [
      'Rotate 90° clockwise and counter-clockwise',
      '180° rotation shortcut',
      'Horizontal mirror flip',
      'Vertical mirror flip',
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo', description: 'Select the photo that needs orientation correction.' },
      { step: 2, title: 'Adjust Orientation', description: 'Click Rotate CW, Rotate CCW, or Flip Horizontal to orient the image correctly.' },
      { step: 3, title: 'Save', description: 'Download your corrected image in original format.' },
    ],
    whyUse: [
      'Fix Smartphone EXIF Orientation: Correct photos taken in portrait or upside-down orientation that display incorrectly on other devices.',
      'Mirror Effects: Create interesting mirror images or flip selfie shots to match natural perspective.',
    ],
    tips: [
      'Flipping horizontally is great for selfie photos where text or logos were mirrored by your front camera.',
    ],
    faq: [
      {
        question: 'Will rotating reduce image resolution?',
        answer: 'No, rotation maintains the exact original pixel dimensions and aspect ratio without downscaling.',
      },
    ],
    relatedSlugs: ['crop-image', 'image-resizer', 'image-compressor'],
  },

  // 12. ADD WATERMARK
  {
    id: 'add-watermark',
    name: 'Add Watermark',
    slug: 'add-watermark',
    category: 'image',
    description: 'Protect your photos with customizable text watermarks, fonts, opacity, and positioning.',
    detailedDescription: 'Add copyright notices, creator handles, or confidential stamps to your photos. Customize font size, color, opacity, rotation angle, and placement.',
    metaTitle: 'Free Photo Watermark Tool — Add Text Watermarks Online',
    metaDescription: 'Protect photos with custom text watermarks, opacity sliders, and position controls. Fast client-side watermarking with zero file uploads.',
    icon: 'Stamp',
    features: [
      'Custom text content and copyright formatting',
      '9-point grid placement (Center, Corners, Edges)',
      'Opacity slider from subtle to bold',
      'Custom text color and font size controls',
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo', description: 'Choose the image you wish to protect with a watermark.' },
      { step: 2, title: 'Customize Text', description: 'Type your name, handle, or copyright notice, and adjust font size and color.' },
      { step: 3, title: 'Position & Save', description: 'Select a placement anchor (e.g. bottom-right) and download your protected photo.' },
    ],
    whyUse: [
      'Prevent Image Theft: Clearly identify your creative work before publishing to social media, portfolios, or stock sites.',
      'Confidentiality Tagging: Stamp sample proofs or sensitive documents with "DRAFT" or "CONFIDENTIAL".',
    ],
    tips: [
      'A 30% to 50% opacity in white or subtle grey provides clear attribution without distracting from the artwork.',
    ],
    faq: [
      {
        question: 'Can the watermark be easily removed by others?',
        answer: 'Once embedded and downloaded, the text is baked directly into the image pixel data, making it difficult to remove without cropping.',
      },
    ],
    relatedSlugs: ['image-compressor', 'crop-image', 'image-resizer'],
  },

  // 13. SOCIAL MEDIA RESIZER
  {
    id: 'social-media-resizer',
    name: 'Social Media Resizer',
    slug: 'social-media-resizer',
    category: 'image',
    description: 'Format photos for Instagram, YouTube, Twitter, LinkedIn, and Facebook with one click.',
    detailedDescription: 'Instantly format images for major social media platforms. Choose from pre-configured canvas sizes for Instagram Posts, Stories, YouTube Thumbnails, Twitter Banners, and more.',
    metaTitle: 'Free Social Media Image Resizer — Instagram, YouTube, X & LinkedIn',
    metaDescription: 'Resize photos for Instagram, YouTube thumbnails, X/Twitter headers, Facebook, and LinkedIn. One-click preset canvas sizing client-side.',
    icon: 'Share2',
    isPopular: true,
    features: [
      'Pre-configured templates for Instagram, YouTube, X/Twitter, LinkedIn, and Facebook',
      'Auto-centering and intelligent aspect ratio fit',
      'Custom solid background fills for letterboxed images',
      'Instant high-resolution export',
    ],
    howToUse: [
      { step: 1, title: 'Upload Image', description: 'Select the photo or graphic you want to format.' },
      { step: 2, title: 'Choose Platform Preset', description: 'Pick your target platform and format (e.g. Instagram Square 1080x1080 or YouTube Thumbnail 1280x720).' },
      { step: 3, title: 'Download Asset', description: 'Review the preview and download the perfectly sized graphic.' },
    ],
    whyUse: [
      'Stop Platform Cropping: Prevent social platforms from awkwardly cutting off faces or text in your posts.',
      'Professional Consistency: Ensure your social graphics always display at optimal platform sharpness.',
    ],
    tips: [
      'For YouTube thumbnails, 1280x720 with high-contrast text works best on both mobile feeds and TV apps.',
    ],
    faq: [
      {
        question: 'Are the platform dimensions updated to current standards?',
        answer: 'Yes, our templates match current platform recommendations (e.g. Instagram 1080x1080, YouTube 1280x720, Twitter/X Header 1500x500).',
      },
    ],
    relatedSlugs: ['image-resizer', 'crop-image', 'image-compressor'],
  },

  // 14. PERCENTAGE CALCULATOR
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    slug: 'percentage-calculator',
    category: 'student-utility',
    description: 'Calculate percentage increases, decreases, discounts, and common percentage formulas.',
    detailedDescription: 'Perform everyday percentage calculations with instant results. Calculate percentage of a number, percentage increase/decrease, markup, and discounts with explanatory breakdowns.',
    metaTitle: 'Free Percentage Calculator — Increase, Decrease & Discounts',
    metaDescription: 'Calculate percentages, percentage increases, decreases, discounts, and differences instantly. Free, accurate, and easy-to-use math utility.',
    icon: 'Percent',
    isFeatured: true,
    isPopular: true,
    badge: 'Popular',
    features: [
      'What is X% of Y?',
      'X is what percent of Y?',
      'Percentage increase or decrease from X to Y',
      'Discount and final sale price calculator',
    ],
    howToUse: [
      { step: 1, title: 'Select Calculation Mode', description: 'Choose the type of percentage problem you want to solve.' },
      { step: 2, title: 'Enter Numbers', description: 'Type your values into the designated input fields.' },
      { step: 3, title: 'View Result', description: 'The exact answer and mathematical step-by-step formula appear instantly.' },
    ],
    whyUse: [
      'Instant Accuracy: Avoid manual mental math errors when calculating discounts, tax, tips, or grades.',
      'Step-by-Step Breakdown: Shows the exact mathematical formula used so you can understand the working.',
      'Student & Business Friendly: Perfect for school homework, sales commissions, and retail budgeting.',
    ],
    tips: [
      'To find 15% quickly in your head, find 10% (move decimal one spot left) and add half of that amount.',
    ],
    faq: [
      {
        question: 'How do you calculate percentage increase?',
        answer: 'Subtract the old number from the new number, divide the difference by the old number, and multiply by 100.',
      },
      {
        question: 'How do I calculate a discount?',
        answer: 'Multiply the original price by the discount percentage divided by 100, then subtract that amount from the original price.',
      },
    ],
    relatedSlugs: ['gpa-calculator', 'age-calculator', 'unit-converter'],
  },

  // 15. AGE CALCULATOR
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    slug: 'age-calculator',
    category: 'student-utility',
    description: 'Calculate exact age in years, months, weeks, days, hours, and minutes from date of birth.',
    detailedDescription: 'Find out your exact chronological age or time elapsed between any two dates. Breakdown includes total years, months, days, and countdown to next birthday.',
    metaTitle: 'Free Age Calculator — Exact Age in Years, Months & Days',
    metaDescription: 'Calculate your exact age in years, months, weeks, days, and hours from date of birth. Includes countdown to your next birthday with 100% privacy.',
    icon: 'Calendar',
    features: [
      'Precise age breakdown in years, months, and days',
      'Total counts in weeks, days, hours, and minutes',
      'Days remaining until next birthday countdown',
      'Custom comparison date option',
    ],
    howToUse: [
      { step: 1, title: 'Enter Birth Date', description: 'Select your birth date using the date picker.' },
      { step: 2, title: 'Compare Date', description: 'By default, it compares against today, or pick any past/future reference date.' },
      { step: 3, title: 'Review Stats', description: 'Inspect your complete chronological timeline and upcoming birthday countdown.' },
    ],
    whyUse: [
      'Official Verifications: Verify exact age requirements for licenses, exams, sports leagues, and visas.',
      'Fun Milestones: Discover fascinating milestones like when you reach 10,000 days or 1,000 weeks of life.',
    ],
    tips: [
      'Leap years are automatically accounted for to guarantee 100% mathematical precision.',
    ],
    faq: [
      {
        question: 'Does this calculator account for leap years?',
        answer: 'Yes, full calendar leap years are computed according to Gregorian calendar rules.',
      },
    ],
    relatedSlugs: ['percentage-calculator', 'study-timer', 'gpa-calculator'],
  },

  // 16. GPA CALCULATOR
  {
    id: 'gpa-calculator',
    name: 'GPA Calculator',
    slug: 'gpa-calculator',
    category: 'student-utility',
    description: 'Calculate high school or college Grade Point Average on standard 4.0 scale.',
    detailedDescription: 'Compute your semester or cumulative GPA easily. Add courses, credit hours, and letter grades on the standard 4.0 scale. Save courses locally in your browser.',
    metaTitle: 'Free GPA Calculator — College & High School 4.0 Scale',
    metaDescription: 'Calculate semester and cumulative GPA on the standard 4.0 scale with credit weighting. Free, private, and saves courses locally in your browser.',
    icon: 'GraduationCap',
    isFeatured: true,
    isPopular: true,
    badge: 'Academic',
    features: [
      'Standard 4.0 grade scale (A+, A, A-, B+, etc.)',
      'Credit hour weighting for every course',
      'Add unlimited courses and semesters',
      'Optional local storage auto-save',
    ],
    howToUse: [
      { step: 1, title: 'Add Course', description: 'Enter course name, credit hours (e.g. 3.0), and expected letter grade.' },
      { step: 2, title: 'Add Multiple Subjects', description: 'Click Add Course for each class in your semester schedule.' },
      { step: 3, title: 'Check GPA', description: 'Your weighted Grade Point Average updates automatically in real time.' },
    ],
    whyUse: [
      'Academic Planning: Test hypothetical grades to see what scores you need to hit honors or dean\'s list requirements.',
      'Privacy First: Your academic grades remain strictly in your local browser storage and are never uploaded.',
    ],
    tips: [
      'Courses with higher credit weights (e.g. 4-credit lab science) have a much larger impact on your cumulative GPA than 1-credit seminars.',
    ],
    faq: [
      {
        question: 'How is weighted GPA calculated?',
        answer: 'Each grade is assigned point values (e.g. A = 4.0, B = 3.0). Points are multiplied by course credits, summed, and divided by total credit hours.',
      },
      {
        question: 'Does this work for high school and university?',
        answer: 'Yes, it follows the standard North American 4.0 grading system used across universities, colleges, and high schools.',
      },
    ],
    relatedSlugs: ['percentage-calculator', 'study-timer', 'word-counter'],
  },

  // 17. WORD COUNTER
  {
    id: 'word-counter',
    name: 'Word Counter',
    slug: 'word-counter',
    category: 'student-utility',
    description: 'Count words, characters, sentences, paragraphs, and estimated reading time.',
    detailedDescription: 'Analyze text in real time. Count total words, characters with/without spaces, sentences, paragraphs, reading time, and speaking duration.',
    metaTitle: 'Free Word Counter — Count Words, Characters & Reading Time',
    metaDescription: 'Real-time word counter and text statistics tool. Track word counts, characters, sentences, and estimated reading time online for free.',
    icon: 'AlignLeft',
    isPopular: true,
    features: [
      'Real-time word and character statistics',
      'Counts sentences and paragraphs',
      'Estimated reading time and speaking time',
      'One-click copy and text clear',
    ],
    howToUse: [
      { step: 1, title: 'Paste or Type', description: 'Paste your draft or type directly into the text editor box.' },
      { step: 2, title: 'Inspect Counts', description: 'Watch the word, character, and sentence counters update instantly as you type.' },
      { step: 3, title: 'Copy Text', description: 'Use the Copy button to copy your polished text back to your clipboard.' },
    ],
    whyUse: [
      'Meet Word Limits: Stay within strict limits for essays, application statements, articles, and Twitter/X posts.',
      'Estimate Speech Length: Use speaking time estimates to pace oral presentations and podcast scripts.',
    ],
    tips: [
      'Average reading speed is about 200–250 words per minute, while conversational speaking speed is around 130–150 words per minute.',
    ],
    faq: [
      {
        question: 'Does this tool save or upload my writing?',
        answer: 'No. All text is analyzed strictly in your browser memory. Your drafts are never uploaded or stored on any server.',
      },
    ],
    relatedSlugs: ['character-counter', 'study-timer', 'gpa-calculator'],
  },

  // 18. CHARACTER COUNTER
  {
    id: 'character-counter',
    name: 'Character Counter',
    slug: 'character-counter',
    category: 'student-utility',
    description: 'Track exact character limits for Twitter/X, SMS, meta descriptions, and bios.',
    detailedDescription: 'Count characters with and without whitespace. Features built-in limit meters for Twitter/X (280 chars), SMS messages (160 chars), and SEO title tags (60 chars).',
    metaTitle: 'Free Character Counter — Track Character Limits & Spaces',
    metaDescription: 'Count characters with and without spaces. Includes live limit trackers for X/Twitter, SMS, and SEO meta tags. Fast, client-side, and free.',
    icon: 'Type',
    features: [
      'Characters with spaces and characters without spaces',
      'Live limit meters for X/Twitter (280), SMS (160), and SEO (60/160)',
      'Instant live updates with zero lag',
    ],
    howToUse: [
      { step: 1, title: 'Input Text', description: 'Paste or type your text into the editor area.' },
      { step: 2, title: 'Check Limits', description: 'Monitor the color-coded platform limit progress bars.' },
      { step: 3, title: 'Refine Copy', description: 'Trim copy until it fits your target platform constraint perfectly.' },
    ],
    whyUse: [
      'SEO Precision: Keep page titles under 60 characters and meta descriptions under 160 characters to avoid truncation in Google search results.',
      'Social Media Accuracy: Ensure tweets and bios fit within strict character boundaries without awkward edits.',
    ],
    tips: [
      'Keep social media bios concise: leaving 10–15 spare characters makes them much easier to scan on mobile screens.',
    ],
    faq: [
      {
        question: 'What is the difference between characters with and without spaces?',
        answer: 'Characters with spaces count every letter, number, punctuation mark, and blank space. Without spaces excludes spaces and line breaks.',
      },
    ],
    relatedSlugs: ['word-counter', 'percentage-calculator', 'qr-code-generator'],
  },

  // 19. UNIT CONVERTER
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    slug: 'unit-converter',
    category: 'student-utility',
    description: 'Convert length, weight, temperature, area, volume, and digital storage units.',
    detailedDescription: 'Quickly convert between metric and imperial measurement systems. Supports length (km, miles, ft, m), mass (kg, lbs, oz), temperature (°C, °F, K), volume, and digital storage.',
    metaTitle: 'Free Unit Converter — Length, Weight, Temperature & More',
    metaDescription: 'Convert between metric and imperial units for length, mass, temperature, area, volume, and data storage. Instant, accurate browser calculator.',
    icon: 'ArrowRightLeft',
    isPopular: true,
    features: [
      '6 major categories: Length, Mass/Weight, Temperature, Area, Volume, Data Storage',
      'Bidirectional real-time conversion',
      'Accurate conversion formulas',
      'High-precision numeric formatting',
    ],
    howToUse: [
      { step: 1, title: 'Select Category', description: 'Choose Length, Mass, Temperature, Area, Volume, or Data Storage.' },
      { step: 2, title: 'Select Units', description: 'Pick the source unit (e.g. Kilograms) and target unit (e.g. Pounds).' },
      { step: 3, title: 'Enter Value', description: 'Type your number to see the converted result update immediately.' },
    ],
    whyUse: [
      'Global Communication: Seamlessly convert recipes, blueprints, science lab reports, and technical manuals between metric and US customary units.',
      'No Ads or Distractions: Simple, instant conversion without cluttered search engine widgets.',
    ],
    tips: [
      'For quick mental estimates: 1 kilogram is roughly 2.2 pounds, and 1 kilometer is roughly 0.62 miles.',
    ],
    faq: [
      {
        question: 'How accurate are the conversion formulas?',
        answer: 'All conversions follow internationally standardized conversion factors (e.g. exact 1 inch = 25.4 mm).',
      },
    ],
    relatedSlugs: ['percentage-calculator', 'age-calculator', 'study-timer'],
  },

  // 20. STUDY TIMER
  {
    id: 'study-timer',
    name: 'Study Timer (Pomodoro)',
    slug: 'study-timer',
    category: 'student-utility',
    description: 'Focus timer with 25-minute Pomodoro study intervals and relaxing break alerts.',
    detailedDescription: 'Boost focus and prevent burnout with the Pomodoro technique. Features configurable study intervals, short and long breaks, audio alerts, and session tracking.',
    metaTitle: 'Free Study Timer — Pomodoro Focus & Break Timer Online',
    metaDescription: 'Stay focused with our free Pomodoro study timer. Configurable focus intervals, break notifications, session counter, and audio chime.',
    icon: 'Clock',
    features: [
      'Preset intervals: 25-minute Focus, 5-minute Short Break, 15-minute Long Break',
      'Configurable custom durations',
      'Web Audio gentle chime notifications',
      'Completed session counter',
    ],
    howToUse: [
      { step: 1, title: 'Select Focus Mode', description: 'Click Focus (25m) to start a standard study block.' },
      { step: 2, title: 'Study Without Distraction', description: 'Work single-mindedly until the timer chimes.' },
      { step: 3, title: 'Take a Break', description: 'Click Short Break (5m) to step away from your screen and recharge.' },
    ],
    whyUse: [
      'Fight Procrastination: Breaking tasks into manageable 25-minute sprints makes large projects feel approachable.',
      'Maintain Mental Energy: Structured regular breaks prevent cognitive fatigue during exam cramming and work sprints.',
    ],
    tips: [
      'During your 5-minute breaks, stand up, stretch, hydrate, and look away from all screens to rest your eyes.',
    ],
    faq: [
      {
        question: 'What is the Pomodoro Technique?',
        answer: 'It is a time management method created by Francesco Cirillo in the late 1980s that uses intervals of focused work followed by short breaks to maximize productivity.',
      },
      {
        question: 'Will the timer keep running if I switch tabs?',
        answer: 'Yes, modern browser background timers continue to track time accurately even when you switch tabs.',
      },
    ],
    relatedSlugs: ['gpa-calculator', 'word-counter', 'percentage-calculator'],
  },

  // 21. QR CODE GENERATOR
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    slug: 'qr-code-generator',
    category: 'student-utility',
    description: 'Create customizable QR codes for websites, Wi-Fi networks, text, emails, and phone numbers.',
    detailedDescription: 'Generate high-resolution QR codes instantly. Customize foreground and background colors, choose data type (URL, Wi-Fi, Plain Text, Email, Phone), and download as crisp PNG graphics.',
    metaTitle: 'Free QR Code Generator — Create Custom QR Codes Online',
    metaDescription: 'Generate high-resolution QR codes for websites, Wi-Fi, text, email, and phone numbers. Custom colors, free download, and zero tracking.',
    icon: 'QrCode',
    isFeatured: true,
    isPopular: true,
    badge: 'Popular',
    features: [
      'Supports URLs, Wi-Fi credentials, plain text, email, and phone numbers',
      'Custom foreground and background color pickers',
      'Lossless high-resolution PNG export',
      'Instant copy image directly to clipboard',
    ],
    howToUse: [
      { step: 1, title: 'Choose QR Type', description: 'Select Website URL, Wi-Fi Network, Text, Email, or Phone Number.' },
      { step: 2, title: 'Enter Details', description: 'Type in your link or network details. The QR code generates in real time.' },
      { step: 3, title: 'Customize & Export', description: 'Adjust colors if desired, then click Download PNG or Copy to Clipboard.' },
    ],
    whyUse: [
      'No Expiration Dates: Generated static QR codes encode data directly into the pixel pattern and never expire.',
      'Zero Tracking Links: Unlike commercial QR services that route through redirects to track users, our QR codes connect directly to your destination.',
      'Instant Wi-Fi Sharing: Allow guests to connect to your home or office Wi-Fi with a quick phone camera scan.',
    ],
    tips: [
      'Always test your QR code with your smartphone camera before printing flyers or business cards.',
      'Ensure high contrast: dark foreground on a white or light background scans the most reliably in dim lighting.',
    ],
    faq: [
      {
        question: 'Do these QR codes expire?',
        answer: 'No. These are standard static QR codes where the information is permanently encoded directly into the pixel matrix. They work indefinitely.',
      },
      {
        question: 'Can any smartphone scan these QR codes?',
        answer: 'Yes! Both modern iOS and Android camera apps automatically recognize standard QR codes without needing any special app.',
      },
    ],
    relatedSlugs: ['image-compressor', 'image-to-pdf', 'percentage-calculator'],
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
