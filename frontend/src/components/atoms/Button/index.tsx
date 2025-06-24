'use client';

import { ButtonProps as MuiButtonProps } from '@mui/material';
import { forwardRef } from 'react';
import clsx from 'clsx';
import * as S from './styles';

export interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
  width?: string | number;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, loading = false, disabled, className, width, ...props }, ref) => {
    return (
      <S.Root
        ref={ref}
        disabled={loading || disabled}
        className={clsx(className, { loading })}
        loading={loading}
        width={width}
        {...props}
      >
        <S.Content isLoading={loading}>{children}</S.Content>

        {loading && <S.Spinner spinnerSize={24} size={24} />}
      </S.Root>
    );
  }
);

Button.displayName = 'Button';
