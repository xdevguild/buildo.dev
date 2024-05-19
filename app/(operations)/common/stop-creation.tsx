'use client';

import * as z from 'zod';
import {
  BytesValue,
  TypedValue,
  ContractCallPayloadBuilder,
  ContractFunction,
} from '@multiversx/sdk-core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import {
  commonOpertationsGasLimit,
  builtInSC,
} from '@/components/operations/constants';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { CommonOpertationContentProps } from '@/components/operations/operations-common-types';
import { OperationsTokenIdInput } from '@/components/operations/operations-tokenid-input';
import { useTransaction } from '@useelven/core';
import { useTxStatus } from '@/hooks/use-tx-status';
import { OperationInfoBox } from '@/components/operation-info-box';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required!'),
});

export const StopCreation = ({
  tokenType,
}: {
  tokenType: CommonOpertationContentProps['tokenType'];
}) => {
  const { triggerTx, error, txResult, transaction, pending } = useTransaction();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
    },
  });

  useTxStatus({
    successHash: txResult?.hash,
    pendingHash: transaction?.getHash()?.toString(),
    error,
    pending,
  });

  const onSubmit = ({ tokenId }: z.infer<typeof formSchema>) => {
    const args: TypedValue[] = [BytesValue.fromUTF8(tokenId.trim())];

    // TODO: replace ContractCallPayloadBuilder
    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('stopNFTCreate'))
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
          id="stop-creation-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex-1 overflow-auto p-1">
            <OperationsTokenIdInput tokenType={tokenType} />
          </div>
          <OperationsSubmitButton formId="stop-creation-form" />
        </form>
      </Form>
    </>
  );
};
