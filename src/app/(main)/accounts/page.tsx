'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Banknote, MoreHorizontal } from "lucide-react";
import { AddAccountDialog } from '@/components/dialogs/add-account-dialog';
import { ConfirmDialog } from '@/components/dialogs/confirm-dialog';
import { useToast } from '@/hooks/use-toast';

const initialAccounts = [
  { id: "acc_1", name: "Primary Checking", bank: "Capital One", accountNumber: "**** **** **** 1234", balance: 10530.00 },
  { id: "acc_2", name: "Business Savings", bank: "Chase", accountNumber: "**** **** **** 5678", balance: 75250.50 },
  { id: "acc_3", name: "Investment Account", bank: "Fidelity", accountNumber: "**** **** **** 9012", balance: 120800.75 },
];

const transactions = [
  { id: "txn_1", description: "Stripe Payout", date: "2024-07-25", amount: 5250.00, status: "Completed" },
  { id: "txn_2", description: "Google Ads", date: "2024-07-24", amount: -350.00, status: "Completed" },
  { id: "txn_3", description: "Figma Subscription", date: "2024-07-24", amount: -15.00, status: "Completed" },
  { id: "txn_4", description: "Client Payment - Acme Inc.", date: "2024-07-23", amount: 12000.00, status: "Completed" },
  { id: "txn_5", description: "Office Supplies", date: "2024-07-22", amount: -125.60, status: "Completed" },
];

const getStatusBadge = (status: string) => {
    return <Badge variant="default" className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">Completed</Badge>;
};

export default function AccountsPage() {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const { toast } = useToast();

  const handleRemoveClick = (accountId: string) => {
    setSelectedAccount(accountId);
    setConfirmOpen(true);
  }

  const handleRemoveConfirm = () => {
    setAccounts(accounts.filter(acc => acc.id !== selectedAccount));
    toast({
        title: "Account Removed",
        description: "The account has been successfully removed.",
    });
    setConfirmOpen(false);
    setSelectedAccount(null);
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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
        <AddAccountDialog />
      </div>

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
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Set as Default</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleRemoveClick(account.id)}>Remove Account</DropdownMenuItem>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.description}</TableCell>
                  <TableCell>{new Date(transaction.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell className={`text-right font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-foreground'}`}>
                    {transaction.amount < 0 && '-'}{transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace('-', '')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
