'use client';

import { Sign } from './sign';
import { Broadcast } from './broadcast';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export const InscriptionsCreate = () => {
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
