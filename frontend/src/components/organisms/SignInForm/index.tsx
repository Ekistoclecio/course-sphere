'use client';

import { Box, Stack, TextField } from '@mui/material';
import { Button } from '@/components/atoms/Button';
import { useSignInForm } from './useSignInForm';

export const SignInForm = () => {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } = useSignInForm();

  return (
    <Box component="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
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
        <Button type="submit" variant="contained" fullWidth loading={isSubmitting}>
          Entrar
        </Button>
      </Stack>
    </Box>
  );
};
