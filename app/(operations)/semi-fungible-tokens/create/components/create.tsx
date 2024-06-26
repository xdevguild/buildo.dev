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
import { nftSftCreateOpertationsGasLimit } from '@/app/(operations)/components/operations-ui/constants';
import { OperationsInputField } from '@/app/(operations)/components/operations-ui/operations-input-field';
import { OperationsSubmitButton } from '@/app/(operations)/components/operations-ui/operations-submit-button';
import { useAccount, useTransaction } from '@useelven/core';
import { OperationsTokenIdInput } from '@/app/(operations)/components/operations-ui/operations-tokenid-input';
import { OperationInfoBox } from '@/app/(operations)/components/operations-ui/operation-info-box';
import { useTxStatus } from '@/hooks/use-tx-status';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  name: z.string().min(1, 'The field is required'),
  initialQuantity: z
    .string()
    .refine(
      (value) => !new Bignumber(value).isNaN(),
      'Required BigNumber string.'
    ),
  royalties: z
    .string()
    .refine(
      (value) => parseInt(value) >= 0 && parseInt(value) <= 100,
      'Required min 0 and max 100'
    ),
  uris: z.string().min(1, 'The field is required'),
  attributes: z
    .string()
    .min(
      1,
      'The field is required. You will need at least metadata.json attribute.'
    ),
  hash: z.string().optional(),
});

export const Create = () => {
  const { triggerTx, error, txResult, transaction, pending } = useTransaction();
  const { address } = useAccount();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      name: '',
      initialQuantity: '',
      royalties: '',
      uris: '',
      attributes: '',
      hash: '',
    },
  });

  useTxStatus({
    successHash: txResult?.hash,
    pendingHash: transaction?.getHash()?.toString(),
    error,
    pending,
  });

  const onSubmit = ({
    tokenId,
    name,
    initialQuantity,
    royalties,
    uris,
    attributes,
    hash,
  }: z.infer<typeof formSchema>) => {
    const args: TypedValue[] = [
      BytesValue.fromUTF8(tokenId.trim()),
      new BigUIntValue(new Bignumber(initialQuantity.trim())),
      BytesValue.fromUTF8(name.trim()),
      new BigUIntValue(new Bignumber(Number(royalties) * 100 || 0)),
      BytesValue.fromUTF8(hash ? hash.trim() : ''),
      BytesValue.fromUTF8(attributes ? attributes.trim() : ''),
    ];

    for (const uri of uris.split(/\n/)) {
      args.push(BytesValue.fromUTF8(uri));
    }

    // TODO: replace ContractCallPayloadBuilder
    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('ESDTNFTCreate'))
      .setArgs(args)
      .build();

    triggerTx?.({
      address,
      gasLimit:
        nftSftCreateOpertationsGasLimit +
        data.length() * 1500 +
        (attributes?.length || 0 + (hash?.length || 0)) * 50000,
      data,
      value: 0,
    });
  };

  return (
    <>
      <OperationInfoBox error={error} txResult={txResult} type="create" />
      <Form {...form}>
        <form
          id="sft-create-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex-1 overflow-auto p-1">
            <OperationsTokenIdInput
              tokenType="semi-fungible"
              description="Please provide the existing collection token id. Choose from the list."
            />
            <OperationsInputField
              name="name"
              label="Name"
              placeholder="Example: MyToken"
              description="Please provide the SFT token name"
            />
            <OperationsInputField
              name="initialQuantity"
              label="Initial quantity"
              placeholder="Example: 10000"
              description="Please provide the initial quantity."
            />
            <OperationsInputField
              name="royalties"
              label="Royalties"
              placeholder="Example: 5"
              description="Please provide the royalties value (5 = 5%)"
            />
            <OperationsInputField
              name="uris"
              label="Assets (URLs)"
              type="textarea"
              placeholder="Example: https://ipfs.io/ipfs/{IPFS_CID_HERE}/1.png"
              description="Please provide URLs to a supported media file ending with the file extension. Each link is a new line in the field."
            />
            <OperationsInputField
              name="attributes"
              label="Attributes"
              placeholder="Example: metadata:{ipfsCID_here}/metadata.json;tags:tag1,tag2,tag3"
              description="Provide attributes. In most cases you'll need the metadata attribute which points to JSON file on IPFS. Separate with ';'"
            />
            <OperationsInputField
              name="hash"
              label="Hash"
              placeholder="Example: <sha256 hash>"
              description="Optionally you can provide a hash (of your image, attributes, etc)"
            />
          </div>
          <OperationsSubmitButton formId="sft-create-form" />
        </form>
      </Form>
    </>
  );
};
