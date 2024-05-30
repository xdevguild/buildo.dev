import type { NextPage } from 'next';
import { IssueNftSft } from '../../components/issue-nft-sft';
import { Separator } from '@/components/ui/separator';

const SemiFungibleTokensIssuePage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Issue a semi-fungible ESDT (Collection)
        </h1>
        <p className="text-sm text-muted-foreground">
          To create SFTs, start by setting up an ESDT collection token. Each SFT
          in this collection will have a unique nonce and its own attributes and
          assets.
          <br />
          <br />
          In practical applications, it&apos;s advisable to prioritize the use
          of smart contracts for fair issuance and distribution.
        </p>
      </div>
      <IssueNftSft tokenType="semi-fungible" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          To initiate the creation of Semi-Fungible Tokens (SFTs), the first
          step involves establishing an etandard Digital Token (ESDT) collection
          token. This foundational action allows every SFT within the collection
          to be identified uniquely by a nonce—a one-time number used in each
          transaction. Furthermore, each SFT can possess distinct attributes and
          assets, making them individually valuable within the ecosystem. This
          setup is essential for developers looking to integrate unique digital
          assets with varying levels of fungibility into their applications,
          thereby enhancing user engagement and asset interoperability on the
          blockchain.
        </p>
        <p className="mb-3">
          In practical deployments, leveraging smart contracts is highly
          recommended to ensure fairness and transparency in the issuance and
          distribution of SFTs. Smart contracts automate these processes,
          minimizing human error and bias while providing a secure, trustless
          environment for transactions. This approach not only streamlines
          operations but also bolsters user confidence in the fairness of the
          token distribution mechanisms. Utilizing smart contracts can also
          facilitate complex transactions and interactions within the token
          ecosystem, which are crucial for maintaining a robust and dynamic
          digital asset market.
        </p>
      </div>
    </div>
  );
};

export default SemiFungibleTokensIssuePage;
