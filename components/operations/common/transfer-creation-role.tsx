import * as z from 'zod';
import {
  BytesValue,
  TypedValue,
  ContractCallPayloadBuilder,
  ContractFunction,
  AddressValue,
  Address,
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
  commonOpertationsGasLimit,
  builtInSC,
} from '@/components/operations/constants';
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { CommonOpertationContentProps } from '@/components/operations/operations-common-types';
import { OperationsTokenIdInput } from '../operations-tokenid-input';

const formSchema = z.object({
  addressWithRole: z.string().min(1, 'The field is required'),
  newAddressForRole: z.string().min(1, 'The field is required'),
  tokenId: z.string().min(1, 'The field is required!'),
});

export const TransferCreationRole = ({
  triggerTx,
  close,
  tokenType,
}: CommonOpertationContentProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addressWithRole: '',
      newAddressForRole: '',
      tokenId: '',
    },
  });

  const onSubmit = ({
    tokenId,
    addressWithRole,
    newAddressForRole,
  }: z.infer<typeof formSchema>) => {
    const args: TypedValue[] = [
      BytesValue.fromUTF8(tokenId.trim()),
      new AddressValue(new Address(addressWithRole.trim())),
      new AddressValue(new Address(newAddressForRole.trim())),
    ];

    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('transferNFTCreateRole'))
      .setArgs(args)
      .build();

    triggerTx?.({
      address: builtInSC,
      gasLimit: commonOpertationsGasLimit,
      data,
      value: 0,
    });

    form.reset();
    close();
  };

  return (
    <>
      <DialogHeader className="p-8 pb-0">
        <DialogTitle>Transfer creation role</DialogTitle>
        <DialogDescription>
          The token manager can transfer the creation role from one address to
          another. This role can be transferred only if the
          canTransferNFTCreateRole property of the token is set to true.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto px-8 py-0">
        <Form {...form}>
          <form
            id="transfer-creation-role-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex-1 overflow-auto p-1">
              <OperationsTokenIdInput tokenType={tokenType} />
              <OperationsInputField
                name="addressWithRole"
                label="Current address with create role"
                placeholder="Example: erd1..."
                description="Please provide the address to transfer the role from"
              />
              <OperationsInputField
                name="newAddressForRole"
                label="New address for create role"
                placeholder="Example: erd1..."
                description="Please provide the address to transfer the role to"
              />
            </div>
          </form>
        </Form>
      </div>
      <DialogFooter className="px-8 py-4">
        <OperationsSubmitButton formId="transfer-creation-role-form" />
      </DialogFooter>
    </>
  );
};
