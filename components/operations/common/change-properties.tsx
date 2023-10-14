import * as z from 'zod';
import {
  BytesValue,
  TypedValue,
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
  esdtTokenProperties,
  sftNftTokenProperties,
  commonOpertationsGasLimit,
  builtInSC,
  TokenPropertyOrRole,
} from '@/components/operations/constants';
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsCheckboxGroup } from '@/components/operations/operations-checkbox-group';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { useContext } from 'react';
import { OperationsStateDialogContext } from '@/components/operations/operations-status-dialog';
import { CommonOpertationContentProps } from '@/components/operations/operations-common-types';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  properties: z.array(z.string()),
});

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
  const { setOpen: setTxStatusDialogOpen } = useContext(
    OperationsStateDialogContext
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      properties: propertiesMap[tokenType].map((property) => property.name),
    },
  });

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

    setTxStatusDialogOpen(true);
    form.reset();
    close();
  };

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
      <div className="overflow-y-auto py-0 px-8">
        <Form {...form}>
          <form
            id="change-properties-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex-1 overflow-auto p-1">
              <OperationsInputField
                name="tokenId"
                label="Token id"
                placeholder="Example: MyToken-23432"
                description="Please provide your token id"
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
      <DialogFooter className="py-4 px-8">
        <OperationsSubmitButton formId="change-properties-form" />
      </DialogFooter>
    </>
  );
};
