import { LessonModel } from '@/models/lesson';
import { queryClient } from '@/queries/client';
import { FilterLessonParams } from '@/services/interfaces';

export const fetchLessons = (params: FilterLessonParams) => {
  return queryClient.fetchQuery({
    queryKey: ['lessons', params],
    queryFn: () => LessonModel.findAll(params),
  });
};
