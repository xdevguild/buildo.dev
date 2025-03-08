import type { Metadata, NextPage } from 'next';
import { DecodeTransaction } from './components/decode-transaction';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Decode transaction',
  description:
    'Transaction processor. You can decode the transaction data string encoded with base64 or string.',
  pagePath: '/utilities/decode-transaction',
});

const DecodeTransactionPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl leading-none font-semibold tracking-tight">
          Decode transaction
        </h1>
        <p className="text-muted-foreground text-sm">
          Transaction processor. You can decode the transaction data string
          encoded with base64 or string.
        </p>
      </div>
      <DecodeTransaction />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          Our transaction processor tool offers a versatile solution for
          decoding transaction data, accommodating both base64-encoded strings
          and standard text formats. This feature is essential for users who
          need to interpret and analyze transaction information efficiently. By
          supporting both base64 and plain text inputs, our tool ensures
          flexibility and accessibility in data handling, making it an
          indispensable resource for developers, financial analysts, and IT
          professionals who deal with encrypted or encoded transaction data
          regularly. Enhance your data processing capabilities with our reliable
          and user-friendly transaction decoder, designed to cater to a wide
          range of encoding standards.
        </p>
      </div>
    </div>
  );
};

export default DecodeTransactionPage;
