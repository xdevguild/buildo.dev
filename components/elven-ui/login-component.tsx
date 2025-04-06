// Login component wraps all auth services in one place
// You can always use only one of them if needed
import { useCallback, memo, useState } from 'react';
import { useLogin, LoginMethodsEnum } from '@useelven/core';
import { WalletConnectQRCode } from '@/components/elven-ui/walletconnect-qr-code';
import { WalletConnectPairings } from '@/components/elven-ui/walletconnect-pairings';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { LedgerAccountsList } from '@/components/elven-ui/ledger-accounts-list';
import { getLoginMethodDeviceName } from '@/lib/get-signing-device-name';

export const LoginComponent = memo(() => {
  const {
    login,
    isLoggingIn,
    error,
    walletConnectUri,
    getHWAccounts,
    walletConnectPairingLogin,
    walletConnectPairings,
    walletConnectRemovePairing,
  } = useLogin();

  const [loginMethod, setLoginMethod] = useState<LoginMethodsEnum>();

  const handleLogin = useCallback(
    (
      type: LoginMethodsEnum,
      ledgerAccountsIndex?: number,
      page?: number,
      pageSize?: number
    ) =>
      () => {
        setLoginMethod(type);
        login(type, ledgerAccountsIndex, page, pageSize);
      },
    [login]
  );

  const handleLedgerAccountsList = useCallback(() => {
    setLoginMethod(LoginMethodsEnum.ledger);
  }, []);

  const resetLoginMethod = useCallback(() => {
    setLoginMethod(undefined);
  }, []);

  const ledgerOrPortalName = getLoginMethodDeviceName(loginMethod!);

  if (error)
    return (
      <div className="flex flex-col">
        <div className="text-center">{error}</div>
        <div className="pt-4 text-center font-bold">Close and try again</div>
      </div>
    );

  return (
    <>
      {isLoggingIn ? (
        <div className="inset-0 z-50 flex min-h-[200px] items-center justify-center">
          <div>
            {ledgerOrPortalName ? (
              <div className="mb-4">
                <div className="text-center text-lg">Confirmation required</div>
                <div className="text-center text-sm">
                  Approve on {ledgerOrPortalName}
                </div>
              </div>
            ) : null}
            <div className="flex items-center justify-center">
              <Spinner size="26" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 lg:px-8">
          <Button
            className="h-auto w-full py-3 select-none"
            variant="outline"
            onClick={handleLogin(LoginMethodsEnum.walletconnect)}
          >
            xPortal Mobile App
          </Button>

          <Button
            className="h-auto w-full py-3 select-none"
            variant="outline"
            onClick={handleLogin(LoginMethodsEnum.extension)}
          >
            MultiversX Browser Extension
          </Button>
          <Button
            className="h-auto w-full py-3 select-none"
            variant="outline"
            onClick={handleLogin(LoginMethodsEnum.wallet)}
          >
            MultiversX Web Wallet
          </Button>
          <Button
            className="h-auto w-full py-3 select-none"
            variant="outline"
            onClick={handleLedgerAccountsList}
          >
            Ledger
          </Button>
          <Button
            className="h-auto w-full py-3 select-none"
            variant="outline"
            onClick={handleLogin(LoginMethodsEnum.xalias)}
          >
            xAlias
          </Button>
        </div>
      )}

      {loginMethod === LoginMethodsEnum.walletconnect && walletConnectUri && (
        <div className="mt-5">
          <WalletConnectQRCode uri={walletConnectUri} />
        </div>
      )}
      {loginMethod === LoginMethodsEnum.walletconnect &&
        walletConnectPairings &&
        walletConnectPairings.length > 0 && (
          <WalletConnectPairings
            pairings={walletConnectPairings}
            login={walletConnectPairingLogin}
            remove={walletConnectRemovePairing}
          />
        )}
      {loginMethod === LoginMethodsEnum.ledger && (
        <LedgerAccountsList
          getHWAccounts={getHWAccounts}
          resetLoginMethod={resetLoginMethod}
          handleLogin={handleLogin}
        />
      )}
    </>
  );
});

LoginComponent.displayName = 'LoginComponent';
