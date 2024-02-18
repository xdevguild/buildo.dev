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
  builtInSC,
  commonOpertationsGasLimit,
} from '@/components/operations/constants';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { useContext, useMemo } from 'react';
import { OperationsStateDialogContext } from '@/components/operations/operations-status-dialog';
import { OperationContentProps } from '@/components/operations/operations-common-types';
import { OperationsRadioGroup } from '@/components/operations/operations-radio-group';
import { OperationsSelectField } from '@/components/operations/operations-select-field';
import { useCreatorTokensAmount } from '@/hooks/use-creator-tokens-amount';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  type: z.enum(['pause', 'unPause'], {
    required_error: 'Please choose the type of the operation (pause/unPause)',
  }),
});

export const PauseUnpause = ({ triggerTx, close }: OperationContentProps) => {
  const { setOpen: setTxStatusDialogOpen } = useContext(
    OperationsStateDialogContext
  );

  const { tokens } = useCreatorTokensAmount<{
    identifier: string;
    collection: string;
    isPaused: boolean;
  }>({
    tokenType: 'fungible',
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      type: 'pause',
    },
  });

  const getTokens = useMemo(() => {
    if (form.getValues('type') === 'pause') {
      return tokens?.filter((token) => !token.isPaused);
    }
    return tokens?.filter((token) => token.isPaused);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens]);

  const onSubmit = ({ tokenId, type }: z.infer<typeof formSchema>) => {
    const args: TypedValue[] = [BytesValue.fromUTF8(tokenId.trim())];

    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction(type))
      .setArgs(args)
      .build();

    triggerTx?.({
      address: builtInSC,
      gasLimit: commonOpertationsGasLimit,
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
        <DialogTitle>Pause/Unpause transactions of a fungible ESDT</DialogTitle>
        <DialogDescription>
          The manager of an ESDT token may choose to suspend all transactions of
          the token, except minting, freezing/unfreezing and wiping. These two
          operations require that the option canPause is set to true.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto py-0 px-8">
        <Form {...form}>
          <form
            id="pause-unpause-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex-1 overflow-auto p-1">
              <OperationsRadioGroup
                items={[
                  { name: 'pause', description: 'Pause transactions' },
                  { name: 'unPause', description: 'Unpause transactions' },
                ]}
                name="type"
                label="Operation type"
                description="Please choose the type of the operation. Pause or Unpause."
              />
              <OperationsSelectField
                name="tokenId"
                label="Token id"
                description="Please provide your token id"
                options={
                  getTokens
                    ? getTokens?.map((token) => ({
                        value: token.identifier,
                        label: token.identifier,
                      }))
                    : []
                }
              />
            </div>
          </form>
        </Form>
      </div>
      <DialogFooter className="py-4 px-8">
        <OperationsSubmitButton formId="pause-unpause-form" />
      </DialogFooter>
    </>
  );
};
