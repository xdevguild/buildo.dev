import { FC, MouseEventHandler } from 'react';
import { PairingTypesStruct } from '@useelven/core';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WalletConnectPairingsProps {
  pairings: PairingTypesStruct[];
  login: (topic: string) => Promise<void>;
  remove: (topic: string) => Promise<void>;
}

export const WalletConnectPairings: FC<WalletConnectPairingsProps> = ({
  pairings,
  login,
  remove,
}) => {
  const handleLogin = (topic: string) => () => {
    login(topic);
  };

  const handleRemove =
    (topic: string): MouseEventHandler<HTMLButtonElement> | undefined =>
    (e) => {
      e.stopPropagation();
      remove(topic);
    };

  return (
    <div className="flex flex-row justify-center">
      <div className="w-full sm:w-4/5">
        {pairings?.length > 0 && (
          <div className="mt-4 text-base">Existing pairings:</div>
        )}
        {pairings.map((pairing) => (
          <div
            className="relative my-3 cursor-pointer select-none rounded-md border border-solid border-zinc-300 bg-white px-4 py-2 pr-8 dark:border-0 dark:bg-slate-900"
            key={pairing.topic}
            onClick={handleLogin(pairing.topic)}
          >
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-2 h-7 w-7"
              onClick={handleRemove(pairing.topic)}
            >
              <X size="16" />
            </Button>
            <div className="text-lg">{pairing.peerMetadata?.name}</div>
            {pairing.peerMetadata?.url ? (
              <div className="text-xs">({pairing.peerMetadata.url})</div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
