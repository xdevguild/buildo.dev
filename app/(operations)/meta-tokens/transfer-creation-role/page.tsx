import type { Metadata, NextPage } from 'next';
import { TransferCreationRole } from '../../components/transfer-creation-role';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'Buildo.dev - MultiversX: Transfer creation role',
  description:
    'The token manager can transfer the creation role from one address to another.',
  pagePath: '/meta-tokens/transfer-creation-role',
});

const MetaTransferCreationRolePage: NextPage = () => {
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
      <TransferCreationRole tokenType="meta" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          In the MultiversX blockchain framework, the ability to transfer the
          creation role of a token from one address to another is a significant
          feature that enhances the flexibility and governance of token
          management. This transfer capability, however, is contingent upon the
          canTransferNFTCreateRole property of the token being set to true. When
          enabled, this property allows the token manager to delegate the
          critical function of token creation, ensuring that the capability can
          be passed to another party as needed, whether for strategic
          realignment, administrative restructuring, or enhanced security
          measures.
        </p>
        <p className="mb-3">
          This feature is particularly crucial in maintaining the adaptability
          and continuity of token operations within the MultiversX ecosystem. By
          enabling the transfer of the creation role, token managers can ensure
          that the development and expansion of the token&apos;s functionalities
          are not hindered by the static assignment of roles. This flexibility
          is vital for projects that anticipate growth or changes in their
          management structure, allowing them to dynamically adjust who holds
          the capability to create and innovate within the token&apos;s
          framework. Consequently, this adaptability plays a crucial role in the
          token&apos;s lifecycle, supporting scalable and resilient digital
          asset management.
        </p>
      </div>
    </div>
  );
};

export default MetaTransferCreationRolePage;
