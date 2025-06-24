'use client';

import { ButtonProps as MuiButtonProps } from '@mui/material';
import clsx from 'clsx';
import * as S from './styles';

export interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
  width?: string | number;
}

export const Button = ({
  children,
  loading = false,
  disabled,
  className,
  width,
  ...props
}: ButtonProps) => {
  return (
    <S.Root
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
};
