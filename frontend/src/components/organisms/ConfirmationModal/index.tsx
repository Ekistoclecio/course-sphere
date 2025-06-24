'use client';

import * as React from 'react';
import { Typography, Box } from '@mui/material';
import { CustomModal } from '@/components/molecules/CustomModal';

import { Button } from '@/components/atoms/Button';
import { useConfirmationModal } from '@/components/organisms/ConfirmationModal/useConfirmationModal';

export type ConfirmationModalVariant = 'error' | 'info';

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => Promise<void> | void;
  onConfirm: () => Promise<void> | void;
  title: string;
  description: string;
  variant?: ConfirmationModalVariant;
  confirmLabel?: string;
  cancelLabel?: string;
}

export const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  variant = 'info',
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
}: ConfirmationModalProps) => {
  const { isLoading, variantColor, Icon, handleClose, handleConfirm } = useConfirmationModal({
    onClose,
    onConfirm,
    variant,
  });

  return (
    <CustomModal open={open} onClose={handleClose}>
      <CustomModal.Header>
        <Box display="flex" alignItems="center" gap={1}>
          <Icon color={variantColor} sx={{ fontSize: 24 }} />
          <Typography variant="h4">{title}</Typography>
        </Box>
      </CustomModal.Header>

      <CustomModal.Content>
        <Typography variant="body1">{description}</Typography>
      </CustomModal.Content>

      <CustomModal.Footer align="right">
        <Button
          disabled={isLoading}
          onClick={handleClose}
          sx={{ color: 'text.primary' }}
          variant="text"
        >
          {cancelLabel}
        </Button>
        <Button
          variant="contained"
          color={variantColor}
          onClick={handleConfirm}
          loading={isLoading}
        >
          {confirmLabel}
        </Button>
      </CustomModal.Footer>
    </CustomModal>
  );
};
