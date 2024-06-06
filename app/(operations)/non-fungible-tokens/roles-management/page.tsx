import type { Metadata, NextPage } from 'next';
import { ToggleSpecialRoles } from '../../components/toggle-special-roles';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Set/unset special roles for a non-fungible ESDT',
  description:
    'The manager of an ESDT token can set and unset special roles for a given address. Only applicable if canAddSpecialRoles property is true.',
  pagePath: '/non-fungible-tokens/roles-management',
});

const NonFungibleRolesManagementPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Set/unset special roles for a non-fungible ESDT
        </h1>
        <p className="text-sm text-muted-foreground">
          The manager of an ESDT token can set and unset special roles for a
          given address. Only applicable if canAddSpecialRoles property is true.
        </p>
      </div>
      <ToggleSpecialRoles tokenType="non-fungible" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          When managing an ESDT token, the ability for a token manager to assign
          or revoke specific roles to an address is a crucial feature. This
          functionality is only available if the canAddSpecialRoles property of
          the token is set to true. This ensures a higher level of control and
          customization over who can perform certain actions within the
          token&amp;s ecosystem. By enabling selective role assignment,
          organizations can efficiently govern their token&amp;s operations,
          enhancing security and operational efficiency, particularly in complex
          token ecosystems.
        </p>
        <p className="mb-3">
          In the context of non-fungible tokens (NFTs), the significance of
          these roles becomes even more pronounced. NFTs, which represent unique
          digital or real-world assets on a blockchain, require nuanced
          management capabilities to handle their unique attributes and
          ownership details. The ability to set special roles allows for
          sophisticated management strategies. This feature facilitates a robust
          framework for NFT management, ensuring that only authorized personnel
          can perform critical functions, thus preserving the integrity and
          exclusivity of the assets.
        </p>
      </div>
    </div>
  );
};

export default NonFungibleRolesManagementPage;
