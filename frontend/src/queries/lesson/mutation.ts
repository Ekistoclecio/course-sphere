import { useMutation } from '@/queries/adapters';
import { LessonModel } from '@/models/lesson';
import { UpdateLessonData } from '@/schemas/lesson/updateLesson';

export const useCreateLesson = () => {
  return useMutation(LessonModel.create);
};

export const useUpdateLesson = () => {
  return useMutation(({ id, lesson }: { id: number; lesson: UpdateLessonData }) =>
    LessonModel.update(lesson, id)
  );
};

export const useDeleteLesson = () => {
  return useMutation(LessonModel.remove);
};
