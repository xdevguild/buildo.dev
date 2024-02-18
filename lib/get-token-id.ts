import { CommonOpertationContentProps } from '@/components/operations/operations-common-types';

export const getTokenIdKey = (
  tokenType: CommonOpertationContentProps['tokenType']
) => (tokenType === 'fungible' ? 'identifier' : 'collection');
