import type { NextPage } from 'next';
import { StopCreation } from '../../common/stop-creation';
import { Separator } from '@/components/ui/separator';

const SemiFungibleStopCreationPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Stop creation
        </h1>
        <p className="text-sm text-muted-foreground">
          The ESDT manager can stop the creation of the token for the given ESDT
          forever by removing the only ESDTRoleNFTCreate role available.
        </p>
      </div>
      <StopCreation tokenType="semi-fungible" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          In the context of semi-fungible tokens (SFTs) within the MultiversX
          network, the ESDT manager plays a crucial role in controlling the
          lifecycle of these digital assets. One significant power vested in the
          hands of the ESDT manager is the ability to halt the creation of new
          tokens indefinitely. This is achieved by removing the sole
          ESDTRoleNFTCreate role assigned within the system. Such a decision to
          stop token creation can be strategic or necessary, based on various
          factors including market saturation, strategic pivots in the
          project&apos;s direction, or regulatory compliance. By removing this
          role, the manager ensures that no further tokens can be created, thus
          capping the supply and potentially increasing the rarity and value of
          the existing tokens. This action, once taken, is irreversible,
          underscoring the importance of foresight and strategic planning in the
          management of token supplies.
        </p>
        <p className="mb-3">
          This ability to permanently stop token creation by revoking the
          ESDTRoleNFTCreate role adds a layer of security and stability to the
          token ecosystem. It prevents the dilution of value through the
          unchecked creation of new tokens, thereby protecting the interests of
          existing holders and maintaining trust in the token&apos;s economy.
          Moreover, this feature can be particularly beneficial in scenarios
          where the token has achieved its purpose or when the project phases
          into a new stage that does not require additional token issuance. For
          investors and participants in the SFT market, this control mechanism
          ensures that the token supply remains predictable and that their
          investments are not undermined by potential overproduction. Overall,
          this control over token creation is a critical feature that enhances
          governance, adds economic stability, and ensures the long-term
          viability of semi-fungible tokens within the MultiversX network.
        </p>
      </div>
    </div>
  );
};

export default SemiFungibleStopCreationPage;
