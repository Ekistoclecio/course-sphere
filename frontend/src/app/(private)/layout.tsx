'use client';

import { Header } from '@/components/organisms/Header';
import { Box } from '@mui/material';
import { useSession } from 'next-auth/react';

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Header />
      {children}
    </Box>
  );
}
