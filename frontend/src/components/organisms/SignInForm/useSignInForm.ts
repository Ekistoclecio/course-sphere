import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { SignInFormData, signInSchema } from '@/schemas/user/signin';
import { useSnackbar } from 'notistack';

export const useSignInForm = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      enqueueSnackbar('E-mail ou senha incorretos. Verifique seus dados e tente novamente.', {
        variant: 'error',
      });
    } else {
      router.replace('/dashboard');
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
