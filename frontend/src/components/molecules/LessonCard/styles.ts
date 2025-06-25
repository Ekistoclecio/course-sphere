import { Box, darken, Paper, styled, Chip as MuiChip } from '@mui/material';

export const Chip = styled(MuiChip)(() => ({
  fontSize: '12px',
  fontWeight: 500,
  padding: '4px 8px',
  '& .MuiChip-icon': {
    fontSize: '16px',
  },
}));

export const LessonCard = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: darken(theme.palette.background.card, 0.4),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: darken(theme.palette.background.card, 0.2),
  },
}));

export const LessonThumbnail = styled('img')(() => ({
  width: 120,
  height: 68,
  borderRadius: 4,
  objectFit: 'cover',
}));

export const LessonInfo = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
}));
