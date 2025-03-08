import type { Metadata, NextPage } from 'next';
import { TransferOwnership } from '../../components/transfer-ownership';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Transfer ownersip and management rights for the ESDT',
  description:
    'The manager of an ESDT token may transfer the management rights to another Account.',
  pagePath: '/non-fungible-tokens/transfer-ownership',
});

const NonFungibleTransferOwnershipPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl leading-none font-semibold tracking-tight">
          Transfer ownersip and management rights for the ESDT
        </h1>
        <p className="text-muted-foreground text-sm">
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
      <TransferOwnership tokenType="non-fungible" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          When managing an ESDT (eStandard Digital Token), the current manager
          has the ability to transfer management rights to a different account.
          This transition of control becomes effective once the Metachain, which
          is the central coordinator in the MultiversX Network, processes the
          transaction. From that point forward, all management activities
          related to the token must be conducted by the new manager. It&apos;s
          essential for the token to have the canChangeOwner attribute set to
          true, indicating that the ownership is transferable. This setting
          ensures that the token&apos;s management rights can be reassigned,
          facilitating flexibility and administrative transitions in token
          management.
        </p>
        <p className="mb-3">
          This feature is particularly important for ensuring seamless
          management transitions in various scenarios, such as organizational
          restructuring, ownership changes, or strategic realignment. When the
          canChangeOwner option is enabled, it allows token issuers and current
          managers to plan for future contingencies and ensure that token
          management can be handed over without disruptions. The ability to
          transfer management rights is a crucial aspect of maintaining the
          operational efficiency and security of a token within the MultiversX
          network, providing a mechanism for continuity and adaptation in the
          dynamic landscape of digital assets.
        </p>
      </div>
    </div>
  );
};

export default NonFungibleTransferOwnershipPage;
