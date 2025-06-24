'use client';

import { Box, Stack, TextField } from '@mui/material';
import { Button } from '@/components/atoms/Button';
import { useSignUpForm } from './useSignUpForm';

export const SignUpForm = () => {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } = useSignUpForm();

  return (
    <Box component="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          label="Nome"
          type="text"
          fullWidth
          autoComplete="name"
          variant="outlined"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="E-mail"
          type="email"
          fullWidth
          autoComplete="email"
          variant="outlined"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Senha"
          type="password"
          fullWidth
          autoComplete="current-password"
          variant="outlined"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          label="Confirmar senha"
          type="password"
          fullWidth
          autoComplete="confirm-password"
          variant="outlined"
          {...register('confirm_password')}
          error={!!errors.confirm_password}
          helperText={errors.confirm_password?.message}
        />
        <Button type="submit" variant="contained" fullWidth loading={isSubmitting}>
          Cadastrar
        </Button>
      </Stack>
    </Box>
  );
};
