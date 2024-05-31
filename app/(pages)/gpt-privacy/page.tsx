import { NextPage } from 'next';

const Header = ({ label }: { label: string }) => {
  return <h1 className="my-3 text-2xl font-bold">{label}</h1>;
};

const SubHeader = ({ label }: { label: string }) => {
  return <h2 className="my-3 text-xl font-bold">{label}</h2>;
};

const GptPrivacy: NextPage = () => {
  return (
    <div className="mx-auto max-w-4xl pt-12">
      <Header label="Privacy Policy for Buildo Expert GPT assistant" />
      <p className="mb-3">
        <strong>Last Updated:</strong> 09 Dec 2023
      </p>

      <SubHeader label="Introduction" />
      <p className="mb-3">
        Buildo Expert GPT assistant integrates {"OpenAI's"} GPT technology and
        connects to the public Multiversx blockchain API. This privacy policy
        explains our commitment to privacy, emphasizing our adherence to{' '}
        {"OpenAI's"} general privacy policy, and details our specific use of the
        Multiversx blockchain API.
      </p>

      <SubHeader label="Adherence to OpenAI's Privacy Policy" />
      <p className="mb-3">
        - Buildo Expert GPT assistant fully adheres to the privacy practices and
        guidelines set forth in {"OpenAI's"} general privacy policy.
        <br />- We do not collect, store, or use any personal data beyond what
        is collected by OpenAI services. Our use of GPT technology is in strict
        compliance with {"OpenAI's"} data handling and privacy standards.
      </p>

      <SubHeader label="Use of Multiversx Blockchain API" />
      <p className="mb-3">
        - Buildo Expert GPT assistant accesses public information available on
        the Multiversx blockchain via its public API.
        <br />
        - The data retrieved includes transaction data, wallet addresses, and
        other blockchain-related information that is publicly accessible.
        <br />- We do not store any blockchain data on our servers. The
        assistant retrieves this information in real-time to respond to user
        queries.
      </p>

      <SubHeader label="No Additional Data Collection" />
      <p className="mb-3">
        - Apart from the data processed through {"OpenAI's"} services, Buildo
        Expert GPT assistant does not collect any additional personal data.
        <br />- Our use of the Multiversx blockchain API involves accessing
        publicly available data only, without storing or processing personal
        user data.
      </p>

      <SubHeader label="Data Security" />
      <p className="mb-3">
        - In line with {"OpenAI's"} privacy policy, there are appropriate
        security measures provided by OpenAI to protect data from unauthorized
        access or disclosure.
        <br />- However, users should be aware that no internet-based service
        can guarantee complete data security.
      </p>

      <SubHeader label="Changes to This Privacy Policy" />
      <p className="mb-3">
        - We may update this policy to reflect changes in our practices or in
        the features of Buildo Expert GPT assistant.
      </p>

      <SubHeader label="Contact Us" />
      <p className="mb-3">
        For any questions or concerns regarding this privacy policy, please
        contact us at julian.cwirko@gmail.com
      </p>
    </div>
  );
};

export default GptPrivacy;
