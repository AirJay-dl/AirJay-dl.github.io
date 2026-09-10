# Daily results update fallback

Use this workflow only until an authorised Snooker.org API feed is available.

1. Check the current event page and results page on Snooker.org. Prefer the event-specific page, then WST or the tournament organiser if a material detail conflicts.
2. Update `content/tournament-updates.ts` with only completed scores and confirmed next-round pairings. Keep the source URL and the actual check date accurate; do not present a partial score as final.
3. Add a short original news briefing only when there is enough confirmed context to help a reader. Link the source and do not reproduce its commentary or match report.
4. Run `pnpm build` and `pnpm verify`. Review the event page before publishing.
5. Publish the verified static snapshot. During an active event, repeat this once per day; outside an active event, update after finals and meaningful schedule changes.

The site must keep the latest successful snapshot if a source cannot be checked. It should show its check date rather than imply a live service.
