import type { Metadata, NextPage } from 'next';
import { SignMessage } from './components/sign-message';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'Buildo.dev - MultiversX: Sign a message',
  description:
    'You can sign any message using your wallet address as a key. You can also verify signed messages. Check the Utilities section.',
  pagePath: '/general-operations/sign-message',
});

const SignMessagePage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Sign a message
        </h1>
        <p className="text-sm text-muted-foreground">
          You can sign any message using your wallet address as a key. You can
          also verify signed messages. Check the Utilities section.
        </p>
      </div>
      <SignMessage />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          Signing and verifying messages using your wallet address as a key is a
          powerful feature for ensuring the authenticity and security of
          communications in the digital space. By utilizing your wallet address,
          you can generate signatures that confirm your identity and the
          integrity of the messages you send. This process is crucial for
          preventing fraud and establishing trust in various online
          interactions.
        </p>
        <p className="mb-3">
          Utilizing digital signatures in this way enhances security protocols
          across different platforms, from blockchain transactions to secure
          messaging applications. It is especially useful for cryptocurrency
          transactions and smart contracts, where proving ownership without
          exposing private keys is essential.
        </p>
        <p className="mb-3">
          You can also verify the signature. Check the Utilities section.
        </p>
      </div>
    </div>
  );
};

export default SignMessagePage;
