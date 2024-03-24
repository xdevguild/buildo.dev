import packageJson from '@/package.json';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export const OperationFooter = () => {
  return (
    <>
      <Separator />
      <div className="flex flex-col items-center justify-between p-2 px-3 text-center text-sm sm:flex-row sm:p-4 sm:text-left">
        <div className="text-xs">
          Buildo
          {` (v${packageJson.version})`}{' '}
          <Link href="/about#disclaimer" className="underline">
            Disclaimer
          </Link>{' '}
          and{' '}
          <Link href="/about#privacy-policy" className="underline">
            Privacy Policy
          </Link>
        </div>
        <div className="text-xs">
          Made by{' '}
          <a href="https://www.julian.io" target="_blank" className="underline">
            Julian.io
          </a>{' '}
          with{' '}
          <a
            href="https://www.useelven.com"
            target="_blank"
            className="underline"
          >
            useElven
          </a>{' '}
          and{' '}
          <a
            href="https://github.com/xdevguild/nextjs-dapp-template"
            target="_blank"
            className="underline"
          >
            Next.js dApp template
          </a>
        </div>
      </div>
    </>
  );
};
