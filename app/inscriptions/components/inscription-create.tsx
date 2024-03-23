'use client';

import { Sign } from './sign';
import { Broadcast } from './broadcast';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLoggingIn } from '@useelven/core';
import { Spinner } from '@/components/ui/spinner';

export const InscriptionsCreate = () => {
  const { pending } = useLoggingIn();
  const searchParams = useSearchParams();
  const [nextStep, setNextStep] = useState<boolean>();

  // Web wallet handling
  useEffect(() => {
    const walletProviderStatus = searchParams.get('walletProviderStatus');
    if (walletProviderStatus === 'transactionsSigned') {
      setNextStep(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (pending) {
    return (
      <div className="flex items-center gap-3 font-bold sm:px-8">
        <Spinner size={20} /> Pending, please wait...
      </div>
    );
  }

  return (
    <div>
      {nextStep ? (
        <Broadcast setNextStep={setNextStep} />
      ) : (
        <Sign setNextStep={setNextStep} />
      )}
    </div>
  );
};
