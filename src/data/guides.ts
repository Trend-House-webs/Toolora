export interface GuideStep {
  step: number;
  title: string;
  description: string;
}

export interface GuideSection {
  id: string;
  heading: string;
  paragraphs: string[];
  keyPoints?: string[];
  callout?: {
    type: 'tip' | 'info';
    title: string;
    message: string;
  };
  steps?: GuideStep[];
  practicalScenario?: {
    title: string;
    scenario: string;
    solution: string;
    result: string;
  };
}

export interface RelatedToolLink {
  slug: string;
  name: string;
  path: string;
  context: string;
}

export interface GuideItem {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  categorySlug: 'image-tools' | 'pdf-tools';
  categoryName: string;
  categoryPath: string;
  readTime: string;
  summary: string;
  primaryTool: {
    slug: string;
    name: string;
    path: string;
    actionLabel: string;
  };
  relatedTools: RelatedToolLink[];
  sections: GuideSection[];
  keyTakeaways: string[];
}

export const GUIDES: GuideItem[] = [
  {
    slug: 'how-to-compress-images-online',
    title: 'How to Compress Images Online Without Losing Noticeable Quality',
    metaTitle: 'How to Compress Images Online Without Losing Quality | Toolora Guide',
    metaDescription: 'Learn how image compression works, the difference between lossy and lossless algorithms, and how to reduce image file sizes in your browser without quality loss.',
    categorySlug: 'image-tools',
    categoryName: 'Image Tools',
    categoryPath: '/category/image-tools',
    readTime: '4 min read',
    summary: 'A practical guide to shrinking image file sizes for websites, email attachments, and online forms while preserving visual sharpness, using fast in-browser processing.',
    primaryTool: {
      slug: 'image-compressor',
      name: 'Image Compressor',
      path: '/tools/image-compressor',
      actionLabel: 'Open Image Compressor',
    },
    relatedTools: [
      {
        slug: 'image-resizer',
        name: 'Image Resizer',
        path: '/tools/image-resizer',
        context: 'Scale down oversized pixel dimensions before compressing for maximum file size savings.',
      },
      {
        slug: 'photo-size-reducer',
        name: 'Photo Size Reducer (KB Limit)',
        path: '/tools/photo-size-reducer',
        context: 'Compress specifically to meet strict upload quotas like under 200 KB or 500 KB.',
      },
      {
        slug: 'jpg-to-webp',
        name: 'JPG to WebP Converter',
        path: '/tools/jpg-to-webp',
        context: 'Switch to modern WebP encoding to achieve even smaller file sizes at equal visual quality.',
      },
      {
        slug: 'crop-image',
        name: 'Crop Image',
        path: '/tools/crop-image',
        context: 'Remove unnecessary background areas to reduce unneeded image data before optimization.',
      },
    ],
    keyTakeaways: [
      'Image file size depends on pixel dimensions, color data precision, and embedded metadata.',
      'A quality setting between 75% and 85% delivers 60% to 80% file size reduction with virtually no visible degradation.',
      'Downscaling resolution before compressing yields significantly smaller output than compression alone.',
      'Toolora performs compression client-side in your browser canvas, keeping your personal photos private.',
    ],
    sections: [
      {
        id: 'why-images-get-large',
        heading: 'Why Image Files Become Unnecessarily Large',
        paragraphs: [
          'Modern smartphone cameras and digital photography sensors routinely capture images at 12 to 48 megapixels. While this high resolution is fantastic for large-format physical printing, it results in raw photo files between 4 MB and 15 MB in size.',
          'When you attempt to upload these images to a job application portal, attach them to an email, or publish them on a blog, oversized files cause upload failures, exceed mailbox limits, and dramatically slow down web page loading. Most display screens only require between 1080 and 2160 pixels of width to render an image with pin-sharp clarity.',
        ],
        keyPoints: [
          'Camera sensors embed extensive uncompressed color data and EXIF metadata (camera model, GPS coordinates, capture date).',
          'Web and mobile viewports rarely need raw 4000x3000 resolution for clear on-screen rendering.',
          'Compressing removes redundant pixel variance without degrading the perceived sharpness on ordinary displays.',
        ],
      },
      {
        id: 'lossy-vs-lossless',
        heading: 'Lossy vs. Lossless Compression: Where the Bytes Go',
        paragraphs: [
          'Image compression operates through two distinct technical approaches: lossy compression and lossless compression. Choosing the right method depends on your intended use case.',
          'Lossless compression works by optimizing how image data is encoded and stripping non-visual metadata tags. The pixels themselves remain 100% identical to the source. This typically reduces file size by 10% to 30% and is ideal for diagrams, archival photos, and pixel-art graphics.',
          'Lossy compression selectively removes subtle color variations and high-frequency details that the human eye cannot easily discern in complex photographic scenes. By adjusting the quality parameter, you can achieve 60% to 85% reductions in file size while the image remains visually crisp.',
        ],
        callout: {
          type: 'info',
          title: 'The 75% to 85% Sweet Spot',
          message: 'Setting lossy compression to 80% generally cuts file weight by more than half while maintaining crisp edges and faithful color reproduction.',
        },
      },
      {
        id: 'step-by-step-guide',
        heading: 'Step-by-Step: How to Compress an Image with Toolora',
        paragraphs: [
          'Toolora provides client-side compression that runs directly inside your web browser using HTML5 Canvas APIs. Your files are never uploaded to a remote server, ensuring complete confidentiality for personal documents and photos.',
        ],
        steps: [
          {
            step: 1,
            title: 'Load Your Image',
            description: 'Open the client-side Image Compressor and drop your JPG, PNG, or WebP file into the upload zone.',
          },
          {
            step: 2,
            title: 'Adjust the Quality Slider',
            description: 'Select your target compression ratio. For everyday web sharing or portal submissions, 75% to 80% is recommended.',
          },
          {
            step: 3,
            title: 'Compare the File Size in Real Time',
            description: 'Inspect the live calculation showing the original file size, the estimated new size, and total percentage saved.',
          },
          {
            step: 4,
            title: 'Download the Optimized Image',
            description: 'Click Download to save the compressed file directly to your local device with no watermarks or accounts required.',
          },
        ],
      },
      {
        id: 'practical-scenario',
        heading: 'Practical Example: Meeting a 500 KB Job Application Quota',
        paragraphs: [
          'Online recruitment platforms and government portals frequently impose strict file size limits—often capping individual file attachments at 500 KB or 1 MB.',
        ],
        practicalScenario: {
          title: 'Resume Profile Headshot',
          scenario: 'A smartphone camera photo is 4.8 MB with dimensions of 4032x3024 pixels. The application portal rejects files larger than 500 KB.',
          solution: 'First, use the Image Resizer to scale the dimensions down to 1200x900 pixels (a generous size for web displays). Then, pass the image through the Image Compressor at 82% quality.',
          result: 'The final file drops from 4.8 MB down to 285 KB (over 94% reduction) with zero visible artifacts or fuzziness on desktop and mobile screens.',
        },
      },
      {
        id: 'best-practices',
        heading: 'Three Mistakes to Avoid When Compressing Images',
        paragraphs: [
          'To ensure you achieve the best visual results every time, keep these practical guidelines in mind:',
        ],
        keyPoints: [
          'Avoid re-compressing an already heavily compressed JPEG: Each generation of lossy encoding compounds compression artifacts.',
          'Keep an uncompressed master copy: Always preserve your original high-resolution camera photograph in case you need it for print later.',
          'Resize before compressing: If an image is 5000 pixels wide but will only be displayed in a 800-pixel card, downsizing dimensions first will reduce file size far more effectively than cranking up compression.',
        ],
      },
    ],
  },
  {
    slug: 'jpg-vs-png-vs-webp',
    title: 'JPG vs PNG vs WebP: Which Image Format Should You Use?',
    metaTitle: 'JPG vs PNG vs WebP: Image Format Comparison Guide | Toolora',
    metaDescription: 'Understand the differences between JPG, PNG, and WebP formats. Learn when to use transparency, lossy compression, and how to convert formats in your browser.',
    categorySlug: 'image-tools',
    categoryName: 'Image Tools',
    categoryPath: '/category/image-tools',
    readTime: '5 min read',
    summary: 'A direct comparison of JPG, PNG, and WebP covering file size, image quality, transparency support, and practical guidance on picking the right format for any project.',
    primaryTool: {
      slug: 'jpg-to-webp',
      name: 'JPG to WebP Converter',
      path: '/tools/jpg-to-webp',
      actionLabel: 'Convert JPG to WebP',
    },
    relatedTools: [
      {
        slug: 'png-to-jpg',
        name: 'PNG to JPG Converter',
        path: '/tools/png-to-jpg',
        context: 'Flatten transparent backgrounds and reduce file weight when transparency is unnecessary.',
      },
      {
        slug: 'webp-to-png',
        name: 'WebP to PNG Converter',
        path: '/tools/webp-to-png',
        context: 'Export WebP assets to widely compatible lossless PNG files for desktop editors.',
      },
      {
        slug: 'transparent-background-checker',
        name: 'Transparent Background Checker',
        path: '/tools/transparent-background-checker',
        context: 'Quickly inspect whether an image file has a genuine transparent alpha channel.',
      },
      {
        slug: 'image-compressor',
        name: 'Image Compressor',
        path: '/tools/image-compressor',
        context: 'Tune compression parameters to balance visual fidelity against transfer speeds.',
      },
    ],
    keyTakeaways: [
      'JPG is best for natural photographs with continuous gradients where small file sizes are paramount and transparency is not needed.',
      'PNG is the standard for crisp logos, icons, user interface screenshots, and graphics requiring transparent backgrounds.',
      'WebP offers the best of both worlds with superior compression ratios, alpha transparency, and near-universal modern browser support.',
      'You can convert between all three formats client-side in Toolora without uploading private assets to cloud servers.',
    ],
    sections: [
      {
        id: 'overview-comparison',
        heading: 'The Three Dominant Web Image Formats at a Glance',
        paragraphs: [
          'Selecting the right image format is one of the most effective ways to balance visual presentation against web speed and storage capacity. Every digital format was engineered with specific technical trade-offs.',
          'Using the wrong format can result in bloated file sizes, muddy text, or black boxes where transparent backgrounds ought to be. Understanding their distinct strengths allows you to choose with confidence.',
        ],
        keyPoints: [
          'JPG (JPEG): Lossy compression, 24-bit color (16.7 million colors), no transparency support, universal hardware and software compatibility.',
          'PNG: Lossless compression, full 8-bit alpha channel transparency, crisp sharp edges on text and geometric shapes, larger file sizes for complex photos.',
          'WebP: Modern format supporting both lossy and lossless modes, alpha transparency, and roughly 25% to 35% smaller file sizes than comparable JPG and PNG files.',
        ],
      },
      {
        id: 'when-to-use-jpg',
        heading: 'When to Use JPG (JPEG)',
        paragraphs: [
          'JPG uses discrete cosine transform (DCT) mathematical compression designed specifically for continuous-tone photographic imagery. It excels at smoothing subtle color gradations found in nature, portraits, and real-world scenes.',
          'Because JPEG discards high-frequency pixel contrast that the human visual cortex rarely notices, it yields lightweight files ideal for social sharing, photo albums, and email attachments.',
        ],
        callout: {
          type: 'tip',
          title: 'When to Avoid JPG',
          message: 'Never use JPG for logos with text, flat-color vector illustrations, or graphics with transparent cutouts. JPG cannot store transparency and often creates noticeable halos around sharp contrast lines.',
        },
      },
      {
        id: 'when-to-use-png',
        heading: 'When to Use PNG',
        paragraphs: [
          'PNG uses DEFLATE lossless compression, guaranteeing that every single pixel rendered matches the original file without any approximation. This makes PNG the industry benchmark for digital design, brand assets, and user interface captures.',
          'Crucially, PNG features true alpha transparency. This allows logos, product cutouts, and icons to blend cleanly on top of any background color or textured layout without awkward white borders.',
        ],
        keyPoints: [
          'Website logos, brand watermarks, and app icons.',
          'Screenshots of software dashboards, code snippets, or text documents where blurriness hurts readability.',
          'Graphics that will be repeatedly edited and re-saved in graphic design software.',
        ],
      },
      {
        id: 'when-to-use-webp',
        heading: 'When to Use WebP',
        paragraphs: [
          'WebP was engineered by Google to modernize web asset delivery. It incorporates advanced prediction algorithms from the VP8 video codec, allowing it to compress image data far more efficiently than legacy JPEG and PNG formats.',
          'Unlike JPEG, WebP supports full alpha transparency while still utilizing lossy compression. This means you can have a transparent product photograph that weighs 80 KB in WebP instead of 600 KB in PNG.',
          'Today, WebP is supported across all modern web browsers including Google Chrome, Apple Safari, Mozilla Firefox, and Microsoft Edge.',
        ],
        practicalScenario: {
          title: 'E-Commerce Product Catalog Optimization',
          scenario: 'An online store features 200 product showcase photos saved as 2 MB PNG files, causing slow page loads on mobile devices.',
          solution: 'Convert product photos from PNG to WebP while retaining clean transparent backgrounds and high detail.',
          result: 'Total page weight drops by over 70%, boosting mobile load speeds and keeping visuals crisp.',
        },
      },
      {
        id: 'conversion-decision-flow',
        heading: 'How to Choose and Convert in Practice',
        paragraphs: [
          'Follow this simple decision rule for your projects:',
          '1. Need a transparent background? Choose WebP for the web, or PNG for desktop software compatibility.',
          '2. High-detail real-world photo? Choose WebP for websites, or JPG for maximum universal device compatibility.',
          '3. Software screenshot with fine text? Choose PNG to keep every letter sharp, or lossless WebP.',
        ],
        keyPoints: [
          'Use the JPG to WebP converter when modernizing photo galleries for websites.',
          'Use the PNG to JPG converter when preparing receipts or photos that do not need transparency to save storage space.',
          'Use the WebP to PNG converter if an older desktop application does not recognize WebP files.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-resize-an-image-without-losing-quality',
    title: 'How to Resize an Image Without Losing Quality',
    metaTitle: 'How to Resize an Image Without Losing Quality | Toolora Guide',
    metaDescription: 'Learn how to resize images cleanly. Understand raster scaling, aspect ratios, downsampling vs upsampling, and how to avoid blurriness or distortion.',
    categorySlug: 'image-tools',
    categoryName: 'Image Tools',
    categoryPath: '/category/image-tools',
    readTime: '4 min read',
    summary: 'A clear guide on how to change image dimensions without blurriness, stretching, or pixelation, using aspect ratio locking and in-browser resampling.',
    primaryTool: {
      slug: 'image-resizer',
      name: 'Image Resizer',
      path: '/tools/image-resizer',
      actionLabel: 'Open Image Resizer',
    },
    relatedTools: [
      {
        slug: 'aspect-ratio-calculator',
        name: 'Aspect Ratio Calculator',
        path: '/tools/aspect-ratio-calculator',
        context: 'Compute proportional dimensions (e.g. 16:9, 4:3, 1:1) to prevent image stretching.',
      },
      {
        slug: 'crop-image',
        name: 'Crop Image',
        path: '/tools/crop-image',
        context: 'Trim edges and center the visual subject before resizing to your target frame.',
      },
      {
        slug: 'social-media-resizer',
        name: 'Social Media Resizer',
        path: '/tools/social-media-resizer',
        context: 'Apply pre-configured standard dimensions for Instagram, YouTube, LinkedIn, and X.',
      },
      {
        slug: 'image-dpi-checker',
        name: 'Image DPI & Print Checker',
        path: '/tools/image-dpi-checker',
        context: 'Check physical print dimensions and dots per inch (DPI) before sending to print.',
      },
    ],
    keyTakeaways: [
      'Downscaling (reducing dimensions) preserves sharpness by consolidating pixel data with interpolation filtering.',
      'Upscaling (enlarging smaller images) inherently loses crispness because the computer must estimate missing pixels.',
      'Always lock your aspect ratio to avoid squishing or stretching subjects.',
      'Start with your original, highest-resolution file rather than re-scaling an already downsized version.',
    ],
    sections: [
      {
        id: 'downscaling-vs-upscaling',
        heading: 'Downscaling vs. Upscaling: The Physics of Pixels',
        paragraphs: [
          'Digital photos are raster graphics composed of a finite grid of tiny colored squares called pixels. When you resize an image, you are altering that total pixel grid.',
          'Downsampling (reducing pixel dimensions) combines adjacent pixels using interpolation algorithms (such as bicubic or bilinear resampling). Because you are condensing rich visual information into a tighter grid, downscaled images typically look remarkably sharp and detailed.',
          'Upscaling (enlarging pixel dimensions) does the exact opposite: it attempts to create new pixels where none existed before. Because the browser must mathematically guess intermediate color values, upscaled images look soft, fuzzy, or visibly pixelated.',
        ],
        callout: {
          type: 'info',
          title: 'Rule of Thumb',
          message: 'Always capture or export your original images at high resolution. Downsizing is clean and lossless in appearance; enlarging a tiny thumbnail will never recover lost fine details.',
        },
      },
      {
        id: 'locking-aspect-ratio',
        heading: 'Preserving Proportions: The Aspect Ratio Rule',
        paragraphs: [
          'The most common resizing blunder is modifying width and height independently, resulting in warped circles, squished faces, or unnaturally stretched text.',
          'Aspect ratio is the proportional relationship between width and height (such as 16:9 widescreen or 1:1 square). When you change one dimension, the other must adjust automatically to maintain the original geometric proportions.',
        ],
        keyPoints: [
          'Keep the Aspect Ratio Lock enabled in the Image Resizer.',
          'If your target layout requires a different shape (e.g., turning a 4:3 landscape into a 1:1 square), crop the image first before resizing.',
          'Use the Aspect Ratio Calculator to preview dimensions across standard screen ratios.',
        ],
      },
      {
        id: 'step-by-step-resizing',
        heading: 'Step-by-Step: How to Resize an Image in Toolora',
        paragraphs: [
          'Toolora uses high-quality HTML5 Canvas bicubic resampling inside your browser, producing clean edges without transmitting your files across the internet.',
        ],
        steps: [
          {
            step: 1,
            title: 'Drop Your File into Image Resizer',
            description: 'Select your photo or drag it directly onto the upload card.',
          },
          {
            step: 2,
            title: 'Verify the Aspect Ratio Lock',
            description: 'Ensure the link/lock icon between width and height is active to prevent visual distortion.',
          },
          {
            step: 3,
            title: 'Specify Dimensions or Percentage',
            description: 'Type your desired width in pixels (e.g., 1200 px) or adjust the percentage slider down to 50%.',
          },
          {
            step: 4,
            title: 'Export the Crisp Resized Asset',
            description: 'Click Download to instantly save your resized graphic with preserved sharpness.',
          },
        ],
      },
      {
        id: 'practical-scenario',
        heading: 'Practical Example: Preparing a Hero Header for a Website',
        paragraphs: [
          'Web designers often receive 24-megapixel camera photographs (6000x4000 pixels) that must fit into a 1200x800 pixel content container.',
        ],
        practicalScenario: {
          title: 'Blog Article Featured Image',
          scenario: 'A photographer delivers a 6000x4000 RAW-export JPEG weighing 8.4 MB. The blog template container is 1200 pixels wide.',
          solution: 'Load the image into Toolora Image Resizer. Keep aspect ratio locked and enter 1200 in the Width input. The height automatically scales to 800.',
          result: 'The image renders with crystal clarity on all desktop and mobile displays, while file weight is reduced by over 85% even before applying compression.',
        },
      },
      {
        id: 'screen-vs-print',
        heading: 'Understanding Resolution for Screen vs. Print',
        paragraphs: [
          'Digital displays measure image size in absolute pixel counts (such as 1920x1080), regardless of physical screen size. Physical printers, by contrast, rely on DPI (dots per inch) to determine how many physical ink dots are deposited per inch of paper.',
          'For web and digital displays, only pixel dimensions matter. For physical printing on photo paper or posters, you generally need 300 DPI for gallery-grade sharpness. You can verify your physical print dimensions using the Image DPI & Print Checker.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-convert-images-to-pdf',
    title: 'How to Convert Images to PDF on Any Device',
    metaTitle: 'How to Convert Images to PDF in Your Browser | Toolora Guide',
    metaDescription: 'Step-by-step guide to converting JPG, PNG, and WebP images into clean PDF documents. Learn page sizing, margins, and how to combine files client-side.',
    categorySlug: 'pdf-tools',
    categoryName: 'PDF Tools',
    categoryPath: '/category/pdf-tools',
    readTime: '4 min read',
    summary: 'Learn how to transform single or multiple images into neat, universally printable PDF files directly in your web browser with zero server uploads.',
    primaryTool: {
      slug: 'image-to-pdf',
      name: 'Image to PDF',
      path: '/tools/image-to-pdf',
      actionLabel: 'Open Image to PDF',
    },
    relatedTools: [
      {
        slug: 'merge-pdf',
        name: 'Merge PDF',
        path: '/tools/merge-pdf',
        context: 'Combine your newly converted PDF pages with other documents into a single file.',
      },
      {
        slug: 'split-pdf',
        name: 'Split PDF (Extract Pages)',
        path: '/tools/split-pdf',
        context: 'Extract individual pages or separate chapters from larger PDF documents.',
      },
      {
        slug: 'rotate-pdf',
        name: 'Rotate PDF',
        path: '/tools/rotate-pdf',
        context: 'Correct sideways or upside-down page orientations after document conversion.',
      },
      {
        slug: 'jpg-to-pdf',
        name: 'JPG to PDF Converter',
        path: '/tools/jpg-to-pdf',
        context: 'Quickly package JPEG photos into standardized PDF files without extra configuration.',
      },
      {
        slug: 'pdf-metadata-viewer',
        name: 'PDF Metadata Viewer',
        path: '/tools/pdf-metadata-viewer',
        context: 'Inspect page count, title metadata, and document dimensions of your generated PDF.',
      },
    ],
    keyTakeaways: [
      'PDF is the global standard for multi-page document submissions because layout geometry is locked across all devices and printers.',
      'Converting photos of receipts, school assignments, or forms into PDF ensures the recipient sees exactly what you intended.',
      'Toolora compiles PDF files client-side, making it completely secure for sensitive personal IDs and financial documents.',
      'You can pair conversion with Merge PDF and Rotate PDF for full document organization.',
    ],
    sections: [
      {
        id: 'why-convert-to-pdf',
        heading: 'Why Convert Images to PDF Format?',
        paragraphs: [
          'While image formats like JPG and PNG are designed for visual display, PDF (Portable Document Format) is designed for document preservation and universal interchange.',
          'When you send someone an image, their photo viewer might scale it unpredictably, rotate it according to differing orientation metadata, or split it onto multiple paper pages when printed. PDF locks down page boundaries, margins, and resolution so the document looks identical on every phone, tablet, computer, and printer.',
        ],
        keyPoints: [
          'Combine multiple separate photos into a single paginated document.',
          'Comply with institutional submission requirements (schools, tax authorities, visa portals).',
          'Ensure clean, standardized margins when printed on standard paper sizes.',
        ],
      },
      {
        id: 'privacy-first-conversion',
        heading: 'Document Privacy: Why Client-Side Processing Matters',
        paragraphs: [
          'Images frequently converted to PDF include sensitive personal materials: scanned passports, driver licenses, university transcripts, medical bills, and tax forms.',
          'Many online PDF utilities upload your files to third-party cloud servers where they may sit in temporary directories or be indexed by logging services. Toolora operates completely client-side in your browser. The PDF file is assembled directly in your device’s local memory using JavaScript and Web APIs. Your confidential files never touch an external server.',
        ],
        callout: {
          type: 'tip',
          title: 'Complete Local Privacy',
          message: 'Because processing happens entirely within your web browser, Toolora works offline once loaded and never transmits your documents over the network.',
        },
      },
      {
        id: 'step-by-step-guide',
        heading: 'Step-by-Step: Converting Images to PDF in Toolora',
        paragraphs: [
          'Converting an image to a clean PDF takes just a few clicks in Toolora:',
        ],
        steps: [
          {
            step: 1,
            title: 'Select or Drag Your Images',
            description: 'Open the client-side Image to PDF tool and drop in your JPG, PNG, or WebP files.',
          },
          {
            step: 2,
            title: 'Configure Page Layout',
            description: 'Select your preferred paper size (e.g. A4 or US Letter) and choose orientation (Portrait or Landscape) to fit your photo neatly.',
          },
          {
            step: 3,
            title: 'Set Margins and Fit',
            description: 'Choose whether to fit the image to page borders with clean margins or let it fill the entire page.',
          },
          {
            step: 4,
            title: 'Generate and Download Your PDF',
            description: 'Click Generate PDF. The document is built instantaneously in your browser and ready to save.',
          },
        ],
      },
      {
        id: 'practical-scenario',
        heading: 'Practical Example: Submitting a Multi-Page Handwritten Assignment',
        paragraphs: [
          'Students often capture photos of several pages of handwritten homework with a smartphone and need to upload them to a classroom portal that accepts only a single PDF file.',
        ],
        practicalScenario: {
          title: 'Academic Assignment Submission',
          scenario: 'A student has 4 smartphone photos of handwritten math problem sets. The submission portal accepts only one PDF file under 10 MB.',
          solution: 'Convert each image to PDF using the Image to PDF tool with A4 portrait sizing. Then, combine the resulting files using Toolora Merge PDF.',
          result: 'A single, cleanly organized 4-page PDF document that professors can read and annotate without managing multiple image files.',
        },
      },
      {
        id: 'post-conversion-workflows',
        heading: 'Organizing and Refining Your Converted Documents',
        paragraphs: [
          'Once your images are packaged into PDF format, you can refine your document further using Toolora’s companion PDF utilities:',
        ],
        keyPoints: [
          'Merge PDF: Combine multiple separate documents or generated PDFs into one cohesive file.',
          'Rotate PDF: Fix upside-down or sideways pages that were scanned at an awkward angle.',
          'Split PDF: Extract specific pages if you only need to submit a portion of a larger packet.',
          'PDF Metadata Viewer: Inspect total page count and verify file properties before submission.',
        ],
      },
    ],
  },
];

export function getGuideBySlug(slug: string): GuideItem | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getGuidesByCategory(categorySlug: string): GuideItem[] {
  return GUIDES.filter((g) => g.categorySlug === categorySlug);
}

export function getGuidesForTool(toolSlug: string): GuideItem[] {
  return GUIDES.filter(
    (g) => g.primaryTool.slug === toolSlug || g.relatedTools.some((r) => r.slug === toolSlug)
  );
}
