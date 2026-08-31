// components/brand/brand-config.ts
//
// 2026-08-31: re-export. Brand colours, typography and spacing live in the SDK, so
// a palette change reaches every app instead of stopping at the first copy.
export {
  default as brandConfig,
  BRAND_COLORS,
  THEME_CONFIG,
  TYPOGRAPHY,
  SPACING,
  LOGO_SPECS,
} from '@craudioviz/platform-sdk';
