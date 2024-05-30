'use client';

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
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { CommonOpertationContentProps } from '@/components/operations/operations-common-types';
import { OperationsRadioGroup } from '@/components/operations/operations-radio-group';
import BigNumber from 'bignumber.js';
import { useConfig, useTransaction } from '@useelven/core';
import axios from 'axios';
import {
  builtInSC,
  commonOpertationsGasLimit,
} from '@/components/operations/constants';
import { useTxStatus } from '@/hooks/use-tx-status';
import { OperationInfoBox } from '@/components/operation-info-box';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  type: z.enum(['freeze', 'unfreeze'], {
    required_error: 'Please choose the type of the operation (freeze/unfreeze)',
  }),
  accountAddressToFreeze: z.string().min(1, 'The field is required'),
});

export const FreezeUnfreezeSingle = ({
  tokenType,
}: {
  tokenType: CommonOpertationContentProps['tokenType'];
}) => {
  const { triggerTx, error, txResult, transaction, pending } = useTransaction();
  const { apiAddress } = useConfig();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      type: 'freeze',
      accountAddressToFreeze: '',
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
    type,
    accountAddressToFreeze,
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
        new AddressValue(new Address(accountAddressToFreeze.trim())),
      ];

      // TODO: replace ContractCallPayloadBuilder
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
    } catch (e) {
      console.error(
        "Can't read the nonce or/and collection id of the token, using MultiversX API!",
        e
      );
    }
  };

  return (
    <>
      <OperationInfoBox error={error} txHash={txResult?.hash} />
      <Form {...form}>
        <form
          id="freeze-unfreeze-single-form"
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
              description={`Please provide the account that holds the ${tokenType} ESDT to freeze/unfreeze.`}
            />
          </div>
          <OperationsSubmitButton formId="freeze-unfreeze-single-form" />
        </form>
      </Form>
    </>
  );
};
