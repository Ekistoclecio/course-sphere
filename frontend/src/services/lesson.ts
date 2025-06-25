import { CreateLessonData } from '@/schemas/lesson/createLesson';
import { Lesson } from '@/schemas/lesson/lesson';
import { UpdateLessonData } from '@/schemas/lesson/updateLesson';
import { ApiService } from '@/services/client';
import { FilterLessonParams, PaginationResponse } from '@/services/interfaces';

class LessonService extends ApiService {
  constructor() {
    super('lessons/');
  }

  create = async (lesson: CreateLessonData) => {
    const { data } = await this.post<Lesson>('', { ...lesson });
    return data;
  };

  update = async (lesson: UpdateLessonData, id: number) => {
    const { data } = await this.patch<Lesson>(`${id}`, { ...lesson });
    return data;
  };

  remove = async (id: number) => {
    await this.delete<void>(`${id}`);
    return;
  };

  findAll = async (params: FilterLessonParams) => {
    const { data } = await this.get<{ results: Lesson[]; pagination: PaginationResponse }>('', {
      params,
    });
    return data;
  };
}

export const lessonService = new LessonService();
