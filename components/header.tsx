import { LoginModalButton } from '@/components/elven-ui/login-modal-button';
import { ModeToggle } from '@/components/mode-toggle';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { HeaderAddress } from '@/components/header-address';
import { HeaderChainIndicator } from '@/components/header-chain-indicator';
import Image from 'next/image';

export const Header = () => {
  return (
    <div className="sticky top-0">
      <HeaderChainIndicator />
      <div className="container mx-auto bg-[hsl(var(--background))]/60 backdrop-blur-sm">
        <div className="flex w-full flex-row flex-wrap items-center gap-5 py-5">
          <div className="flex flex-1 items-center justify-between gap-5">
            <Link href="/">
              <div className="mb-0 cursor-pointer text-center text-4xl leading-none font-black">
                <Image src="/logo.svg" alt={'Logo'} width={50} height={50} />
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
                <Image
                  src="/github.svg"
                  width={20}
                  height={20}
                  alt="Buildo GitHub"
                />
              </a>
              <a href="https://x.com/BuildoDev" target="_blank" title="Twitter">
                <Image
                  src="/x.svg"
                  width={18}
                  height={18}
                  alt="Buildo X.com"
                  className="mt-[2px]"
                />
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
