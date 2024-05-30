import type { Metadata, NextPage } from 'next';
import { FreezeUnfreezeSingle } from '../../components/freeze-unfreeze-single';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'Buildo.dev - MultiversX: Freeze/Unfreeze a single meta ESDT',
  description:
    'The manager of an ESDT token may freeze the meta ESDT held by a specific Account. As a consequence, no meta ESDT can be transferred to or from the frozen Account.',
  pagePath: '/meta-tokens/freeze-toggle',
});

const MetaFreezeTogglePage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Freeze/Unfreeze a single meta ESDT
        </h1>
        <p className="text-sm text-muted-foreground">
          The manager of an ESDT token may freeze the meta ESDT held by a
          specific Account. As a consequence, no meta ESDT can be transferred to
          or from the frozen Account. Freezing and unfreezing a single meta ESDT
          of an Account are operations designed to help token managers to comply
          with regulations.
        </p>
      </div>
      <FreezeUnfreezeSingle tokenType="meta" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          In the MultiversX blockchain, the manager of an ESDT token possesses
          the capability to freeze the Meta ESDT held by a specific account.
          This action prevents any transfer of the Meta ESDT to or from the
          frozen account, effectively restricting the account&apos;s ability to
          participate in transactions involving that specific Meta ESDT. This
          powerful tool is crucial for token managers, providing them with the
          means to enforce compliance with regulatory requirements or to address
          security concerns.
        </p>
        <p className="mb-3">
          The ability to freeze and unfreeze Meta ESDTs at the account level is
          a critical feature designed to help token managers uphold the
          integrity of the blockchain and adhere to legal frameworks. It is
          particularly important in scenarios where there may be concerns about
          fraudulent activities or regulatory scrutiny. By enabling token
          managers to control the movement of Meta ESDTs, MultiversX ensures
          that the ecosystem remains secure and compliant with applicable laws
          and standards. This functionality underscores the platform&apos;s
          commitment to providing robust management tools that enhance the
          security and regulatory compliance of digital assets.
        </p>
      </div>
    </div>
  );
};

export default MetaFreezeTogglePage;
