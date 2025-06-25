import { Pagination as MuiPagination } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Pagination = styled(MuiPagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    ...theme.typography.subtitle1,
    color: theme.palette.text.disabled,
    '& svg': {
      fontSize: '24px',
    },
  },
}));
