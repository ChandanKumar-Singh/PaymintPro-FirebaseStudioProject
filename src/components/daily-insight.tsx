'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { useAuth } from './auth-provider';
import { useState, useEffect, useCallback } from 'react';
import { getDailyInsight } from '@/ai/flows/daily-insight';
import { getTransactions } from '@/lib/data';
import { subDays } from 'date-fns';
import { Skeleton } from './ui/skeleton';

export function DailyInsight() {
    const { user } = useAuth();
    const [insight, setInsight] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchInsight = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            // Fetch transactions from the last 7 days
            const allTransactions = await getTransactions(user.uid);
            const sevenDaysAgo = subDays(new Date(), 7);
            const recentTransactions = allTransactions.filter(tx => new Date(tx.date) >= sevenDaysAgo);

            const result = await getDailyInsight({ transactions: recentTransactions });
            setInsight(result.insight);
        } catch (error) {
            console.error("Failed to get daily insight:", error);
            setInsight("Could not load an insight right now. Please check back later.");
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchInsight();
    }, [fetchInsight]);

    return (
        <Card>
            <CardHeader>
                <div className='flex items-center gap-3'>
                     <Lightbulb className="h-6 w-6 text-primary" />
                    <div>
                        <CardTitle>Daily Insight</CardTitle>
                        <CardDescription>A smart tip based on your recent activity.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className='space-y-2'>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                ) : (
                    <p className="text-sm italic text-muted-foreground">"{insight}"</p>
                )}
            </CardContent>
        </Card>
    );
}
