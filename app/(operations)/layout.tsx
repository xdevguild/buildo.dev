import { Metadata } from 'next';
import { OperationHeader } from '@/components/operation-header';
import { OperationFooter } from '@/components/operation-footer';

// TODO: manage meta for all pages
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

export default function OperationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OperationHeader />
      <div className="flex flex-col space-y-1.5 text-center sm:text-left pt-8 sm:p-8 pb-0">
        <div>{children}</div>
      </div>
      <OperationFooter />
    </>
  );
}
