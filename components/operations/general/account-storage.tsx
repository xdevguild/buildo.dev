import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { OperationContentProps } from '@/components/operations/operations-common-types';
import {
  BytesValue,
  ContractCallPayloadBuilder,
  ContractFunction,
  TransactionPayload,
  TypedValue,
} from '@multiversx/sdk-core';
import { useAccount } from '@useelven/core';

const getKeyValuesForTx = (keyValuesArr: string[]) => {
  return keyValuesArr
    .map((keyValue: string) => {
      if (keyValue.includes(':')) {
        return keyValue
          .replaceAll(' ', '')
          .split(':')
          .map((val) => BytesValue.fromUTF8(val));
      }
      return [];
    })
    .flat();
};

/**
 * @link https://docs.multiversx.com/developers/account-storage/#transaction-format
 * */
const getTotalAdditionalGasLimit = (
  data: TransactionPayload,
  keyValuePairs: string[]
) => {
  const saveKeyValueCost = 100_000;
  const moveBalanceCost = 50_000;
  const costPerByte = data.length() * 1_500;

  let persistPerByteKey = 0;
  let persistPerByteValue = 0;
  let storePerByte = 0;

  for (const keyValue of keyValuePairs) {
    if (keyValue.includes(':')) {
      const split = keyValue.replaceAll(' ', '').split(':');
      const key = split[0];
      const value = split[1];
      persistPerByteKey = persistPerByteKey + key.length * 1_000;
      persistPerByteValue = persistPerByteValue + value.length * 1_000;
      storePerByte = storePerByte + value.length * 10_000;
    }
  }

  return (
    saveKeyValueCost +
    moveBalanceCost +
    costPerByte +
    persistPerByteKey +
    persistPerByteValue +
    storePerByte
  );
};

const formSchema = z.object({
  keyValuePairs: z.string().min(1, 'The field is required'),
});

export const AccountStorage = ({ triggerTx, close }: OperationContentProps) => {
  const { address } = useAccount();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyValuePairs: '',
    },
  });

  const onSubmit = async ({ keyValuePairs }: z.infer<typeof formSchema>) => {
    const keyValuesArr = keyValuePairs.split(/\n/);
    const args: TypedValue[] = getKeyValuesForTx(keyValuesArr);

    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('SaveKeyValue'))
      .setArgs(args)
      .build();

    triggerTx?.({
      address,
      gasLimit: getTotalAdditionalGasLimit(data, keyValuesArr),
      data,
      value: 0,
    });

    form.reset();
    close();
  };

  return (
    <>
      <DialogHeader className="p-8 pb-0">
        <DialogTitle>Account storage</DialogTitle>
        <DialogDescription>
          The MultiversX protocol offers the possibility of storing additional
          data under an account as key-value pairs. This can be useful for many
          use cases. A wallet owner can store key-value pairs.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto px-8 py-0">
        <Form {...form}>
          <form
            id="account-storage-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex-1 overflow-auto p-1">
              <OperationsInputField
                name="keyValuePairs"
                label="Key value pairs"
                type="textarea"
                placeholder="Example: someKey:someValue"
                description="Please provide key-value data pairs. Each key-value pair should be separated with a new line. Keys can't begin with 'ELROND'."
              />
            </div>
          </form>
        </Form>
      </div>
      <DialogFooter className="px-8 py-4">
        <OperationsSubmitButton formId="account-storage-form" />
      </DialogFooter>
    </>
  );
};
