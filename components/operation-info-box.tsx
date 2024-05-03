import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useConfig } from '@useelven/core';

type OperationInfoBoxProps = {
  txHash?: string;
  error?: string;
  message?: string;
};

export const OperationInfoBox = ({
  txHash,
  error,
  message,
}: OperationInfoBoxProps) => {
  const { explorerAddress } = useConfig();

  if (!error && !message && !txHash) {
    return null;
  }

  return (
    <Alert variant={error ? 'destructive' : 'default'} className="mb-3">
      <AlertTitle className="mb-2">Transaction status</AlertTitle>
      <AlertDescription>
        <div>{error || message}</div>
        <div>
          Check in the explorer:
          <a
            href={`${explorerAddress}/transactions/${txHash}`}
            target="_blank"
            className="ml-2 break-all font-semibold underline"
          >
            {txHash}
          </a>
        </div>
      </AlertDescription>
    </Alert>
  );
};
