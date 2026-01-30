'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { OperationsInputField } from '@/app/(operations)/components/operations-ui/operations-input-field';
import { OperationsSubmitButton } from '@/app/(operations)/components/operations-ui/operations-submit-button';
import { ESDTType, useTokenTransfer } from '@useelven/core';
import BigNumber from 'bignumber.js';
import { OperationInfoBox } from '@/app/(operations)/components/operations-ui/operation-info-box';
import { useTxStatus } from '@/hooks/use-tx-status';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  address: z.string().min(1, 'The field is required'),
  amount: z
    .string()
    .refine(
      (value) => !new BigNumber(value).isNaN(),
      'Please provide a number, should be a proper Meta ESDT amount for that specific token, bigger than 0.'
    ),
});

export const Send = () => {
  const { transfer, transaction, txResult, error, pending } =
    useTokenTransfer();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      address: '',
      amount: '',
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
    address,
    amount,
  }: z.infer<typeof formSchema>) => {
    transfer?.({
      tokens: [
        {
          type: ESDTType.MetaESDT,
          amount: amount.trim(),
          tokenId: tokenId.trim(),
        },
      ],
      receiver: address.trim(),
    });
  };

  return (
    <>
      <OperationInfoBox error={error} txResult={txResult} />
      <Form {...form}>
        <form
          id="send-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex-1 overflow-auto p-1">
            <OperationsInputField
              name="tokenId"
              label="Token id"
              placeholder="Example: MyToken-23432-01"
              description="Please provide your token id. Tokens will appear here shortly after creation or issuing."
            />
            <OperationsInputField
              name="address"
              label="Address"
              placeholder="Example: erd1..."
              description="Please provide the address to where the token will be send"
            />
            <OperationsInputField
              name="amount"
              label="Amount"
              placeholder="Example: 0.5"
              description="Please provide the amount of Meta ESDT to send (ex. 0.5 is 0.5 amount of Meta ESDT token)"
            />
          </div>
          <OperationsSubmitButton formId="send-form" />
        </form>
      </Form>
    </>
  );
};
