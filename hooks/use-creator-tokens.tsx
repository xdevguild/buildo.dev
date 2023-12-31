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
 * Tokens for currently logged in user where the user is also a creator
 */
export function useCreatorTokens<T extends Record<string, unknown>>({
  tokenType,
}: AccountTokens) {
  const { address } = useAccount();
  const { data, fetch } = useApiCall<T[] | undefined>({
    url: `/accounts/${address}/${
      tokenType === 'fungible' ? 'tokens' : 'collections'
    }?type=${typesMap[tokenType]}`,
    autoInit: Boolean(address) && Boolean(typesMap[tokenType]),
  });

  return {
    tokens: data?.filter((token) => token.owner === address),
    refetch: fetch,
  };
}
