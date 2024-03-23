'use client';

import { FC, useState } from 'react';
import { useLogin, useLogout } from '@useelven/core';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LoginComponent } from './login-component';
import { useEffectOnlyOnUpdate } from '@/hooks/use-effect-only-on-update';

interface LoginModalButtonProps {
  onClose?: () => void;
  onOpen?: () => void;
}

export const LoginModalButton: FC<LoginModalButtonProps> = ({
  onClose,
  onOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, isLoggingIn, setLoggingInState } = useLogin();

  const { logout } = useLogout();

  useEffectOnlyOnUpdate(() => {
    if (isLoggedIn) {
      setIsOpen(false);
      onClose?.();
    }
  }, [isLoggedIn]);

  const onCloseComplete = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
      setTimeout(() => {
        setLoggingInState('error', '');
      }, 1000);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    onOpen?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCloseComplete}>
      {isLoggedIn ? (
        <Button variant="outline" onClick={() => logout()}>
          Logout
        </Button>
      ) : (
        !isLoggingIn && (
          <Button variant="outline" onClick={handleOpen}>
            Connect
          </Button>
        )
      )}
      <DialogContent className="max-w-xs bg-white p-0 dark:bg-[hsl(var(--background))] sm:max-w-lg">
        <DialogHeader className="px-8 pt-10">
          <DialogTitle className="text-center">Connect your wallet</DialogTitle>
        </DialogHeader>
        <div className="grid max-h-[calc(100vh-160px)] gap-4 overflow-y-auto px-6 pb-12 pt-6">
          <LoginComponent />
        </div>
      </DialogContent>
    </Dialog>
  );
};
