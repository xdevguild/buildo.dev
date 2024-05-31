'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { OperationsInputField } from '@/app/(operations)/components/operations-ui/operations-input-field';
import { OperationsSubmitButton } from '@/app/(operations)/components/operations-ui/operations-submit-button';
import { useSignMessage } from '@useelven/core';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { usePersistStorage } from '@/hooks/use-form-storage';
import { OperationInfoBox } from '@/app/(operations)/components/operations-ui/operation-info-box';

const formSchema = z.object({
  message: z.string().min(1, 'The field is required'),
});

export const SignMessage = () => {
  const { signMessage, signature, error } = useSignMessage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  const { setItem } = usePersistStorage({
    update: (message: string) => {
      form.setValue('message', message);
    },
    storageItem: 'general-signMessage-message',
  });

  const onSubmit = async ({ message }: z.infer<typeof formSchema>) => {
    setItem(message);
    signMessage({
      message,
    });
  };

  return (
    <>
      <OperationInfoBox error={error} />
      {signature && (
        <Alert className="mt-4 break-words">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>The signature:</AlertTitle>
          <AlertDescription className="mt-3 font-bold">
            {signature}
          </AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form
          id="sign-message-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex-1 overflow-auto p-1">
            <OperationsInputField
              name="message"
              label="Message"
              type="textarea"
              placeholder="Example: <Your custom message...>"
              description="Please provide the message to sign"
            />
          </div>
          <OperationsSubmitButton />
        </form>
      </Form>
    </>
  );
};
