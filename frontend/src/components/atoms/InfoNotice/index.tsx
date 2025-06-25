import { Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import * as S from './styles';

type InfoNoticeProps = {
  icon?: React.ReactNode;
  message: string;
};

export const InfoNotice = ({
  icon = <AutoAwesomeIcon fontSize="small" color="primary" />,
  message,
}: InfoNoticeProps) => (
  <S.Container>
    {icon}
    <Typography variant="body2">{message}</Typography>
  </S.Container>
);
