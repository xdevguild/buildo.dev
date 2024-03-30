import { NextPage } from 'next';

const Header = ({ label }: { label: string }) => {
  return (
    <h2
      id={label.toLowerCase().replaceAll(' ', '-')}
      className="my-3 scroll-mt-32 text-2xl font-bold"
    >
      {label}
    </h2>
  );
};

const About: NextPage = () => {
  return (
    <div className="mx-auto max-w-4xl pt-12">
      <h1 className="my-3 text-2xl font-bold">About</h1>
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
      <p className="mb-3 font-extrabold">Last Updated: 2024-03-30</p>

      <p className="mb-3">
        By using Buildo.dev, you acknowledge and agree to the terms outlined in
        this disclaimer. Buildo.dev is designed to facilitate transactions on
        the MultiversX blockchain directly within your browser without
        third-party involvement. While we strive to provide a seamless and
        secure experience, it is crucial to understand the inherent risks
        associated with blockchain transactions and the use of our platform.
      </p>

      <p className="font-extrabold">No Liability</p>
      <p className="mb-3">
        Buildo.dev and its developers, affiliates, or agents will not be liable
        for any direct, indirect, incidental, consequential, or any other
        damages arising out of or in connection with your use of this
        website/app or any transaction conducted through it on the MultiversX
        blockchain mainnet. This includes, but is not limited to, loss of data,
        income, profit, or opportunity, as well as any other possible damages,
        even if we have been advised of the possibility of such damages.
      </p>

      <p className="font-extrabold">Testing on Devnet</p>
      <p className="mb-3">
        We strongly advise all users to thoroughly test their transactions on
        the MultiversX blockchain devnet before executing them on the mainnet.
        The devnet provides a safe environment to ensure the intended outcomes
        of your transactions without risking real assets. Failure to test on the
        devnet first may result in unexpected outcomes for which Buildo.dev
        bears no responsibility.
      </p>

      <p className="font-extrabold">Open Source Software</p>
      <p className="mb-3">
        The source code for Buildo.dev is openly available for review. We
        encourage all users to inspect and analyze the code to understand its
        functionality fully and assess its security before use. The open-source
        nature of our platform is intended to foster transparency and trust;
        however, it is the user&apos;s responsibility to ensure they are
        satisfied with the software&apos;s safety and reliability before
        engaging in any transactions.
      </p>

      <p className="font-extrabold">Your Responsibility</p>
      <p className="mb-3">
        As a user, you bear full responsibility for all transactions you execute
        using Buildo.dev and the MultiversX blockchain. You are urged to
        exercise caution, perform due diligence, and consider the risks involved
        in blockchain transactions.
      </p>

      <p>
        By continuing to use Buildo.dev, you agree to this disclaimer and
        acknowledge understanding the risks involved.
      </p>

      <Header label="Privacy Policy" />
      <p className="mb-3 font-extrabold">Last Updated: 2024-03-30</p>

      <p className="mb-3">
        Welcome to Buildo.dev, a digital platform dedicated to enabling
        transactions on MultiversX with in-browser signing capabilities. At
        Buildo.dev, we prioritize your privacy and are committed to protecting
        it. This Privacy Policy outlines the types of information we do not
        collect, our stance on cookies, and how we handle transactions without
        any third-party involvement.
      </p>

      <p className="font-extrabold">Information We Do Not Collect</p>
      <p className="mb-3">
        Buildo.dev is designed to operate without the need to collect personal
        information from its users. Our services allow you to perform
        transactions on MultiversX directly within your browser. We do not have
        a backend infrastructure, and we do not store, process, or transmit any
        personal data.
      </p>

      <p className="font-extrabold">Cookies</p>
      <p className="mb-3">
        Buildo.dev does not use cookies. We believe in providing a seamless
        experience that respects your privacy, which means you can use our
        services without worrying about tracking or storage of cookies on your
        device.
      </p>

      <p className="font-extrabold">Transactions</p>
      <p className="mb-3">
        Our platform facilitates transactions on MultiversX without any
        third-party involvement. All transactions are signed and executed
        directly within your browser. Buildo.dev does not store or track the
        details of these transactions. Responsibility for the security and
        privacy of the transaction details lies solely with the user and the
        MultiversX blockchain.
      </p>

      <p className="font-extrabold">No Third-Party Sharing</p>
      <p className="mb-3">
        Given our operational model, there is no collection of personal
        information, and thus, no sharing of such information with third
        parties.
      </p>

      <p className="font-extrabold">Changes to Our Privacy Policy</p>
      <p className="mb-3">
        Buildo.dev reserves the right to modify this privacy policy at any time.
        Any changes will be posted on this page with an updated revision date.
        We encourage you to review our Privacy Policy regularly to stay informed
        about our practices.
      </p>

      <p className="font-extrabold">Contact Us</p>
      <p>
        If you have any questions or concerns regarding this Privacy Policy,
        please contact us at julian.cwirko@gmail.com.
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
