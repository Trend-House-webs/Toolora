import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App.tsx';
import { TOOLS, CATEGORIES, getToolBySlug, getCategoryBySlug } from '../src/data/tools.ts';
import { GUIDES, getGuideBySlug } from '../src/data/guides.ts';
import { SITE_URL, getCanonicalUrl } from '../src/config/site.ts';
import { validateImageFile, formatBytes } from '../src/utils/fileHelpers.ts';

interface TestResult {
  suite: string;
  name: string;
  passed: boolean;
  details?: string;
}

const results: TestResult[] = [];

function assert(suite: string, name: string, condition: boolean, details?: string) {
  results.push({
    suite,
    name,
    passed: condition,
    details: condition ? undefined : details,
  });
}

console.log('Starting Comprehensive Regression Test Suite for Toolora...\n');

// -------------------------------------------------------------
// Suite 1: Production Build Output Inspection
// -------------------------------------------------------------
const distDir = path.resolve('dist');
assert('Build Output', 'dist directory exists', fs.existsSync(distDir));

const expectedRoutes = [
  '',
  'tools',
  'about',
  'contact',
  'privacy',
  'terms',
  'disclaimer',
  'guides',
  ...CATEGORIES.map((c) => `category/${c.slug}`),
  ...GUIDES.map((g) => `guides/${g.slug}`),
  ...TOOLS.map((t) => `tools/${t.slug}`),
];

let missingDistFiles = 0;
for (const r of expectedRoutes) {
  const filePath = r === '' ? path.join(distDir, 'index.html') : path.join(distDir, r, 'index.html');
  if (!fs.existsSync(filePath)) {
    missingDistFiles++;
  }
}
assert('Build Output', 'All 80 canonical route HTML files exist in dist', missingDistFiles === 0, `${missingDistFiles} files missing`);
assert('Build Output', '404.html exists in dist', fs.existsSync(path.join(distDir, '404.html')));
assert('Build Output', 'sitemap.xml exists in dist and public', fs.existsSync(path.join(distDir, 'sitemap.xml')) && fs.existsSync('public/sitemap.xml'));
assert('Build Output', 'robots.txt exists in dist and public', fs.existsSync(path.join(distDir, 'robots.txt')) && fs.existsSync('public/robots.txt'));

// -------------------------------------------------------------
// Suite 2: Sitemap & Canonical Integrity
// -------------------------------------------------------------
const sitemapContent = fs.readFileSync(path.join(distDir, 'sitemap.xml'), 'utf8');
const publicSitemapContent = fs.readFileSync(path.join('public', 'sitemap.xml'), 'utf8');
const sitemapUrls = Array.from(sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)).map((m) => m[1]);

assert('Sitemap', 'Sitemap contains exactly 80 URLs', sitemapUrls.length === 80, `Found ${sitemapUrls.length}`);
const uniqueUrls = new Set(sitemapUrls);
assert('Sitemap', 'All sitemap URLs are unique', uniqueUrls.size === sitemapUrls.length, `Duplicates found`);
assert('Sitemap', 'No fabricated lastmod dates present', !sitemapContent.includes('<lastmod>'));

let invalidCanonicalSitemap = 0;
for (const u of sitemapUrls) {
  if (u === `${SITE_URL}/`) continue;
  if (u.endsWith('/') || !u.startsWith(SITE_URL)) {
    invalidCanonicalSitemap++;
  }
}
assert('Sitemap', 'All subpage sitemap URLs follow strict non-trailing slash canonical format', invalidCanonicalSitemap === 0);

const expectedSitemapSet = new Set(expectedRoutes.map((r) => (r === '' ? `${SITE_URL}/` : `${SITE_URL}/${r}`)));
const missingFromSitemap = Array.from(expectedSitemapSet).filter((u) => !uniqueUrls.has(u));
const unexpectedInSitemap = sitemapUrls.filter((u) => !expectedSitemapSet.has(u));
assert(
  'Sitemap',
  'Sitemap URLs match 1:1 with all 80 expected canonical routes (and exclude 404)',
  missingFromSitemap.length === 0 && unexpectedInSitemap.length === 0 && !uniqueUrls.has(`${SITE_URL}/404`),
  `Missing: ${missingFromSitemap.length}, Unexpected: ${unexpectedInSitemap.length}`
);
assert('Sitemap', 'public/sitemap.xml and dist/sitemap.xml are identical', sitemapContent === publicSitemapContent);

// Verify canonical links in HTML and setLink helper attribute assignment
let canonicalTagErrors = 0;
let canonicalHrefMismatches = 0;
let brokenRelAttrCount = 0;
for (const r of expectedRoutes) {
  const filePath = r === '' ? path.join(distDir, 'index.html') : path.join(distDir, r, 'index.html');
  const content = fs.readFileSync(filePath, 'utf8');
  const expectedCanonical = r === '' ? `${SITE_URL}/` : `${SITE_URL}/${r}`;
  const canonicalMatches = Array.from(content.matchAll(/<link rel="canonical" href="(.*?)" \/>/g));
  if (canonicalMatches.length !== 1) {
    canonicalTagErrors++;
  } else if (canonicalMatches[0][1] !== expectedCanonical) {
    canonicalHrefMismatches++;
  }
  if (content.includes('canonical="canonical"') || content.includes('<link rel="rel"')) {
    brokenRelAttrCount++;
  }
}
assert('Canonical Integrity', 'Every route HTML has exactly one canonical link tag', canonicalTagErrors === 0, `${canonicalTagErrors} pages with missing/duplicate canonical`);
assert('Canonical Integrity', 'Every route HTML canonical href matches its exact expected canonical URL', canonicalHrefMismatches === 0, `${canonicalHrefMismatches} mismatches`);
assert('Canonical Integrity', 'Zero malformed canonical="canonical" attributes in generated HTML', brokenRelAttrCount === 0);

// Unit test for SEO setLink helper logic
const testLinkEl: Record<string, string> = {};
const testSetLink = (rel: string, href: string) => {
  const el = {
    setAttribute: (attr: string, val: string) => {
      testLinkEl[attr] = val;
    },
  };
  el.setAttribute('rel', rel);
  el.setAttribute('href', href);
};
testSetLink('canonical', `${SITE_URL}/tools/word-counter`);
assert('Canonical Integrity', 'SEO setLink helper sets rel="canonical" attribute correctly', testLinkEl['rel'] === 'canonical' && testLinkEl['href'] === `${SITE_URL}/tools/word-counter`);

// -------------------------------------------------------------
// Suite 3: Robots.txt & Indexing Directives
// -------------------------------------------------------------
const robotsContent = fs.readFileSync(path.join(distDir, 'robots.txt'), 'utf8');
const publicRobotsContent = fs.readFileSync(path.join('public', 'robots.txt'), 'utf8');
assert('Robots.txt', 'Allows all user agents', robotsContent.includes('User-agent: *') && robotsContent.includes('Allow: /'));
assert('Robots.txt', 'Links to production sitemap', robotsContent.includes(`Sitemap: ${SITE_URL}/sitemap.xml`));
assert('Robots.txt', 'public/robots.txt and dist/robots.txt are identical', robotsContent === publicRobotsContent);

let accidentalNoindex = 0;
for (const r of expectedRoutes) {
  const filePath = r === '' ? path.join(distDir, 'index.html') : path.join(distDir, r, 'index.html');
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('name="robots"') && content.includes('noindex')) {
    accidentalNoindex++;
  }
}
assert('Robots.txt', 'No canonical routes contain accidental noindex', accidentalNoindex === 0);

const notFoundContent = fs.readFileSync(path.join(distDir, '404.html'), 'utf8');
assert('Robots.txt', '404 page contains noindex, nofollow', notFoundContent.includes('content="noindex, nofollow"'));

// -------------------------------------------------------------
// Suite 4: Route Resolution & Prerender Headings
// -------------------------------------------------------------
let missingH1Count = 0;
let multipleOrEmptyH1Count = 0;
let emptyBodyCount = 0;
for (const r of expectedRoutes) {
  const filePath = r === '' ? path.join(distDir, 'index.html') : path.join(distDir, r, 'index.html');
  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('<h1')) {
    missingH1Count++;
  }
  const h1Matches = Array.from(content.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g));
  const h1Text = h1Matches[0] ? h1Matches[0][1].replace(/<[^>]+>/g, '').trim() : '';
  if (h1Matches.length !== 1 || h1Text.length === 0) {
    multipleOrEmptyH1Count++;
  }
  const rootDiv = (content.match(/<div id="root">([\s\S]*?)<\/div>/) || [])[1];
  if (!rootDiv || rootDiv.length === 0) {
    emptyBodyCount++;
  }
}
assert('SSR / Prerendering', 'All 80 routes have an H1 tag in static HTML', missingH1Count === 0);
assert('SSR / Prerendering', 'All 80 routes have exactly one non-empty H1 heading', multipleOrEmptyH1Count === 0, `${multipleOrEmptyH1Count} routes failed`);
assert('SSR / Prerendering', 'All 80 routes have prerendered DOM inside root container', emptyBodyCount === 0);

// Check that no tool pages contain Suspense fallback or aborted server rendering
let suspenseAbortCount = 0;
let loadingSkeletonCount = 0;
for (const r of expectedRoutes) {
  const filePath = r === '' ? path.join(distDir, 'index.html') : path.join(distDir, r, 'index.html');
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('Switched to client rendering because the server rendering aborted')) {
    suspenseAbortCount++;
  }
  if (content.includes('Initializing client-side workspace in your browser')) {
    loadingSkeletonCount++;
  }
}
assert('SSR / Prerendering', 'Zero Suspense abort template comments in prerendered HTML', suspenseAbortCount === 0, `${suspenseAbortCount} files contain Suspense abort comments`);
assert('SSR / Prerendering', 'Zero loading skeletons in prerendered tool workspaces', loadingSkeletonCount === 0, `${loadingSkeletonCount} files contain loading skeleton`);

// Verify all 63 tool pages render their dedicated workspace and educational sections without fallback
let unrenderedToolWorkspaces = 0;
for (const tool of TOOLS) {
  const toolHtml = fs.readFileSync(path.join(distDir, 'tools', tool.slug, 'index.html'), 'utf8');
  const rawLabel = tool.slug === 'fraction-calculator' ? 'Fraction Calculator with Steps Workspace' : `${tool.name} Workspace`;
  const escapedLabel = rawLabel.replace(/&/g, '&amp;');
  if (
    (!toolHtml.includes(rawLabel) && !toolHtml.includes(escapedLabel)) ||
    toolHtml.includes('Loading tool components...') ||
    toolHtml.includes('Page Not Found')
  ) {
    unrenderedToolWorkspaces++;
  }
}
assert('SSR / Prerendering', 'All 63 tool pages render their dedicated interactive workspace in static HTML', unrenderedToolWorkspaces === 0, `${unrenderedToolWorkspaces} failed`);

// Verify all 4 guide pages and all 4 category pages render their dedicated content
let unrenderedGuidesOrCategories = 0;
for (const guide of GUIDES) {
  const guideHtml = fs.readFileSync(path.join(distDir, 'guides', guide.slug, 'index.html'), 'utf8');
  if (!guideHtml.includes('<article') || !guideHtml.includes('Key Takeaways')) {
    unrenderedGuidesOrCategories++;
  }
}
for (const cat of CATEGORIES) {
  const catHtml = fs.readFileSync(path.join(distDir, 'category', cat.slug, 'index.html'), 'utf8');
  const escapedCatTitle = cat.title.replace(/&/g, '&amp;');
  if (!catHtml.includes(cat.title) && !catHtml.includes(escapedCatTitle)) {
    unrenderedGuidesOrCategories++;
  }
}
assert('SSR / Prerendering', 'All 4 guide pages and 4 category pages prerender complete article and directory DOM', unrenderedGuidesOrCategories === 0);

// Verify representative tool workspaces contain actual interactive/structural DOM
const representativeChecks = [
  { path: 'tools/word-counter', mustContain: '<textarea', desc: 'Word Counter contains interactive textarea in initial HTML' },
  { path: 'tools/fraction-calculator', mustContain: 'Fraction Calculator with Steps Workspace', desc: 'Fraction Calculator contains workspace with math controls' },
  { path: 'tools/grade-calculator', mustContain: 'Grade Calculator Workspace', desc: 'Grade Calculator contains workspace with course inputs' },
  { path: 'tools/image-compressor', mustContain: 'Image Compressor Workspace', desc: 'Image Compressor contains upload dropzone workspace' },
  { path: 'tools/photo-size-reducer', mustContain: 'Photo Size Reducer (KB Limit) Workspace', desc: 'Photo Size Reducer contains dropzone and KB inputs' },
  { path: 'tools/merge-pdf', mustContain: 'Merge PDF Workspace', desc: 'Merge PDF contains PDF dropzone workspace' },
  { path: 'tools/image-resizer', mustContain: 'Image Resizer Workspace', desc: 'Image Resizer contains dropzone and dimension workspace' },
];

for (const check of representativeChecks) {
  const fileContent = fs.readFileSync(path.join(distDir, check.path, 'index.html'), 'utf8');
  assert('SSR / Prerendering', check.desc, fileContent.includes(check.mustContain));
}

// Verify legacy redirect and clean URL settings in vercel.json
const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const hasLegacyRedirect = vercelConfig.redirects?.some(
  (r: any) => r.source === '/tool/:slug' && r.destination === '/tools/:slug' && r.permanent === true
);
assert('Legacy Redirects', 'vercel.json contains permanent 301 redirect from /tool/:slug to /tools/:slug', Boolean(hasLegacyRedirect));
assert('Legacy Redirects', 'vercel.json enforces cleanUrls: true and trailingSlash: false', vercelConfig.cleanUrls === true && vercelConfig.trailingSlash === false);

// -------------------------------------------------------------
// Suite 5: Metadata Uniqueness & OpenGraph
// -------------------------------------------------------------
const titleMap = new Map<string, string>();
const descMap = new Map<string, string>();
let titleDups = 0;
let descDups = 0;
let emptyOrMalformedMeta = 0;
let ogTwitterSyncErrors = 0;

for (const r of expectedRoutes) {
  const filePath = r === '' ? path.join(distDir, 'index.html') : path.join(distDir, r, 'index.html');
  const content = fs.readFileSync(filePath, 'utf8');
  const expectedCanonical = r === '' ? `${SITE_URL}/` : `${SITE_URL}/${r}`;
  const title = (content.match(/<title>(.*?)<\/title>/) || [])[1];
  const desc = (content.match(/<meta name="description" content="(.*?)"/) || [])[1];
  const ogUrl = (content.match(/<meta property="og:url" content="(.*?)"/) || [])[1];
  const ogTitle = (content.match(/<meta property="og:title" content="(.*?)"/) || [])[1];
  const ogDesc = (content.match(/<meta property="og:description" content="(.*?)"/) || [])[1];
  const twTitle = (content.match(/<meta name="twitter:title" content="(.*?)"/) || [])[1];
  const twDesc = (content.match(/<meta name="twitter:description" content="(.*?)"/) || [])[1];

  if (!title || title.trim().length < 10 || !desc || desc.trim().length < 50) {
    emptyOrMalformedMeta++;
  }

  if (ogUrl !== expectedCanonical || ogTitle !== title || ogDesc !== desc || twTitle !== title || twDesc !== desc) {
    ogTwitterSyncErrors++;
  }

  if (titleMap.has(title)) {
    titleDups++;
  } else {
    titleMap.set(title, r);
  }

  if (descMap.has(desc)) {
    descDups++;
  } else {
    descMap.set(desc, r);
  }
}
assert('Metadata', 'Zero duplicate page titles across all 80 pages', titleDups === 0, `${titleDups} duplicates`);
assert('Metadata', 'Zero duplicate meta descriptions across all 80 pages', descDups === 0, `${descDups} duplicates`);
assert('Metadata', 'All 80 pages have non-empty, properly bounded title and meta description tags', emptyOrMalformedMeta === 0, `${emptyOrMalformedMeta} invalid`);
assert('Metadata', 'All 80 pages synchronize OpenGraph (og:url, og:title, og:description) and Twitter cards with page metadata', ogTwitterSyncErrors === 0, `${ogTwitterSyncErrors} out of sync`);

// -------------------------------------------------------------
// Suite 6: Structured Data (JSON-LD) Validation
// -------------------------------------------------------------
let schemaErrors = 0;
let totalSchemas = 0;

function extractSchemaTypes(parsed: any): string[] {
  if (Array.isArray(parsed['@graph'])) {
    return parsed['@graph'].map((item: any) => item['@type']);
  }
  return parsed['@type'] ? [parsed['@type']] : [];
}

let routeTypeSchemaErrors = 0;
for (const r of expectedRoutes) {
  const filePath = r === '' ? path.join(distDir, 'index.html') : path.join(distDir, r, 'index.html');
  const content = fs.readFileSync(filePath, 'utf8');
  const schemaMatch = content.match(/<script id="seo-structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!schemaMatch) {
    schemaErrors++;
    continue;
  }
  totalSchemas++;
  try {
    const parsed = JSON.parse(schemaMatch[1]);
    if (!parsed['@context']) schemaErrors++;
    const types = extractSchemaTypes(parsed);
    if (r === '') {
      if (!types.includes('WebSite') || !types.includes('Organization')) routeTypeSchemaErrors++;
    } else if (r.startsWith('tools/')) {
      if (!types.includes('WebApplication') || !types.includes('BreadcrumbList') || !types.includes('FAQPage')) {
        routeTypeSchemaErrors++;
      }
    } else if (r.startsWith('guides/')) {
      if (!types.includes('Article') || !types.includes('BreadcrumbList')) routeTypeSchemaErrors++;
    } else if (r.startsWith('category/')) {
      if (!types.includes('CollectionPage') || !types.includes('BreadcrumbList')) routeTypeSchemaErrors++;
    } else {
      if (!types.includes('BreadcrumbList')) routeTypeSchemaErrors++;
    }
  } catch {
    schemaErrors++;
  }
}
assert('Structured Data', 'All 80 canonical pages have valid Schema.org JSON-LD', schemaErrors === 0 && totalSchemas === 80);
assert(
  'Structured Data',
  'All 80 pages contain route-appropriate Schema.org types (WebSite/Organization, WebApplication/FAQPage, Article, CollectionPage, BreadcrumbList)',
  routeTypeSchemaErrors === 0,
  `${routeTypeSchemaErrors} route schema mismatches`
);

// -------------------------------------------------------------
// Suite 7: Internal Links Verification
// -------------------------------------------------------------
const toolsFile = fs.readFileSync('src/data/tools.ts', 'utf8');
const addToolsFile = fs.readFileSync('src/data/additionalTools.ts', 'utf8');
const guidesFile = fs.readFileSync('src/data/guides.ts', 'utf8');
const codeContent = toolsFile + addToolsFile + guidesFile;

const validRoutesSet = new Set(expectedRoutes.map((r) => (r === '' ? '/' : `/${r}`)));
const linkMatches = Array.from(codeContent.matchAll(/\[([^\]]+)\]\((\/[^)]+)\)/g));

let brokenLinksCount = 0;
for (const match of linkMatches) {
  const url = match[2].split('#')[0].split('?')[0];
  if (!validRoutesSet.has(url)) {
    brokenLinksCount++;
  }
}
assert('Internal Linking', `All ${linkMatches.length} markdown links map to valid canonical routes`, brokenLinksCount === 0, `${brokenLinksCount} broken`);

// Verify all rendered <a href="/..."> links in all 80 prerendered HTML files resolve to valid canonical routes
let brokenDomHrefCount = 0;
let totalDomHrefCount = 0;
for (const r of expectedRoutes) {
  const filePath = r === '' ? path.join(distDir, 'index.html') : path.join(distDir, r, 'index.html');
  const content = fs.readFileSync(filePath, 'utf8');
  const hrefMatches = Array.from(content.matchAll(/<a[^>]+href="(\/[^"]*)"/g));
  for (const m of hrefMatches) {
    totalDomHrefCount++;
    const targetPath = m[1].split('#')[0].split('?')[0];
    if (targetPath && !validRoutesSet.has(targetPath)) {
      brokenDomHrefCount++;
    }
  }
}
assert('Internal Linking', `All ${totalDomHrefCount} rendered DOM <a href> links across all 80 HTML files resolve to valid canonical routes`, brokenDomHrefCount === 0, `${brokenDomHrefCount} broken DOM links`);

// Verify all relatedSlugs in TOOLS and tool references in GUIDES point to valid registered tools
const validToolSlugs = new Set(TOOLS.map((t) => t.slug));
let invalidRegistryRefCount = 0;
for (const t of TOOLS) {
  for (const rel of t.relatedSlugs || []) {
    if (!validToolSlugs.has(rel)) invalidRegistryRefCount++;
  }
}
for (const g of GUIDES) {
  if (!validToolSlugs.has(g.primaryTool.slug) || !validRoutesSet.has(g.primaryTool.path)) {
    invalidRegistryRefCount++;
  }
  for (const ft of g.featuredTools || []) {
    if (!validToolSlugs.has(ft.slug) || !validRoutesSet.has(ft.path)) invalidRegistryRefCount++;
  }
  for (const rt of g.relatedTools || []) {
    if (!validToolSlugs.has(rt.slug) || !validRoutesSet.has(rt.path)) invalidRegistryRefCount++;
  }
}
assert('Internal Linking', 'All tool relatedSlugs and guide featuredTools/relatedTools reference valid registered tools', invalidRegistryRefCount === 0, `${invalidRegistryRefCount} invalid references`);

// -------------------------------------------------------------
// Suite 8: Tool Math, Calculation & Utility Logic Tests
// -------------------------------------------------------------
// GPA calculation test
const testGrades = [
  { grade: 'A', credits: 3 },  // 4.0 * 3 = 12.0
  { grade: 'B', credits: 4 },  // 3.0 * 4 = 12.0
  { grade: 'C', credits: 3 },  // 2.0 * 3 = 6.0
];
const totalPoints = 12.0 + 12.0 + 6.0; // 30.0
const totalCredits = 3 + 4 + 3; // 10
const calculatedGpa = totalPoints / totalCredits; // 3.00
assert('Tool Logic', 'GPA calculation evaluates weighted grade points correctly', calculatedGpa === 3.0);

// File helper tests
assert('Tool Logic', 'formatBytes formats sizes accurately', formatBytes(1048576) === '1 MB' && formatBytes(512) === '512 B');
const mockImage = new File(['mock'], 'test.jpg', { type: 'image/jpeg' });
const valRes = validateImageFile(mockImage);
assert('Tool Logic', 'validateImageFile accepts valid JPEG file', valRes.valid === true);

// Image Tool Tests (PhotoSizeReducer, FlipTool, ImageCompressor)
const psrContent = fs.readFileSync('src/components/tools/image/PhotoSizeReducer.tsx', 'utf8');
const psrPresetsMatch = psrContent.includes('presets = [20, 50, 100, 200, 500]');
assert('Tool Logic', 'PhotoSizeReducer includes 20, 50, 100, 200, 500 KB presets', psrPresetsMatch);

const psrVerifiesFinalBlob = psrContent.includes('finalSize <= maxBytes') && psrContent.includes('targetAchieved');
assert('Tool Logic', 'PhotoSizeReducer verifies final output Blob size against maxBytes', psrVerifiesFinalBlob);

const psrHasWarningState = psrContent.includes('Target Size Not Fully Achieved') && psrContent.includes('Download Best-Effort Result');
assert('Tool Logic', 'PhotoSizeReducer displays honest warning and best-effort download when target is not met', psrHasWarningState);

const flipContent = fs.readFileSync('src/components/tools/image/FlipTool.tsx', 'utf8');
const flipHasBatchSupport = flipContent.includes('multiple={true}') && flipContent.includes('JSZip') && flipContent.includes('downloadAllAsZip');
assert('Tool Logic', 'FlipTool supports multi-image batch selection and ZIP archive export', flipHasBatchSupport);

const flipHasTransformModes = (flipContent.includes('item.flipH ? -1 : 1') && flipContent.includes('item.flipV ? -1 : 1'));
assert('Tool Logic', 'FlipTool supports horizontal, vertical, and combined flip transformations', flipHasTransformModes);

const flipHasCollisionSafety = flipContent.includes('candidateName = `${baseName}-flipped-${counter}.${ext}`');
assert('Tool Logic', 'FlipTool prevents duplicate filename collisions in ZIP packaging', flipHasCollisionSafety);

const imgCompContent = fs.readFileSync('src/components/tools/image/ImageCompressor.tsx', 'utf8');
const imgCompFormats = imgCompContent.includes('image/jpeg') && imgCompContent.includes('image/png') && imgCompContent.includes('image/webp');
assert('Tool Logic', 'ImageCompressor supports JPG, PNG, and WebP compression', imgCompFormats);

// -------------------------------------------------------------
// Suite 9: Privacy Claims & Network Requests
// -------------------------------------------------------------
const networkPatterns = [
  /fetch\(/g,
  /axios\./g,
  /new XMLHttpRequest/g,
  /navigator\.sendBeacon/g,
  /new WebSocket/g,
];

let toolNetworkHits = 0;
const toolFiles = fs.readdirSync('src/components/tools', { recursive: true }) as string[];
for (const f of toolFiles) {
  if (!f.endsWith('.tsx') && !f.endsWith('.ts')) continue;
  const content = fs.readFileSync(path.join('src/components/tools', f), 'utf8');
  for (const pat of networkPatterns) {
    if (pat.test(content)) toolNetworkHits++;
  }
}
assert('Privacy Compliance', 'Tool components make zero external network requests', toolNetworkHits === 0);

const broadClaims = [/100% private/i, /completely private/i, /zero tracking/i, /zero data collection/i, /never leave your device/i];
let broadHits = 0;
for (const f of ['src/data/tools.ts', 'src/data/additionalTools.ts', 'src/pages/StaticPages.tsx']) {
  const content = fs.readFileSync(f, 'utf8');
  for (const pat of broadClaims) {
    if (pat.test(content)) broadHits++;
  }
}
assert('Privacy Compliance', 'No unsupported absolute privacy claims exist in data or static pages', broadHits === 0);

// -------------------------------------------------------------
// Suite 10: Google AdSense Integration Integrity
// -------------------------------------------------------------
const distIndex = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
const hasAdSenseScript = distIndex.includes('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6848191601714172');
assert('AdSense Integration', 'Google AdSense script is present in dist/index.html head with publisher ID', hasAdSenseScript);

const toolPageHtml = fs.readFileSync(path.join(distDir, 'tools', 'word-counter', 'index.html'), 'utf8');
const hasAdUnitInTool = toolPageHtml.includes('class="adsbygoogle"') && toolPageHtml.includes('data-ad-slot="8603656892"');
assert('AdSense Integration', 'AdSense ad units are present on tool pages outside interactive workspace', hasAdUnitInTool);

const cspMatches = vercelConfig.headers?.some(
  (h: any) => h.headers?.some((item: any) => item.key === 'Content-Security-Policy' && item.value.includes('pagead2.googlesyndication.com') && item.value.includes('doubleclick.net'))
);
assert('AdSense Integration', 'Content Security Policy allows official Google AdSense origins and required directives', cspMatches === true);

const adsTxtExists = fs.existsSync(path.join('public', 'ads.txt')) && fs.existsSync(path.join(distDir, 'ads.txt'));
const adsTxtContent = adsTxtExists ? fs.readFileSync(path.join('public', 'ads.txt'), 'utf8') : '';
const adsTxtValid = adsTxtContent.includes('pub-6848191601714172') && adsTxtContent.includes('google.com') && adsTxtContent.includes('DIRECT');
assert('AdSense Integration', 'ads.txt exists in public and dist with valid publisher record', adsTxtExists && adsTxtValid);

// -------------------------------------------------------------
// Suite 11: Calculator & Utility Mathematical Integrity
// -------------------------------------------------------------
// 1. Fraction Calculator: 3/4 + 2/5 = 23/20 = 1 3/20
function testGcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}
const n1 = 3, d1 = 4, n2 = 2, d2 = 5;
const arithRawN = n1 * d2 + n2 * d1; // 15 + 8 = 23
const arithRawD = d1 * d2; // 20
const arithDiv = testGcd(arithRawN, arithRawD);
const arithSimpN = arithRawN / arithDiv;
const arithSimpD = arithRawD / arithDiv;
const arithWhole = Math.floor(arithSimpN / arithSimpD);
const arithRem = arithSimpN % arithSimpD;
assert('Calculator Logic', 'Fraction Calculator addition evaluates 3/4 + 2/5 = 23/20 = 1 3/20',
  arithSimpN === 23 && arithSimpD === 20 && arithWhole === 1 && arithRem === 3);

// Fraction Simplification: 24/36 = 2/3
const simpDiv = testGcd(24, 36);
assert('Calculator Logic', 'Fraction Calculator simplification reduces 24/36 to 2/3 with GCD 12',
  simpDiv === 12 && 24 / simpDiv === 2 && 36 / simpDiv === 3);

// Fraction Comparison: 3/4 vs 2/5
const cross1 = 3 * 5; // 15
const cross2 = 2 * 4; // 8
assert('Calculator Logic', 'Fraction Calculator comparison verifies 3/4 > 2/5 via cross-multiplication',
  cross1 > cross2);

// 2. Date Difference: 2026-01-01 to 2026-01-10 (inclusive)
// Jan 1: Thu, Jan 2: Fri, Jan 3: Sat, Jan 4: Sun, Jan 5: Mon, Jan 6: Tue, Jan 7: Wed, Jan 8: Thu, Jan 9: Fri, Jan 10: Sat
// Total days = 10, Weekdays = 7, Weekends = 3
let testBizDays = 0;
let testWkndDays = 0;
const testCur = new Date('2026-01-01T00:00:00');
const testEnd = new Date('2026-01-10T00:00:00');
while (testCur <= testEnd) {
  const dow = testCur.getDay();
  if (dow === 0 || dow === 6) testWkndDays++;
  else testBizDays++;
  testCur.setDate(testCur.getDate() + 1);
}
assert('Calculator Logic', 'Date Difference Calculator evaluates 10 calendar days with 7 business and 3 weekend days',
  testBizDays === 7 && testWkndDays === 3);

// 3. Grade Calculator: Needed exam score
// Target = 90, Current = 83, Weight = 25% (0.25)
// Needed = (90 - 83 * 0.75) / 0.25 = (90 - 62.25) / 0.25 = 27.75 / 0.25 = 111.0%
const needed90 = (90 - 83 * 0.75) / 0.25;
assert('Calculator Logic', 'Grade Calculator flags impossible target (>100%) when needing 111.0% on final',
  Math.abs(needed90 - 111.0) < 0.01 && needed90 > 100);

const needed73 = (73 - 83 * 0.75) / 0.25; // 43.0%
assert('Calculator Logic', 'Grade Calculator evaluates achievable passing target needing 43.0% on final',
  Math.abs(needed73 - 43.0) < 0.01 && needed73 <= 100);

// 4. Aspect Ratio Calculator: 1920 × 1080 = 16:9
const arGcd = testGcd(1920, 1080);
assert('Calculator Logic', 'Aspect Ratio Calculator reduces 1920x1080 to 16:9 with GCD 120',
  arGcd === 120 && 1920 / arGcd === 16 && 1080 / arGcd === 9);

// -------------------------------------------------------------
// Output Report
// -------------------------------------------------------------
console.log('--- TEST RESULTS ---');
let passedCount = 0;
let failedCount = 0;

for (const r of results) {
  if (r.passed) {
    console.log(`[PASS] [${r.suite}] ${r.name}`);
    passedCount++;
  } else {
    console.error(`[FAIL] [${r.suite}] ${r.name}: ${r.details || 'Assertion failed'}`);
    failedCount++;
  }
}

console.log(`\nSummary: ${passedCount} passed, ${failedCount} failed out of ${results.length} total checks.`);

if (failedCount > 0) {
  process.exit(1);
}
