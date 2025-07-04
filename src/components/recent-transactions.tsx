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

const sales = [
  {
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: 1999.0,
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'woman avatar'
  },
  {
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: 39.0,
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'man avatar'
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: 299.0,
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'woman avatar'
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
    amount: 99.0,
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'man avatar'
  },
  {
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: 39.0,
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'woman avatar'
  },
];

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>You made 265 sales this month.</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
                <Link href="#">View all</Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sales.map((sale) => (
            <div key={sale.email} className="flex items-center gap-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={sale.avatar} alt={sale.name} data-ai-hint={sale.dataAiHint} />
                <AvatarFallback>
                  {sale.name.split(' ').map((n) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium leading-none">{sale.name}</p>
                <p className="text-sm text-muted-foreground">{sale.email}</p>
              </div>
              <div className="font-medium">
                {sale.amount.toLocaleString('en-US', {
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
