'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { usePersistStorage } from '@/hooks/use-form-storage';
import { TransactionPayload } from '@multiversx/sdk-core/out';
import {
  useAccount,
  useConfig,
  useLoginInfo,
  useTransaction,
} from '@useelven/core';

export const Broadcast = ({
  setNextStep,
}: {
  setNextStep: (state: boolean) => void;
}) => {
  const { address } = useAccount();
  const { loginMethod } = useLoginInfo();
  const { explorerAddress } = useConfig();
  const { triggerTx, pending, txResult, error } = useTransaction({
    webWalletRedirectUrl: '/inscriptions/create',
  });

  const { storageValue: inscription } = usePersistStorage({
    storageItem: 'general-createInscription-inscription',
  });

  const { storageValue: rawPayload } = usePersistStorage({
    storageItem: 'general-createInscription-partialPayload',
  });

  const { storageValue: signature } = usePersistStorage({
    storageItem: 'general-createInscription-signature',
  });

  const onSubmit = async () => {
    if (rawPayload && signature) {
      const payload = JSON.stringify({
        ...rawPayload,
        signature,
      });

      const data = new TransactionPayload(payload);

      triggerTx?.({
        address,
        gasLimit: 50000 + 1500 * data.length(),
        data,
        value: 0,
      });
    }
  };

  const getSigningProviderName = () => {
    if (loginMethod === 'walletconnect') {
      return 'xPortal';
    }
    return loginMethod;
  };

  return (
    <div className="px-0 sm:px-8">
      <div className="mb-3 font-bold">
        {txResult?.isCompleted && (
          <div>
            Your inscription was broadcasted. You can now find it{' '}
            <a
              href={`${explorerAddress}/transactions/${txResult.hash}`}
              target="_blank"
              className="underline"
            >
              on-chain
            </a>
            .
          </div>
        )}
        {!txResult?.isCompleted && signature && (
          <div>Your inscription was signed. Now You can broadcast it!</div>
        )}
        {error && <div>There was an error: {error}</div>}
      </div>
      <div className="mb-3">
        {pending && (
          <div className="font-bold flex items-center gap-3">
            <Spinner size={20} /> Transaction pending (confirmation through{' '}
            {getSigningProviderName()})...
          </div>
        )}
        {!pending && inscription && (
          <code className="bg-slate-100 dark:bg-slate-800 dark:text-slate-50 py-4 px-6 block max-h-96 overflow-auto break-all">
            {inscription}
          </code>
        )}
      </div>
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 py-4 px-8">
        {txResult?.isCompleted || error ? (
          <Button size="sm" onClick={() => setNextStep(false)}>
            {error ? 'Try again' : 'Sign more!'}
          </Button>
        ) : (
          !pending && (
            <Button
              size="sm"
              type="button"
              onClick={onSubmit}
              disabled={!signature}
            >
              Broadcast
            </Button>
          )
        )}
      </div>
    </div>
  );
};
