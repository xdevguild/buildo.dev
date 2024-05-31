'use client';

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
  commonOpertationsGasLimit,
  builtInSC,
} from '@/components/operations/constants';
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { CommonOpertationContentProps } from '@/components/operations/operations-common-types';
import { OperationsTokenIdInput } from '@/components/operations/operations-tokenid-input';
import { OperationInfoBox } from '@/components/operation-info-box';
import { useTxStatus } from '@/hooks/use-tx-status';
import { useTransaction } from '@useelven/core';

const formSchema = z.object({
  addressWithRole: z.string().min(1, 'The field is required'),
  newAddressForRole: z.string().min(1, 'The field is required'),
  tokenId: z.string().min(1, 'The field is required!'),
});

export const TransferCreationRole = ({
  tokenType,
}: {
  tokenType: CommonOpertationContentProps['tokenType'];
}) => {
  const { triggerTx, error, txResult, transaction, pending } = useTransaction();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addressWithRole: '',
      newAddressForRole: '',
      tokenId: '',
    },
  });

  useTxStatus({
    successHash: txResult?.hash,
    pendingHash: transaction?.getHash()?.toString(),
    error,
    pending,
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

    // TODO: replace ContractCallPayloadBuilder
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
  };

  return (
    <>
      <OperationInfoBox error={error} txResult={txResult} />
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
          <OperationsSubmitButton formId="transfer-creation-role-form" />
        </form>
      </Form>
    </>
  );
};
