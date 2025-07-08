import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from './ui/button';
import { type Transaction } from '@/lib/data';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>The latest movements in your account.</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard/transactions">View all</Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {transactions.slice(0, 5).map((tx) => (
            <div key={tx.id} className="flex items-center gap-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={tx.avatar} alt={tx.customer} data-ai-hint={tx.dataAiHint} />
                <AvatarFallback>
                  {tx.customer.split(' ').map((n) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium leading-none">{tx.customer}</p>
                <p className="text-sm text-muted-foreground">{tx.email}</p>
              </div>
              <div className={`font-medium ${tx.amount > 0 ? 'text-green-600' : 'text-foreground'}`}>
                {tx.amount.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
