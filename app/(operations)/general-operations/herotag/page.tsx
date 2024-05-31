import type { Metadata, NextPage } from 'next';
import { Herotag } from './components/herotag';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'Buildo.dev - MultiversX: Assign a herotag to your wallet address',
  description:
    'The herotag is a unique username you can assign to your wallet address. Just to let you know, in this case, transaction fees will be applied.',
  pagePath: '/general-operations/herotag',
});

const HerotagPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Assign a herotag to your wallet address
        </h1>
        <p className="text-sm text-muted-foreground">
          The herotag is a unique username you can assign to your wallet
          address. Just to let you know, in this case, transaction fees will be
          applied.
          {process.env.NEXT_PUBLIC_MULTIVERSX_CHAIN === 'devnet' ? (
            <>
              <br />
              <br />
              <strong>It my not work on the devnet at the moment.</strong>
            </>
          ) : null}
        </p>
      </div>
      <Herotag />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3"></p>
        <p>
          The herotag is a distinctive and customizable username that you can
          allocate to your digital wallet address, enhancing the ease of
          identification and transactions. It&apos;s important to be aware that
          assigning a herotag to your wallet does incur transaction fees. This
          feature is particularly useful for simplifying the process of sending
          and receiving digital currencies, as it replaces the need for sharing
          lengthy and complex wallet addresses. By using a herotag, users can
          ensure more streamlined and user-friendly transactions. This function
          not only adds a personal touch to your digital wallet but also
          increases the functionality, making digital transactions more
          accessible to everyday users.
        </p>
      </div>
    </div>
  );
};

export default HerotagPage;
