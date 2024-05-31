'use client';

import * as z from 'zod';
import {
  BytesValue,
  TypedValue,
  ContractCallPayloadBuilder,
  ContractFunction,
  Address,
  AddressValue,
} from '@multiversx/sdk-core';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import {
  builtInSC,
  commonOpertationsGasLimit,
} from '@/app/(operations)/components/operations-ui/constants';
import { OperationsInputField } from '@/app/(operations)/components/operations-ui/operations-input-field';
import { OperationsSubmitButton } from '@/app/(operations)/components/operations-ui/operations-submit-button';
import { CommonOpertationContentProps } from '@/app/(operations)/components/operations-ui/operations-common-types';
import { OperationsTokenIdInput } from '@/app/(operations)/components/operations-ui/operations-tokenid-input';
import { useTxStatus } from '@/hooks/use-tx-status';
import { useTransaction } from '@useelven/core';
import { OperationInfoBox } from './operations-ui/operation-info-box';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  address: z.string().min(1, 'The field is required'),
});

export const TransferOwnership = ({
  tokenType,
}: {
  tokenType: CommonOpertationContentProps['tokenType']; // TODO: update types, replace this one
}) => {
  const { triggerTx, error, txResult, transaction, pending } = useTransaction();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      address: '',
    },
  });

  useTxStatus({
    successHash: txResult?.hash,
    pendingHash: transaction?.getHash()?.toString(),
    error,
    pending,
  });

  const onSubmit = ({ tokenId, address }: z.infer<typeof formSchema>) => {
    const args: TypedValue[] = [
      BytesValue.fromUTF8(tokenId.trim()),
      new AddressValue(new Address(address.trim())),
    ];

    // TODO: replace ContractCallPayloadBuilder
    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('transferOwnership'))
      .setArgs(args)
      .build();

    triggerTx?.({
      address: builtInSC,
      gasLimit: commonOpertationsGasLimit,
      data,
      value: 0,
    });
  };

  return (
    <>
      <OperationInfoBox error={error} txResult={txResult} />
      <Form {...form}>
        <form
          id="transfer-ownership-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex-1 overflow-auto p-1">
            <OperationsTokenIdInput tokenType={tokenType} />
            <OperationsInputField
              name="address"
              label="Address"
              placeholder="Example: erd1..."
              description="Please provide the address of a new owner"
            />
          </div>
          <OperationsSubmitButton formId="transfer-ownership-form" />
        </form>
      </Form>
    </>
  );
};
