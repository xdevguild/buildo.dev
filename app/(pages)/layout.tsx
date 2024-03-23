import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const dappHostname = process.env.NEXT_PUBLIC_DAPP_HOST;
const globalTitle = 'Buildo is your companion through the MultiversX';
const globalDescription =
  'Buildo.dev is a MultiversX app that helps with blockchain interactions, like issuing tokens and querying smart contracts.';
const globalImage = `${dappHostname}/og-image.png`;

// TODO: cleanup all the metadata for all pages
export const metadata: Metadata = {
  metadataBase: new URL(dappHostname!),
  title: globalTitle,
  description: globalDescription,
  authors: { name: 'Buildo.dev', url: 'https://www.buildo.dev' },
  openGraph: {
    title: globalTitle,
    images: [globalImage],
    description: globalDescription,
    type: 'website',
    url: dappHostname,
  },
  twitter: {
    title: globalTitle,
    description: globalDescription,
    images: [globalImage],
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="container mx-auto min-h-[calc(100vh-281px)] pb-20 lg:min-h-[calc(100vh-234px)]">
        {children}
      </div>
      <Footer />
    </>
  );
}
