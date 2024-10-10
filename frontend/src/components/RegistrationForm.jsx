"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { registerUser } from "@/app/actions";

export default function RegistrationForm({ walletAddress }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (formData) => {
    startTransition(async () => {
      const result = await registerUser(formData);
      if (result.success) {
        router.push(`/dashboard/${walletAddress}`);
      }
    });
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      {isPending && (
        <Alert>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <AlertDescription>Registering user...</AlertDescription>
        </Alert>
      )}
      <div>
        <Label htmlFor="walletAddress">Wallet Address</Label>
        <Input id="walletAddress" name="walletAddress" value={walletAddress} readOnly className="bg-muted" />
      </div>
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" name="fullName" required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="bvn">BVN</Label>
        <Input id="bvn" name="bvn" required />
      </div>
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Register"}
      </Button>
    </form>
  );
}
