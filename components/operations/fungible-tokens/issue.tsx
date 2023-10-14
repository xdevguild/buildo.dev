import * as z from 'zod';
import {
  TokenTransfer,
  BytesValue,
  TypedValue,
  BigUIntValue,
  U32Value,
  ContractCallPayloadBuilder,
  ContractFunction,
} from '@multiversx/sdk-core';
import Bignumber from 'bignumber.js';
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
  issueTokenPayment,
  commonOpertationsGasLimit,
  builtInSC,
} from '@/components/operations/constants';
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsCheckboxGroup } from '@/components/operations/operations-checkbox-group';
import { OperationsSubmitButton } from '../operations-submit-button';
import { useContext } from 'react';
import { OperationsStateDialogContext } from '@/components/operations/operations-status-dialog';
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
  initialSupply: z
    .string()
    .refine(
      (value) => !new Bignumber(value).isNaN(),
      'Required BigNumber string.'
    ),
  properties: z.array(z.string()),
});

export const Issue = ({ triggerTx, close }: OperationContentProps) => {
  const { setOpen: setTxStatusDialogOpen } = useContext(
    OperationsStateDialogContext
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      ticker: '',
      numOfDecimals: '',
      initialSupply: '',
      properties: esdtTokenProperties.map((property) => property.name),
    },
  });

  const onSubmit = ({
    name,
    ticker,
    initialSupply,
    numOfDecimals,
    properties,
  }: z.infer<typeof formSchema>) => {
    const payment = TokenTransfer.egldFromAmount(issueTokenPayment);

    const args: TypedValue[] = [
      BytesValue.fromUTF8(name.trim()),
      BytesValue.fromUTF8(ticker.trim()),
      new BigUIntValue(new Bignumber(initialSupply.trim())),
      new U32Value(numOfDecimals),
    ];

    for (const property of esdtTokenProperties) {
      let propertyEnabled = false;

      if (properties.includes(property.name)) {
        propertyEnabled = true;
      }

      args.push(BytesValue.fromUTF8(property.name));
      args.push(BytesValue.fromUTF8(propertyEnabled.toString()));
    }

    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('issue'))
      .setArgs(args)
      .build();

    triggerTx?.({
      address: builtInSC,
      gasLimit: commonOpertationsGasLimit,
      data,
      value: payment,
    });

    setTxStatusDialogOpen(true);
    form.reset();
    close();
  };

  return (
    <>
      <DialogHeader className="p-8 pb-0">
        <DialogTitle>Issue a fungible ESDT</DialogTitle>
        <DialogDescription>
          ESDT tokens are issued via a request to the Metachain, which is a
          transaction submitted by the Account which will manage the tokens.
          When issuing a token, one must provide a token name, a ticker, the
          initial supply, the number of decimals for display purpose and
          optionally additional properties.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto py-0 px-8">
        <Form {...form}>
          <form
            id="issue-form"
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
              <OperationsInputField
                name="initialSupply"
                label="Initial supply"
                placeholder="Example: 10000"
                description="Please provide the initial supply (remember to take into
                  consideration the number of decimals for example 100 with
                  2 decimal places will be 10000)."
              />
              <OperationsCheckboxGroup
                items={esdtTokenProperties}
                name="properties"
                label="Token properties"
                description="Every ESDT token has a set of properties which control
                what operations are possible with it."
              />
            </div>
          </form>
        </Form>
      </div>
      <DialogFooter className="py-4 px-8">
        <OperationsSubmitButton formId="issue-form" />
      </DialogFooter>
    </>
  );
};
