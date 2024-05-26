'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { ESDTType, useTokenTransfer } from '@useelven/core';
import BigNumber from 'bignumber.js';
import { useTxStatus } from '@/hooks/use-tx-status';
import { OperationInfoBox } from '@/components/operation-info-box';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  address: z.string().min(1, 'The field is required'),
  amount: z.string().refine((value) => {
    const num = new BigNumber(value);
    return num.isInteger() && num.isGreaterThan(0);
  }, 'Please provide an integer number, should be a proper SFT amount for that specific token, bigger than 0.'),
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
          type: ESDTType.SemiFungibleESDT,
          amount: amount.trim(),
          tokenId: tokenId.trim(),
        },
      ],
      receiver: address.trim(),
    });
  };

  return (
    <>
      <OperationInfoBox error={error} txHash={txResult?.hash} />
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
              description="Please provide your token id"
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
              placeholder="Example: 10"
              description="Please provide the amount of the SFT to send."
            />
          </div>
          <OperationsSubmitButton formId="send-form" />
        </form>
      </Form>
    </>
  );
};
