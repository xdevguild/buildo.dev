import type { Metadata, NextPage } from 'next';
import { ClaimDevRewards } from './components/claim-dev-rewards';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Claim developer rewards',
  description:
    'This function is to be used by Smart Contract owners in order to claim the fees accumulated during smart contract calls.',
  pagePath: '/general-operations/claim-developer-rewards',
});

const ClaimDevRewardsPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl leading-none font-semibold tracking-tight">
          Claim developer rewards
        </h1>
        <p className="text-muted-foreground text-sm">
          This function is to be used by Smart Contract owners in order to claim
          the fees accumulated during smart contract calls.
          <br />
          Currently, the developer reward is set to 30% of the fee of each smart
          contract call.
        </p>
      </div>
      <ClaimDevRewards />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          This function serves as a vital tool for Smart Contract owners,
          facilitating the process by which they can claim fees that have
          accrued due to transactions and interactions within the smart
          contract. By streamlining this process, the function ensures that
          Smart Contract owners can efficiently recover the fees that are
          generated from each contract call, thereby maintaining the financial
          sustainability and operational efficacy of their contracts.
        </p>
        <p>
          Currently, the reward system for developers is structured to provide a
          significant incentive, where developers are entitled to a 30% share of
          the fees from each smart contract call. This generous provision is
          designed to encourage ongoing development and support, ensuring that
          developers are motivated to continuously enhance the smart
          contract&apos;s capabilities and stability, which is crucial for the
          long-term success of any blockchain-based system.
        </p>
      </div>
    </div>
  );
};

export default ClaimDevRewardsPage;
