'use client';

import { useSnackbar } from 'notistack';
import { ApiService } from '@/services/client';

export const useErrorHandler = () => {
  const { enqueueSnackbar } = useSnackbar();

  const errorHandler = (error: unknown) => {
    if (ApiService.isApiError(error) && error.response) {
      const data = error.response.data;

      if (Array.isArray(data?.message)) {
        data.message.forEach((msg: string) => {
          enqueueSnackbar(msg, { variant: 'error' });
        });
      } else if (typeof data?.message === 'string') {
        enqueueSnackbar(data.message, { variant: 'error' });
      } else {
        enqueueSnackbar('Ocorreu um erro inesperado. Por favor, tente novamente.', {
          variant: 'error',
        });
      }
    } else {
      enqueueSnackbar('Ocorreu um erro inesperado. Por favor, tente novamente.', {
        variant: 'error',
      });
      console.error(error);
    }
  };

  return { errorHandler };
};
