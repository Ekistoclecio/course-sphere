import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

import { useDeleteUser } from '@/queries/user/mutation';
import { useErrorHandler } from '@/hooks/useErrorHandler';

export const useHeader = () => {
  const { data: session } = useSession();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const { mutateAsync: deleteAccount } = useDeleteUser();
  const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false);
  const { errorHandler } = useErrorHandler();

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(session!.user.id);
      await signOut();
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsConfirmationModalOpen(false);
    }
  };

  return {
    isConfirmationModalOpen,
    isProfileEditModalOpen,
    session,
    setIsConfirmationModalOpen,
    setIsProfileEditModalOpen,
    handleDeleteAccount,
  };
};
