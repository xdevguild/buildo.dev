import { ScTokenTransferArgs, TransactionParams } from '@useelven/core';

export type OperationContentProps = {
  close: () => void;
  triggerTx?: ({
    address,
    data,
    gasLimit,
    value,
  }: TransactionParams) => Promise<void>;
  transfer?: ({
    type,
    tokenId,
    nonce,
    gasLimit,
    address,
    amount,
    value,
    endpointName,
    endpointArgs,
  }: ScTokenTransferArgs) => void;
};

export interface CommonOpertationContentProps extends OperationContentProps {
  tokenType: 'fungible' | 'non-fungible' | 'semi-fungible' | 'meta';
}
