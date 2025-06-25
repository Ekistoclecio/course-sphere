import { Box } from '@mui/material';
import { lighten, styled } from '@mui/material/styles';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  borderRadius: 4,
  backgroundColor: lighten(theme.palette.primary.main, 0.85),
  padding: theme.spacing(1),
}));
