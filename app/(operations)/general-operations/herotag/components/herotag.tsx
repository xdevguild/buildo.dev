'use client';

import { keccak256 } from 'js-sha3';
import {
  SmartContract,
  Address,
  ContractCallPayloadBuilder,
  ContractFunction,
  TypedValue,
  BytesValue,
} from '@multiversx/sdk-core';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { OperationsInputField } from '@/app/(operations)/components/operations-ui/operations-input-field';
import { OperationsSubmitButton } from '@/app/(operations)/components/operations-ui/operations-submit-button';
import { useTxStatus } from '@/hooks/use-tx-status';
import { OperationInfoBox } from '@/app/(operations)/components/operations-ui/operation-info-box';
import { useTransaction } from '@useelven/core';

const dnsScAddressForHerotag = (herotag: string) => {
  const hashedHerotagBuffer = keccak256.arrayBuffer(herotag);
  const hashedHerotag = new Uint8Array(hashedHerotagBuffer);
  const initialAddress = new Uint8Array(32).fill(1);
  const initialAddressSlice = initialAddress.slice(0, 30);
  const scIdByte = hashedHerotag[31];
  const deployer_pubkey = new Uint8Array(32);
  deployer_pubkey.set(initialAddressSlice, 0);
  deployer_pubkey[30] = 0;
  deployer_pubkey[31] = scIdByte;
  const scAddress = SmartContract.computeAddress(
    new Address(deployer_pubkey),
    0
  );
  return scAddress;
};

const formSchema = z.object({
  herotag: z.string().refine((value) => {
    return (
      value &&
      value.length < 25 &&
      value.length > 3 &&
      new RegExp(/^[a-z0-9]+$/).test(value)
    );
  }, 'Length between 3 and 25 characters and Lowercase alphanumeric characters only.'),
});

export const Herotag = () => {
  const { triggerTx, error, txResult, transaction, pending } = useTransaction();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      herotag: '',
    },
  });

  useTxStatus({
    successHash: txResult?.hash,
    pendingHash: transaction?.getHash()?.toString(),
    error,
    pending,
  });

  const onSubmit = async ({ herotag }: z.infer<typeof formSchema>) => {
    // TODO: the suffix will probably change in the future dns sc releases
    const fullHerotag = `${herotag.trim()}.elrond`;
    const dnsScAddress = dnsScAddressForHerotag(fullHerotag);

    const args: TypedValue[] = [BytesValue.fromUTF8(fullHerotag)];

    // TODO: use modern tools for contract calls
    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('register'))
      .setArgs(args)
      .build();

    triggerTx?.({
      address: dnsScAddress.bech32(),
      gasLimit: 50000 + 1500 * data.length() + 20000000,
      data,
      value: 0,
    });
  };

  return (
    <>
      <OperationInfoBox error={error} txResult={txResult} />
      <Form {...form}>
        <form
          id="herotag-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex-1 overflow-auto p-1">
            <OperationsInputField
              name="herotag"
              label="Herotag username"
              placeholder="Example: mycoolusername"
              description="Please provide the herotag name"
            />
          </div>
          <OperationsSubmitButton />
        </form>
      </Form>
    </>
  );
};
