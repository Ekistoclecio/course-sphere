import { useQuery } from '@tanstack/react-query';
import { FilterLessonParams } from '@/services/interfaces';
import { LessonModel } from '@/models/lesson';

export const useLessonsQuery = (params: FilterLessonParams) => {
  return useQuery({
    queryKey: ['lessons', params],
    queryFn: () => LessonModel.findAll(params),
  });
};
