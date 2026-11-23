import Link from "next/link";
import { classes } from "../data/classes";
import styles from "../styles/classes.module.css";

export default function ClassesPage() {
  return (
    <main className={styles.page}>
      <header className={styles.heading}>
        <h1>授業一覧</h1>
      </header>

      <ul className={styles.grid}>
        {classes.map((course) => (
          <li key={course.slug} className={styles.card}>
            <Link className={styles.cardLink} href={`/classes/${course.slug}`}>
              <h2>{course.name}</h2>
              <p>担当：{course.teacher} 先生</p>
              <span className={styles.arrow}>授業を見る →</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
