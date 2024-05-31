import type { Metadata, NextPage } from 'next';
import { ChangeProperties } from '../../components/change-properties';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'Buildo.dev - MultiversX: Change properties of a non-fungible ESDT',
  description:
    'The manager of an non-fungible ESDT token may individually change any of the properties of the token, or multiple properties at once.',
  pagePath: '/non-fungible-tokens/properties-management',
});

const NonFungibleChangePropertiesPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Change properties of a non-fungible ESDT
        </h1>
        <p className="text-sm text-muted-foreground">
          The manager of an non-fungible ESDT token may individually change any
          of the properties of the token, or multiple properties at once. The
          token should have the canUpgrade property set to true. <br />
          <br />
          <strong>
            Due to API caching, changes may not be visible immediately.
          </strong>
        </p>
      </div>
      <ChangeProperties tokenType="non-fungible" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          The flexibility of managing non-fungible tokens (NFTs) in the
          MultiversX network is significantly enhanced by the feature that
          allows a token&apos;s manager to modify its properties. For managers
          of non-fungible ESDT tokens, it is possible to adjust one or several
          attributes of a token simultaneously, depending on the specific needs
          or changes in strategy. This capability is contingent on the token
          having the canUpgrade property enabled. When set to true, the
          canUpgrade property provides token managers with the authority to
          update characteristics such as the token&apos;s metadata, visual
          representation, or associated utilities, which can be crucial for
          aligning the token with evolving market trends or user demands.
        </p>
        <p className="mb-3">
          Enabling the canUpgrade feature is vital for maintaining the relevance
          and functionality of non-fungible tokens over time. This property
          ensures that NFTs can be dynamically updated to meet regulatory
          requirements, enhance user engagement, or incorporate technological
          advancements. By allowing property modifications, token managers can
          react promptly to changes in the ecosystem or shifts in consumer
          preferences, ensuring that their NFTs remain competitive and valuable.
          This adaptability is a key component of the long-term success and
          utility of non-fungible tokens within the MultiversX network, making
          it an essential feature for token issuers and managers aiming to
          maximize the impact and reach of their digital assets.
        </p>
      </div>
    </div>
  );
};

export default NonFungibleChangePropertiesPage;
