import { useAccount, useApiCall } from '@useelven/core';
import { useEffect } from 'react';

const typesMap = {
  fungible: 'FungibleESDT',
  'non-fungible': 'NonFungibleESDT',
  'semi-fungible': 'SemiFungibleESDT',
  meta: 'MetaESDT',
};

type TokenType = keyof typeof typesMap;

type AccountTokens = {
  tokenType: TokenType;
  onlyOwner?: boolean;
  txFinalized?: boolean;
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
