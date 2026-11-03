import React, { useEffect, useRef } from 'react';

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
 */
export function AdSenseBanner({
  slot = '8603656892',
  client = 'ca-pub-6848191601714172',
  format = 'auto',
  responsive = true,
  className = '',
  label = 'Advertisement',
}: AdSenseBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isPushedRef = useRef(false);

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
    >
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-1.5 select-none">
          <span className="text-[10px] font-medium tracking-wider uppercase text-slate-400">
            {label}
          </span>
        </div>

        <div className="min-h-[100px] sm:min-h-[120px] w-full flex items-center justify-center bg-slate-50/70 border border-slate-200/60 rounded-xl p-2 sm:p-3 overflow-hidden text-center">
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
