'use client';

import { styled } from '@mui/material/styles';
import { Button, CircularProgress } from '@mui/material';

interface RootProps {
  loading?: boolean;
  width?: string | number;
}

export const Root = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'loading' && prop !== 'width',
})<RootProps>(({ loading, width }) => ({
  position: 'relative',
  width: width || 'auto',
  padding: '8px 16px',
  '& .MuiButton-startIcon, & .MuiButton-endIcon': {
    transition: 'opacity 0.2s ease',
    opacity: loading ? 0 : 1,
  },
}));

export const Content = styled('span', {
  shouldForwardProp: (prop) => prop !== 'isLoading',
})<{ isLoading: boolean }>(({ isLoading }) => ({
  visibility: isLoading ? 'hidden' : 'visible',
  display: 'inline-flex',
  alignItems: 'center',
}));

export const Spinner = styled(CircularProgress, {
  shouldForwardProp: (prop) => prop !== 'spinnerSize',
})<{ spinnerSize: number }>(({ spinnerSize }) => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  marginTop: -spinnerSize / 2,
  marginLeft: -spinnerSize / 2,
}));
