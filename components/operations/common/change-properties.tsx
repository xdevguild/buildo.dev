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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  triggerTx,
  close,
  tokenType,
}: CommonOpertationContentProps) => {
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

    form.reset();
    close();
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
      <DialogHeader className="p-8 pb-0">
        <DialogTitle>Change properties of a {tokenType} ESDT</DialogTitle>
        <DialogDescription>
          The manager of an ESDT token may individually change any of the
          properties of the token, or multiple properties at once. The token
          should have the canUpgrade property set to true.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto px-8 py-0">
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
                    ? tokens?.map((token) => ({
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
          </form>
        </Form>
      </div>
      <DialogFooter className="px-8 py-4">
        <OperationsSubmitButton formId="change-properties-form" />
      </DialogFooter>
    </>
  );
};
