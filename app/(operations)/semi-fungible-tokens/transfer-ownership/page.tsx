import type { Metadata, NextPage } from 'next';
import { TransferOwnership } from '../../components/transfer-ownership';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title:
    'Buildo.dev - MultiversX: Transfer ownersip and management rights for the semi-fungible ESDT',
  description:
    'The manager of a semi-fungible ESDT token may transfer the management rights to another Account.',
  pagePath: '/semi-fungible-tokens/transfer-ownership',
});

const SemiFungibleTransferOwnershipPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Transfer ownersip and management rights for the semi-fungible ESDT
        </h1>
        <p className="text-sm text-muted-foreground">
          The manager of a semi-fungible ESDT token may transfer the management
          rights to another Account. After this transaction is processed by the
          Metachain, any subsequent management operations will only be permitted
          to the new Account. This operation requires that the option
          canChangeOwner is set to true.
          <br />
          <br />
          <strong>
            Due to API caching, changes may not be visible immediately.
          </strong>
        </p>
      </div>
      <TransferOwnership tokenType="semi-fungible" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          In the ever-evolving landscape of blockchain and digital assets, the
          management of semi-fungible ESDT tokens includes a crucial
          capability—the transfer of management rights to another account. This
          feature allows for seamless transitions of authority, ensuring that
          token management can adapt to changes in leadership, strategic
          partnerships, or organizational restructuring. For such a transfer to
          take place, the token must be configured with the canChangeOwner
          option enabled. Once this transaction is successfully processed by the
          Metachain, all subsequent management activities, such as role
          assignments, token issuance adjustments, and other administrative
          tasks, become the exclusive purview of the new account holder. This
          mechanism is integral for maintaining continuity of management while
          also securing the token against unauthorized changes or misuse,
          thereby upholding the integrity of the token&apos;s governance
          structure.
        </p>
        <p className="mb-3">
          The ability to transfer management rights is not only a testament to
          the flexibility and advanced governance features of ESDT tokens but
          also crucial for the long-term sustainability of digital assets within
          dynamic business environments. By enabling this option, the original
          managers ensure that the token can continue to thrive under new
          leadership without disrupting ongoing operations or token utility.
          This is particularly important in scenarios where the initial
          management team might no longer be able to fulfill their roles due to
          various reasons such as strategic shifts, personal circumstances, or
          evolving market conditions. Ensuring that the canChangeOwner option is
          enabled and utilized appropriately reflects a proactive approach to
          governance that can significantly enhance investor confidence and
          token stability, making semi-fungible tokens a more attractive and
          reliable asset in the broader blockchain ecosystem.
        </p>
      </div>
    </div>
  );
};

export default SemiFungibleTransferOwnershipPage;
