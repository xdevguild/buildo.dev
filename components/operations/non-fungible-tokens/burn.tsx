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
import { OperationContentProps } from '@/components/operations/operations-common-types';
import BigNumber from 'bignumber.js';
import { useAccount, useConfig } from '@useelven/core';
import axios from 'axios';
import { specialOpertationsGasLimit } from '@/components/operations/constants';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
});

export const BurnNft = ({ triggerTx, close }: OperationContentProps) => {
  const { address } = useAccount();
  const { apiAddress } = useConfig();
  const { setOpen: setTxStatusDialogOpen } = useContext(
    OperationsStateDialogContext
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
    },
  });

  const onSubmit = async ({ tokenId }: z.infer<typeof formSchema>) => {
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
        new BigUIntValue(new BigNumber(1)),
      ];

      const data = new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction('ESDTNFTBurn'))
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
        <DialogTitle>Burn an Non-fungible ESDT</DialogTitle>
        <DialogDescription>
          A user that has the ESDTRoleNFTBurn role set, or an owner for a given
          Non-fungible token, can burn it. If successful, it will disapear from
          the balance of the address for that given token.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto py-0 px-8">
        <Form {...form}>
          <form
            id="burn-nft-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex-1 overflow-auto p-1">
              <OperationsInputField
                name="tokenId"
                label="Token id"
                placeholder="Example: MyToken-23432-01"
                description="Please provide your token id"
              />
            </div>
          </form>
        </Form>
      </div>
      <DialogFooter className="py-4 px-8">
        <OperationsSubmitButton formId="burn-nft-form" />
      </DialogFooter>
    </>
  );
};
