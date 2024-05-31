'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { OperationsInputField } from '@/app/(operations)/components/operations-ui/operations-input-field';
import { OperationsSubmitButton } from '@/app/(operations)/components/operations-ui/operations-submit-button';
import { useState } from 'react';
import BigNumber from 'bignumber.js';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TransactionDecoder } from '@multiversx/sdk-transaction-decoder/lib/src/transaction.decoder.js';
import { AlertCircle } from 'lucide-react';

const formSchema = z.object({
  senderAddress: z.string().min(1, 'The field is required'),
  receiverAddress: z.string().min(1, 'The field is required'),
  dataString: z.string().min(1, 'The field is required'),
  value: z
    .string()
    .refine(
      (value) => !new BigNumber(value).isNaN(),
      'Required BigNumber string.'
    ),
});

export const DecodeTransaction = () => {
  const [result, setResult] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      senderAddress: '',
      receiverAddress: '',
      dataString: '',
      value: '0',
    },
  });

  const onSubmit = async ({
    senderAddress,
    receiverAddress,
    dataString,
    value,
  }: z.infer<typeof formSchema>) => {
    const transactionDecoder = new TransactionDecoder();

    const isBase64Encoded =
      Buffer.from(dataString, 'base64').toString('base64') === dataString;

    const decoded = transactionDecoder.getTransactionMetadata({
      sender: senderAddress,
      receiver: receiverAddress,
      data: isBase64Encoded
        ? dataString
        : Buffer.from(dataString).toString('base64'),
      value,
    });

    setResult(
      JSON.stringify(
        decoded,
        (_, value) => (typeof value === 'bigint' ? value.toString() : value),
        2
      )
    );
  };

  return (
    <>
      <Form {...form}>
        <form
          id="decode-transaction-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex-1 overflow-auto p-1">
            <OperationsInputField
              name="senderAddress"
              label="Sender address"
              placeholder="Example: erd1..."
              description="Please provide the sender address in the transaction"
            />
            <OperationsInputField
              name="receiverAddress"
              label="Receiver address"
              placeholder="Example: erd1..."
              description="Please provide the receiver address. (The same as sender in case of all ESDT tokens (including SFTs and NFTs))"
            />
            <OperationsInputField
              name="dataString"
              label="Transaction data string"
              placeholder="Example: <base64 encoded data string>"
              type="textarea"
              description="Please provide the data string in base64 encoded form (or not encoded)"
            />
            <OperationsInputField
              name="value"
              label="Value"
              placeholder="Example: 10"
              description="Please provide the value for the transaction (only for EGLD transactions, otherwise leave 0)"
            />
          </div>
          <OperationsSubmitButton isPublic />
        </form>
      </Form>
      {result && (
        <Alert className="mt-6 break-words">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>The result of the data conversion:</AlertTitle>
          <AlertDescription className="mt-3">{result}</AlertDescription>
        </Alert>
      )}
    </>
  );
};
