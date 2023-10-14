import { ITransactionOnNetwork } from '@multiversx/sdk-core';
import { Buffer } from 'buffer';

export const getTokenIdAfterIssuingOrCreating = (
  transactionOnNetwork: ITransactionOnNetwork | null
) => {
  if (!transactionOnNetwork) return;

  let resultItem = transactionOnNetwork.logs.events.find((event) =>
    [
      'issue',
      'issueNonFungible',
      'issueSemiFungible',
      'registerMetaESDT',
    ].includes(event.identifier)
  );

  // Token id
  const issueFirstTopic = resultItem?.topics?.[0];

  if (issueFirstTopic) {
    return issueFirstTopic?.toString();
  }

  resultItem = transactionOnNetwork.logs.events.find((event) =>
    ['ESDTNFTCreate'].includes(event.identifier)
  );

  // Token id
  const createFirstTopic = resultItem?.topics?.[0];
  // Token nonce
  const createSecondTopic = resultItem?.topics?.[1];

  if (createFirstTopic && createSecondTopic) {
    return `${createFirstTopic.toString()}-${createSecondTopic.hex()}`;
  }
};

export const getSmartContractTxError = (
  transactionOnNetwork: ITransactionOnNetwork | null
) => {
  if (!transactionOnNetwork) return;

  const error = transactionOnNetwork.logs.events.find(
    (event) => event.identifier === 'signalError'
  );

  if (!error?.data) return;

  return Buffer.from(error.data.replace('@', ''), 'hex').toString('utf8');
};
