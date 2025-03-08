import type { Metadata, NextPage } from 'next';
import { ChangeProperties } from '../../components/change-properties';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Change properties of a fungible ESDT',
  description:
    'The manager of an ESDT token may individually change any of the properties of the token, or multiple properties at once. The token should have the canUpgrade property set to true.',
  pagePath: '/fungible-tokens/change-properties',
});

const ChangePropertiesPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl leading-none font-semibold tracking-tight">
          Change properties of a fungible ESDT
        </h1>
        <p className="text-muted-foreground text-sm">
          The manager of an ESDT token may individually change any of the
          properties of the token, or multiple properties at once. The token
          should have the canUpgrade property set to true.
          <br />
          <br />
          <strong>
            Due to API caching, changes may not be visible immediately.
          </strong>
        </p>
      </div>
      <ChangeProperties tokenType="fungible" />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          In the rapidly evolving landscape of blockchain technology, the
          ability for a manager of an eStandard Digital Token (ESDT) to modify
          the properties of the token represents a significant advantage. This
          flexibility allows the manager to adjust any single property or
          simultaneously change multiple properties, tailoring the token to meet
          shifting market demands and regulatory requirements. To enable such
          modifications, the token must have the canUpgrade property activated.
          This feature is crucial for ensuring that ESDT tokens remain
          competitive and compliant, as it allows for ongoing adjustments and
          enhancements that can improve functionality, security, and overall
          performance.
        </p>
        <p className="mb-3">
          The capacity to upgrade token properties is not only vital for
          adapting to changes in the digital currency ecosystem but also
          enhances the token&apos;s utility and market positioning. By allowing
          token managers to implement changes efficiently, the MultiversX
          network supports a dynamic and responsive management approach. This
          adaptability is essential for maintaining relevance in the face of
          technological advancements and changing user needs. It also ensures
          that stakeholders can leverage the most current features while
          adhering to the highest standards of security and compliance,
          fostering trust and stability within the blockchain environment.
        </p>
      </div>
    </div>
  );
};

export default ChangePropertiesPage;
