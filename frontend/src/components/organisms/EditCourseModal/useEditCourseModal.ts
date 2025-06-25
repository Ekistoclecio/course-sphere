import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateCourse } from '@/queries/course/mutation';
import { useSnackbar } from 'notistack';
import { invalidateCoursesCache } from '@/queries/course/invalidation';
import { Course } from '@/schemas/course/course';
import { UpdateCourseData, updateCourseSchema } from '@/schemas/course/updateCourse';

export const useEditCourseModal = ({
  onClose,
  onEditSuccessCallback,
  course,
}: {
  onClose: () => void;
  onEditSuccessCallback?: (editedCourse: Course) => void;
  course: Course;
}) => {
  const { mutateAsync: updateCourse } = useUpdateCourse();
  const { enqueueSnackbar } = useSnackbar();
  const { errorHandler } = useErrorHandler();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateCourseData>({
    resolver: zodResolver(updateCourseSchema),
    defaultValues: {
      name: course.name,
      description: course.description,
      start_date: course.start_date,
      end_date: course.end_date,
    },
  });

  const handleFormSubmit = async (data: UpdateCourseData) => {
    try {
      const editedCourse = await updateCourse({ id: course.id, course: data });
      invalidateCoursesCache();
      reset();
      onClose();
      onEditSuccessCallback?.(editedCourse);
      enqueueSnackbar('Curso editado com sucesso', { variant: 'success' });
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
