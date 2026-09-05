# The Snooker Calendar

Independent English-language snooker calendar and editorial website for the 2026/27 season. Published by AirJay-dl. Contact: contact@snookercalendar.com.

## Stack and use

React 19, TypeScript, Vinext, Tailwind, the supplied Shadcn/Base UI primitives. Static HTML export for GitHub Pages, with a Sites-compatible packaging manifest. Google Analytics loads only after the visitor accepts analytics cookies.

Node 24 and pnpm 11.19.0:

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm verify
```

The build generates sitemap, robots, RSS and ICS, then exports routes and prepares `out/`. `pnpm verify` checks output metadata, canonical uniqueness, local links/assets, JSON-LD, sitemap count and calendar date boundaries. All links are normal full-page navigation; no runtime server is needed by Pages.

In this pinned Vinext version, `trailingSlash: true` causes 308 responses during static prerender. The framework exports with `trailingSlash: false`, and `prepare-export.mjs` places HTML in clean `/path/index.html` directories for GitHub Pages. Public links and canonical URLs consistently use trailing slashes.

The GitHub workflow builds and publishes `out/` on pushes to main. In Settings → Pages, select GitHub Actions. The workflow derives the origin and basePath from the Pages configuration. The first deployment can also be bootstrapped from an uploaded source archive when no local GitHub credential is available.

## Content

- `content/events.ts`: 42 main-tour events and qualifying entries, with sources and notes.
- `content/articles.ts`: two schedule briefings and four original guides/history articles.
- `content/players.ts`: four player introductions.
- `content/pages.ts`: about, editorial policy, privacy, terms and contact.
- `lib/site.ts`: site origin and contact configuration.

The launch edition was prepared with AI assistance. The check date is 5 September 2026. Tournament changes and news are not automatically fetched. Historical milestones are used instead of live ranking claims. The publisher should review content before seeking advertising approval.

See [content and SEO standards](docs/CONTENT-AND-SEO.md) and [domain migration](docs/DOMAIN-MIGRATION.md).

## Limitations

The current calendar covers WST main-tour events and qualifiers, not women’s, seniors or Q Tour. ICS downloads are one-time imports rather than live subscriptions. Player participation, broadcasts and ticket availability must be confirmed with the organiser. No AdSense approval or Google ranking is guaranteed. No third-party player images are reproduced.
