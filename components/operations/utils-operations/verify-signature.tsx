import { Address, SignableMessage } from '@multiversx/sdk-core';
import { UserVerifier } from '@multiversx/sdk-wallet/out/userVerifier';
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
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const formSchema = z.object({
  message: z.string(),
  address: z.string(),
  signature: z.string(),
});

export const VerifySignature = () => {
  const [verified, setVerified] = useState<boolean>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
      address: '',
      signature: '',
    },
  });

  const onSubmit = async ({
    message,
    address,
    signature,
  }: z.infer<typeof formSchema>) => {
    try {
      const verifier = UserVerifier.fromAddress(new Address(address));
      const signableMessage = new SignableMessage({
        message: Buffer.from(message),
      });
      const serializedMessage = signableMessage.serializeForSigning();
      const messageSignature = Buffer.from(signature, 'hex');

      const verified = verifier.verify(serializedMessage, messageSignature);

      setVerified(verified);
    } catch (e) {
      form.setError('address', {
        type: 'custom',
        message: (e as Error).message,
      });
    }
  };

  return (
    <>
      <DialogHeader className="p-8 pb-0">
        <DialogTitle>Verify signature</DialogTitle>
        <DialogDescription>
          Verify the signature of a previously signed message. You need to
          provide the message, signature, and address with which you signed the
          message.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto px-8 py-0">
        <Form {...form}>
          <form
            id="verify-signature-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex-1 overflow-auto p-1">
              <OperationsInputField
                name="message"
                type="textarea"
                label="Message"
                placeholder="Example: My previously signed message!"
                description="Please provide the message"
              />
              <OperationsInputField
                name="address"
                label="Address"
                placeholder="Example: erd1....."
                description="Please provide the address"
              />
              <OperationsInputField
                name="signature"
                type="textarea"
                label="Signature"
                placeholder="Example: <signature_hash>"
                description="Please provide the signature"
              />
            </div>
          </form>
        </Form>
        {verified !== undefined && (
          <Alert className="break-words">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>The result:</AlertTitle>
            <AlertDescription className="mt-3 font-bold">
              {!verified ? (
                <span className="text-destructive">
                  Signature is not valid!
                </span>
              ) : (
                <span className="text-green-700">Signature is valid</span>
              )}
            </AlertDescription>
          </Alert>
        )}
      </div>
      <DialogFooter className="px-8 py-4">
        <OperationsSubmitButton formId="verify-signature-form" isPublic />
      </DialogFooter>
    </>
  );
};
