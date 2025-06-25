import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useDeleteCourse } from '@/queries/course/mutation';
import { useState } from 'react';
import { Course } from '@/schemas/course/course';
import { CourseCardProps } from '.';

export const useCourseCard = ({
  course,
  onDeleteCallback,
  onEditCallback,
  onInstructorsChangeCallback,
}: CourseCardProps) => {
  const { errorHandler } = useErrorHandler();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { mutateAsync: deleteCourse } = useDeleteCourse();

  const handleDeleteCourse = async () => {
    try {
      await deleteCourse(course.id);
      onDeleteCallback?.(course);
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleEditCourse = (editedCourse: Course) => {
    onEditCallback?.(editedCourse);
  };

  const handleInstructorsChange = () => {
    onInstructorsChangeCallback?.(course, []);
  };

  return {
    isConfirmationModalOpen,
    isEditModalOpen,
    setIsConfirmationModalOpen,
    setIsEditModalOpen,
    handleDeleteCourse,
    handleEditCourse,
    handleInstructorsChange,
  };
};
