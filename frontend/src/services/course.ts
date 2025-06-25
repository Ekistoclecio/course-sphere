import { Course } from '@/schemas/course/course';
import { CreateCourseData } from '@/schemas/course/createCourse';
import { UpdateCourseData } from '@/schemas/course/updateCourse';
import { ApiService } from '@/services/client';
import { PaginationRequest, PaginationResponse } from '@/services/interfaces';

class CourseService extends ApiService {
  constructor() {
    super('courses/');
  }

  create = async (course: CreateCourseData) => {
    const { data } = await this.post<Course>('', { ...course });
    return data;
  };

  update = async (course: UpdateCourseData, id: number) => {
    const { data } = await this.patch<Course>(`${id}`, { ...course });
    return data;
  };

  remove = async (id: number) => {
    await this.delete<void>(`${id}`);
    return;
  };

  findAll = async (params: PaginationRequest = { offset: 0, limit: 12 }) => {
    const { data } = await this.get<{ results: Course[]; pagination: PaginationResponse }>('', {
      params,
    });
    console.log(data);
    return data;
  };

  findById = async (id: number) => {
    const { data } = await this.get<Course>(`${id}`);
    return data;
  };

  addInstructor = async (id: number, instructorID: number[]) => {
    const { data } = await this.patch<Course>(`${id}/instructors`, {
      instructors_ids: instructorID,
    });
    return data;
  };

  removeInstructor = async (id: number, instructorID: number[]) => {
    const { data } = await this.patch<Course>(`${id}/instructors/remove`, {
      instructors_ids: instructorID,
    });
    return data;
  };
}

export const courseService = new CourseService();
