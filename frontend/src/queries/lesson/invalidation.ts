import { queryClient } from '@/queries/client';

export const invalidateLessonsCache = async () => {
  await queryClient.invalidateQueries({ queryKey: ['lessons'] });
};
