"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { useAccount, useSignMessage, usePublicClient } from "wagmi";
import LoginButton from "@/components/LoginButton";
import { useRouter } from "next/navigation";
import { createSiweMessage } from "viem/siwe";
import { baseSepolia } from "viem/chains";
import { checkUserExists } from "../app/actions";

export default function LoginForm() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage({});
  const client = usePublicClient();
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleWalletSignIn = async () => {
    try {
      setError(null); // Clear any previous errors
      const nonce = `${Date.now()}`;
      const statement = `Nonce: ${nonce}`;
      const message = createSiweMessage({
        domain: window.location.host,
        address,
        statement,
        uri: window.location.origin,
        version: "1",
        chainId: baseSepolia.id,
        nonce,
      });

      const signature = await signMessageAsync({
        message,
      });

      // Verify the signature
      const isValid = await client.verifyMessage({ address, message, signature });

      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isValid,
          address,
        }),
      });

      const result = await response.json();

      if (result.success) {
        const { exists } = await checkUserExists(address);
        if (exists) router.push("/dashboard/" + address);
        else router.push("/login");
      } else {
        setError("Signature verification failed: " + result.error);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };
  return (
    <Card className="bg-white w-fit max-w-sm m-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Login</CardTitle>
        <CardDescription className="text-secondary-foreground">Due to bvn regulations, use the wallet information below to login</CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4 bg-secondary text-secondary-foreground">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle className="font-semibold">Demo Information</AlertTitle>
          <AlertDescription>Wallet address: 0x1234...5678</AlertDescription>
          <AlertDescription>Private key: abcd...efgh</AlertDescription>
        </Alert>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!isConnected ? (
          <LoginButton />
        ) : (
          <Button onClick={handleWalletSignIn} className="w-fit mx-auto bg-primary text-primary-foreground hover:bg-primary/90">
            Verify Wallet
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
