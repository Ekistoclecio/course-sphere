import { userSchema } from '@/schemas/user/user';
import { z } from 'zod';

export const courseSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
  creator_id: z.number(),
  creator: userSchema,
  instructors: z.array(userSchema),
});

export type Course = z.infer<typeof courseSchema>;
