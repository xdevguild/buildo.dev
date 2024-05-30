import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

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
