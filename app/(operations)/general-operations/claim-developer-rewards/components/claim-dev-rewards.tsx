'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { commonBuiltInOpertationsGasLimit } from '@/components/operations/constants';
import {
  ContractCallPayloadBuilder,
  ContractFunction,
} from '@multiversx/sdk-core';
import { OperationInfoBox } from '@/components/operation-info-box';
import { useTransaction } from '@useelven/core';
import { useTxStatus } from '@/hooks/use-tx-status';

const formSchema = z.object({
  smartContractAddress: z.string().min(1, 'The field is required'),
});

export const ClaimDevRewards = () => {
  const { triggerTx, error, txResult, transaction, pending } = useTransaction();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      smartContractAddress: '',
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
  }: z.infer<typeof formSchema>) => {
    // TODO: use modern tools for contract calls
    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('ClaimDeveloperRewards'))
      .build();

    triggerTx?.({
      address: smartContractAddress.trim(),
      gasLimit: commonBuiltInOpertationsGasLimit,
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
          id="claim-rewards-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex-1 overflow-auto p-1">
            <OperationsInputField
              name="smartContractAddress"
              label="Smart contract address"
              placeholder="Example: erd1qqqqq..."
              description="Please provide the smart contract address where the wallet you use is an owner."
            />
          </div>
          <OperationsSubmitButton />
        </form>
      </Form>
    </>
  );
};
