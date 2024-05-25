import type { NextPage } from 'next';
import { ChangeAttributes } from './components/change-attributes';
import { Separator } from '@/components/ui/separator';

const NonFungibleChangeAttributesPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Change attributes
        </h1>
        <p className="text-sm text-muted-foreground">
          An user that has the ESDTRoleNFTUpdateAttributes role set for a given
          ESDT, can change the attributes of a given NFT.
          ESDTNFTUpdateAttributes will remove the old attributes and add the new
          ones. Therefore, if you want to keep the old attributes you will have
          to pass them along with the new ones.
        </p>
      </div>
      <ChangeAttributes />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          In the realm of blockchain technology, particularly within the context
          of Non-Fungible Tokens (NFTs), the role of an
          ESDTRoleNFTUpdateAttributes is crucial for the management and
          modification of NFT attributes. This specific role enables users to
          actively update and alter the characteristics associated with an NFT
          on the blockchain. When an individual possesses this role for a
          particular eStandard Digital Token (ESDT), they gain the capability to
          change these attributes as necessary. It&apos;s important to note that
          this process involves the removal of the NFT&apos;s existing
          attributes, replacing them with newly specified ones. Therefore, to
          retain any desired attributes from the original set, they must be
          explicitly included along with the new attributes during the update
          process.
        </p>
        <p className="mb-3">
          The process of updating NFT attributes using the
          ESDTNFTUpdateAttributes function is a vital tool for developers and
          asset managers in the digital asset space. By enabling the precise
          modification of attributes, this function facilitates the enhancement
          and customization of NFTs, ensuring they can evolve over time or adapt
          to new requirements or contexts. This adaptability is essential for
          maintaining the relevancy and value of digital assets in a rapidly
          changing market. Additionally, the need to resubmit old attributes if
          they are to be retained underscores the importance of meticulous
          attribute management. Users must carefully plan and execute attribute
          updates to ensure that no critical information is lost, while also
          leveraging the opportunity to add new features and value to their
          digital assets.
        </p>
      </div>
    </div>
  );
};

export default NonFungibleChangeAttributesPage;
