'use client';

import { Typography, IconButton, Button } from '@mui/material';
import * as S from './styles';
import { PopupMenu } from '@/components/organisms/PopupMenu';
import { Edit } from '@mui/icons-material';
import { Delete } from '@mui/icons-material';
import { ConfirmationModal } from '@/components/organisms/ConfirmationModal';
import { Course } from '@/schemas/course/course';
import { User } from '@/schemas/user/user';
import { EditCourseModal } from '@/components/organisms/EditCourseModal';
import { useCourseCard } from './useCourseCard';
import { InstructorsManagerModal } from '@/components/organisms/InstructorsManager';
import dayjs from 'dayjs';

export type CourseCardProps = {
  course: Course;
  onInstructorsChangeCallback?: (course: Course, instructors: User[]) => void;
  onDeleteCallback?: (course: Course) => void;
  onEditCallback?: (course: Course) => void;
};

export const CourseCard = ({
  course,
  onInstructorsChangeCallback,
  onDeleteCallback,
  onEditCallback,
}: CourseCardProps) => {
  const {
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
  } = useCourseCard({ course, onDeleteCallback, onEditCallback, onInstructorsChangeCallback });

  return (
    <>
      <S.Card elevation={8}>
        <S.CardHeader
          title={<S.Title variant="h5">{course.name}</S.Title>}
          action={
            course.can_manage && (
              <PopupMenu
                trigger={
                  <IconButton aria-label="Configurações do curso">
                    <S.SettingsOutlinedIcon />
                  </IconButton>
                }
              >
                <PopupMenu.Item
                  icon={<Edit fontSize="large" sx={{ color: 'text.primary' }} />}
                  onClick={() => setIsEditModalOpen(true)}
                >
                  Editar
                </PopupMenu.Item>
                <PopupMenu.Item
                  icon={<Delete fontSize="large" sx={{ color: 'text.primary' }} />}
                  onClick={() => setIsConfirmationModalOpen(true)}
                >
                  Excluir
                </PopupMenu.Item>
              </PopupMenu>
            )
          }
        />

        <S.CardContent>
          <S.DescriptionBox>
            <Typography variant="body2" color="text.disabled">
              {course.description || <i>Sem descrição</i>}
            </Typography>
          </S.DescriptionBox>

          <Typography variant="caption" color="text.disabled" display="block">
            Data de início: <strong>{dayjs(course.start_date).format('DD/MM/YYYY')}</strong>
          </Typography>
          <Typography variant="caption" color="text.disabled" display="block">
            Data de término: <strong>{dayjs(course.end_date).format('DD/MM/YYYY')}</strong>
          </Typography>
        </S.CardContent>

        <S.CardActions>
          {course.can_manage && (
            <Button
              size="small"
              variant="outlined"
              onClick={() => setIsInstructorsManagerModalOpen(true)}
              color="secondary"
            >
              Instrutores
            </Button>
          )}
          <Button size="small" variant="contained" onClick={openCoursePage}>
            Acessar
          </Button>
        </S.CardActions>
      </S.Card>
      <ConfirmationModal
        variant="error"
        title="Excluir curso"
        description={`Tem certeza que deseja excluir o curso "${course.name}"?`}
        open={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleDeleteCourse}
      />
      <EditCourseModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEditSuccessCallback={handleEditCourse}
        course={course}
      />
      <InstructorsManagerModal
        open={isInstructorsManagerModalOpen}
        onClose={() => setIsInstructorsManagerModalOpen(false)}
        onInstructorsChangeCallback={handleInstructorsChange}
        course={course}
        current={course.instructors}
      />
    </>
  );
};
