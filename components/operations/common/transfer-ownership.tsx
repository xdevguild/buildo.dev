import * as z from 'zod';
import {
  BytesValue,
  TypedValue,
  ContractCallPayloadBuilder,
  ContractFunction,
  Address,
  AddressValue,
} from '@multiversx/sdk-core';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  builtInSC,
  commonOpertationsGasLimit,
} from '@/components/operations/constants';
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsSubmitButton } from '../operations-submit-button';
import { useContext } from 'react';
import { OperationsStateDialogContext } from '@/components/operations/operations-status-dialog';
import { CommonOpertationContentProps } from '@/components/operations/operations-common-types';
import { OperationsTokenIdInput } from '@/components/operations/operations-tokenid-input';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  address: z.string().min(1, 'The field is required'),
});

export const TransferOwnership = ({
  triggerTx,
  close,
  tokenType,
}: CommonOpertationContentProps) => {
  const { setOpen: setTxStatusDialogOpen } = useContext(
    OperationsStateDialogContext
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      address: '',
    },
  });

  const onSubmit = ({ tokenId, address }: z.infer<typeof formSchema>) => {
    const args: TypedValue[] = [
      BytesValue.fromUTF8(tokenId.trim()),
      new AddressValue(new Address(address.trim())),
    ];

    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('transferOwnership'))
      .setArgs(args)
      .build();

    triggerTx?.({
      address: builtInSC,
      gasLimit: commonOpertationsGasLimit,
      data,
      value: 0,
    });

    setTxStatusDialogOpen(true);
    form.reset();
    close();
  };

  return (
    <>
      <DialogHeader className="p-8 pb-0">
        <DialogTitle>
          Transfer ownersip and management rights for the ESDT
        </DialogTitle>
        <DialogDescription>
          The manager of an ESDT token may transfer the management rights to
          another Account. After this transaction is processed by the Metachain,
          any subsequent management operations will only be permitted to the new
          Account. This operation requires that the option canChangeOwner is set
          to true.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto py-0 px-8">
        <Form {...form}>
          <form
            id="transfer-ownership-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex-1 overflow-auto p-1">
              <OperationsTokenIdInput tokenType={tokenType} />
              <OperationsInputField
                name="address"
                label="Address"
                placeholder="Example: erd1..."
                description="Please provide the address of a new owner"
              />
            </div>
          </form>
        </Form>
      </div>
      <DialogFooter className="py-4 px-8">
        <OperationsSubmitButton formId="transfer-ownership-form" />
      </DialogFooter>
    </>
  );
};
