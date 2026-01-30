import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0">
        <div className="container mx-auto bg-[hsl(var(--background))]/60 backdrop-blur-sm">
          <div className="flex w-full flex-row flex-wrap items-center gap-5 py-5">
            <div className="flex flex-1 items-center justify-between gap-5">
              <Link href="/">
                <div className="mb-0 cursor-pointer text-center text-4xl leading-none font-black">
                  <Image src="/logo.svg" alt="Logo" width={50} height={50} />
                </div>
              </Link>
              <Link href="/about" className="font-medium">
                About
              </Link>
            </div>
          </div>
          <div className="bg-border h-px w-full" />
        </div>
      </header>

      <main className="container mx-auto flex flex-1 items-center justify-center pb-20">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold">The page was not found!</h1>
          <p className="text-muted-foreground mt-1">
            Could not find requested resource.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block text-sm font-medium underline underline-offset-4"
          >
            Return Home
          </Link>
        </div>
      </main>

      {/* Static footer look */}
      <footer className="border-border flex h-[114px] items-center border-t">
        <div className="container mx-auto flex flex-col items-center justify-center text-center text-sm">
          <div className="font-bold">
            Your MultiversX Companion: Saving You Time
          </div>
          <div className="text-muted-foreground mt-1 text-xs">
            Made by{' '}
            <a
              href="https://www.julian.io"
              target="_blank"
              rel="noreferrer"
              className="text-blue-800 dark:text-blue-200"
            >
              Julian.io
            </a>{' '}
            with{' '}
            <a
              href="https://www.useelven.com"
              target="_blank"
              rel="noreferrer"
              className="text-blue-800 dark:text-blue-200"
            >
              useElven
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
