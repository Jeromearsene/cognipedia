CREATE TABLE IF NOT EXISTS users (
  uuid TEXT PRIMARY KEY,
  pseudo TEXT NOT NULL,
  recovery_code TEXT UNIQUE NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_uuid TEXT NOT NULL REFERENCES users(uuid),
  bias_slug TEXT NOT NULL,
  situation_score INTEGER NOT NULL DEFAULT 0,
  quiz_correct INTEGER NOT NULL DEFAULT 0,
  quiz_total INTEGER NOT NULL DEFAULT 0,
  total_score INTEGER NOT NULL DEFAULT 0,
  completed_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_uuid, bias_slug)
);

CREATE INDEX IF NOT EXISTS idx_scores_total ON scores(total_score DESC);
CREATE INDEX IF NOT EXISTS idx_scores_user ON scores(user_uuid);
