import { createCourseBaseSchema } from '@/schemas/course/createCourse';
import { z } from 'zod';

export const updateCourseBaseSchema = createCourseBaseSchema.partial();

export const updateCourseSchema = updateCourseBaseSchema.refine(
  (data) => {
    if (!data.start_date || !data.end_date) return true; // ignora se algum estiver ausente
    return new Date(data.end_date) > new Date(data.start_date);
  },
  {
    path: ['end_date'],
    message: 'A data de término deve ser posterior à data de início.',
  }
);

export type UpdateCourseData = z.infer<typeof updateCourseSchema>;
