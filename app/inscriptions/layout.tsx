import { Metadata } from 'next';

const dappHostname = process.env.NEXT_PUBLIC_DAPP_HOST;
const title = 'Inscriptions on MultiversX | Buildo.dev';
const description =
  'Experimental Inscriptions. Save custom immutable data cheaper. You can then use it off-chain or for NFTs. (The structure of the data may change!';
const globalImage = `${dappHostname}/og-image.png`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    images: [globalImage],
    description,
    type: 'website',
    url: '/inscriptions/create',
  },
  twitter: {
    title,
    description,
    images: [globalImage],
    card: 'summary_large_image',
  },
};

export default function InscriptionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-1.5 pb-0 pt-8 text-center sm:p-8 sm:text-left">
      <div className="mb-3 px-0 sm:px-8">
        <h1 className="mb-3 text-lg font-semibold leading-none tracking-tight">
          Inscriptions
        </h1>
        <div className="text-sm text-muted-foreground">
          Experimental Inscriptions. Save custom immutable data cheaper. You can
          then use it off-chain or for NFTs. (The structure of the data may
          change!).
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
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
