'use client';

import {
  Dispatch,
  FC,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { LoginMethodsEnum, useAccount, useLoginInfo } from '@useelven/core';
import { OperationsContentMap } from '@/components/operations/operations-content-map';

const explorerUrl = process.env.NEXT_PUBLIC_EXPLORER_ADDRESS;

type Context = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const OperationsStateDialogContext = createContext<Context>({
  open: false,
  setOpen: function () {},
});

export const OperationsStateDialogProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({
      open,
      setOpen,
    }),
    [open]
  );

  return (
    <OperationsStateDialogContext.Provider value={value}>
      {children}
    </OperationsStateDialogContext.Provider>
  );
};

export type DialogStateContentArgs = {
  component: ReactNode;
  showTokenId?: boolean;
  additionalInfo?: string;
  tokenTransfer?: boolean;
  multiTokenTransfer?: boolean;
};

type OperationsStateDialogWrapperProps = {
  txPending: boolean;
  operationsContentsMap: OperationsContentMap;
  setDialogContentArgs: React.Dispatch<
    React.SetStateAction<DialogStateContentArgs | undefined>
  >;
  txHash?: string;
  txError?: string;
  scError?: string | boolean;
  additionalInfo?: string;
  tokenId?: string | boolean;
};

export const OperationsStateDialogWrapper = ({
  txPending,
  txHash,
  txError,
  scError,
  operationsContentsMap,
  additionalInfo,
  tokenId,
  setDialogContentArgs,
}: OperationsStateDialogWrapperProps) => {
  const { loginMethod } = useLoginInfo();
  const { activeGuardianAddress } = useAccount();

  const { open, setOpen } = useContext(OperationsStateDialogContext);

  // For web wallet signing provider we need to catch the url params and open the dialog
  // We need to check if the transaction in url has param walletProviderStatus,
  // and then we need to get the info from session storage
  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    if (!params.get('walletProviderStatus')) {
      return;
    }

    const buildoTxInfo = sessionStorage.getItem('buildoTxInfo');
    if (buildoTxInfo) {
      const parsedResult = JSON.parse(buildoTxInfo);
      setDialogContentArgs(
        operationsContentsMap[parsedResult.section][parsedResult.operation]
      );
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        forceMount
        className="flex max-h-[90%] w-full max-w-[80%] flex-col gap-2 p-0 md:max-w-[70%] lg:max-w-[40%]"
      >
        <DialogHeader className="p-8 pb-0">
          <DialogTitle className="flex items-center">
            <span className="mr-3">Transaction status</span>{' '}
            {txPending && <Spinner />}
          </DialogTitle>
          <DialogDescription>
            {!txError &&
              loginMethod === LoginMethodsEnum.extension &&
              'Confirming using MultiversX browser extension wallet!'}
            {!txError &&
              loginMethod === LoginMethodsEnum.ledger &&
              'Confirming using Ledger wallet!'}
            {!txError &&
              loginMethod === LoginMethodsEnum.walletconnect &&
              'Confirming using xPortal wallet!'}
            {!txError &&
              loginMethod === LoginMethodsEnum.wallet &&
              'Confirming using MultiversX Web Wallet!'}
            {!txError &&
              loginMethod === LoginMethodsEnum.xalias &&
              'Confirming using xAlias service!'}
            {txError &&
              'Please try again. In case of transactions, always check the transaction status on the MultiversX Explorer.'}
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto px-8 py-0">
          <div className="mb-8 flex flex-col justify-start">
            {txPending && (
              <div className="mb-2">
                <span className="text-sm font-bold">
                  Transaction is pending...
                </span>
              </div>
            )}
            {scError && (
              <div className="mb-2">
                <div className="text-sm font-bold">
                  There was an error on the smart contract:
                </div>
                <div>
                  <span className="text-sm text-destructive">{scError}</span>
                </div>
              </div>
            )}
            {txHash && (
              <div>
                <div className="text-sm font-bold">Check in the explorer.</div>
                <div>
                  <a
                    href={`${explorerUrl}/transactions/${txHash}`}
                    target="_blank"
                    className="break-all text-sm underline"
                  >
                    {txHash}
                  </a>
                </div>
              </div>
            )}
            {!txError &&
              !scError &&
              !txPending &&
              additionalInfo &&
              loginMethod !== LoginMethodsEnum.wallet &&
              loginMethod !== LoginMethodsEnum.xalias &&
              !activeGuardianAddress && (
                <span className="mt-4 text-sm font-light">
                  {additionalInfo}
                </span>
              )}
            {!txError && !scError && !txPending && tokenId && (
              <div>
                <div className="mt-4 text-sm font-bold">
                  Here is your token id: {tokenId}
                </div>
                <div className="mt-2 text-sm">
                  Please save it for further operations. After a while, you will
                  find it on the{' '}
                  <a
                    href={`${explorerUrl}`}
                    target="_blank"
                    className="underline"
                  >
                    explorer
                  </a>
                  .
                </div>
              </div>
            )}
            {txError && (
              <div>
                <div className="text-sm font-bold">
                  You will find the error message below:
                </div>
                <div>
                  <span className="text-sm">{txError}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
