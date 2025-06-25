import { queryClient } from '@/queries/client';

export const invalidateUsersCache = async () => {
  await queryClient.invalidateQueries({ queryKey: ['users'] });
};
