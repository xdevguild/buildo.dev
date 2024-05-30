import type { Metadata, NextPage } from 'next';
import { AddressData } from './components/address-data';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'Buildo.dev - MultiversX: Check address data',
  description:
    'Check basic address data (also using a herotag). It can also be a smart contract address.',
  pagePath: '/utilities/wipe',
});

const AddressDataPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Check address data
        </h1>
        <p className="text-sm text-muted-foreground">
          Check basic address data (also using a herotag). It can also be a
          smart contract address. Useful because Explorer API has agressive
          cache in some cases.
        </p>
      </div>
      <AddressData />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          Access essential information about blockchain addresses through our
          Explorer API, which supports both standard and smart contract
          addresses. Additionally, our system allows the use of
          &apos;herotags&apos; for more intuitive queries. This capability is
          particularly valuable because the Explorer API utilizes aggressive
          caching strategies in certain situations, which can expedite data
          retrieval but might also delay updates. By using our service,
          developers and analysts can efficiently check basic address data,
          monitor smart contract interactions, and retrieve up-to-date
          information crucial for real-time decision making. Whether you are
          tracking transactions, verifying smart contracts, or conducting
          security audits, our API provides the necessary tools to ensure you
          have the most current and relevant data at your disposal.
        </p>
      </div>
    </div>
  );
};

export default AddressDataPage;
