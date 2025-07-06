'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { DateRangePicker } from "@/components/date-range-picker"
import { getTransactions, type Transaction, deleteDocument } from '@/lib/data';
import { DataTable } from '@/components/transactions-table';
import { useAuth } from '@/components/auth-provider';
import { Skeleton } from '@/components/ui/skeleton';
import { getColumns } from './columns';
import { EditTransactionSheet } from '@/components/sheets/edit-transaction-sheet';
import { ConfirmDialog } from '@/components/dialogs/confirm-dialog';
import { useToast } from '@/hooks/use-toast';

export default function TransactionsPage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    
    const [editSheetOpen, setEditSheetOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    const fetchData = useCallback(async () => {
      if(user?.uid) {
          setLoading(true);
          const data = await getTransactions(user.uid);
          setTransactions(data);
          setLoading(false);
      }
    }, [user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
        fetchData(); // Refetch data
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete transaction", variant: "destructive" });
      } finally {
        setConfirmDeleteOpen(false);
        setSelectedTransaction(null);
      }
    }
    
    // useMemo is important here to prevent re-creating the columns on every render
    const columns = useMemo(() => getColumns(handleEditClick, handleDeleteClick), [fetchData]);

    const handleDownloadCSV = () => {
        const headers = ['ID', 'Customer', 'Email', 'Type', 'Status', 'Date', 'Amount', 'Category'];
        const rows = transactions.map(tx => 
            [tx.id, tx.customer, tx.email, tx.type, tx.status, tx.date, tx.amount, tx.category].join(',')
        );
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "transactions.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
      <div className="space-y-6">
         <EditTransactionSheet 
            open={editSheetOpen}
            onOpenChange={setEditSheetOpen}
            transaction={selectedTransaction}
            onSuccess={fetchData}
        />
        <ConfirmDialog 
            open={confirmDeleteOpen}
            onOpenChange={setConfirmDeleteOpen}
            onConfirm={handleDeleteConfirm}
            title="Are you sure?"
            description="This will permanently delete this transaction. This action cannot be undone."
        />
        <div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
                <div className="flex items-center gap-2">
                    <DateRangePicker />
                    <Button variant="outline" onClick={handleDownloadCSV}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </div>
            </div>
        </div>
        {loading ? (
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-[250px]" />
                    <Skeleton className="h-8 w-[70px]" />
                </div>
                <Skeleton className="h-[500px] w-full" />
             </div>
        ) : (
             <DataTable columns={columns} data={transactions} searchKey="customer" />
        )}
      </div>
    );
}
