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
    setIsConfirmationModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    handleDeleteCourse,
    handleEditCourse,
    handleInstructorsChange,
  } = useCourseCard({ course, onDeleteCallback, onEditCallback, onInstructorsChangeCallback });

  return (
    <>
      <S.Card elevation={8}>
        <S.CardHeader
          title={<S.Title variant="h5">{course.name}</S.Title>}
          action={
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
          }
        />

        <S.CardContent>
          <S.DescriptionBox>
            <Typography variant="body2" color="text.disabled">
              {course.description}
            </Typography>
          </S.DescriptionBox>

          <Typography variant="caption" color="text.disabled" display="block">
            Data de início: <strong>{course.start_date}</strong>
          </Typography>
          <Typography variant="caption" color="text.disabled" display="block">
            Data de término: <strong>{course.end_date}</strong>
          </Typography>
        </S.CardContent>

        <S.CardActions>
          <Button
            size="small"
            variant="outlined"
            onClick={handleInstructorsChange}
            color="secondary"
          >
            Instrutores
          </Button>
          <Button size="small" variant="contained">
            Acessar
          </Button>
        </S.CardActions>
      </S.Card>
      <ConfirmationModal
        variant="error"
        title="Excluir curso"
        description={`Tem certeza que deseja excluir o curso ${course.name}?`}
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
    </>
  );
};
