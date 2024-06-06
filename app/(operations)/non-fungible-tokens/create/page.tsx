import type { Metadata, NextPage } from 'next';
import { Create } from './components/create';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Create a non-fungible ESDT (NFT)',
  description:
    'A single address can own the role of creating an NFT for an ESDT token. This role can be transferred by using the ESDTNFTCreateRoleTransfer function.',
  pagePath: '/non-fungible-tokens/create',
});

const NonFungibleCreatePage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Create a non-fungible ESDT (NFT)
        </h1>
        <p className="text-sm text-muted-foreground">
          A single address can own the role of creating an NFT for an ESDT
          token. This role can be transferred by using the
          ESDTNFTCreateRoleTransfer function. An NFT can be created on top of an
          existing ESDT by sending a transaction to self that contains the
          function call that triggers the creation. Any number of URIs can be
          assigned (minimum 1).
        </p>
      </div>
      <Create />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          In the realm of blockchain technology, the capability of a single
          address to own the role of creating a Non-Fungible Token (NFT) for an
          eStandard Digital Token (ESDT) simplifies the process of NFT creation.
          By utilizing the ESDTNFTCreateRoleTransfer function, this creation
          role can efficiently be transferred between different addresses. This
          feature is pivotal for developers and token holders who wish to
          delegate or shift creative responsibilities within the network.
          Additionally, the creation of an NFT atop an existing ESDT is
          facilitated by sending a specific transaction to oneself, which must
          include the necessary function call to initiate the NFT&apos;s
          creation. This process highlights the flexible and user-centric design
          of the MultiversX network in managing digital assets.
        </p>
        <p className="mb-3">
          Furthermore, the flexibility in assigning Uniform Resource Identifiers
          (URIs) to the NFTs is another critical aspect of their creation. Each
          NFT must have at least one URI, which serves as a digital pointer to
          the token&apos;s metadata, providing essential information such as its
          origin, attributes, and ownership history. The ability to assign
          multiple URIs allows for a richer representation and accessibility of
          the NFTs across different platforms and services. This adaptability is
          essential for artists, creators, and developers who seek to enhance
          the visibility and interoperability of their digital assets. The
          seamless integration of these features within the MultiversX platform
          ensures that users have a robust and scalable system for managing and
          transferring unique digital assets in a secure environment.
        </p>
      </div>
    </div>
  );
};

export default NonFungibleCreatePage;
