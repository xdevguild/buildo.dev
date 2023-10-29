import * as z from 'zod';
import {
  BytesValue,
  TypedValue,
  ContractCallPayloadBuilder,
  ContractFunction,
  BigUIntValue,
  AddressValue,
  Address,
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
import { OperationContentProps } from '@/components/operations/operations-common-types';
import { OperationsRadioGroup } from '@/components/operations/operations-radio-group';
import BigNumber from 'bignumber.js';
import { useConfig } from '@useelven/core';
import axios from 'axios';
import {
  builtInSC,
  commonOpertationsGasLimit,
} from '@/components/operations/constants';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  type: z.enum(['freeze', 'unfreeze'], {
    required_error: 'Please choose the type of the operation (freeze/unfreeze)',
  }),
  accountAddressToFreeze: z.string().min(1, 'The field is required'),
});

export const FreezeUnfreeze = ({ triggerTx, close }: OperationContentProps) => {
  const { apiAddress } = useConfig();
  const { setOpen: setTxStatusDialogOpen } = useContext(
    OperationsStateDialogContext
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      type: 'freeze',
      accountAddressToFreeze: '',
    },
  });

  const onSubmit = async ({
    tokenId,
    type,
    accountAddressToFreeze,
  }: z.infer<typeof formSchema>) => {
    try {
      // TODO: replace with useElven useApiCall when ready to handle such cases
      const tokenOnNetwork = await axios.get<{ nonce: number; ticker: string }>(
        `${apiAddress}/nfts/${tokenId.trim()}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      const nonce = tokenOnNetwork?.data?.nonce;
      const collectionTicker = tokenOnNetwork?.data?.ticker;

      // TODO: show the error in the transaction status modal
      if (!nonce || !collectionTicker) {
        console.error(
          "Can't read the nonce or/and collection ticker of the token, using MultiversX API!"
        );
        return;
      }

      const args: TypedValue[] = [
        BytesValue.fromUTF8(collectionTicker.trim()),
        new BigUIntValue(new BigNumber(nonce)),
        new AddressValue(new Address(accountAddressToFreeze.trim())),
      ];

      const data = new ContractCallPayloadBuilder()
        .setFunction(
          new ContractFunction(
            type === 'freeze' ? 'freezeSingleNFT' : 'unFreezeSingleNFT'
          )
        )
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
    } catch (e) {
      console.error(
        "Can't read the nonce or/and collection ticker of the token, using MultiversX API!",
        e
      );
    }
  };

  return (
    <>
      <DialogHeader className="p-8 pb-0">
        <DialogTitle>
          Freeze/Unfreeze a single non-fungible ESDT (NFT)
        </DialogTitle>
        <DialogDescription>
          The manager of an ESDT token may freeze the NFT held by a specific
          Account. As a consequence, no NFT can be transferred to or from the
          frozen Account. Freezing and unfreezing a single NFT of an Account are
          operations designed to help token managers to comply with regulations.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto py-0 px-8">
        <Form {...form}>
          <form
            id="freeze-unfreeze-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex-1 overflow-auto p-1">
              <OperationsRadioGroup
                items={[
                  { name: 'freeze', description: 'Freeze an address' },
                  { name: 'unfreeze', description: 'Unfreeze an address' },
                ]}
                name="type"
                label="Operation type"
                description="Please choose the type of the operation. Freeze or Unfreeze."
              />
              <OperationsInputField
                name="tokenId"
                label="Token id"
                placeholder="Example: MyToken-23432-01"
                description="Please provide your token id"
              />
              <OperationsInputField
                name="accountAddressToFreeze"
                label="Account"
                placeholder="Example: erd1..."
                description={
                  'Please provide the account that holds the NFT to freeze/unfreeze.'
                }
              />
            </div>
          </form>
        </Form>
      </div>
      <DialogFooter className="py-4 px-8">
        <OperationsSubmitButton formId="freeze-unfreeze-form" />
      </DialogFooter>
    </>
  );
};
