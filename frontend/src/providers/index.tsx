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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';

dayjs.locale('pt-br');

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <ThemeProvider theme={theme}>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <ConfiguredSnackbarProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                {children}
              </LocalizationProvider>
            </ConfiguredSnackbarProvider>
          </QueryClientProvider>
        </SessionProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
