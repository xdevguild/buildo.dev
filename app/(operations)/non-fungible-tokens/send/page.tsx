import type { Metadata, NextPage } from 'next';
import { Send } from './components/send';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Transfer a non-fungible ESDT',
  description:
    "Performing an ESDT NFT transfer is done by specifying the receiver's address inside the Data field, alongside other details.",
  pagePath: '/non-fungible-tokens/send',
});

const NonFungibleSendPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl leading-none font-semibold tracking-tight">
          Transfer a non-fungible ESDT
        </h1>
        <p className="text-muted-foreground text-sm">
          Performing an ESDT NFT transfer is done by specifying the receiver
          {"'"}s address inside the Data field, alongside other details.
        </p>
      </div>
      <Send />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          Performing a transfer of an eStandard Digital Token (ESDT)
          non-fungible token (NFT) involves a specific and secure process, where
          the details of the transaction, including the receiver&apos;s address,
          are meticulously specified within the Data field. This precise
          detailing ensures that the transfer is directed accurately and
          securely to the intended recipient. The Data field not only includes
          the receiver&apos;s address but also encapsulates other crucial
          information such as token identifiers and quantities, making each
          transaction uniquely traceable and verifiable. This method enhances
          the security and traceability of NFT transactions, crucial for
          maintaining transparency and integrity within the digital asset
          ecosystem. By using this structured data approach, users can
          confidently engage in transactions, knowing that their digital assets
          are handled securely and appropriately.
        </p>
        <p className="mb-3">
          The ability to transfer NFTs securely by specifying detailed
          transaction data is vital for the efficiency and reliability of
          digital marketplaces and platforms that deal with blockchain assets.
          It ensures that all parties involved in the transaction have clear,
          immutable records of the transfer, reducing the risk of disputes and
          fraud. This level of detail and security in NFT transactions fosters
          trust among users, making it more attractive for individuals and
          businesses to invest in and utilize NFTs. Moreover, the structured and
          detailed approach to specifying transaction data makes the integration
          of NFTs with other digital services and platforms smoother, as it
          provides a consistent and reliable method for handling asset
          transfers. This reliability and trust are essential for the growth and
          scalability of blockchain technologies in various sectors, including
          art, gaming, and real estate.
        </p>
      </div>
    </div>
  );
};

export default NonFungibleSendPage;
