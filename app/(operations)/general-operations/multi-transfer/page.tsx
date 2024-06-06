import type { Metadata, NextPage } from 'next';
import { MultiTransfer } from './components/multi-transfer';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Transfer multiple types of ESDT',
  description:
    'Perform multiple tokens transfers in a single bulk. This way, one can send (to a single receiver) multiple fungible, semi-fungible, non-fungible or meta tokens via a single transaction.',
  pagePath: '/general-operations/multi-transfer',
});

const MultiTransferPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Transfer multiple types of ESDT
        </h1>
        <p className="text-sm text-muted-foreground">
          Perform multiple tokens transfers in a single bulk. This way, one can
          send (to a single receiver) multiple fungible, semi-fungible,
          non-fungible or meta tokens via a single transaction.
        </p>
      </div>
      <MultiTransfer />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          When managing digital assets like tokens, conducting multiple token
          transfers in a single transaction can significantly enhance
          operational efficiency. This method allows for the transfer of various
          types of tokens—be they fungible, semi-fungible, non-fungible, or meta
          tokens—to a single recipient in one consolidated action. This
          streamlined approach not only simplifies the transaction process but
          also speeds up the execution time, making it highly advantageous for
          users dealing with high volumes of token transfers.
        </p>
        <p>
          Moreover, this approach enhances the user experience by providing a
          more straightforward and less cluttered transaction process. Whether
          in gaming, digital collectibles, or any sector that utilizes
          blockchain technology, the ability to execute multiple token transfers
          in one transaction simplifies operations and can lead to smoother,
          more efficient asset management across different applications. This
          method is also invaluable for developers and businesses looking to
          integrate sophisticated token-based operations while maintaining an
          intuitive user interface.
        </p>
      </div>
    </div>
  );
};

export default MultiTransferPage;
