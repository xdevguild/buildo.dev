import { Metadata } from 'next';
import { OperationHeader } from '@/app/(operations)/components/operations-ui/operation-header';
import { OperationFooter } from '@/app/(operations)/components/operations-ui/operation-footer';
import { OperationsMenu } from '@/app/(operations)/components/operations-ui/operations-menu';

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
    url: '',
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
    <div className="fixed flex h-screen w-full flex-col">
      <OperationHeader />
      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        <nav className="border-border bg-background border-r px-3 lg:w-64 lg:px-6 lg:py-8">
          <OperationsMenu />
        </nav>
        <main className="flex-1 overflow-auto bg-zinc-50 px-2 lg:px-6 lg:py-8 dark:bg-zinc-900">
          <div className="border-border bg-background container mx-auto mt-3 max-w-6xl rounded-2xl border px-12 py-8 lg:mt-auto">
            {children}
          </div>
        </main>
      </div>
      <OperationFooter />
    </div>
  );
}
