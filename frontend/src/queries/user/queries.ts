import { useQuery } from '@tanstack/react-query';
import { UserModel } from '@/models/user';

export const useRandomUsersQuery = (results: number) => {
  return useQuery({
    queryKey: ['randomUsers', results],
    queryFn: () => UserModel.getRandomUsers(results),
  });
};
