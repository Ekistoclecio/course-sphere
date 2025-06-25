'use client';

import * as React from 'react';
import { Typography, IconButton, Button } from '@mui/material';
import * as S from './styles';

type CourseCardProps = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  onAccess: () => void;
  onInstructors: () => void;
  onSettings: () => void;
};

export const CourseCard = ({
  title,
  description,
  startDate,
  endDate,
  onAccess,
  onInstructors,
  onSettings,
}: CourseCardProps) => {
  return (
    <S.Card elevation={8}>
      <S.CardHeader
        title={<S.Title variant="h5">{title}</S.Title>}
        action={
          <IconButton aria-label="Configurações do curso" onClick={onSettings}>
            <S.SettingsOutlinedIcon />
          </IconButton>
        }
      />

      <S.CardContent>
        <S.DescriptionBox>
          <Typography variant="body2" color="text.disabled">
            {description}
          </Typography>
        </S.DescriptionBox>

        <Typography variant="caption" color="text.disabled" display="block">
          Data de início: <strong>{startDate}</strong>
        </Typography>
        <Typography variant="caption" color="text.disabled" display="block">
          Data de término: <strong>{endDate}</strong>
        </Typography>
      </S.CardContent>

      <S.CardActions>
        <Button size="small" variant="outlined" onClick={onInstructors} color="secondary">
          Instrutores
        </Button>
        <Button size="small" variant="contained" onClick={onAccess}>
          Acessar
        </Button>
      </S.CardActions>
    </S.Card>
  );
};
