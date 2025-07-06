'use client';
import { useState, useEffect, useCallback } from 'react';
import { LifeBuoy } from "lucide-react";
import { useAuth } from '@/components/auth-provider';
import { getTickets, type Ticket } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/empty-state';
import { TicketList } from '@/components/ticket-list';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function SupportPage() {
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTickets = useCallback(async () => {
        if (user?.uid) {
            setLoading(true);
            const userTickets = await getTickets(user.uid);
            userTickets.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            setTickets(userTickets);
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const handleNewTicket = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('action', 'new-ticket');
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <>
            {/* Mobile View: Show the list */}
            <div className="md:hidden h-full">
                 {loading ? (
                    <div className="p-4 space-y-2">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                    </div>
                ) : (
                    <TicketList tickets={tickets} onNewTicket={handleNewTicket} />
                )}
            </div>
            {/* Desktop View: Show a placeholder */}
            <div className="hidden md:flex h-full items-center justify-center">
                <EmptyState
                    icon={LifeBuoy}
                    title="Select a conversation"
                    description="Choose a ticket from the list on the left to see the conversation."
                    actionButton={
                        <Button onClick={handleNewTicket}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create New Ticket
                        </Button>
                    }
                />
            </div>
        </>
    );
}
