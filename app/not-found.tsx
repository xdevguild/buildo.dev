import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="container mx-auto flex min-h-[calc(100vh-281px)] items-center justify-center pb-20 lg:min-h-[calc(100vh-234px)]">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold">The page was not found!</h1>
          <p>Could not find requested resource.</p>
          <Link href="/" className="text-sm underline">
            Return Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
