'use client';

import * as z from 'zod';
import {
  TokenTransfer,
  BytesValue,
  TypedValue,
  ContractCallPayloadBuilder,
  ContractFunction,
} from '@multiversx/sdk-core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import {
  sftNftTokenProperties,
  issueTokenPayment,
  commonOpertationsGasLimit,
  builtInSC,
} from '@/components/operations/constants';
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsCheckboxGroup } from '@/components/operations/operations-checkbox-group';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { CommonOpertationContentProps } from '@/components/operations/operations-common-types';
import { useTransaction } from '@useelven/core';
import { useTxStatus } from '@/hooks/use-tx-status';
import { OperationInfoBox } from '@/components/operation-info-box';

const formSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must have min 3 characters.')
    .max(20, 'Name must have max 20 characters.')
    .refine(
      (value) => new RegExp(/^[a-zA-Z0-9]+$/).test(value),
      'Alphanumeric characters only.'
    ),
  ticker: z
    .string()
    .min(3, 'Name must have min 3 characters.')
    .max(10, 'Name must have max 10 characters.')
    .refine(
      (value) => new RegExp(/^[A-Z0-9]+$/).test(value),
      'Alphanumeric UPPERCASE only.'
    ),
  properties: z.array(z.string()),
});

const functionMap: Record<string, string> = {
  'non-fungible': 'issueNonFungible',
  'semi-fungible': 'issueSemiFungible',
};

export const IssueNftSft = ({
  tokenType,
}: {
  tokenType: CommonOpertationContentProps['tokenType'];
}) => {
  const { triggerTx, error, txResult, transaction, pending } = useTransaction();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      ticker: '',
      properties: sftNftTokenProperties.map((property) => property.name),
    },
  });

  useTxStatus({
    successHash: txResult?.hash,
    pendingHash: transaction?.getHash()?.toString(),
    error,
    pending,
  });

  const onSubmit = ({
    name,
    ticker,
    properties,
  }: z.infer<typeof formSchema>) => {
    const payment = TokenTransfer.egldFromAmount(issueTokenPayment);

    const args: TypedValue[] = [
      BytesValue.fromUTF8(name),
      BytesValue.fromUTF8(ticker),
    ];

    for (const property of sftNftTokenProperties) {
      let propertyEnabled = false;

      if (properties.includes(property.name)) {
        propertyEnabled = true;
      }

      args.push(BytesValue.fromUTF8(property.name));
      args.push(BytesValue.fromUTF8(propertyEnabled.toString()));
    }

    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction(functionMap[tokenType]))
      .setArgs(args)
      .build();

    triggerTx?.({
      address: builtInSC,
      gasLimit: commonOpertationsGasLimit,
      data,
      value: payment,
    });
  };

  return (
    <>
      <OperationInfoBox error={error} txResult={txResult} type="issue" />
      <Form {...form}>
        <form
          id="sft-nft-issue-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex-1 overflow-auto p-1">
            <OperationsInputField
              name="name"
              label="Name"
              placeholder="Example: MyToken"
              description="Please provide the token name (3-20 characters, alphanumeric)"
            />
            <OperationsInputField
              name="ticker"
              label="Ticker"
              placeholder="Example: MYTOK"
              description="Please provide the token ticker (3-10 characters,
                  alphanumeric, uppercase)"
            />
            <OperationsCheckboxGroup
              items={sftNftTokenProperties}
              name="properties"
              label="Token properties"
              description="Every ESDT has a set of properties which control
                what operations are possible with it."
            />
          </div>
          <OperationsSubmitButton formId="sft-nft-issue-form" />
        </form>
      </Form>
    </>
  );
};
