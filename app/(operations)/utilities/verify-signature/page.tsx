import type { Metadata, NextPage } from 'next';
import { VerifySignature } from './components/verify-signature';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'Buildo.dev - MultiversX: Verify signature',
  description:
    'Verify the signature of a previously signed message. You need to provide the message, signature, and address with which you signed the message.',
  pagePath: '/utilities/verify-signature',
});

const VerifySignaturePage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Verify signature
        </h1>
        <p className="text-sm text-muted-foreground">
          Verify the signature of a previously signed message. You need to
          provide the message, signature, and address with which you signed the
          message.
        </p>
      </div>
      <VerifySignature />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          To verify the signature of a previously signed message, it is
          essential to have access to the original message, its digital
          signature, and the public address or key used for signing. This
          verification process is crucial to confirm the authenticity and
          integrity of the message, ensuring that it remains unchanged since its
          creation. A successful verification confirms the signature&apos;s
          validity and the message&apos;s integrity, indicating that the message
          is genuine and unmodified since the signature was applied. This step
          is vital for maintaining trust and security in digital communications.
        </p>
      </div>
    </div>
  );
};

export default VerifySignaturePage;
