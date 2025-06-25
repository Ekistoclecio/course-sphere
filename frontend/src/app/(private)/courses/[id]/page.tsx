'use client';

import React, { useState } from 'react';
import { Typography, MenuItem, FormControl, Box, Pagination } from '@mui/material';
import { Button } from '@/components/atoms/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import * as S from './styles';
import dayjs from 'dayjs';
import { PopupMenu } from '@/components/organisms/PopupMenu';
import { Delete, Edit } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';

const mockCourse = {
  title: 'Desenvolvimento Full Stack com React e Node.js',
  description:
    'A página que você está tentando acessar não foi encontrada. Pode ser que o endereço digitado esteja incorreto, ou o conteúdo tenha sido removido, renomeado ou esteja temporariamente indisponível. Recomendamos verificar se o link está correto ou retornar à página inicial para continuar navegando. Se o problema persistir, entre em contato com o suporte. Estamos aqui para ajudar você a encontrar o que precisa de forma rápida e simples. Obrigado pela compreensão!Estamos aqui para ajudar você a encon',
  startDate: '2024-03-15',
  endDate: '2024-06-15',
  currentVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
};

type LessonStatus = 'published' | 'draft' | 'archived';

const mockLessons = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  title: `Aula ${i + 1} - ${
    i % 3 === 0 ? 'Introdução ao React' : i % 3 === 1 ? 'Componentes em React' : 'Hooks em React'
  }`,
  thumbnail: `https://picsum.photos/seed/${i}/120/68`,
  status: (i % 3 === 0
    ? 'published'
    : i % 3 === 1
      ? 'draft'
      : i % 3 === 2
        ? 'archived'
        : 'scheduled') as LessonStatus,
}));

const statusOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'published', label: 'Publicado', icon: <CheckCircleIcon /> },
  { value: 'draft', label: 'Rascunho', icon: <EditIcon /> },
  { value: 'archived', label: 'Arquivado', icon: <ArchiveIcon /> },
];

const statusColors: Record<LessonStatus, 'success' | 'warning' | 'error' | 'info'> = {
  published: 'success',
  draft: 'warning',
  archived: 'error',
};

export default function CoursePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const lessonsPerPage = 5;

  const filteredLessons = mockLessons
    .filter(
      (lesson) =>
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === 'all' || lesson.status === statusFilter)
    )
    .slice((page - 1) * lessonsPerPage, page * lessonsPerPage);

  const totalPages = Math.ceil(
    mockLessons.filter(
      (lesson) =>
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === 'all' || lesson.status === statusFilter)
    ).length / lessonsPerPage
  );

  return (
    <S.Root>
      <S.Container>
        <S.Header>
          <S.HeaderInfo>
            <Typography variant="h3" component="h1" color="primary">
              {mockCourse.title}
            </Typography>
            <Typography variant="body1" color="text.disabled">
              {mockCourse.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Período: <strong>{dayjs(mockCourse.startDate).format('DD/MM/YYYY')}</strong> até{' '}
              <strong>{dayjs(mockCourse.endDate).format('DD/MM/YYYY')}</strong>
            </Typography>
          </S.HeaderInfo>
          <S.HeaderActions>
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
              Criar aula
            </Button>

            <PopupMenu
              trigger={
                <Button variant="contained" color="primary" startIcon={<SettingsIcon />}>
                  Gerenciar curso
                </Button>
              }
            >
              <PopupMenu.Item
                icon={<Edit fontSize="large" sx={{ color: 'text.primary' }} />}
                onClick={() => {}}
              >
                Editar
              </PopupMenu.Item>
              <PopupMenu.Item
                icon={<ManageAccountsIcon fontSize="large" sx={{ color: 'text.primary' }} />}
                onClick={() => {}}
              >
                Instrutores
              </PopupMenu.Item>
              <PopupMenu.Item
                icon={<Delete fontSize="large" sx={{ color: 'text.primary' }} />}
                onClick={() => {}}
              >
                Excluir
              </PopupMenu.Item>
            </PopupMenu>
          </S.HeaderActions>
        </S.Header>

        <S.Content>
          <S.VideoContainer>
            <S.VideoIframe
              src={mockCourse.currentVideo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </S.VideoContainer>

          <S.LessonsContainer>
            <Typography variant="h4" color="primary">
              Aulas cadastradas
            </Typography>
            <S.LessonsFilters>
              <S.TextField
                fullWidth
                placeholder="Buscar aulas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <S.StyledSearchIcon fontSize="large" sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <FormControl fullWidth>
                <S.InputLabel>Status</S.InputLabel>
                <S.Select
                  IconComponent={(props) => (
                    <ExpandMoreIcon {...props} sx={{ fontSize: 24, marginRight: '8px' }} />
                  )}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as string)}
                  label="Status"
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </S.Select>
              </FormControl>
            </S.LessonsFilters>

            <S.LessonsList>
              {filteredLessons.map((lesson) => (
                <S.LessonCard key={lesson.id} elevation={8}>
                  <S.LessonThumbnail src={lesson.thumbnail} alt={lesson.title} />
                  <S.LessonInfo>
                    <Typography variant="subtitle1" noWrap color="text.disabled">
                      {lesson.title}
                    </Typography>
                    <Box>
                      <S.Chip
                        size="small"
                        variant="outlined"
                        icon={
                          statusOptions.find((option) => option.value === lesson.status)?.icon || (
                            <></>
                          )
                        }
                        label={
                          statusOptions.find((option) => option.value === lesson.status)?.label ||
                          ''
                        }
                        color={statusColors[lesson.status]}
                      />
                    </Box>
                  </S.LessonInfo>
                  <Button variant="text" color="inherit" size="small">
                    <SettingsIcon fontSize="large" sx={{ color: 'text.disabled' }} />
                  </Button>
                </S.LessonCard>
              ))}
            </S.LessonsList>

            <S.PaginationContainer>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                size="large"
              />
            </S.PaginationContainer>
          </S.LessonsContainer>
        </S.Content>
      </S.Container>
    </S.Root>
  );
}
