"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import LoginButton from "./LoginButton";

export default function SignUpForm() {
  const { address, isConnected } = useAccount();

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
        <CardDescription className="text-center">
          Create an account to access our services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="warning" className="bg-yellow-50 border-yellow-200">
          <InfoIcon className="h-4 w-4 text-yellow-500" />
          <AlertTitle className="text-yellow-700">Registration Disabled</AlertTitle>
          <AlertDescription className="text-yellow-600">
            Due to BVN regulations, new registrations are currently disabled. Please{" "}
            <Link href="/login" className="font-medium underline hover:text-yellow-800">
              log in
            </Link>{" "}
            to access dashboard or{" "}
            <Link href="/transactions" className="font-medium underline hover:text-yellow-800">
              view live transactions
            </Link>
            .
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First name</Label>
            <Input id="first-name" placeholder="John" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" placeholder="Ayomide" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bvn">BVN</Label>
          <Input id="bvn" type="text" required />
        </div>
        {isConnected ? (
          <div className="space-y-2">
            <Label htmlFor="address">Wallet Address</Label>
            <Input id="address" type="text" value={address} readOnly />
          </div>
        ) : (
          <LoginButton className="w-full" />
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button type="submit" className="w-full" disabled>
          Create an account
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          
        </div>
    
      </CardFooter>
    </Card>
  );
}