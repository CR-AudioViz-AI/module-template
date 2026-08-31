/**
 * next.config.js
 *
 * 2026-08-31: spreads the SDK base rather than restating it.
 *
 * Upgrading 54 repos from Next 14 to 15 meant 54 separate edits to 54 copies of the
 * same configuration. With a shared base it is one SDK release and a dependency
 * bump.
 *
 * WHAT IS DELIBERATELY ABSENT: typescript.ignoreBuildErrors and
 * eslint.ignoreDuringBuilds. Seventeen of forty repos shipped with both disabled,
 * hiding 204 real errors — six files that could not parse at all, a service-role key
 * travelling in a URL query string, and a consent audit trail that had never written
 * a row. A template that turns checking off would industrialise exactly that.
 */

const base = require('@craudioviz/platform-sdk/config/next.config.base.js');

/** @type {import('next').NextConfig} */
module.exports = {
  ...base,
  // Add only what is genuinely specific to this app.
};
