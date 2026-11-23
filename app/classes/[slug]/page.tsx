import { notFound } from "next/navigation";
import { classes } from "../../data/classes";

export default async function ClassPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = classes.find((item) => item.slug == slug);
  if (!course) notFound();

  return (
    <main>
      <h1>{course.name}</h1>
      <p>担当：{course.teacher} 先生</p>
    </main>
  );
}
