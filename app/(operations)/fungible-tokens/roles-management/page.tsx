import type { Metadata, NextPage } from 'next';
import { ToggleSpecialRoles } from '../../components/toggle-special-roles';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Set/unset special roles for a fungible ESDT',
  description:
    'The manager of an ESDT token can set and unset special roles for a given address. Only applicable if canAddSpecialRoles property is true.',
  pagePath: '/fungible-tokens/roles-management',
});

const RolesManagementPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Set/unset special roles for a fungible ESDT
        </h1>
        <p className="text-sm text-muted-foreground">
          The manager of an ESDT token can set and unset special roles for a
          given address. Only applicable if canAddSpecialRoles property is true.
        </p>
      </div>
      <ToggleSpecialRoles tokenType="fungible" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          In the realm of blockchain and cryptocurrency management, the manager
          of an ESDT (eStandard Digital Token) plays a crucial role in managing
          token permissions. Specifically, the manager has the authority to
          assign or remove special roles to different addresses, enhancing the
          token&apos;s operational flexibility and security. This capability is
          crucial for maintaining control and customization of token
          functionalities within the MultiversX network. However, it&apos;s
          important to note that the ability to set and unset these special
          roles is contingent upon the canAddSpecialRoles property being
          enabled. This feature ensures that only authorized managers can modify
          roles, providing an additional layer of security and governance to the
          token management process.
        </p>
      </div>
    </div>
  );
};

export default RolesManagementPage;
