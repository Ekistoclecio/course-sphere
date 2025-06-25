import { useMutation } from '@/queries/adapters';
import { EditProfileData } from '@/schemas/user/profileEdit';
import { UserModel } from '@/models/user';

export const useCreateUser = () => {
  return useMutation(UserModel.create);
};

export const useUpdateUser = () => {
  return useMutation(({ id, user }: { id: number; user: Partial<EditProfileData> }) =>
    UserModel.update(user, id)
  );
};

export const useDeleteUser = () => {
  return useMutation(UserModel.remove);
};
