import { courseService } from '@/services/course';
import { zodValidate } from '@/utils/zod/validate';
import { Course, courseSchema } from '@/schemas/course/course';
import { CreateCourseData, createCourseBaseSchema } from '@/schemas/course/createCourse';
import { UpdateCourseData, updateCourseBaseSchema } from '@/schemas/course/updateCourse';
import { PaginationRequest } from '@/services/interfaces';

export class CourseModel {
  static async create(course: CreateCourseData): Promise<Course> {
    zodValidate(course, createCourseBaseSchema);
    const createdCourse = await courseService.create(course);
    zodValidate(createdCourse, courseSchema);
    return createdCourse;
  }

  static async update(course: UpdateCourseData, id: number): Promise<Course> {
    zodValidate(course, updateCourseBaseSchema);
    const updatedCourse = await courseService.update(course, id);
    zodValidate(updatedCourse, courseSchema);
    return updatedCourse;
  }

  static async remove(id: number): Promise<void> {
    return await courseService.remove(id);
  }

  static async findAll(params?: PaginationRequest): Promise<Course[]> {
    const courses = await courseService.findAll(params);
    courses.forEach((c) => zodValidate(c, courseSchema));
    return courses;
  }

  static async findById(id: number): Promise<Course> {
    const course = await courseService.findById(id);
    zodValidate(course, courseSchema);
    return course;
  }

  static async addInstructor(id: number, instructorID: number): Promise<Course> {
    const updated = await courseService.addInstructor(id, instructorID);
    zodValidate(updated, courseSchema);
    return updated;
  }

  static async removeInstructor(id: number, instructorID: number): Promise<void> {
    await courseService.removeInstructor(id, instructorID);
  }
}
