import { CommonOpertationContentProps } from '@/app/(operations)/components/operations-ui/operations-common-types';

export const getTokenIdKey = (
  tokenType: CommonOpertationContentProps['tokenType']
) => (tokenType === 'fungible' ? 'identifier' : 'collection');
