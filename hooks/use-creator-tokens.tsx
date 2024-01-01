import { isValidAddress } from '@/lib/is-valid-address';
import { useAccount, useApiCall } from '@useelven/core';

const useAccountTokensTypes = [
  'fungible',
  'non-fungible',
  'semi-fungible',
  'meta',
] as const;

export type AccountTokens = {
  tokenType: (typeof useAccountTokensTypes)[number];
};

const typesMap = {
  fungible: 'FungibleESDT',
  'non-fungible': 'NonFungibleESDT',
  'semi-fungible': 'SemiFungibleESDT',
  meta: 'MetaESDT',
};

/**
 * Get tokens data where the logged-in address is an owner, even when the address has 0 amount.
 */
export function useCreatorTokens<T extends Record<string, unknown>>({
  tokenType,
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

  return {
    tokens: data,
    refetch: fetch,
  };
}
