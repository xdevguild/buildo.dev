'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAccount } from '@useelven/core';
import { Info } from 'lucide-react';

export const OperationsAuthCheck = () => {
  const { address } = useAccount();

  if (address) return null;

  return (
    <Alert className="max-w-[740px] m-auto mt-10 -z-10">
      <Info className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        Please connect your wallet to make transactions! Not all operations
        require that, but most of them do.
      </AlertDescription>
    </Alert>
  );
};
