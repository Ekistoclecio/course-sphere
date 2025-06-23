'use client';

import { styled } from '@mui/material/styles';
import { Button, CircularProgress } from '@mui/material';

interface RootProps {
  loading?: boolean;
}

interface ContentProps {
  isLoading: boolean;
}

interface SpinnerProps {
  spinnerSize: number;
}

export const Root = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'loading',
})<RootProps>(({ loading }) => ({
  position: 'relative',
  '& .MuiButton-startIcon, & .MuiButton-endIcon': {
    transition: 'opacity 0.2s ease',
    opacity: loading ? 0 : 1,
  },
}));

export const Content = styled('span', {
  shouldForwardProp: (prop) => prop !== 'isLoading',
})<ContentProps>(({ isLoading }) => ({
  visibility: isLoading ? 'hidden' : 'visible',
  display: 'inline-flex',
  alignItems: 'center',
}));

export const Spinner = styled(CircularProgress, {
  shouldForwardProp: (prop) => prop !== 'spinnerSize',
})<SpinnerProps>(({ spinnerSize }) => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  marginTop: -spinnerSize / 2,
  marginLeft: -spinnerSize / 2,
}));
