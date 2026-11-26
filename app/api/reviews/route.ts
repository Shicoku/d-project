import { env } from "cloudflare:workers";
import { classes } from "../../data/classes";

type ReviewRow = {
  id: string;
  course_slug: string;
  title: string;
  content: string;
  school_year: number;
  assignment_score: number;
  interest_score: number;
  clarity_score: number;
  test_score: number;
  attendance_score: number;
  professor_talk_score: number;
  created_at: string;
};

const scoreFields = [
  "assignmentScore",
  "interestScore",
  "clarityScore",
  "testScore",
  "attendanceScore",
  "professorTalkScore",
] as const;

export async function GET(request: Request) {
  const courseSlug = new URL(request.url).searchParams.get("courseSlug");
  if (!courseSlug || !classes.some((course) => course.slug === courseSlug)) {
    return Response.json({ error: "講義が見つかりません。" }, { status: 400 });
  }

  const result = await env.DB.prepare(
    `SELECT id, course_slug, title, content, school_year,
      assignment_score, interest_score, clarity_score, test_score,
      attendance_score, professor_talk_score, created_at
     FROM reviews WHERE course_slug = ? ORDER BY created_at DESC LIMIT 100`,
  ).bind(courseSlug).all<ReviewRow>();

  return Response.json({ reviews: result.results });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "送信内容を読み取れませんでした。" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "送信内容を確認してください。" }, { status: 400 });
  }
  const values = body as Record<string, unknown>;

  const courseSlug = values.courseSlug;
  const title = typeof values.title === "string" ? values.title.trim() : "";
  const content = typeof values.content === "string" ? values.content.trim() : "";
  const schoolYear = Number(values.schoolYear);
  const scores = scoreFields.map((field) => Number(values[field]));
  const currentYear = new Date().getFullYear();

  if (typeof courseSlug !== "string" || !classes.some((course) => course.slug === courseSlug)) {
    return Response.json({ error: "講義が見つかりません。" }, { status: 400 });
  }
  if (!title || title.length > 100 || content.length < 5 || content.length > 2000) {
    return Response.json({ error: "タイトルと内容を確認してください。" }, { status: 400 });
  }
  if (!Number.isInteger(schoolYear) || schoolYear < currentYear - 7 || schoolYear > currentYear) {
    return Response.json({ error: "受講年度を確認してください。" }, { status: 400 });
  }
  if (scores.some((score) => !Number.isInteger(score) || score < 1 || score > 5)) {
    return Response.json({ error: "評価は1〜5で入力してください。" }, { status: 400 });
  }

  const id = crypto.randomUUID();
  await env.DB.prepare(
    `INSERT INTO reviews (
      id, course_slug, title, content, school_year, assignment_score,
      interest_score, clarity_score, test_score, attendance_score, professor_talk_score
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).bind(id, courseSlug, title, content, schoolYear, ...scores).run();

  return Response.json({ id }, { status: 201 });
}
