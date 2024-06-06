import type { Metadata, NextPage } from 'next';
import { ChangeProperties } from '../../components/change-properties';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Change properties of a semi-fungible ESDT',
  description:
    'The manager of an semi-fungible ESDT token may individually change any of the properties of the token, or multiple properties at once.',
  pagePath: '/semi-fungible-tokens/properties-management',
});

const SemiFungibleChangePropertiesPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Change properties of a semi-fungible ESDT
        </h1>
        <p className="text-sm text-muted-foreground">
          The manager of an semi-fungible ESDT token may individually change any
          of the properties of the token, or multiple properties at once. The
          token should have the canUpgrade property set to true. <br />
          <br />
          <strong>
            Due to API caching, changes may not be visible immediately.
          </strong>
        </p>
      </div>
      <ChangeProperties tokenType="semi-fungible" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          The flexibility in managing semi-fungible ESDT tokens is greatly
          enhanced by the ability of a token manager to modify its properties.
          This feature is crucial for adapting the token to changing market
          conditions, regulatory requirements, or technological advancements.
          For such alterations to be possible, it is imperative that the token
          is initially configured with the canUpgrade property enabled. This
          property allows the manager to individually or collectively update
          aspects of the token, such as its name, supply model, or even its
          operational rules, thus providing substantial adaptability and control
          over the token&apos;s lifecycle. The ability to upgrade a token is a
          powerful feature that can help maintain its relevance and utility in
          the rapidly evolving digital asset space, ensuring that it meets the
          needs and expectations of its holders.
        </p>
        <p className="mb-3">
          Enabling the canUpgrade feature on semi-fungible tokens offers token
          issuers a proactive tool for governance and strategic management. With
          this capability, token managers can respond efficiently to external
          pressures or opportunities by implementing necessary updates that can
          enhance functionality, security, or compliance with new laws. This
          adaptability not only safeguards the token&apos;s competitiveness but
          also boosts investor confidence, as stakeholders recognize the
          commitment to maintaining a robust and forward-thinking management
          approach. Ultimately, the canUpgrade property is a key factor in
          sustaining the viability and desirability of semi-fungible tokens,
          making them a versatile and practical choice for developers and
          investors in the blockchain ecosystem.
        </p>
      </div>
    </div>
  );
};

export default SemiFungibleChangePropertiesPage;
