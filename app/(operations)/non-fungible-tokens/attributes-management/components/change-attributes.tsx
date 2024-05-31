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
import { specialOpertationsGasLimit } from '@/components/operations/constants';
import { useTxStatus } from '@/hooks/use-tx-status';
import { OperationInfoBox } from '@/components/operation-info-box';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  attributes: z
    .string()
    .min(
      1,
      'The field is required. You will need at least metadata.json attribute.'
    ),
});

export const ChangeAttributes = () => {
  const { triggerTx, error, txResult, transaction, pending } = useTransaction();
  const { address } = useAccount();
  const { apiAddress } = useConfig();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      attributes: '',
    },
  });

  useTxStatus({
    successHash: txResult?.hash,
    pendingHash: transaction?.getHash()?.toString(),
    error,
    pending,
  });

  const onSubmit = async ({
    tokenId,
    attributes,
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
        new BigUIntValue(new Bignumber(nonce)),
        BytesValue.fromUTF8(attributes.trim()),
      ];

      // TODO: replace ContractCallPayloadBuilder
      const data = new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction('ESDTNFTUpdateAttributes'))
        .setArgs(args)
        .build();

      triggerTx?.({
        address,
        gasLimit:
          specialOpertationsGasLimit +
          data.length() * 1500 +
          attributes?.length * 50000,
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
          id="nft-change-attributes-form"
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
              name="attributes"
              label="Attributes"
              placeholder="Example: metadata:{ipfsCID_here}/metadata.json;tags:tag1,tag2,tag3"
              description="Provide attributes. In most cases you'll need the metadata attribute which points to JSON file on IPFS. Separate with ';'"
            />
          </div>
          <OperationsSubmitButton formId="nft-change-attributes-form" />
        </form>
      </Form>
    </>
  );
};
