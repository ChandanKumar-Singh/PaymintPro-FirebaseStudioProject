'use client';
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
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

    useEffect(() => {
        if(user?.uid) {
            getTransactions(user.uid).then(data => {
                setTransactions(data);
                setLoading(false);
            })
        }
    }, [user]);

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
                        <DropdownMenuCheckboxItem checked>
                          Success
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Processing
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Declined
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </div>
            </div>
        </div>
        {loading ? (
             <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                    </div>
                </CardContent>
            </Card>
        ) : (
             <TransactionsTable initialTransactions={transactions} />
        )}
      </div>
    );
}
