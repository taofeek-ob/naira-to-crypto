import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import LiveTransactions from "@/components/LiveTransactions";
import { Suspense } from "react";
import { getAllTransactions } from "@/lib/mongodb";
import Navbar from "@/components/layout/Navbar";

export default async function TransactionsPage() {
  const initialTransactions = await getAllTransactions();

  const truncateWalletAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const demoDetails = {
    account1: {
      accountNumber: "8548513215",
      bankName: "Wema Bank",
      walletAddress: "0x1cb4f41609e8DC106A56F7c68D6c1c8Efd59F5A5",
    },
    account2: {
      accountNumber: "8548546782",
      bankName: "Wema Bank",
      walletAddress: "0xa50b3b592762B4Ad516b8BBc2561f73987620b90",
    },
  };

  return (
    <>
      <Navbar />
    <div className="container mx-auto p-4 space-y-8">
      
      <Alert className="bg-blue-50 border-blue-200">
        <InfoIcon className="h-4 w-4 text-blue-500" />
        <AlertTitle className="text-blue-700">Experience Real-Time Naira to USDT Conversion</AlertTitle>
        <AlertDescription className="text-blue-600">
          Witness the power of automated cryptocurrency conversion! Send a minimum of 120 Naira to either of the demo accounts below and watch as it's instantly converted to USDT. This live demonstration showcases our cutting-edge fintech solution for seamless fiat-to-crypto transactions.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(demoDetails).map(([key, account]) => (
          <Card key={key} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Demo {key.charAt(0).toUpperCase() + key.slice(1)}</CardTitle>
              <CardDescription>Use this account for testing the conversion</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="flex justify-between">
                <span className="font-semibold text-gray-600">Account Number:</span>
                <span className="font-mono">{account.accountNumber}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold text-gray-600">Bank Name:</span>
                <span>{account.bankName}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold text-gray-600">Wallet Address:</span>
                <span className="font-mono">{truncateWalletAddress(account.walletAddress)}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Live Transactions</CardTitle>
          <CardDescription>Watch real-time Naira to USDT conversions</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div className="text-center py-4">Loading transaction data...</div>}>
            <LiveTransactions initialTransactions={JSON.parse(JSON.stringify(initialTransactions))} />
          </Suspense>
        </CardContent>
      </Card>
      </div>
    
    </>
  );
}