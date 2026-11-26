"use client";

import { FormEvent, useState } from "react";
import styles from "../styles/post.module.css";

export default function ReviewForm({ courseName }: { courseName: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [year, setYear] = useState("");
  const thisYear = new Date().getFullYear();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className={styles.panel}>
      <p className={styles.eyebrow}>WRITE A REVIEW</p>
      <h2 className={styles.formHeading}>この講義の口コミを投稿</h2>
      <p className={styles.description}>投稿先：{courseName}</p>
      {submitted ? (
        <div className={styles.confirmation} role="status">
          <h3>入力内容を確認しました</h3>
          <p>投稿を共有するには、保存先の設定が必要です。</p>
          <dl>
            <dt>講義</dt><dd>{courseName}</dd>
            <dt>タイトル</dt><dd>{title}</dd>
            <dt>受講年度</dt><dd>{year}年度</dd>
            <dt>内容</dt><dd className={styles.preview}>{content}</dd>
          </dl>
          <button className={styles.secondaryButton} onClick={() => setSubmitted(false)} type="button">内容を編集する</button>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>タイトル <b>必須</b></span>
            <input required maxLength={100} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="例：講義の雰囲気や感想" />
          </label>
          <label className={styles.field}>
            <span>受講年度 <b>必須</b></span>
            <select required value={year} onChange={(event) => setYear(event.target.value)}>
              <option value="" disabled>年度を選択</option>
              {Array.from({ length: 8 }, (_, index) => thisYear - index).map((value) => <option key={value} value={value}>{value}年度</option>)}
            </select>
          </label>
          <label className={styles.field}>
            <span>内容 <b>必須</b></span>
            <textarea required minLength={5} maxLength={2000} rows={8} value={content} onChange={(event) => setContent(event.target.value)} placeholder="講義の内容、課題、雰囲気などを書いてください（5〜2000文字）" />
            <small>{content.length} / 2000文字</small>
          </label>
          <button className={styles.submitButton} type="submit">口コミを確認する</button>
          <p className={styles.note}>ログインは不要です。タイトル・受講年度・内容はすべて必須です。</p>
        </form>
      )}
    </section>
  );
}
