"use client";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { Address, Avatar, EthBalance, Identity, Name } from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  ConnectWalletText,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownDisconnect,
  WalletDropdownFundLink,
  WalletDropdownLink,
} from "@coinbase/onchainkit/wallet";
import { useRouter } from "next/navigation";

type WalletWrapperParams = {
  text?: string;
  className?: string;
  address?: string;
  withWalletAggregator?: boolean;
};
export default function WalletWrapper({ className, text, withWalletAggregator = false }: WalletWrapperParams) {
  const { isConnected, address, isDisconnected } = useAccount();
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/checkAuth");
      const data = await res.json();

      if (data.authenticated) {
        return true;
      } else {
        return false;
      }
    };

    const handleLogout = async () => {
      if (isDisconnected) {
        const isAuthenticated = await checkAuth();

        if (isAuthenticated) {
          // If the wallet is disconnected and the user is authenticated
          await fetch("/api/logout", { method: "POST" });
        }
        // Redirect to the home page
        router.push("/login");
      }
    };

    handleLogout();
  }, [isDisconnected]);
  return (
    <>
      <Wallet className="mx-auto">
        <ConnectWallet withWalletAggregator={withWalletAggregator} className={className}>
          <ConnectWalletText>{text}</ConnectWalletText>

          <Avatar className="h-6 w-6" />
          <Name />
        </ConnectWallet>
        <WalletDropdown>
          <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick={true}>
            <Avatar />
            <Name />
            <Address />
            <EthBalance />
          </Identity>
          <WalletDropdownBasename />
          <WalletDropdownLink icon="wallet" href={"https://sepolia.basescan.org/address/" + address} target="_blank">
            Go to Wallet Explorer
          </WalletDropdownLink>
          <WalletDropdownFundLink />
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
    </>
  );
}
