import type { Metadata, NextPage } from 'next';
import { FreezeUnfreezeSingle } from '../../components/freeze-unfreeze-single';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Freeze/Unfreeze a single non-fungible ESDT',
  description:
    'The manager of an ESDT token may freeze the non-fungible ESDT held by a specific Account. As a consequence, no non-fungible ESDT can be transferred to or from the frozen Account.',
  pagePath: '/non-fungible-tokens/freeze-toggle',
});

const NonFungibleFreezeTogglePage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl leading-none font-semibold tracking-tight">
          Freeze/Unfreeze a single non-fungible ESDT
        </h1>
        <p className="text-muted-foreground text-sm">
          The manager of an ESDT token may freeze the non-fungible ESDT held by
          a specific Account. As a consequence, no non-fungible ESDT can be
          transferred to or from the frozen Account. Freezing and unfreezing a
          single non-fungible ESDT of an Account are operations designed to help
          token managers to comply with regulations.
        </p>
      </div>
      <FreezeUnfreezeSingle tokenType="non-fungible" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          The capability to freeze non-fungible tokens (NFTs) within the
          eStandard Digital Token (ESDT) framework provides token managers with
          a powerful tool for regulatory compliance and asset control. When a
          manager freezes an NFT, the specific account holding that NFT is
          restricted from executing any transfers, effectively immobilizing the
          asset. This feature is essential for managing risk and enforcing
          compliance with legal frameworks that may require intervention in the
          transfer of digital assets under certain circumstances. Such
          functionality not only aids in adhering to regulatory requirements but
          also ensures that token ecosystems maintain integrity and trust among
          users.
        </p>
        <p className="mb-3">
          Unfreezing a non-fungible ESDT is equally critical as it allows for
          the restoration of liquidity and transferability to the asset, which
          can be crucial for the account holder. These operations, while
          straightforward, play a significant role in the broader scope of
          digital asset management, offering token managers the flexibility to
          respond to legal orders, participate in judicial proceedings, or
          simply manage their assets more effectively. For platforms
          implementing ESDT, providing clear guidelines and tools for these
          processes is crucial in fostering a secure and compliant trading
          environment. This ability significantly enhances the utility and
          governance of digital assets, making the ESDT framework a versatile
          choice for developers and asset managers in the blockchain space.
        </p>
      </div>
    </div>
  );
};

export default NonFungibleFreezeTogglePage;
