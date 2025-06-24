'use client';

import { ConfiguredSnackbarProvider } from '@/providers/snackbar';
import { queryClient } from '@/queries/client';
import { theme } from '@/theme';
import { globalStyles } from '@/theme/globalStyles';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <ThemeProvider theme={theme}>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <ConfiguredSnackbarProvider>{children}</ConfiguredSnackbarProvider>
          </QueryClientProvider>
        </SessionProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
