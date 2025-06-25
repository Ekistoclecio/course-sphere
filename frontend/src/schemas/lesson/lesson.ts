import { z } from 'zod';

export const lessonSchema = z.object({
  id: z.number(),
  title: z.string().nonempty({ message: 'O título é obrigatório.' }),
  status: z.enum(['draft', 'published', 'archived']).default('draft'), // ajuste os valores válidos conforme seu domínio
  publish_date: z.string().datetime({ message: 'A data de publicação deve ser válida.' }),
  video_url: z.string().url({ message: 'A URL do vídeo deve ser válida.' }),
  course_id: z.number(),
  creator_id: z.number(),
  can_manage: z.boolean(),
});

export type Lesson = z.infer<typeof lessonSchema>;
