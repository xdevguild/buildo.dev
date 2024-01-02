import { useCreatorTokensAmount } from '@/hooks/use-creator-tokens-amount';
import { CommonOpertationContentProps } from '@/components/operations/operations-common-types';
import { OperationsSelectField } from '@/components/operations/operations-select-field';

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
          ? tokens?.map((token) => ({
              value: token.identifier || token.collection,
              label: token.identifier || token.collection,
            }))
          : []
      }
    />
  );
};
