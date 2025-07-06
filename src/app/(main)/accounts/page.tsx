'use client';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useAuth } from '@/components/auth-provider';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Banknote, MoreHorizontal, Landmark } from "lucide-react";
import { AddAccountDialog } from '@/components/dialogs/add-account-dialog';
import { ConfirmDialog } from '@/components/dialogs/confirm-dialog';
import { useToast } from '@/hooks/use-toast';
import { EditAccountSheet } from '@/components/sheets/edit-account-sheet';
import { getAccounts, getRecentAccountTransactions, deleteDocument, type Account, type AccountTransaction } from '@/lib/data';
import { EmptyState } from '@/components/empty-state';
import { DataTable } from '@/components/transactions-table';
import { type ColumnDef } from '@tanstack/react-table';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const getStatusBadge = (status: string) => {
    return <Badge variant="default" className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">Completed</Badge>;
};

export default function AccountsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<AccountTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const { toast } = useToast();

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
            toast({ title: "Error", description: "Could not fetch account data.", variant: "destructive"});
        } finally {
            setLoading(false);
        }
      }
  }, [user, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const viewId = searchParams.get('id');
    const action = searchParams.get('action');

    if (action === 'edit-account' && viewId && accounts.length > 0) {
        const accountToView = accounts.find(acc => acc.id === viewId);
        if (accountToView) {
            setSelectedAccount(accountToView);
            setEditSheetOpen(true);
        } else {
            handleSheetOpenChange(false);
        }
    } else {
        if (editSheetOpen) {
            setEditSheetOpen(false);
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, accounts]);

  const handleSheetOpenChange = (open: boolean) => {
    if (!open) {
        setSelectedAccount(null);
        const params = new URLSearchParams(searchParams.toString());
        params.delete('action');
        params.delete('id');
        router.replace(`${pathname}?${params.toString()}`);
    }
    setEditSheetOpen(open);
  }

  const handleRemoveClick = (account: Account) => {
    setSelectedAccount(account);
    setConfirmOpen(true);
  }

  const handleEditClick = (account: Account) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('action', 'edit-account');
    params.set('id', account.id!);
    router.push(`${pathname}?${params.toString()}`);
  }

  const handleSetDefault = (account: Account) => {
    toast({
        title: "Default Account Set",
        description: `${account.name} is now your default account.`,
    });
  }

  const handleRemoveConfirm = async () => {
    if (!selectedAccount || !user?.uid) return;
    try {
        await deleteDocument(user.uid, 'accounts', selectedAccount.id!);
        toast({
            title: "Account Removed",
            description: "The account has been successfully removed.",
        });
        fetchData();
    } catch (error) {
        toast({
            title: "Error",
            description: "Failed to remove account.",
            variant: 'destructive',
        });
    } finally {
        setConfirmOpen(false);
        setSelectedAccount(null);
    }
  }

  const transactionColumns = useMemo<ColumnDef<AccountTransaction>[]>(() => [
    { accessorKey: 'description', header: 'Description', cell: ({ row }) => <div className="font-medium">{row.original.description}</div> },
    { accessorKey: 'date', header: 'Date', cell: ({ row }) => new Date(row.original.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
    { accessorKey: 'status', header: 'Status', cell: ({ row }) => getStatusBadge(row.original.status) },
    { 
        accessorKey: 'amount', 
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => (
            <div className={`text-right font-medium ${row.original.amount > 0 ? 'text-green-600' : 'text-foreground'}`}>
                {row.original.amount < 0 && '-'}{row.original.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace('-', '')}
            </div>
        )
    },
  ], []);

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
    <div className="space-y-6">
      <ConfirmDialog 
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleRemoveConfirm}
        title="Are you sure?"
        description="This will permanently remove the account and all its data. This action cannot be undone."
      />
      <EditAccountSheet 
        open={editSheetOpen}
        onOpenChange={handleSheetOpenChange}
        account={selectedAccount}
        onSuccess={fetchData}
      />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
        <AddAccountDialog onSuccess={fetchData} />
      </div>

      {accounts.length === 0 ? (
        <EmptyState
          icon={Landmark}
          title="No accounts connected"
          description="Get started by adding your first bank account to track your finances."
          actionButton={<AddAccountDialog onSuccess={fetchData} />}
        />
      ) : (
        <>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Connected Accounts</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {accounts.map((account) => (
                <Card key={account.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-muted rounded-lg">
                          <Banknote className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{account.name}</CardTitle>
                          <CardDescription>{account.bank} - {account.accountNumber}</CardDescription>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditClick(account)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSetDefault(account)}>Set as Default</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleRemoveClick(account)}>Remove Account</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      {account.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </p>
                    <p className="text-xs text-muted-foreground">Current Balance</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Recent activity on your primary account.</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={transactionColumns} data={transactions} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
