import type { Metadata, NextPage } from 'next';
import { AddBurnQuantity } from '../../components/add-burn-sft-meta-quantity';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Add/Burn the quantity of a meta ESDT',
  description:
    'A user that has the ESDTRoleNFTAddQuantity role set for a given Token, can increase its quantity (you need to have some amount on your address to do that).',
  pagePath: '/meta-tokens/quantity-management',
});

const MetaQuantityManagementPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl leading-none font-semibold tracking-tight">
          Add/Burn the quantity of a meta ESDT
        </h1>
        <p className="text-muted-foreground text-sm">
          A user that has the ESDTRoleNFTAddQuantity role set for a given Token,
          can increase its quantity (you need to have some amount on your
          address to do that). If successful, the balance of the address for the
          given meta will be increased with the number specified in the
          argument. A user that has the ESDTRoleNFTBurn role set for a given
          meta Token, can burn some (or all) of the quantity. The owner can also
          decrease the quantity. If successful, the quantity from the argument
          will be decreased from the balance of the address for that given
          token.
        </p>
      </div>
      <AddBurnQuantity tokenType="meta" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          In the MultiversX platform, the management of token quantities
          involves specific roles that can significantly impact the token&apos;s
          circulation and availability. Users who are granted the
          ESDTRoleNFTAddQuantity role for a specific token have the ability to
          increase the quantity of that token. This action requires the user to
          already possess some amount of the token on their address.
          Successfully increasing the token quantity will augment the balance of
          the user&apos;s address by the amount specified in the operation.
        </p>
        <p className="mb-3">
          Conversely, users with the ESDTRoleNFTBurn role have the power to
          decrease the token quantity by burning some or all of it. This can be
          done by the token&apos;s owner as well, allowing them to directly
          manage the supply of the token. When a quantity is successfully
          burned, it is permanently removed from the balance of the address,
          effectively reducing the circulating supply of the token. This
          mechanism is designed to allow for precise control over the token
          supply, enabling token managers and users to adjust quantities in
          response to market conditions, strategic objectives, or regulatory
          requirements. These capabilities underscore the flexible and robust
          token management features within the MultiversX ecosystem,
          facilitating effective and compliant token operations.
        </p>
      </div>
    </div>
  );
};

export default MetaQuantityManagementPage;
