import { useQuery } from '@tanstack/react-query';
import { PaginationRequest } from '@/services/interfaces';
import { CourseModel } from '@/models/course';

export const useCoursesQuery = (params?: PaginationRequest) => {
  return useQuery({
    queryKey: ['courses', params],
    queryFn: () => CourseModel.findAll(params),
  });
};

export const useCourseByIdQuery = (id: number) => {
  return useQuery({
    queryKey: ['courses', id],
    queryFn: () => CourseModel.findById(id),
    enabled: !!id,
  });
};
