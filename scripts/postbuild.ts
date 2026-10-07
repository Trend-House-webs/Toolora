import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

if (!fs.existsSync(distDir)) {
  console.error('Dist directory does not exist! Please run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

// Import tools and categories
// We can parse or import them via tsx/node or read tools data
import { TOOLS, CATEGORIES } from '../src/data/tools.ts';
import { GUIDES } from '../src/data/guides.ts';

const SITE_URL = 'https://toolorahub.vercel.app';

interface PageMetadata {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}

const staticPages: PageMetadata[] = [
  {
    path: 'tools',
    title: 'All Free Online Tools Directory — Toolora',
    description: 'Browse our complete directory of free online browser utilities. Fast, client-side, with zero sign-up or payments.',
  },
  {
    path: 'about',
    title: 'About Toolora — Our Mission and Privacy-First Approach',
    description: 'Learn about Toolora: a suite of fast, free, client-side utility tools for images, math, and everyday tasks with zero server uploads.',
  },
  {
    path: 'contact',
    title: 'Contact & Feedback — Toolora',
    description: 'Contact Toolora. Suggest new free tools, submit technical feedback, or share ideas with our team.',
  },
  {
    path: 'privacy',
    title: 'Privacy Policy — Toolora',
    description: 'Toolora privacy policy. Learn how all image, file, and utility operations run locally in your browser with zero data collection.',
  },
  {
    path: 'terms',
    title: 'Terms of Service — Toolora',
    description: 'Terms of service for using Toolora and our suite of free online browser utilities.',
  },
  {
    path: 'disclaimer',
    title: 'Disclaimer — Toolora',
    description: 'Disclaimer and terms of accuracy for calculations and file transformations performed on Toolora.',
  },
];

const categoryPages: PageMetadata[] = CATEGORIES.map((cat) => ({
  path: `category/${cat.slug}`,
  title: `${cat.title} — Free Online Utilities | Toolora`,
  description: cat.description,
}));

const toolPages: PageMetadata[] = TOOLS.map((tool) => ({
  path: `tools/${tool.slug}`,
  title: tool.metaTitle || `${tool.name} — Toolora`,
  description: tool.metaDescription || tool.description,
}));

const guidesHubPage: PageMetadata = {
  path: 'guides',
  title: 'Practical Guides & Browser Tool Tutorials — Toolora',
  description: 'Clear, practical tutorials on image compression, format selection, resizing without quality loss, and converting images to PDF directly in your browser.',
};

const guidePages: PageMetadata[] = GUIDES.map((guide) => ({
  path: `guides/${guide.slug}`,
  title: guide.metaTitle,
  description: guide.metaDescription,
}));

const allPages: PageMetadata[] = [
  ...staticPages,
  guidesHubPage,
  ...guidePages,
  ...categoryPages,
  ...toolPages,
];

function customizeHtml(html: string, page: PageMetadata): string {
  let updated = html;
  const canonicalUrl = `${SITE_URL}/${page.path}`;

  // Replace Title
  updated = updated.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`);

  // Replace Description
  updated = updated.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${escapeHtml(page.description)}" />`
  );

  // Replace Canonical
  updated = updated.replace(
    /<link rel="canonical" href=".*?" \/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // Replace og:url
  updated = updated.replace(
    /<meta property="og:url" content=".*?" \/>/,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );

  // Replace og:title
  updated = updated.replace(
    /<meta property="og:title" content=".*?" \/>/,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`
  );

  // Replace og:description
  updated = updated.replace(
    /<meta property="og:description" content=".*?" \/>/,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`
  );

  // Replace twitter:title
  updated = updated.replace(
    /<meta name="twitter:title" content=".*?" \/>/,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`
  );

  // Replace twitter:description
  updated = updated.replace(
    /<meta name="twitter:description" content=".*?" \/>/,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`
  );

  if (page.noindex) {
    if (!updated.includes('name="robots"')) {
      updated = updated.replace('</head>', '  <meta name="robots" content="noindex, nofollow" />\n  </head>');
    }
  }

  return updated;
}

function escapeHtml(str: string): string {
  return str.replace(/"/g, '&quot;');
}

let generatedCount = 0;

for (const page of allPages) {
  const targetDir = path.join(distDir, page.path);
  fs.mkdirSync(targetDir, { recursive: true });
  const htmlContent = customizeHtml(baseHtml, page);
  fs.writeFileSync(path.join(targetDir, 'index.html'), htmlContent);
  generatedCount++;
}

// Generate 404.html
const notFoundPage: PageMetadata = {
  path: '404',
  title: 'Page Not Found — Toolora',
  description: 'The requested tool or page could not be found on Toolora.',
  noindex: true,
};
const notFoundHtml = customizeHtml(baseHtml, notFoundPage);
fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml);

console.log(`Generated static routes: ${generatedCount} pages + 404.html in dist.`);
