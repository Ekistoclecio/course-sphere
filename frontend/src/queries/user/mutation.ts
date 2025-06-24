import { useMutation } from '@/queries/adapters';
import { EditProfileData } from '@/schemas/user/profileEdit';
import { userService } from '@/services/user';

export const useCreateUser = () => {
  return useMutation(userService.create);
};

export const useUpdateUser = () => {
  return useMutation(({ id, user }: { id: number; user: Partial<EditProfileData> }) =>
    userService.update(user, id)
  );
};

export const useDeleteUser = () => {
  return useMutation(userService.remove);
};
