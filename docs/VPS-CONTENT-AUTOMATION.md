# VPS content automation

The live scoreboard and editorial watch use two deliberately separate jobs.

## Score data

Every 15 minutes, `scripts/update-live-score.mjs` reads the current-season Snooker.org calendar, selects the active event (with a main ranking event taking priority when dates overlap), follows its event page, and switches the published event automatically. It publishes completed matches, clearly labels partial scores as in progress, validates the event page before writing, and replaces `data/live-score.json` atomically. When no event is active it previews the next scheduled event. A failed source check leaves the last successful snapshot in place.

The homepage loads the static verified snapshot first, then refreshes the small JSON file in the browser. This keeps the page fast and indexable while allowing the score panel to become fresher without rebuilding the whole site.

The current fallback reads the public English Open results page with an identifying user agent. Snooker.org's robots file permits the `/res/` path. Replace this parser with the authorised API adapter when credentials become available.

## Rankings

`scripts/update-rankings.mjs` checks the World Snooker Tour ranking service every four hours. It keeps the first 50 positions from both the latest official list and the provisional live list, validates each list before replacing `data/rankings.json`, and leaves the previous file in place if the source is incomplete. The rankings page renders an official top-50 snapshot during the static build and enhances it with the latest VPS snapshot in the browser.

## News candidates

`scripts/watch-news-sources.mjs` checks the WST news index every two hours and stores candidate links. It never copies or automatically republishes article text. A candidate becomes a site article only after its date and facts are verified and an original briefing is written with source links.

## Suggested schedule

```cron
*/15 * * * * /usr/bin/node /srv/snookercalendar/automation/update-live-score.mjs >> /srv/snookercalendar/automation/live-score.log 2>&1
37 */4 * * * /usr/bin/node /srv/snookercalendar/automation/update-rankings.mjs >> /srv/snookercalendar/automation/rankings.log 2>&1
17 */2 * * * /usr/bin/node /srv/snookercalendar/automation/watch-news-sources.mjs >> /srv/snookercalendar/automation/news-watch.log 2>&1
```

The score task uses one calendar request and one event request per run. Event IDs, active dates and round names are discovered from the source instead of being changed manually between tournaments.
