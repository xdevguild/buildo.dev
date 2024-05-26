import type { NextPage } from 'next';
import { TransferOwnership } from '../../common/transfer-ownership';
import { Separator } from '@/components/ui/separator';

const TransferOwnershipPage: NextPage = () => {
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
      <TransferOwnership tokenType="fungible" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          In the dynamic world of blockchain and digital asset management, the
          capability for an eStandard Digital Token (ESDT) manager to transfer
          management rights to another account is a fundamental feature. This
          transfer, once processed by the Metachain, effectively shifts all
          administrative privileges, allowing only the new account to perform
          subsequent management operations. For such a transfer to be possible,
          it is imperative that the ESDT&apos;s settings include the
          canChangeOwner option set to true. This feature ensures that the
          transfer of management rights adheres to the protocol&apos;s
          governance standards, promoting flexibility and adaptability in token
          management under a secure framework.
        </p>
        <p className="mb-3">
          The ability to change ownership is critical in scenarios where
          strategic shifts in management are necessary, such as corporate
          restructuring, mergers, or when enhancing security protocols. This
          operation not only supports seamless transitions in token management
          but also reinforces the security and integrity of the management
          process by entrusting control to new entities under regulated
          conditions. By allowing the original token managers to designate new
          managers, the ESDT system provides a robust mechanism for maintaining
          continuous and efficient management of digital assets, ensuring that
          all transitions are transparent and align with the overall governance
          policies of the MultiversX network.
        </p>
      </div>
    </div>
  );
};

export default TransferOwnershipPage;
