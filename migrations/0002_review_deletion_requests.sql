CREATE TABLE review_deletion_requests (
  id TEXT PRIMARY KEY,
  review_id TEXT NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  reviewed_at TEXT
);

CREATE INDEX review_deletion_requests_status_created
  ON review_deletion_requests (status, created_at);

CREATE UNIQUE INDEX review_deletion_requests_one_pending_per_review
  ON review_deletion_requests (review_id) WHERE status = 'pending';
