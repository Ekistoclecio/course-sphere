import { Button } from '@/components/atoms/Button';
import { ConfirmationModal } from '@/components/organisms/ConfirmationModal';
import { EditCourseModal } from '@/components/organisms/EditCourseModal';
import { InstructorsManagerModal } from '@/components/organisms/InstructorsManager';
import { PopupMenu } from '@/components/organisms/PopupMenu';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useDeleteCourse } from '@/queries/course/mutation';
import { Course } from '@/schemas/course/course';
import { User } from '@/schemas/user/user';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { Edit, Delete } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export interface ManagerPopupProps {
  course: Course;
  onCourseChangeCallback: (course: Course) => void;
}

export const ManagerPopup = ({ course, onCourseChangeCallback }: ManagerPopupProps) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { errorHandler } = useErrorHandler();
  const [isInstructorsManagerOpen, setIsInstructorsManagerOpen] = useState(false);
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false);
  const [isDeleteCourseOpen, setIsDeleteCourseOpen] = useState(false);

  const { mutateAsync: deleteCourse } = useDeleteCourse();

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
  return (
    <>
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
    </>
  );
};
