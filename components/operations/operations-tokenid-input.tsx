import { CommonOpertationContentProps } from '@/components/operations/operations-common-types';
import { OperationsSelectField } from '@/components/operations/operations-select-field';
import { useCreatorTokens } from '@/hooks/use-creator-tokens';

/**
 * Input for tokenId where the logged-in user is a token manager, and there is 0 or more amount.
 * @param tokenType
 */
export const OperationsTokenIdInput = ({
  tokenType,
  description = 'Please provide your token id',
}: {
  tokenType: CommonOpertationContentProps['tokenType'];
  description?: string;
}) => {
  const { tokens } = useCreatorTokens<{ ticker: string; isPaused: boolean }>({
    tokenType,
  });

  return (
    <OperationsSelectField
      name="tokenId"
      label="Token id"
      description={description}
      options={
        tokens
          ? tokens?.map((token) => ({
              value: token.ticker,
              label: token.ticker,
            }))
          : []
      }
    />
  );
};
