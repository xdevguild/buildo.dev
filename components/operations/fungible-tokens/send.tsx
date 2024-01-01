import * as z from 'zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TokenTransfer } from '@multiversx/sdk-core';
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
import BigNumber from 'bignumber.js';
import { ScTokenTransferType, useConfig } from '@useelven/core';
import { transfersOperationsGasLimit } from '@/components/operations/constants';
import { OperationsTokenIdAmountInput } from '../operations-tokenid-amount-input';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  address: z.string().min(1, 'The field is required'),
  amount: z
    .string()
    .refine(
      (value) => !new BigNumber(value).isNaN(),
      'Required BigNumber string.'
    ),
});

export const Send = ({ transfer, close }: OperationContentProps) => {
  const { setOpen: setTxStatusDialogOpen } = useContext(
    OperationsStateDialogContext
  );
  const { apiAddress } = useConfig();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      address: '',
      amount: '',
    },
  });

  const onSubmit = async ({
    tokenId,
    address,
    amount,
  }: z.infer<typeof formSchema>) => {
    try {
      // TODO: replace with useElven useApiCall when ready to handle such cases
      const esdtOnNetwork = await axios.get<{ decimals: number }>(
        `${apiAddress}/tokens/${tokenId.trim()}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      const decimals = esdtOnNetwork?.data?.decimals;

      // TODO: show the error in the transaction status modal
      if (!decimals) {
        console.error(
          "Can't read the decimal numbers of the token using MultiversX API!"
        );
        return;
      }

      transfer?.({
        type: ScTokenTransferType.ESDTTransfer,
        tokenId: tokenId.trim(),
        address: address.trim(),
        amount: TokenTransfer.fungibleFromAmount(
          tokenId.trim(),
          amount.trim(),
          decimals
        ).toString(),
        gasLimit: transfersOperationsGasLimit,
        value: 0,
      });

      setTxStatusDialogOpen(true);
      form.reset();
      close();
    } catch (e) {
      console.error(
        "Can't read the decimal numbers of the token using MultiversX API!",
        e
      );
    }
  };

  return (
    <>
      <DialogHeader className="p-8 pb-0">
        <DialogTitle>Transfer an amount of your fungible ESDT</DialogTitle>
        <DialogDescription>
          Performing an ESDT transfer is done by sending a transaction directly
          to the desired receiver Account, but specifying some extra pieces of
          information in its Data field.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto py-0 px-8">
        <Form {...form}>
          <form
            id="send-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex-1 overflow-auto p-1">
              <OperationsTokenIdAmountInput
                tokenType="fungible"
                onlyOwner={false}
              />
              <OperationsInputField
                name="address"
                label="Address"
                placeholder="Example: erd1..."
                description="Please provide the address to where the amount will be send"
              />
              <OperationsInputField
                name="amount"
                label="Amount"
                placeholder="Example: 22.5"
                description="Please provide the amount of ESDT to send (ex. 22.5 is 22.5 amount of an ESDT token. Don't worry about the decimal places here)."
              />
            </div>
          </form>
        </Form>
      </div>
      <DialogFooter className="py-4 px-8">
        <OperationsSubmitButton formId="send-form" />
      </DialogFooter>
    </>
  );
};
