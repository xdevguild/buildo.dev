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
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { useContext } from 'react';
import { OperationsStateDialogContext } from '@/components/operations/operations-status-dialog';
import { CommonOpertationContentProps } from '@/components/operations/operations-common-types';
import { OperationsRadioGroup } from '@/components/operations/operations-radio-group';
import BigNumber from 'bignumber.js';
import { useAccount, useConfig } from '@useelven/core';
import axios from 'axios';
import { specialOpertationsGasLimit } from '@/components/operations/constants';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  quantity: z
    .string()
    .refine(
      (value) => !new BigNumber(value).isNaN(),
      'Required BigNumber string.'
    ),
  type: z.enum(['add', 'burn'], {
    required_error: 'Please choose the type of the operation (add/burn)',
  }),
});

export const AddBurnQuantity = ({
  triggerTx,
  close,
  tokenType,
}: CommonOpertationContentProps) => {
  const { address } = useAccount();
  const { apiAddress } = useConfig();
  const { setOpen: setTxStatusDialogOpen } = useContext(
    OperationsStateDialogContext
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      quantity: '',
      type: 'add',
    },
  });

  const onSubmit = async ({
    tokenId,
    quantity,
    type,
  }: z.infer<typeof formSchema>) => {
    try {
      // TODO: replace with useElven useApiCall when ready to handle such cases
      const tokenOnNetwork = await axios.get<{
        nonce: number;
        collection: string;
      }>(`${apiAddress}/nfts/${tokenId.trim()}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const nonce = tokenOnNetwork?.data?.nonce;
      const collectionId = tokenOnNetwork?.data?.collection;

      // TODO: show the error in the transaction status modal
      if (!nonce || !collectionId) {
        console.error(
          "Can't read the nonce or/and collection id of the token, using MultiversX API!"
        );
        return;
      }

      const args: TypedValue[] = [
        BytesValue.fromUTF8(collectionId.trim()),
        new BigUIntValue(new BigNumber(nonce)),
        new BigUIntValue(new BigNumber(quantity.trim())),
      ];

      const data = new ContractCallPayloadBuilder()
        .setFunction(
          new ContractFunction(
            type === 'add' ? 'ESDTNFTAddQuantity' : 'ESDTNFTBurn'
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
    } catch (e) {
      console.error(
        "Can't read the nonce or/and collection id of the token, using MultiversX API!",
        e
      );
    }
  };

  return (
    <>
      <DialogHeader className="p-8 pb-0">
        <DialogTitle>Add/Burn the quantity of a {tokenType} ESDT</DialogTitle>
        <DialogDescription>
          A user that has the ESDTRoleNFTAddQuantity role set for a given Token,
          can increase its quantity. If successful, the balance of the address
          for the given {tokenType} will be increased with the number specified
          in the argument. A user that has the ESDTRoleNFTBurn role set for a
          given {tokenType} Token, can burn some (or all) of the quantity. The
          owner can also decrease the quantity. If successful, the quantity from
          the argument will be decreased from the balance of the address for
          that given token.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto py-0 px-8">
        <Form {...form}>
          <form
            id="add-burn-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex-1 overflow-auto p-1">
              <OperationsRadioGroup
                items={[
                  { name: 'add', description: 'Add the quantity' },
                  { name: 'burn', description: 'Reduce the quantity' },
                ]}
                name="type"
                label="Operation type"
                description="Please choose the type of the operation. Add or Burn."
              />
              <OperationsInputField
                name="tokenId"
                label="Token id"
                placeholder="Example: MyToken-23432-01"
                description="Please provide your token id"
              />
              <OperationsInputField
                name="quantity"
                label="Quantity"
                placeholder="Example: 10000"
                description={
                  tokenType === 'semi-fungible'
                    ? 'Please provide the quantity.'
                    : 'Please provide the supply (remember to take into consideration the number of decimals. For example 100.5 with 2 decimal places will be 10050).'
                }
              />
            </div>
          </form>
        </Form>
      </div>
      <DialogFooter className="py-4 px-8">
        <OperationsSubmitButton formId="add-burn-form" />
      </DialogFooter>
    </>
  );
};
