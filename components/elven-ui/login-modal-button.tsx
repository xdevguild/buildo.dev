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
import Link from 'next/link';

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

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCloseComplete}>
      {isLoggedIn ? (
        <Button variant="outline" size="sm" onClick={() => logout()}>
          Logout
        </Button>
      ) : (
        !isLoggingIn && (
          <Button variant="outline" size="sm" onClick={handleOpen}>
            Connect
          </Button>
        )
      )}
      <DialogContent className="max-w-xs bg-white p-0 sm:max-w-lg dark:bg-[hsl(var(--background))]">
        <DialogHeader className="px-8 pt-10">
          <DialogTitle className="text-center">
            <div className="mb-3">Connect your wallet</div>
            <div className="mx-auto max-w-[80%] text-xs font-extralight">
              By connecting your crypto wallet, you acknowledge that you have
              read and agree to our{' '}
              <Link
                href="/about#disclaimer"
                onClick={handleClose}
                className="underline"
              >
                terms
              </Link>
              .
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="grid max-h-[calc(100vh-160px)] gap-4 overflow-y-auto px-6 pt-3 pb-12">
          <LoginComponent />
        </div>
      </DialogContent>
    </Dialog>
  );
};
