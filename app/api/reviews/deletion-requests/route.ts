import { env } from "cloudflare:workers";

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ error: "申請内容を読み取れません。" }, { status: 400 }); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return Response.json({ error: "申請内容を確認してください。" }, { status: 400 });
  const values = body as Record<string, unknown>;
  const reviewId = typeof values.reviewId === "string" ? values.reviewId : "";
  const reason = typeof values.reason === "string" ? values.reason.trim() : "";
  if (!reviewId || reason.length > 500) return Response.json({ error: "申請内容を確認してください。" }, { status: 400 });
  const review = await env.DB.prepare("SELECT id FROM reviews WHERE id = ?").bind(reviewId).first();
  if (!review) return Response.json({ error: "口コミが見つかりません。" }, { status: 404 });
  const existing = await env.DB.prepare("SELECT id FROM review_deletion_requests WHERE review_id = ? AND status = 'pending'").bind(reviewId).first();
  if (existing) return Response.json({ error: "この口コミはすでに削除申請中です。" }, { status: 409 });
  await env.DB.prepare("INSERT INTO review_deletion_requests (id, review_id, reason) VALUES (?, ?, ?)").bind(crypto.randomUUID(), reviewId, reason).run();
  return Response.json({ ok: true }, { status: 201 });
}

