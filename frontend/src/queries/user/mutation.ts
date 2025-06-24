import { useMutation } from '@/queries/adapters';
import { userService } from '@/services/user';

export const useCreateUser = () => {
  return useMutation(userService.create);
};

export const useUpdateUser = () => {
  return useMutation(userService.update);
};

export const useDeleteUser = () => {
  return useMutation(userService.remove);
};
