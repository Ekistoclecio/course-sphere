'use client';

import React, { useEffect, useState } from 'react';
import { Typography, MenuItem, FormControl, Skeleton } from '@mui/material';
import { Button } from '@/components/atoms/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import * as S from './styles';
import dayjs from 'dayjs';
import { PopupMenu } from '@/components/organisms/PopupMenu';
import { Delete, Edit } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import { Course } from '@/schemas/course/course';
import { FilterLessonParams, LessonStatus } from '@/services/interfaces';
import { getYoutubeEmbedUrl } from '@/utils/lessonVideo';
import { fetchLessons } from '@/queries/lesson/fetch';
import { usePagination } from '@/hooks/usePagination';
import { Lesson } from '@/schemas/lesson/lesson';
import { Pagination } from '@/components/atoms/Pagination';
import { Feedback } from '@/components/molecules/Feedback';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { User } from '@/schemas/user/user';
import { InstructorsManagerModal } from '@/components/organisms/InstructorsManager';
import { EditCourseModal } from '@/components/organisms/EditCourseModal';
import { ConfirmationModal } from '@/components/organisms/ConfirmationModal';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useDeleteCourse } from '@/queries/course/mutation';
import { CreateLessonModal } from '@/components/organisms/CreateLessonModal';
import { invalidateLessonsCache } from '@/queries/lesson/invalidation';
import { LessonCard } from '@/components/molecules/LessonCard';
import { useSnackbar } from 'notistack';
import { useDebounce } from '@uidotdev/usehooks';

export interface CourseTemplateProps {
  course: Course;
  onCourseChangeCallback: (course: Course) => void;
}
export const statusOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'published', label: 'Publicado', icon: <CheckCircleIcon /> },
  { value: 'draft', label: 'Rascunho', icon: <EditIcon /> },
  { value: 'archived', label: 'Arquivado', icon: <ArchiveIcon /> },
];

export const CoursesTemplate = ({ course, onCourseChangeCallback }: CourseTemplateProps) => {
  const router = useRouter();

  const { errorHandler } = useErrorHandler();
  const { mutateAsync: deleteCourse } = useDeleteCourse();
  const { enqueueSnackbar } = useSnackbar();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  const debouncedSearch = useDebounce(search, 500);
  const debouncedStatus = useDebounce(statusFilter, 300);

  const [isInstructorsManagerOpen, setIsInstructorsManagerOpen] = useState(false);
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false);
  const [isDeleteCourseOpen, setIsDeleteCourseOpen] = useState(false);
  const [isCreateLessonOpen, setIsCreateLessonOpen] = useState(false);

  const handleCreateLesson = () => {
    setCurrentLesson(null);
    invalidateLessonsCache();
    goToPage(1, { course_id: course.id });
    setIsCreateLessonOpen(false);
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

  return (
    <S.Root>
      <S.Container>
        <S.Header>
          <S.HeaderInfo>
            <Typography variant="h3" component="h1" color="primary">
              {course.name}
            </Typography>
            <Typography variant="body1" color="text.disabled">
              {course.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Período: <strong>{dayjs(course.start_date).format('DD/MM/YYYY')}</strong> até{' '}
              <strong>{dayjs(course.end_date).format('DD/MM/YYYY')}</strong>
            </Typography>
          </S.HeaderInfo>
          <S.HeaderActions>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setIsCreateLessonOpen(true)}
            >
              Criar aula
            </Button>

            <PopupMenu
              trigger={
                <Button variant="contained" color="primary" startIcon={<SettingsIcon />}>
                  Gerenciar curso
                </Button>
              }
            >
              <PopupMenu.Item
                icon={<Edit fontSize="large" sx={{ color: 'text.primary' }} />}
                onClick={() => setIsEditCourseOpen(true)}
              >
                Editar
              </PopupMenu.Item>
              <PopupMenu.Item
                icon={<ManageAccountsIcon fontSize="large" sx={{ color: 'text.primary' }} />}
                onClick={() => setIsInstructorsManagerOpen(true)}
              >
                Instrutores
              </PopupMenu.Item>
              <PopupMenu.Item
                icon={<Delete fontSize="large" sx={{ color: 'text.primary' }} />}
                onClick={() => setIsDeleteCourseOpen(true)}
              >
                Excluir
              </PopupMenu.Item>
            </PopupMenu>
          </S.HeaderActions>
        </S.Header>

        <S.Content>
          <S.VideoContainer>
            {currentLesson?.video_url && (
              <S.VideoIframe
                src={getYoutubeEmbedUrl(currentLesson?.video_url)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
            {!isLoading && lessons.length === 0 && !currentLesson && (
              <Image
                src="/no-video.jpg"
                alt="No lesson"
                width={500}
                height={500}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </S.VideoContainer>

          <S.LessonsContainer>
            <Typography variant="h4" color="primary">
              Aulas cadastradas
            </Typography>
            <S.LessonsFilters>
              <S.TextField
                fullWidth
                placeholder="Buscar aulas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <S.StyledSearchIcon fontSize="large" sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <FormControl fullWidth>
                <S.InputLabel>Status</S.InputLabel>
                <S.Select
                  IconComponent={(props) => (
                    <ExpandMoreIcon {...props} sx={{ fontSize: 24, marginRight: '8px' }} />
                  )}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as string)}
                  label="Status"
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </S.Select>
              </FormControl>
            </S.LessonsFilters>

            <S.LessonsList>
              {!currentLesson && lessons.length === 0 && !isLoading && (
                <Feedback
                  image={<img src="/empty.svg" alt="No lesson" style={{ width: '250px' }} />}
                  title="Nenhuma aula encontrada"
                  description={renderEmptyDescription()}
                />
              )}
              {isLoading ? (
                <>
                  <Skeleton variant="rectangular" width={529} height={84} />
                  <Skeleton variant="rectangular" width={529} height={84} />
                  <Skeleton variant="rectangular" width={529} height={84} />
                  <Skeleton variant="rectangular" width={529} height={84} />
                  <Skeleton variant="rectangular" width={529} height={84} />
                </>
              ) : (
                lessons.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    selectedLesson={currentLesson}
                    onSelectLessonCallback={setCurrentLesson}
                    onEditLessonCallback={updateItemResult}
                    onDeleteLessonCallback={handleDeleteLesson}
                  />
                ))
              )}
            </S.LessonsList>

            {totalPages > 1 && (
              <S.PaginationContainer>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, value) => goToPage(value, { course_id: course.id })}
                  color="primary"
                  size="large"
                />
              </S.PaginationContainer>
            )}
          </S.LessonsContainer>
        </S.Content>
      </S.Container>

      <InstructorsManagerModal
        open={isInstructorsManagerOpen}
        onClose={() => setIsInstructorsManagerOpen(false)}
        current={course.instructors}
        onInstructorsChangeCallback={handleChangeInstructors}
        course={course}
      />
      <EditCourseModal
        open={isEditCourseOpen}
        onClose={() => setIsEditCourseOpen(false)}
        course={course}
        onEditSuccessCallback={handleEditCourse}
      />
      <ConfirmationModal
        variant="error"
        title="Excluir curso"
        description={`Tem certeza que deseja excluir o curso "${course.name}"?`}
        open={isDeleteCourseOpen}
        onClose={() => setIsDeleteCourseOpen(false)}
        onConfirm={handleDeleteCourse}
      />
      <CreateLessonModal
        open={isCreateLessonOpen}
        onClose={() => setIsCreateLessonOpen(false)}
        onCreateSuccessCallback={handleCreateLesson}
        course={course}
      />
    </S.Root>
  );
};
