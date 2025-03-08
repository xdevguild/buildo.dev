import { FC, useCallback, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { LoginMethodsEnum } from '@useelven/core';
import { Button } from '@/components/ui/button';
import { shortenHash } from '@/lib/shorten-hash';
import { errorParse } from '@/lib/error-parse';
import { Spinner } from '@/components/ui/spinner';

interface LedgerAccountsListProps {
  getHWAccounts: (page?: number, pageSize?: number) => Promise<string[]>;
  resetLoginMethod: () => void;
  handleLogin: (
    type: LoginMethodsEnum,
    ledgerAccountsIndex?: number
  ) => () => void;
}

const ADDRESSES_PER_PAGE = 10;
const LEDGER_NOT_CONNECTED_CODE = 0x6e01;
const LEDGER_DISCONNECTED = 'DisconnectedDeviceDuringOperation';

export const LedgerAccountsList: FC<LedgerAccountsListProps> = ({
  getHWAccounts,
  resetLoginMethod,
  handleLogin,
}) => {
  const [accounts, setAccounts] = useState<string[]>();
  const [listPending, setListPending] = useState(true);
  const [error, setError] = useState<string>();
  const [chosenAddress, setAddress] = useState<string>();

  const router = useRouter();

  const getAccounts = async (page: number) =>
    await getHWAccounts(page, ADDRESSES_PER_PAGE);

  const handleAccounts = async (page: number) => {
    const accountsResult = await getAccounts(page);
    if (accountsResult?.length > 0) setAccounts(accountsResult);
  };

  const handleErrors = (e: unknown) => {
    const err = e as { statusCode: number; name: string };
    if (
      err.statusCode === LEDGER_NOT_CONNECTED_CODE ||
      err.name === LEDGER_DISCONNECTED
    ) {
      setError(
        'Not connected, please check the connection and make sure that you have the MultiversX app opened on your Ledger device.'
      );
    } else {
      setError(`Error: ${errorParse(e)}`);
    }
  };

  const fetchedOnce = useRef<boolean>(false);
  useEffect(() => {
    const fetch = async () => {
      setListPending(true);
      try {
        await handleAccounts(0);
      } catch (e) {
        handleErrors(e);
      } finally {
        setListPending(false);
      }
    };
    if (!fetchedOnce.current) fetch();
    return () => {
      fetchedOnce.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentPage = useRef<number>(0);

  const handlePrev = useCallback(async () => {
    setListPending(true);
    try {
      const prevPage =
        currentPage.current > 0 ? currentPage.current - 1 : currentPage.current;
      currentPage.current = prevPage;
      await handleAccounts(prevPage);
    } catch (e) {
      handleErrors(e);
    } finally {
      setListPending(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = useCallback(async () => {
    setListPending(true);
    try {
      const nextPage = currentPage.current + 1;
      currentPage.current = nextPage;
      await handleAccounts(nextPage);
    } catch (e) {
      handleErrors(e);
    } finally {
      setListPending(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const login = useCallback(
    (index: number, address: string) => () => {
      setAddress(address);
      handleLogin(LoginMethodsEnum.ledger, index)();
    },
    [handleLogin]
  );

  useEffect(() => {
    if (!listPending && !accounts && !error) {
      resetLoginMethod();
    }
  }, [accounts, error, listPending, resetLoginMethod]);

  if (listPending) {
    return (
      <div className="mt-6 flex flex-col items-center justify-center">
        <Spinner />
        <div className="mt-3">Loading addresses, please wait...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-auto mt-6 text-center">
        <div>{error}</div>
        <Button className="mt-4" onClick={handleRefresh}>
          Refresh
        </Button>
      </div>
    );
  }

  if (chosenAddress) {
    return (
      <div className="m-auto mt-6 flex w-full flex-col items-center justify-center border border-solid border-zinc-200 px-8 py-3 break-all sm:w-3/4 dark:border-0">
        <Spinner />
        <div className="mt-3">Confirm on the Ledger device:</div>
        <div className="mt-3 text-center break-words">
          <div className="font-bold">Address:</div> {chosenAddress}
        </div>
      </div>
    );
  }

  if (!accounts) return null;

  return (
    <div className="m-auto mt-6 w-full border border-solid border-zinc-200 px-8 py-3 sm:w-[90%] dark:border-0">
      <div className="mb-2 text-center font-semibold">Choose address:</div>
      {accounts?.map((account: string, index: number) => (
        <div
          key={account}
          className="hover:bg-accent mb-0.5 cursor-pointer rounded-md border border-solid p-2 transition duration-200 hover:border-dotted"
          onClick={login(index, account)}
        >
          <span className="inline-block min-w-4 text-center">
            {index + currentPage.current * ADDRESSES_PER_PAGE}
          </span>
          {': '}
          <span className="hidden flex-1 text-center md:inline-block">
            {shortenHash(account, 14)}
          </span>
          <span className="inline-block flex-1 text-center md:hidden">
            {shortenHash(account, 10)}
          </span>
        </div>
      ))}
      <div className="mt-6 flex justify-between">
        <span
          onClick={handlePrev}
          className={
            currentPage.current === 0
              ? 'cursor-not-allowed opacity-50'
              : 'cursor-pointer opacity-100'
          }
        >
          Prev
        </span>
        <span onClick={handleNext} className="cursor-pointer">
          Next
        </span>
      </div>
    </div>
  );
};
