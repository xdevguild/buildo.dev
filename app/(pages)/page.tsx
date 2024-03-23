import type { NextPage } from 'next';
import { HomeCards } from '@/components/home-cards';
import { OperationsAuthCheck } from '@/components/operations/operations-auth-check';

const Home: NextPage = () => {
  return (
    <>
      <div className="pb-10 pt-10 md:pt-20 lg:pb-24 lg:pt-24">
        <h1 className="m-auto mb-8 max-w-2xl text-center text-2xl font-black md:text-4xl lg:max-w-4xl lg:text-6xl">
          Buildo is your companion through the MultiversX!
        </h1>
        <h2 className="m-auto max-w-2xl text-center text-sm font-light sm:mb-8 md:text-xl lg:max-w-4xl lg:text-2xl">
          Buildo.dev is a{' '}
          <a
            href="https://multiversx.com"
            target="_blank"
            className="underline"
          >
            MultiversX
          </a>{' '}
          app that helps with blockchain interactions, like issuing tokens and
          querying smart contracts.
        </h2>
        <h3 className="m-auto hidden max-w-2xl text-center text-xs font-extralight sm:block md:text-sm lg:max-w-4xl">
          If you like to work with CLI tools, check the{' '}
          <a
            href="https://github.com/xdevguild/buildo-begins"
            target="_blank"
            className="underline"
          >
            Buildo Begins
          </a>{' '}
          CLI! Check the{' '}
          <a
            href="https://chat.openai.com/g/g-GN0Zq0iZP-buildo-expert"
            target="_blank"
            className="underline"
          >
            Buildo Expert GPT Assistant
          </a>
          <br />
          Remember that there are different{' '}
          <a
            className="underline"
            href="https://github.com/multiversx/mx-api-service/blob/main/src/utils/cache.info.ts"
            target="_blank"
          >
            cache strategies for API
          </a>
          , so not all changes will be visible immediately.
        </h3>
        <OperationsAuthCheck />
      </div>
      <HomeCards />
    </>
  );
};

export default Home;
