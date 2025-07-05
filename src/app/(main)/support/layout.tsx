'use client';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/auth-provider';
import { getTickets, type Ticket } from '@/lib/data';
import { TicketList } from '@/components/ticket-list';
import { Skeleton } from '@/components/ui/skeleton';

export default function SupportLayout({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTickets = useCallback(async () => {
        if (user?.uid) {
            setLoading(true);
            try {
                const userTickets = await getTickets(user.uid);
                setTickets(userTickets);
            } catch (error) {
                console.error("Failed to fetch tickets for layout", error);
            } finally {
                setLoading(false);
            }
        }
    }, [user]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    return (
        <div className="flex h-full border rounded-lg overflow-hidden">
            <div className="hidden md:flex flex-col border-r w-[300px] lg:w-[350px] shrink-0">
                {loading ? (
                    <div className="p-4 space-y-2">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                    </div>
                ) : (
                    <TicketList tickets={tickets} />
                )}
            </div>
            <div className="flex-1 min-w-0">
                {children}
            </div>
        </div>
    );
}
