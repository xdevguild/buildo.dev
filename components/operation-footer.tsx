import packageJson from '@/package.json';
import Link from 'next/link';

export const OperationFooter = () => {
  return (
    <div className="flex items-center justify-between text-sm px-3">
      <div className="text-xs">
        Buildo
        {`(v${packageJson.version})`}{' '}
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
        </a>
      </div>
    </div>
  );
};
