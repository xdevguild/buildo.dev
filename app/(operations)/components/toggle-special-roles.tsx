'use client';

import * as z from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import {
  esdtTokenSpecialRoles,
  nftTokenSpecialRoles,
  sftTokenSpecialRoles,
  commonOpertationsGasLimit,
  builtInSC,
  TokenPropertyOrRole,
} from '@/app/(operations)/components/operations-ui/constants';
import { OperationsInputField } from '@/app/(operations)/components/operations-ui/operations-input-field';
import { OperationsCheckboxGroup } from '@/app/(operations)/components/operations-ui/operations-checkbox-group';
import { OperationsSubmitButton } from '@/app/(operations)/components/operations-ui/operations-submit-button';
import { useEffect, useState } from 'react';
import { CommonOpertationContentProps } from '@/app/(operations)/components/operations-ui/operations-common-types';
import { OperationsRadioGroup } from '@/app/(operations)/components/operations-ui/operations-radio-group';
import { useAccount, useTransaction } from '@useelven/core';
import { useTokenRolesByAccount } from '@/hooks/use-token-roles-by-account';
import { OperationsTokenIdInput } from '@/app/(operations)/components/operations-ui/operations-tokenid-input';
import { OperationInfoBox } from './operations-ui/operation-info-box';
import { useTxStatus } from '@/hooks/use-tx-status';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  address: z.string().min(1, 'The field is required'),
  roles: z.array(z.string()),
  type: z.enum(['set', 'unset'], {
    message: 'Please choose the type of the operation (set/unset)',
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
  tokenType,
}: {
  tokenType: CommonOpertationContentProps['tokenType']; // TODO: update types, replace this one
}) => {
  const { triggerTx, error, txResult, transaction, pending } = useTransaction();

  const { address } = useAccount();
  const [disabledRoles, setDisabledRoles] = useState<string[]>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      address,
      type: 'set',
      roles: [],
    },
  });

  const watchTokenId = useWatch({ name: 'tokenId', control: form.control });
  const watchAddress = useWatch({ name: 'address', control: form.control });
  const watchType = useWatch({ name: 'type', control: form.control });

  const { roles } = useTokenRolesByAccount({
    tokenId: watchTokenId,
    tokenType,
    address: watchAddress,
  });

  useTxStatus({
    successHash: txResult?.hash,
    pendingHash: transaction?.getHash()?.toString(),
    error,
    pending,
  });

  // Handle selected roles in form
  useEffect(() => {
    const roleNames = rolesMap[tokenType].map((role) => role.name);

    if (!watchTokenId || !watchAddress) {
      setDisabledRoles(roleNames);
      return;
    }

    let disabledRoles: string[] = [];
    if (watchType === 'set') {
      disabledRoles = roles;
    } else {
      disabledRoles = roleNames.filter((role) => !roles?.includes(role));
    }
    setDisabledRoles(disabledRoles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles, watchType, watchTokenId, watchAddress]);

  const onSubmit = async ({
    tokenId,
    address,
    roles,
    type,
  }: z.infer<typeof formSchema>) => {
    const {
      BytesValue,
      AddressValue,
      Address,
      ContractCallPayloadBuilder,
      ContractFunction,
    } = await import('@multiversx/sdk-core');

    const args = [
      BytesValue.fromUTF8(tokenId.trim()),
      new AddressValue(new Address(address.trim())),
    ];

    for (const role of rolesMap[tokenType]) {
      if (roles.includes(role.name)) {
        args.push(BytesValue.fromUTF8(role.name));
      }
    }

    // TODO: replace ContractCallPayloadBuilder
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
  };

  const rolesDescription = () => {
    if (!watchAddress || !watchTokenId) {
      return 'Please set tokenId and address, then you can choose roles!';
    }
    return `Disabled ones are ${
      form.getValues('type') === 'set'
        ? "set, so you can't set them"
        : "not set, so you can't unset them"
    }.`;
  };

  return (
    <>
      <OperationInfoBox error={error} txResult={txResult} />
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
            <OperationsTokenIdInput tokenType={tokenType} />
            <OperationsInputField
              name="address"
              label="Address"
              placeholder="Example: erd1..."
              description="Please provide the address for which the roles will be assigned. By default your own."
            />
            <OperationsCheckboxGroup
              items={rolesMap[tokenType]}
              disabledItems={disabledRoles}
              name="roles"
              label="Roles"
              description={`Special roles available for basic ESDT tokens. ${rolesDescription()}`}
            />
          </div>
          <OperationsSubmitButton formId="toggle-special-roles-form" />
        </form>
      </Form>
    </>
  );
};
