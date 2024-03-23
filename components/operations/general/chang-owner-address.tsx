import * as z from 'zod';
import { useForm } from 'react-hook-form';
import {
  Address,
  AddressValue,
  ContractCallPayloadBuilder,
  ContractFunction,
  TypedValue,
} from '@multiversx/sdk-core';
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
import { DialogDescription } from '@radix-ui/react-dialog';
import { commonBuiltInOpertationsGasLimit } from '@/components/operations/constants';

const formSchema = z.object({
  smartContractAddress: z.string().min(1, 'The field is required'),
  newOwnerAddress: z.string().min(1, 'The field is required'),
});

export const ChangeOwnerAddress = ({
  triggerTx,
  close,
}: OperationContentProps) => {
  const { setOpen: setTxStatusDialogOpen } = useContext(
    OperationsStateDialogContext
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      smartContractAddress: '',
      newOwnerAddress: '',
    },
  });

  const onSubmit = async ({
    smartContractAddress,
    newOwnerAddress,
  }: z.infer<typeof formSchema>) => {
    const args: TypedValue[] = [
      new AddressValue(new Address(newOwnerAddress.trim())),
    ];

    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('ChangeOwnerAddress'))
      .setArgs(args)
      .build();

    triggerTx?.({
      address: smartContractAddress.trim(),
      gasLimit: commonBuiltInOpertationsGasLimit,
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
        <DialogTitle>Change owner address</DialogTitle>
        <DialogDescription>
          Change owner address is an operation to be made by a Smart Contract
          {"'"}s owner when a new owner is desired.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto px-8 py-0">
        <Form {...form}>
          <form
            id="change-owner-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex-1 overflow-auto p-1">
              <OperationsInputField
                name="smartContractAddress"
                label="Smart contract address"
                placeholder="Example: erd1qqqqqqq..."
                description="Please provide the address of the smart contract"
              />
              <OperationsInputField
                name="newOwnerAddress"
                label="New owner address"
                placeholder="Example: erd1..."
                description="Please provide the address of the new owner of the smart contract"
              />
            </div>
          </form>
        </Form>
      </div>
      <DialogFooter className="px-8 py-4">
        <OperationsSubmitButton formId="change-owner-form" />
      </DialogFooter>
    </>
  );
};
