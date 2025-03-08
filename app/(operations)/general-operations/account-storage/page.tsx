import type { Metadata, NextPage } from 'next';
import { AccountStorage } from './components/account-storage';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Account storage',
  description:
    'The MultiversX protocol offers the possibility of storing additional data under an account as key-value pairs.',
  pagePath: '/general-operations/account-storage',
});

const AccountStoragePage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl leading-none font-semibold tracking-tight">
          Account storage
        </h1>
        <p className="text-muted-foreground text-sm">
          The MultiversX protocol offers the possibility of storing additional
          data under an account as key-value pairs. This can be useful for many
          use cases. A wallet owner can store key-value pairs.
        </p>
      </div>
      <AccountStorage />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          The MultiversX protocol enhances user experiences by allowing the
          storage of additional data as key-value pairs under an account. This
          feature is crucial for various applications, offering wallet owners a
          customizable way to manage data securely and efficiently within the
          blockchain.
        </p>
        <p className="mb-3">
          This capability is especially valuable for developers building
          decentralized applications (DApps) on the MultiversX platform,
          enabling more sophisticated functionalities. Users can store settings,
          preferences, or business logic, maintaining data integrity and
          security inherent to blockchain technology.
        </p>
        <p>
          In summary, MultiversX&apos;s key-value storage feature significantly
          improves the flexibility and functionality of DApps, positioning it as
          a robust tool for blockchain innovation.
        </p>
      </div>
    </div>
  );
};

export default AccountStoragePage;
