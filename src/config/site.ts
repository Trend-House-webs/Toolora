/**
 * Centralized Site & SEO Configuration for Toolora
 * Single source of truth for the production host and core metadata.
 */

export const SITE_URL = 'https://toolorahub.vercel.app';
export const SITE_NAME = 'Toolora';
export const SITE_TAGLINE = 'Everyday tools, made simple.';
export const SITE_DESCRIPTION =
  'Toolora provides fast, free tools for images, files, calculations and everyday tasks. Client-side browser tools with no sign-up.';

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
