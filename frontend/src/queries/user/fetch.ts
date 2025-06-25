import { UserModel } from '@/models/user';
import { queryClient } from '@/queries/client';

export const fetchRandomUsers = (results: number) => {
  return queryClient.fetchQuery({
    queryKey: ['randomUsers', results],
    queryFn: () => UserModel.getRandomUsers(results),
  });
};
