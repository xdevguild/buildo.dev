'use client';

import * as z from 'zod';
import {
  TokenTransfer,
  BytesValue,
  TypedValue,
  ContractCallPayloadBuilder,
  ContractFunction,
  U32Value,
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
import { OperationInfoBox } from '@/components/operation-info-box';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { useTransaction } from '@useelven/core';
import { useTxStatus } from '@/hooks/use-tx-status';

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
  numOfDecimals: z
    .string()
    .refine((value) => parseInt(value) > 0, 'Required non negative number.'),
  properties: z.array(z.string()),
});

export const Issue = () => {
  const { triggerTx, error, txResult, transaction, pending } = useTransaction();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      ticker: '',
      numOfDecimals: '',
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
    numOfDecimals,
  }: z.infer<typeof formSchema>) => {
    const payment = TokenTransfer.egldFromAmount(issueTokenPayment);

    const args: TypedValue[] = [
      BytesValue.fromUTF8(name.trim()),
      BytesValue.fromUTF8(ticker.trim()),
      new U32Value(numOfDecimals),
    ];

    for (const property of sftNftTokenProperties) {
      let propertyEnabled = false;

      if (properties.includes(property.name)) {
        propertyEnabled = true;
      }

      args.push(BytesValue.fromUTF8(property.name));
      args.push(BytesValue.fromUTF8(propertyEnabled.toString()));
    }

    // TODO: replace ContractCallPayloadBuilder
    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('registerMetaESDT'))
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
      <OperationInfoBox error={error} txHash={txResult?.hash} />
      <Form {...form}>
        <form
          id="meta-issue-form"
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
            <OperationsInputField
              name="numOfDecimals"
              label="Number of decimals"
              type="number"
              placeholder="Example: 18"
              description="Please provide the number of decimals (for example native
                  EGLD has 18)."
            />
            <OperationsCheckboxGroup
              items={sftNftTokenProperties}
              name="properties"
              label="Token properties"
              description="Every ESDT has a set of properties which control
                what operations are possible with it."
            />
          </div>
          <OperationsSubmitButton formId="meta-issue-form" />
        </form>
      </Form>
    </>
  );
};
