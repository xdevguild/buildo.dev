import * as z from 'zod';
import {
  BigUIntValue,
  BytesValue,
  TypedValue,
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
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsSubmitButton } from '../operations-submit-button';
import { useContext } from 'react';
import { OperationsStateDialogContext } from '@/components/operations/operations-status-dialog';
import { OperationContentProps } from '@/components/operations/operations-common-types';
import { useAccount, useConfig } from '@useelven/core';
import axios from 'axios';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  uris: z.string().min(1, 'The field is required'),
});

export const AddNftUris = ({ triggerTx, close }: OperationContentProps) => {
  const { address } = useAccount();
  const { apiAddress } = useConfig();

  const { setOpen: setTxStatusDialogOpen } = useContext(
    OperationsStateDialogContext
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      uris: '',
    },
  });

  const onSubmit = async ({ tokenId, uris }: z.infer<typeof formSchema>) => {
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
        new BigUIntValue(new Bignumber(nonce)),
      ];

      for (const uri of uris.split(/\n/)) {
        args.push(BytesValue.fromUTF8(uri));
      }

      const data = new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction('ESDTNFTAddURI'))
        .setArgs(args)
        .build();

      triggerTx?.({
        address,
        gasLimit: 10000000,
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
        <DialogTitle>Add URIs (assets)</DialogTitle>
        <DialogDescription>
          An user that has the ESDTRoleNFTAddURI role set for a given ESDT, can
          add uris to a given NFT. This is done by performing a transaction like
          this.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto px-8 py-0">
        <Form {...form}>
          <form
            id="nft-add-uris-form"
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
              <OperationsInputField
                name="uris"
                label="Assets (URLs)"
                type="textarea"
                placeholder="Example: https://ipfs.io/ipfs/{IPFS_CID_HERE}/1.png"
                description="Please provide URLs to a supported media file ending with the file extension. Each link is a new line in the field."
              />
            </div>
          </form>
        </Form>
      </div>
      <DialogFooter className="px-8 py-4">
        <OperationsSubmitButton formId="nft-add-uris-form" />
      </DialogFooter>
    </>
  );
};
