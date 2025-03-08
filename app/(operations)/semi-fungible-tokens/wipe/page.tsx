import type { Metadata, NextPage } from 'next';
import { WipeSingle } from '../../components/wipe-single';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Wiping a single semi-fungible ESDT',
  description:
    'The manager of an ESDT token may wipe out a single semi-fungible ESDT held by a frozen Account.',
  pagePath: '/semi-fungible-tokens/wipe',
});

const SemiFungibleWipePage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl leading-none font-semibold tracking-tight">
          Wiping a single semi-fungible ESDT
        </h1>
        <p className="text-muted-foreground text-sm">
          The manager of an ESDT token may wipe out a single semi-fungible ESDT
          held by a frozen Account. This operation is similar to burning the
          quantity, but the Account must have been frozen beforehand, and it
          must be done by the token manager. Wiping the tokens of an Account is
          an operation designed to help token managers to comply with
          regulations.
        </p>
      </div>
      <WipeSingle tokenType="semi-fungible" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          In the management of eStandard Digital Tokens (ESDT), the token
          manager has the authority to execute highly specific and impactful
          operations, such as wiping out a semi-fungible ESDT from a frozen
          account. This operation is akin to burning the tokens but requires the
          account in question to be previously frozen, ensuring that no
          transactions can occur with the affected tokens. This measure is
          typically enforced under circumstances where compliance with legal
          standards or regulatory directives is necessary. By wiping tokens from
          a frozen account, token managers can adhere to stringent legal
          requirements, such as those related to anti-money laundering (AML) or
          combating the financing of terrorism (CFT). This capability is crucial
          for maintaining the integrity of the financial system within the
          blockchain, as it provides a mechanism for removing tokens potentially
          associated with illicit activities, thereby protecting the overall
          security and credibility of the digital asset market.
        </p>
        <p className="mb-3">
          The ability to wipe tokens from frozen accounts is not only a
          regulatory compliance tool but also a potent measure for safeguarding
          the ESDT ecosystem against abuse. This operation, controlled solely by
          the token manager, allows for decisive action in situations where the
          tokens may pose a risk to the security or integrity of the platform.
          For instance, in the event of a breach or fraudulent activities, the
          swift freezing and subsequent wiping of tokens can prevent further
          misuse, effectively mitigating potential damages. This function
          underscores the robust governance capabilities embedded within the
          ESDT framework, enhancing trust among users and regulatory bodies
          alike. By providing token managers with such authoritative tools, ESDT
          maintains a secure and compliant environment, essential for fostering
          growth and adoption in the blockchain space.
        </p>
      </div>
    </div>
  );
};

export default SemiFungibleWipePage;
