import { notFound } from "next/navigation";
import { env } from "cloudflare:workers";
import { classes } from "../../data/classes";
import ReviewForm from "../../components/review-form";
import ReviewDeleteRequest from "../../components/review-delete-request";
import OverallRatingChart from "../../components/overall-rating-chart";
import styles from "../../styles/post.module.css";

type Review = {
  id: string;
  title: string;
  content: string;
  school_year: number;
  assignment_score: number;
  interest_score: number;
  clarity_score: number;
  test_score: number;
  attendance_score: number;
  professor_talk_score: number;
  created_at: string;
};

export default async function ClassPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = classes.find((item) => item.slug == slug);
  if (!course) notFound();
  const { results: reviews } = await env.DB.prepare(
    `SELECT id, title, content, school_year, assignment_score, interest_score,
      clarity_score, test_score, attendance_score, professor_talk_score, created_at
     FROM reviews WHERE course_slug = ? ORDER BY created_at DESC LIMIT 100`,
  ).bind(slug).all<Review>();
  const overall = await env.DB.prepare(
    `SELECT COUNT(*) AS review_count,
      AVG(assignment_score) AS assignment_score,
      AVG(interest_score) AS interest_score,
      AVG(clarity_score) AS clarity_score,
      AVG(test_score) AS test_score,
      AVG(attendance_score) AS attendance_score,
      AVG(professor_talk_score) AS professor_talk_score
     FROM reviews WHERE course_slug = ?`,
  ).bind(slug).first<{
    review_count: number;
    assignment_score: number | null;
    interest_score: number | null;
    clarity_score: number | null;
    test_score: number | null;
    attendance_score: number | null;
    professor_talk_score: number | null;
  }>();
  const averages = [overall?.assignment_score, overall?.interest_score, overall?.clarity_score,
    overall?.test_score, overall?.attendance_score, overall?.professor_talk_score]
    .map((score) => score ?? 0);
  const reviewCount = overall?.review_count ?? 0;

  return (
    <main className={styles.main}>
      <section className={styles.panel}>
        <p className={styles.eyebrow}>COURSE REVIEWS</p>
        <h1>{course.name}</h1>
        <p className={styles.description}>担当：{course.teacher} 先生</p>
        <section className={styles.reviews} aria-labelledby="reviews-title">
          <h2 id="reviews-title">この講義の口コミ</h2>
          {reviews.length ? reviews.map((review) => (
            <article className={styles.reviewCard} key={review.id}>
              <h3>{review.title}</h3>
              <p className={styles.reviewMeta}>{review.school_year}年度 · {new Date(`${review.created_at.replace(" ", "T")}Z`).toLocaleDateString("ja-JP")}</p>
              <p className={styles.reviewContent}>{review.content}</p>
              <ul className={styles.reviewScores}>
                {["課題", "面白さ", "分かりやすさ", "テスト", "出席", "教授の話"].map((label, index) => (
                  <li key={label}>{label}<strong>{[review.assignment_score, review.interest_score, review.clarity_score, review.test_score, review.attendance_score, review.professor_talk_score][index]}/5</strong></li>
                ))}
              </ul>
              <ReviewDeleteRequest reviewId={review.id} />
            </article>
          )) : <p>まだ口コミはありません。最初の口コミを投稿しませんか？</p>}
        </section>
      </section>
      <OverallRatingChart averages={averages} reviewCount={reviewCount} />
      <ReviewForm courseName={course.name} courseSlug={course.slug} />
    </main>
  );
}
