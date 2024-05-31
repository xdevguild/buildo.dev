'use client';

import * as z from 'zod';
import {
  BytesValue,
  TypedValue,
  ContractCallPayloadBuilder,
  ContractFunction,
  BigUIntValue,
} from '@multiversx/sdk-core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { OperationsInputField } from '@/app/(operations)/components/operations-ui/operations-input-field';
import { OperationsSubmitButton } from '@/app/(operations)/components/operations-ui/operations-submit-button';
import { CommonOpertationContentProps } from '@/app/(operations)/components/operations-ui/operations-common-types';
import { OperationsRadioGroup } from '@/app/(operations)/components/operations-ui/operations-radio-group';
import BigNumber from 'bignumber.js';
import { useAccount, useConfig, useTransaction } from '@useelven/core';
import axios from 'axios';
import { specialOpertationsGasLimit } from '@/app/(operations)/components/operations-ui/constants';
import { useTxStatus } from '@/hooks/use-tx-status';
import { OperationInfoBox } from './operations-ui/operation-info-box';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  quantity: z
    .string()
    .refine(
      (value) => !new BigNumber(value).isNaN(),
      'Required BigNumber string.'
    ),
  type: z.enum(['add', 'burn'], {
    required_error: 'Please choose the type of the operation (add/burn)',
  }),
});

export const AddBurnQuantity = ({
  tokenType,
}: {
  tokenType: CommonOpertationContentProps['tokenType'];
}) => {
  const { triggerTx, error, txResult, transaction, pending } = useTransaction();
  const { address } = useAccount();
  const { apiAddress } = useConfig();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      quantity: '',
      type: 'add',
    },
  });

  useTxStatus({
    successHash: txResult?.hash,
    pendingHash: transaction?.getHash()?.toString(),
    error,
    pending,
  });

  const onSubmit = async ({
    tokenId,
    quantity,
    type,
  }: z.infer<typeof formSchema>) => {
    try {
      // TODO: replace with useElven useApiCall when ready to handle such cases
      const tokenOnNetwork = await axios.get<{
        nonce: number;
        collection: string;
      }>(`${apiAddress}/nfts/${tokenId.trim()}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const nonce = tokenOnNetwork?.data?.nonce;
      const collectionId = tokenOnNetwork?.data?.collection;

      // TODO: show the error in the transaction status modal
      if (!nonce || !collectionId) {
        console.error(
          "Can't read the nonce or/and collection id of the token, using MultiversX API!"
        );
        return;
      }

      const args: TypedValue[] = [
        BytesValue.fromUTF8(collectionId.trim()),
        new BigUIntValue(new BigNumber(nonce)),
        new BigUIntValue(new BigNumber(quantity.trim())),
      ];

      // TODO: replace ContractCallPayloadBuilder
      const data = new ContractCallPayloadBuilder()
        .setFunction(
          new ContractFunction(
            type === 'add' ? 'ESDTNFTAddQuantity' : 'ESDTNFTBurn'
          )
        )
        .setArgs(args)
        .build();

      triggerTx?.({
        address,
        gasLimit: specialOpertationsGasLimit,
        data,
        value: 0,
      });
    } catch (e) {
      console.error(
        "Can't read the nonce or/and collection id of the token, using MultiversX API!",
        e
      );
    }
  };

  return (
    <>
      <OperationInfoBox error={error} txResult={txResult} />
      <Form {...form}>
        <form
          id="add-burn-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex-1 overflow-auto p-1">
            <OperationsRadioGroup
              items={[
                { name: 'add', description: 'Add the quantity' },
                { name: 'burn', description: 'Reduce the quantity' },
              ]}
              name="type"
              label="Operation type"
              description="Please choose the type of the operation. Add or Burn."
            />
            <OperationsInputField
              name="tokenId"
              label="Token id"
              placeholder="Example: MyToken-23432-01"
              description="Please provide your token id"
            />
            <OperationsInputField
              name="quantity"
              label="Quantity"
              placeholder="Example: 10000"
              description={
                tokenType === 'semi-fungible'
                  ? 'Please provide the quantity.'
                  : 'Please provide the supply (remember to take into consideration the number of decimals. For example 100.5 with 2 decimal places will be 10050).'
              }
            />
          </div>
          <OperationsSubmitButton formId="add-burn-form" />
        </form>
      </Form>
    </>
  );
};
