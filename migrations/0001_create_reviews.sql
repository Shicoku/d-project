-- Migration number: 0001 	 2026-11-26T15:11:37.770Z
CREATE TABLE reviews(
  id TEXT PRIMARY KEY,
  course_slug TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  school_year INTEGER NOT NULL,
  assignment_score INTEGER NOT NULL CHECK (assignment_score BETWEEN 1 AND 5),
  interest_score INTEGER NOT NULL CHECK (interest_score BETWEEN 1 AND 5),
  clarity_score INTEGER NOT NULL CHECK (clarity_score BETWEEN 1 AND 5),
  test_score INTEGER NOT NULL CHECK (test_score BETWEEN 1 AND 5),
  attendance_score INTEGER NOT NULL CHECK (attendance_score BETWEEN 1 AND 5),
  professor_talk_score INTEGER NOT NULL CHECK (professor_talk_score BETWEEN 1 AND 5),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX reviews_course_created
  ON reviews (course_slug, created_at);
