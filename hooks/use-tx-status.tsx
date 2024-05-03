import { useConfig } from '@useelven/core';
import { ExternalToast, toast } from 'sonner';
import { useEffect, useRef } from 'react';
import { Spinner } from '@/components/ui/spinner';

type TxStatusProps = {
  error: string;
  pending: boolean;
  successHash?: string;
  pendingHash?: string;
};

// TODO: it could return parsed SC results, to reuse in other components, errors etc.
export const useTxStatus = ({
  successHash,
  pendingHash,
  error,
  pending,
}: TxStatusProps) => {
  const { explorerAddress } = useConfig();

  const toastId = useRef<string | number>();

  useEffect(() => {
    const toasterOptions: ExternalToast = {
      id: toastId?.current,
      position: 'top-right',
      ...(explorerAddress
        ? {
            action: (
              <a
                className="flex items-center justify-between gap-2 text-xs underline"
                href={`${explorerAddress}/transactions/${pendingHash || successHash}`}
              >
                {pending && <Spinner size={20} />}{' '}
                <span>Check in the Explorer!</span>
              </a>
            ),
          }
        : {}),
    };
    if (pending) {
      toastId.current = toast.info('Transaction is pending', toasterOptions);
    } else if (successHash) {
      toast.success('Transaction success', toasterOptions);
    } else if (error) {
      toast.error('Transaction error', toasterOptions);
    }
  }, [successHash, pendingHash, error, explorerAddress, pending]);
};
