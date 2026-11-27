"use client";

import { useState } from "react";
import styles from "../../styles/post.module.css";
import { readApiResponse } from "../../lib/read-api-response";

type RequestItem = { id: string; title: string; content: string; course_slug: string; request_id: string; reason: string; created_at: string };

export default function AdminDeletionRequestsPage() {
  const [token, setToken] = useState("");
  const [items, setItems] = useState<RequestItem[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    if (!token.trim()) {
      setMessage("ADMIN_TOKENを入力してください。");
      return;
    }
    setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/admin/deletion-requests", { headers: { Authorization: `Bearer ${token.trim()}` } });
      const data = await readApiResponse<{ error?: string; requests?: RequestItem[] }>(response);
      if (!response.ok) throw new Error(data.error ?? "申請を取得できませんでした。");
      setItems(data.requests ?? []); setMessage("申請一覧を読み込みました。");
    } catch (error) { setMessage(error instanceof Error ? error.message : "申請を取得できませんでした。"); }
    finally { setBusy(false); }
  }

  async function decide(requestId: string, decision: "approve" | "reject") {
    setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/admin/deletion-requests", {
        method: "PATCH", headers: { Authorization: `Bearer ${token.trim()}`, "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, decision }),
      });
      const data = await readApiResponse<{ error?: string }>(response);
      if (!response.ok) throw new Error(data.error ?? "操作できませんでした。");
      setItems((current) => current.filter((item) => item.request_id !== requestId));
      setMessage(decision === "approve" ? "口コミを削除しました。" : "申請を却下しました。");
    } catch (error) { setMessage(error instanceof Error ? error.message : "操作できませんでした。"); }
    finally { setBusy(false); }
  }

  return <main className={styles.main}>
    <section className={styles.panel}>
      <p className={styles.eyebrow}>ADMIN</p><h1>口コミ削除申請</h1>
      <p className={styles.description}>管理者トークンを入力して、申請内容を確認してください。</p>
      <div className={styles.adminControls}><input type="password" autoComplete="current-password" value={token} onChange={(event) => setToken(event.target.value)} placeholder="ADMIN_TOKEN" /><button className={styles.submitButton} type="button" disabled={busy} onClick={load}>申請を読み込む</button></div>
      {message && <p role="status">{message}</p>}
      {items.map((item) => <article className={styles.reviewCard} key={item.request_id}>
        <p className={styles.reviewMeta}>講義：{item.course_slug} · 申請日時：{item.created_at}</p>
        <h2>{item.title}</h2><p className={styles.reviewContent}>{item.content}</p>
        <p><strong>申請理由：</strong>{item.reason || "記載なし"}</p>
        <button className={styles.dangerButton} type="button" disabled={busy} onClick={() => decide(item.request_id, "approve")}>承認して削除</button>{" "}
        <button className={styles.secondaryButton} type="button" disabled={busy} onClick={() => decide(item.request_id, "reject")}>却下</button>
      </article>)}
      {!items.length && message === "申請一覧を読み込みました。" && <p>未処理の申請はありません。</p>}
    </section>
  </main>;
}
