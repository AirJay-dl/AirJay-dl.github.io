# Similarweb keyword research — global English

> Superseded research draft. Use `outputs/seo-keywords-2026-09-15/` for the corrected four-table dataset. Some metrics in the companion original CSV were misaligned during the first extraction. The new dataset reads individual page cells; see its README for corrections and coverage limits. Page recommendations below remain preliminary.

Research date: 15 September 2026  
Similarweb dataset: Google, Worldwide, all traffic, last 28 days as of 11 September 2026

## What the data says

The strongest useful search demand is concentrated around current results, scores, rankings and the next tournament. The site's calendar remains the best product anchor because it matches the domain and can connect every event, result, ranking, player and guide page.

The worldwide dataset mixes languages and short-lived event spikes. This shortlist keeps English terms that match the site's audience and excludes brand-navigation terms, streams, online games, local clubs, equipment shopping and non-English queries. The 28-day figure is a recent traffic estimate; the average-volume figure is a better guide to durable demand.

## Priority page map

### P0 — strengthen existing product pages

1. `/calendar/season/`
   - Primary: `snooker calendar`, `snooker schedule`, `snooker calendar 2026/27`, `snooker schedule 2026/27`
   - Page title target: `Snooker Calendar 2026/27: Full Tournament Schedule`
   - Add a short answer above the calendar: next event, current event, dates, location and link to the event page.
   - Keep monthly pages and event pages as the supporting cluster.

2. New `/results/` hub
   - Primary: `snooker results`
   - Secondary: `snooker results today`, `live snooker results`, `latest snooker results`
   - Show the latest completed matches, active tournament and completed-event archive. Display the source and checked time beside data.
   - Link every result to its tournament page and relevant player profiles.

3. `/rankings/`
   - Primary: `snooker rankings`
   - Secondary: `snooker rankings 2026`, `world snooker rankings`, `snooker world rankings`, `snooker live rankings`
   - Explain official two-year, provisional/live and one-season lists. Do not call a dated snapshot live unless the update mechanism supports it.

4. Tournament pages
   - Formula: `[Event] 2026: Schedule, Draw & Results`
   - Use event-specific variants naturally in the title, H1, description, schedule, draw, results, venue, TV/streaming and past-winners sections.
   - Preserve the page after the event as a result archive rather than replacing it with the next edition.

### P1 — publish next

1. `Snooker on TV Today & Next Tournament`
   - Targets: `when is the next snooker tournament on tv 2026`, `what channel is snooker on today`, `when is the next televised snooker tournament`
   - Broadcasting rights vary by country. State the covered market on every listing and link to official broadcasters.

2. `How to Play Snooker: Rules, Scoring and First Frame`
   - Targets: `how to play snooker`, `snooker rules`, `rules of snooker`, `snooker foul rules`
   - Combine beginner intent on one strong guide; link to the existing scoring and safety articles. Avoid several thin pages answering the same intent.

3. `What Is Snooker?`
   - Targets: `what is snooker`, `what is a snooker`, `where does snooker originate from`
   - Give a concise definition first, then table setup, scoring, frame structure, history and links to rules.

4. `Snooker vs Pool`
   - Targets: `snooker vs pool`, `pool vs snooker`, `what is harder snooker or pool`
   - Use a comparison table for table size, balls, cues, rules, scoring and typical match format.

### P2 — expand after reliable data updates

- Dedicated score pages for active events, only when update frequency supports the promise.
- Historical ranking pages by season.
- Player season results and head-to-head pages after source/API permission.
- Event winners, prize money and tournament-history pages using cited structured data.

## Publishing rules

- One primary search intent per page. Put close variants on the same page.
- Answer the query in the first 100 words, then provide the full data or guide.
- Use visible `Last updated` and `Data source` labels on changing data.
- Internally link calendar → event → result → player → ranking, with descriptive link text.
- Use `SportsEvent` schema on event pages, `ItemList` on rankings and results lists, and `Article` or `FAQPage` only when the visible content supports it.
- Update titles and descriptions when an event changes from upcoming to active to completed; keep one stable URL per edition.
- Treat high zero-click terms as authority/support content. Prioritise lower zero-click product terms for traffic acquisition.

## First implementation batch

1. Re-title and expand the full-season calendar page.
2. Create the results hub and add it to primary navigation.
3. Rework rankings copy around the five ranking variants.
4. Add the TV/next-tournament page.
5. Consolidate rules and beginner content into the two evergreen guides above.
6. Update the sitemap, structured data and internal links, then submit changed URLs in Search Console.

The curated metrics and recommended target page for each term are in `similarweb-keywords-2026-09-15.csv`.
