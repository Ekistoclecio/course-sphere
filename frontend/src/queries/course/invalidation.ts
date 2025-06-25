import { queryClient } from '@/queries/client';

export const invalidateCoursesCache = async (id?: number) => {
  if (id) {
    await queryClient.invalidateQueries({ queryKey: ['courses', id] });
  }
  await queryClient.invalidateQueries({ queryKey: ['courses'] });
};
