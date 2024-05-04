'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import BigNumber from 'bignumber.js';
import { ESDTType, MultiTransferToken, useTokenTransfer } from '@useelven/core';
import { OperationInfoBox } from '@/components/operation-info-box';
import { useTxStatus } from '@/hooks/use-tx-status';

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
    semiFungibleAmount: z
      .string()
      .refine(
        (value) => value === '' || !new BigNumber(value).isNaN(),
        'Please provide an integer number, should be a proper SFT amount for that specific token, bigger than 0.'
      ),
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

export const MultiTransfer = () => {
  const { transfer, error, txResult, transaction, pending } =
    useTokenTransfer();

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

  useTxStatus({
    successHash: txResult?.hash,
    pendingHash: transaction?.getHash()?.toString(),
    error,
    pending,
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

    if (transfer) {
      transfer({ tokens, receiver: receiverAddress });

      form.reset();
    }
  };

  return (
    <>
      <OperationInfoBox error={error} txHash={txResult?.hash} />
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
            <div className="text-md mb-2 mt-3 font-bold">Fungible</div>
            <div className="flex flex-col gap-3 sm:flex-row">
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
            <div className="text-md mb-2 mt-3 font-bold">Non-fungible</div>
            <div className="flex flex-col gap-3 sm:flex-row">
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
            <div className="text-md mb-2 mt-3 font-bold">Semi-fungible</div>
            <div className="flex flex-col gap-3 sm:flex-row">
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
            <div className="text-md mb-2 mt-3 font-bold">Meta</div>
            <div className="flex flex-col gap-3 sm:flex-row">
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
            <OperationsSubmitButton />
          </div>
        </form>
      </Form>
    </>
  );
};
