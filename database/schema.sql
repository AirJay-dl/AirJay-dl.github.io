PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS schema_migrations (
  version INTEGER PRIMARY KEY,
  applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO schema_migrations (version) VALUES (1);

CREATE TABLE IF NOT EXISTS tournaments (
  id INTEGER PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  source_event_id TEXT,
  name TEXT NOT NULL,
  start_date TEXT,
  end_date TEXT,
  tour TEXT,
  event_type TEXT,
  venue TEXT,
  city TEXT,
  country TEXT,
  source_url TEXT NOT NULL,
  status TEXT,
  checked_at TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS matches (
  id INTEGER PRIMARY KEY,
  tournament_id INTEGER NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
  source_key TEXT NOT NULL,
  round_name TEXT NOT NULL,
  player_one TEXT NOT NULL,
  player_two TEXT NOT NULL,
  player_one_score INTEGER,
  player_two_score INTEGER,
  score_text TEXT,
  match_status TEXT NOT NULL CHECK (match_status IN ('scheduled', 'live', 'complete')),
  scheduled_at TEXT,
  source_url TEXT NOT NULL,
  checked_at TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (tournament_id, source_key)
);

CREATE INDEX IF NOT EXISTS matches_tournament_status_idx ON matches (tournament_id, match_status);
CREATE INDEX IF NOT EXISTS matches_checked_at_idx ON matches (checked_at);

CREATE TABLE IF NOT EXISTS players (
  id INTEGER PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  country TEXT,
  born_date TEXT,
  turned_pro INTEGER,
  source_url TEXT,
  checked_at TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ranking_lists (
  id INTEGER PRIMARY KEY,
  list_type TEXT NOT NULL CHECK (list_type IN ('official', 'live')),
  label TEXT NOT NULL,
  source_url TEXT NOT NULL,
  checked_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (list_type, label, checked_at)
);

CREATE TABLE IF NOT EXISTS ranking_positions (
  ranking_list_id INTEGER NOT NULL REFERENCES ranking_lists(id) ON DELETE CASCADE,
  rank INTEGER NOT NULL,
  player_slug TEXT NOT NULL,
  player_name TEXT NOT NULL,
  country TEXT,
  prize_money INTEGER NOT NULL,
  PRIMARY KEY (ranking_list_id, rank)
);

CREATE INDEX IF NOT EXISTS ranking_player_idx ON ranking_positions (player_slug);

CREATE TABLE IF NOT EXISTS source_runs (
  id INTEGER PRIMARY KEY,
  job_name TEXT NOT NULL,
  source_url TEXT NOT NULL,
  started_at TEXT NOT NULL,
  finished_at TEXT NOT NULL,
  run_status TEXT NOT NULL CHECK (run_status IN ('success', 'failed')),
  record_count INTEGER NOT NULL DEFAULT 0,
  message TEXT
);

CREATE INDEX IF NOT EXISTS source_runs_job_time_idx ON source_runs (job_name, finished_at DESC);

CREATE TABLE IF NOT EXISTS news_items (
  url TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  published_at TEXT NOT NULL,
  first_seen_at TEXT NOT NULL,
  checked_at TEXT NOT NULL
);
