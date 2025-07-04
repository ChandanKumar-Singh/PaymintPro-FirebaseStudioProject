import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const transactions = [
  {
    name: 'Spotify',
    type: 'Subscription',
    amount: -10.99,
    date: '2024-07-28',
    image: 'https://placehold.co/40x40.png',
    dataAiHint: 'spotify logo',
  },
  {
    name: 'Amazon',
    type: 'Shopping',
    amount: -124.5,
    date: '2024-07-27',
    image: 'https://placehold.co/40x40.png',
    dataAiHint: 'amazon logo',
  },
  {
    name: 'Paycheck',
    type: 'Income',
    amount: 2500.0,
    date: '2024-07-26',
    image: 'https://placehold.co/40x40.png',
    dataAiHint: 'company logo',
  },
  {
    name: 'Starbucks',
    type: 'Food',
    amount: -5.75,
    date: '2024-07-26',
    image: 'https://placehold.co/40x40.png',
    dataAiHint: 'starbucks logo',
  },
  {
    name: 'Netflix',
    type: 'Subscription',
    amount: -15.49,
    date: '2024-07-25',
    image: 'https://placehold.co/40x40.png',
    dataAiHint: 'netflix logo',
  },
];

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your last 5 transactions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.name}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={transaction.image}
                        alt={transaction.name}
                        data-ai-hint={transaction.dataAiHint}
                      />
                      <AvatarFallback>
                        {transaction.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{transaction.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className={`text-right font-medium ${
                    transaction.amount > 0 ? '' : 'text-muted-foreground'
                  }`}
                >
                  {transaction.amount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground">
                  {transaction.date}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline">{transaction.type}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
