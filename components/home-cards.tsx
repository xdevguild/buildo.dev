import { HomeCard } from '@/components/home-card';
import { operationsMenuConfig } from '@/lib/operations-menu-config';

export const HomeCards = () => {
  return (
    <>
      <div className="mb-6 flex flex-row flex-wrap gap-6">
        {/* TODO: replace all onClicks with paths when all pages are ready */}
        <HomeCard
          title="General operations"
          description="General operations on the chain. Like managing accounts, herotags, multi-transfers, and interaction with custom smart contracts. New ones will be added over time."
          items={operationsMenuConfig['general-operations']}
        />
        <HomeCard
          title="Utilities"
          description="Helpful tools. Like transaction decoding or data converters. New ones will be added over time."
          items={operationsMenuConfig.utilities}
        />
      </div>
      <div className="flex flex-row flex-wrap gap-6">
        <HomeCard
          title="Fungible tokens"
          description="Operations related to Fungible ESDTs."
          items={operationsMenuConfig['fungible-tokens']}
        />
        <HomeCard
          title="Non-fungible tokens"
          description="Operations related to Non-fungible ESDTs."
          items={operationsMenuConfig['non-fungible-tokens']}
        />
        <HomeCard
          title="Semi-fungible tokens"
          description="Operations related to Semi-fungible ESDTs."
          items={operationsMenuConfig['semi-fungible-tokens']}
        />
        <HomeCard
          title="Meta tokens"
          description="Operations related to Meta ESDTs."
          items={operationsMenuConfig['meta-tokens']}
        />
      </div>
    </>
  );
};
