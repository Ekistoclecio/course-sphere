import { PaginationProps } from '@mui/material';
import * as S from './styles';

export const Pagination = ({
  count,
  color = 'primary',
  shape = 'rounded',
  ...props
}: PaginationProps) => {
  return <S.Pagination count={count} color={color} shape={shape} {...props} />;
};
