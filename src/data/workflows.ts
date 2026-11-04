export interface WorkflowStep {
  stepNumber: number;
  slug: string;
  name: string;
  path: string;
  actionLabel: string;
  badge?: string;
  description: string;
  guidance: string;
}

export interface WorkflowKit {
  id: string;
  title: string;
  shortTitle: string;
  badge: string;
  tagline: string;
  description: string;
  disclaimer?: string;
  steps: WorkflowStep[];
  applicableToolSlugs: string[];
}

export const WORKFLOW_KITS: WorkflowKit[] = [
  // 1. PHOTO APPLICATION KIT
  {
    id: 'photo-application-kit',
    title: 'Photo Application Workflow Kit',
    shortTitle: 'Photo Application Kit',
    badge: 'Photo Submission Pipeline',
    tagline: 'Prepare digital images for job portals, exams, visa forms, and online applications.',
    description:
      'Online application forms frequently enforce strict specifications for pixel dimensions, physical framing, maximum file size, and image file format. This four-step workflow guides you through preparing your photos using Toolora’s independent browser utilities. Because each tool operates client-side, download your processed file at each step before opening the next tool.',
    disclaimer:
      'Official Photo Requirement Notice: Submission requirements, head-to-chin proportions, and background specifications vary significantly across countries, government agencies, and visa portals. Toolora provides standard cropping, resizing, and file-size utilities, but does not guarantee compliance with every official requirement. Always verify the current official photo guidelines published by your target institution or visa authority before submitting.',
    applicableToolSlugs: [
      'image-resizer',
      'passport-photo-resizer',
      'photo-size-reducer',
      'png-to-jpg',
      'webp-to-jpg',
      'bmp-to-jpg',
      'aspect-ratio-calculator',
    ],
    steps: [
      {
        stepNumber: 1,
        slug: 'image-resizer',
        name: 'Image Resizer',
        path: '/tools/image-resizer',
        actionLabel: 'Open Image Resizer',
        badge: 'Dimensions & Proportions',
        description: 'Scale raw image dimensions to your target width and height in pixels or percentage.',
        guidance:
          'If your application asks for a specific resolution (such as 600×600 px or 1200×900 px), resize the image here first while keeping the aspect ratio lock toggled on to avoid stretching.',
      },
      {
        stepNumber: 2,
        slug: 'passport-photo-resizer',
        name: 'Passport Photo Resizer',
        path: '/tools/passport-photo-resizer',
        actionLabel: 'Open Passport Resizer',
        badge: 'Biometric Framing',
        description: 'Crop and frame your portrait using standard passport dimensions (2×2 in, 35×45 mm, 30×40 mm).',
        guidance:
          'Position your face within the biometric guideline overlay, centering the eyes and chin. Confirm with your jurisdiction’s official requirements before proceeding.',
      },
      {
        stepNumber: 3,
        slug: 'photo-size-reducer',
        name: 'Photo Size Reducer (KB Limit)',
        path: '/tools/photo-size-reducer',
        actionLabel: 'Open Size Reducer',
        badge: 'File Size Ceiling',
        description: 'Compress your photo to strictly meet maximum upload quotas (e.g. under 100 KB, 200 KB, or 500 KB).',
        guidance:
          'Select or enter your portal’s exact maximum kilobyte threshold. The tool automatically searches for the highest quality compression level that falls beneath that ceiling.',
      },
      {
        stepNumber: 4,
        slug: 'png-to-jpg',
        name: 'PNG to JPG / WebP to JPG',
        path: '/tools/png-to-jpg',
        actionLabel: 'Open JPG Converter',
        badge: 'Universal Format',
        description: 'Convert PNG or WebP portraits into universally accepted JPEG format when required.',
        guidance:
          'Many application systems accept JPEG/JPG files only. If your image is in PNG or WebP format, convert it to JPG with an opaque white background fill.',
      },
    ],
  },

  // 2. PDF SUBMISSION KIT
  {
    id: 'pdf-submission-kit',
    title: 'PDF Submission Workflow Kit',
    shortTitle: 'PDF Submission Kit',
    badge: 'Document Submission Pipeline',
    tagline: 'Assemble, combine, orient, and audit multi-page PDF documents for university, legal, or professional submissions.',
    description:
      'Assembling academic assignments, visa application packets, or corporate reports often requires combining scanned photos, merging separate PDF chapters, fixing upside-down pages, and verifying total page counts. Follow this four-step sequence to prepare clean, submission-ready documents directly in your web browser.',
    disclaimer:
      'Browser Privacy Notice: All PDF compilation, page merging, and page rotations occur entirely in your local browser memory using client-side JavaScript. Your confidential records, transcripts, and financial files are never uploaded to remote servers. Download each file before opening the next step.',
    applicableToolSlugs: [
      'image-to-pdf',
      'merge-pdf',
      'rotate-pdf',
      'pdf-page-counter',
      'jpg-to-pdf',
      'png-to-pdf',
      'split-pdf',
      'pdf-metadata-viewer',
    ],
    steps: [
      {
        stepNumber: 1,
        slug: 'image-to-pdf',
        name: 'Image to PDF',
        path: '/tools/image-to-pdf',
        actionLabel: 'Open Image to PDF',
        badge: 'Photo to Document',
        description: 'Package scanned homework pages, receipts, or certificates into standardized PDF pages.',
        guidance:
          'Upload your JPG, PNG, or WebP images, configure paper sizing (A4 or US Letter) and page margins, arrange page sequence, and export a clean PDF.',
      },
      {
        stepNumber: 2,
        slug: 'merge-pdf',
        name: 'Merge PDF',
        path: '/tools/merge-pdf',
        actionLabel: 'Open Merge PDF',
        badge: 'Combine Files',
        description: 'Combine multiple individual PDF files into a single unified submission packet.',
        guidance:
          'Add your converted photo PDF alongside cover letters, transcripts, or supporting attachments. Drag files into correct reading order and merge them into one file.',
      },
      {
        stepNumber: 3,
        slug: 'rotate-pdf',
        name: 'Rotate PDF',
        path: '/tools/rotate-pdf',
        actionLabel: 'Open Rotate PDF',
        badge: 'Page Orientation',
        description: 'Correct sideways or upside-down pages so all documents read right-side up.',
        guidance:
          'If scanner feeds or mobile camera captures produced inverted or landscape pages, rotate individual pages 90°, 180°, or 270° without re-converting.',
      },
      {
        stepNumber: 4,
        slug: 'pdf-page-counter',
        name: 'PDF Page Counter & Auditor',
        path: '/tools/pdf-page-counter',
        actionLabel: 'Open Page Counter',
        badge: 'Final Audit',
        description: 'Verify exact page counts, orientation, and file size before formal submission.',
        guidance:
          'Confirm that your compiled packet matches institutional page maximums (e.g. 10-page thesis limit or 5-page application cap) and that all pages rendered cleanly.',
      },
    ],
  },

  // 3. STUDENT ACADEMIC KIT
  {
    id: 'student-academic-kit',
    title: 'Student Academic Planning Kit',
    shortTitle: 'Student Academic Kit',
    badge: 'Academic Standing Pipeline',
    tagline: 'Track semester grades, project cumulative degree CGPA, calculate exam target scores, and convert percentages.',
    description:
      'College and high school students frequently need to distinguish between course-level grades, term-level semester GPA (SGPA), cumulative multi-term CGPA, and raw marks percentages. This four-step toolkit connects each phase of academic performance analysis so you know exactly where you stand and what exam scores you need.',
    disclaimer:
      'Institutional Grading Policy Notice: University grading scales (4.0 vs 5.0 vs 10.0), honors thresholds, credit-hour weightings, and percentage conversion formulas differ across universities, state boards, and national accreditation agencies. Toolora provides standardized mathematical models; always verify results with your university registrar or academic advisor.',
    applicableToolSlugs: [
      'gpa-calculator',
      'cgpa-calculator',
      'grade-calculator',
      'marks-percentage-calculator',
      'average-calculator',
      'percentage-calculator',
    ],
    steps: [
      {
        stepNumber: 1,
        slug: 'gpa-calculator',
        name: 'GPA Calculator (Term / Semester)',
        path: '/tools/gpa-calculator',
        actionLabel: 'Open GPA Calculator',
        badge: 'Single Semester',
        description: 'Calculate your semester GPA (SGPA) from individual course letter grades and credit hours.',
        guidance:
          'Enter your course letter grades (A, B+, etc.) and course credits for a single term. Toolora multiplies grade points by credits to compute quality points and calculates your term GPA.',
      },
      {
        stepNumber: 2,
        slug: 'cgpa-calculator',
        name: 'CGPA Calculator (Cumulative)',
        path: '/tools/cgpa-calculator',
        actionLabel: 'Open CGPA Calculator',
        badge: 'Cumulative Degree',
        description: 'Combine multiple semester GPAs into an overall cumulative CGPA across your entire degree.',
        guidance:
          'Input your SGPA and credit total for each completed semester on a 4.0, 5.0, or 10.0 scale. Heavier semesters exert proportional influence on your cumulative degree average.',
      },
      {
        stepNumber: 3,
        slug: 'grade-calculator',
        name: 'Grade Calculator (Class & Final Exam)',
        path: '/tools/grade-calculator',
        actionLabel: 'Open Grade Calculator',
        badge: 'Course Syllabus',
        description: 'Calculate current course standing and solve the exact final exam score needed to pass or achieve an A.',
        guidance:
          'Input syllabus weights (homework, quizzes, midterm) to calculate your current class grade, then enter your final exam weight to determine the exact score needed on exam day.',
      },
      {
        stepNumber: 4,
        slug: 'marks-percentage-calculator',
        name: 'Marks Percentage Calculator',
        path: '/tools/marks-percentage-calculator',
        actionLabel: 'Open Marks Percentage',
        badge: 'Exam Percentage',
        description: 'Convert raw points earned on tests and assignments into exact percentages and letter grades.',
        guidance:
          'Enter total marks scored and maximum possible marks to compute percentage scores, grade classifications, and pass/fail thresholds.',
      },
    ],
  },

  // 4. CREATOR WRITING KIT
  {
    id: 'creator-writing-kit',
    title: 'Creator Writing & Editorial Kit',
    shortTitle: 'Creator Writing Kit',
    badge: 'Content Editorial Pipeline',
    tagline: 'Audit word limits, monitor character quotas, analyze sentence pacing, and calculate presentation speaking time.',
    description:
      'Whether drafting university admissions essays, authoring SEO blog posts, pacing keynote speeches, or crafting social media copy, writers must balance length, readability, and delivery speed. This four-step workflow connects Toolora’s text analysis tools to help you polish copy from initial draft to final delivery.',
    disclaimer:
      'Editorial Privacy Notice: All text auditing and pacing estimations run directly in your local browser memory. Toolora does not store, transmit, or train artificial intelligence models on your private drafts, notes, or manuscripts.',
    applicableToolSlugs: [
      'word-counter',
      'character-counter',
      'sentence-counter',
      'reading-time-calculator',
      'text-cleaner',
      'text-case-converter',
    ],
    steps: [
      {
        stepNumber: 1,
        slug: 'word-counter',
        name: 'Word Counter',
        path: '/tools/word-counter',
        actionLabel: 'Open Word Counter',
        badge: 'Volume & Readability',
        description: 'Count words, track custom word targets, and evaluate Flesch Reading Ease scores in real time.',
        guidance:
          'Paste your draft to monitor overall word volume, inspect word frequency density, and set custom word targets (e.g. 500w essay or 1,500w article) with live progress bars.',
      },
      {
        stepNumber: 2,
        slug: 'character-counter',
        name: 'Character Counter',
        path: '/tools/character-counter',
        actionLabel: 'Open Character Counter',
        badge: 'Strict Platform Caps',
        description: 'Monitor characters with and without spaces against strict platform limits (Twitter/X, SMS, Bios).',
        guidance:
          'When preparing headlines, meta tags (160 chars), or social media updates (280 chars), check exact character counts with and without spaces to prevent cutoffs.',
      },
      {
        stepNumber: 3,
        slug: 'sentence-counter',
        name: 'Sentence Counter & Flow Analyzer',
        path: '/tools/sentence-counter',
        actionLabel: 'Open Sentence Counter',
        badge: 'Prose Rhythm',
        description: 'Evaluate sentence structure, average sentence length, and prose cadence to eliminate run-on sentences.',
        guidance:
          'Identify excessively long sentences (over 25 words) that impair reader comprehension and adjust sentence variety to create a natural, engaging rhythm.',
      },
      {
        stepNumber: 4,
        slug: 'reading-time-calculator',
        name: 'Reading Time & Speech Calculator',
        path: '/tools/reading-time-calculator',
        actionLabel: 'Open Reading Time',
        badge: 'Pacing & Presentation',
        description: 'Estimate silent reading time and oral presentation speaking duration across slow, average, and fast paces.',
        guidance:
          'Check silent reading duration for articles or adjust speaking pace (typically 130–150 WPM) to ensure conference talks or podcast scripts fit strictly within allotted time slots.',
      },
    ],
  },
];

export function getWorkflowForTool(toolSlug: string): WorkflowKit | undefined {
  return WORKFLOW_KITS.find((kit) => kit.applicableToolSlugs.includes(toolSlug));
}

export function getWorkflowById(id: string): WorkflowKit | undefined {
  return WORKFLOW_KITS.find((kit) => kit.id === id);
}
