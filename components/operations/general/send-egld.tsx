import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { TokenTransfer, TransactionPayload } from '@multiversx/sdk-core';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import {
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

const formSchema = z.object({
  address: z.string().min(1, 'The field is required'),
  amount: z
    .string()
    .refine(
      (value) => !new BigNumber(value).isNaN(),
      'Required BigNumber string.'
    ),
  note: z.string(),
});

export const SendEgld = ({ triggerTx, close }: OperationContentProps) => {
  const { setOpen: setTxStatusDialogOpen } = useContext(
    OperationsStateDialogContext
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
      amount: '',
      note: '',
    },
  });

  const onSubmit = async ({
    address,
    amount,
    note,
  }: z.infer<typeof formSchema>) => {
    const payment = TokenTransfer.egldFromAmount(amount.trim());

    const data = new TransactionPayload(note.trim() || '');

    // TODO: switch to useTokenTransfer after changes in useElven
    triggerTx?.({
      address,
      gasLimit: 50000 + 1500 * note.trim().length,
      data,
      value: payment,
    });

    setTxStatusDialogOpen(true);
    form.reset();
    close();
  };

  return (
    <>
      <DialogHeader className="p-8 pb-0">
        <DialogTitle>Transfer an amount of the native EGLD token</DialogTitle>
      </DialogHeader>
      <div className="overflow-y-auto px-8 py-0">
        <Form {...form}>
          <form
            id="send-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex-1 overflow-auto p-1">
              <OperationsInputField
                name="address"
                label="Address"
                placeholder="Example: erd1..."
                description="Please provide the address to where the EGLD will be send"
              />
              <OperationsInputField
                name="amount"
                label="Amount"
                placeholder="Example: 1.5"
                description="Please provide the amount of EGLD to send (ex. 1.5 is 1.5 EGLD)"
              />
              <OperationsInputField
                name="note"
                label="Note"
                type="textarea"
                placeholder="Example: EGLD from me!"
                description="Do you want to attach the note? (you can leave it blank)"
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
