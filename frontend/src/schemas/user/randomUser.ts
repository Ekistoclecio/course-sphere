import { z } from 'zod';

export const randomUserSchema = z.object({
  name: z.object({
    first: z.string(),
    last: z.string(),
  }),
  email: z.string().email(),
  login: z.object({
    password: z.string(),
  }),
});

export type RandomUser = z.infer<typeof randomUserSchema>;
