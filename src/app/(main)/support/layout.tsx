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
                userTickets.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
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
        <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr] h-[calc(100vh_-_80px)] border rounded-lg overflow-hidden">
            <div className="hidden md:flex flex-col border-r">
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
            <div className="col-span-1 h-full">
                {children}
            </div>
        </div>
    );
}