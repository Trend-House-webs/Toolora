import { useEffect } from 'react';
import { FAQItem } from '../../types';

export interface SEOProps {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'article';
  schema?: Record<string, any> | Array<Record<string, any>>;
  faqItems?: FAQItem[];
}

export function SEO({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  schema,
  faqItems,
}: SEOProps) {
  useEffect(() => {
    // 1. Document title
    document.title = title;

    // Helper to set or create meta tag
    const setMeta = (attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to set or create link tag
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://toolora.com';
    const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const canonicalUrl = `${origin}${cleanPath}`;

    // 2. Primary Meta Tags
    setMeta('name', 'description', description);
    setLink('canonical', canonicalUrl);

    // 3. Open Graph Tags
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:site_name', 'Toolora');

    // 4. Twitter Card Tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    // 5. Schema.org Structured Data
    const schemas: Array<Record<string, any>> = [];

    if (schema) {
      if (Array.isArray(schema)) {
        schemas.push(...schema);
      } else {
        schemas.push(schema);
      }
    }

    // Add FAQPage schema if matching visible FAQ items exist
    if (faqItems && faqItems.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      });
    }

    // Upsert Schema script tag
    let scriptTag = document.getElementById('seo-structured-data') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'seo-structured-data';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    if (schemas.length > 0) {
      scriptTag.textContent = JSON.stringify(
        schemas.length === 1 ? schemas[0] : { '@context': 'https://schema.org', '@graph': schemas },
        null,
        2
      );
    } else {
      scriptTag.textContent = '';
    }

    return () => {
      // Clean up script content on unmount
      if (scriptTag) {
        scriptTag.textContent = '';
      }
    };
  }, [title, description, canonicalPath, ogType, schema, faqItems]);

  return null;
}
