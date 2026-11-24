import Link from "next/link";
import { classes } from "./data/classes";
import styles from "./styles/home.module.css";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const query = Array.isArray(params.q)
    ? (params.q[0] ?? "")
    : (params.q ?? "");
  const normalizedQuery = query.trim().toLocaleLowerCase();

  const displayedClasses = normalizedQuery
    ? classes.filter((course) =>
        `${course.name} ${course.teacher}`
          .toLocaleLowerCase()
          .includes(normalizedQuery),
      )
    : classes.filter((course) => course.featured).slice(0, 5);

  return (
    <main className={styles.main}>
      <form className={styles.search} action="/" method="get" role="search">
        <input
          type="search"
          name="q"
          className={styles.input}
          placeholder="講義名・教員名で検索"
          aria-label="講義名または教員名で検索"
          defaultValue={query}
        />
        <button className={styles.sarchBox} aria-label="検索" type="submit" />
      </form>

      {displayedClasses.length > 0 ? (
        <section className={styles.cards} aria-live="polite">
          {displayedClasses.map((course) => (
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
      ) : (
        <p className={styles.empty}>該当する講義が見つかりませんでした</p>
      )}
    </main>
  );
}
