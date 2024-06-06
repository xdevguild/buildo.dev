import type { Metadata, NextPage } from 'next';
import { PauseUnpause } from './components/pause-unpause';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Pause/Unpause transactions of a fungible ESDT',
  description:
    'The manager of an ESDT token may choose to suspend all transactions of the token, except minting, freezing/unfreezing and wiping.',
  pagePath: '/fungible-tokens/pause-toggle',
});

const PauseTogglePage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Pause/Unpause transactions of a fungible ESDT
        </h1>
        <p className="text-sm text-muted-foreground">
          The manager of an ESDT token may choose to suspend all transactions of
          the token, except minting, freezing/unfreezing and wiping. These two
          operations require that the option canPause is set to true.
        </p>
      </div>
      <PauseUnpause />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          The manager of an ESDT (eStandard Digital Token) on the MultiversX
          blockchain has the capability to control and regulate transactions of
          the token to ensure security and compliance. Specifically, the manager
          can suspend almost all types of transactions, with the exception of
          several key operations: minting, freezing/unfreezing, and wiping of
          the tokens. This selective suspension is enabled by setting the
          canPause option to true within the token&apos;s configuration
          settings. This feature is particularly useful for token administrators
          who need to quickly respond to security issues or comply with
          regulatory requirements. By allowing the minting, freezing, and
          unfreezing operations to continue, the token&apos;s functionality and
          liquidity can be maintained even while other transactions are halted.
          It&apos;s important for users and developers interacting with ESDT
          tokens on the MultiversX blockchain to understand these management
          features, as they are crucial for maintaining the integrity and
          utility of digital assets within this ecosystem.
        </p>
      </div>
    </div>
  );
};

export default PauseTogglePage;
