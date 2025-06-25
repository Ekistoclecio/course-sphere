import { createLessonBaseSchema } from '@/schemas/lesson/createLesson';
import { z } from 'zod';

export const updateLessonBaseSchema = createLessonBaseSchema.partial();

export type UpdateLessonBaseData = z.infer<typeof updateLessonBaseSchema>;

export const validateLessonRules = (data: UpdateLessonBaseData, ctx: z.RefinementCtx) => {
  if (data.publish_date) {
    const isFuture = new Date(data.publish_date) > new Date();
    if (!isFuture) {
      ctx.addIssue({
        path: ['publish_date'],
        code: z.ZodIssueCode.custom,
        message: 'A data de publicação deve ser uma data futura.',
      });
    }
  }

  if (data.video_url) {
    const isSupported =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|vimeo\.com\/)/.test(
        data.video_url
      );

    if (!isSupported) {
      ctx.addIssue({
        path: ['video_url'],
        code: z.ZodIssueCode.custom,
        message:
          'A URL do vídeo deve ser de um serviço suportado. Os serviços suportados atualmente são Vimeo ou YouTube.',
      });
    }
  }
};

export const updateLessonSchema = updateLessonBaseSchema.superRefine(validateLessonRules);

export type UpdateLessonData = z.infer<typeof updateLessonSchema>;
