'use client';

import * as React from 'react';
import {
  Button,
  TextField,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';

import { CustomModal } from '@/components/molecules/CustomModal';
import dayjs from 'dayjs';
import { InfoNotice } from '@/components/atoms/InfoNotice';
import { useCreateLessonModal } from '@/components/organisms/CreateLessonModal/useCreateLessonModal';
import { Lesson } from '@/schemas/lesson/lesson';
import { Course } from '@/schemas/course/course';
import SchoolIcon from '@mui/icons-material/School';

type CreateLessonModalProps = {
  open: boolean;
  onClose: () => void;
  onCreateSuccessCallback?: (createdLesson: Lesson) => void;
  course: Course;
};

export const CreateLessonModal = ({
  open,
  onClose,
  onCreateSuccessCallback,
  course,
}: CreateLessonModalProps) => {
  const { register, handleSubmit, control, errors, isSubmitting, handleFormSubmit } =
    useCreateLessonModal({ onClose, onCreateSuccessCallback, course, open });

  return (
    <CustomModal open={open} onClose={onClose} width={600}>
      <CustomModal.Header>
        <Box display="flex" alignItems="center" gap={1}>
          <SchoolIcon sx={{ fontSize: 24 }} color="primary" />
          <Typography variant="h4">Criar aula</Typography>
        </Box>
      </CustomModal.Header>

      <CustomModal.Content>
        <Box component="form" display="flex" flexDirection="column">
          <TextField
            label="Título"
            type="text"
            fullWidth
            margin="normal"
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <Controller
            name="publish_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Data de publicação"
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date?.toISOString())}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal',
                    error: !!errors.publish_date,
                    helperText: errors.publish_date?.message,
                  },
                }}
              />
            )}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="status-label">Status</InputLabel>
            <Controller
              name="status"
              control={control}
              defaultValue="draft"
              render={({ field }) => (
                <Select
                  labelId="status-label"
                  label="Status"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.status}
                >
                  <MenuItem value="published">Publicado</MenuItem>
                  <MenuItem value="draft">Rascunho</MenuItem>
                  <MenuItem value="archived">Arquivado</MenuItem>
                </Select>
              )}
            />
            {errors.status && (
              <Typography variant="caption" color="error">
                {errors.status.message}
              </Typography>
            )}
          </FormControl>
          <Box>
            <TextField
              label="Link do vídeo da aula"
              type="text"
              fullWidth
              margin="normal"
              {...register('video_url')}
              error={!!errors.video_url}
              helperText={errors.video_url?.message}
            />
            <InfoNotice message="O link do vídeo da aula deve ser de um serviço suportado. O único serviço suportado atualmente é o YouTube." />
          </Box>
        </Box>
      </CustomModal.Content>

      <CustomModal.Footer align="right">
        <Button onClick={onClose} disabled={isSubmitting} sx={{ color: 'text.primary' }}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit(handleFormSubmit)}
          disabled={isSubmitting}
        >
          Salvar
        </Button>
      </CustomModal.Footer>
    </CustomModal>
  );
};
