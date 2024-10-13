export const operationsMenuConfig: Record<
  string,
  { title: string; description: string; path: string; disabled?: boolean }[]
> = {
  'general-operations': [
    {
      title: 'Send EGLD',
      description: 'Send EGLD native tokens',
      path: '/general-operations/send-egld',
    },
    {
      title: 'Claim developer rewards',
      description:
        "Claim dev rewards from your smart contract. You have to use the owner's wallet address when calling it",
      path: '/general-operations/claim-developer-rewards',
    },
    {
      title: 'Change owner address',
      description:
        'You can change the owner address of the smart contract you own',
      path: '/general-operations/change-owner-address',
    },
    {
      title: 'Account storage',
      description:
        'A wallet owner can store key-value pairs by using the built-in function SaveKeyValue which receives any number of key-value pairs.',
      path: '/general-operations/account-storage',
    },
    {
      title: 'Set a herotag (DNS) [Mainnet only]',
      description:
        'Create a herotag (DNS name for your address) and assign it to your address (transaction fees applied). Works only on the Mainnet.',
      path: '/general-operations/herotag',
    },
    {
      title: 'Multi transfer',
      description:
        'You can transfer multiple ESDTs at once (FT, NFT, SFT, Meta)',
      path: '/general-operations/multi-transfer',
    },
    {
      title: 'Sign a message',
      description: 'You can sign any message using your wallet',
      path: '/general-operations/sign-message',
    },
    {
      title: 'Create Inscription',
      description:
        'Send custom data on chain. You can then use it off-chain or for NFTs. (The structure of the data may change!)',
      path: '/general-operations/inscriptions',
    },
  ],
  utilities: [
    {
      title: 'Data converters',
      description: 'A set of data converters',
      path: '/utilities/data-converters',
    },
    {
      title: 'Decode transaction',
      description:
        'It uses sdk-transaction-decoder. It takes base64 encoded data, or data string.',
      path: '/utilities/decode-transaction',
    },
    {
      title: 'Check token data',
      description: 'Check the most important data of any token',
      path: '/utilities/token-data',
    },
    {
      title: 'Check address data',
      description: 'Check the most important data of any address',
      path: '/utilities/address-data',
    },
    {
      title: 'Verify a signature',
      description: 'Verify previously signed message',
      path: '/utilities/verify-signature',
    },
    {
      title: 'Hash functions',
      description: 'Hash data using different hash functions',
      path: '#',
      disabled: true,
    },
    {
      title: 'Read account storage',
      description: 'Check account storage by key',
      path: '#',
      disabled: true,
    },
  ],
  'fungible-tokens': [
    {
      title: 'Issue',
      description: 'Issue a new fungible ESDT',
      path: '/fungible-tokens/issue',
    },
    {
      title: 'Special roles',
      description: 'Set special roles for a newly created fungible ESDT',
      path: '/fungible-tokens/roles-management',
    },
    {
      title: 'Mint/Burn supply',
      description:
        'Mint/burn a fungible ESDT supply (requires ESDTRoleLocalBurn, ESDTRoleLocalMint roles)',
      path: '/fungible-tokens/supply-management',
    },
    {
      title: 'Pause/Unpause',
      description:
        'Pause/unpause all transactions of the token (requires canPause property)',
      path: '/fungible-tokens/pause-toggle',
    },
    {
      title: 'Freeze/Unfreeze',
      description:
        'Freeze/unfreeze the token balance in a specific account, preventing transfers to and from that account (requires canFreeze property)',
      path: '/fungible-tokens/freeze-toggle',
    },
    {
      title: 'Wipe',
      description:
        'Wipe out the tokens held by a previously frozen account, reducing the supply (Wiping the tokens of an Account is an operation designed to help token managers to comply with regulations.)',
      path: '/fungible-tokens/wipe',
    },
    {
      title: 'Transfer ownership',
      description:
        'The manager of an ESDT may transfer the management rights to another Account. This operation requires that the canChangeOwner property is set to true.',
      path: '/fungible-tokens/transfer-ownership',
    },
    {
      title: 'Change properties',
      description:
        'Change ESDT properties added when issuing the token, the canUpgrade property has to be previously assigned',
      path: '/fungible-tokens/change-properties',
    },
    {
      title: 'Send',
      description: 'Send ESDT',
      path: '/fungible-tokens/send',
    },
  ],
  'non-fungible-tokens': [
    {
      title: 'Issue',
      description: 'Issue a new non-fungible ESDT (NFT)',
      path: '/non-fungible-tokens/issue',
    },
    {
      title: 'Special roles',
      description: 'Set special roles for a newly created non-fungible ESDT',
      path: '/non-fungible-tokens/roles-management',
    },
    {
      title: 'Create NFT',
      description: 'Create a new non-fungible ESDT',
      path: '/non-fungible-tokens/create',
    },
    {
      title: 'Transfer creation role',
      description:
        'The token manager can transfer the creation role from one address to another.',
      path: '/non-fungible-tokens/transfer-creation-role',
    },
    {
      title: 'Stop creation',
      description:
        'The ESDT manager can stop the creation of the token for the given ESDT forever by removing the only ESDTRoleNFTCreate role available.',
      path: '/non-fungible-tokens/stop-creation',
    },
    {
      title: 'Transfer ownership',
      description:
        'The manager of an ESDT may transfer the management rights to another Account. This operation requires that the canChangeOwner property is set to true.',
      path: '/non-fungible-tokens/transfer-ownership',
    },
    {
      title: 'Change properties',
      description:
        'Change ESDT properties added when issuing the token, the canUpgrade property has to be previously assigned',
      path: '/non-fungible-tokens/properties-management',
    },
    {
      title: 'Change attributes',
      description:
        'An user that has the ESDTRoleNFTUpdateAttributes role set for a given ESDT, can change the attributes of a given NFT',
      path: '/non-fungible-tokens/attributes-management',
    },
    {
      title: 'Add URIs',
      description:
        'An user that has the ESDTRoleNFTAddURI role set for a given ESDT, can add uris to a given NFT/SFT. This is done by performing a transaction like this.',
      path: '/non-fungible-tokens/add-uris',
    },
    {
      title: 'Freeze/Unfreeze',
      description:
        'The manager of an ESDT token may freeze the NFT held by a specific Account. As a consequence, no NFT can be transferred to or from the frozen Account',
      path: '/non-fungible-tokens/freeze-toggle',
    },
    {
      title: 'Wipe',
      description:
        'The manager of an ESDT token may wipe out a single NFT held by a frozen Account.',
      path: '/non-fungible-tokens/wipe',
    },
    {
      title: 'Burn as owner',
      description: 'The owner of an ESDT token may burn a single NFT.',
      path: '/non-fungible-tokens/burn',
    },
    {
      title: 'Send',
      description: 'Send NFT',
      path: '/non-fungible-tokens/send',
    },
  ],
  'semi-fungible-tokens': [
    {
      title: 'Issue',
      description: 'Issue a new semi-fungible ESDT (SFT)',
      path: '/semi-fungible-tokens/issue',
    },
    {
      title: 'Special roles',
      description: 'Set special roles for a newly created semi-fungible ESDT',
      path: '/semi-fungible-tokens/roles-management',
    },
    {
      title: 'Create SFT',
      description: 'Create a new semi-fungible ESDT',
      path: '/semi-fungible-tokens/create',
    },
    {
      title: 'Transfer creation role',
      description:
        'The token manager can transfer the creation role from one address to another.',
      path: '/semi-fungible-tokens/transfer-creation-role',
    },
    {
      title: 'Stop creation',
      description:
        'The ESDT manager can stop the creation of the token for the given ESDT forever by removing the only ESDTRoleNFTCreate role available.',
      path: '/semi-fungible-tokens/stop-creation',
    },
    {
      title: 'Transfer ownership',
      description:
        'The manager of an ESDT may transfer the management rights to another Account. This operation requires that the canChangeOwner property is set to true.',
      path: '/semi-fungible-tokens/transfer-ownership',
    },
    {
      title: 'Change properties',
      description:
        'Change ESDT properties added when issuing the token, the canUpgrade property has to be previously assigned',
      path: '/semi-fungible-tokens/properties-management',
    },
    {
      title: 'Freeze/Unfreeze',
      description:
        'The manager of an ESDT token may freeze the SFT held by a specific Account. As a consequence, no SFT can be transferred to or from the frozen Account',
      path: '/semi-fungible-tokens/freeze-toggle',
    },
    {
      title: 'Wipe',
      description:
        'The manager of an ESDT token may wipe out a single SFT held by a frozen Account.',
      path: '/semi-fungible-tokens/wipe',
    },
    {
      title: 'Add/Burn quantity',
      description:
        'A user that has the ESDTRoleNFTAddQuantity or ESDTRoleNFTBurn roles set for a given Semi-Fungible Token, can increase or decrease its quantity. The owner can also decrease the quantity.',
      path: '/semi-fungible-tokens/quantity-management',
    },
    {
      title: 'Send',
      description: 'Send SFT',
      path: '/semi-fungible-tokens/send',
    },
  ],
  'meta-tokens': [
    {
      title: 'Issue',
      description: 'Issue a new Meta ESDT',
      path: '/meta-tokens/issue',
    },
    {
      title: 'Special roles',
      description: 'Set special roles for a newly created meta ESDT',
      path: '/meta-tokens/roles-management',
    },
    {
      title: 'Create Meta ESDT',
      description: 'Create a new Meta ESDT',
      path: '/meta-tokens/create',
    },
    {
      title: 'Transfer creation role',
      description:
        'The token manager can transfer the creation role from one address to another.',
      path: '/meta-tokens/transfer-creation-role',
    },
    {
      title: 'Stop creation',
      description:
        'The ESDT manager can stop the creation of the token for the given ESDT forever by removing the only ESDTRoleNFTCreate role available.',
      path: '/meta-tokens/stop-creation',
    },
    {
      title: 'Transfer ownership',
      description:
        'The manager of an ESDT may transfer the management rights to another Account. This operation requires that the canChangeOwner property is set to true.',
      path: '/meta-tokens/transfer-ownership',
    },
    {
      title: 'Change properties',
      description:
        'Change ESDT properties added when issuing the token, the canUpgrade property has to be previously assigned',
      path: '/meta-tokens/properties-management',
    },
    {
      title: 'Freeze/Unfreeze',
      description:
        'The manager of an ESDT token may freeze the meta ESDT held by a specific Account. As a consequence, no meta ESDT can be transferred to or from the frozen Account',
      path: '/meta-tokens/freeze-toggle',
    },
    {
      title: 'Wipe',
      description:
        'The manager of an ESDT token may wipe out a single meta ESDT held by a frozen Account.',
      path: '/meta-tokens/wipe',
    },
    {
      title: 'Add/Burn quantity',
      description:
        'A user that has the ESDTRoleNFTAddQuantity or ESDTRoleNFTBurn roles set for a given Meta Token, can increase or decrease its quantity. The owner can also decrease the quantity.',
      path: '/meta-tokens/quantity-management',
    },
    {
      title: 'Send',
      description: 'Send Meta ESDT',
      path: '/meta-tokens/send',
    },
  ],
};
