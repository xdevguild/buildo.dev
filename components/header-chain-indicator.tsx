'use client';

import { useConfig } from '@useelven/core';

export const HeaderChainIndicator = () => {
  const { chainType } = useConfig();

  return (
    <div className="flex items-center flex-col sm:flex-row justify-center gap-1 text-xs bg-zinc-100 dark:bg-zinc-900 py-1 text-center font-light">
      <div className="flex items-center justify-center gap-1">
        <div className="flex h-2 w-2 mt-[-1px] rounded-full bg-green-700 dark:bg-green-200 mr-1" />{' '}
        <div>You are using MultiversX</div>{' '}
        <div className="capitalize font-bold">{chainType}</div>
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
