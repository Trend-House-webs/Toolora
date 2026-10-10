import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const publicDir = path.resolve(rootDir, 'public');

if (!fs.existsSync(distDir)) {
  console.error('Dist directory does not exist! Please run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

// Import tools and categories
import { TOOLS, CATEGORIES } from '../src/data/tools.ts';
import { GUIDES } from '../src/data/guides.ts';

const SITE_URL = 'https://toolorahub.vercel.app';
const TODAY = new Date().toISOString().split('T')[0];

interface PageMetadata {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  schema?: Record<string, any> | Array<Record<string, any>>;
  priority?: string;
  changefreq?: 'daily' | 'weekly' | 'monthly';
}

const staticPages: PageMetadata[] = [
  {
    path: 'tools',
    title: 'All Free Online Tools Directory — Toolora',
    description: 'Browse our complete directory of free online browser utilities. Fast, client-side, with zero sign-up or payments.',
    priority: '0.9',
    changefreq: 'daily',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'All Tools Directory', item: `${SITE_URL}/tools` },
      ],
    },
  },
  {
    path: 'about',
    title: 'About Toolora — Our Mission and Privacy-First Approach',
    description: 'Learn about Toolora: a suite of fast, free, client-side utility tools for images, math, and everyday tasks with in-browser processing.',
    priority: '0.6',
    changefreq: 'monthly',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'About Toolora', item: `${SITE_URL}/about` },
      ],
    },
  },
  {
    path: 'contact',
    title: 'Contact & Feedback — Toolora',
    description: 'Contact Toolora. Suggest new free tools, submit technical feedback, or share ideas with our team.',
    priority: '0.5',
    changefreq: 'monthly',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Contact & Feedback', item: `${SITE_URL}/contact` },
      ],
    },
  },
  {
    path: 'privacy',
    title: 'Privacy Policy — Toolora',
    description: 'Toolora privacy policy. Learn how all image, file, and utility operations run locally in your browser with zero data collection.',
    priority: '0.4',
    changefreq: 'monthly',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: `${SITE_URL}/privacy` },
      ],
    },
  },
  {
    path: 'terms',
    title: 'Terms of Service — Toolora',
    description: 'Terms of service for using Toolora and our suite of free online browser utilities.',
    priority: '0.4',
    changefreq: 'monthly',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: `${SITE_URL}/terms` },
      ],
    },
  },
  {
    path: 'disclaimer',
    title: 'Disclaimer — Toolora',
    description: 'Disclaimer and terms of accuracy for calculations and file transformations performed on Toolora.',
    priority: '0.4',
    changefreq: 'monthly',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Disclaimer', item: `${SITE_URL}/disclaimer` },
      ],
    },
  },
];

const categoryPages: PageMetadata[] = CATEGORIES.map((cat) => {
  const catTools = TOOLS.filter((t) =>
    cat.id === 'student-utility'
      ? t.category === 'student' || t.category === 'utility' || t.category === 'student-utility'
      : t.category === cat.id
  );

  return {
    path: `category/${cat.slug}`,
    title: `${cat.title} — Free Online Utilities | Toolora`,
    description: cat.description,
    priority: '0.85',
    changefreq: 'weekly',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${cat.title} — Toolora`,
        description: cat.description,
        url: `${SITE_URL}/category/${cat.slug}`,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: catTools.map((t, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            url: `${SITE_URL}/tools/${t.slug}`,
            name: t.name,
          })),
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: cat.title, item: `${SITE_URL}/category/${cat.slug}` },
        ],
      },
    ],
  };
});

const toolPages: PageMetadata[] = TOOLS.map((tool) => {
  const categorySlug =
    tool.category === 'image'
      ? 'image-tools'
      : tool.category === 'pdf'
      ? 'pdf-tools'
      : tool.category === 'student'
      ? 'student-tools'
      : 'utility-tools';
  const categoryName =
    tool.category === 'image'
      ? 'Image Tools'
      : tool.category === 'pdf'
      ? 'PDF Tools'
      : tool.category === 'student'
      ? 'Student Tools'
      : 'Utilities';

  const schemas: any[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: tool.name,
      url: `${SITE_URL}/tools/${tool.slug}`,
      description: tool.detailedDescription || tool.description,
      applicationCategory: tool.category === 'image' ? 'MultimediaApplication' : 'UtilitiesApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: categoryName, item: `${SITE_URL}/category/${categorySlug}` },
        { '@type': 'ListItem', position: 3, name: tool.name, item: `${SITE_URL}/tools/${tool.slug}` },
      ],
    },
  ];

  if (tool.faq && tool.faq.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: tool.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  return {
    path: `tools/${tool.slug}`,
    title: tool.metaTitle || `${tool.name} — Toolora`,
    description: tool.metaDescription || tool.description,
    priority: tool.isPopular || tool.isFeatured ? '0.8' : '0.75',
    changefreq: 'weekly',
    schema: schemas,
  };
});

const guidesHubPage: PageMetadata = {
  path: 'guides',
  title: 'Practical Guides & Browser Tool Tutorials — Toolora',
  description: 'Clear, practical tutorials on image compression, format selection, resizing without quality loss, and converting images to PDF directly in your browser.',
  priority: '0.85',
  changefreq: 'weekly',
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Practical Guides & Browser Tool Tutorials — Toolora',
      description: 'Clear tutorials and guides for everyday digital tools.',
      url: `${SITE_URL}/guides`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guides` },
      ],
    },
  ],
};

const guidePages: PageMetadata[] = GUIDES.map((guide) => ({
  path: `guides/${guide.slug}`,
  title: guide.metaTitle,
  description: guide.metaDescription,
  priority: '0.8',
  changefreq: 'monthly',
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guide.summary,
      url: `${SITE_URL}/guides/${guide.slug}`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/guides/${guide.slug}`,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Toolora',
        url: `${SITE_URL}/`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guides` },
        { '@type': 'ListItem', position: 3, name: guide.title, item: `${SITE_URL}/guides/${guide.slug}` },
      ],
    },
  ],
}));

const allPages: PageMetadata[] = [
  ...staticPages,
  guidesHubPage,
  ...guidePages,
  ...categoryPages,
  ...toolPages,
];

function serializeSchema(schema: Record<string, any> | Array<Record<string, any>>): string {
  if (Array.isArray(schema)) {
    if (schema.length === 1) {
      return JSON.stringify(schema[0], null, 2);
    }
    const cleanSchemas = schema.map((s) => {
      const { '@context': _, ...rest } = s;
      return rest;
    });
    return JSON.stringify({ '@context': 'https://schema.org', '@graph': cleanSchemas }, null, 2);
  }
  return JSON.stringify(schema, null, 2);
}

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

  // Inject JSON-LD Schema
  if (page.schema) {
    const jsonLd = serializeSchema(page.schema);
    const scriptBlock = `  <script id="seo-structured-data" type="application/ld+json">\n${jsonLd}\n  </script>\n</head>`;
    updated = updated.replace('</head>', scriptBlock);
  }

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

// Update dist/index.html (Homepage root) with WebSite Schema
const homepageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Toolora',
  url: `${SITE_URL}/`,
  description: 'Everyday tools, made simple. Fast, free tools for images, files, calculations and everyday tasks.',
};
let homepageHtml = baseHtml;
const hpJsonLd = serializeSchema(homepageSchema);
homepageHtml = homepageHtml.replace('</head>', `  <script id="seo-structured-data" type="application/ld+json">\n${hpJsonLd}\n  </script>\n</head>`);
fs.writeFileSync(path.join(distDir, 'index.html'), homepageHtml);

// Generate 404.html
const notFoundPage: PageMetadata = {
  path: '404',
  title: 'Page Not Found — Toolora',
  description: 'The requested tool or page could not be found on Toolora.',
  noindex: true,
};
const notFoundHtml = customizeHtml(baseHtml, notFoundPage);
fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml);

// Generate valid XML Sitemap directly from the registry
const sitemapUrls: Array<{ loc: string; lastmod: string; changefreq: string; priority: string }> = [
  { loc: `${SITE_URL}/`, lastmod: TODAY, changefreq: 'daily', priority: '1.0' },
  ...allPages.map((p) => ({
    loc: `${SITE_URL}/${p.path}`,
    lastmod: TODAY,
    changefreq: p.changefreq || 'weekly',
    priority: p.priority || '0.7',
  })),
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml);

console.log(`Generated static routes: ${generatedCount} pages + 404.html in dist.`);
console.log(`Generated sitemap.xml with ${sitemapUrls.length} verified production URLs in public/ and dist/.`);
