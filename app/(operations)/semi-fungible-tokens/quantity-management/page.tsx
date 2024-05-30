import type { NextPage } from 'next';
import { AddBurnQuantity } from '../../components/add-burn-sft-meta-quantity';
import { Separator } from '@/components/ui/separator';

const SemiFungibleQuantityManagementPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Add/Burn the quantity of a semi-fungible ESDT
        </h1>
        <p className="text-sm text-muted-foreground">
          A user that has the ESDTRoleNFTAddQuantity role set for a given Token,
          can increase its quantity (you need to have some amount on your
          address to do that). If successful, the balance of the address for the
          given semi-fungible will be increased with the number specified in the
          argument. A user that has the ESDTRoleNFTBurn role set for a given
          semi-fungible Token, can burn some (or all) of the quantity. The owner
          can also decrease the quantity. If successful, the quantity from the
          argument will be decreased from the balance of the address for that
          given token.
        </p>
      </div>
      <AddBurnQuantity tokenType="semi-fungible" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          In the dynamic world of eStandard Digital Tokens (ESDT), specific
          roles assigned to users enable them to manage the quantity of
          semi-fungible tokens effectively. One such crucial role is the
          ESDTRoleNFTAddQuantity, which grants a user the ability to increase
          the quantity of a specific token. This is particularly useful for
          scenarios where the augmentation of token supply is necessary to meet
          increased demand or to execute promotional activities. To utilize this
          role, a user must already hold a certain amount of the token in
          question on their address. Upon successful execution of the increase
          operation, the balance of the specified semi-fungible token on the
          user&apos;s address will reflect the addition, aligning with the
          number specified in the argument. This capability allows for flexible
          supply management, ensuring that token issuers can respond promptly to
          market conditions or community needs.
        </p>
        <p className="mb-3">
          Conversely, the ESDTRoleNFTBurn role enables a user to decrease the
          quantity of a semi-fungible token. This role is integral for adjusting
          the supply for reasons such as maintaining token value, meeting
          deflationary policies, or complying with regulatory requirements.
          Whether the intention is to burn a portion or the entire quantity
          held, the operation directly reduces the amount from the user&apos;s
          balance of the specific token. This dual functionality of adding or
          burning quantities provides robust control over token circulation,
          crucial for managing economic factors such as inflation and scarcity
          within the digital asset ecosystem. Both capabilities, adding and
          burning, are essential tools that enhance the operational flexibility
          and economic stability of semi-fungible tokens, making them adaptable
          and secure for various applications within the blockchain
          infrastructure.
        </p>
      </div>
    </div>
  );
};

export default SemiFungibleQuantityManagementPage;
