'use client';

import { useAccount, useConfig } from '@useelven/core';
import { Authenticated } from '@/components/elven-ui/authenticated';
import { shortenHash } from '@/lib/shorten-hash';

export const HeaderAddress = () => {
  const { address } = useAccount();
  const { explorerAddress } = useConfig();

  return (
    <Authenticated>
      <a
        href={`${explorerAddress}/address/${address}`}
        target="_blank"
        className="underline hidden min-[450px]:block"
      >
        {shortenHash(address, 6)}
      </a>
    </Authenticated>
  );
};
