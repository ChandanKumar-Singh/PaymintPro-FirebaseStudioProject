'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MoreHorizontal } from "lucide-react"
import { cn } from '@/lib/utils';
import { EditTransactionSheet } from '@/components/sheets/edit-transaction-sheet';
import { ConfirmDialog } from '@/components/dialogs/confirm-dialog';
import { useToast } from '@/hooks/use-toast';
import { type Transaction, deleteDocument } from '@/lib/data';
import { Button } from './ui/button';
import { useAuth } from './auth-provider';

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Success':
      return <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700">Success</Badge>;
    case 'Processing':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700">Processing</Badge>;
    case 'Declined':
      return <Badge variant="outline" className="bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/40 dark:text-rose-300 dark:border-rose-700">Declined</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};


export function TransactionsTable({ transactions, onSuccess }: { transactions: Transaction[], onSuccess: () => void }) {
    const { user } = useAuth();
    const { toast } = useToast();
    
    const [editSheetOpen, setEditSheetOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    const handleEditClick = (transaction: Transaction) => {
      setSelectedTransaction(transaction);
      setEditSheetOpen(true);
    }

    const handleDeleteClick = (transaction: Transaction) => {
      setSelectedTransaction(transaction);
      setConfirmDeleteOpen(true);
    }

    const handleDeleteConfirm = async () => {
      if (!selectedTransaction || !user?.uid) return;
      try {
        await deleteDocument(user.uid, 'transactions', selectedTransaction.id!);
        toast({
            title: "Transaction Deleted",
            description: "The transaction has been successfully deleted.",
        });
        onSuccess(); // Refetch data on parent component
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete transaction", variant: "destructive" });
      } finally {
        setConfirmDeleteOpen(false);
        setSelectedTransaction(null);
      }
    }

    return (
        <Card>
            <EditTransactionSheet 
                open={editSheetOpen}
                onOpenChange={setEditSheetOpen}
                transaction={selectedTransaction}
                onSuccess={onSuccess}
            />
            <ConfirmDialog 
                open={confirmDeleteOpen}
                onOpenChange={setConfirmDeleteOpen}
                onConfirm={handleDeleteConfirm}
                title="Are you sure?"
                description="This will permanently delete this transaction. This action cannot be undone."
            />
            <CardContent className="p-0">
              <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px] px-4 hidden sm:table-cell">
                        <Checkbox />
                      </TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden sm:table-cell">Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="px-4 hidden sm:table-cell">
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{transaction.customer}</div>
                          <div className="text-sm text-muted-foreground hidden md:inline">{transaction.email}</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant="outline" className={cn(transaction.type === 'Refund' && 'bg-gray-100 dark:bg-gray-800', transaction.type === 'Expense' && 'bg-amber-100 dark:bg-amber-800')}>{transaction.type}</Badge>
                        </TableCell>
                        <TableCell>
                            {getStatusBadge(transaction.status)}
                        </TableCell>
                        <TableCell className="text-muted-foreground hidden md:table-cell">
                            {new Date(transaction.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditClick(transaction)}>View details</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditClick(transaction)}>Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => handleDeleteClick(transaction)}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between py-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing <strong>1-{transactions.length}</strong> of <strong>{transactions.length}</strong> transactions
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </CardFooter>
        </Card>
    );
}
