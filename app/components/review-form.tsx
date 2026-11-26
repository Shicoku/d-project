"use client";

import { FormEvent, Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import styles from "../styles/post.module.css";

const ratingItems = ["課題", "面白さ", "分かりやすさ", "テスト", "出席", "教授の話"];

export default function ReviewForm({ courseName, courseSlug }: { courseName: string; courseSlug: string }) {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [year, setYear] = useState("");
  const [scores, setScores] = useState([3, 3, 3, 3, 3, 3]);
  const thisYear = new Date().getFullYear();
  const chartData = ratingItems.map((subject, index) => ({
    subject,
    value: scores[index],
  }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug,
          title,
          content,
          schoolYear: Number(year),
          assignmentScore: scores[0],
          interestScore: scores[1],
          clarityScore: scores[2],
          testScore: scores[3],
          attendanceScore: scores[4],
          professorTalkScore: scores[5],
        }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "投稿に失敗しました。もう一度お試しください。");
      setSubmitted(true);
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "投稿に失敗しました。もう一度お試しください。");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className={styles.panel}>
      <p className={styles.eyebrow}>WRITE A REVIEW</p>
      <h2 className={styles.formHeading}>この講義の口コミを投稿</h2>
      <p className={styles.description}>投稿先：{courseName}</p>
      {submitted ? (
        <div className={styles.confirmation} role="status">
          <h3>口コミを投稿しました</h3>
          <p>投稿内容はこの講義のページに表示されます。</p>
          <dl>
            <dt>講義</dt><dd>{courseName}</dd>
            <dt>タイトル</dt><dd>{title}</dd>
            <dt>受講年度</dt><dd>{year}年度</dd>
            {ratingItems.map((item, index) => <Fragment key={item}><dt>{item}</dt><dd>{scores[index]} / 5</dd></Fragment>)}
            <dt>内容</dt><dd className={styles.preview}>{content}</dd>
          </dl>
          <button className={styles.secondaryButton} onClick={() => setSubmitted(false)} type="button">内容を編集する</button>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <fieldset className={styles.ratingGroup}>
            <legend>講義の評価 <span>各項目を1〜5で評価</span></legend>
            <div className={styles.chart} aria-label="評価のレーダーチャート">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#536257", fontSize: 12 }} />
                  <PolarRadiusAxis domain={[0, 5]} tickCount={6} axisLine={false} tick={false} />
                  <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className={styles.ratingList}>
              {ratingItems.map((item, index) => (
                <label className={styles.ratingField} key={item}>
                  <span>{item}<strong>{scores[index]} / 5</strong></span>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={scores[index]}
                    aria-label={`${item}の評価`}
                    onChange={(event) => setScores((current) => current.map((score, scoreIndex) => scoreIndex === index ? Number(event.target.value) : score))}
                  />
                  <small><span>1：低評価</span><span>5：高評価</span></small>
                </label>
              ))}
            </div>
          </fieldset>
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
          {error && <p className={styles.error} role="alert">{error}</p>}
          <button className={styles.submitButton} type="submit" disabled={submitting}>{submitting ? "投稿中…" : "口コミを投稿する"}</button>
          <p className={styles.note}>ログインは不要です。タイトル・受講年度・内容はすべて必須です。</p>
        </form>
      )}
    </section>
  );
}
