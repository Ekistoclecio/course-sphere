import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpData, signUpSchema } from '@/schemas/user/signup';
import { useSnackbar } from 'notistack';
import { useCreateUser } from '@/queries/user/mutation';
import { useErrorHandler } from '@/hooks/useErrorHandler';

export const useSignUpForm = () => {
  const router = useRouter();
  const { mutateAsync: signUp } = useCreateUser();
  const { enqueueSnackbar } = useSnackbar();
  const { errorHandler } = useErrorHandler();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpData) => {
    try {
      await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
        confirm_password: data.confirm_password,
      });
      enqueueSnackbar('Usuário cadastrado com sucesso.', {
        variant: 'success',
      });
      router.push('/sign-in');
    } catch (error) {
      errorHandler(error);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  };
};
