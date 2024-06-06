import type { Metadata, NextPage } from 'next';
import { Create } from './components/create';
import { Separator } from '@/components/ui/separator';
import { getMetadata } from '@/lib/get-metadata';

export const metadata: Metadata = getMetadata({
  title: 'MultiversX: Create a Meta ESDT',
  description:
    'A single address can own the role of creating an Meta ESDT. This role can be transferred by using the ESDTNFTCreateRoleTransfer function.',
  pagePath: '/meta-tokens/create',
});

const MetaTokensIssuePage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Create a Meta ESDT
        </h1>
        <p className="text-sm text-muted-foreground">
          A single address can own the role of creating an Meta ESDT. This role
          can be transferred by using the ESDTNFTCreateRoleTransfer function. An
          Meta ESDT can be created on top of an existing ESDT by sending a
          transaction to self that contains the function call that triggers the
          creation.
        </p>
      </div>
      <Create />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          In the MultiversX ecosystem, the creation of a Meta ESDT token is a
          specialized function that can be owned by a single address. This
          crucial role enables the designated address to initiate the creation
          of a Meta ESDT on top of an existing ESDT token. This process is
          facilitated through a transaction sent to the owner&apos;s address
          itself, which includes a specific function call—typically the
          ESDTNFTCreateRoleTransfer function. This function not only triggers
          the creation of the Meta ESDT but also allows for the transfer of the
          creation role to another address, thereby providing flexibility and
          continuity in the management and expansion of token functionalities.
        </p>
        <p className="mb-3">
          The capability to transfer the token creation role is pivotal for
          ensuring that the governance of token creation can adapt to changing
          circumstances, such as changes in project leadership or strategic
          direction. By allowing the transfer of creation roles, MultiversX
          enhances the operational resilience and scalability of tokens within
          its platform. This feature is particularly significant for projects
          that require a decentralized approach to token management or those
          that plan to expand their token&apos;s capabilities over time. Such
          flexibility underscores the robustness of the MultiversX blockchain in
          supporting complex tokenomics and fostering innovative blockchain
          applications.
        </p>
      </div>
    </div>
  );
};

export default MetaTokensIssuePage;
