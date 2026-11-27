"use client";

import { useState } from "react";
import styles from "../styles/post.module.css";
import { readApiResponse } from "../lib/read-api-response";

export default function ReviewDeleteRequest({ reviewId }: { reviewId: string }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true);
    try {
      const response = await fetch("/api/reviews/deletion-requests", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId, reason }),
      });
      const data = await readApiResponse<{ error?: string }>(response);
      if (!response.ok) throw new Error(data.error ?? "申請できませんでした。");
      setMessage("通報を受け付けました。管理者の確認後、必要に応じて削除されます。");
      setOpen(false);
    } catch (error) { setMessage(error instanceof Error ? error.message : "申請できませんでした。"); }
    finally { setBusy(false); }
  }

  return <div className={styles.deleteRequest}>
    {!open && !message.startsWith("通報を受け付けました") && <button type="button" className={styles.textButton} onClick={() => { setOpen(true); setMessage(""); }}>この口コミを通報</button>}
    {open && <div className={styles.deleteRequestForm}>
      <label>申請理由（任意）<textarea maxLength={500} rows={3} value={reason} onChange={(event) => setReason(event.target.value)} /></label>
      <div><button type="button" className={styles.secondaryButton} disabled={busy} onClick={() => setOpen(false)}>キャンセル</button> <button type="button" className={styles.dangerButton} disabled={busy} onClick={submit}>{busy ? "送信中…" : "通報する"}</button></div>
    </div>}
    {message && <p role="status">{message}</p>}
  </div>;
}
