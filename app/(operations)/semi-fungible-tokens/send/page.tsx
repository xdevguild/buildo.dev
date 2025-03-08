import type { Metadata, NextPage } from 'next';
import { Send } from './components/send';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Transfer an amount of semi-fungible ESDT',
  description:
    'Performing an ESDT SFT amount transfer is done by specifying the receiver&apos;s address inside the Data field, alongside other details.',
  pagePath: '/semi-fungible-tokens/send',
});

const SemiFungibleStopCreationPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl leading-none font-semibold tracking-tight">
          Transfer an amount of semi-fungible ESDT
        </h1>
        <p className="text-muted-foreground text-sm">
          Performing an ESDT SFT amount transfer is done by specifying the
          receiver&apos;s address inside the Data field, alongside other
          details.
        </p>
      </div>
      <Send />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          When performing a transfer involving ESDT Semi-Fungible Tokens (SFTs),
          it is crucial to accurately specify the receiver&apos;s address within
          the Data field of the transaction. This field also holds additional
          essential details such as the token identifier, the quantity of tokens
          to be transferred, and any other necessary transaction metadata.
          Ensuring these details are correct is fundamental for the successful
          execution of the transfer. This process allows for a high degree of
          customization and control over the transaction, which is a defining
          feature of SFTs and their use in the blockchain ecosystem.
        </p>
        <p className="mb-3">
          Moreover, the ability to include precise and varied information in the
          Data field underscores the flexibility and utility of semi-fungible
          tokens in various applications. From digital assets in gaming to
          tickets in event management, the use of SFTs facilitates unique and
          verifiable transactions that can adapt to different needs and
          scenarios. Each token represents a specific value or asset but also
          shares common characteristics with other tokens of the same type,
          making them particularly useful in scenarios where both uniqueness and
          category identity are important.
        </p>
      </div>
    </div>
  );
};

export default SemiFungibleStopCreationPage;
