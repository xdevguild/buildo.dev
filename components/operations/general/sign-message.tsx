import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useSignMessage } from '@useelven/core';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const formSchema = z.object({
  message: z.string().min(1, 'The field is required'),
});

export const SignMessage = () => {
  const { signMessage, pending, signature } = useSignMessage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = async ({ message }: z.infer<typeof formSchema>) => {
    signMessage({ message });
  };

  return (
    <>
      <DialogHeader className="p-8 pb-0">
        <DialogTitle>Sign a message</DialogTitle>
        <DialogDescription>
          You can sign any message using your wallet address as a key. You can
          also verify signed messages. Check the Utilities section.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto py-0 px-8">
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
          </form>
        </Form>
        {signature && (
          <Alert className="break-words">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>The signature:</AlertTitle>
            <AlertDescription className="mt-3 font-bold">
              {signature}
            </AlertDescription>
          </Alert>
        )}
      </div>
      <DialogFooter className="py-4 px-8">
        <OperationsSubmitButton formId="sign-message-form" pending={pending} />
      </DialogFooter>
    </>
  );
};
