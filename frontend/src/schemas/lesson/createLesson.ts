import { z } from 'zod';

export const createLessonBaseSchema = z.object({
  title: z
    .string({ required_error: 'O título é obrigatório.' })
    .min(3, { message: 'O título deve ter pelo menos 3 caracteres.' })
    .max(255, { message: 'O título deve ter no máximo 255 caracteres.' }),

  publish_date: z
    .string({ required_error: 'A data de publicação é obrigatória.' })
    .datetime({ message: 'A data de publicação deve ser uma data válida.' }),

  status: z.enum(['published', 'draft', 'archived'], {
    message: 'O status deve ser um dos seguintes valores: Publicado, Rascunho, Arquivado.',
  }),

  video_url: z
    .string({ required_error: 'A URL do vídeo é obrigatória.' })
    .url({ message: 'A URL do vídeo deve ser válida.' }),

  course_id: z
    .number({ required_error: 'O curso é obrigatório.' })
    .int({ message: 'O ID do curso deve ser um número inteiro.' }),
});

export const createLessonSchema = createLessonBaseSchema
  .refine((data) => new Date(data.publish_date) > new Date(), {
    path: ['publish_date'],
    message: 'A data de publicação deve ser uma data futura.',
  })
  .refine(
    (data) => /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)/.test(data.video_url),
    {
      path: ['video_url'],
      message:
        'A URL do vídeo deve ser de um serviço suportado. Os serviços suportados atualmente são YouTube.',
    }
  );

export type CreateLessonData = z.infer<typeof createLessonSchema>;
