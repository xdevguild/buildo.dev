import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ElvenInit } from '@/components/elven-ui/elven-init';
import { MainHeader } from '@/components/main-header';
import { MainFooter } from '@/components/main-footer';

const inter = Inter({ subsets: ['latin'] });

const dappHostname = process.env.NEXT_PUBLIC_DAPP_HOST;
const globalTitle = 'Buildo is your companion through the MultiversX';
const globalDescription =
  'Buildo.dev is a MultiversX app that helps with blockchain interactions, like issuing tokens and querying smart contracts.';
const globalImage = `${dappHostname}/og-image.png`;

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
    <html lang="en">
      <body className={inter.className}>
        <ElvenInit />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MainHeader />
          <div className="container mx-auto min-h-[calc(100vh-281px)] lg:min-h-[calc(100vh-234px)] pb-20">
            {children}
          </div>
          <MainFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
