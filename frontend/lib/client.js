import { createPublicClient, createWalletClient, http } from "viem";
import { baseSepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: baseSepolia,
  transport: http(),
});
