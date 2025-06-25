import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useDeleteCourse } from '@/queries/course/mutation';
import { useState } from 'react';
import { Course } from '@/schemas/course/course';
import { CourseCardProps } from '.';
import { User } from '@/schemas/user/user';
import { useRouter } from 'next/navigation';

export const useCourseCard = ({
  course,
  onDeleteCallback,
  onEditCallback,
  onInstructorsChangeCallback,
}: CourseCardProps) => {
  const { errorHandler } = useErrorHandler();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInstructorsManagerModalOpen, setIsInstructorsManagerModalOpen] = useState(false);
  const { mutateAsync: deleteCourse } = useDeleteCourse();
  const router = useRouter();
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

  const handleInstructorsChange = (instructors: User[]) => {
    onInstructorsChangeCallback?.(course, instructors);
  };

  const openCoursePage = () => {
    router.push(`/courses/${course.id}`);
  };

  return {
    isConfirmationModalOpen,
    isEditModalOpen,
    isInstructorsManagerModalOpen,
    setIsConfirmationModalOpen,
    setIsEditModalOpen,
    handleDeleteCourse,
    handleEditCourse,
    handleInstructorsChange,
    setIsInstructorsManagerModalOpen,
    openCoursePage,
  };
};
