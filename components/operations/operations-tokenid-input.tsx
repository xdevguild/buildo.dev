import { CommonOpertationContentProps } from '@/components/operations/operations-common-types';
import { OperationsSelectField } from '@/components/operations/operations-select-field';
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
          ? tokens?.map((token) => ({
              value: token[getTokenIdKey(tokenType)],
              label: token[getTokenIdKey(tokenType)],
            }))
          : []
      }
    />
  );
};
