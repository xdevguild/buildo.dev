import type { Metadata, NextPage } from 'next';
import { FreezeUnfreezeSingle } from '../../components/freeze-unfreeze-single';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Freeze/Unfreeze a single semi-fungible ESDT',
  description:
    'The manager of an ESDT token may freeze the semi-fungible ESDT held by a specific Account.',
  pagePath: '/semi-fungible-tokens/freeze-toggle',
});

const SemiFungibleFreezeTogglePage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Freeze/Unfreeze a single semi-fungible ESDT
        </h1>
        <p className="text-sm text-muted-foreground">
          The manager of an ESDT token may freeze the semi-fungible ESDT held by
          a specific Account. As a consequence, no semi-fungible ESDT can be
          transferred to or from the frozen Account. Freezing and unfreezing a
          single semi-fungible ESDT of an Account are operations designed to
          help token managers to comply with regulations.
        </p>
      </div>
      <FreezeUnfreezeSingle tokenType="semi-fungible" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          The management of an eStandard Digital Token (ESDT) includes robust
          control measures, such as the ability to freeze semi-fungible tokens
          associated with a specific account. This functionality is particularly
          crucial for regulatory compliance and security purposes. When a
          semi-fungible ESDT is frozen, the designated account is unable to
          execute any transfers of the affected tokens, effectively isolating
          the tokens from any interaction within the network. This can prevent
          unauthorized transactions or mitigate potential risks arising from
          compromised account security. Additionally, the freeze feature serves
          as a regulatory tool, allowing token managers to enforce legal
          requirements or compliance directives swiftly and effectively.
          Freezing and unfreezing tokens provide a layer of control that is
          vital for maintaining the integrity and trustworthiness of the token
          ecosystem.
        </p>
        <p className="mb-3">
          Moreover, the capability to freeze and unfreeze semi-fungible ESDTs at
          an individual account level allows token managers to act decisively in
          response to specific situations without impacting the broader token
          economy. This targeted approach is essential for addressing issues
          such as suspicious activities or to comply with legal orders specific
          to certain participants. By implementing such controls, token managers
          not only uphold regulatory standards but also enhance the security
          posture of their token offerings. This operational flexibility helps
          maintain a stable and secure environment for all stakeholders
          involved, reinforcing the utility and credibility of semi-fungible
          ESDTs as a viable digital asset class within the highly regulated
          framework of blockchain technologies.
        </p>
      </div>
    </div>
  );
};

export default SemiFungibleFreezeTogglePage;
