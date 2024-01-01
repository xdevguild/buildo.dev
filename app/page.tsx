import type { NextPage } from 'next';
import { HomeCards } from '@/components/home-cards';
import { OperationsAuthCheck } from '@/components/operations/operations-auth-check';

const Home: NextPage = () => {
  return (
    <>
      <div className="pt-10 md:pt-20 lg:pt-24 pb-10 lg:pb-24">
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-black text-center mb-8 max-w-2xl lg:max-w-4xl m-auto">
          Buildo is your companion through the MultiversX!
        </h1>
        <h2 className="text-sm md:text-xl lg:text-2xl font-light text-center max-w-2xl lg:max-w-4xl m-auto sm:mb-8">
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
        <h3 className="hidden sm:block text-xs md:text-sm font-extralight m-auto max-w-2xl lg:max-w-4xl text-center">
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
