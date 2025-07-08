'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { DateRangePicker } from "@/components/date-range-picker"
import { getTransactions, type Transaction, deleteDocument } from '@/lib/data';
import { DataTable } from '@/components/data-table';
import { useAuth } from '@/components/auth-provider';
import { Skeleton } from '@/components/ui/skeleton';
import { getColumns } from './columns';
import { EditTransactionSheet } from '@/components/sheets/edit-transaction-sheet';
import { ConfirmDialog } from '@/components/dialogs/confirm-dialog';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';


export default function TransactionsPage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);

    // URL-driven state
    const action = searchParams.get('action');
    const selectedTransactionId = searchParams.get('id');

    const isEditOpen = action === 'edit-transaction' && !!selectedTransactionId;
    
    const selectedTransaction = useMemo(() => {
        if (!selectedTransactionId || !isEditOpen) return null;
        return transactions.find(tx => tx.id === selectedTransactionId) || null;
    }, [transactions, selectedTransactionId, isEditOpen]);


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

    useEffect(() => {
        if (isEditOpen && !loading && transactions.length > 0 && !selectedTransaction) {
            const params = new URLSearchParams(searchParams.toString());
            params.delete('action');
            params.delete('id');
            router.replace(`${pathname}?${params.toString()}`);
        }
    }, [isEditOpen, selectedTransaction, transactions.length, loading, searchParams, router, pathname]);

    const handleOpen = (newAction: string, id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('action', newAction);
        params.set('id', id);
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleClose = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('action');
        params.delete('id');
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleDeleteClick = (transaction: Transaction) => {
      setTransactionToDelete(transaction);
      setConfirmDeleteOpen(true);
    }

    const handleDeleteConfirm = async () => {
      if (!transactionToDelete || !user?.uid) return;
      try {
        await deleteDocument(user.uid, 'transactions', transactionToDelete.id!);
        toast({
            title: "Transaction Deleted",
            description: "The transaction has been successfully deleted.",
        });
        fetchData(); // Refetch data
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete transaction", variant: "destructive" });
      } finally {
        setConfirmDeleteOpen(false);
        setTransactionToDelete(null);
      }
    }
    
    const columns = useMemo(() => getColumns(
        (transaction) => handleOpen('edit-transaction', transaction.id!),
        handleDeleteClick
    ), [fetchData]);

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
            open={isEditOpen && !!selectedTransaction}
            onOpenChange={(open) => !open && handleClose()}
            transaction={selectedTransaction}
            onSuccess={() => {
                fetchData();
                handleClose();
            }}
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
