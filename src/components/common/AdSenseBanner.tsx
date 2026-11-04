import React, { useEffect, useRef } from 'react';
import { ADSENSE_CONFIG, isAdSenseReady } from '../../config/adsense';

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

interface AdSenseBannerProps {
  slot?: string;
  client?: string;
  format?: string;
  responsive?: boolean;
  className?: string;
  label?: string;
}

/**
 * Reusable, responsive Google AdSense banner component.
 * Safely initializes adsbygoogle in React SPAs and handles client-side route changes,
 * SSR prerendering, and adblocker presence without throwing uncaught errors.
 * Returns null if AdSense configuration is disabled or not ready.
 */
export function AdSenseBanner({
  slot = ADSENSE_CONFIG.defaultSlot,
  client = ADSENSE_CONFIG.client,
  format = ADSENSE_CONFIG.defaultFormat,
  responsive = true,
  className = '',
  label = 'Advertisement',
}: AdSenseBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isPushedRef = useRef(false);

  // If AdSense is disabled or credentials are not configured, do not render or request
  if (!isAdSenseReady()) {
    return null;
  }

  useEffect(() => {
    // Only execute on browser client
    if (typeof window === 'undefined') return;

    // Avoid duplicate initialization on the same element instance
    if (isPushedRef.current) return;

    try {
      if (adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isPushedRef.current = true;
      }
    } catch (err) {
      // In React SPAs, duplicate push or adblocker blocking may throw a TagError.
      // Suppress gracefully so app execution and user experience never breaks.
      if (process.env.NODE_ENV !== 'production') {
        console.warn('AdSense push notice:', err);
      }
    }
  }, []);

  return (
    <div
      className={`my-8 sm:my-10 flex flex-col items-center justify-center overflow-hidden transition-all ${className}`}
      aria-label={label}
      style={{ contain: 'layout paint' }}
    >
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-1.5 select-none">
          <span className="text-[10px] font-medium tracking-wider uppercase text-slate-400">
            {label}
          </span>
        </div>

        <div className="min-h-[280px] sm:min-h-[250px] lg:min-h-[120px] w-full flex items-center justify-center bg-slate-50/70 border border-slate-200/60 rounded-xl p-2 sm:p-3 overflow-hidden text-center">
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', minWidth: '250px', width: '100%' }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={responsive ? 'true' : 'false'}
          />
        </div>
      </div>
    </div>
  );
}
