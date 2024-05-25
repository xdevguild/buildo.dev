import type { NextPage } from 'next';
import { WipeSingle } from '../../common/wipe-single';
import { Separator } from '@/components/ui/separator';

const NonFungibleWipePage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Wiping a single non-fungible ESDT
        </h1>
        <p className="text-sm text-muted-foreground">
          The manager of an ESDT token may wipe out a single non-fungible ESDT
          held by a frozen Account. This operation is similar to burning the
          quantity, but the Account must have been frozen beforehand, and it
          must be done by the token manager. Wiping the tokens of an Account is
          an operation designed to help token managers to comply with
          regulations.
        </p>
      </div>
      <WipeSingle tokenType="non-fungible" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          The ability for a manager of an eStandard Digital Token (ESDT) to wipe
          out a non-fungible token (NFT) from a frozen account is a critical
          aspect of maintaining regulatory compliance within the blockchain
          environment. This operation, akin to burning a token, effectively
          removes the NFT from circulation permanently. However, it is a
          conditional operation that can only be performed if the account in
          question has already been frozen, ensuring that no transactions
          involving the NFT can occur. This preventive measure is crucial for
          token managers who need to adhere to legal and regulatory mandates
          that may require the removal of assets from the market, including for
          reasons such as court orders, compliance violations, or anti-money
          laundering (AML) procedures.
        </p>
        <p className="mb-3">
          Implementing such a wipe operation provides a layer of security and
          control for blockchain platforms, helping to maintain a clean,
          compliant, and trustworthy digital asset marketplace. For token
          managers, this function is indispensable for enforcing compliance with
          evolving regulations in the digital asset space, allowing them to act
          decisively to mitigate risks associated with unlawful activities or
          regulatory infractions. Moreover, this mechanism supports the overall
          health and sustainability of the blockchain ecosystem, reassuring
          investors and users that the platform adheres to high standards of
          regulatory compliance and asset management. These measures are not
          only crucial for aligning with legal standards but also for building
          long-term trust and stability in the deployment of blockchain
          technologies.
        </p>
      </div>
    </div>
  );
};

export default NonFungibleWipePage;
