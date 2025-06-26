'use client';

import * as React from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';

import { CustomModal } from '@/components/molecules/CustomModal';
import { useCreateCourseModal } from '@/components/organisms/CreateCourseModal/useCreateCourseModal';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import dayjs from 'dayjs';
import { Course } from '@/schemas/course/course';

type CreateCourseModalProps = {
  open: boolean;
  onClose: () => void;
  onCreateSuccessCallback?: (createdCourse: Course) => void;
};

export const CreateCourseModal = ({
  open,
  onClose,
  onCreateSuccessCallback,
}: CreateCourseModalProps) => {
  const { register, handleSubmit, control, errors, isSubmitting, handleFormSubmit } =
    useCreateCourseModal({ onClose, onCreateSuccessCallback, open });

  return (
    <CustomModal open={open} onClose={onClose} width={600}>
      <CustomModal.Header>
        <Box display="flex" alignItems="center" gap={1}>
          <LibraryAddIcon sx={{ fontSize: 24 }} color="primary" />
          <Typography variant="h4">Criar curso</Typography>
        </Box>
      </CustomModal.Header>

      <CustomModal.Content>
        <Box component="form" display="flex" flexDirection="column">
          <TextField
            label="Nome"
            type="text"
            fullWidth
            margin="normal"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            label="Descrição"
            type="text"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          <Controller
            name="start_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Data de início"
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date?.toISOString())}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal',
                    error: !!errors.start_date,
                    helperText: errors.start_date?.message,
                  },
                }}
              />
            )}
          />

          <Box>
            <Controller
              name="end_date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Data de término"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date?.toISOString())}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: 'normal',
                      error: !!errors.end_date,
                      helperText: errors.end_date?.message,
                    },
                  }}
                />
              )}
            />
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
