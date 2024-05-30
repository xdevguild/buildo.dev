import type { NextPage } from 'next';
import { ChangeProperties } from '../../components/change-properties';
import { Separator } from '@/components/ui/separator';

const MetaChangePropertiesPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Change properties of a meta ESDT
        </h1>
        <p className="text-sm text-muted-foreground">
          The manager of an meta ESDT token may individually change any of the
          properties of the token, or multiple properties at once. The token
          should have the canUpgrade property set to true. <br />
          <br />
          <strong>
            Due to API caching, changes may not be visible immediately.
          </strong>
        </p>
      </div>
      <ChangeProperties tokenType="meta" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          In the MultiversX ecosystem, the manager of a meta ESDT (NFT) token
          holds the authority to modify the properties of the token. This
          capability allows the manager to adjust individual or multiple
          properties simultaneously to adapt to evolving needs or market
          conditions. However, for these modifications to be permissible, the
          token must have the canUpgrade property enabled. When this property is
          active, it signifies that the token&apos;s attributes are not fixed
          and can be upgraded or changed post-issuance, providing significant
          flexibility in managing the token&apos;s lifecycle and utility.
        </p>
        <p className="mb-3">
          This feature is especially important for NFTs on the MultiversX
          platform, as it supports continuous improvement and adaptation of
          token attributes. It allows token managers to respond to user
          feedback, technological advancements, or regulatory changes by
          updating the token&apos;s properties. By enabling the canUpgrade
          property, MultiversX ensures that NFTs can remain relevant and
          functional over time, enhancing their value and utility in a dynamic
          digital asset environment. This adaptability is crucial for
          maintaining the competitiveness and usefulness of NFTs within the
          ever-evolving landscape of blockchain technologies.
        </p>
      </div>
    </div>
  );
};

export default MetaChangePropertiesPage;
