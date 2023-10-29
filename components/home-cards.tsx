'use client';

import { HomeCard } from '@/components/home-card';
import { OperationsDialog } from '@/components/operations/operations-dialog';
import React, { useState } from 'react';
import {
  OperationsStateDialogProvider,
  OperationsStateDialogWrapper,
  DialogStateContentArgs,
} from '@/components/operations/operations-status-dialog';
import { useTokenTransfer, useTransaction } from '@useelven/core';
import {
  getSmartContractTxError,
  getTokenIdAfterIssuingOrCreating,
} from '@/components/operations/utils';
import { getOperationsContentsMap } from '@/components/operations/operations-content-map';

export const HomeCards = () => {
  const { pending, triggerTx, transaction, error, txResult } = useTransaction();
  const {
    pending: transferPending,
    transfer,
    transaction: transferTransaction,
    error: transferError,
    txResult: transferTxResult,
  } = useTokenTransfer();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContentArgs, setDialogContentArgs] =
    useState<DialogStateContentArgs>();

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const operationsContentsMap = getOperationsContentsMap({
    triggerTx,
    closeDialog,
    transfer,
  });

  const setDialogState = (section: string, operation: string) => {
    setDialogContentArgs(operationsContentsMap[section][operation]);
    // Set the dialog content args info in the session storage,
    // required for Web Wallet or Guardians 2fa hook,
    if (window?.sessionStorage) {
      window?.sessionStorage.setItem(
        'buildoTxInfo',
        JSON.stringify({ section, operation })
      );
    }
    setDialogOpen(true);
  };

  return (
    <OperationsStateDialogProvider>
      <div className="flex flex-row gap-6 flex-wrap mb-6">
        <HomeCard
          title="General operations"
          description="General operations on the chain. Like managing accounts, herotags, multi-transfers, and interaction with custom smart contracts. New ones will be added over time."
          items={[
            {
              title: 'Send EGLD',
              description: 'Send EGLD native tokens',
              onClick: () => {
                setDialogState('general', 'sendEgld');
              },
            },
            {
              title: 'Claim developer rewards',
              description:
                "Claim dev rewards from your smart contract. You have to use the owner's wallet address when calling it",
              onClick: () => {
                setDialogState('general', 'claimDevRewards');
              },
            },
            {
              title: 'Change owner address',
              description:
                'You can change the owner address of the smart contract you own',
              onClick: () => {
                setDialogState('general', 'changeOwnerAddress');
              },
            },
            {
              title: 'Account storage',
              description:
                'A wallet owner can store key-value pairs by using the built-in function SaveKeyValue which receives any number of key-value pairs.',
              onClick: () => {
                setDialogState('general', 'accountStorage');
              },
            },
            {
              title: 'Set a herotag',
              description:
                'Create a herotag and assign it to your address (transaction fees applied)',
              onClick: () => {
                setDialogState('general', 'herotag');
              },
            },
            {
              title: 'Multi transfer (ready in the CLI)',
              description:
                'You can transfer multiple ESDTs at once (FT, NFT, SFT, meta)',
              onClick: () => {},
              disabled: true,
            },
            {
              title: 'Deploy a custom smart contract',
              description: 'You can deploy any custom smart contract',
              onClick: () => {},
              disabled: true,
            },
            {
              title: 'Sign a message',
              description: 'You can sign any message using your wallet',
              onClick: () => {},
              disabled: true,
            },
            {
              title: 'Guardians related operations',
              description: 'Set/unset a guardian, guard an account',
              onClick: () => {},
              disabled: true,
            },
          ]}
        />
        <HomeCard
          title="Utilities"
          description="Helpful tools. Like transaction decoding or data converters. New ones will be added over time."
          items={[
            {
              title: 'Data converters',
              description: 'A set of data converters',
              onClick: () => {
                setDialogState('utilities', 'dataConverters');
              },
            },
            {
              title: 'Decode transaction',
              description:
                'It uses sdk-transaction-decoder. It takes base64 encoded data, or data string.',
              onClick: () => {
                setDialogState('utilities', 'decodeTransaction');
              },
            },
            {
              title: 'Check token data',
              description: 'Check the most important data of any token',
              onClick: () => {
                setDialogState('utilities', 'checkTokenData');
              },
            },
            {
              title: 'Check address data',
              description: 'Check the most important data of any address',
              onClick: () => {
                setDialogState('utilities', 'checkAddressData');
              },
            },
            {
              title: 'Verify a signature',
              description: 'Verify previously signed message',
              onClick: () => {},
              disabled: true,
            },
            {
              title: 'Read account storage',
              description: 'Check account storage by key',
              onClick: () => {},
              disabled: true,
            },
          ]}
        />
      </div>
      <div className="flex flex-row gap-6 flex-wrap">
        <HomeCard
          title="Fungible tokens"
          description="Operations related to Fungible ESDTs."
          items={[
            {
              title: 'Issue',
              description: 'Issue a new fungible ESDT',
              onClick: () => {
                setDialogState('fungibleEsdt', 'issue');
              },
            },
            {
              title: 'Special roles',
              description:
                'Set special roles for a newly created fungible ESDT',
              onClick: () => {
                setDialogState('fungibleEsdt', 'toggleRoles');
              },
            },
            {
              title: 'Mint/Burn supply',
              description:
                'Mint/burn a fungible ESDT supply (requires ESDTRoleLocalBurn, ESDTRoleLocalMint roles)',
              onClick: () => {
                setDialogState('fungibleEsdt', 'mintBurn');
              },
            },
            {
              title: 'Pause/Unpause',
              description:
                'Pause/unpause all transactions of the token (requires canPause property)',
              onClick: () => {
                setDialogState('fungibleEsdt', 'pauseUnpause');
              },
            },
            {
              title: 'Freeze/Unfreeze',
              description:
                'Freeze/unfreeze the token balance in a specific account, preventing transfers to and from that account (requires canFreeze property)',
              onClick: () => {
                setDialogState('fungibleEsdt', 'freezeUnfreeze');
              },
            },
            {
              title: 'Wipe',
              description:
                'Wipe out the tokens held by a previously frozen account, reducing the supply (Wiping the tokens of an Account is an operation designed to help token managers to comply with regulations.)',
              onClick: () => {
                setDialogState('fungibleEsdt', 'wipe');
              },
            },
            {
              title: 'Transfer ownership',
              description:
                'The manager of an ESDT may transfer the management rights to another Account. This operation requires that the canChangeOwner property is set to true.',
              onClick: () => {
                setDialogState('fungibleEsdt', 'transferOwnership');
              },
            },
            {
              title: 'Change properties',
              description:
                'Change ESDT properties added when issuing the token, the canUpgrade property has to be previously assigned',
              onClick: () => {
                setDialogState('fungibleEsdt', 'changeProperties');
              },
            },
            {
              title: 'Send',
              description: 'Send ESDT',
              onClick: () => {
                setDialogState('fungibleEsdt', 'send');
              },
            },
          ]}
        />
        <HomeCard
          title="Non-fungible tokens"
          description="Operations related to Non-fungible ESDTs."
          items={[
            {
              title: 'Issue',
              description: 'Issue a new non-fungible ESDT (NFT)',
              onClick: () => {
                setDialogState('nonFungibleEsdt', 'issue');
              },
            },
            {
              title: 'Special roles',
              description:
                'Set special roles for a newly created non-fungible ESDT',
              onClick: () => {
                setDialogState('nonFungibleEsdt', 'toggleRoles');
              },
            },
            {
              title: 'Create NFT',
              description: 'Create a new non-fungible ESDT',
              onClick: () => {
                setDialogState('nonFungibleEsdt', 'create');
              },
            },
            {
              title: 'Transfer creation role',
              description:
                'The token manager can transfer the creation role from one address to another.',
              onClick: () => {
                setDialogState('nonFungibleEsdt', 'transferCreationRole');
              },
            },
            {
              title: 'Stop creation',
              description:
                'The ESDT manager can stop the creation of the token for the given ESDT forever by removing the only ESDTRoleNFTCreate role available.',
              onClick: () => {
                setDialogState('nonFungibleEsdt', 'stopCreation');
              },
            },
            {
              title: 'Transfer ownership',
              description:
                'The manager of an ESDT may transfer the management rights to another Account. This operation requires that the canChangeOwner property is set to true.',
              onClick: () => {
                setDialogState('nonFungibleEsdt', 'transferOwnership');
              },
            },
            {
              title: 'Change properties',
              description:
                'Change ESDT properties added when issuing the token, the canUpgrade property has to be previously assigned',
              onClick: () => {
                setDialogState('nonFungibleEsdt', 'changeProperties');
              },
            },
            {
              title: 'Change attributes',
              description:
                'An user that has the ESDTRoleNFTUpdateAttributes role set for a given ESDT, can change the attributes of a given NFT',
              onClick: () => {
                setDialogState('nonFungibleEsdt', 'changeAttributes');
              },
            },
            {
              title: 'Add URIs',
              description:
                'An user that has the ESDTRoleNFTAddURI role set for a given ESDT, can add uris to a given NFT/SFT. This is done by performing a transaction like this.',
              onClick: () => {
                setDialogState('nonFungibleEsdt', 'addUris');
              },
            },
            {
              title: 'Freeze/Unfreeze',
              description:
                'The manager of an ESDT token may freeze the NFT held by a specific Account. As a consequence, no NFT can be transferred to or from the frozen Account',
              onClick: () => {
                setDialogState('nonFungibleEsdt', 'freezeUnfreeze');
              },
            },
            {
              title: 'Wipe',
              description:
                'The manager of an ESDT token may wipe out a single NFT held by a frozen Account.',
              onClick: () => {
                setDialogState('nonFungibleEsdt', 'wipe');
              },
            },
            {
              title: 'Send',
              description: 'Send NFT',
              onClick: () => {
                setDialogState('nonFungibleEsdt', 'send');
              },
            },
          ]}
        />
        <HomeCard
          title="Semi-fungible tokens"
          description="Operations related to Semi-fungible ESDTs."
          items={[
            {
              title: 'Issue',
              description: 'Issue a new semi-fungible ESDT (SFT)',
              onClick: () => {
                setDialogState('semiFungibleEsdt', 'issue');
              },
            },
            {
              title: 'Special roles',
              description:
                'Set special roles for a newly created semi-fungible ESDT',
              onClick: () => {
                setDialogState('semiFungibleEsdt', 'toggleRoles');
              },
            },
            {
              title: 'Create SFT',
              description: 'Create a new semi-fungible ESDT',
              onClick: () => {
                setDialogState('semiFungibleEsdt', 'create');
              },
            },
            {
              title: 'Transfer creation role',
              description:
                'The token manager can transfer the creation role from one address to another.',
              onClick: () => {
                setDialogState('semiFungibleEsdt', 'transferCreationRole');
              },
            },
            {
              title: 'Stop creation',
              description:
                'The ESDT manager can stop the creation of the token for the given ESDT forever by removing the only ESDTRoleNFTCreate role available.',
              onClick: () => {
                setDialogState('semiFungibleEsdt', 'stopCreation');
              },
            },
            {
              title: 'Transfer ownership',
              description:
                'The manager of an ESDT may transfer the management rights to another Account. This operation requires that the canChangeOwner property is set to true.',
              onClick: () => {
                setDialogState('semiFungibleEsdt', 'transferOwnership');
              },
            },
            {
              title: 'Change properties',
              description:
                'Change ESDT properties added when issuing the token, the canUpgrade property has to be previously assigned',
              onClick: () => {
                setDialogState('semiFungibleEsdt', 'changeProperties');
              },
            },
            {
              title: 'Add/Burn quantity',
              description:
                'A user that has the ESDTRoleNFTAddQuantity or ESDTRoleNFTBurn roles set for a given Semi-Fungible Token, can increase or decrease its quantity',
              onClick: () => {
                setDialogState('semiFungibleEsdt', 'addBurnQuantity');
              },
            },
            {
              title: 'Send',
              description: 'Send SFT',
              onClick: () => {
                setDialogState('semiFungibleEsdt', 'send');
              },
            },
            {
              title: 'rest operations',
              description:
                'You will be able to wipe, freeze, transfer roles, etc.',
              onClick: () => {},
              disabled: true,
            },
          ]}
        />
        <HomeCard
          title="Meta tokens"
          description="Operations related to Meta ESDTs."
          items={[
            {
              title: 'Issue',
              description: 'Issue a new Meta ESDT',
              onClick: () => {
                setDialogState('metaEsdt', 'issue');
              },
            },
            {
              title: 'Special roles',
              description: 'Set special roles for a newly created meta ESDT',
              onClick: () => {
                setDialogState('metaEsdt', 'toggleRoles');
              },
            },
            {
              title: 'Create Meta ESDT',
              description: 'Create a new Meta ESDT',
              onClick: () => {
                setDialogState('metaEsdt', 'create');
              },
            },
            {
              title: 'Transfer creation role',
              description:
                'The token manager can transfer the creation role from one address to another.',
              onClick: () => {
                setDialogState('metaEsdt', 'transferCreationRole');
              },
            },
            {
              title: 'Stop creation',
              description:
                'The ESDT manager can stop the creation of the token for the given ESDT forever by removing the only ESDTRoleNFTCreate role available.',
              onClick: () => {
                setDialogState('metaEsdt', 'stopCreation');
              },
            },
            {
              title: 'Transfer ownership',
              description:
                'The manager of an ESDT may transfer the management rights to another Account. This operation requires that the canChangeOwner property is set to true.',
              onClick: () => {
                setDialogState('metaEsdt', 'transferOwnership');
              },
            },
            {
              title: 'Change properties',
              description:
                'Change ESDT properties added when issuing the token, the canUpgrade property has to be previously assigned',
              onClick: () => {
                setDialogState('metaEsdt', 'changeProperties');
              },
            },
            {
              title: 'Add/Burn quantity',
              description:
                'A user that has the ESDTRoleNFTAddQuantity or ESDTRoleNFTBurn roles set for a given Meta Token, can increase or decrease its quantity',
              onClick: () => {
                setDialogState('metaEsdt', 'addBurnQuantity');
              },
            },
            {
              title: 'Send',
              description: 'Send Meta ESDT',
              onClick: () => {
                setDialogState('metaEsdt', 'send');
              },
            },
            {
              title: 'rest operations',
              description:
                'You will be able to wipe, freeze, transfer roles, etc.',
              onClick: () => {},
              disabled: true,
            },
          ]}
        />
      </div>
      <OperationsDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {dialogContentArgs?.component}
      </OperationsDialog>

      <OperationsStateDialogWrapper
        txPending={dialogContentArgs?.tokenTransfer ? transferPending : pending}
        txHash={
          dialogContentArgs?.tokenTransfer
            ? transferTransaction?.getHash().toString()
            : transaction?.getHash().toString()
        }
        txError={dialogContentArgs?.tokenTransfer ? transferError : error}
        scError={getSmartContractTxError(
          dialogContentArgs?.tokenTransfer ? transferTxResult : txResult
        )}
        operationsContentsMap={operationsContentsMap}
        setDialogContentArgs={setDialogContentArgs}
        additionalInfo={dialogContentArgs?.additionalInfo}
        tokenId={
          dialogContentArgs?.showTokenId &&
          getTokenIdAfterIssuingOrCreating(
            dialogContentArgs?.tokenTransfer ? transferTxResult : txResult
          )
        }
      />
    </OperationsStateDialogProvider>
  );
};
