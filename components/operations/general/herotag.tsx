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

const dnsScAddressForHerotag = (herotag: string) => {
  const hashedHerotag = keccak('keccak256').update(herotag).digest();

  const initialAddress = Buffer.from(Array(32).fill(1));
  const initialAddressSlice = initialAddress.slice(0, 30);
  const scId = hashedHerotag.slice(31);

  const deployer_pubkey = Buffer.concat([
    initialAddressSlice,
    Buffer.from([0, scId.readUIntBE(0, 1)]),
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

export const Herotag = ({ triggerTx, close }: OperationContentProps) => {
  const { setOpen: setTxStatusDialogOpen } = useContext(
    OperationsStateDialogContext
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      herotag: '',
    },
  });

  const onSubmit = async ({ herotag }: z.infer<typeof formSchema>) => {
    const dnsScAddress = dnsScAddressForHerotag(`${herotag.trim()}.elrond`);

    const args: TypedValue[] = [
      BytesValue.fromUTF8(`${herotag.trim()}.elrond`),
    ];

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

    setTxStatusDialogOpen(true);
    form.reset();
    close();
  };

  return (
    <>
      <DialogHeader className="p-8 pb-0">
        <DialogTitle>Assign a herotag to your wallet address</DialogTitle>
        <DialogDescription>
          The herotag is a unique username you can assign to your wallet
          address. Just to let you know, in this case, transaction fees will be
          applied.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto px-8 py-0">
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
          </form>
        </Form>
      </div>
      <DialogFooter className="px-8 py-4">
        <OperationsSubmitButton formId="herotag-form" />
      </DialogFooter>
    </>
  );
};
