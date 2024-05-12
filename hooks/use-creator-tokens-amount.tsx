import { useAccount, useApiCall } from '@useelven/core';
import { useEffect } from 'react';

const useAccountTokensTypes = [
  'fungible',
  'non-fungible',
  'semi-fungible',
  'meta',
] as const;

export type AccountTokens = {
  tokenType: (typeof useAccountTokensTypes)[number];
  onlyOwner?: boolean;
  txFinalized?: boolean;
};

const typesMap = {
  fungible: 'FungibleESDT',
  'non-fungible': 'NonFungibleESDT',
  'semi-fungible': 'SemiFungibleESDT',
  meta: 'MetaESDT',
};

/**
 * Get tokens data where the logged-in address is an owner, and the address has more than 0  amount.
 */
export function useCreatorTokensAmount<T extends Record<string, unknown>>({
  tokenType,
  onlyOwner = true,
  txFinalized,
}: AccountTokens) {
  const { address } = useAccount();
  const { data, fetch } = useApiCall<T[] | undefined>({
    url: `/accounts/${address}/${
      tokenType === 'fungible'
        ? 'tokens'
        : `collections?type=${typesMap[tokenType]}`
    }`,
    autoInit: Boolean(address) && Boolean(typesMap[tokenType]),
  });

  const tokens = onlyOwner
    ? data?.filter((token) => token.owner === address)
    : data;

  // Refetch after transaction hash is available = tx finalized
  useEffect(() => {
    if (txFinalized) {
      fetch();
    }
  }, [fetch, txFinalized]);

  return {
    tokens,
    refetch: fetch,
  };
}
