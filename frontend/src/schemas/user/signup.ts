import { z } from 'zod';

export const signUpBaseSchema = z.object({
  name: z.string().nonempty('O nome é obrigatório.'),
  email: z.string().email('Digite um e-mail válido.').nonempty('O e-mail é obrigatório.'),
  password: z
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres.')
    .nonempty('A senha é obrigatória.'),
  confirm_password: z
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres.')
    .nonempty('A senha é obrigatória.'),
});

export const signUpSchema = signUpBaseSchema.refine(
  (data) => data.password === data.confirm_password,
  {
    message: 'As senha e confirmação de senha não coincidem.',
    path: ['confirm_password'],
  }
);

export type SignUpData = z.infer<typeof signUpSchema>;
