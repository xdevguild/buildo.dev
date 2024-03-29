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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  sftNftTokenProperties,
  issueTokenPayment,
  commonOpertationsGasLimit,
  builtInSC,
} from '@/components/operations/constants';
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsCheckboxGroup } from '@/components/operations/operations-checkbox-group';
import { OperationsSubmitButton } from '../operations-submit-button';
import { OperationContentProps } from '@/components/operations/operations-common-types';

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

export const Issue = ({ triggerTx, close }: OperationContentProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      ticker: '',
      numOfDecimals: '',
      properties: sftNftTokenProperties.map((property) => property.name),
    },
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

    form.reset();
    close();
  };

  return (
    <>
      <DialogHeader className="p-8 pb-0">
        <DialogTitle>Issue a Meta ESDT (Collection)</DialogTitle>
        <DialogDescription>
          One has to perform an issuance transaction in order to register a
          Meta-ESDT token. Meta-ESDT Tokens are issued via a request to the
          Metachain, which is a transaction submitted by the Account which will
          manage the tokens.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto px-8 py-0">
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
          </form>
        </Form>
      </div>
      <DialogFooter className="px-8 py-4">
        <OperationsSubmitButton formId="meta-issue-form" />
      </DialogFooter>
    </>
  );
};
