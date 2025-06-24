import { signIn, useSession } from 'next-auth/react';

import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useUpdateUser } from '@/queries/user/mutation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileUpdateSchema, EditProfileData } from '@/schemas/user/profileEdit';

export const useProfileEditModal = ({ onClose }: { onClose: () => void }) => {
  const { data: session } = useSession();
  const { errorHandler } = useErrorHandler();
  const { mutateAsync: updateUser } = useUpdateUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      name: session!.user.name,
      email: session!.user.email,
      password: '',
      confirm_password: '',
      current_password: '',
    },
  });

  const handleFormSubmit = async (data: EditProfileData) => {
    try {
      await updateUser({
        id: session!.user.id,
        user: data,
      });
      await signIn('credentials', {
        email: data.email,
        password: data.password || data.current_password,
        redirect: false,
      });
      onClose();
    } catch (error) {
      errorHandler(error);
    }
  };

  return {
    errors,
    isSubmitting,
    register,
    handleSubmit,
    handleFormSubmit,
  };
};
