import { notFound } from "next/navigation";
import { classes } from "../../data/classes";
import ReviewForm from "../../components/review-form";
import styles from "../../styles/post.module.css";

export default async function ClassPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = classes.find((item) => item.slug == slug);
  if (!course) notFound();

  return (
    <main className={styles.main}>
      <section className={styles.panel}>
        <p className={styles.eyebrow}>COURSE REVIEWS</p>
        <h1>{course.name}</h1>
        <p className={styles.description}>担当：{course.teacher} 先生</p>
        <section className={styles.reviews} aria-labelledby="reviews-title">
          <h2 id="reviews-title">この講義の口コミ</h2>
          <p>まだ口コミはありません。最初の口コミを投稿しませんか？</p>
        </section>
      </section>
      <ReviewForm courseName={course.name} />
    </main>
  );
}
