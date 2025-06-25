import { UserModel } from '@/models/user';
import { queryClient } from '@/queries/client';

export const fetchRandomUsers = (results: number) => {
  return queryClient.fetchQuery({
    queryKey: ['users', 'randomUsers', results],
    queryFn: () => UserModel.getRandomUsers(results),
  });
};
