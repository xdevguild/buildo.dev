import type { Metadata, NextPage } from 'next';
import { WipeSingle } from '../../components/wipe-single';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Wiping a single meta ESDT',
  description:
    'The manager of an ESDT token may wipe out a single meta ESDT held by a frozen Account.',
  pagePath: '/meta-tokens/wipe',
});

const MetaWipePage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl leading-none font-semibold tracking-tight">
          Wiping a single meta ESDT
        </h1>
        <p className="text-muted-foreground text-sm">
          The manager of an ESDT token may wipe out a single meta ESDT held by a
          frozen Account. This operation is similar to burning the quantity, but
          the Account must have been frozen beforehand, and it must be done by
          the token manager. Wiping the tokens of an Account is an operation
          designed to help token managers to comply with regulations.
        </p>
      </div>
      <WipeSingle tokenType="meta" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          In the MultiversX ecosystem, the manager of an ESDT token has the
          authority to wipe out a Meta ESDT from a frozen account. This
          operation is akin to burning the token, effectively removing it
          permanently from circulation. However, a key precondition for this
          action is that the account holding the Meta ESDT must already be
          frozen. This ensures that the account is restricted from transacting
          with the token prior to its removal. The operation must also be
          executed by the token manager, ensuring that such significant actions
          are controlled and deliberate.
        </p>
        <p className="mb-3">
          The ability to wipe tokens from a frozen account is a critical tool
          for token managers, primarily designed to help them adhere to
          regulatory requirements. In cases where compliance issues arise, or
          there are concerns about the legality of the tokens held by an
          account, the token manager can decisively remove the tokens, thus
          aligning the token&apos;s management with legal standards. This
          feature highlights the robust governance capabilities embedded within
          the MultiversX platform, allowing token managers to maintain
          regulatory compliance while managing the lifecycle and integrity of
          the tokens under their control.
        </p>
      </div>
    </div>
  );
};

export default MetaWipePage;
