import { NextPage } from 'next';

const Header = ({ label }: { label: string }) => {
  return <h1 className="text-2xl my-3 font-bold">{label}</h1>;
};

const About: NextPage = () => {
  return (
    <div className="pt-12 max-w-4xl mx-auto">
      <Header label="About" />
      <p className="mb-3">
        The website provides tools that help issue and manage tokens on the
        MultiversX blockchain. It also provides tools that can help with
        interaction with custom smart contracts and APIs.
      </p>
      <p className="mb-3">
        The dapp is built using{' '}
        <a
          href="https://www.useElven.com"
          className="underline"
          target="_blank"
        >
          useElven
        </a>{' '}
        and{' '}
        <a
          href="https://github.com/xdevguild/nextjs-dapp-template"
          className="underline"
          target="_blank"
        >
          Next.js Dapp Template
        </a>
        . Its primary purpose is to discover the requirements for these tools,
        but not only. It can still be used in many use cases on the devnet and
        mainnet.
      </p>
      <p className="mb-3">
        Most of the functionality is ported from the{' '}
        <a
          href="https://github.com/xdevguild/buildo-begins"
          target="_blank"
          className="underline"
        >
          Buildo Begins CLI
        </a>{' '}
        tool. Both projects are still in development but can be already used.
        Always test the app on the devnet first.
      </p>
      <Header label="Disclaimer" />
      <p className="mb-3">
        The website and the tools it provides are shared as they are. There are
        no guarantees that everything works as it should. On the mainnet, use
        them at your own risk, only when you know what you are doing!
      </p>
      <p className="mb-3">
        I will not be liable to You or anyone else for any decision made or
        action taken in reliance on the information given by the Service or for
        any consequential, special, or similar damages, even if advised of the
        possibility of such damages.
      </p>
      <Header label="Privacy Policy" />
      <p className="mb-3">
        The website {"doesn't"} track or collect any {"users'"} data. I{' '}
        {"don't"} use analytics tools and other tools that gather information
        about users. There are no cookies used.
      </p>
      <Header label="High-level Roadmap" />
      <p className="mb-3">
        Buildo.dev will get more functionalities related to smart contracts and
        custom API interactions. It will get signed in the account preview and
        other statistics.
      </p>
      <p className="mb-3">
        The important part is to improve the UI/UX a lot because some forms can
        work better.
      </p>
      <p>
        The timeline is not defined. There is a more detailed{' '}
        <a
          href="https://github.com/orgs/xdevguild/projects/3"
          target="_blank"
          className="underline"
        >
          Kanban
        </a>{' '}
        board to find more up-to-date development information.
      </p>
      <Header label="Report issues and contribute" />
      <p className="mb-3">
        You can contribute and report issues using{' '}
        <a
          href="https://github.com/xdevguild/buildo.dev"
          className="underline"
          target="_blank"
        >
          Buildo.dev Github repository
        </a>
        .
      </p>
      <p className="mb-3">
        Please also let me know what operations need to be included here.
      </p>
      <p className="mb-3">
        If you are interested, you can join the{' '}
        <a
          href="https://github.com/xdevguild"
          target="_blank"
          className="underline"
        >
          xDevGuild
        </a>{' '}
        with your project. Check the{' '}
        <a
          href="https://github.com/orgs/xdevguild/discussions/1"
          target="_blank"
          className="underline"
        >
          guidelines.
        </a>
      </p>
      <Header label="Check other tools" />
      <ul className="mb-3">
        <li>
          <a
            className="underline"
            href="https://github.com/xdevguild/buildo-begins"
            target="_blank"
          >
            Buildo Begins - CLI to simplify interaction with MultiversX
          </a>
        </li>
        <li>
          <a
            className="underline"
            href="https://www.elvenjs.com"
            target="_blank"
          >
            Elven.js - Browser only MultiversX SDK
          </a>
        </li>
        <li>
          <a
            className="underline"
            href="https://www.useelven.com"
            target="_blank"
          >
            useElven - React hooks for MultiversX blockchain
          </a>
        </li>
        <li>
          <a
            className="underline"
            href="https://www.elven.tools"
            target="_blank"
          >
            Elven Tools - Release your NFT or SFT collection (Smart contracts,
            CLI tool, Dapp template)
          </a>
        </li>
        <li>
          <a
            className="underline"
            href="https://github.com/xdevguild/nextjs-dapp-template"
            target="_blank"
          >
            Next.js Dapp Template
          </a>
        </li>
      </ul>
      <Header label="Contact me" />
      <ul className="mb-3">
        <li>
          <a className="underline" href="https://www.julian.io" target="_blank">
            www.julian.io
          </a>
        </li>
        <li>
          <a
            className="underline"
            href="https://twitter.com/theJulianIo"
            target="_blank"
          >
            Twitter
          </a>
        </li>
        <li>julian.cwirko@gmail.com</li>
      </ul>
    </div>
  );
};

export default About;
