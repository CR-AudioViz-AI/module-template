// 2026-08-31: RE-EXPORT, not a copy. The component lives in
// @craudioviz/platform-sdk.
//
// THIS TEMPLATE WAS THE ROOT CAUSE OF 59 FORKED HEADERS. It shipped its own copies of
// the brand components, so every app created from it inherited a fork on day one —
// and by the time anyone counted there were 59 copies in ELEVEN distinct versions.
//
// The forks were not merely stale. The plan union omitted 'creator' and 'enterprise'
// while User.subscription_tier carries both, so a PAYING creator or enterprise
// customer was shown 'free' in the header, live across 34 repos.
//
// A template that CONTAINS shared code rather than DEPENDING on it is a copying
// machine. Fixing it here is what stops the next 59.
export { ThemeProvider, useTheme } from '@craudioviz/platform-sdk';
