'use client';

import React from 'react';
import { Typography, Stack, Skeleton } from '@mui/material';
import { CustomModal } from '@/components/molecules/CustomModal';
import { User } from '@/schemas/user/user';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Course } from '@/schemas/course/course';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Feedback } from '@/components/molecules/Feedback';
import { Button } from '@/components/atoms/Button';
import { InstructorListItem } from '@/components/molecules/InstructorListItem';
import * as S from './styles';
import { useInstructorsManager } from './useInstructorsManager';

interface InstructorsManagerModalProps {
  open: boolean;
  onClose: () => void;
  current: User[];
  onInstructorsChangeCallback: (instructors: User[]) => void;
  course: Course;
}

export const InstructorsManagerModal = ({
  open,
  onClose,
  current,
  onInstructorsChangeCallback,
  course,
}: InstructorsManagerModalProps) => {
  const {
    tab,
    loadingKey,
    users,
    isLoadingRandomUsers,
    handleAddInstructor,
    handleRemoveInstructor,
    handleTabChange,
  } = useInstructorsManager(current, onInstructorsChangeCallback, course);
  return (
    <CustomModal open={open} onClose={onClose} width={500}>
      <CustomModal.Header>
        <S.HeaderContainer>
          <ManageAccountsIcon color="primary" sx={{ fontSize: 24 }} />
          <Typography variant="h4">Gerenciamento de Instrutores</Typography>
        </S.HeaderContainer>
      </CustomModal.Header>

      <CustomModal.Content>
        <S.CustomTabs value={tab} onChange={handleTabChange} variant="fullWidth" tab={tab}>
          <S.CustomTab
            icon={<PersonAddIcon sx={{ fontSize: 18 }} />}
            iconPosition="start"
            label="Adicionar"
            value="add"
          />
          <S.CustomTab
            icon={<PersonRemoveIcon sx={{ fontSize: 18 }} />}
            iconPosition="start"
            label="Remover"
            value="remove"
          />
        </S.CustomTabs>

        <Stack spacing={2} mt={2} height={420}>
          <Typography variant="subtitle1">
            {tab === 'add' ? 'Instrutores recomendados' : 'Instrutores atuais'}
          </Typography>
          {users.length === 0 && (
            <Feedback
              title="Esse curso ainda não possui instrutores"
              description="Adicione instrutores para que eles possam colaborar e adicionar conteúdo."
              image={<S.EmptyStateImage src="/empty.svg" alt="Sem instrutores" />}
            />
          )}
          {isLoadingRandomUsers ? (
            <>
              <Skeleton variant="rectangular" height={68} sx={{ mt: 1, borderRadius: 1 }} />
              <Skeleton variant="rectangular" height={68} sx={{ mt: 1, borderRadius: 1 }} />
              <Skeleton variant="rectangular" height={68} sx={{ mt: 1, borderRadius: 1 }} />
              <Skeleton variant="rectangular" height={68} sx={{ mt: 1, borderRadius: 1 }} />
              <Skeleton variant="rectangular" height={68} sx={{ mt: 1, borderRadius: 1 }} />
            </>
          ) : (
            users.length > 0 &&
            users.map((user) => (
              <InstructorListItem
                key={user.email}
                user={user}
                isRemoving={tab === 'remove'}
                loadingKey={loadingKey}
                onAdd={handleAddInstructor}
                onRemove={handleRemoveInstructor}
              />
            ))
          )}
        </Stack>
      </CustomModal.Content>

      <CustomModal.Footer>
        <Button variant="outlined" onClick={onClose}>
          Fechar
        </Button>
      </CustomModal.Footer>
    </CustomModal>
  );
};
