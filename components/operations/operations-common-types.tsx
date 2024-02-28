import {
  TransactionParams,
  useTokenTransfer,
  useMultiTokenTransfer,
} from '@useelven/core';

export type OperationContentProps = {
  close: () => void;
  triggerTx?: ({
    address,
    data,
    gasLimit,
    value,
  }: TransactionParams) => Promise<void>;
  transfer?: ReturnType<typeof useTokenTransfer>['transfer'];
  multiTransfer?: ReturnType<typeof useMultiTokenTransfer>['transfer'];
};

export interface CommonOpertationContentProps extends OperationContentProps {
  tokenType: 'fungible' | 'non-fungible' | 'semi-fungible' | 'meta';
}
