'use client';

import { theme } from '@/theme';
import { globalStyles } from '@/theme/globalStyles';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}
