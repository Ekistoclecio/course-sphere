import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export const Root = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '400px',
    maxWidth: '100%',
    margin: theme.spacing(1, 1, 1, 1),
    borderRadius: 8,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2),
    },
  },
}));

export const Header = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1.5, 2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2, 3),
  },
}));

export const Content = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2, 3),
  },
}));

export const Footer = styled(DialogActions, {
  shouldForwardProp: (prop) => prop !== 'align',
})<{ align?: 'left' | 'center' | 'right' }>(({ theme, align = 'right' }) => {
  let justifyContent: 'flex-start' | 'center' | 'flex-end' = 'flex-end';
  if (align === 'left') justifyContent = 'flex-start';
  else if (align === 'center') justifyContent = 'center';

  return {
    padding: theme.spacing(1.5, 2),
    justifyContent,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2, 3),
    },
  };
});
