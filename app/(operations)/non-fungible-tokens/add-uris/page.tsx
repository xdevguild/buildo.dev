import type { Metadata, NextPage } from 'next';
import { AddNftUris } from './components/add-nft-uris';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Add URIs (assets)',
  description:
    'An user that has the ESDTRoleNFTAddURI role set for a given ESDT, can add URIs to a given NFT.',
  pagePath: '/non-fungible-tokens/add-uris',
});

const NonFungibleAddUrisPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Add URIs (assets)
        </h1>
        <p className="text-sm text-muted-foreground">
          An user that has the ESDTRoleNFTAddURI role set for a given ESDT, can
          add URIs to a given NFT. Remember that the URIs will not replace the
          previous ones.
        </p>
      </div>
      <AddNftUris />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          In the context of blockchain and non-fungible tokens (NFTs), the
          ESDTRoleNFTAddURI role is a specific permission assigned to users that
          allows them to append additional Uniform Resource Identifiers (URIs)
          to a designated eStandard Digital Token (ESDT). This role is critical
          as it enables the dynamic updating of NFT metadata without altering
          the underlying asset. It&apos;s important to note that when a URI is
          added by a user with this role, it does not overwrite or replace any
          pre-existing URIs associated with the NFT. This functionality ensures
          that all historical data remains intact and accessible, providing a
          comprehensive digital footprint of the asset&apos;s evolution over
          time.
        </p>
        <p className="mb-3">
          This feature is particularly beneficial in various applications such
          as digital art, collectibles, and other blockchain-based assets where
          maintaining a record of updates, provenance, and additional
          information is crucial. The ability to add URIs without replacing
          previous ones allows for a more robust and detailed description of the
          NFT, which can enhance its value, provenance, and appeal to
          collectors. For platforms and projects utilizing this feature,
          it&apos;s important to ensure that users understand their roles and
          the implications of adding URIs, as this can significantly impact the
          user experience and the perceived value of the NFTs.
        </p>
      </div>
    </div>
  );
};

export default NonFungibleAddUrisPage;
