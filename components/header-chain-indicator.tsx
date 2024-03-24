'use client';

import { useConfig } from '@useelven/core';
import { Separator } from '@/components/ui/separator';

export const HeaderChainIndicator = () => {
  const { chainType } = useConfig();

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-1 bg-[hsl(var(--background))]/60 py-1 text-center text-[9px] font-light backdrop-blur">
        <div className="flex items-center justify-center gap-1">
          <div className="mr-1 mt-[-1px] flex h-2 w-2 rounded-full bg-green-700 dark:bg-green-200" />{' '}
          <div>You are using MultiversX</div>{' '}
          <div className="font-bold capitalize">{chainType}</div>
        </div>
        <div>
          Switch to{' '}
          <a
            href={
              chainType === 'mainnet'
                ? 'https://www.devnet.buildo.dev'
                : 'https://www.buildo.dev'
            }
            target="_blank"
            className="underline"
          >
            {chainType === 'mainnet' ? 'Devnet' : 'Mainnet'}
          </a>
          ?
        </div>
      </div>
      <Separator />
    </>
  );
};
