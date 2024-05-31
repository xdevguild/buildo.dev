import { Github, Twitter } from 'lucide-react';
import { LoginModalButton } from '@/components/elven-ui/login-modal-button';
import { ModeToggle } from '@/components/mode-toggle';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { HeaderAddress } from '@/components/header-address';
import { HeaderChainIndicator } from '@/components/header-chain-indicator';
import Image from 'next/image';

export const OperationHeader = () => {
  return (
    <div>
      <HeaderChainIndicator />
      <div>
        <div className="flex w-full flex-row flex-wrap items-center gap-5 px-3 py-2">
          <div className="flex flex-1 items-center justify-between gap-5">
            <Link href="/">
              <div className="mb-0 cursor-pointer">
                <Image src="/logo.svg" alt={'Logo'} width={30} height={30} />
              </div>
            </Link>
            <Link href="/about" className="font-medium">
              About
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-3 sm:flex">
              <a
                href="https://github.com/xdevguild/buildo.dev"
                target="_blank"
                title="GitHub"
              >
                <Github size={20} />
              </a>
              <a href="https://x.com/BuildoDev" target="_blank" title="Twitter">
                <Twitter size={20} />
              </a>
            </div>
            <HeaderAddress />
            <LoginModalButton />
            <ModeToggle />
          </div>
        </div>
        <Separator />
      </div>
    </div>
  );
};
