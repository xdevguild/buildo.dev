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
import BigNumber from 'bignumber.js';
import { MultiTransferToken, ESDTType } from '@useelven/core';

const formSchema = z
  .object({
    fungibleTokenId: z.string(),
    fungibleAmount: z
      .string()
      .refine(
        (value) => value === '' || !new BigNumber(value).isNaN(),
        'Please provide a number, should be a proper Fungible ESDT amount for that specific token, bigger than 0.'
      ),
    nonFungibleTokenId: z.string(),
    nonFungibleAmount: z
      .string()
      .refine(
        (value) => value === '' || value === '1',
        'Please provide a number, should be a proper Non-fungible ESDT amount. 1 in case of NFTs.'
      ),
    semiFungibleTokenId: z.string(),
    semiFungibleAmount: z.string().refine((value) => {
      const num = new BigNumber(value);
      return num.isInteger() && num.isGreaterThan(0);
    }, 'Please provide an integer number, should be a proper SFT amount for that specific token, bigger than 0.'),
    metaTokenId: z.string(),
    metaAmount: z
      .string()
      .refine(
        (value) => value === '' || !new BigNumber(value).isNaN(),
        'Please provide a number, should be a proper Meta ESDT amount for that specific token, bigger than 0'
      ),
    receiverAddress: z.string().min(1, 'The field is required'),
  })
  .superRefine(
    (
      {
        fungibleTokenId,
        fungibleAmount,
        nonFungibleTokenId,
        nonFungibleAmount,
        semiFungibleTokenId,
        semiFungibleAmount,
        metaTokenId,
        metaAmount,
      },
      ctx
    ) => {
      if (
        (fungibleTokenId && !fungibleAmount) ||
        (fungibleAmount && !fungibleTokenId)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [
            fungibleTokenId && !fungibleAmount
              ? 'fungibleAmount'
              : 'fungibleTokenId',
          ],
          message:
            'You need to leave both fungible tokens fields empty or fill it up!',
        });
      }
      if (
        (nonFungibleTokenId && !nonFungibleAmount) ||
        (nonFungibleAmount && !nonFungibleTokenId)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [
            nonFungibleTokenId && !nonFungibleAmount
              ? 'nonFungibleAmount'
              : 'nonFungibleTokenId',
          ],
          message:
            'You need to leave both non-fungible tokens fields empty or fill it up!',
        });
      }
      if (
        (semiFungibleTokenId && !semiFungibleAmount) ||
        (semiFungibleAmount && !semiFungibleTokenId)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [
            semiFungibleTokenId && !semiFungibleAmount
              ? 'semiFungibleAmount'
              : 'semiFungibleTokenId',
          ],
          message:
            'You need to leave both semi-fungible tokens fields empty or fill it up!',
        });
      }
      if ((metaTokenId && !metaAmount) || (metaAmount && !metaTokenId)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [metaTokenId && !metaAmount ? 'metaAmount' : 'metaTokenId'],
          message:
            'You need to leave both meta tokens fields empty or fill it up!',
        });
      }
      if (
        !fungibleAmount &&
        !fungibleTokenId &&
        !nonFungibleAmount &&
        !nonFungibleTokenId &&
        !semiFungibleAmount &&
        !semiFungibleTokenId &&
        !metaAmount &&
        !metaTokenId
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['fungibleTokenId'],
          message: 'You need to provide at least one token!',
        });
      }
    }
  );

export const MultiTransfer = ({
  multiTransfer,
  close,
}: OperationContentProps) => {
  const { setOpen: setTxStatusDialogOpen } = useContext(
    OperationsStateDialogContext
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fungibleTokenId: '',
      fungibleAmount: '',
      nonFungibleTokenId: '',
      nonFungibleAmount: '',
      semiFungibleTokenId: '',
      semiFungibleAmount: '',
      metaTokenId: '',
      metaAmount: '',
      receiverAddress: '',
    },
  });

  const onSubmit = async ({
    fungibleTokenId,
    fungibleAmount,
    nonFungibleTokenId,
    nonFungibleAmount,
    semiFungibleTokenId,
    semiFungibleAmount,
    metaTokenId,
    metaAmount,
    receiverAddress,
  }: z.infer<typeof formSchema>) => {
    const tokens: MultiTransferToken[] = [];

    if (fungibleTokenId && fungibleAmount) {
      tokens.push({
        type: ESDTType.FungibleESDT,
        amount: fungibleAmount,
        tokenId: fungibleTokenId,
      });
    }

    if (nonFungibleTokenId && nonFungibleAmount) {
      tokens.push({
        type: ESDTType.NonFungibleESDT,
        amount: nonFungibleAmount,
        tokenId: nonFungibleTokenId,
      });
    }

    if (semiFungibleTokenId && semiFungibleAmount) {
      tokens.push({
        type: ESDTType.SemiFungibleESDT,
        amount: semiFungibleAmount,
        tokenId: semiFungibleTokenId,
      });
    }

    if (metaTokenId && metaAmount) {
      tokens.push({
        type: ESDTType.MetaESDT,
        amount: metaAmount,
        tokenId: metaTokenId,
      });
    }

    if (multiTransfer) {
      multiTransfer({ tokens, receiver: receiverAddress });

      setTxStatusDialogOpen(true);
      form.reset();
      close();
    }
  };

  return (
    <>
      <DialogHeader className="p-8 pb-0">
        <DialogTitle>Transfer multiple types of ESDT</DialogTitle>
        <DialogDescription>
          Perform multiple tokens transfers in a single bulk. This way, one can
          send (to a single receiver) multiple fungible, semi-fungible,
          non-fungible or meta tokens via a single transaction.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto py-0 px-8">
        <Form {...form}>
          <form
            id="multi-send-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex-1 overflow-auto p-1">
              <OperationsInputField
                name="receiverAddress"
                label="Receiver address"
                placeholder="Example: erd1..."
                description="Please provide the address to where tokens will be send"
              />
              <div className="text-md mt-3 mb-2 font-bold">Fungible</div>
              <div className="flex gap-3 flex-col sm:flex-row">
                <div className="flex-1">
                  <OperationsInputField
                    name="fungibleTokenId"
                    label="Token id"
                    placeholder="Example: MyToken-23432"
                  />
                </div>
                <div className="flex-1">
                  <OperationsInputField
                    name="fungibleAmount"
                    label="Amount"
                    placeholder="Example: 0.5"
                  />
                </div>
              </div>
              <div className="text-md mt-3 mb-2 font-bold">Non-fungible</div>
              <div className="flex gap-3 flex-col sm:flex-row">
                <div className="flex-1">
                  <OperationsInputField
                    name="nonFungibleTokenId"
                    label="Token id"
                    placeholder="Example: MyToken-23432-01"
                  />
                </div>
                <div className="flex-1">
                  <OperationsInputField
                    name="nonFungibleAmount"
                    label="Amount"
                    placeholder="Should be 1 in this case"
                  />
                </div>
              </div>
              <div className="text-md mt-3 mb-2 font-bold">Semi-fungible</div>
              <div className="flex gap-3 flex-col sm:flex-row">
                <div className="flex-1">
                  <OperationsInputField
                    name="semiFungibleTokenId"
                    label="Token id"
                    placeholder="Example: MyToken-23432-01"
                  />
                </div>
                <div className="flex-1">
                  <OperationsInputField
                    name="semiFungibleAmount"
                    label="Amount"
                    placeholder="Example: 3"
                  />
                </div>
              </div>
              <div className="text-md mt-3 mb-2 font-bold">Meta</div>
              <div className="flex gap-3 flex-col sm:flex-row">
                <div className="flex-1">
                  <OperationsInputField
                    name="metaTokenId"
                    label="Token id"
                    placeholder="Example: MyToken-23432-01"
                  />
                </div>
                <div className="flex-1">
                  <OperationsInputField
                    name="metaAmount"
                    label="Amount"
                    placeholder="Example: 1.5"
                  />
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
      <DialogFooter className="py-4 px-8">
        <OperationsSubmitButton formId="multi-send-form" />
      </DialogFooter>
    </>
  );
};
