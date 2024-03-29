import * as z from 'zod';
import {
  BytesValue,
  TypedValue,
  ContractCallPayloadBuilder,
  ContractFunction,
} from '@multiversx/sdk-core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  commonOpertationsGasLimit,
  builtInSC,
} from '@/components/operations/constants';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { CommonOpertationContentProps } from '@/components/operations/operations-common-types';
import { OperationsTokenIdInput } from '../operations-tokenid-input';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required!'),
});

export const StopCreation = ({
  triggerTx,
  close,
  tokenType,
}: CommonOpertationContentProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
    },
  });

  const onSubmit = ({ tokenId }: z.infer<typeof formSchema>) => {
    const args: TypedValue[] = [BytesValue.fromUTF8(tokenId.trim())];

    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('stopNFTCreate'))
      .setArgs(args)
      .build();

    triggerTx?.({
      address: builtInSC,
      gasLimit: commonOpertationsGasLimit,
      data,
      value: 0,
    });

    form.reset();
    close();
  };

  return (
    <>
      <DialogHeader className="p-8 pb-0">
        <DialogTitle>Stop creation</DialogTitle>
        <DialogDescription>
          The ESDT manager can stop the creation of the token for the given ESDT
          forever by removing the only ESDTRoleNFTCreate role available.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto px-8 py-0">
        <Form {...form}>
          <form
            id="stop-creation-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex-1 overflow-auto p-1">
              <OperationsTokenIdInput tokenType={tokenType} />
            </div>
          </form>
        </Form>
      </div>
      <DialogFooter className="px-8 py-4">
        <OperationsSubmitButton formId="stop-creation-form" />
      </DialogFooter>
    </>
  );
};
