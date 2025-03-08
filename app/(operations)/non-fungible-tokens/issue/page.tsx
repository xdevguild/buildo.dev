import type { Metadata, NextPage } from 'next';
import { IssueNftSft } from '../../components/issue-nft-sft';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Issue a non-fungible ESDT (Collection)',
  description:
    'To create NFTs, start by setting up an ESDT collection token. Each NFT in this collection will have a unique nonce and its own attributes and assets.',
  pagePath: '/non-fungible-tokens/issue',
});

const NonFungibleTokensIssuePage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl leading-none font-semibold tracking-tight">
          Issue a non-fungible ESDT (Collection)
        </h1>
        <p className="text-muted-foreground text-sm">
          To create NFTs, start by setting up an ESDT collection token. Each NFT
          in this collection will have a unique nonce and its own attributes and
          assets.
          <br />
          <br />
          In practical applications, it&apos;s advisable to prioritize the use
          of smart contracts for fair issuance and distribution.
        </p>
      </div>
      <IssueNftSft tokenType="non-fungible" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          Creating NFTs begins with establishing an ESDT (eStandard Digital
          Token) collection token, which serves as the foundational framework
          for your digital assets. This first step is crucial as it defines the
          scope and potential of your NFT collection. Each NFT minted within
          this collection is assigned a unique nonce, which acts as a serial
          number, ensuring that every token remains distinct and identifiable.
          Additionally, each NFT can be endowed with a unique set of attributes
          and assets, ranging from visual artwork to digital files, making each
          one unique.
        </p>
        <p className="mb-3">
          For those looking to dive into the world of NFTs on the MultiversX
          network, understanding the significance of the ESDT collection token
          is key. It not only simplifies the process of token management but
          also enhances the security and uniqueness of each NFT created. By
          leveraging this method, creators can offer more personalized and
          diverse digital items to their audience, fostering a richer and more
          engaging NFT ecosystem. This structured approach to NFT creation
          ensures that every token minted is not only unique but also securely
          registered on the blockchain, adding a layer of trust and value to the
          digital assets.
        </p>
      </div>
    </div>
  );
};

export default NonFungibleTokensIssuePage;
