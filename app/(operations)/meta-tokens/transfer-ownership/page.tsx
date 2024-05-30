import type { NextPage } from 'next';
import { TransferOwnership } from '../../components/transfer-ownership';
import { Separator } from '@/components/ui/separator';

const MetaTransferOwnershipPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Transfer ownersip and management rights for the ESDT
        </h1>
        <p className="text-sm text-muted-foreground">
          The manager of an ESDT token may transfer the management rights to
          another Account. After this transaction is processed by the Metachain,
          any subsequent management operations will only be permitted to the new
          Account. This operation requires that the option canChangeOwner is set
          to true.
          <br />
          <br />
          <strong>
            Due to API caching, changes may not be visible immediately.
          </strong>
        </p>
      </div>
      <TransferOwnership tokenType="meta" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          In the MultiversX ecosystem, the management of an ESDT token includes
          the ability for the token manager to transfer management rights to a
          different account. This transition of management rights is a crucial
          feature that allows for flexibility in token governance and ensures
          continuity in the management of the token&apos;s operations. For such
          a transfer to take place, the token must have the canChangeOwner
          property enabled. Once this property is set, and the transaction to
          transfer management rights is successfully processed by the Metachain,
          all future management operations must be performed by the new account
          holder, effectively changing the stewardship of the token.
        </p>
        <p className="mb-3">
          This mechanism is vital for facilitating smooth transitions in token
          management, whether due to strategic shifts, organizational changes,
          or other reasons that might necessitate a change in token ownership.
          By enabling the canChangeOwner option, MultiversX provides token
          creators and managers with the necessary tools to ensure that token
          governance can adapt to new circumstances without disrupting the
          token&apos;s functionality or the broader ecosystem. This feature
          enhances the adaptability and security of managing digital assets on
          the blockchain, supporting a robust and flexible infrastructure for
          token administration.
        </p>
      </div>
    </div>
  );
};

export default MetaTransferOwnershipPage;
