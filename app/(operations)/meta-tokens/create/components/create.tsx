'use client';

import * as z from 'zod';
import {
  BigUIntValue,
  BytesValue,
  TypedValue,
  ContractCallPayloadBuilder,
  ContractFunction,
} from '@multiversx/sdk-core';
import Bignumber from 'bignumber.js';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { nftSftCreateOpertationsGasLimit } from '@/app/(operations)/components/operations-ui/constants';
import { OperationsInputField } from '@/app/(operations)/components/operations-ui/operations-input-field';
import { OperationsSubmitButton } from '@/app/(operations)/components/operations-ui/operations-submit-button';
import { useAccount, useTransaction } from '@useelven/core';
import { OperationsTokenIdInput } from '@/app/(operations)/components/operations-ui/operations-tokenid-input';
import { useTxStatus } from '@/hooks/use-tx-status';
import { OperationInfoBox } from '@/app/(operations)/components/operations-ui/operation-info-box';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  name: z.string().min(1, 'The field is required'),
  initialQuantity: z
    .string()
    .refine(
      (value) => !new Bignumber(value).isNaN(),
      'Required BigNumber string.'
    ),
  attributes: z.string(),
});

export const Create = () => {
  const { triggerTx, error, txResult, transaction, pending } = useTransaction();

  const { address } = useAccount();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      name: '',
      initialQuantity: '',
      attributes: '',
    },
  });

  useTxStatus({
    successHash: txResult?.hash,
    pendingHash: transaction?.getHash()?.toString(),
    error,
    pending,
  });

  const onSubmit = ({
    tokenId,
    name,
    initialQuantity,
    attributes,
  }: z.infer<typeof formSchema>) => {
    const args: TypedValue[] = [
      BytesValue.fromUTF8(tokenId.trim()),
      new BigUIntValue(new Bignumber(initialQuantity)),
      BytesValue.fromUTF8(name.trim()),
      BytesValue.fromUTF8(''),
      BytesValue.fromUTF8(''),
      BytesValue.fromUTF8(attributes ? attributes.trim() : ''),
      BytesValue.fromUTF8(''),
    ];

    // TODO: replace ContractCallPayloadBuilder
    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('ESDTNFTCreate'))
      .setArgs(args)
      .build();

    triggerTx?.({
      address,
      gasLimit:
        nftSftCreateOpertationsGasLimit +
        data.length() * 1500 +
        attributes.length * 50000,
      data,
      value: 0,
    });
  };

  return (
    <>
      <OperationInfoBox error={error} txResult={txResult} type="create" />
      <Form {...form}>
        <form
          id="meta-create-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex-1 overflow-auto p-1">
            <OperationsTokenIdInput
              tokenType="meta"
              description="Please provide the existing collection token id. Choose from the list."
            />
            <OperationsInputField
              name="name"
              label="Name"
              placeholder="Example: MyToken"
              description="Please provide the Meta ESDT token name"
            />
            <OperationsInputField
              name="initialQuantity"
              label="Initial quantity"
              placeholder="Example: 10000"
              description="Please provide the initial quantity. Consider decimal places!"
            />
            <OperationsInputField
              name="attributes"
              label="Attributes"
              placeholder="Example: someData:someValue;someArray:val1,val2,val3"
              description="Provide attributes. It's optional. (It can be any string.)"
            />
          </div>
          <OperationsSubmitButton formId="meta-create-form" />
        </form>
      </Form>
    </>
  );
};
