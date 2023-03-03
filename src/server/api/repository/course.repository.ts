import type { Course, PrismaClient } from "@prisma/client";
import { getCourseService } from "../service/course.service";

export const getCourse: GetCourse = getCourseService;

interface GetCourse {
  (prisma: PrismaClient, course_id: number): Promise<Course | null>;
}
