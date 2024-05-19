import type { NextPage } from 'next';
import { StopCreation } from '../../common/stop-creation';
import { Separator } from '@/components/ui/separator';

const NonFungibleStopCreationPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Stop creation
        </h1>
        <p className="text-sm text-muted-foreground">
          The ESDT manager can stop the creation of the token for the given ESDT
          forever by removing the only ESDTRoleNFTCreate role available.
        </p>
      </div>
      <StopCreation tokenType="non-fungible" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          The ESDT manager has the authority to decisively impact the lifecycle
          of a token within the MultiversX network by removing the
          ESDTRoleNFTCreate role, effectively halting the creation of new tokens
          for a specific ESDT. This action is irreversible and marks a
          significant step in managing the token&apos;s existence, ensuring that
          no further NFTs can be minted under the token&apos;s protocol. Such a
          measure could be utilized to maintain the scarcity of a collection or
          to end a project phase, thus stabilizing or potentially increasing the
          value of the existing tokens. The capability to stop token creation
          permanently is a powerful tool that provides token managers with
          strict control over the supply and lifecycle of digital assets.
        </p>
        <p className="mb-3">
          By removing the only ESDTRoleNFTCreate role available, the ESDT
          manager not only curtails the minting of new tokens but also
          solidifies the finality of the existing tokens&apos; status. This
          action has broad implications, including enhancing the collectibility
          and rarity of the NFTs associated with the ESDT. It is a strategic
          decision that could be influenced by market dynamics, project goals,
          or community feedback. For investors and collectors, the knowledge
          that no additional tokens will be created can create a sense of
          urgency and increased demand, potentially driving up market prices.
          For creators and project managers, this provides a clear endpoint to a
          token issuance, allowing for new projects or directions to be pursued
          while ensuring the legacy and integrity of the original token
          collection.
        </p>
      </div>
    </div>
  );
};

export default NonFungibleStopCreationPage;
