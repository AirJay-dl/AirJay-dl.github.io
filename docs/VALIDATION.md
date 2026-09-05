# Validation

Initial verification on 2026-09-05:

- Production static export: 37 content pages plus 404, all prerendered successfully.
- TypeScript `tsc --noEmit`: passed.
- `scripts/verify-export.mjs`: passed title/description/canonical uniqueness, local links/assets, JSON-LD parsing, sitemap URL count, 42 unique event records, cross-month inclusion, exclusive ICS end date and 75-byte line limits.
- WebMCP `filter_snooker_calendar`: registered with expected schema; valid Ranking + English query returned the English Open; invalid category rejected; reset returned all six September entries. Supported browser context was used for this focused interface check.
- No full browser UI testing, screenshots, mobile click-through or Core Web Vitals measurement was requested or performed. Responsive CSS is implemented; real-device QA remains an editorial launch task.
- Ads are not activated. AdSense review and domain migration remain account/domain-specific follow-up steps.
