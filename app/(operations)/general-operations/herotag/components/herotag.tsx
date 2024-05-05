'use client';

import keccak from 'keccak';
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
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { useTxStatus } from '@/hooks/use-tx-status';
import { OperationInfoBox } from '@/components/operation-info-box';
import { useTransaction } from '@useelven/core';

const dnsScAddressForHerotag = (herotag: string) => {
  const hashedHerotag = keccak('keccak256').update(herotag).digest();

  const initialAddress = Buffer.from(Array(32).fill(1));
  const initialAddressSlice = Uint8Array.prototype.slice.call(
    initialAddress,
    0,
    30
  );
  const scId = Uint8Array.prototype.slice.call(hashedHerotag, 31);

  const deployer_pubkey = Buffer.concat([
    initialAddressSlice,
    Buffer.from([0, Buffer.from(scId).readUIntBE(0, 1)]),
  ]);

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
    const dnsScAddress = dnsScAddressForHerotag(`${herotag.trim()}`);

    const args: TypedValue[] = [BytesValue.fromUTF8(`${herotag.trim()}`)];

    // TODO: use modern tools for contract calls
    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('SetUserName'))
      .setArgs(args)
      .build();

    triggerTx?.({
      address: dnsScAddress.bech32(),
      gasLimit: 50000 + 1500 * data.length() + 20000000,
      data,
      value: 0,
    });

    form.reset();
    close();
  };

  return (
    <>
      <OperationInfoBox error={error} txHash={txResult?.hash} />
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
