import { Metadata, NextPage } from 'next';
import { InscriptionsCreate } from './components/inscription-create';
import { Suspense } from 'react';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'Buildo.dev - MultiversX: Experimental Inscriptions',
  description:
    'Save custom immutable data on chain. You can then use it off-chain or for NFTs.',
  pagePath: '/general-operations/inscriptions',
});

const InscriptionsCreatePage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Experimental Inscriptions
        </h1>
        <p className="text-sm text-muted-foreground">
          Save custom immutable data on chain. You can then use it off-chain or
          for NFTs. (The structure of the data may change!).
          <br /> Read more{' '}
          <a
            href="https://agora.multiversx.com/t/a-guide-for-builders-on-how-to-properly-create-and-manage-inscriptions-on-multiversx/303"
            target="_blank"
            className="underline"
          >
            here
          </a>{' '}
          and{' '}
          <a
            href="https://agora.multiversx.com/t/the-birth-of-inscriptionnfts/306"
            target="_blank"
            className="underline"
          >
            here
          </a>
          !
        </p>
      </div>
      <Suspense>
        <InscriptionsCreate />
      </Suspense>
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          Saving custom immutable data on-chain provides a robust foundation for
          data security and authenticity, making it an essential practice for
          anyone operating within the blockchain ecosystem. Once data is stored
          on the blockchain, it benefits from the network&apos;s inherent
          security features, such as decentralization and cryptographic hashing,
          ensuring that the data cannot be altered or tampered with. This level
          of integrity is crucial for applications that require a high degree of
          trust and transparency.
        </p>
        <p>
          By storing data on-chain, users can leverage this information in
          various ways. For instance, when used off-chain, this data can
          interact with external systems and applications, enhancing user
          experience and functionality without compromising the security of the
          blockchain itself. Additionally, this immutable data is particularly
          valuable in the world of non-fungible tokens (NFTs), where it can
          serve to verify the authenticity and provenance of digital assets,
          ranging from artwork and music to virtual real estate and beyond.
        </p>
      </div>
    </div>
  );
};

export default InscriptionsCreatePage;
