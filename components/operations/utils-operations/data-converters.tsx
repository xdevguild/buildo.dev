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
import { OperationsSelectField } from '@/components/operations/operations-select-field';
import BigNumber from 'bignumber.js';
import { Address, TokenTransfer } from '@multiversx/sdk-core';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const converterTypeName = [
  'BECH32_TO_HEX',
  'HEX_TO_BECH32',
  'DECIMAL_TO_HEXADECIMAL',
  'HEXADECIMAL_TO_DECIMAL',
  'DECIMAL_TO_BASE64',
  'BASE64_TO_DECIMAL',
  'AMOUNT_TO_DENOMINATED',
  'DENOMINATED_TO_AMOUNT',
  'STRING_TO_HEX',
  'HEX_TO_STRING',
  'STRING_TO_BASE64',
  'BASE64_TO_STRING',
  'HEX_STRING_TO_BASE64',
  'BASE64_STRING_TO_HEX_STRING',
] as const;

type ConverterTypeNames = (typeof converterTypeName)[number];

const converters: { label: string; value: ConverterTypeNames }[] = [
  {
    label: 'Convert from Bech32 address to Hex address',
    value: 'BECH32_TO_HEX',
  },
  {
    label: 'Convert from Hex address to Bech32 address',
    value: 'HEX_TO_BECH32',
  },
  {
    label: 'Convert decimal to hexadecimal',
    value: 'DECIMAL_TO_HEXADECIMAL',
  },
  {
    label: 'Convert hexadecimal to decimal',
    value: 'HEXADECIMAL_TO_DECIMAL',
  },
  {
    label: 'Convert decimal to base64',
    value: 'DECIMAL_TO_BASE64',
  },
  {
    label: 'Convert base64 to decimal',
    value: 'BASE64_TO_DECIMAL',
  },
  {
    label: 'Convert EGLD amount to denominated amount',
    value: 'AMOUNT_TO_DENOMINATED',
  },
  {
    label: 'Convert EGLD denominated amount to amount',
    value: 'DENOMINATED_TO_AMOUNT',
  },
  {
    label: 'Convert string to hexadecimal encoded string',
    value: 'STRING_TO_HEX',
  },
  {
    label: 'Convert hexadecimal encoded string to string',
    value: 'HEX_TO_STRING',
  },
  {
    label: 'Convert string to base64',
    value: 'STRING_TO_BASE64',
  },
  {
    label: 'Convert base64 encoded string to string',
    value: 'BASE64_TO_STRING',
  },
  {
    label: 'Convert hex string to base64',
    value: 'HEX_STRING_TO_BASE64',
  },
  {
    label: 'Convert base64 encoded string to hex encoded string',
    value: 'BASE64_STRING_TO_HEX_STRING',
  },
];

const formSchema = z.object({
  input: z.string().min(1, 'The field is required'),
  converter: z.enum(converterTypeName),
});

export const DataConverters = () => {
  const [result, setResult] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: '',
      converter: 'STRING_TO_HEX',
    },
  });

  const bech32ToHex = (inputValue: string) => {
    if (inputValue.length !== 62) {
      form.setError('input', {
        message: "You've provided wrong bech32, try again.",
      });
      return;
    }
    const account = Address.fromBech32(inputValue);
    setResult(`${account.hex()}`);
  };

  const hexToBech32 = (inputValue: string) => {
    if (inputValue.length !== 64) {
      form.setError('input', {
        message: "You've provided wrong hex address, try again.",
      });
      return;
    }
    const account = Address.fromHex(inputValue);
    setResult(`${account.bech32()}`);
  };

  const decimalToHex = (inputValue: string) => {
    const bigNumberVal = new BigNumber(inputValue, 10);
    let bigNumberString = bigNumberVal.toString(16);
    if (bigNumberString.length % 2 !== 0) {
      bigNumberString = `0${bigNumberString}`;
    }
    setResult(`${bigNumberString}`);
  };

  const hexToDecimal = (inputValue: string) => {
    const bigNumber = new BigNumber(inputValue, 16);
    setResult(`${bigNumber.toString(10)}`);
  };

  const decimalToBase64 = (inputValue: string) => {
    const buff = Buffer.from(inputValue, 'ascii');
    setResult(`${buff.toString('base64')}`);
  };

  const base64ToDecimal = (inputValue: string) => {
    const buff = Buffer.from(inputValue, 'base64');
    setResult(`${buff.toString('ascii')}`);
  };

  const amountToDenominated = (inputValue: string) => {
    const balance = TokenTransfer.egldFromAmount(inputValue);
    setResult(`${balance.toString()}`);
  };

  const denominatedToAmount = (inputValue: string) => {
    const balance = TokenTransfer.egldFromBigInteger(inputValue);
    setResult(`${balance.toPrettyString()}`);
  };

  const stringToHex = (inputValue: string) => {
    const hexString = Buffer.from(inputValue, 'ascii').toString('hex');
    setResult(`${hexString}`);
  };

  const hexToString = (inputValue: string) => {
    const stringValue = Buffer.from(inputValue, 'hex').toString('utf8');
    setResult(`${stringValue}`);
  };

  const stringToBase64 = (inputValue: string) => {
    const base64Value = Buffer.from(inputValue, 'ascii').toString('base64');
    setResult(`${base64Value}`);
  };

  const base64ToString = (inputValue: string) => {
    const stringValue = Buffer.from(inputValue, 'base64').toString('ascii');
    setResult(`${stringValue}`);
  };

  const hexToBase64 = (inputValue: string) => {
    const hexValue = Buffer.from(inputValue, 'hex');
    setResult(`${hexValue.toString('base64')}`);
  };

  const base64ToHex = (inputValue: string) => {
    const base64Value = Buffer.from(inputValue, 'base64');
    setResult(`${base64Value.toString('hex')}`);
  };

  const onSubmit = ({ converter, input }: z.infer<typeof formSchema>) => {
    switch (converter) {
      case 'BECH32_TO_HEX':
        bech32ToHex(input);
        break;
      case 'HEX_TO_BECH32':
        hexToBech32(input);
        break;
      case 'DECIMAL_TO_HEXADECIMAL':
        decimalToHex(input);
        break;
      case 'HEXADECIMAL_TO_DECIMAL':
        hexToDecimal(input);
        break;
      case 'DECIMAL_TO_BASE64':
        decimalToBase64(input);
        break;
      case 'BASE64_TO_DECIMAL':
        base64ToDecimal(input);
        break;
      case 'AMOUNT_TO_DENOMINATED':
        amountToDenominated(input);
        break;
      case 'DENOMINATED_TO_AMOUNT':
        denominatedToAmount(input);
        break;
      case 'STRING_TO_HEX':
        stringToHex(input);
        break;
      case 'HEX_TO_STRING':
        hexToString(input);
        break;
      case 'STRING_TO_BASE64':
        stringToBase64(input);
        break;
      case 'BASE64_TO_STRING':
        base64ToString(input);
        break;
      case 'HEX_STRING_TO_BASE64':
        hexToBase64(input);
        break;
      case 'BASE64_STRING_TO_HEX_STRING':
        base64ToHex(input);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <DialogHeader className="p-8 pb-0">
        <DialogTitle>Covert data</DialogTitle>
        <DialogDescription>
          You can convert the data - for example, string to hex string, etc.
          Choose the conversion type from the selector.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto px-8 py-0">
        <Form {...form}>
          <form
            id="send-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex-1 overflow-auto p-1">
              <OperationsSelectField
                name="converter"
                label="Converter type"
                description="Choose the conversion type"
                options={converters}
              />
              <OperationsInputField
                name="input"
                label="Data input"
                placeholder="Example: <some hex string>"
                description="Please provide the data to convert"
                type="textarea"
              />
            </div>
          </form>
        </Form>
        {result && (
          <Alert className="break-words">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>The result of the data conversion:</AlertTitle>
            <AlertDescription className="mt-3">{result}</AlertDescription>
          </Alert>
        )}
      </div>
      <DialogFooter className="px-8 py-4">
        <OperationsSubmitButton formId="send-form" isPublic />
      </DialogFooter>
    </>
  );
};
