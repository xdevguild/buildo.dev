'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { OperationsInputField } from '@/app/(operations)/components/operations-ui/operations-input-field';
import { OperationsSubmitButton } from '@/app/(operations)/components/operations-ui/operations-submit-button';
import {
  BytesValue,
  ContractCallPayloadBuilder,
  ContractFunction,
  TransactionPayload,
  TypedValue,
} from '@multiversx/sdk-core';
import { useAccount, useTransaction } from '@useelven/core';
import { useTxStatus } from '@/hooks/use-tx-status';
import { OperationInfoBox } from '@/app/(operations)/components/operations-ui/operation-info-box';

const getKeyValuesForTx = (keyValuesArr: string[]) => {
  return keyValuesArr
    .map((keyValue: string) => {
      if (keyValue.includes(':')) {
        return keyValue
          .replaceAll(' ', '')
          .split(':')
          .map((val) => BytesValue.fromUTF8(val));
      }
      return [];
    })
    .flat();
};

/**
 * @link https://docs.multiversx.com/developers/account-storage/#transaction-format
 * */
const getTotalAdditionalGasLimit = (
  data: TransactionPayload,
  keyValuePairs: string[]
) => {
  const saveKeyValueCost = 100_000;
  const moveBalanceCost = 50_000;
  const costPerByte = data.length() * 1_500;

  let persistPerByteKey = 0;
  let persistPerByteValue = 0;
  let storePerByte = 0;

  for (const keyValue of keyValuePairs) {
    if (keyValue.includes(':')) {
      const split = keyValue.replaceAll(' ', '').split(':');
      const key = split[0];
      const value = split[1];
      persistPerByteKey = persistPerByteKey + key.length * 1_000;
      persistPerByteValue = persistPerByteValue + value.length * 1_000;
      storePerByte = storePerByte + value.length * 10_000;
    }
  }

  return (
    saveKeyValueCost +
    moveBalanceCost +
    costPerByte +
    persistPerByteKey +
    persistPerByteValue +
    storePerByte
  );
};

const formSchema = z.object({
  keyValuePairs: z.string().min(1, 'The field is required'),
});

export const AccountStorage = () => {
  const { address } = useAccount();

  const { triggerTx, error, txResult, transaction, pending } = useTransaction();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyValuePairs: '',
    },
  });

  useTxStatus({
    successHash: txResult?.hash,
    pendingHash: transaction?.getHash()?.toString(),
    error,
    pending,
  });

  const onSubmit = async ({ keyValuePairs }: z.infer<typeof formSchema>) => {
    const keyValuesArr = keyValuePairs.split(/\n/);
    const args: TypedValue[] = getKeyValuesForTx(keyValuesArr);

    // TODO: use modern tools for contract calls
    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('SaveKeyValue'))
      .setArgs(args)
      .build();

    triggerTx?.({
      address,
      gasLimit: getTotalAdditionalGasLimit(data, keyValuesArr),
      data,
      value: 0,
    });
  };

  return (
    <>
      <OperationInfoBox error={error} txResult={txResult} />
      <Form {...form}>
        <form
          id="account-storage-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex-1 overflow-auto p-1">
            <OperationsInputField
              name="keyValuePairs"
              label="Key value pairs"
              type="textarea"
              placeholder="Example: someKey:someValue"
              description="Please provide key-value data pairs. Each key-value pair should be separated with a new line. Keys can't begin with 'ELROND'."
            />
            <OperationsSubmitButton />
          </div>
        </form>
      </Form>
    </>
  );
};
