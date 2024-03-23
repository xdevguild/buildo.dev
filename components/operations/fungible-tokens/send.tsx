import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { useContext } from 'react';
import { OperationsStateDialogContext } from '@/components/operations/operations-status-dialog';
import { OperationContentProps } from '@/components/operations/operations-common-types';
import BigNumber from 'bignumber.js';
import { ESDTType } from '@useelven/core';
import { transfersOperationsGasLimit } from '@/components/operations/constants';
import { OperationsTokenIdAmountInput } from '../operations-tokenid-amount-input';

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

export const Send = ({ transfer, close }: OperationContentProps) => {
  const { setOpen: setTxStatusDialogOpen } = useContext(
    OperationsStateDialogContext
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      address: '',
      amount: '',
    },
  });

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

    setTxStatusDialogOpen(true);
    form.reset();
    close();
  };

  return (
    <>
      <DialogHeader className="p-8 pb-0">
        <DialogTitle>Transfer an amount of your fungible ESDT</DialogTitle>
        <DialogDescription>
          Performing an ESDT transfer is done by sending a transaction directly
          to the desired receiver Account, but specifying some extra pieces of
          information in its Data field.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto px-8 py-0">
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
          </form>
        </Form>
      </div>
      <DialogFooter className="px-8 py-4">
        <OperationsSubmitButton formId="send-form" />
      </DialogFooter>
    </>
  );
};
