'use client';

import { AppBar, Toolbar, Box, Avatar, Typography } from '@mui/material';
import { Logo } from '@/components/molecules/Logo';
import { PopupMenu } from '@/components/organisms/PopupMenu';
import Link from 'next/link';
import { stringAvatar } from '@/utils/avatar/stringAvatar';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/atoms/Button';
import { Edit, Delete, Logout } from '@mui/icons-material';
import { ConfirmationModal } from '@/components/organisms/ConfirmationModal';
import { ProfileEditModal } from '../ProfileEditModal';
import { useHeader } from '@/components/organisms/Header/useHeader';

export function Header() {
  const {
    isConfirmationModalOpen,
    isProfileEditModalOpen,
    session,
    setIsConfirmationModalOpen,
    setIsProfileEditModalOpen,
    handleDeleteAccount,
  } = useHeader();

  return (
    <>
      <AppBar position="static" elevation={4} sx={{ backgroundColor: 'background.header' }}>
        <Toolbar>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <Logo />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <PopupMenu
            trigger={
              <Button variant="text" disableRipple>
                <Avatar {...stringAvatar(session!.user.name)} />
                <Typography
                  variant="body1"
                  marginLeft={1}
                  color="text.disabled"
                  display={{ xs: 'none', sm: 'block' }}
                >
                  {session!.user.name.split(' ')[0]}
                </Typography>
              </Button>
            }
          >
            <PopupMenu.Item
              icon={<Edit fontSize="large" sx={{ color: 'text.primary' }} />}
              onClick={() => setIsProfileEditModalOpen(true)}
            >
              Editar perfil
            </PopupMenu.Item>
            <PopupMenu.Item
              icon={<Delete fontSize="large" sx={{ color: 'text.primary' }} />}
              onClick={() => setIsConfirmationModalOpen(true)}
            >
              Excluir conta
            </PopupMenu.Item>
            <PopupMenu.Item
              icon={<Logout fontSize="large" sx={{ color: 'text.primary' }} />}
              onClick={() => signOut()}
            >
              Sair
            </PopupMenu.Item>
          </PopupMenu>
        </Toolbar>
      </AppBar>
      <ConfirmationModal
        open={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleDeleteAccount}
        title="Excluir conta"
        description="Tem certeza que deseja excluir sua conta?"
        variant="error"
        confirmLabel="Excluir"
      />
      <ProfileEditModal
        open={isProfileEditModalOpen}
        onClose={() => setIsProfileEditModalOpen(false)}
      />
    </>
  );
}
