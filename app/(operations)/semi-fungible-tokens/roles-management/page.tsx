import type { NextPage } from 'next';
import { ToggleSpecialRoles } from '../../components/toggle-special-roles';
import { Separator } from '@/components/ui/separator';

const SemiFungibleRolesManagementPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Set/unset special roles for a semi-fungible ESDT
        </h1>
        <p className="text-sm text-muted-foreground">
          The manager of an ESDT token can set and unset special roles for a
          given address. Only applicable if canAddSpecialRoles property is true.
        </p>
      </div>
      <ToggleSpecialRoles tokenType="semi-fungible" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          For Semi-Fungible Tokens (SFTs), the management capabilities extend
          significantly with the role-based features of the eStandard Digital
          Token (ESDT). The manager of an ESDT token has the authority to assign
          or revoke special roles to specific addresses, enhancing control over
          how these tokens are interacted with within the network. This
          functionality is pivotal, as it enables tailored governance and
          operational protocols per token. However, it&apos;s important to note
          that these capabilities are only accessible if the canAddSpecialRoles
          property of the token is set to true. This setting ensures that the
          token&apos;s configuration supports such advanced management features,
          which are essential for creating a flexible and secure token
          ecosystem.
        </p>
        <p className="mb-3">
          Implementing role-based permissions is crucial for maintaining the
          integrity and utility of SFTs in various applications, such as gaming,
          decentralized finance (DeFi), and collectibles. By allowing the token
          manager to set specific roles, organizations can enforce rules and
          permissions that align with their business models and security
          requirements. For instance, certain roles may allow for token
          freezing, token burning, or participation in specific governance
          decisions, thereby providing a robust framework for token management.
          This level of customization not only secures the token ecosystem but
          also enhances its functionality, making SFTs a versatile and
          attractive option for developers and businesses looking to leverage
          blockchain technology in innovative ways.
        </p>
      </div>
    </div>
  );
};

export default SemiFungibleRolesManagementPage;
