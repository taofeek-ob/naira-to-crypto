"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { Button } from "./ui/button";
import Navbar from "./Navbar";

export default function DashboardComponent({ user, transactions }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Calculate total balance
  const totalNaira = transactions.reduce((sum, tx) => sum + tx.amountNaira, 0);
  const totalUSDT = transactions.reduce((sum, tx) => sum + tx.amountUSDT, 0);

  const truncateWalletAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar address={user.walletAddress} />
      <div className="flex flex-col min-h-screen w-full p-4">
        {/* Welcome header */}
        <header className="h-14 flex items-center mb-8">
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
                <p className="text-2xl font-bold">₦{totalNaira.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p className="text-2xl font-bold">${totalUSDT.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Bank Account */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Virtual Account</CardTitle>
              <CardDescription>Send minimum of 120 Naira for a Base Sepolia USDT</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">{user.bankAccount.bankName}</p>
                <p className="text-lg font-semibold">{user.bankAccount.accountNumber}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions (with pagination) */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <span>Show</span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => {
                    setItemsPerPage(Number(value));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue>{itemsPerPage}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span>entries</span>
              </div>
              <div>
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, transactions.length)} of {transactions.length} entries
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Naira Transferred *100</TableHead>
                  <TableHead>USDT Received</TableHead>
                  <TableHead>Wallet Address</TableHead>
                  <TableHead>Base Sepolia Explorer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentTransactions.map((tx, index) => (
                  <TableRow key={tx._id}>
                    <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                    <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                    <TableCell>₦{tx.amountNaira.toFixed(2)}</TableCell>
                    <TableCell>${tx.amountUSDT.toFixed(2)}</TableCell>
                    <TableCell>{truncateWalletAddress(tx.walletAddress)}</TableCell>
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
            <div className="flex justify-between items-center mt-4">
              <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </Button>
              <div>
                Page {currentPage} of {totalPages}
              </div>
              <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}