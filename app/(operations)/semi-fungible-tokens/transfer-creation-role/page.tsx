import type { NextPage } from 'next';
import { TransferCreationRole } from '../../common/transfer-creation-role';
import { Separator } from '@/components/ui/separator';

const SemiFungibleTransferCreationRolePage: NextPage = () => {
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
      <TransferCreationRole tokenType="semi-fungible" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          In the dynamic ecosystem of semi-fungible tokens (SFTs), the ability
          for a token manager to transfer the creation role from one address to
          another adds a layer of strategic management and adaptability. This
          capability is essential for maintaining operational flexibility and
          ensuring that token creation responsibilities can align with evolving
          business strategies or administrative needs. However, it&apos;s
          important to note that this role can only be transferred if the
          canTransferNFTCreateRole property of the token is set to true. This
          property acts as a safeguard, ensuring that the transfer of such
          critical responsibilities is permitted under the token&apos;s
          governance rules. By enabling this feature, organizations can
          dynamically manage who has the authority to create new tokens, thereby
          adjusting their approach to market demands or internal shifts in
          strategy.
        </p>
        <p className="mb-3">
          The transferability of the creation role is particularly valuable in
          scenarios where project leadership changes or where decentralized
          governance practices dictate periodic redistribution of roles among
          various stakeholders. For instance, in a decentralized autonomous
          organization (DAO) or in projects with multiple collaborators, the
          ability to transfer creation roles ensures that token management can
          remain responsive and resilient against administrative flux.
          Additionally, this feature underpins the security and integrity of the
          token&apos;s lifecycle, as only authorized and verified addresses will
          have the capability to generate new assets, reducing the risk of
          unauthorized token proliferation. Such robust management tools are
          instrumental in bolstering the credibility and operational security of
          semi-fungible tokens, making them more attractive for investors and
          users in a security-conscious digital asset market.
        </p>
      </div>
    </div>
  );
};

export default SemiFungibleTransferCreationRolePage;
