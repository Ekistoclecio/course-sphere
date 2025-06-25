import { lessonService } from '@/services/lesson';
import { zodValidate } from '@/utils/zod/validate';
import { Lesson, lessonSchema } from '@/schemas/lesson/lesson';
import { CreateLessonData, createLessonBaseSchema } from '@/schemas/lesson/createLesson';
import { UpdateLessonData, updateLessonBaseSchema } from '@/schemas/lesson/updateLesson';
import { PaginationRequest, PaginationResponse } from '@/services/interfaces';

export class LessonModel {
  static async create(lesson: CreateLessonData): Promise<Lesson> {
    zodValidate(lesson, createLessonBaseSchema);
    const createdLesson = await lessonService.create(lesson);
    zodValidate(createdLesson, lessonSchema);
    return createdLesson;
  }

  static async update(lesson: UpdateLessonData, id: number): Promise<Lesson> {
    zodValidate(lesson, updateLessonBaseSchema);
    const updatedLesson = await lessonService.update(lesson, id);
    zodValidate(updatedLesson, lessonSchema);
    return updatedLesson;
  }

  static async remove(id: number): Promise<void> {
    return await lessonService.remove(id);
  }

  static async findAll(
    params?: PaginationRequest
  ): Promise<{ results: Lesson[]; pagination: PaginationResponse }> {
    const lessonsData = await lessonService.findAll(params);
    lessonsData.results.forEach((l) => zodValidate(l, lessonSchema));
    return lessonsData;
  }
}
