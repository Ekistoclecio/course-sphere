import { Lesson } from '@/schemas/lesson/lesson';
import { getYoutubeThumbnail } from '@/utils/lessonVideo';
import { Box, Typography } from '@mui/material';
import * as S from './styles';
import { Button } from '@/components/atoms/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import { LessonStatus } from '@/services/interfaces';
import { statusOptions } from '@/components/templates/Courses';
import { useDeleteLesson } from '@/queries/lesson/mutation';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useSnackbar } from 'notistack';
import { PopupMenu } from '@/components/organisms/PopupMenu';
import { useState } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { ConfirmationModal } from '@/components/organisms/ConfirmationModal';
import { invalidateLessonsCache } from '@/queries/lesson/invalidation';
import { EditLessonModal } from '@/components/organisms/EditLessonModal';

export type LessonCardProps = {
  lesson: Lesson;
  selectedLesson: Lesson | null;
  onSelectLessonCallback: (lesson: Lesson) => void;
  onEditLessonCallback: (lesson: Lesson) => void;
  onDeleteLessonCallback: (lesson: Lesson) => void;
};

const statusColors: Record<LessonStatus, 'success' | 'warning' | 'error' | 'info'> = {
  published: 'success',
  draft: 'warning',
  archived: 'error',
};

export const LessonCard = ({
  lesson,
  selectedLesson,
  onSelectLessonCallback,
  onEditLessonCallback,
  onDeleteLessonCallback,
}: LessonCardProps) => {
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

  return (
    <S.LessonCard
      key={lesson.id}
      elevation={8}
      onClick={() => onSelectLessonCallback(lesson)}
      sx={
        selectedLesson?.id === lesson.id
          ? {
              backgroundColor: 'background.card',
              cursor: 'auto',
              '&:hover': {
                backgroundColor: 'background.card',
              },
            }
          : {}
      }
    >
      <S.LessonThumbnail src={getYoutubeThumbnail(lesson.video_url)} alt={lesson.title} />
      <S.LessonInfo>
        <Typography variant="subtitle1" noWrap color="text.disabled">
          {lesson.title}
        </Typography>
        <Box>
          <S.Chip
            size="small"
            variant="outlined"
            icon={statusOptions.find((option) => option.value === lesson.status)?.icon || <></>}
            label={statusOptions.find((option) => option.value === lesson.status)?.label || ''}
            color={statusColors[lesson.status]}
          />
        </Box>
      </S.LessonInfo>
      <Box onClick={(event) => event.stopPropagation()}>
        <PopupMenu
          trigger={
            <Button variant="text" color="inherit" size="small">
              <SettingsIcon fontSize="large" sx={{ color: 'text.disabled' }} />
            </Button>
          }
        >
          <PopupMenu.Item
            icon={<Edit fontSize="large" sx={{ color: 'text.primary' }} />}
            onClick={() => setIsEditLessonOpen(true)}
          >
            Editar
          </PopupMenu.Item>
          <PopupMenu.Item
            icon={<Delete fontSize="large" sx={{ color: 'text.primary' }} />}
            onClick={() => setIsDeleteLessonOpen(true)}
          >
            Excluir
          </PopupMenu.Item>
        </PopupMenu>
      </Box>

      <ConfirmationModal
        open={isDeleteLessonOpen}
        onClose={() => setIsDeleteLessonOpen(false)}
        onConfirm={handleDeleteLesson}
        title="Excluir aula"
        description={`Tem certeza que deseja excluir a aula ${lesson.title}?`}
        variant="error"
      />
      <EditLessonModal
        open={isEditLessonOpen}
        onClose={() => setIsEditLessonOpen(false)}
        onEditSuccessCallback={onEditLessonCallback}
        lesson={lesson}
      />
    </S.LessonCard>
  );
};
