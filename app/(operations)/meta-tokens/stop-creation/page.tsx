import type { Metadata, NextPage } from 'next';
import { StopCreation } from '../../components/stop-creation';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'Buildo.dev - MultiversX: Stop creation',
  description:
    'The ESDT manager can stop the creation of the token for the given ESDT forever by removing the only ESDTRoleNFTCreate role available.',
  pagePath: '/meta-tokens/stop-creation',
});

const MetaStopCreationPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Stop creation
        </h1>
        <p className="text-sm text-muted-foreground">
          The ESDT manager can stop the creation of the token for the given ESDT
          forever by removing the only ESDTRoleNFTCreate role available.
        </p>
      </div>
      <StopCreation tokenType="meta" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          Within the MultiversX blockchain ecosystem, the role of an ESDT
          manager encompasses significant responsibilities, including the
          ability to halt the creation of tokens permanently. This is achieved
          by removing the sole ESDTRoleNFTCreate role assigned to any address.
          Once this role is eliminated, no further tokens can be created under
          the given ESDT, effectively freezing its issuance. This feature serves
          as a critical control mechanism, providing token managers with the
          power to close the token issuance as required, whether for reasons of
          compliance, market stability, or strategic realignment.
        </p>
        <p className="mb-3">
          This ability to stop token creation is an important aspect of token
          lifecycle management in the MultiversX platform. It ensures that token
          managers have the ultimate control over the supply and issuance of
          their tokens, which can be crucial for maintaining the token&apos;s
          value and relevance. By providing such definitive control measures,
          MultiversX empowers token managers to uphold stringent governance
          standards and adapt to evolving economic and regulatory landscapes,
          thus safeguarding the integrity and utility of the digital assets
          within its network.
        </p>
      </div>
    </div>
  );
};

export default MetaStopCreationPage;
