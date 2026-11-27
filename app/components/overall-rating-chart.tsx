"use client";

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

export default function OverallRatingChart({
  averages,
  reviewCount,
}: {
  averages: number[];
  reviewCount: number;
}) {
  const chartData = ratingItems.map((subject, index) => ({ subject, value: averages[index] }));

  return (
    <section className={styles.panel} aria-labelledby="overall-rating-title">
      <p className={styles.eyebrow}>OVERALL RATING</p>
      <h2 className={styles.formHeading} id="overall-rating-title">総評価</h2>
      <p className={styles.description}>
        {reviewCount > 0 ? `${reviewCount}件の口コミの項目別平均（5点満点）` : "口コミが投稿されると、項目別の平均評価を表示します。"}
      </p>
      {reviewCount > 0 ? (
        <>
          <div className={styles.chart} role="img" aria-label={`総評価のレーダーチャート。${ratingItems.map((item, index) => `${item} ${averages[index].toFixed(1)}点`).join("、")}`}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#536257", fontSize: 12 }} />
                <PolarRadiusAxis domain={[0, 5]} tickCount={6} axisLine={false} tick={false} />
                <Radar dataKey="value" stroke="#345d43" fill="#66866c" fillOpacity={0.35} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <ul className={styles.reviewScores}>
            {ratingItems.map((item, index) => (
              <li key={item}>{item}<strong>{averages[index].toFixed(1)} / 5</strong></li>
            ))}
          </ul>
        </>
      ) : <p className={styles.emptyChart}>評価データはまだありません。</p>}
    </section>
  );
}
