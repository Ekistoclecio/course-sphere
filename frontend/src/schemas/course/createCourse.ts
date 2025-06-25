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
  start_date: z
    .string()
    .datetime({ message: 'A data de início deve ser uma data válida.' })
    .nonempty({ message: 'A data de início é obrigatória.' }),
  end_date: z
    .string()
    .datetime({ message: 'A data de término deve ser uma data válida.' })
    .nonempty({ message: 'A data de término é obrigatória.' }),
});

export const createCourseSchema = createCourseBaseSchema.refine(
  (data) => new Date(data.end_date) > new Date(data.start_date),
  {
    path: ['end_date'],
    message: 'A data de término deve ser posterior à data de início.',
  }
);

export type CreateCourseData = z.infer<typeof createCourseSchema>;
