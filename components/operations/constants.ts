// Build in address for tokens operations
export const builtInSC =
  'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u';

// Predefined one time payment for token issuance (EGLD amount)
export const issueTokenPayment = '0.05';

export const commonOpertationsGasLimit = 60_000_000;
export const commonBuiltInOpertationsGasLimit = 6_000_000;
export const nftSftCreateOpertationsGasLimit = 3_000_000;
export const specialOpertationsGasLimit = 300_000;
// TODO: this should come from TransferTransactionsFactory and GasEstimator, waits for useElven changes
export const transfersOperationsGasLimit = 600_000;

export interface TokenPropertyOrRole {
  name: string;
  description: string;
}

export const esdtTokenProperties: TokenPropertyOrRole[] = [
  {
    name: 'canFreeze',
    description:
      'The token manager may freeze the token balance in a specific account, preventing transfers to and from that account',
  },
  {
    name: 'canWipe',
    description:
      'The token manager may wipe out the tokens held by a frozen account, reducing the supply',
  },
  {
    name: 'canPause',
    description:
      'The token manager may prevent all transactions of the token, apart from minting and burning',
  },
  {
    name: 'canChangeOwner',
    description: 'Token management can be transferred to a different account',
  },
  {
    name: 'canUpgrade',
    description: 'The token manager may change these properties',
  },
  {
    name: 'canAddSpecialRoles',
    description: 'The token manager can assign a specific role(s)',
  },
  // TODO: not available yet
  // {
  //   name: 'canCreateMultiShard',
  //   description:
  //     'if true, then local mint/burn can be used so the token will be distributed among shards',
  // },
];

export const sftNftTokenProperties: TokenPropertyOrRole[] = [
  ...esdtTokenProperties,
  {
    name: 'canTransferNFTCreateRole',
    description: 'the token manager can transfer NFT/SFT/Meta creation role',
  },
];

const ESDTTransferRole = {
  name: 'ESDTTransferRole',
  description:
    'this role restricts transferability of the token only to the addresses that have the role set, while these addresses can send to any address',
};

const ESDTRoleNFTCreate = {
  name: 'ESDTRoleNFTCreate',
  description: 'this role allows one to create a new NFT/SFT/Meta',
};

const ESDTRoleNFTBurn = {
  name: 'ESDTRoleNFTBurn',
  description:
    'this role allows one to burn quantity of a specific NFT/SFT/Meta',
};

export const esdtTokenSpecialRoles: TokenPropertyOrRole[] = [
  {
    name: 'ESDTRoleLocalBurn',
    description: 'an address with this role can burn tokens',
  },
  {
    name: 'ESDTRoleLocalMint',
    description: 'an address with this role can mint new tokens',
  },
  ESDTTransferRole,
];

export const sftTokenSpecialRoles = [
  ESDTRoleNFTCreate,
  ESDTRoleNFTBurn,
  {
    name: 'ESDTRoleNFTAddQuantity',
    description: 'this role allows one to add quantity of a specific SFT',
  },
  ESDTTransferRole,
];

export const nftTokenSpecialRoles = [
  ESDTRoleNFTCreate,
  ESDTRoleNFTBurn,
  {
    name: 'ESDTRoleNFTUpdateAttributes',
    description:
      'this role allows one to change the attributes of a specific NFT',
  },
  {
    name: 'ESDTRoleNFTAddURI',
    description: 'this role allows one add URIs for a specific NFT',
  },
  ESDTTransferRole,
];
