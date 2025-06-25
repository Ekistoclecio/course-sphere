'use client';

import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@/components/atoms/Button';
import { User } from '@/schemas/user/user';
import { SignUpData } from '@/schemas/user/signup';
import * as S from './styles';

export const InstructorListItem = ({
  user,
  isRemoving,
  loadingKey,
  onAdd,
  onRemove,
}: {
  user: User | SignUpData;
  isRemoving: boolean;
  loadingKey: string | null;
  onAdd: (user: SignUpData) => void;
  onRemove: (user: User) => void;
}) => {
  return (
    <S.Container key={user.email}>
      <S.UserInfoContainer>
        <S.UserName variant="body2">{user.name}</S.UserName>
        <S.UserEmail variant="body2">{user.email}</S.UserEmail>
      </S.UserInfoContainer>
      <Button
        variant="contained"
        loading={loadingKey === user.email}
        disabled={Boolean(loadingKey)}
        loadingSize={14}
        sx={{ padding: 0, minWidth: 24, height: 24 }}
        color={isRemoving ? 'error' : 'primary'}
        onClick={() => (isRemoving ? onRemove(user as User) : onAdd(user as SignUpData))}
      >
        {isRemoving ? <DeleteIcon sx={{ fontSize: 16 }} /> : <AddIcon sx={{ fontSize: 16 }} />}
      </Button>
    </S.Container>
  );
};
