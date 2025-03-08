import { useConfig, useLoggingIn, useLoginInfo } from '@useelven/core';
import { ExternalToast, toast } from 'sonner';
import { useEffect, useRef } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { SquareArrowOutUpRight } from 'lucide-react';

type TxStatusProps = {
  error: string;
  pending: boolean;
  successHash?: string;
  pendingHash?: string;
};

export const useTxStatus = ({
  successHash,
  pendingHash,
  error,
  pending,
}: TxStatusProps) => {
  const { explorerAddress } = useConfig();
  const { loginMethod } = useLoginInfo();
  const { loggedIn } = useLoggingIn();

  const toastId = useRef<string | number | undefined>(undefined);

  useEffect(() => {
    if (!loggedIn) return;

    const getLoginMethodName = () => {
      switch (loginMethod) {
        case 'ledger':
          return 'Ledger wallet';
        case 'walletconnect':
          return 'xPortal wallet';
        case 'extension':
          return 'Browser extension wallet';
        case 'xalias':
          return 'xAlias';
        case 'hub':
          return 'Hub';
        default:
          return '';
      }
    };
    const toasterOptions: ExternalToast = {
      id: toastId?.current,
      position: 'top-right',
      ...(explorerAddress
        ? {
            action: (
              <a
                className="flex flex-1 items-center justify-end gap-2 text-xs underline"
                href={`${explorerAddress}/transactions/${pendingHash || successHash}`}
              >
                {pending ? (
                  <>
                    <Spinner size={20} />
                    {pendingHash && <SquareArrowOutUpRight size={20} />}
                  </>
                ) : (
                  <span>Check in the Explorer!</span>
                )}
              </a>
            ),
          }
        : {}),
    };
    if (pending) {
      toastId.current = toast.info(
        !pendingHash
          ? `Confirm with ${getLoginMethodName()}`
          : 'Transaction is pending',
        toasterOptions
      );
    } else if (successHash) {
      toast.success('Transaction success', toasterOptions);
    } else if (error) {
      toast.error('Transaction error', toasterOptions);
    }
  }, [
    successHash,
    pendingHash,
    error,
    explorerAddress,
    pending,
    loginMethod,
    loggedIn,
  ]);
};
