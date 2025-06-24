'use client';

import { Typography, Link } from '@mui/material';
import { SignUpForm } from '@/components/organisms/SignUpForm';
import { AuthTemplate } from '@/components/templates/Auth';
import { Logo } from '@/components/molecules/Logo';

export default function SignInPage() {
  return (
    <AuthTemplate>
      <AuthTemplate.Header>
        <Logo />
        <Typography variant="h5" component="h1">
          Crie sua conta para ter acesso aos nossos cursos
        </Typography>
      </AuthTemplate.Header>
      <SignUpForm />
      <AuthTemplate.Footer>
        <Typography variant="body1" color="text.secondary">
          Já possui uma conta?{' '}
          <Link href="/sign-in" color="primary">
            Faça login agora
          </Link>
        </Typography>
      </AuthTemplate.Footer>
    </AuthTemplate>
  );
}
