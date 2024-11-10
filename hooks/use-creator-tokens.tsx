import { isValidAddress } from '@/lib/is-valid-address';
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
  txFinalized?: boolean;
};

/**
 * Get tokens data where the logged-in address is an owner, even when the address has 0 amount.
 */
export function useCreatorTokens<T extends Record<string, unknown>>({
  tokenType,
  txFinalized,
}: AccountTokens) {
  const { address } = useAccount();
  const { data, fetch } = useApiCall<T[] | undefined>({
    url: `/accounts/${address}/roles/${
      tokenType === 'fungible'
        ? 'tokens'
        : `collections?type=${typesMap[tokenType]}`
    }`,
    autoInit: Boolean(typesMap[tokenType]) && isValidAddress(address),
  });

  // Refetch after transaction hash is available = tx finalized
  useEffect(() => {
    if (txFinalized) {
      fetch();
    }
  }, [fetch, txFinalized]);

  return {
    tokens: data,
    refetch: fetch,
  };
}
