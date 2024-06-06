import type { Metadata, NextPage } from 'next';
import { ChangeOwnerAddress } from './components/change-owner-address';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Change owner address',
  description:
    'Change owner address is an operation to be made by a Smart Contract&apos;s owner when a new owner is desired.',
  pagePath: '/general-operations/change-owner-address',
});

const ChangeOwnerAddressPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Change owner address
        </h1>
        <p className="text-sm text-muted-foreground">
          Change owner address is an operation to be made by a Smart
          Contract&apos;s owner when a new owner is desired.
        </p>
      </div>
      <ChangeOwnerAddress />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          The ChangeOwnerAddress functionality is specifically designed for use
          by current owners of a Smart Contract who wish to transfer ownership
          to a new party. This function is an essential tool for managing the
          control and administration of the Smart Contract, allowing for
          seamless transitions between owners which is crucial for maintaining
          the integrity and continuous operation of the contract.
        </p>
        <p>
          When a Smart Contract owner decides to designate a new owner,
          activating this function facilitates the necessary update in ownership
          records. This capability ensures that the Smart Contract remains under
          responsible stewardship at all times, enabling effective and secure
          management of the contract&apos;s functionalities and associated
          assets.
        </p>
      </div>
    </div>
  );
};

export default ChangeOwnerAddressPage;
