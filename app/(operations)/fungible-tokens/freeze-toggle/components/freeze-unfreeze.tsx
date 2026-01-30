'use client';

import * as z from 'zod';
import {
  BytesValue,
  TypedValue,
  ContractCallPayloadBuilder,
  ContractFunction,
  AddressValue,
  Address,
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
import { OperationsRadioGroup } from '@/app/(operations)/components/operations-ui/operations-radio-group';
import { OperationsTokenIdInput } from '@/app/(operations)/components/operations-ui/operations-tokenid-input';
import { OperationInfoBox } from '@/app/(operations)/components/operations-ui/operation-info-box';
import { useTransaction } from '@useelven/core';
import { useTxStatus } from '@/hooks/use-tx-status';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  address: z.string().min(1, 'The field is required'),
  type: z.enum(['freeze', 'unFreeze'], {
    message:
      'Please choose the type of the operation (freeze/unFreeze token balance in a specific account)',
  }),
});

export const FreezeUnfreeze = () => {
  const { triggerTx, error, txResult, transaction, pending } = useTransaction();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      address: '',
      type: 'freeze',
    },
  });

  useTxStatus({
    successHash: txResult?.hash,
    pendingHash: transaction?.getHash()?.toString(),
    error,
    pending,
  });

  const onSubmit = ({ tokenId, address, type }: z.infer<typeof formSchema>) => {
    const args: TypedValue[] = [
      BytesValue.fromUTF8(tokenId.trim()),
      new AddressValue(new Address(address.trim())),
    ];

    // TODO: replace ContractCallPayloadBuilder
    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction(type))
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
          id="freeze-unfreeze-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex-1 overflow-auto p-1">
            <OperationsRadioGroup
              items={[
                { name: 'freeze', description: 'Freeze token balance' },
                { name: 'unFreeze', description: 'Unfreeze token balance' },
              ]}
              name="type"
              label="Operation type"
              description="Please choose the type of the operation. Freeze or Unfreeze."
            />
            <OperationsTokenIdInput tokenType="fungible" />
            <OperationsInputField
              name="address"
              label="Address"
              placeholder="Example: erd1..."
              description="Please provide the address for which the the token balance will be frozen"
            />
          </div>
          <OperationsSubmitButton formId="freeze-unfreeze-form" />
        </form>
      </Form>
    </>
  );
};
