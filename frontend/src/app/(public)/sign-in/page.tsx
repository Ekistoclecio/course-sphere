'use client';

import { Typography, Link } from '@mui/material';
import { SignInForm } from '@/components/organisms/SignInForm';
import { AuthTemplate } from '@/components/templates/Auth';
import { Logo } from '@/components/molecules/Logo';

export default function SignInPage() {
  return (
    <AuthTemplate>
      <AuthTemplate.Header>
        <Logo />
        <Typography variant="h5" component="h1">
          Faça login para continuar
        </Typography>
      </AuthTemplate.Header>
      <SignInForm />
      <AuthTemplate.Footer>
        <Typography variant="body1" color="text.secondary">
          Não tem uma conta?{' '}
          <Link href="/sign-up" color="primary">
            Crie uma agora
          </Link>
        </Typography>
      </AuthTemplate.Footer>
    </AuthTemplate>
  );
}
