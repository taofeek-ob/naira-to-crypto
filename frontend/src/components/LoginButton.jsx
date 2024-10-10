"use client";
import WalletWrapper from "./WalletWrapper";

export default function LoginButton() {
  return (
    <WalletWrapper className="w-full bg-primary text-primary-foreground hover:bg-primary/90" text="Connect Wallet" withWalletAggregator={true} />
  );
}
