/**
 * Centralized Google AdSense Configuration for Toolora
 *
 * Provides a single source of truth for publisher credentials, ad slots,
 * and activation state. Reusable ad components read from this configuration
 * rather than hardcoding personal account values in multiple JSX files.
 */

export interface AdSenseConfig {
  /** Whether AdSense ad loading is enabled across the application */
  enabled: boolean;
  /** Official Google AdSense publisher client ID */
  client: string;
  /** Primary responsive ad unit slot ID */
  defaultSlot: string;
  /** Formats supported by responsive containers */
  defaultFormat: string;
}

export const ADSENSE_CONFIG: AdSenseConfig = {
  enabled: true,
  // User-provided official Google AdSense Publisher ID
  client: 'ca-pub-6848191601714172',
  // User-provided official Google AdSense Slot ID
  defaultSlot: '8603656892',
  defaultFormat: 'auto',
};

/**
 * Validates whether the AdSense publisher credentials are present and well-formed.
 * Prevents making unapproved ad requests or rendering empty/broken containers.
 */
export function isAdSenseReady(): boolean {
  return (
    ADSENSE_CONFIG.enabled &&
    Boolean(ADSENSE_CONFIG.client) &&
    /^ca-pub-\d{10,20}$/.test(ADSENSE_CONFIG.client)
  );
}
