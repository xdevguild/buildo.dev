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
import { transfersOperationsGasLimit } from '@/components/operations/constants';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  address: z.string().min(1, 'The field is required'),
});

export const Send = ({ transfer, close }: OperationContentProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      address: '',
    },
  });

  const onSubmit = async ({ tokenId, address }: z.infer<typeof formSchema>) => {
    transfer?.({
      type: ESDTType.NonFungibleESDT,
      tokenId,
      receiver: address.trim(),
      gasLimit: transfersOperationsGasLimit,
    });

    form.reset();
    close();
  };

  return (
    <>
      <DialogHeader className="p-8 pb-0">
        <DialogTitle>Transfer a non-fungible ESDT</DialogTitle>
        <DialogDescription>
          Performing an ESDT NFT transfer is done by specifying the receiver
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
