import { CommonOpertationContentProps } from '@/app/(operations)/components/operations-ui/operations-common-types';
import { OperationsSelectField } from '@/app/(operations)/components/operations-ui/operations-select-field';
import { useCreatorTokens } from '@/hooks/use-creator-tokens';
import { getTokenIdKey } from '@/lib/get-token-id';

/**
 * Input for tokenId where the logged-in user is a token manager, and there is 0 or more amount.
 * @param tokenType
 */
export const OperationsTokenIdInput = ({
  tokenType,
  description = 'Please provide your token id',
  name = 'tokenId',
}: {
  tokenType: CommonOpertationContentProps['tokenType'];
  description?: string;
  name?: string;
}) => {
  const { tokens } = useCreatorTokens<{
    identifier: string;
    collection: string;
    isPaused: boolean;
  }>({
    tokenType,
  });

  return (
    <OperationsSelectField
      name={name}
      label="Token id"
      description={description}
      options={
        tokens
          ? tokens
              ?.sort((a, b) => {
                const aTokenId = a[getTokenIdKey(tokenType)];
                const bTokenId = b[getTokenIdKey(tokenType)];
                if (aTokenId < bTokenId) return -1;
                if (aTokenId > bTokenId) return 1;
                return 0;
              })
              .map((token) => ({
                value: token[getTokenIdKey(tokenType)],
                label: token[getTokenIdKey(tokenType)],
              }))
          : []
      }
    />
  );
};
