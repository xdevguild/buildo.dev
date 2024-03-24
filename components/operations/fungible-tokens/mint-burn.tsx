import * as z from 'zod';
import {
  BytesValue,
  TypedValue,
  ContractCallPayloadBuilder,
  ContractFunction,
  BigUIntValue,
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
import { specialOpertationsGasLimit } from '@/components/operations/constants';
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { useContext } from 'react';
import { OperationsStateDialogContext } from '@/components/operations/operations-status-dialog';
import { OperationContentProps } from '@/components/operations/operations-common-types';
import { OperationsRadioGroup } from '@/components/operations/operations-radio-group';
import BigNumber from 'bignumber.js';
import { useAccount } from '@useelven/core';
import { OperationsTokenIdInput } from '@/components/operations/operations-tokenid-input';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  supply: z
    .string()
    .refine(
      (value) => !new BigNumber(value).isNaN(),
      'Required BigNumber string.'
    ),
  type: z.enum(['mint', 'burn'], {
    required_error: 'Please choose the type of the operation (mint/burn)',
  }),
});

export const MintBurn = ({ triggerTx, close }: OperationContentProps) => {
  const { address } = useAccount();
  const { setOpen: setTxStatusDialogOpen } = useContext(
    OperationsStateDialogContext
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      supply: '',
      type: 'mint',
    },
  });

  const onSubmit = ({ tokenId, supply, type }: z.infer<typeof formSchema>) => {
    const args: TypedValue[] = [
      BytesValue.fromUTF8(tokenId.trim()),
      new BigUIntValue(new BigNumber(supply.trim())),
    ];

    const data = new ContractCallPayloadBuilder()
      .setFunction(
        new ContractFunction(
          type === 'mint' ? 'ESDTLocalMint' : 'ESDTLocalBurn'
        )
      )
      .setArgs(args)
      .build();

    triggerTx?.({
      address,
      gasLimit: specialOpertationsGasLimit,
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
        <DialogTitle>Mint/Burn the supply of a fungible ESDT</DialogTitle>
        <DialogDescription>
          The manager of an ESDT token can increase/decrease the total supply by
          sending to the Metachain a transaction.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto px-8 py-0">
        <Form {...form}>
          <form
            id="mint-burn-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex-1 overflow-auto p-1">
              <OperationsRadioGroup
                items={[
                  { name: 'mint', description: 'Add to the supply' },
                  { name: 'burn', description: 'Reduce the supply' },
                ]}
                name="type"
                label="Operation type"
                description="Please choose the type of the operation. Mint or Burn."
              />
              <OperationsTokenIdInput tokenType="fungible" />
              <OperationsInputField
                name="supply"
                label="Supply"
                placeholder="Example: 10000"
                description="Please provide the supply (remember to take into
                  consideration the number of decimals. For example 100 with
                  2 decimal places will be 10000)."
              />
            </div>
          </form>
        </Form>
      </div>
      <DialogFooter className="px-8 py-4">
        <OperationsSubmitButton formId="mint-burn-form" />
      </DialogFooter>
    </>
  );
};
