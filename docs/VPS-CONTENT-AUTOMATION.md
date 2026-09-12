# VPS content automation

The live scoreboard and editorial watch use two deliberately separate jobs.

## Score data

During an active tournament, `scripts/update-live-score.mjs` checks the configured event page every 15 minutes. It publishes only completed matches, clearly labels partial scores as in progress, validates the event page before writing, and replaces `data/live-score.json` atomically. A failed source check leaves the last successful snapshot in place.

The homepage loads the static verified snapshot first, then refreshes the small JSON file in the browser. This keeps the page fast and indexable while allowing the score panel to become fresher without rebuilding the whole site.

The current fallback reads the public English Open results page with an identifying user agent. Snooker.org's robots file permits the `/res/` path. Replace this parser with the authorised API adapter when credentials become available.

## News candidates

`scripts/watch-news-sources.mjs` checks the WST news index every two hours and stores candidate links. It never copies or automatically republishes article text. A candidate becomes a site article only after its date and facts are verified and an original briefing is written with source links.

## Suggested schedule

```cron
*/15 * * * * /usr/bin/node /srv/snookercalendar/automation/update-live-score.mjs >> /srv/snookercalendar/automation/live-score.log 2>&1
17 */2 * * * /usr/bin/node /srv/snookercalendar/automation/watch-news-sources.mjs >> /srv/snookercalendar/automation/news-watch.log 2>&1
```

Outside the configured event window, the score task exits before making a network request. Update the event configuration when the featured tournament changes.
