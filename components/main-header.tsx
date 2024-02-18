import { Github, Twitter } from 'lucide-react';
import { LoginModalButton } from '@/components/elven-ui/login-modal-button';
import { ModeToggle } from '@/components/mode-toggle';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { HeaderAddress } from '@/components/header-address';
import { HeaderChainIndicator } from '@/components/header-chain-indicator';
import Image from 'next/image';

export const MainHeader = () => {
  return (
    <div className="sticky top-0">
      <HeaderChainIndicator />
      <div className="container mx-auto bg-[hsl(var(--background))]/60 backdrop-blur">
        <div className="w-full flex items-center flex-wrap gap-5 py-5 flex-row">
          <div className="flex flex-1 items-center justify-between gap-5">
            <Link href="/">
              <div className="cursor-pointer mb-0 text-4xl font-black text-center leading-none">
                <Image src="/logo.svg" alt={'Logo'} width={50} height={50} />
              </div>
            </Link>
            <Link href="/about" className="font-extrabold">
              About
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden items-center gap-3 sm:flex">
              <a
                href="https://github.com/xdevguild/buildo.dev"
                target="_blank"
                title="GitHub"
              >
                <Github size={30} />
              </a>
              <a href="https://x.com/BuildoDev" target="_blank" title="Twitter">
                <Twitter size={30} />
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
