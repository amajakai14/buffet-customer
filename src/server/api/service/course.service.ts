import type { Course, PrismaClient } from "@prisma/client";

export async function getCourseService(
  prisma: PrismaClient,
  course_id: number
): Promise<Course | null> {
  const course = await prisma.course.findFirst({
    where: { id: course_id },
  });
  return course;
}
