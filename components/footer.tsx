import packageJson from '@/package.json';
import Link from 'next/link';

export const Footer = () => {
  return (
    <div className="flex h-[114px] items-center">
      <div className="container mx-auto flex flex-col items-center justify-center text-center text-sm">
        <div className="font-bold">
          Your MultiversX Companion: Saving You Time (v
          {`${packageJson.version}`})
        </div>
        <div className="text-xs">
          Made by{' '}
          <a
            href="https://www.julian.io"
            target="_blank"
            className="text-blue-800 dark:text-blue-200"
          >
            Julian.io
          </a>{' '}
          with{' '}
          <a
            href="https://www.useelven.com"
            target="_blank"
            className="text-blue-800 dark:text-blue-200"
          >
            useElven
          </a>{' '}
          and{' '}
          <a
            href="https://github.com/xdevguild/nextjs-dapp-template"
            target="_blank"
            className="text-blue-800 dark:text-blue-200"
          >
            Next.js dApp template
          </a>{' '}
          (
          <Link
            href="/about#disclaimer"
            className="text-blue-800 dark:text-blue-200"
          >
            Disclaimer
          </Link>{' '}
          and{' '}
          <Link
            href="/about#privacy-policy"
            className="text-blue-800 dark:text-blue-200"
          >
            Privacy Policy
          </Link>
          )
        </div>
      </div>
    </div>
  );
};
