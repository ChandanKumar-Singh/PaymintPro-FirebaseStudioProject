'use client';
import { useEffect, useState, useCallback } from 'react';
import { getAccounts, getRecentAccountTransactions, type Account, type AccountTransaction } from '@/lib/data';
import { AccountsClient } from '@/components/accounts-client';
import { useAuth } from '@/components/auth-provider';
import { Skeleton } from '@/components/ui/skeleton';

export default function AccountsPage() {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<AccountTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
      if (user?.uid) {
        setLoading(true);
        try {
            const [accountsData, transactionsData] = await Promise.all([
                getAccounts(user.uid),
                getRecentAccountTransactions(user.uid)
            ]);
            setAccounts(accountsData);
            setTransactions(transactionsData);
        } catch (error) {
            console.error("Failed to fetch account data:", error);
        } finally {
            setLoading(false);
        }
      }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if(loading) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-32" />
            </div>
            <div className="space-y-4">
                <Skeleton className="h-6 w-56" />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-40 w-full" />)}
                </div>
            </div>
             <Skeleton className="h-96 w-full" />
        </div>
    )
  }

  return (
    <AccountsClient accounts={accounts} transactions={transactions} onDataRefresh={fetchData} />
  );
}
