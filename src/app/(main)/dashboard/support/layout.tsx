'use client';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/auth-provider';
import { getTickets, type Ticket } from '@/lib/data';
import { TicketList } from '@/components/ticket-list';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { NewTicketDialog } from '@/components/dialogs/new-ticket-dialog';

export default function SupportLayout({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);

    useEffect(() => {
        const action = searchParams.get('action');
        if (action === 'new-ticket') {
            setIsNewTicketOpen(true);
        } else {
            setIsNewTicketOpen(false);
        }
    }, [searchParams]);

    const handleNewTicketOpenChange = (open: boolean) => {
        const params = new URLSearchParams(searchParams.toString());
        if (open) {
            params.set('action', 'new-ticket');
        } else {
            params.delete('action');
        }
        router.push(`${pathname}?${params.toString()}`);
    };

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
        <div className="flex h-full border rounded-lg overflow-hidden">
            <NewTicketDialog 
                open={isNewTicketOpen}
                onOpenChange={handleNewTicketOpenChange}
                onSuccess={fetchTickets}
            />
            <div className="hidden md:flex flex-col border-r w-[300px] lg:w-[350px] shrink-0">
                {loading ? (
                    <div className="p-4 space-y-2">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                    </div>
                ) : (
                    <TicketList 
                        tickets={tickets} 
                        onNewTicket={() => handleNewTicketOpenChange(true)}
                    />
                )}
            </div>
            <div className="flex-1 min-w-0">
                {children}
            </div>
        </div>
    );
}
