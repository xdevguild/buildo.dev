import type { NextPage } from 'next';
import { BurnNft } from './components/burn';
import { Separator } from '@/components/ui/separator';

const NonFungibleBurnPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Burn an Non-fungible ESDT
        </h1>
        <p className="text-sm text-muted-foreground">
          A user that has the ESDTRoleNFTBurn role set, or an owner for a given
          Non-fungible token, can burn it. If successful, it will disapear from
          the balance of the address for that given token.
        </p>
      </div>
      <BurnNft />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          The ability to burn a non-fungible token (NFT) is a pivotal feature in
          the management of digital assets within the eStandard Digital Token
          (ESDT) system. A user with the designated ESDTRoleNFTBurn role, or the
          owner of the NFT, has the authority to permanently remove the token
          from circulation. This action results in the token disappearing from
          the balance of the address associated with that specific token,
          effectively reducing the total supply and potentially increasing the
          rarity and value of the remaining tokens. The burning process is a
          critical tool for token governance, allowing for the adjustment of
          supply based on strategic decisions or community consensus, and is
          often used to manage tokenomics dynamically or to respond to specific
          economic events within the ecosystem.
        </p>
        <p className="mb-3">
          Burning an NFT can have significant implications for both the token
          ecosystem and its users. For creators and project managers, it
          provides a method to influence the market cap and scarcity of tokens,
          which can be particularly useful in cases where tokens need to be
          removed due to obsolescence, legal issues, or to create new dynamics
          within the market. For users, the burn mechanism ensures that the
          digital assets they hold are part of a controlled and adaptable
          economic environment, where supply can be adjusted to maintain value
          and functionality. This level of control is crucial for maintaining
          user trust and for the long-term sustainability of the platform, as it
          demonstrates a commitment to proactive and responsive asset
          management.
        </p>
      </div>
    </div>
  );
};

export default NonFungibleBurnPage;
