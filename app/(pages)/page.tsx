import type { NextPage } from 'next';
import { HomeCards } from '@/components/home-cards';
import { OperationsAuthCheck } from '@/app/(operations)/components/operations-ui/operations-auth-check';

const Home: NextPage = () => {
  return (
    <>
      <div className="pt-10 pb-10 md:pt-20 lg:pt-24 lg:pb-24">
        <h1 className="m-auto mb-8 max-w-2xl text-center text-2xl font-black md:text-4xl lg:max-w-4xl lg:text-6xl">
          Your MultiversX companion. Saving you time!
        </h1>
        <h2 className="m-auto max-w-2xl text-center text-sm font-light sm:mb-8 md:text-xl lg:max-w-4xl lg:text-2xl">
          Buildo.dev is a{' '}
          <a
            href="https://multiversx.com"
            target="_blank"
            className="underline"
            rel="nofollow"
          >
            MultiversX
          </a>{' '}
          app that simplifies blockchain interactions, like issuing tokens and
          preparing and broadcasting transactions.
        </h2>
        <h3 className="m-auto hidden max-w-2xl text-center text-xs font-extralight sm:block md:text-sm lg:max-w-4xl">
          Remember that different{' '}
          <a
            className="underline"
            href="https://github.com/multiversx/mx-api-service/blob/main/src/utils/cache.info.ts"
            target="_blank"
          >
            cache strategies for APIs
          </a>
          , mean not all changes will be visible immediately.
          <br />
          Submit bug reports or feature requests directly through the{' '}
          <a
            href="https://github.com/xdevguild/buildo.dev/issues"
            target="_blank"
            className="underline"
          >
            GitHub repository
          </a>
          .
        </h3>
        <OperationsAuthCheck />
      </div>
      <HomeCards />
    </>
  );
};

export default Home;
