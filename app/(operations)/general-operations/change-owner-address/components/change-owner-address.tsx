'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import {
  Address,
  AddressValue,
  ContractCallPayloadBuilder,
  ContractFunction,
  TypedValue,
} from '@multiversx/sdk-core';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { OperationsInputField } from '@/app/(operations)/components/operations-ui/operations-input-field';
import { OperationsSubmitButton } from '@/app/(operations)/components/operations-ui/operations-submit-button';
import { commonBuiltInOpertationsGasLimit } from '@/app/(operations)/components/operations-ui/constants';
import { useTxStatus } from '@/hooks/use-tx-status';
import { useTransaction } from '@useelven/core';
import { OperationInfoBox } from '@/app/(operations)/components/operations-ui/operation-info-box';

const formSchema = z.object({
  smartContractAddress: z.string().min(1, 'The field is required'),
  newOwnerAddress: z.string().min(1, 'The field is required'),
});

export const ChangeOwnerAddress = () => {
  const { triggerTx, error, txResult, transaction, pending } = useTransaction();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      smartContractAddress: '',
      newOwnerAddress: '',
    },
  });

  useTxStatus({
    successHash: txResult?.hash,
    pendingHash: transaction?.getHash()?.toString(),
    error,
    pending,
  });

  const onSubmit = async ({
    smartContractAddress,
    newOwnerAddress,
  }: z.infer<typeof formSchema>) => {
    const args: TypedValue[] = [
      new AddressValue(new Address(newOwnerAddress.trim())),
    ];

    // TODO: use modern tools for contract calls
    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('ChangeOwnerAddress'))
      .setArgs(args)
      .build();

    triggerTx?.({
      address: smartContractAddress.trim(),
      gasLimit: commonBuiltInOpertationsGasLimit,
      data,
      value: 0,
    });
  };

  return (
    <>
      <OperationInfoBox error={error} txResult={txResult} />
      <Form {...form}>
        <form
          id="change-owner-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex-1 overflow-auto p-1">
            <OperationsInputField
              name="smartContractAddress"
              label="Smart contract address"
              placeholder="Example: erd1qqqqqqq..."
              description="Please provide the address of the smart contract"
            />
            <OperationsInputField
              name="newOwnerAddress"
              label="New owner address"
              placeholder="Example: erd1..."
              description="Please provide the address of the new owner of the smart contract"
            />
          </div>
          <OperationsSubmitButton />
        </form>
      </Form>
    </>
  );
};
