'use client';

import * as React from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';

import { CustomModal } from '@/components/molecules/CustomModal';
import dayjs from 'dayjs';
import { Course } from '@/schemas/course/course';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import { useEditCourseModal } from '@/components/organisms/EditCourseModal/useEditCourseModal';

type EditCourseModalProps = {
  open: boolean;
  onClose: () => void;
  onEditSuccessCallback?: (editedCourse: Course) => void;
  course: Course;
};

export const EditCourseModal = ({
  open,
  onClose,
  onEditSuccessCallback,
  course,
}: EditCourseModalProps) => {
  const { register, handleSubmit, control, errors, isSubmitting, handleFormSubmit } =
    useEditCourseModal({ onClose, onEditSuccessCallback, course, open });

  return (
    <CustomModal open={open} onClose={onClose} width={600}>
      <CustomModal.Header>
        <Box display="flex" alignItems="center" gap={1}>
          <EditDocumentIcon sx={{ fontSize: 24 }} color="primary" />
          <Typography variant="h4">Editar curso</Typography>
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
        <Button variant="contained" onClick={handleSubmit(handleFormSubmit)} loading={isSubmitting}>
          Editar
        </Button>
      </CustomModal.Footer>
    </CustomModal>
  );
};
