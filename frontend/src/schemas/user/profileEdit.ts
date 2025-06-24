import * as z from 'zod';

export const profileUpdateBaseSchema = z.object({
  name: z.string().min(3, 'O nome é obrigatório.'),
  email: z.string().email('Email inválido.'),
  password: z.string().optional(),
  confirm_password: z.string().optional(),
  current_password: z.string().min(6, 'A senha atual é obrigatória.'),
});

export const profileUpdateSchema = profileUpdateBaseSchema.refine(
  (data) => {
    const hasPassword = !!data.password && data.password.length > 0;
    const hasConfirm = !!data.confirm_password && data.confirm_password.length > 0;

    // Se um estiver preenchido, ambos devem ter pelo menos 6 caracteres
    if (hasPassword || hasConfirm) {
      return (
        (data.password?.length ?? 0) >= 6 &&
        (data.confirm_password?.length ?? 0) >= 6 &&
        data.password === data.confirm_password
      );
    }
    return true;
  },
  {
    message: 'A nova senha e a confirmação devem ter pelo menos 6 caracteres e serem iguais.',
    path: ['confirm_password'],
  }
);

export type EditProfileData = z.infer<typeof profileUpdateSchema>;
