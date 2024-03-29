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
import { OperationContentProps } from '@/components/operations/operations-common-types';
import { useAccount, useConfig } from '@useelven/core';
import axios from 'axios';
import { specialOpertationsGasLimit } from '../constants';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  attributes: z
    .string()
    .min(
      1,
      'The field is required. You will need at least metadata.json attribute.'
    ),
});

export const ChangeAttributes = ({
  triggerTx,
  close,
}: OperationContentProps) => {
  const { address } = useAccount();
  const { apiAddress } = useConfig();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      attributes: '',
    },
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
        <DialogTitle>Change attributes</DialogTitle>
        <DialogDescription>
          An user that has the ESDTRoleNFTUpdateAttributes role set for a given
          ESDT, can change the attributes of a given NFT.
          ESDTNFTUpdateAttributes will remove the old attributes and add the new
          ones. Therefore, if you want to keep the old attributes you will have
          to pass them along with the new ones.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto px-8 py-0">
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
          </form>
        </Form>
      </div>
      <DialogFooter className="px-8 py-4">
        <OperationsSubmitButton formId="nft-change-attributes-form" />
      </DialogFooter>
    </>
  );
};
