'use client';

import { Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const backgroundUrl =
  'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1500&q=80';

export const Container = styled(Box)(() => ({
  minHeight: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url(${backgroundUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

export const Content = styled(Paper)(({ theme }) => ({
  maxWidth: '420px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1, 2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2, 4),
    gap: theme.spacing(4),
  },
}));

export const Header = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const Footer = styled(Box)(() => ({
  textAlign: 'center',
}));
