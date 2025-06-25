import { usePagination } from '@/hooks/usePagination';
import { fetchCourses } from '@/queries/course/fetch';
import { Course } from '@/schemas/course/course';
import { User } from '@/schemas/user/user';
import { useState } from 'react';

export const useDashboard = () => {
  const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = useState(false);
  const {
    page,
    isLoading: isLoadingCourses,
    results: courses,
    totalPages,
    offset,
    hasNextPage,
    goToPage,
    goToOffset,
    removeItemResult,
    updateItemResult,
  } = usePagination({
    fetchFunction: fetchCourses,
    initialOffset: 0,
    initialLimit: 12,
  });

  const handleDeleteCourseCallback = async (course: Course) => {
    removeItemResult(course.id);
    if (hasNextPage) {
      goToOffset({ offset: offset + courses.length - 1, limit: 1 });
    }
  };

  const handleInstructorsChangeCallback = (course: Course, instructors: User[]) => {
    updateItemResult({ ...course, instructors });
  };

  const handleEditCourseCallback = (editedCourse: Course) => {
    updateItemResult(editedCourse);
  };

  const handleCreateCourseCallback = () => {
    goToPage(1);
  };

  return {
    isCreateCourseModalOpen,
    isLoadingCourses,
    courses,
    totalPages,
    page,
    setIsCreateCourseModalOpen,
    handleDeleteCourseCallback,
    handleInstructorsChangeCallback,
    handleEditCourseCallback,
    handleCreateCourseCallback,
    goToPage,
  };
};
