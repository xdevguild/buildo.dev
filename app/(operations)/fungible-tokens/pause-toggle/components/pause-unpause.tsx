'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import {
  builtInSC,
  commonOpertationsGasLimit,
} from '@/components/operations/constants';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { useMemo } from 'react';
import { OperationsRadioGroup } from '@/components/operations/operations-radio-group';
import { OperationsSelectField } from '@/components/operations/operations-select-field';
import { useCreatorTokensAmount } from '@/hooks/use-creator-tokens-amount';
import { OperationInfoBox } from '@/components/operation-info-box';
import { useTxStatus } from '@/hooks/use-tx-status';
import { useTransaction } from '@useelven/core';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  type: z.enum(['pause', 'unPause'], {
    required_error: 'Please choose the type of the operation (pause/unPause)',
  }),
});

export const PauseUnpause = () => {
  const { triggerTx, error, txResult, transaction, pending } = useTransaction();

  const { tokens } = useCreatorTokensAmount<{
    identifier: string;
    collection: string;
    isPaused: boolean;
  }>({
    tokenType: 'fungible',
    txFinalized: Boolean(txResult?.hash),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      type: 'pause',
    },
  });

  useTxStatus({
    successHash: txResult?.hash,
    pendingHash: transaction?.getHash()?.toString(),
    error,
    pending,
  });

  const getTokens = useMemo(() => {
    if (form.getValues('type') === 'pause') {
      return tokens?.filter((token) => !token.isPaused);
    }
    return tokens?.filter((token) => token.isPaused);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens]);

  const onSubmit = async ({ tokenId, type }: z.infer<typeof formSchema>) => {
    const { BytesValue, ContractCallPayloadBuilder, ContractFunction } =
      await import('@multiversx/sdk-core');

    const args = [BytesValue.fromUTF8(tokenId.trim())];

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

    form.reset();
  };

  return (
    <>
      <OperationInfoBox error={error} txHash={txResult?.hash} />
      <Form {...form}>
        <form
          id="pause-unpause-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex-1 overflow-auto p-1">
            <OperationsRadioGroup
              items={[
                { name: 'pause', description: 'Pause transactions' },
                { name: 'unPause', description: 'Unpause transactions' },
              ]}
              name="type"
              label="Operation type"
              description="Please choose the type of the operation. Pause or Unpause."
            />
            <OperationsSelectField
              name="tokenId"
              label="Token id"
              description="Please provide your token id"
              options={
                getTokens
                  ? getTokens
                      ?.sort((a, b) => {
                        const aTokenId = a.identifier;
                        const bTokenId = b.identifier;
                        if (aTokenId < bTokenId) return -1;
                        if (aTokenId > bTokenId) return 1;
                        return 0;
                      })
                      .map((token) => ({
                        value: token.identifier,
                        label: token.identifier,
                      }))
                  : []
              }
            />
          </div>
          <OperationsSubmitButton formId="pause-unpause-form" />
        </form>
      </Form>
    </>
  );
};
