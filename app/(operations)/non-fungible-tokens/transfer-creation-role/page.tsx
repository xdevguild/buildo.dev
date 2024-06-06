import type { Metadata, NextPage } from 'next';
import { TransferCreationRole } from '../../components/transfer-creation-role';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Transfer creation role',
  description:
    'The token manager can transfer the creation role from one address to another.',
  pagePath: '/non-fungible-tokens/transfer-creation-role',
});

const NonFungibleTransferCreationRolePage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Transfer creation role
        </h1>
        <p className="text-sm text-muted-foreground">
          The token manager can transfer the creation role from one address to
          another. This role can be transferred only if the
          canTransferNFTCreateRole property of the token is set to true.
        </p>
      </div>
      <TransferCreationRole tokenType="non-fungible" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          In the intricate ecosystem of digital tokens, the ability to transfer
          the creation role of a Non-Fungible Token (NFT) from one address to
          another is a critical functionality that enhances the flexibility and
          control within the blockchain network. This transfer capability is
          governed by a specific property known as canTransferNFTCreateRole.
          This property must be set to true to enable the transition of create
          rights between parties. Such a feature is indispensable for token
          managers who need to adapt to changing project requirements or
          collaborations that require a shift in who holds the authority. By
          ensuring that this property is enabled, token managers can maintain a
          dynamic and responsive approach to NFT management, fostering a more
          collaborative and versatile environment for digital asset creation.
        </p>
        <p className="mb-3">
          This role transfer process is crucial for maintaining the integrity
          and continuity of NFT projects, particularly in scenarios involving
          multiple stakeholders or complex collaborations. When the
          canTransferNFTCreateRole property is active, it not only allows for a
          seamless transition of creative responsibilities but also ensures that
          all parties involved adhere to the agreed-upon governance protocols.
          This level of control and customization is vital for projects that
          evolve over time, requiring new creators to take the helm and inject
          fresh perspectives or expertise. The feature also underscores the
          importance of security and compliance in the digital asset realm,
          providing token managers with the tools necessary to manage roles
          effectively while securing the token&apos;s lifecycle and enhancing
          its value across various applications.
        </p>
      </div>
    </div>
  );
};

export default NonFungibleTransferCreationRolePage;
