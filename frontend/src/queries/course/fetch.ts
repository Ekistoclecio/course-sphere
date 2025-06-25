import { CourseModel } from '@/models/course';
import { queryClient } from '@/queries/client';
import { PaginationRequest } from '@/services/interfaces';

export const fetchCourses = (params?: PaginationRequest) => {
  return queryClient.fetchQuery({
    queryKey: ['courses', params],
    queryFn: () => CourseModel.findAll(params),
  });
};

export const fetchCourseById = (id: number) => {
  return queryClient.fetchQuery({
    queryKey: ['courses', id],
    queryFn: () => CourseModel.findById(id),
  });
};
