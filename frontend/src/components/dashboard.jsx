"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "./ui/button";
import Navbar from "./Navbar";
export default function DashboardComponent({ user, transactions }) {
  // Calculate total balance
  const totalNaira = transactions.reduce((sum, tx) => sum + tx.amountNaira, 0);
  const totalUSDT = transactions.reduce((sum, tx) => sum + tx.amountUSDT, 0);

  return (
    <>
      <Navbar address={user.walletAddress} />
      <div className="flex flex-col min-h-screen w-full p-4">
        {/* Welcome header */}
        <header className="h-14 flex items-center border-b mb-8">
          <h1 className="text-3xl font-bold">Welcome, {user.fullName}</h1>
        </header>

        {/* Responsive Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
          {/* Card 1: Total Balance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Transaction Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <p className="text-2xl font-bold">{totalNaira.toFixed(2)} NGN</p>
                <p className="text-2xl font-bold">{totalUSDT.toFixed(2)} USDT</p>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Bank Account */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Virtual Account</CardTitle>
              <CardDescription>Send 120 Naira to this account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">{user.bankAccount.bankName}</p>
                <p className="text-lg font-semibold">{user.bankAccount.accountNumber}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions (for context) */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount (NGN)</TableHead>
                  <TableHead>Amount (USDT)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx._id}>
                    <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                    <TableCell>{tx.amountNaira.toFixed(2)}</TableCell>
                    <TableCell>{tx.amountUSDT.toFixed(2)}</TableCell>
                    <TableCell>Completed</TableCell>
                    <TableCell>
                      <Button variant="link" asChild>
                        <Link href={`https://sepolia.basescan.org/tx/${tx.transactionHash}`} target="_blank" rel="noopener noreferrer">
                          View on Explorer
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="border-t py-6 md:py-0 mt-auto">
          <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
            <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 NairaCrypto. All rights reserved.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                Terms of Service
              </Link>
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                Privacy
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}
