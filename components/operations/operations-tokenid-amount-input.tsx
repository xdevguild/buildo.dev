import { useCreatorTokensAmount } from '@/hooks/use-creator-tokens-amount';
import { CommonOpertationContentProps } from '@/components/operations/operations-common-types';
import { OperationsSelectField } from '@/components/operations/operations-select-field';
import { getTokenIdKey } from '@/lib/get-token-id';

/**
 * Input for tokenId where the logged-in user is a token manager, and there is more than 0 amount.
 * @param tokenType
 */
export const OperationsTokenIdAmountInput = ({
  tokenType,
  onlyOwner = true,
}: {
  tokenType: CommonOpertationContentProps['tokenType'];
  onlyOwner?: boolean;
}) => {
  const { tokens } = useCreatorTokensAmount<{
    identifier: string;
    collection: string;
    isPaused: boolean;
  }>({
    tokenType,
    onlyOwner,
  });

  return (
    <OperationsSelectField
      name="tokenId"
      label="Token id"
      description="Please provide your token id"
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
