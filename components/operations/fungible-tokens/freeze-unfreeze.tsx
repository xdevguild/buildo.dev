import * as z from 'zod';
import {
  BytesValue,
  TypedValue,
  ContractCallPayloadBuilder,
  ContractFunction,
  AddressValue,
  Address,
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
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsSubmitButton } from '../operations-submit-button';
import { useContext } from 'react';
import { OperationsStateDialogContext } from '@/components/operations/operations-status-dialog';
import { OperationContentProps } from '@/components/operations/operations-common-types';
import { OperationsRadioGroup } from '../operations-radio-group';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  address: z.string().min(1, 'The field is required'),
  type: z.enum(['freeze', 'unFreeze'], {
    required_error:
      'Please choose the type of the operation (freeze/unFreeze token balance in a specific account)',
  }),
});

export const FreezeUnfreeze = ({ triggerTx, close }: OperationContentProps) => {
  const { setOpen: setTxStatusDialogOpen } = useContext(
    OperationsStateDialogContext
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      address: '',
      type: 'freeze',
    },
  });

  const onSubmit = ({ tokenId, address, type }: z.infer<typeof formSchema>) => {
    const args: TypedValue[] = [
      BytesValue.fromUTF8(tokenId.trim()),
      new AddressValue(new Address(address.trim())),
    ];

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
        <DialogTitle>
          Freeze/Unfreeze fungible ESDT balance in a specific account
        </DialogTitle>
        <DialogDescription>
          The manager of an ESDT token may freeze the tokens held by a specific
          Account. As a consequence, no tokens may be transferred to or from the
          frozen Account. Freezing and unfreezing the tokens of an Account are
          operations designed to help token managers to comply with regulations.
          These two operations require that the property canFreeze is set to
          true.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto py-0 px-8">
        <Form {...form}>
          <form
            id="freeze-unfreeze-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex-1 overflow-auto p-1">
              <OperationsRadioGroup
                items={[
                  { name: 'freeze', description: 'Freeze token balance' },
                  { name: 'unFreeze', description: 'Unfreeze token balance' },
                ]}
                name="type"
                label="Operation type"
                description="Please choose the type of the operation. Freeze or Unfreeze."
              />
              <OperationsInputField
                name="tokenId"
                label="Token id"
                placeholder="Example: MyToken-23432"
                description="Please provide your token id"
              />
              <OperationsInputField
                name="address"
                label="Address"
                placeholder="Example: erd1..."
                description="Please provide the address for which the the token balance will be frozen"
              />
            </div>
          </form>
        </Form>
      </div>
      <DialogFooter className="py-4 px-8">
        <OperationsSubmitButton formId="freeze-unfreeze-form" />
      </DialogFooter>
    </>
  );
};
