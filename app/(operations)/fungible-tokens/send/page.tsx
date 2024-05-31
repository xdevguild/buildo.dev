import type { Metadata, NextPage } from 'next';
import { Send } from './components/send';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'Buildo.dev - MultiversX: Transfer an amount of your fungible ESDT',
  description:
    'Performing an ESDT transfer is done by sending a transaction directly to the desired receiver Account, but specifying some extra pieces of information in its Data field.',
  pagePath: '/fungible-tokens/send',
});

const SendPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Transfer an amount of your fungible ESDT
        </h1>
        <p className="text-sm text-muted-foreground">
          Performing an ESDT transfer is done by sending a transaction directly
          to the desired receiver Account, but specifying some extra pieces of
          information in its Data field.
        </p>
      </div>
      <Send />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          Transferring an eStandard Digital Token (ESDT) is a streamlined
          process designed for efficiency and security, pivotal in the
          blockchain ecosystem. The procedure involves sending a transaction
          directly to the receiver&apos;s account, a method that mirrors
          traditional digital payments but with enhanced blockchain-specific
          features. Crucially, this transfer requires the sender to include
          additional information in the transaction&apos;s Data field, such as
          the token identifier and the amount to be transferred. This detail
          ensures that the transaction is not only processed accurately but also
          adheres to the secure and transparent protocols characteristic of
          blockchain transactions, thereby maintaining the integrity and
          traceability of every token transfer.
        </p>
        <p className="mb-3">
          This method of ESDT transfer empowers users with control and
          flexibility, allowing for immediate and direct transactions without
          the need for intermediaries. The inclusion of extra data within the
          transaction ensures that all transfers are executed with full
          transparency, reducing the risk of errors and enhancing user
          confidence in the security of their digital assets. By facilitating
          direct transfers, the MultiversX network enables a more efficient use
          of blockchain technology, making it accessible and practical for
          everyday transactions while ensuring compliance with global standards
          for digital currency exchanges.
        </p>
      </div>
    </div>
  );
};

export default SendPage;
