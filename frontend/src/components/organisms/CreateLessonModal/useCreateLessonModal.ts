import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateLessonData, createLessonSchema } from '@/schemas/lesson/createLesson';
import { useSnackbar } from 'notistack';
import { invalidateCoursesCache } from '@/queries/course/invalidation';
import { useCreateLesson } from '@/queries/lesson/mutation';
import { Lesson } from '@/schemas/lesson/lesson';
import { invalidateLessonsCache } from '@/queries/lesson/invalidation';
import { Course } from '@/schemas/course/course';

export const useCreateLessonModal = ({
  onClose,
  onCreateSuccessCallback,
  course,
}: {
  onClose: () => void;
  onCreateSuccessCallback?: (createdLesson: Lesson) => void;
  course: Course;
}) => {
  const { mutateAsync: createLesson } = useCreateLesson();
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
      title: '',
      video_url: '',
      publish_date: new Date().toISOString(),
      status: 'draft',
      course_id: course.id,
    },
  });

  const handleFormSubmit = async (data: CreateLessonData) => {
    try {
      const createdLesson = await createLesson(data);
      invalidateCoursesCache();
      reset();
      onClose();
      invalidateLessonsCache();
      onCreateSuccessCallback?.(createdLesson);
      enqueueSnackbar('Aula criada com sucesso', { variant: 'success' });
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
