import Link from "next/link";
import { classes } from "./data/classes";
import styles from "./styles/home.module.css";

export default function Home() {
  const featuredClasses = classes
    .filter((course) => course.featured)
    .slice(0, 5);

  return (
    <main className={styles.main}>
      <section className={styles.search}>
        <input type="search" className={styles.input} />
        <button className={styles.sarchBox}></button>
      </section>

      <section className={styles.cards}>
        {featuredClasses.map((course) => (
          <Link
            key={course.slug}
            className={styles.card}
            href={`/classes/${course.slug}`}
          >
            <h2>{course.name}</h2>
            <p>担当: {course.teacher} 先生</p>
            <span>授業を見る →</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
