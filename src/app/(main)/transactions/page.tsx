'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Download, ListFilter } from "lucide-react"
import { DateRangePicker } from "@/components/date-range-picker"
import { getTransactions, type Transaction } from '@/lib/data';
import { TransactionsTable } from '@/components/transactions-table';
import { useAuth } from '@/components/auth-provider';
import { Skeleton } from '@/components/ui/skeleton';

export default function TransactionsPage() {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilters, setStatusFilters] = useState<string[]>(['Success', 'Processing', 'Declined']);

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

    const handleStatusFilterChange = (status: string, checked: boolean) => {
        setStatusFilters(prev => 
            checked ? [...prev, status] : prev.filter(s => s !== status)
        );
    };

    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => statusFilters.includes(t.status));
    }, [transactions, statusFilters]);

    const handleDownloadCSV = () => {
        const headers = ['ID', 'Customer', 'Email', 'Type', 'Status', 'Date', 'Amount', 'Category'];
        const rows = filteredTransactions.map(tx => 
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

    const allStatuses = ['Success', 'Processing', 'Declined'];

    return (
      <div className="space-y-6">
        <div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
                <div className="flex items-center gap-2">
                    <DateRangePicker />
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-1">
                          <ListFilter className="h-4 w-4" />
                          <span className="hidden sm:inline">Filter</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {allStatuses.map(status => (
                            <DropdownMenuCheckboxItem 
                                key={status}
                                checked={statusFilters.includes(status)}
                                onCheckedChange={(checked) => handleStatusFilterChange(status, !!checked)}
                            >
                                {status}
                            </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" onClick={handleDownloadCSV}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </div>
            </div>
        </div>
        {loading ? (
             <Card>
                <CardHeader>
                    <Skeleton className="h-10 w-48" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                    </div>
                </CardContent>
            </Card>
        ) : (
             <TransactionsTable transactions={filteredTransactions} onSuccess={fetchData} />
        )}
      </div>
    );
}