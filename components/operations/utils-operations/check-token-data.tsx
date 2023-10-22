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
import { OperationsRadioGroup } from '@/components/operations/operations-radio-group';
import axios, { AxiosError } from 'axios';
import { useConfig } from '@useelven/core';

const tokenTypes: { name: string; description: string }[] = [
  {
    name: 'fungible',
    description: 'Fungible ESDT',
  },
  {
    name: 'non-fungible',
    description: 'Non-fungible (NFT)',
  },
  {
    name: 'semi-fungible',
    description: 'Semi-fungible (SFT)',
  },
  {
    name: 'meta',
    description: 'Meta ESDT',
  },
];

const formSchema = z.object({
  tokenId: z.string().min(1, 'The field is required'),
  tokenType: z.enum(['fungible', 'non-fungible', 'semi-fungible', 'meta'], {
    required_error: 'Please choose the type of the token',
  }),
});

export const CheckTokenData = () => {
  const [result, setResult] = useState<string>();
  const [pending, setPending] = useState(false);
  const { apiAddress } = useConfig();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenId: '',
      tokenType: 'fungible',
    },
  });

  const onSubmit = async ({
    tokenId,
    tokenType,
  }: z.infer<typeof formSchema>) => {
    let endpointFragment;

    if (tokenType === 'fungible') {
      endpointFragment = 'tokens';
    } else {
      endpointFragment = 'collections';
    }

    try {
      // TODO: replace with useElven useApiCall when ready to handle such cases
      setPending(true);
      const result = await axios.get(
        `${apiAddress}/${endpointFragment}/${tokenId.trim()}`,
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
        <DialogTitle>Check token data</DialogTitle>
        <DialogDescription>
          Check basic token data. It can be a standard fungible token or
          collection id for NFT/SFT/Meta tokens. Useful because Explorer API has
          strict cache in some cases.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto py-0 px-8">
        <Form {...form}>
          <form
            id="check-token-data-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex-1 overflow-auto p-1">
              <OperationsRadioGroup
                items={tokenTypes}
                name="tokenType"
                label="Token type"
                description="Please choose the type of the token to check."
              />
              <OperationsInputField
                name="tokenId"
                label="Token id"
                placeholder="Example: MyToken-23432"
                description="Please provide your token id. Fungible or collection id."
              />
            </div>
          </form>
        </Form>
        {result && (
          <Alert className="w-full overflow-y-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>The token data:</AlertTitle>
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
          formId="check-token-data-form"
          pending={pending}
        />
      </DialogFooter>
    </>
  );
};
