import { bech32 } from 'bech32';

export const isValidAddress = (address: string) => {
  const decoded = bech32.decodeUnsafe(address);
  const prefix = decoded?.prefix;
  const pubkey = decoded
    ? Buffer.from(bech32.fromWords(decoded.words))
    : undefined;

  if (prefix !== 'erd' || pubkey?.length !== 32) {
    return false;
  }
  return true;
};
