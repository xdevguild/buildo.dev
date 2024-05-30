import type { NextPage } from 'next';
import { Issue } from './components/issue';
import { Separator } from '@/components/ui/separator';

const MetaTokensIssuePage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Issue a Meta ESDT (Collection)
        </h1>
        <p className="text-sm text-muted-foreground">
          One has to perform an issuance transaction in order to register a
          Meta-ESDT token. Meta-ESDT Tokens are issued via a request to the
          Metachain, which is a transaction submitted by the Account which will
          manage the tokens.
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
          To issue a Meta-ESDT token on MultiversX, a user must execute an
          issuance transaction, initiating a request to the Metachain. This
          process involves a specific transaction that must be submitted by the
          account that will oversee and manage the token&apos;s operations. The
          Metachain, a critical component of the MultiversX ecosystem, plays a
          central role in facilitating these transactions, ensuring that the
          issuance of Meta-ESDT tokens is conducted securely and efficiently.
          This is crucial for maintaining the integrity and functionality of the
          token within the broader blockchain network.
        </p>
        <p className="mb-3">
          Understanding the dynamics of Meta-ESDT tokens in the MultiversX
          platform is essential for participants looking to leverage blockchain
          technology for creating and managing digital assets. Each Meta-ESDT
          token has unique properties and utilities, making them versatile tools
          for various applications in digital finance and beyond. By enabling
          the registration of these tokens through a secure and robust system,
          MultiversX enhances the adaptability and potential of blockchain
          technology, empowering users with more control over their digital
          transactions and asset management.
        </p>
      </div>
    </div>
  );
};

export default MetaTokensIssuePage;
