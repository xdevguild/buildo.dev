'use client';

import * as z from 'zod';
import {
  BytesValue,
  TypedValue,
  ContractCallPayloadBuilder,
  ContractFunction,
} from '@multiversx/sdk-core';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import {
  esdtTokenProperties,
  sftNftTokenProperties,
  commonOpertationsGasLimit,
  builtInSC,
  TokenPropertyOrRole,
} from '@/components/operations/constants';
import { OperationsCheckboxGroup } from '@/components/operations/operations-checkbox-group';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { useEffect } from 'react';
import { CommonOpertationContentProps } from '@/components/operations/operations-common-types';
import { OperationsSelectField } from '@/components/operations/operations-select-field';
import { useCreatorTokens } from '@/hooks/use-creator-tokens';
import { getTokenIdKey } from '@/lib/get-token-id';
import { useTransaction } from '@useelven/core';
import { OperationInfoBox } from '@/components/operation-info-box';
import { useTxStatus } from '@/hooks/use-tx-status';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  properties: z.array(z.string()),
});

interface CreatorTokens extends Record<string, string> {
  identifier: string;
  collection: string;
}

const propertiesMap: Record<
  CommonOpertationContentProps['tokenType'],
  TokenPropertyOrRole[]
> = {
  fungible: esdtTokenProperties,
  'non-fungible': sftNftTokenProperties,
  'semi-fungible': sftNftTokenProperties,
  meta: sftNftTokenProperties,
};

export const ChangeProperties = ({
  tokenType,
}: {
  tokenType: CommonOpertationContentProps['tokenType'];
}) => {
  const { triggerTx, error, txResult, transaction, pending } = useTransaction();

  const { tokens } = useCreatorTokens<CreatorTokens>({
    tokenType,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      properties: [],
    },
  });

  useTxStatus({
    successHash: txResult?.hash,
    pendingHash: transaction?.getHash()?.toString(),
    error,
    pending,
  });

  const watchTokenId = useWatch({ control: form.control, name: 'tokenId' });

  const onSubmit = ({ tokenId, properties }: z.infer<typeof formSchema>) => {
    const args: TypedValue[] = [BytesValue.fromUTF8(tokenId.trim())];

    for (const property of propertiesMap[tokenType]) {
      let propertyEnabled = false;

      if (properties.includes(property.name)) {
        propertyEnabled = true;
      }

      args.push(BytesValue.fromUTF8(property.name));
      args.push(BytesValue.fromUTF8(propertyEnabled.toString()));
    }

    // TODO: replace ContractCallPayloadBuilder
    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('controlChanges'))
      .setArgs(args)
      .build();

    triggerTx?.({
      address: builtInSC,
      gasLimit: commonOpertationsGasLimit,
      data,
      value: 0,
    });
  };

  useEffect(() => {
    const tokenData = tokens?.find(
      (token) => token[getTokenIdKey(tokenType)] === watchTokenId
    );
    if (tokenData) {
      const properties = propertiesMap[tokenType].filter((property) => {
        const key = property.name;
        return tokenData[
          key === 'canTransferNFTCreateRole' ? 'canTransferNftCreateRole' : key
        ];
      });
      form.setValue(
        'properties',
        properties.map((property) => property.name)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenType, tokens, watchTokenId]);

  return (
    <>
      <OperationInfoBox error={error} txResult={txResult} />
      <Form {...form}>
        <form
          id="change-properties-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex-1 overflow-auto p-1">
            <OperationsSelectField
              name="tokenId"
              label="Token id"
              description="Please provide your token id"
              options={
                tokens
                  ? tokens
                      ?.sort((a, b) => {
                        const aTokenId = a[getTokenIdKey(tokenType)];
                        const bTokenId = b[getTokenIdKey(tokenType)];
                        if (aTokenId < bTokenId) return -1;
                        if (aTokenId > bTokenId) return 1;
                        return 0;
                      })
                      .map((token) => ({
                        value: token[getTokenIdKey(tokenType)],
                        label: token[getTokenIdKey(tokenType)],
                      }))
                  : []
              }
            />
            <OperationsCheckboxGroup
              items={propertiesMap[tokenType]}
              name="properties"
              label="Token properties"
              description="Set new properties set for the ESDT token."
            />
          </div>
          <OperationsSubmitButton formId="change-properties-form" />
        </form>
      </Form>
    </>
  );
};
