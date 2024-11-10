import { isValidAddress } from '@/lib/is-valid-address';
import { useApiCall } from '@useelven/core';

const typesMap = {
  fungible: 'FungibleESDT',
  'non-fungible': 'NonFungibleESDT',
  'semi-fungible': 'SemiFungibleESDT',
  meta: 'MetaESDT',
} as const;

type TokenType = keyof typeof typesMap;

type AccountTokens = {
  tokenType: TokenType;
  tokenId: string;
  address: string;
};

/**
 * Token roles for any address
 */
export function useTokenRolesByAccount({
  tokenType,
  tokenId,
  address,
}: AccountTokens) {
  const { data, fetch } = useApiCall<{ role: { roles: string[] } }>({
    url: `/accounts/${address}/roles/${
      tokenType === 'fungible' ? 'tokens' : 'collections'
    }/${tokenId}`,
    autoInit:
      Boolean(typesMap[tokenType]) &&
      Boolean(tokenId) &&
      isValidAddress(address),
  });

  return {
    roles: data?.role?.roles,
    refetch: fetch,
  };
}
