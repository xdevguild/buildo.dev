'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import BigNumber from 'bignumber.js';
import { ESDTType, useConfig, useTokenTransfer } from '@useelven/core';
import { transfersOperationsGasLimit } from '@/components/operations/constants';
import { OperationsTokenIdAmountInput } from '@/components/operations/operations-tokenid-amount-input';
import { ExternalToast, toast } from 'sonner';
import { useEffect, useRef } from 'react';
import { Spinner } from '@/components/ui/spinner';

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
  const { transfer, transaction, txResult, error, pending } =
    useTokenTransfer();
  const { explorerAddress } = useConfig();

  const toastId = useRef<string | number>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      address: '',
      amount: '',
    },
  });

  // TODO: move to separate hook
  // TODO: make custom contents for toasters or display more data about the transactions somewhere
  // TODO: add information where to confirm signing process
  useEffect(() => {
    const pendingHash = transaction?.getHash().toString();
    const successHash = txResult?.hash;
    const toasterOptions: ExternalToast = {
      id: toastId?.current,
      position: 'top-right',
      ...(explorerAddress
        ? {
            action: (
              <a
                className="flex items-center justify-between gap-2 text-xs underline"
                href={`${explorerAddress}/transactions/${pendingHash || successHash}`}
              >
                {pending && <Spinner size={20} />}{' '}
                <span>Check in the Explorer!</span>
              </a>
            ),
          }
        : {}),
    };
    if (pending) {
      toastId.current = toast.info('Transaction is pending', toasterOptions);
    } else if (successHash) {
      toast.success('Transaction success', toasterOptions);
    } else if (error) {
      toast.error('Transaction error', toasterOptions);
    }
  }, [txResult?.hash, transaction, error, explorerAddress, pending]);

  const onSubmit = async ({
    tokenId,
    address,
    amount,
  }: z.infer<typeof formSchema>) => {
    transfer?.({
      type: ESDTType.FungibleESDT,
      tokenId: tokenId.trim(),
      receiver: address.trim(),
      amount: amount.trim(),
      gasLimit: transfersOperationsGasLimit,
    });

    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <OperationsSubmitButton pending={pending} />
      </form>
    </Form>
  );
};
