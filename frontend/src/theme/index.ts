'use client';
import { palette } from '@/theme/palette';
import { typography } from '@/theme/typography';
import { createTheme, responsiveFontSizes, Theme } from '@mui/material/styles';

const baseTheme: Theme = createTheme({
  palette,
  typography,
});

export const theme = responsiveFontSizes(baseTheme);
