import { Box, Typography, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  border: '1px solid',
  borderColor: theme.palette.divider,
}));

export const UserInfoContainer = styled(Box)(() => ({
  width: '90%',
}));

export const UserName = styled(Typography)(() => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const UserEmail = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: theme.palette.text.secondary,
}));

export const ActionButton = styled(Box)(() => ({
  padding: 0,
  minWidth: 24,
  height: 24,
}));

export const ActionIcon = styled(Box)({
  fontSize: 16,
});
