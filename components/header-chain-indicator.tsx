'use client';

import { useConfig } from '@useelven/core';

export const HeaderChainIndicator = () => {
  const { chainType } = useConfig();

  return (
    <div className="flex flex-col items-center justify-center gap-1 bg-zinc-100 py-1 text-center text-xs font-light dark:bg-zinc-900 sm:flex-row">
      <div className="flex items-center justify-center gap-1">
        <div className="mr-1 mt-[-1px] flex h-2 w-2 rounded-full bg-green-700 dark:bg-green-200" />{' '}
        <div>You are using MultiversX</div>{' '}
        <div className="font-bold capitalize">{chainType}</div>
      </div>
      <div>
        (Do you want to switch to{' '}
        <a
          href={
            chainType === 'mainnet'
              ? 'https://www.devnet.buildo.dev'
              : 'https://www.buildo.dev'
          }
          target="_blank"
          className="capitalize underline"
        >
          {chainType === 'mainnet' ? 'devnet' : 'mainnet'}
        </a>
        ?)
      </div>
    </div>
  );
};
