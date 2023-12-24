'use client';

import { usePersistStorage } from '@/hooks/use-form-storage';
import sanitizeHtml from 'sanitize-html';
import { Sha256 } from '@aws-crypto/sha256-browser';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAccount, useLoginInfo, useSignMessage } from '@useelven/core';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';

const formSchema = z.object({
  inscription: z.string(),
});

export const Sign = ({
  setNextStep,
}: {
  setNextStep: (state: boolean) => void;
}) => {
  const { address } = useAccount();
  const { loginMethod } = useLoginInfo();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inscription: '',
    },
  });

  const { signMessage, signature, pending } = useSignMessage();

  const { setItem: saveInscription } = usePersistStorage({
    update: (inscription) => {
      form.setValue('inscription', inscription);
    },
    storageItem: 'general-createInscription-inscription',
    withCleanup: false,
  });

  const { setItem: savePayload } = usePersistStorage({
    storageItem: 'general-createInscription-partialPayload',
    withCleanup: false,
  });

  const { setItem: saveSignature } = usePersistStorage({
    storageItem: 'general-createInscription-signature',
    withCleanup: false,
  });

  const prepareData = async ({ inscription }: z.infer<typeof formSchema>) => {
    saveInscription(inscription);
    const sanitized = sanitizeHtml(
      inscription.replaceAll('\n', '').trim() || ''
    );

    try {
      JSON.parse(sanitized);
    } catch {
      form.setError('inscription', {
        message:
          "You've provided the wrong JSON format. Could you try again? Beside the structure remember about double quotes (also for keys) and no trailing coma.",
      });
      return;
    }

    const sanitizedBase64 = Buffer.from(sanitized).toString('base64');
    const hash = new Sha256();
    hash.update(sanitizedBase64);
    const shaValue = await hash.digest();
    const shaString = Buffer.from(shaValue.buffer).toString('hex');

    await signMessage({
      message: shaString,
      options: { callbackUrl: '/inscriptions/create' },
    });

    const payload = {
      identifier: shaString,
      data: sanitizedBase64,
      owner: address,
    };

    savePayload(payload);
  };

  useEffect(() => {
    if (signature) {
      saveSignature(signature);
      setNextStep(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);

  const getSigningProviderName = () => {
    if (loginMethod === 'walletconnect') {
      return 'xPortal';
    }
    return loginMethod;
  };

  return (
    <>
      <div className="mb-3 sm:px-8">
        {pending && (
          <div className="font-bold flex items-center gap-3">
            <Spinner size={20} /> Transaction pending (confirmation through{' '}
            {getSigningProviderName()})...
          </div>
        )}
      </div>
      <div className="overflow-y-auto py-0 px-0 sm:px-8">
        <Form {...form}>
          <form
            id="inscription-form"
            onSubmit={form.handleSubmit(prepareData)}
            className="space-y-8"
          >
            <div className="flex-1 overflow-auto p-1">
              <OperationsInputField
                name="inscription"
                label="Inscription data"
                type="textarea"
                rows={10}
                placeholder='Example: { "myKey1": "myValue1", "myKey2": "myValue2" }'
                description="You can paste JSON data that will be then encoded with base64. You will be signing a sha256 hash of your data."
              />
            </div>
          </form>
        </Form>
      </div>
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 py-4 px-8">
        <OperationsSubmitButton
          formId="inscription-form"
          label="Sign the data first!"
          disabled={Boolean(signature)}
          pending={pending}
        />
      </div>
    </>
  );
};
