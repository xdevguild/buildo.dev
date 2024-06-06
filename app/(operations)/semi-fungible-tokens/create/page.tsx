import type { Metadata, NextPage } from 'next';
import { Create } from './components/create';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Create a semi-fungible ESDT (SFT)',
  description:
    'A single address can own the role of creating an SFT for an ESDT token. This role can be transferred by using the ESDTNFTCreateRoleTransfer function.',
  pagePath: '/semi-fungible-tokens/create',
});

const SemiFungibleCreatePage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Create a semi-fungible ESDT (SFT)
        </h1>
        <p className="text-sm text-muted-foreground">
          A single address can own the role of creating an SFT for an ESDT
          token. This role can be transferred by using the
          ESDTNFTCreateRoleTransfer function. An SFT can be created on top of an
          existing ESDT by sending a transaction to self that contains the
          function call that triggers the creation. Any number of URIs can be
          assigned (minimum 1).
        </p>
      </div>
      <Create />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          In the realm of eStandard Digital Tokens (ESDT), a unique feature
          allows a single address to possess the role of creating Semi-Fungible
          Tokens (SFTs). This specific role ensures centralized control and
          oversight during the creation process, which can be particularly
          beneficial in scenarios where strict governance is required. To
          facilitate smooth transitions and adapt to changing management needs,
          this role can be effortlessly transferred to another address through
          the use of the ESDTNFTCreateRoleTransfer function. This feature
          enhances the flexibility and scalability of token management within
          the ecosystem. Additionally, an SFT can be seamlessly created atop an
          existing ESDT by initiating a transaction to one&apos;s own address,
          which includes the necessary function call to trigger the creation
          process. This mechanism supports the dynamic expansion of token
          functionalities and utilities.
        </p>
        <p className="mb-3">
          The flexibility of SFT creation is further exemplified by the ability
          to assign any number of Uniform Resource Identifiers (URIs) to a
          single token, with the minimum requirement being one. URIs are crucial
          as they link to resources that define the characteristics, metadata,
          or attributes of the token, providing essential information that can
          be accessed globally. This capability allows for extensive
          customization and enrichment of the token&apos;s identity, enhancing
          its appeal and utility in various applications such as digital art,
          collectibles, and interactive gaming assets. The integration of
          multiple URIs caters to complex use cases, where diverse information
          and assets associated with a single token are necessary for
          comprehensive interaction and utility in decentralized applications
          (dApps). This feature not only augments the token&apos;s functionality
          but also significantly boosts its marketability and relevance in the
          rapidly evolving digital asset landscape.
        </p>
      </div>
    </div>
  );
};

export default SemiFungibleCreatePage;
