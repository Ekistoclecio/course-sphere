'use client';

import { styled } from '@mui/material/styles';
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardActions as MuiCardActions,
  CardHeader as MuiCardHeader,
  Box,
  Typography,
} from '@mui/material';
import MuiSettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export const Card = styled(MuiCard)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: 220,
  width: 440,
  backgroundColor: theme.palette.background.card,
}));

export const CardHeader = styled(MuiCardHeader)({
  paddingBottom: 0,
  '& .MuiCardHeader-content': {
    width: '50%',
  },
});

export const CardContent = styled(MuiCardContent)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  overflow: 'hidden',
});

export const DescriptionBox = styled(Box)({
  flexGrow: 1,
  overflow: 'auto',
  marginBottom: 8,
});

export const CardActions = styled(MuiCardActions)({
  padding: '0 16px 16px 16px',
  justifyContent: 'space-between',
});

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.disabled,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const SettingsOutlinedIcon = styled(MuiSettingsOutlinedIcon)({
  fontSize: '20px',
});
