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
import { nftSftCreateOpertationsGasLimit } from '@/components/operations/constants';
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsSubmitButton } from '../operations-submit-button';
import { useContext } from 'react';
import { OperationsStateDialogContext } from '@/components/operations/operations-status-dialog';
import { OperationContentProps } from '@/components/operations/operations-common-types';
import { useAccount } from '@useelven/core';

const formSchema = z.object({
  collectionTokenId: z.string().min(1, 'The field is required'),
  name: z.string().min(1, 'The field is required'),
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

export const Create = ({ triggerTx, close }: OperationContentProps) => {
  const { address } = useAccount();

  const { setOpen: setTxStatusDialogOpen } = useContext(
    OperationsStateDialogContext
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collectionTokenId: '',
      name: '',
      royalties: '',
      uris: '',
      attributes: '',
      hash: '',
    },
  });

  const onSubmit = ({
    collectionTokenId,
    name,
    royalties,
    uris,
    attributes,
    hash,
  }: z.infer<typeof formSchema>) => {
    const args: TypedValue[] = [
      BytesValue.fromUTF8(collectionTokenId.trim()),
      new BigUIntValue(new Bignumber(1)),
      BytesValue.fromUTF8(name.trim()),
      new BigUIntValue(new Bignumber(Number(royalties) * 100 || 0)),
      BytesValue.fromUTF8(hash ? hash.trim() : ''),
      BytesValue.fromUTF8(attributes ? attributes.trim() : ''),
    ];

    for (const uri of uris.split(/\n/)) {
      args.push(BytesValue.fromUTF8(uri));
    }

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

    setTxStatusDialogOpen(true);
    form.reset();
    close();
  };

  return (
    <>
      <DialogHeader className="p-8 pb-0">
        <DialogTitle>Create a non-fungible ESDT (NFT)</DialogTitle>
        <DialogDescription>
          A single address can own the role of creating an NFT for an ESDT
          token. This role can be transferred by using the
          ESDTNFTCreateRoleTransfer function. An NFT can be created on top of an
          existing ESDT by sending a transaction to self that contains the
          function call that triggers the creation. Any number of URIs can be
          assigned (minimum 1).
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto py-0 px-8">
        <Form {...form}>
          <form
            id="nft-create-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex-1 overflow-auto p-1">
              <OperationsInputField
                name="collectionTokenId"
                label="Collection Token Id"
                placeholder="Example: MYTOK-dsa34"
                description="Please provide the existing collection token id"
              />
              <OperationsInputField
                name="name"
                label="Name"
                placeholder="Example: MyToken"
                description="Please provide the NFT token name"
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
          </form>
        </Form>
      </div>
      <DialogFooter className="py-4 px-8">
        <OperationsSubmitButton formId="nft-create-form" />
      </DialogFooter>
    </>
  );
};
