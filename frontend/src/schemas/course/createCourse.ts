import { z } from 'zod';

export const createCourseBaseSchema = z.object({
  name: z
    .string()
    .nonempty({ message: 'O nome é obrigatório.' })
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres.' })
    .max(255, { message: 'O nome deve ter no máximo 255 caracteres.' }),
  description: z
    .string()
    .max(500, { message: 'A descrição deve ter no máximo 500 caracteres.' })
    .optional(),
  start_date: z.string().datetime({ message: 'Data de início inválida' }),
  end_date: z.string().datetime({ message: 'Data de término inválida' }),
});

export const createCourseSchema = createCourseBaseSchema.superRefine((data, ctx) => {
  const start = new Date(data.start_date);
  const end = new Date(data.end_date);

  console.log(start, end);

  if (start.toString() === 'Invalid Date' || end.toString() === 'Invalid Date') return;

  if (end <= start) {
    ctx.addIssue({
      path: ['end_date'],
      code: z.ZodIssueCode.custom,
      message: 'A data de término deve ser posterior à data de início.',
    });
  }
});

export type CreateCourseData = z.infer<typeof createCourseSchema>;
