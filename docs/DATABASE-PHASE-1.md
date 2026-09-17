# Snooker Calendar database · Phase 1

Phase 1 adds a small SQLite database behind the existing VPS jobs without changing the public site contract. The website continues to read the current JSON snapshots, while every score and ranking refresh can also retain structured history.

## Storage

- Intended VPS path: `/srv/snookercalendar/shared/snooker.db`
- Single writer: the existing scheduled Node jobs
- Public website: continues to read `/data/live-score.json` and `/data/rankings.json`
- Backup: include the database and its WAL files in the existing VPS backup plan

## Tables

- `tournaments`: event identity, dates, source and current status
- `matches`: scheduled, live and completed match snapshots
- `players`: stable player identity for the next import phase
- `ranking_lists` and `ranking_positions`: dated official and provisional lists
- `source_runs`: source URL, run time, outcome and record count
- `schema_migrations`: database schema version

## Safe rollout

1. Confirm the VPS runs Node 22.13 or later because the implementation uses the built-in SQLite module.
2. Initialise the database once with `SNOOKER_DB_PATH=/srv/snookercalendar/shared/snooker.db npm run db:init`.
3. Add the same environment variable to the score and ranking scheduled jobs.
4. Run each updater manually once and check `source_runs`, `matches` and `ranking_positions`.
5. Keep JSON output enabled until database-backed read APIs are separately tested and deployed.

If the environment variable is absent, both update jobs behave exactly as before and only publish JSON. This makes the migration reversible and prevents a database issue from forcing a front-end cutover.
