"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useToast } from "@/components/hooks/use-toast"
import * as Ably from 'ably';
export default function LiveTransactions({ initialTransactions }) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const { toast } = useToast()
  useEffect(() => {

    


 const ably = new Ably.Realtime(process.env.NEXT_PUBLIC_ABLY_API_KEY);

    const channel = ably.channels.get('transactions-channel');

    channel.subscribe('newTransaction', (message) => {
      const newTransaction = message.data;
      setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);

       toast({
        title: "New Transaction",
        description: `Transaction for ₦${newTransaction.amountNaira} for $${newTransaction.amountUSDT} added.`,
        duration: 5000, // Duration of toast in ms
      });
    });

   return () => channel.unsubscribe();
  }, []);

const truncateWalletAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Date</TableHead>
              <TableHead> Naira Transferred *100</TableHead>
              <TableHead> USDT Received</TableHead>
              <TableHead>Wallet Address</TableHead>
              <TableHead>Explorer</TableHead>
            </TableRow>
          </TableHeader>
         <TableBody>
            {transactions.map((tx, index) => (
              <TableRow key={index}>
                {/* Wrap individual TableCell in motion.div */}
                <motion.td
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TableCell>{index + 1}</TableCell>
                </motion.td>
                <motion.td
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                </motion.td>
                <motion.td
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TableCell>₦{tx.amountNaira}</TableCell>
                </motion.td>
                <motion.td
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TableCell>${tx.amountUSDT}</TableCell>
                </motion.td>
                <motion.td
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TableCell>{truncateWalletAddress(tx.walletAddress)}</TableCell>
                </motion.td>
                <motion.td
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
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
      </CardContent>
    </Card>
  );
}
