import type { Metadata, NextPage } from 'next';
import { TokenData } from './components/token-data';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Check token data',
  description:
    'Check basic token data. It can be a standard fungible token or collection id for NFT/SFT/Meta tokens.',
  pagePath: '/utilities/token-data',
});

const TokenDataPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl leading-none font-semibold tracking-tight">
          Check token data
        </h1>
        <p className="text-muted-foreground text-sm">
          Check basic token data. It can be a standard fungible token or
          collection id for NFT/SFT/Meta tokens. Useful because Explorer API has
          agressive cache in some cases.
        </p>
      </div>
      <TokenData />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          Explore our comprehensive API where you can access detailed
          information on various types of tokens, including fungible tokens,
          semi-fungible tokens, non-fungible tokens (NFTs), and meta tokens.
          This feature is incredibly valuable for developers who need to quickly
          and efficiently query token data. Whether you&apos;re developing
          blockchain applications, analyzing market trends, or integrating
          digital assets into your projects, our API provides essential data at
          your fingertips. Utilize our tools to gain insights into token
          specifications, ownership details, transaction histories, and more.
          This platform is designed to enhance productivity and streamline
          development processes by offering a centralized solution for all your
          token data needs.
        </p>
      </div>
    </div>
  );
};

export default TokenDataPage;
