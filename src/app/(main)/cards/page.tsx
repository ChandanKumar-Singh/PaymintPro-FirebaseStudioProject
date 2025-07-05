'use client';
import { useEffect, useState, useCallback } from 'react';
import { CreditCardDisplay } from "@/components/credit-card-display";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddCardDialog } from "@/components/dialogs/add-card-dialog";
import { useAuth } from '@/components/auth-provider';
import { getCards, getCardTransactions, type CardData, type CardTransaction } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

export default function CardsPage() {
    const { user } = useAuth();
    const [cards, setCards] = useState<CardData[]>([]);
    const [transactions, setTransactions] = useState<CardTransaction[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        if(user?.uid) {
            setLoading(true);
            const [cardsData, transactionsData] = await Promise.all([
                getCards(user.uid),
                getCardTransactions(user.uid)
            ]);
            setCards(cardsData);
            setTransactions(transactionsData);
            setLoading(false);
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
                    <Skeleton className="h-10 w-36" />
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
                <Skeleton className="h-96 w-full" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">My Cards</h1>
                <AddCardDialog onSuccess={fetchData} />
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cards.map(card => (
                    <CreditCardDisplay key={card.id} {...card} onDeleted={fetchData} />
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
                            {transactions.map((tx) => (
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
