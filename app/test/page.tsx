
"use client";

import { useState } from "react";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export default function Home() {

  // 6項目の名前
  const items = [
    "分かりやすさ",
    "面白さ",
    "テスト",
    "課題",
    "出席数",
    "教授の話",
  ];

  // 各項目の評価基準
const descriptions = [
  ["0：分かりにくい", "5：分かりやすい"],
  ["0：面白みに欠ける", "5：面白い"],
  ["0：難しい", "5：簡単"],
  ["0：課題が大量", "5：課題がない"],
  ["0：出席条件が厳しい", "5：出席の必要なし"],
  ["0：何を言っているか分からない", "5：面白い、ためになる"],
];

  // それぞれの評価点を管理
  const [scores, setScores] = useState([
    3, 3, 3, 3, 3, 3
  ]);

  // 評価点を変更する関数
  const changeScore = (index: number, value: number) => {

    const newScores = [...scores];

    newScores[index] = value;

    setScores(newScores);
  };

  // グラフ用のデータを作成
  const chartData = items.map((item, index) => ({
    subject: item,
    value: scores[index],
  }));

  return (
    <main style={{
      maxWidth: "600px",
      margin: "auto",
      padding: "30px"
    }}>

      <h1>6項目評価レーダーチャート</h1>

      {/* レーダーチャート */}
      <div style={{ width: "100%", height: 350 }}>

        <ResponsiveContainer width="100%" height="100%">

          <RadarChart data={chartData}>

            <PolarGrid />

            <PolarAngleAxis dataKey="subject" />

            <PolarRadiusAxis
                domain={[0, 5]}
                tickCount={6}
                axisLine={false}
                tick={false}
            />

            <Radar
              dataKey="value"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.4}
            />

          </RadarChart>

        </ResponsiveContainer>

      </div>

      {/* 評価入力欄 */}
      <h2>評価を入力</h2>

      {items.map((item, index) => (

        <div key={item} style={{ marginBottom: "15px" }}>

          <label>
            {item}：{scores[index]}点
          </label>

        <div style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            color: "#666"
            }}>

            <span>{descriptions[index][0]}</span>
            <span>{descriptions[index][1]}</span>
            </div>

          <input
            type="range"
            min="0"
            max="5"
            value={scores[index]}
            onChange={(e) =>
              changeScore(index, Number(e.target.value))
            }
            style={{ width: "100%" }}
          />

        </div>

      ))}

    </main>
  );
}
