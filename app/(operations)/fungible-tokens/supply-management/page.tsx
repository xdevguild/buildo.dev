import type { Metadata, NextPage } from 'next';
import { MintBurn } from './components/mint-burn';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Mint/Burn the supply of a fungible ESDT',
  description:
    'The manager of an ESDT token can increase/decrease the total supply by sending to the Metachain a transaction.',
  pagePath: '/fungible-tokens/supply-management',
});

const SupplyManagementPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl leading-none font-semibold tracking-tight">
          Mint/Burn the supply of a fungible ESDT
        </h1>
        <p className="text-muted-foreground text-sm">
          The manager of an ESDT token can increase/decrease the total supply by
          sending to the Metachain a transaction.
        </p>
      </div>
      <MintBurn />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          The manager of an ESDT (eStandard Digital Token) on the MultiversX
          blockchain possesses the authority to modify the token&apos;s total
          supply. This can be achieved by submitting a specific transaction to
          the Metachain, which serves as a central hub within the MultiversX
          network. The ability to increase or decrease the supply of tokens is a
          powerful tool for token management, allowing adjustments to be made in
          response to economic conditions, strategic initiatives, or community
          governance decisions. This feature is particularly valuable for
          projects that need to adapt to changing market dynamics or to
          implement mechanisms such as token burns or minting events for
          fundraising purposes. All changes to the token supply are conducted in
          a secure and transparent manner, ensuring trust and verifiability
          within the MultiversX ecosystem.
        </p>
      </div>
    </div>
  );
};

export default SupplyManagementPage;
