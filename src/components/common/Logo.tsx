import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  variant?: 'light' | 'dark' | 'icon-only';
}

/**
 * Toolora Folded Ribbon "T" Icon
 * Recreated accurately from the official brand reference.
 */
export function TooloraIcon({ className = 'w-8 h-8', roundedDarkBg = false }: { className?: string; roundedDarkBg?: boolean }) {
  if (roundedDarkBg) {
    return (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="t-top-grad-dark" x1="18" y1="18" x2="48" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="t-stem-front-dark" x1="28" y1="24" x2="38" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <linearGradient id="t-stem-fold-dark" x1="28" y1="24" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
        </defs>

        {/* Squircle container matching the brand app icon */}
        <rect width="64" height="64" rx="16" fill="#0B132B" />

        {/* Top horizontal crossbar of 'T' with slanted left edge */}
        <path
          d="M26 18 L48 18 C49.1 18 50 18.9 50 20 L50 22 C50 23.1 49.1 24 48 24 L22.5 24 C21.4 24 20.8 22.7 21.5 21.8 L24.5 18.6 C24.9 18.2 25.4 18 26 18 Z"
          fill="url(#t-top-grad-dark)"
        />

        {/* Vertical Stem - Back fold layer (darker crease) */}
        <path
          d="M29 24 L40 32 L40 44 L29 36 Z"
          fill="url(#t-stem-fold-dark)"
        />

        {/* Vertical Stem - Front folded ribbon */}
        <path
          d="M29 24 L40 32 L40 47 C40 48.1 39.1 49 38 49 L31 49 C29.9 49 29 48.1 29 47 Z"
          fill="url(#t-stem-front-dark)"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="toolora-top-grad" x1="14" y1="8" x2="44" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="toolora-stem-front" x1="22" y1="16" x2="36" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="toolora-stem-fold" x1="22" y1="16" x2="35" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>

      {/* Top horizontal crossbar of 'T' with clean geometric slant */}
      <path
        d="M20 8 L43 8 C44.1 8 45 8.9 45 10 L45 14 C45 15.1 44.1 16 43 16 L16.8 16 C15.6 16 14.9 14.6 15.7 13.6 L18.5 9.2 C19.1 8.5 19.5 8 20 8 Z"
        fill="url(#toolora-top-grad)"
      />

      {/* Vertical Stem - Folded ribbon under-crease */}
      <path
        d="M23 16 L35 25 L35 38 L23 29 Z"
        fill="url(#toolora-stem-fold)"
      />

      {/* Vertical Stem - Front faceted ribbon */}
      <path
        d="M23 16 L35 25 L35 41 C35 42.1 34.1 43 33 43 L25 43 C23.9 43 23 42.1 23 41 Z"
        fill="url(#toolora-stem-front)"
      />
    </svg>
  );
}

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
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <TooloraIcon className={`${iconSizes[size]} shrink-0`} />
      <div className="flex flex-col">
        <span
          className={`font-extrabold tracking-tight leading-none ${textSizes[size]} ${
            variant === 'light' ? 'text-white' : 'text-slate-900'
          }`}
          style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
        >
          Toolora
        </span>
        {showTagline && (
          <span className="text-[11px] text-slate-500 font-normal tracking-normal mt-0.5">
            Everyday tools, made simple.
          </span>
        )}
      </div>
    </div>
  );
}
