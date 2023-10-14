'use client';

import { useConfig } from '@useelven/core';

export const HeaderChainIndicator = () => {
  const { chainType } = useConfig();

  return (
    <div className="flex items-center justify-center gap-1 text-xs bg-slate-100 dark:bg-slate-900 py-1 text-center font-light">
      <div className="flex h-2 w-2 mt-[-1px] rounded-full bg-green-700 dark:bg-green-200 mr-1" />{' '}
      <div>MultiversX</div>{' '}
      <div className="capitalize font-bold">{chainType}</div>
      <div>|</div>
      <div>
        Switch to{' '}
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
      </div>
    </div>
  );
};
