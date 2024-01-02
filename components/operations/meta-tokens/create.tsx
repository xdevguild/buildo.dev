import * as z from 'zod';
import {
  BigUIntValue,
  BytesValue,
  TypedValue,
  ContractCallPayloadBuilder,
  ContractFunction,
} from '@multiversx/sdk-core';
import Bignumber from 'bignumber.js';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { nftSftCreateOpertationsGasLimit } from '@/components/operations/constants';
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { useContext } from 'react';
import { OperationsStateDialogContext } from '@/components/operations/operations-status-dialog';
import { OperationContentProps } from '@/components/operations/operations-common-types';
import { useAccount } from '@useelven/core';
import { OperationsTokenIdInput } from '@/components/operations/operations-tokenid-input';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  name: z.string().min(1, 'The field is required'),
  initialQuantity: z
    .string()
    .refine(
      (value) => !new Bignumber(value).isNaN(),
      'Required BigNumber string.'
    ),
  attributes: z.string(),
});

export const Create = ({ triggerTx, close }: OperationContentProps) => {
  const { address } = useAccount();

  const { setOpen: setTxStatusDialogOpen } = useContext(
    OperationsStateDialogContext
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      name: '',
      initialQuantity: '',
      attributes: '',
    },
  });

  const onSubmit = ({
    tokenId,
    name,
    initialQuantity,
    attributes,
  }: z.infer<typeof formSchema>) => {
    const args: TypedValue[] = [
      BytesValue.fromUTF8(tokenId.trim()),
      new BigUIntValue(new Bignumber(initialQuantity)),
      BytesValue.fromUTF8(name.trim()),
      BytesValue.fromUTF8(''),
      BytesValue.fromUTF8(''),
      BytesValue.fromUTF8(attributes ? attributes.trim() : ''),
      BytesValue.fromUTF8(''),
    ];

    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('ESDTNFTCreate'))
      .setArgs(args)
      .build();

    triggerTx?.({
      address,
      gasLimit:
        nftSftCreateOpertationsGasLimit +
        data.length() * 1500 +
        attributes.length * 50000,
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
        <DialogTitle>Create a Meta ESDT</DialogTitle>
        <DialogDescription>
          A single address can own the role of creating an Meta ESDT. This role
          can be transferred by using the ESDTNFTCreateRoleTransfer function. An
          Meta ESDT can be created on top of an existing ESDT by sending a
          transaction to self that contains the function call that triggers the
          creation.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto py-0 px-8">
        <Form {...form}>
          <form
            id="meta-create-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex-1 overflow-auto p-1">
              <OperationsTokenIdInput
                tokenType="meta"
                description="Please provide the existing collection token id. Choose from the list."
              />
              <OperationsInputField
                name="name"
                label="Name"
                placeholder="Example: MyToken"
                description="Please provide the Meta ESDT token name"
              />
              <OperationsInputField
                name="initialQuantity"
                label="Initial quantity"
                placeholder="Example: 10000"
                description="Please provide the initial quantity. Consider decimal places!"
              />
              <OperationsInputField
                name="attributes"
                label="Attributes"
                placeholder="Example: someData:someValue;someArray:val1,val2,val3"
                description="Provide attributes. It's optional. (It can be any string.)"
              />
            </div>
          </form>
        </Form>
      </div>
      <DialogFooter className="py-4 px-8">
        <OperationsSubmitButton formId="meta-create-form" />
      </DialogFooter>
    </>
  );
};
