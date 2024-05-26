'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { specialOpertationsGasLimit } from '@/components/operations/constants';
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { OperationsRadioGroup } from '@/components/operations/operations-radio-group';
import BigNumber from 'bignumber.js';
import { useAccount, useTransaction } from '@useelven/core';
import { OperationsTokenIdInput } from '@/components/operations/operations-tokenid-input';
import { OperationInfoBox } from '@/components/operation-info-box';
import { useTxStatus } from '@/hooks/use-tx-status';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  supply: z
    .string()
    .refine(
      (value) => !new BigNumber(value).isNaN(),
      'Required BigNumber string.'
    ),
  type: z.enum(['mint', 'burn'], {
    required_error: 'Please choose the type of the operation (mint/burn)',
  }),
});

export const MintBurn = () => {
  const { triggerTx, error, txResult, transaction, pending } = useTransaction();

  const { address } = useAccount();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      supply: '',
      type: 'mint',
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
    supply,
    type,
  }: z.infer<typeof formSchema>) => {
    const {
      BytesValue,
      ContractCallPayloadBuilder,
      ContractFunction,
      BigUIntValue,
    } = await import('@multiversx/sdk-core');

    const args = [
      BytesValue.fromUTF8(tokenId.trim()),
      new BigUIntValue(new BigNumber(supply.trim())),
    ];

    // TODO: replace ContractCallPayloadBuilder
    const data = new ContractCallPayloadBuilder()
      .setFunction(
        new ContractFunction(
          type === 'mint' ? 'ESDTLocalMint' : 'ESDTLocalBurn'
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
  };

  return (
    <>
      <OperationInfoBox error={error} txHash={txResult?.hash} />
      <Form {...form}>
        <form
          id="mint-burn-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex-1 overflow-auto p-1">
            <OperationsRadioGroup
              items={[
                { name: 'mint', description: 'Add to the supply' },
                { name: 'burn', description: 'Reduce the supply' },
              ]}
              name="type"
              label="Operation type"
              description="Please choose the type of the operation. Mint or Burn."
            />
            <OperationsTokenIdInput tokenType="fungible" />
            <OperationsInputField
              name="supply"
              label="Supply"
              placeholder="Example: 10000"
              description="Please provide the supply (remember to take into
                  consideration the number of decimals. For example 100 with
                  2 decimal places will be 10000)."
            />
          </div>
          <OperationsSubmitButton formId="mint-burn-form" />
        </form>
      </Form>
    </>
  );
};
