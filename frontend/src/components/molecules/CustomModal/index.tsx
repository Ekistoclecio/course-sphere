'use client';

import * as React from 'react';
import { DialogProps, SxProps, Theme } from '@mui/material';
import * as S from './styles';

type CustomModalProps = DialogProps & {
  children: React.ReactNode;
};

type SubComponentProps = {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  className?: string;
};

type FooterProps = SubComponentProps & {
  align?: 'left' | 'center' | 'right';
};

type CustomModalComposition = {
  Header: React.FC<SubComponentProps>;
  Content: React.FC<SubComponentProps>;
  Footer: React.FC<FooterProps>;
} & React.FC<CustomModalProps>;

export const CustomModal: CustomModalComposition = ({ children, ...props }) => {
  return (
    <S.Root {...props} fullWidth maxWidth="sm">
      {children}
    </S.Root>
  );
};

CustomModal.Header = ({ children, sx, className }) => (
  <S.Header className={className} sx={sx}>
    {children}
  </S.Header>
);

CustomModal.Header.displayName = 'CustomModal.Header';

CustomModal.Content = ({ children, sx, className }) => (
  <S.Content className={className} sx={sx}>
    {children}
  </S.Content>
);

CustomModal.Content.displayName = 'CustomModal.Content';

CustomModal.Footer = ({ children, align = 'right', sx, className }) => (
  <S.Footer className={className} align={align} sx={sx}>
    {children}
  </S.Footer>
);

CustomModal.Footer.displayName = 'CustomModal.Footer';
