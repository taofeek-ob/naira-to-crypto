"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { motion } from "framer-motion";
import { useToast } from "@/components/hooks/use-toast";
import * as Ably from "ably";

export default function LiveTransactions({ initialTransactions }) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const { toast } = useToast();
  const ably = new Ably.Realtime(process.env.NEXT_PUBLIC_ABLY_API_KEY);

  useEffect(() => {
    const channel = ably.channels.get("transactions-channel");

    channel.subscribe("newTransaction", (message) => {
      const newTransaction = message.data;
      setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);

      toast({
        title: "New Transaction",
        description: `Transaction for ₦${newTransaction.amountNaira} for $${newTransaction.amountUSDT} added.`,
        duration: 5000,
      });
    });

    return () => channel.unsubscribe();
  }, []);

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
    <Card>
      <CardHeader>
        <CardTitle>Live Transactions</CardTitle>
        <CardDescription>Real-time updates of transactions</CardDescription>
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
              <TableRow key={index}>
                <motion.td initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                </motion.td>
                <motion.td initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                </motion.td>
                <motion.td initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <TableCell>₦{tx.amountNaira}</TableCell>
                </motion.td>
                <motion.td initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <TableCell>${tx.amountUSDT}</TableCell>
                </motion.td>
                <motion.td initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <TableCell>{truncateWalletAddress(tx.walletAddress)}</TableCell>
                </motion.td>
                <motion.td initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <TableCell>
                    <Button variant="link" asChild>
                      <Link href={`https://sepolia.basescan.org/tx/${tx.transactionHash}`} target="_blank" rel="noopener noreferrer">
                        View on Explorer
                      </Link>
                    </Button>
                  </TableCell>
                </motion.td>
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
  );
}