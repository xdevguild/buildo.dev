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
} from '@/components/operations/constants';
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { OperationsTokenIdInput } from '@/components/operations/operations-tokenid-input';
import { useTxStatus } from '@/hooks/use-tx-status';
import { useTransaction } from '@useelven/core';
import { OperationInfoBox } from '@/components/operation-info-box';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  address: z.string().min(1, 'The field is required'),
});

export const Wipe = () => {
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
      .setFunction(new ContractFunction('wipe'))
      .setArgs(args)
      .build();

    triggerTx?.({
      address: builtInSC,
      gasLimit: commonOpertationsGasLimit,
      data,
      value: 0,
    });

    form.reset();
  };

  return (
    <>
      <OperationInfoBox error={error} txHash={txResult?.hash} />
      <Form {...form}>
        <form
          id="wipe-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex-1 overflow-auto p-1">
            <OperationsTokenIdInput tokenType="fungible" />
            <OperationsInputField
              name="address"
              label="Address"
              placeholder="Example: erd1..."
              description="Please provide the address for which the the balance will be wiped out"
            />
          </div>
          <OperationsSubmitButton formId="wipe-form" />
        </form>
      </Form>
    </>
  );
};
