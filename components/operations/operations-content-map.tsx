import { ReactElement } from 'react';
import { ScTokenTransferArgs, TransactionParams } from '@useelven/core';
import { Issue } from '@/components/operations/fungible-tokens/issue';
import { IssueNftSft } from '@/components/operations/common/issue-nft-sft';
import { Issue as IssueMeta } from '@/components/operations/meta-tokens/issue';
import { ToggleSpecialRoles } from '@/components/operations/common/toggle-special-roles';
import { ChangeProperties } from '@/components/operations/common/change-properties';
import { TransferCreationRole } from '@/components/operations/common/transfer-creation-role';
import { StopCreation } from '@/components/operations/common/stop-creation';
import { TransferOwnership } from '@/components/operations/common/transfer-ownership';
import { MintBurn } from '@/components/operations/fungible-tokens/mint-burn';
import { PauseUnpause } from '@/components/operations/fungible-tokens/pause-unpause';
import { FreezeUnfreeze } from '@/components/operations/fungible-tokens/freeze-unfreeze';
import { Wipe } from '@/components/operations/fungible-tokens/wipe';
import { Send } from '@/components/operations/fungible-tokens/send';
import { Send as NftSend } from '@/components/operations/non-fungible-tokens/send';
import { Send as SftSend } from '@/components/operations/semi-fungible-tokens/send';
import { Send as MetaSend } from '@/components/operations/meta-tokens/send';
import { Create } from '@/components/operations/non-fungible-tokens/create';
import { Create as SftCreate } from '@/components/operations/semi-fungible-tokens/create';
import { Create as MetaCreate } from '@/components/operations/meta-tokens/create';
import { DataConverters } from '@/components/operations/utils-operations/data-converters';
import { SendEgld } from '@/components/operations/general/send-egld';
import { ClaimDevRewards } from '@/components/operations/general/claim-dev-rewards';
import { ChangeOwnerAddress } from '@/components/operations/general/chang-owner-address';
import { AccountStorage } from '@/components/operations/general/account-storage';
import { DecodeTransaction } from '@/components/operations/utils-operations/decode-transaction';
import { CheckTokenData } from '@/components/operations/utils-operations/check-token-data';

export type OperationsContentMap = Record<
  string,
  Record<
    string,
    {
      component: ReactElement;
      additionalInfo?: string;
      showTokenId?: boolean;
      tokenTransfer?: boolean;
    }
  >
>;

type OperationsContentMapProps = {
  closeDialog: () => void;
  triggerTx?: ({
    address,
    data,
    gasLimit,
    value,
  }: TransactionParams) => Promise<void>;
  transfer?: ({
    type,
    tokenId,
    nonce,
    gasLimit,
    address,
    amount,
    value,
    endpointName,
    endpointArgs,
  }: ScTokenTransferArgs) => void;
};

export const getOperationsContentsMap = ({
  triggerTx,
  transfer,
  closeDialog,
}: OperationsContentMapProps): OperationsContentMap => ({
  fungibleEsdt: {
    issue: {
      component: <Issue triggerTx={triggerTx} close={closeDialog} />,
      showTokenId: true,
      additionalInfo:
        'You have issued a new Fungible ESDT. The next step would be to set special roles.',
    },
    toggleRoles: {
      component: (
        <ToggleSpecialRoles
          triggerTx={triggerTx}
          close={closeDialog}
          tokenType="fungible"
        />
      ),
      additionalInfo: 'You have modified roles for your fungible ESDT.',
    },
    mintBurn: {
      component: <MintBurn triggerTx={triggerTx} close={closeDialog} />,
      additionalInfo: 'You have modified the supply for your fungible ESDT.',
    },
    pauseUnpause: {
      component: <PauseUnpause triggerTx={triggerTx} close={closeDialog} />,
      additionalInfo:
        'You have modified the state of transactions for your fungible ESDT.',
    },
    freezeUnfreeze: {
      component: <FreezeUnfreeze triggerTx={triggerTx} close={closeDialog} />,
      additionalInfo:
        'You have frozen/unfrozen fungible ESDT balance in a specific account.',
    },
    wipe: {
      component: <Wipe triggerTx={triggerTx} close={closeDialog} />,
      additionalInfo: "You have removed fungible ESDT's from a frozen account.",
    },
    transferOwnership: {
      component: (
        <TransferOwnership triggerTx={triggerTx} close={closeDialog} />
      ),
      additionalInfo: 'You have moved the ownership of a fungible ESDT.',
    },
    changeProperties: {
      component: (
        <ChangeProperties
          triggerTx={triggerTx}
          close={closeDialog}
          tokenType="fungible"
        />
      ),
      additionalInfo: 'You have changed the properties of a fungible ESDT.',
    },
    send: {
      component: <Send transfer={transfer} close={closeDialog} />,
      tokenTransfer: true,
      additionalInfo: 'You have sent the ESDT amount.',
    },
  },
  nonFungibleEsdt: {
    issue: {
      component: (
        <IssueNftSft
          triggerTx={triggerTx}
          close={closeDialog}
          tokenType="non-fungible"
        />
      ),
      showTokenId: true,
      additionalInfo:
        'You have issued a new Non Fungible ESDT (NFT). "NFT Collection". The next step would be to set special roles.',
    },
    toggleRoles: {
      component: (
        <ToggleSpecialRoles
          triggerTx={triggerTx}
          close={closeDialog}
          tokenType="non-fungible"
        />
      ),
      additionalInfo:
        'You have modified roles for your non-fungible ESDT (NFT).',
    },
    create: {
      component: <Create triggerTx={triggerTx} close={closeDialog} />,
      additionalInfo: 'You have created a non-fungible ESDT (NFT).',
      showTokenId: true,
    },
    transferCreationRole: {
      component: (
        <TransferCreationRole triggerTx={triggerTx} close={closeDialog} />
      ),
      additionalInfo:
        'You have transfered the creation role for a non-fungible ESDT (NFT).',
    },
    stopCreation: {
      component: <StopCreation triggerTx={triggerTx} close={closeDialog} />,
      additionalInfo:
        'You have stopped the creation of a non-fungible ESDT (NFT).',
    },
    transferOwnership: {
      component: (
        <TransferOwnership triggerTx={triggerTx} close={closeDialog} />
      ),
      additionalInfo:
        'You have moved the ownership of a non-fungible ESDT (NFT).',
    },
    changeProperties: {
      component: (
        <ChangeProperties
          triggerTx={triggerTx}
          close={closeDialog}
          tokenType="non-fungible"
        />
      ),
      additionalInfo: 'You have changed the properties of a non-fungible ESDT.',
    },
    send: {
      component: <NftSend transfer={transfer} close={closeDialog} />,
      tokenTransfer: true,
      additionalInfo: 'You have sent the NFT.',
    },
  },
  semiFungibleEsdt: {
    issue: {
      component: (
        <IssueNftSft
          triggerTx={triggerTx}
          close={closeDialog}
          tokenType="semi-fungible"
        />
      ),
      showTokenId: true,
      additionalInfo:
        'You have issued a new Semi Fungible ESDT (SFT). "SFT Collection". The next step would be to set special roles.',
    },
    toggleRoles: {
      component: (
        <ToggleSpecialRoles
          triggerTx={triggerTx}
          close={closeDialog}
          tokenType="semi-fungible"
        />
      ),
      additionalInfo: 'You have modified roles for your semi-fungible ESDT.',
    },
    create: {
      component: <SftCreate triggerTx={triggerTx} close={closeDialog} />,
      additionalInfo: 'You have created a semi-fungible ESDT (SFT).',
      showTokenId: true,
    },
    transferCreationRole: {
      component: (
        <TransferCreationRole triggerTx={triggerTx} close={closeDialog} />
      ),
      additionalInfo:
        'You have transfered the creation role for a semi-fungible ESDT (SFT).',
    },
    stopCreation: {
      component: <StopCreation triggerTx={triggerTx} close={closeDialog} />,
      additionalInfo:
        'You have stopped the creation of a semi-fungible ESDT (SFT).',
    },
    transferOwnership: {
      component: (
        <TransferOwnership triggerTx={triggerTx} close={closeDialog} />
      ),
      additionalInfo:
        'You have moved the ownership of a semi-fungible ESDT (SFT).',
    },
    changeProperties: {
      component: (
        <ChangeProperties
          triggerTx={triggerTx}
          close={closeDialog}
          tokenType="semi-fungible"
        />
      ),
      additionalInfo:
        'You have changed the properties of a semi-fungible ESDT.',
    },
    send: {
      component: <SftSend transfer={transfer} close={closeDialog} />,
      tokenTransfer: true,
      additionalInfo: 'You have sent the SFT amount.',
    },
  },
  metaEsdt: {
    issue: {
      component: <IssueMeta triggerTx={triggerTx} close={closeDialog} />,
      showTokenId: true,
      additionalInfo:
        'You have issued a new Meta ESDT. The next step would be to set special roles.',
    },
    toggleRoles: {
      component: (
        <ToggleSpecialRoles
          triggerTx={triggerTx}
          close={closeDialog}
          tokenType="meta"
        />
      ),
      additionalInfo: 'You have modified roles for your meta ESDT.',
    },
    create: {
      component: <MetaCreate triggerTx={triggerTx} close={closeDialog} />,
      additionalInfo: 'You have created a Meta ESDT.',
      showTokenId: true,
    },
    transferCreationRole: {
      component: (
        <TransferCreationRole triggerTx={triggerTx} close={closeDialog} />
      ),
      additionalInfo: 'You have transfered the creation role for a meta ESDT.',
    },
    stopCreation: {
      component: <StopCreation triggerTx={triggerTx} close={closeDialog} />,
      additionalInfo: 'You have stopped the creation of a meta ESDT.',
    },
    transferOwnership: {
      component: (
        <TransferOwnership triggerTx={triggerTx} close={closeDialog} />
      ),
      additionalInfo: 'You have moved the ownership of a meta ESDT.',
    },
    changeProperties: {
      component: (
        <ChangeProperties
          triggerTx={triggerTx}
          close={closeDialog}
          tokenType="meta"
        />
      ),
      additionalInfo: 'You have changed the properties of a meta ESDT.',
    },
    send: {
      component: <MetaSend transfer={transfer} close={closeDialog} />,
      tokenTransfer: true,
      additionalInfo: 'You have sent the Meta ESDT amount.',
    },
  },
  utilities: {
    dataConverters: {
      component: <DataConverters />,
    },
    decodeTransaction: {
      component: <DecodeTransaction />,
    },
    checkTokenData: {
      component: <CheckTokenData />,
    },
  },
  general: {
    sendEgld: {
      component: <SendEgld triggerTx={triggerTx} close={closeDialog} />,
      additionalInfo: 'You have sent the EGLD amount.',
    },
    claimDevRewards: {
      component: <ClaimDevRewards triggerTx={triggerTx} close={closeDialog} />,
      additionalInfo: 'You have claimed your dev rewards.',
    },
    changeOwnerAddress: {
      component: (
        <ChangeOwnerAddress triggerTx={triggerTx} close={closeDialog} />
      ),
      additionalInfo:
        'You have changed the owner address for your smart contract.',
    },
    accountStorage: {
      component: <AccountStorage triggerTx={triggerTx} close={closeDialog} />,
      additionalInfo: 'You have updated your account storage.',
    },
  },
});
