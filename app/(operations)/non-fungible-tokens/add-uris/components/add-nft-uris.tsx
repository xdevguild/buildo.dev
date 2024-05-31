'use client';

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
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { useAccount, useConfig, useTransaction } from '@useelven/core';
import axios from 'axios';
import { useTxStatus } from '@/hooks/use-tx-status';
import { OperationInfoBox } from '@/components/operation-info-box';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  uris: z.string().min(1, 'The field is required'),
});

export const AddNftUris = () => {
  const { triggerTx, error, txResult, transaction, pending } = useTransaction();
  const { address } = useAccount();
  const { apiAddress } = useConfig();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      uris: '',
    },
  });

  useTxStatus({
    successHash: txResult?.hash,
    pendingHash: transaction?.getHash()?.toString(),
    error,
    pending,
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
    } catch (e) {
      console.error(
        "Can't read the nonce or/and collection id of the token, using MultiversX API!",
        e
      );
    }
  };

  return (
    <>
      <OperationInfoBox error={error} txResult={txResult} />
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
          <OperationsSubmitButton formId="nft-add-uris-form" />
        </form>
      </Form>
    </>
  );
};
