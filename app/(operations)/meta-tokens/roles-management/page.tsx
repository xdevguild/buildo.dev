import type { NextPage } from 'next';
import { ToggleSpecialRoles } from '../../components/toggle-special-roles';
import { Separator } from '@/components/ui/separator';

const MetaTokensRolesManagementPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Set/unset special roles for a meta ESDT
        </h1>
        <p className="text-sm text-muted-foreground">
          The manager of an ESDT token can set and unset special roles for a
          given address. Only applicable if canAddSpecialRoles property is true.
        </p>
      </div>
      <ToggleSpecialRoles tokenType="meta" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          The management of an ESDT token on the MultiversX platform offers
          considerable control to the token&apos;s manager, particularly in
          assigning or revoking special roles to specific addresses. This
          capability is only available if the canAddSpecialRoles property of the
          token is set to true. When enabled, this feature allows the token
          manager to customize how different participants interact with the
          token, by granting them specific roles that can include enhanced
          permissions or restrictions depending on the token&apos;s intended use
          and governance structure. This flexibility is vital for creating a
          dynamic and secure ecosystem where token utilities can be maximized
          according to specific project needs and compliance requirements.
        </p>
      </div>
    </div>
  );
};

export default MetaTokensRolesManagementPage;
