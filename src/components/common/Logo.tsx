import React from 'react';

export interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  variant?: 'light' | 'dark' | 'monochrome';
}

export interface IconProps {
  className?: string;
  variant?: 'default' | 'light' | 'dark' | 'monochrome';
  roundedWhiteBg?: boolean;
}

/**
 * Toolora Precision Apex "T" Icon
 * A luxury minimalist architectural geometric monogram representing the letter "T"
 * and modular precision tools.
 *
 * Designed with mathematically aligned 45° chamfers, balanced negative space,
 * and zero unnecessary gradient clutter for instant recognition across 16px to 512px.
 */
export function TooloraIcon({
  className = 'w-8 h-8',
  variant = 'default',
  roundedWhiteBg = false,
}: IconProps) {
  // If app icon mode with clean solid white background requested
  if (roundedWhiteBg) {
    return (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        {/* Crisp solid white container with subtle micro-border — strictly NO dark/navy background */}
        <rect x="2" y="2" width="60" height="60" rx="15" fill="#FFFFFF" />
        <rect x="2.5" y="2.5" width="59" height="59" rx="14.5" stroke="#E2E8F0" strokeWidth="1" />

        {/* Top Cantilever (Royal Cobalt #2563EB) */}
        <path
          d="M21 14.5 L47.5 14.5 C49.4 14.5 50.5 15.6 50.5 17.5 L50.5 20 C50.5 21.9 49.4 23 47.5 23 L15.5 23 C14.3 23 13.8 21.7 14.5 20.8 L18.8 15.6 C19.4 14.9 20.2 14.5 21 14.5 Z"
          fill="#2563EB"
        />

        {/* Vertical Keystone Monolith (Deep Sapphire #1D4ED8) */}
        <path
          d="M30.5 26.5 L37 26.5 C38.4 26.5 39.5 27.6 39.5 29 L39.5 46.5 C39.5 48.4 38 49.5 36 49.5 L29.5 49.5 C27.6 49.5 26.5 48.4 26.5 46.5 L26.5 30.5 C26.5 29.7 26.9 28.9 27.5 28.3 L29.3 26.9 C29.7 26.6 30.1 26.5 30.5 26.5 Z"
          fill="#1D4ED8"
        />
      </svg>
    );
  }

  // Color schemes based on variant
  let topBarFill = '#2563EB'; // Royal Cobalt
  let stemFill = '#1D4ED8';   // Deep Sapphire

  if (variant === 'light') {
    // For dark website backgrounds
    topBarFill = '#38BDF8';   // Sky Cyan
    stemFill = '#3B82F6';     // Vibrant Cobalt
  } else if (variant === 'monochrome') {
    topBarFill = 'currentColor';
    stemFill = 'currentColor';
  }

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Top Cantilever */}
      <path
        d="M21 14.5 L47.5 14.5 C49.4 14.5 50.5 15.6 50.5 17.5 L50.5 20 C50.5 21.9 49.4 23 47.5 23 L15.5 23 C14.3 23 13.8 21.7 14.5 20.8 L18.8 15.6 C19.4 14.9 20.2 14.5 21 14.5 Z"
        fill={topBarFill}
      />

      {/* Vertical Keystone Monolith */}
      <path
        d="M30.5 26.5 L37 26.5 C38.4 26.5 39.5 27.6 39.5 29 L39.5 46.5 C39.5 48.4 38 49.5 36 49.5 L29.5 49.5 C27.6 49.5 26.5 48.4 26.5 46.5 L26.5 30.5 C26.5 29.7 26.9 28.9 27.5 28.3 L29.3 26.9 C29.7 26.6 30.1 26.5 30.5 26.5 Z"
        fill={stemFill}
      />
    </svg>
  );
}

/**
 * Toolora Master Brand Logo
 * Combines the Precision Apex icon, custom geometric wordmark, and optional tagline.
 */
export function TooloraLogo({
  className = '',
  size = 'md',
  showTagline = false,
  variant = 'dark',
}: LogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl',
  };

  const taglineSizes = {
    sm: 'text-[10px]',
    md: 'text-[11px]',
    lg: 'text-xs',
    xl: 'text-sm',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <TooloraIcon
        className={`${iconSizes[size]} shrink-0`}
        variant={variant === 'light' ? 'light' : 'default'}
      />
      <div className="flex flex-col justify-center">
        <span
          className={`font-extrabold tracking-[-0.035em] leading-none ${textSizes[size]} ${
            variant === 'light' ? 'text-white' : 'text-slate-900'
          }`}
          style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
        >
          Toolora
        </span>
        {showTagline && (
          <span
            className={`font-medium tracking-normal mt-0.5 leading-tight ${taglineSizes[size]} ${
              variant === 'light' ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Everyday tools, made simple.
          </span>
        )}
      </div>
    </div>
  );
}
