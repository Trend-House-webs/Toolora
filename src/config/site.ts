/**
 * Centralized Site & SEO Configuration for Toolora
 * Single source of truth for the production host and core metadata.
 */

export const SITE_URL = 'https://toolorahub.vercel.app';
export const SITE_NAME = 'Toolora';
export const SITE_TAGLINE = 'Everyday tools, made simple.';
export const SITE_DESCRIPTION =
  'Free online tools for everyday tasks: compress and resize images, merge and split PDFs, calculate GPA and percentages, and format text in your browser.';

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * Returns a normalized, single-source-of-truth canonical URL.
 * Trailing slash is preserved for the homepage root ('/'), and omitted for all subpages.
 */
export function getCanonicalUrl(path: string = ''): string {
  const cleanPath = path.trim().replace(/^\/+|\/+$/g, '');
  if (!cleanPath) {
    return `${SITE_URL}/`;
  }
  return `${SITE_URL}/${cleanPath}`;
}
