"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccount } from "wagmi";
import LoginButton from "./LoginButton";
export default function SignUpForm() {
  const { address, isConnected } = useAccount();
  return (
    <Card className=" m-auto bg-white shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
        <CardDescription className="text-center">Enter your information to create an account</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gid-cols-1 sm:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first-name">First name</Label>
            <Input id="first-name" placeholder="John" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" placeholder="Ayomide" required />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="bvn">bvn</Label>
          <Input id="bvn" type="text" required />
        </div>
        {isConnected ? (
          <div className="grid gap-2">
            <Label htmlFor="address">Wallet Address</Label>
            <Input id="address" type="text" placeholder="0x..." required value={address} readOnly />
          </div>
        ) : (
          <LoginButton />
        )}
        <Button type="submit" className="w-full" disabled>
          Create an account
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full " />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-2">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:text-primary/80">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
