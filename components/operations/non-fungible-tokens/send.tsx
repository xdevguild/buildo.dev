import * as z from 'zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
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
import { ScTokenTransferType, useConfig } from '@useelven/core';
import { transfersOperationsGasLimit } from '@/components/operations/constants';

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  address: z.string().min(1, 'The field is required'),
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
    },
  });

  const onSubmit = async ({ tokenId, address }: z.infer<typeof formSchema>) => {
    try {
      // TODO: replace with useElven useApiCall when ready to handle such cases
      const nftOnNetwork = await axios.get<{ nonce: number; ticker: string }>(
        `${apiAddress}/nfts/${tokenId.trim()}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      const nonce = nftOnNetwork?.data?.nonce;
      const collectionTicker = nftOnNetwork?.data?.ticker;

      // TODO: show the error in the transaction status modal
      if (!nonce || !collectionTicker) {
        console.error(
          "Can't read the nonce or/and collection ticker of the token, using MultiversX API!"
        );
        return;
      }

      transfer?.({
        type: ScTokenTransferType.ESDTNFTTransfer,
        tokenId: collectionTicker,
        address: address.trim(),
        amount: '1',
        gasLimit: transfersOperationsGasLimit,
        nonce,
      });

      setTxStatusDialogOpen(true);
      form.reset();
      close();
    } catch (e) {
      console.error(
        "Can't read the nonce or/and collection ticker of the token, using MultiversX API!",
        e
      );
    }
  };

  return (
    <>
      <DialogHeader className="p-8 pb-0">
        <DialogTitle>Transfer a non-fungible ESDT</DialogTitle>
        <DialogDescription>
          Performing an ESDT NFT transfer is done by specifying the receiver
          {"'"}s address inside the Data field, alongside other details
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
              <OperationsInputField
                name="tokenId"
                label="Token id"
                placeholder="Example: MyToken-23432-01"
                description="Please provide your token id"
              />
              <OperationsInputField
                name="address"
                label="Address"
                placeholder="Example: erd1..."
                description="Please provide the address to where the token will be sent"
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
