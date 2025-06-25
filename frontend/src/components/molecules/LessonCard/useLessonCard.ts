import { useErrorHandler } from '@/hooks/useErrorHandler';
import { invalidateLessonsCache } from '@/queries/lesson/invalidation';
import { useDeleteLesson } from '@/queries/lesson/mutation';
import { Lesson } from '@/schemas/lesson/lesson';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

export interface LessonCardHook {
  lesson: Lesson;
  onDeleteLessonCallback: (lesson: Lesson) => void;
}

export const useLessonCard = ({ lesson, onDeleteLessonCallback }: LessonCardHook) => {
  const { mutateAsync: deleteLesson } = useDeleteLesson();
  const { enqueueSnackbar } = useSnackbar();
  const { errorHandler } = useErrorHandler();

  const [isEditLessonOpen, setIsEditLessonOpen] = useState(false);
  const [isDeleteLessonOpen, setIsDeleteLessonOpen] = useState(false);

  const handleDeleteLesson = async () => {
    try {
      await deleteLesson(lesson.id);
      enqueueSnackbar('Aula deletada com sucesso', { variant: 'success' });
      invalidateLessonsCache();
      onDeleteLessonCallback(lesson);
    } catch (error) {
      errorHandler(error);
    }
  };

  return {
    isDeleteLessonOpen,
    isEditLessonOpen,
    handleDeleteLesson,
    setIsDeleteLessonOpen,
    setIsEditLessonOpen,
  };
};
