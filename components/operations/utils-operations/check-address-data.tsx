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
import axios, { AxiosError } from 'axios';
import { useConfig } from '@useelven/core';

const formSchema = z.object({
  addressOrHerotag: z.string().min(1, 'The field is required'),
});

export const CheckAddressData = () => {
  const [result, setResult] = useState<string>();
  const [pending, setPending] = useState(false);
  const { apiAddress } = useConfig();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addressOrHerotag: '',
    },
  });

  const onSubmit = async ({ addressOrHerotag }: z.infer<typeof formSchema>) => {
    const endpointFragment = !addressOrHerotag.startsWith('erd')
      ? 'usernames'
      : 'accounts';

    try {
      // TODO: replace with useElven useApiCall when ready to handle such cases
      setPending(true);
      const result = await axios.get(
        `${apiAddress}/${endpointFragment}/${addressOrHerotag.trim()}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      setResult(JSON.stringify(result?.data || {}, null, 2));
    } catch (e: unknown) {
      const error = e as AxiosError<{ message: string }>;
      setResult(error?.response?.data?.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <DialogHeader className="p-8 pb-0">
        <DialogTitle>Check address data</DialogTitle>
        <DialogDescription>
          Check basic address data (also using a herotag). It can also be a
          smart contract address. Useful because Explorer API has agressive
          cache in some cases.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto py-0 px-8">
        <Form {...form}>
          <form
            id="check-address-data-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex-1 overflow-auto p-1">
              <OperationsInputField
                name="addressOrHerotag"
                label="Wallet address or herotag"
                placeholder="Example: erd1.... or <herotag_name>"
                description="Please provide a wallet address to check. You can also use a herotag or you can check a smart contract address."
              />
            </div>
          </form>
        </Form>
        {result && (
          <Alert className="w-full overflow-y-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>The address data:</AlertTitle>
            <AlertDescription className="mt-3 w-full">
              <pre>
                <code>{result}</code>
              </pre>
            </AlertDescription>
          </Alert>
        )}
      </div>
      <DialogFooter className="py-4 px-8">
        <OperationsSubmitButton
          formId="check-address-data-form"
          pending={pending}
          isPublic
        />
      </DialogFooter>
    </>
  );
};
