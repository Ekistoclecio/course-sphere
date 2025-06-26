import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateCourseData, createCourseSchema } from '@/schemas/course/createCourse';
import { useCreateCourse } from '@/queries/course/mutation';
import { useSnackbar } from 'notistack';
import { invalidateCoursesCache } from '@/queries/course/invalidation';
import { Course } from '@/schemas/course/course';
import { useEffect } from 'react';

export const useCreateCourseModal = ({
  onClose,
  onCreateSuccessCallback,
  open,
}: {
  onClose: () => void;
  onCreateSuccessCallback?: (createdCourse: Course) => void;
  open: boolean;
}) => {
  const { mutateAsync: createCourse } = useCreateCourse();
  const { enqueueSnackbar } = useSnackbar();
  const { errorHandler } = useErrorHandler();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateCourseData>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      name: '',
      description: '',
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
    },
  });

  const handleFormSubmit = async (data: CreateCourseData) => {
    try {
      const createdCourse = await createCourse(data);
      invalidateCoursesCache();
      reset();
      onClose();
      onCreateSuccessCallback?.(createdCourse);
      enqueueSnackbar('Curso criado com sucesso', { variant: 'success' });
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    reset();
  }, [open]);

  return {
    errors,
    isSubmitting,
    control,
    register,
    handleSubmit,
    handleFormSubmit,
  };
};
