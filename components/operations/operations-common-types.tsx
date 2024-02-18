import {
  ScTokenTransferArgs,
  TransactionParams,
  MultiTokenTransferArgs,
} from '@useelven/core';

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
    gasLimit,
    receiver,
    amount,
    endpointName,
    endpointArgs,
  }: ScTokenTransferArgs) => void;
  multiTransfer?: ({ tokens, receiver }: MultiTokenTransferArgs) => void;
};

export interface CommonOpertationContentProps extends OperationContentProps {
  tokenType: 'fungible' | 'non-fungible' | 'semi-fungible' | 'meta';
}
