import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ElvenInit } from '@/components/elven-ui/elven-init';
import { Toaster } from '@/components/ui/sonner';
import { getMetadata } from '@/lib/get-metadata';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = getMetadata({ isRoot: true });

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
          {children}
        </ThemeProvider>
        <Toaster
          expand={true}
          style={{ top: 85, position: 'fixed' }}
          position="top-right"
        />
      </body>
    </html>
  );
}
