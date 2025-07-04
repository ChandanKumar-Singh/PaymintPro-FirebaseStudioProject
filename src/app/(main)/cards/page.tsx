import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CreditCardDisplay } from "@/components/credit-card-display";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const cards = [
    { brand: 'visa', number: '**** **** **** 1234', holder: 'Olivia Martin', expiry: '08/28', status: 'Active', type: 'Physical' },
    { brand: 'mastercard', number: '**** **** **** 5678', holder: 'Olivia Martin', expiry: '11/26', status: 'Active', type: 'Virtual' },
    { brand: 'visa', number: '**** **** **** 9012', holder: 'Olivia Martin', expiry: '04/25', status: 'Inactive', type: 'Physical' },
] as const;

const cardTransactions = [
  { id: 'txn_c1', description: 'Amazon Purchase', date: '2024-07-25', amount: -78.50 },
  { id: 'txn_c2', description: 'Netflix Subscription', date: '2024-07-24', amount: -15.99 },
  { id: 'txn_c3', description: 'Starbucks', date: '2024-07-23', amount: -5.75 },
  { id: 'txn_c4', description: 'Gas Station', date: '2024-07-22', amount: -55.20 },
  { id: 'txn_c5', description: 'Apple Store', date: '2024-07-21', amount: -999.00 },
];


export default function CardsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">My Cards</h1>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Card
                </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cards.map(card => (
                    <CreditCardDisplay key={card.number} {...card} />
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Card Transactions</CardTitle>
                    <CardDescription>Recent transactions across all your cards.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Description</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cardTransactions.map((tx) => (
                                <TableRow key={tx.id}>
                                    <TableCell className="font-medium">{tx.description}</TableCell>
                                    <TableCell>{new Date(tx.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</TableCell>
                                    <TableCell className="text-right font-medium">
                                        {tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
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
