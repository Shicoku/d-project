import styles from "../styles/terms.module.css";

const sections = [
  {
    id: "service",
    title: "1. サービスについて",
    paragraphs: [
      "Corgiは、中部大学の講義に関する情報や口コミを共有するためのサービスです。利用者は、本規約に同意したうえで本サービスを利用するものとします。",
      "本サービスは、講義選びの参考情報を提供するものであり、講義の内容や評価の正確性、完全性を保証するものではありません。",
    ],
  },
  {
    id: "投稿",
    title: "2. 投稿内容について",
    paragraphs: ["口コミを投稿する場合は、ご自身の経験を元にご記入ください。"],
  },
  {
    id: "prohibited",
    title: "3. 禁止事項",
    paragraphs: ["以下の行為を禁止します。"],
    list: [
      "個人を特定できる情報や、プライバシーを侵害する内容を投稿する行為",
      "誹謗中傷、差別的表現、脅迫、嫌がらせ、虚偽の情報を投稿する行為",
      "講義と無関係な内容、広告、宣伝、スパムを投稿する行為",
      "他者の権利を侵害すること、または法令や公序良俗に反する行為",
      "本サービスの運営を妨げること、または不正なアクセスを試みる行為",
    ],
  },
  {
    id: "moderation",
    title: "4. 投稿の確認・削除",
    paragraphs: [
      "運営者は、投稿が本規約に違反する場合や、サービスの運営上必要と判断した場合、投稿者への事前通知なく投稿の非表示、編集または削除を行うことがあります。",
      "掲載内容に問題がある場合は、該当ページに設置された削除依頼窓口からお知らせください。内容を確認のうえ対応します。",
    ],
  },
  {
    id: "disclaimer",
    title: "5. 免責事項",
    paragraphs: [
      "運営者は、本サービスに掲載された情報を利用したことにより生じた損害について、運営者に故意または重大な過失がある場合を除き、責任を負いません。",
      "システム保守、障害その他の事情により、本サービスの全部または一部を予告なく変更・停止することがあります。",
    ],
  },
  {
    id: "changes",
    title: "6. 規約の変更",
    paragraphs: [
      "本規約は、予告なく変更される場合があります。変更後の規約は本ページに掲示された時点で効力を生じます。",
      "継続して利用された場合は、変更に同意したものとみなします。",
    ],
  },
];

export default function Terms() {
  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>Corgi / GUIDELINES</span>
        <h1>利用規約</h1>
        <p>
          この利用規約は、本サービスの利用規約を定めるものです。利用者は本規約に同意したうえでご利用ください。
        </p>
      </header>

      <nav className={styles.contents} aria-label="目次">
        <h2>目次</h2>
        <ol>
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.title}</a>
            </li>
          ))}
        </ol>
      </nav>

      <article className={styles.document}>
        {sections.map((section) => (
          <section className={styles.section} id={section.id} key={section.id}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.list && (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>
    </main>
  );
}
