'use client';

import { ReactNode } from 'react';
import * as S from './styles';

type AuthTemplateProps = {
  children: ReactNode;
};

type AuthTemplateSubComponent = {
  Header: ({ children }: { children: ReactNode }) => ReactNode;
  Footer: ({ children }: { children: ReactNode }) => ReactNode;
} & ((props: AuthTemplateProps) => ReactNode);

const AuthTemplate: AuthTemplateSubComponent = ({ children }) => {
  return (
    <S.Container>
      <S.Content elevation={8}>{children}</S.Content>
    </S.Container>
  );
};

AuthTemplate.Header = function Header({ children }: { children: ReactNode }) {
  return <S.Header>{children}</S.Header>;
};

AuthTemplate.Footer = function Footer({ children }: { children: ReactNode }) {
  return <S.Footer>{children}</S.Footer>;
};

export { AuthTemplate };
