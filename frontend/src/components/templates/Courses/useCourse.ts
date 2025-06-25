import { useErrorHandler } from '@/hooks/useErrorHandler';
import { usePagination } from '@/hooks/usePagination';
import { Lesson } from '@/schemas/lesson/lesson';
import { Course } from '@/schemas/course/course';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDeleteCourse } from '@/queries/course/mutation';
import { invalidateLessonsCache } from '@/queries/lesson/invalidation';
import { FilterLessonParams, LessonStatus } from '@/services/interfaces';
import { User } from '@/schemas/user/user';
import { fetchLessons } from '@/queries/lesson/fetch';
import { useDebounce } from '@uidotdev/usehooks';

export const useCourse = ({
  course,
  onCourseChangeCallback,
}: {
  course: Course;
  onCourseChangeCallback: (course: Course) => void;
}) => {
  const router = useRouter();

  const { errorHandler } = useErrorHandler();
  const { mutateAsync: deleteCourse } = useDeleteCourse();
  const { enqueueSnackbar } = useSnackbar();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  const debouncedSearch = useDebounce(search, 500);
  const debouncedStatus = useDebounce(statusFilter, 300);

  const handleCreateLesson = () => {
    setCurrentLesson(null);
    invalidateLessonsCache();
    goToPage(1, { course_id: course.id });
  };

  const {
    results: lessons,
    totalPages,
    page,
    isLoading,
    hasNextPage,
    offset,
    removeItemResult,
    updateItemResult,
    goToPage,
    goToOffset,
  } = usePagination<Lesson, FilterLessonParams>({
    fetchFunction: fetchLessons,
    initialOffset: 0,
    initialLimit: 5,
    initialParams: {
      course_id: course.id,
    },
  });

  const handleDeleteCourse = async () => {
    try {
      await deleteCourse(course.id);
      router.push('/dashboard');
      enqueueSnackbar('Curso deletado com sucesso', { variant: 'success' });
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleEditCourse = (course: Course) => {
    onCourseChangeCallback(course);
  };

  const handleChangeInstructors = (instructors: User[]) => {
    onCourseChangeCallback({ ...course, instructors });
  };

  const handleDeleteLesson = (lesson: Lesson) => {
    removeItemResult(lesson.id);
    invalidateLessonsCache();
    if (lessons.length === 1) {
      setStatusFilter('all');
      setSearch('');
      goToPage(1, { course_id: course.id });
    }
    if (currentLesson?.id == lesson.id) {
      const nextLesson = lessons.find((l) => l.id !== lesson.id);
      if (nextLesson) {
        setCurrentLesson(nextLesson);
      } else setCurrentLesson(null);
    }
    if (hasNextPage) {
      goToOffset({
        offset: offset + lessons.length - 1,
        limit: 1,
        params: { course_id: course.id },
      });
    }
  };

  const renderEmptyDescription = () => {
    if (search.length > 0) {
      return `Nenhuma aula encontrada com o termo "${search}"`;
    }
    if (statusFilter !== 'all') {
      return 'Nenhuma aula encontrada com este status';
    }
    return 'Crie uma aula para começar a ensinar';
  };

  useEffect(() => {
    if (lessons.length > 0) {
      setCurrentLesson(lessons[0]);
    }
  }, [lessons]);

  useEffect(() => {
    goToPage(1, {
      course_id: course.id,
      ...(debouncedSearch && { search: debouncedSearch }),
      ...(debouncedStatus !== 'all' && { status: debouncedStatus as LessonStatus }),
    });
    setCurrentLesson(null);
  }, [debouncedSearch, debouncedStatus]);

  return {
    lessons,
    totalPages,
    page,
    isLoading,
    handleCreateLesson,
    handleDeleteCourse,
    handleEditCourse,
    handleChangeInstructors,
    handleDeleteLesson,
    renderEmptyDescription,
    currentLesson,
    setCurrentLesson,
    updateItemResult,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    goToPage,
  };
};
