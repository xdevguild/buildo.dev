import * as z from 'zod';
import {
  BytesValue,
  TypedValue,
  AddressValue,
  Address,
  ContractCallPayloadBuilder,
  ContractFunction,
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
  esdtTokenSpecialRoles,
  nftTokenSpecialRoles,
  sftTokenSpecialRoles,
  commonOpertationsGasLimit,
  builtInSC,
  TokenPropertyOrRole,
} from '@/components/operations/constants';
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsCheckboxGroup } from '@/components/operations/operations-checkbox-group';
import { OperationsSubmitButton } from '../operations-submit-button';
import { useContext } from 'react';
import { OperationsStateDialogContext } from '@/components/operations/operations-status-dialog';
import { CommonOpertationContentProps } from '@/components/operations/operations-common-types';
import { OperationsRadioGroup } from '../operations-radio-group';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  address: z.string().min(1, 'The field is required'),
  roles: z.array(z.string()),
  type: z.enum(['set', 'unset'], {
    required_error: 'Please choose the type of the operation (set/unset)',
  }),
});

const rolesMap: Record<
  CommonOpertationContentProps['tokenType'],
  TokenPropertyOrRole[]
> = {
  fungible: esdtTokenSpecialRoles,
  'non-fungible': nftTokenSpecialRoles,
  'semi-fungible': sftTokenSpecialRoles,
  meta: sftTokenSpecialRoles,
};

export const ToggleSpecialRoles = ({
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
      type: 'set',
      roles: ['ESDTRoleNFTCreate', 'ESDTRoleNFTBurn'],
    },
  });

  const onSubmit = ({
    tokenId,
    address,
    roles,
    type,
  }: z.infer<typeof formSchema>) => {
    const args: TypedValue[] = [
      BytesValue.fromUTF8(tokenId.trim()),
      new AddressValue(new Address(address.trim())),
    ];

    for (const role of rolesMap[tokenType]) {
      if (roles.includes(role.name)) {
        args.push(BytesValue.fromUTF8(role.name));
      }
    }

    const data = new ContractCallPayloadBuilder()
      .setFunction(
        new ContractFunction(
          type === 'set' ? 'setSpecialRole' : 'unSetSpecialRole'
        )
      )
      .setArgs(args)
      .build();

    triggerTx?.({
      address: builtInSC.trim(),
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
          Set/unset special roles for a {tokenType} ESDT
        </DialogTitle>
        <DialogDescription>
          The manager of an ESDT token can set and unset special roles for a
          given address. Only applicable if canAddSpecialRoles property is true.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto py-0 px-8">
        <Form {...form}>
          <form
            id="toggle-special-roles-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex-1 overflow-auto p-1">
              <OperationsRadioGroup
                items={[
                  { name: 'set', description: 'Set roles' },
                  { name: 'unset', description: 'Unset roles' },
                ]}
                name="type"
                label="Operation type"
                description="Please choose the type of the operation. Set or Unset."
              />
              <OperationsInputField
                name="tokenId"
                label="Token id"
                placeholder="Example: MyToken-23432"
                description="Please provide your token id"
              />
              <OperationsInputField
                name="address"
                label="Address"
                placeholder="Example: erd1..."
                description="Please provide the address for which the roles will be assigned"
              />
              <OperationsCheckboxGroup
                items={rolesMap[tokenType]}
                name="roles"
                label="Roles"
                description="Special roles available for basic ESDT tokens."
              />
            </div>
          </form>
        </Form>
      </div>
      <DialogFooter className="py-4 px-8">
        <OperationsSubmitButton formId="toggle-special-roles-form" />
      </DialogFooter>
    </>
  );
};
