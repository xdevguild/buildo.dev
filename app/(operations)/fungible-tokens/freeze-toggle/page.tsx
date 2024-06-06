import type { Metadata, NextPage } from 'next';
import { FreezeUnfreeze } from './components/freeze-unfreeze';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title:
    'MultiversX: Freeze/Unfreeze fungible ESDT balance in a specific account',
  description:
    'The manager of an ESDT token may freeze the tokens held by a specific Account. As a consequence, no tokens may be transferred to or from the frozen Account.',
  pagePath: '/fungible-tokens/freeze-toggle',
});

const FreezeTogglePage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Freeze/Unfreeze fungible ESDT balance in a specific account
        </h1>
        <p className="text-sm text-muted-foreground">
          The manager of an ESDT token may freeze the tokens held by a specific
          Account. As a consequence, no tokens may be transferred to or from the
          frozen Account. Freezing and unfreezing the tokens of an Account are
          operations designed to help token managers to comply with regulations.
          These two operations require that the property canFreeze is set to
          true.
        </p>
      </div>
      <FreezeUnfreeze />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          The manager of an eStandard Digital Token (ESDT) can control
          transactions by freezing the tokens held in a specific account,
          ensuring compliance with financial regulations and anti-money
          laundering (AML) standards. This operation prevents any tokens from
          being transferred to or from the affected account, maintaining
          transaction integrity and stability. For a token manager to invoke
          these controls, the canFreeze property must be enabled, setting the
          foundation for regulatory adherence and operational transparency.
        </p>
        <p className="mb-3">
          Freezing and unfreezing tokens are essential tools that allow ESDT
          managers to swiftly manage compliance issues and respond to changing
          market conditions. These capabilities not only help in stabilizing the
          token&apos;s value during volatile periods but also safeguard against
          fraudulent activities. It is crucial for both token managers and
          holders to understand the processes and conditions under which these
          operations can occur, fostering a secure and well-regulated digital
          asset environment.
        </p>
      </div>
    </div>
  );
};

export default FreezeTogglePage;
