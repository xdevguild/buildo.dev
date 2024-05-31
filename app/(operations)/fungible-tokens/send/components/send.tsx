'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import BigNumber from 'bignumber.js';
import { ESDTType, useTokenTransfer } from '@useelven/core';
import { OperationsTokenIdAmountInput } from '@/components/operations/operations-tokenid-amount-input';
import { useTxStatus } from '@/hooks/use-tx-status';
import { OperationInfoBox } from '@/components/operation-info-box';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  address: z.string().min(1, 'The field is required'),
  amount: z
    .string()
    .refine(
      (value) => !new BigNumber(value).isNaN(),
      'Required BigNumber string.'
    ),
});

export const Send = () => {
  const { transfer, error, txResult, transaction, pending } =
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
          type: ESDTType.FungibleESDT,
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
            <OperationsTokenIdAmountInput
              tokenType="fungible"
              onlyOwner={false}
            />
            <OperationsInputField
              name="address"
              label="Address"
              placeholder="Example: erd1..."
              description="Please provide the address to where the amount will be send"
            />
            <OperationsInputField
              name="amount"
              label="Amount"
              placeholder="Example: 22.5"
              description="Please provide the amount of ESDT to send (ex. 22.5 is 22.5 amount of an ESDT token. Don't worry about the decimal places here)."
            />
          </div>
          <OperationsSubmitButton formId="send-form" />
        </form>
      </Form>
    </>
  );
};
