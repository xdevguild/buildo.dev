import {
  SmartContractTransactionsOutcomeParser,
  TransactionsConverter,
  ITransactionOnNetwork,
} from '@multiversx/sdk-core';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useConfig } from '@useelven/core';
import { memo } from 'react';

type OperationInfoBoxProps = {
  type?: 'issue' | 'create';
  txResult?: ITransactionOnNetwork | null;
  error?: string;
  message?: string;
};

const responseParser = ({
  type,
  value,
}: {
  type: OperationInfoBoxProps['type'];
  value: Uint8Array;
}) => {
  if (typeof type === 'undefined') return;

  return type === 'issue'
    ? value.toString()
    : Array.from(value)
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
};

const parseOutcome = (txResult: ITransactionOnNetwork | null | undefined) => {
  if (!txResult) return;

  const converter = new TransactionsConverter();
  const parser = new SmartContractTransactionsOutcomeParser();

  const transactionOutcome = converter.transactionOnNetworkToOutcome(txResult!);

  return parser.parseExecute({ transactionOutcome });
};

export const OperationInfoBox = memo(
  ({ type, txResult, error, message }: OperationInfoBoxProps) => {
    const { explorerAddress } = useConfig();

    if (!error && !message && !txResult) {
      return null;
    }

    const parsedOutcome = parseOutcome(txResult);

    return (
      <Alert variant={error ? 'destructive' : 'default'} className="mb-3">
        <AlertTitle className="mb-2">Transaction status:</AlertTitle>
        <AlertDescription>
          <div>{error || message}</div>
          {parsedOutcome && (
            <>
              <div className="text-md mb-1">
                Response message:{' '}
                <span className="font-semibold">
                  {parsedOutcome.returnMessage}
                </span>
              </div>
              {parsedOutcome.values?.length ? (
                <div className="text-md mb-1">
                  Response values:{' '}
                  {parsedOutcome.values.map((value) => (
                    <span key={value} className="mr-2 font-semibold">
                      {responseParser({ type, value })}
                    </span>
                  ))}
                </div>
              ) : null}
            </>
          )}
          {txResult?.hash && (
            <div>
              Check in the explorer:
              <a
                href={`${explorerAddress}/transactions/${txResult.hash}`}
                target="_blank"
                className="ml-2 font-semibold break-all underline"
              >
                {txResult.hash}
              </a>
            </div>
          )}
        </AlertDescription>
      </Alert>
    );
  }
);

OperationInfoBox.displayName = 'OperationInfoBox';
