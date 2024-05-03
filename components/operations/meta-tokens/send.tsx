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
import { OperationContentProps } from '@/components/operations/operations-common-types';
import { ESDTType } from '@useelven/core';
import BigNumber from 'bignumber.js';

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

export const Send = ({ transfer, close }: OperationContentProps) => {
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
      tokens: [
        {
          type: ESDTType.MetaESDT,
          amount: amount.trim(),
          tokenId: tokenId.trim(),
        },
      ],
      receiver: address.trim(),
    });

    form.reset();
    close();
  };

  return (
    <>
      <DialogHeader className="p-8 pb-0">
        <DialogTitle>Transfer an amount of Meta ESDT</DialogTitle>
        <DialogDescription>
          Performing an Meta ESDT amount transfer is done by specifying the
          receiver
          {"'"}s address inside the Data field, alongside other details
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
                placeholder="Example: 0.5"
                description="Please provide the amount of Meta ESDT to send (ex. 0.5 is 0.5 amount of Meta ESDT token)"
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
