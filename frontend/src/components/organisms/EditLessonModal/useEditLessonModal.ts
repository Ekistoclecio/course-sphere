import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateLessonData, createLessonSchema } from '@/schemas/lesson/createLesson';
import { useSnackbar } from 'notistack';
import { invalidateCoursesCache } from '@/queries/course/invalidation';
import { useUpdateLesson } from '@/queries/lesson/mutation';
import { Lesson } from '@/schemas/lesson/lesson';
import { invalidateLessonsCache } from '@/queries/lesson/invalidation';

export const useEditLessonModal = ({
  onClose,
  onEditSuccessCallback,
  lesson,
}: {
  onClose: () => void;
  onEditSuccessCallback?: (editedLesson: Lesson) => void;
  lesson: Lesson;
}) => {
  const { mutateAsync: editLesson } = useUpdateLesson();
  const { enqueueSnackbar } = useSnackbar();
  const { errorHandler } = useErrorHandler();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateLessonData>({
    resolver: zodResolver(createLessonSchema),
    defaultValues: {
      title: lesson.title,
      video_url: lesson.video_url,
      publish_date: lesson.publish_date,
      status: lesson.status,
      course_id: lesson.course_id,
    },
  });

  const handleFormSubmit = async (data: CreateLessonData) => {
    try {
      const editedLesson = await editLesson({
        id: lesson.id,
        lesson: data,
      });
      invalidateCoursesCache();
      reset();
      onClose();
      invalidateLessonsCache();
      onEditSuccessCallback?.(editedLesson);
      enqueueSnackbar('Aula editada com sucesso', { variant: 'success' });
    } catch (error) {
      errorHandler(error);
    }
  };

  return {
    errors,
    isSubmitting,
    control,
    register,
    handleSubmit,
    handleFormSubmit,
  };
};
