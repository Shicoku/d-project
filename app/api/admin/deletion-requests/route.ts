import { env } from "cloudflare:workers";

function authorizationError(request: Request) {
  const token = (env as unknown as Record<string, string | undefined>)
    .ADMIN_TOKEN;
  if (typeof token !== "string" || token.length < 32) {
    return Response.json(
      { error: "サーバー側のADMIN_TOKENが未設定です。ローカルなら .dev.vars、本番ならWorkerのSecretを確認してください。" },
      { status: 503 },
    );
  }
  if (request.headers.get("authorization") !== `Bearer ${token}`) {
    return Response.json({ error: "入力したトークンがサーバー側のADMIN_TOKENと一致しません。" }, { status: 401 });
  }
  return null;
}

export async function GET(request: Request) {
  const authError = authorizationError(request);
  if (authError) return authError;
  const result = await env.DB.prepare(
    `SELECT r.id, r.title, r.content, r.course_slug, d.id AS request_id, d.reason, d.created_at
     FROM review_deletion_requests d JOIN reviews r ON r.id = d.review_id
     WHERE d.status = 'pending' ORDER BY d.created_at ASC LIMIT 200`,
  ).all();
  return Response.json({ requests: result.results });
}

export async function PATCH(request: Request) {
  const authError = authorizationError(request);
  if (authError) return authError;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "操作内容を読み取れません。" },
      { status: 400 },
    );
  }
  if (!body || typeof body !== "object" || Array.isArray(body))
    return Response.json(
      { error: "操作内容を確認してください。" },
      { status: 400 },
    );
  const { requestId, decision } = body as Record<string, unknown>;
  if (
    typeof requestId !== "string" ||
    (decision !== "approve" && decision !== "reject")
  )
    return Response.json(
      { error: "操作内容を確認してください。" },
      { status: 400 },
    );
  const row = await env.DB.prepare(
    "SELECT review_id FROM review_deletion_requests WHERE id = ? AND status = 'pending'",
  )
    .bind(requestId)
    .first<{ review_id: string }>();
  if (!row)
    return Response.json(
      { error: "申請が見つからないか、処理済みです。" },
      { status: 404 },
    );
  if (decision === "approve") {
    await env.DB.batch([
      env.DB.prepare(
        "UPDATE review_deletion_requests SET status = 'approved', reviewed_at = datetime('now') WHERE id = ? AND status = 'pending'",
      ).bind(requestId),
      env.DB.prepare("DELETE FROM reviews WHERE id = ?").bind(row.review_id),
    ]);
  } else {
    await env.DB.prepare(
      "UPDATE review_deletion_requests SET status = 'rejected', reviewed_at = datetime('now') WHERE id = ? AND status = 'pending'",
    )
      .bind(requestId)
      .run();
  }
  return Response.json({ ok: true });
}
