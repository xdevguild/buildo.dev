import type { Metadata, NextPage } from 'next';
import { Wipe } from './components/wipe';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Wipe out all the fungible ESDTs held by a frozen Account',
  description:
    'The manager of an ESDT token may wipe out all the tokens held by a frozen Account. This operation is similar to burning the tokens, but the Account must have been frozen beforehand',
  pagePath: '/fungible-tokens/wipe',
});

const WipePage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Wipe out all the fungible ESDTs held by a frozen Account
        </h1>
        <p className="text-sm text-muted-foreground">
          The manager of an ESDT token may wipe out all the tokens held by a
          frozen Account. This operation is similar to burning the tokens, but
          the Account must have been frozen beforehand, and it must be done by
          the token manager. Wiping the tokens of an Account is an operation
          designed to help token managers to comply with regulations.
        </p>
      </div>
      <Wipe />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          In the management of eStandard Digital Token (ESDT) assets, the
          capability to wipe out all tokens from a frozen account is a critical
          function reserved for token managers. This operation, akin to burning
          tokens, necessitates that the account be previously frozen,
          underscoring a controlled approach to token removal. Wiping tokens
          effectively removes these assets from circulation permanently, serving
          as a compliance measure that helps manage the digital currency&apos;s
          supply and integrity under stringent regulatory frameworks.
        </p>
        <p className="mb-3">
          The necessity for such an operation arises in various circumstances,
          such as addressing fraudulent activities or complying with legal
          orders, making it an essential tool for maintaining the
          ecosystem&apos;s security and trust. By allowing token managers to
          execute wipes, the ESDT system provides a mechanism for enforcing
          compliance and managing risk, ensuring that all modifications to the
          token supply are transparent and accountable. This operation not only
          safeguards the blockchain network but also reinforces the confidence
          that investors and users place in the digital asset&apos;s management.
        </p>
      </div>
    </div>
  );
};

export default WipePage;
