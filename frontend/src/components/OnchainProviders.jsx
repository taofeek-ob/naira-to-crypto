"use client";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { base } from "viem/chains";
import { WagmiProvider } from "wagmi";
import { NEXT_PUBLIC_CDP_API_KEY } from "../config";
import { useWagmiConfig } from "../wagmi";

const queryClient = new QueryClient();

function OnchainProviders({ children }) {
  const wagmiConfig = useWagmiConfig();

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider apiKey={NEXT_PUBLIC_CDP_API_KEY} chain={base}>
          <RainbowKitProvider modalSize="compact">{children}</RainbowKitProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default OnchainProviders;
