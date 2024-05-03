import type { NextPage } from 'next';
import { Send } from './components/send';
import { Separator } from '@/components/ui/separator';

const SendEgld: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Transfer an amount of the native EGLD token
        </h1>
        <p className="text-sm text-muted-foreground">
          Performing an EGLD transfer is done by sending a transaction directly
          to the desired receiver Account.
        </p>
      </div>
      <Send />
      <Separator className="my-12" />
      <div className="text-xs">
        <p>
          Transferring eGold (EGLD) between wallets on MultiversX is
          straightforward and doesn&apos;t always need a smart contract. This
          process involves a few important steps to ensure that the EGLD reaches
          the right person safely and securely. Here&apos;s a simpler breakdown
          of how it works:
        </p>
        <h2 className="py-2 text-sm font-semibold">
          Getting the Transaction Ready
        </h2>
        <p>
          First off, you need to set up the transaction. This means deciding how
          much EGLD you want to send and who you want to send it to. You also
          need a nonce, which is just a fancy way of saying a unique number for
          each transaction you make, to keep things in order and secure.
        </p>{' '}
        <h2 className="py-2 text-sm font-semibold">Signing the Transaction</h2>
        <p>
          Next, you sign the transaction with your private key. Think of this
          like putting your digital signature on a document. It proves that you
          are really you and that you approve this transaction. This step is
          crucial for keeping your EGLD safe.
        </p>{' '}
        <h2 className="py-2 text-sm font-semibold">Sending it Off</h2>{' '}
        <p>
          Once signed, your transaction is ready to fly. You broadcast it,
          meaning you send it out to the MultiversX network. Now, it&apos;s in
          the hands of the network&apos;s validators.{' '}
        </p>
        <h2 className="py-2 text-sm font-semibold">
          Validators Check and Confirm
        </h2>
        <p>
          The validators have a look at your transaction to make sure everything
          checks out. They verify your signature, make sure you have enough EGLD
          to cover the transfer and the transaction fee, and confirm the nonce
          matches up. If all is good, they include your transaction in the next
          block of transactions that gets added to the blockchain.
        </p>
        <h2 className="py-2 text-sm font-semibold">All Done!</h2>
        <p>
          After your transaction is safely tucked into a block on the
          blockchain, it&apos;s considered confirmed. This means it&apos;s
          complete and irreversible. You can then use a blockchain explorer to
          check on your transaction using its unique hash—a sort of receipt
          number. And that&apos;s it! Sending EGLD from one wallet to another on
          MultiversX doesn&apos;t have to be complicated. It&apos;s all about
          preparing your transaction, signing it for security, and letting the
          network do its thing to verify and confirm the transfer. This keeps
          your EGLD safe every step of the way.
        </p>
      </div>
    </div>
  );
};

export default SendEgld;
