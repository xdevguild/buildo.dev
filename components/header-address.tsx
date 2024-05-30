'use client';

import { useAccount, useConfig } from '@useelven/core';
import { Authenticated } from '@/components/elven-ui/authenticated';
import { shortenHash } from '@/lib/shorten-hash';
import { Copy, CopyCheck } from 'lucide-react';
import { useState } from 'react';

export const HeaderAddress = () => {
  const [copied, setCopied] = useState(false);
  const { address } = useAccount();
  const { explorerAddress } = useConfig();

  const onCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    const timeout = setTimeout(() => {
      setCopied(false);
      clearTimeout(timeout);
    }, 1000);
  };

  return (
    <Authenticated>
      <div className="hidden items-center gap-2 underline md:flex">
        <a href={`${explorerAddress}/address/${address}`} target="_blank">
          {shortenHash(address, 6)}
        </a>
        {copied ? (
          <CopyCheck width={16} height={16} className="cursor-pointer" />
        ) : (
          <Copy
            width={16}
            height={16}
            onClick={onCopy}
            className="cursor-pointer"
          />
        )}
      </div>
    </Authenticated>
  );
};
