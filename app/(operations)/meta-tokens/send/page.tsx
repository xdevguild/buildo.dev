import type { Metadata, NextPage } from 'next';
import { Send } from './components/send';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Transfer an amount of Meta ESDT',
  description:
    'Performing an Meta ESDT amount transfer is done by specifying the receiver&apos;s address inside the Data field, alongside other details.',
  pagePath: '/meta-tokens/send',
});

const MetaSendPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Transfer an amount of Meta ESDT
        </h1>
        <p className="text-sm text-muted-foreground">
          Performing an Meta ESDT amount transfer is done by specifying the
          receiver&apos;s address inside the Data field, alongside other
          details.
        </p>
      </div>
      <Send />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          In the MultiversX platform, transferring a Meta ESDT token involves a
          specific transactional procedure where the sender specifies the
          recipient&apos;s address within the Data field of the transaction.
          This Data field not only includes the receiver&apos;s address but also
          may contain additional details necessary for the transfer, such as the
          amount of the token to be transferred and potentially other
          transaction-specific information. This method ensures that the
          transfer is directed accurately and securely to the intended
          recipient.
        </p>
        <p className="mb-3">
          This process underscores the precision and flexibility of token
          transfers within the MultiversX ecosystem. By allowing senders to
          include detailed instructions within the Data field, the platform
          ensures that each transfer can be tailored to meet specific needs or
          conditions associated with the token&apos;s use. This capability is
          crucial for maintaining robust and efficient operations, particularly
          in applications requiring high levels of accuracy and security in
          token distribution and management. It provides a streamlined and
          effective way to manage and execute token transfers, enhancing the
          utility and functionality of Meta ESDTs on the MultiversX blockchain.
        </p>
      </div>
    </div>
  );
};

export default MetaSendPage;
