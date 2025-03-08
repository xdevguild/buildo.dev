import type { Metadata, NextPage } from 'next';
import { Issue } from './components/issue';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Issue a fungible ESDT',
  description:
    'ESDT tokens are issued via a request to the Metachain, which is a transaction submitted by the Account which will manage the tokens.',
  pagePath: '/fungible-tokens/issue',
});

const FungibleTokensIssuePage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl leading-none font-semibold tracking-tight">
          Issue a fungible ESDT
        </h1>
        <p className="text-muted-foreground text-sm">
          ESDT tokens are issued via a request to the Metachain, which is a
          transaction submitted by the Account which will manage the tokens.
          When issuing a token, one must provide a token name, a ticker, the
          initial supply, the number of decimals for display purpose and
          optionally additional properties.
          <br />
          <br />
          In practical applications, it&apos;s advisable to prioritize the use
          of smart contracts for fair issuance and distribution.
        </p>
      </div>
      <Issue />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          ESDT tokens are created through a specific transaction request sent to
          the Metachain, initiated by the account that will oversee the
          management of these tokens. This process is essential for developers
          and businesses looking to issue their own tokens within the blockchain
          ecosystem. When initiating an ESDT token issue, several key pieces of
          information must be provided: the token&apos;s name, its ticker
          symbol, the initial supply of tokens, and the number of decimal places
          for display purposes. Additionally, issuers can include optional
          properties to further customize the token&apos;s functionality and
          integration capabilities. This flexible framework allows for a wide
          range of applications, from simple transfers to more complex financial
          transactions, making ESDT tokens a versatile tool for blockchain
          developers.
        </p>
      </div>
    </div>
  );
};

export default FungibleTokensIssuePage;
