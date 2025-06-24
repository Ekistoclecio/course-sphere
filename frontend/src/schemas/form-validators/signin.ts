import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email('Digite um e-mail válido.').nonempty('O e-mail é obrigatório.'),
  password: z
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres.')
    .nonempty('A senha é obrigatória.'),
});

export type SignInFormData = z.infer<typeof signInSchema>;
