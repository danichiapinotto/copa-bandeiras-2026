CREATE TABLE IF NOT EXISTS participants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    turma TEXT,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    errors INTEGER NOT NULL,
    duration_seconds INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_participants_ranking ON participants(score DESC, duration_seconds ASC, created_at ASC);
