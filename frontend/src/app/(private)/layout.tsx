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
      <Box component="main" flexGrow={1} paddingX={4} paddingY={3} overflow="hidden">
        {children}
      </Box>
    </Box>
  );
}
