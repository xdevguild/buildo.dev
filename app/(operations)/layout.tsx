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
    <div className="flex h-screen flex-col">
      <OperationHeader />
      <div className="flex flex-1 flex-col overflow-hidden sm:flex-row">
        <main className="flex-1 overflow-auto bg-zinc-50 px-6 dark:bg-zinc-900 sm:py-6">
          <div className="container rounded-sm border border-border bg-white px-12 py-8 dark:bg-zinc-950">
            {children}
          </div>
        </main>
        <nav className="order-first bg-zinc-50 px-3 dark:bg-zinc-900 sm:w-48 sm:py-6">
          Navigation
        </nav>
      </div>
      <OperationFooter />
    </div>
  );
}
