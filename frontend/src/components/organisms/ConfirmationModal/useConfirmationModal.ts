import { ConfirmationModalVariant } from '@/components/organisms/ConfirmationModal';
import { useState } from 'react';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface UseConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
  variant: ConfirmationModalVariant;
}

export const useConfirmationModal = ({
  onClose,
  onConfirm,
  variant,
}: UseConfirmationModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const variantMap: Record<
    ConfirmationModalVariant,
    {
      color: 'error' | 'info';
      Icon: typeof ErrorOutlineIcon;
    }
  > = {
    error: {
      color: 'error',
      Icon: ErrorOutlineIcon,
    },
    info: {
      color: 'info',
      Icon: HelpOutlineIcon,
    },
  };

  const { color: variantColor, Icon } = variantMap[variant];

  const handleClose = async () => {
    setIsLoading(false);
    await onClose();
    setIsLoading(false);
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
  };

  return {
    isLoading,
    variantColor,
    Icon,
    handleClose,
    handleConfirm,
  };
};
