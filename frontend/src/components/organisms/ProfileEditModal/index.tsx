'use client';

import * as React from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { CustomModal } from '@/components/molecules/CustomModal';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useProfileEditModal } from '@/components/organisms/ProfileEditModal/useProfileEditModal';

type ProfileEditModalProps = {
  open: boolean;
  onClose: () => void;
};

export const ProfileEditModal = ({ open, onClose }: ProfileEditModalProps) => {
  const { register, handleSubmit, errors, isSubmitting, handleFormSubmit } = useProfileEditModal({
    onClose,
    open,
  });

  return (
    <CustomModal open={open} onClose={onClose}>
      <CustomModal.Header>
        <Box display="flex" alignItems="center" gap={1}>
          <EditOutlinedIcon sx={{ fontSize: 24 }} color="primary" />
          <Typography variant="h4">Editar perfil</Typography>
        </Box>
      </CustomModal.Header>

      <CustomModal.Content>
        <Box component="form">
          <TextField
            label="Senha atual"
            type="password"
            fullWidth
            margin="normal"
            {...register('current_password')}
            error={!!errors.current_password}
            helperText={errors.current_password?.message}
          />
          <TextField
            label="E-mail"
            type="email"
            fullWidth
            margin="normal"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Nome"
            fullWidth
            margin="normal"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            label="Nova senha (opcional)"
            type="password"
            fullWidth
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message || 'Deixe em branco para não alterar a senha.'}
          />
          <TextField
            label="Confirmar nova senha"
            type="password"
            fullWidth
            margin="normal"
            {...register('confirm_password')}
            error={!!errors.confirm_password}
            helperText={errors.confirm_password?.message}
          />
        </Box>
      </CustomModal.Content>

      <CustomModal.Footer align="right">
        <Button
          onClick={onClose}
          disabled={isSubmitting}
          sx={{
            color: 'text.primary',
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit(handleFormSubmit)}
          disabled={isSubmitting}
        >
          Editar
        </Button>
      </CustomModal.Footer>
    </CustomModal>
  );
};
