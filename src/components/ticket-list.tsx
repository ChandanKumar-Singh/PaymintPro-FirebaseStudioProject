'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Ticket } from "@/lib/data";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow } from 'date-fns';
import Link from "next/link";
import { useParams } from "next/navigation";
import { NewTicketDialog } from "./dialogs/new-ticket-dialog";

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Open': return 'bg-green-500';
        case 'In Progress': return 'bg-blue-500';
        case 'Closed': return 'bg-gray-500';
        default: return 'bg-gray-500';
    }
}

interface TicketListProps {
    tickets: Ticket[];
}

export function TicketList({ tickets }: TicketListProps) {
    const params = useParams();
    const activeTicketId = params.id as string;
    
    // This is a placeholder since the fetch logic is in the layout
    const refetchTickets = () => {};

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Inbox</h2>
                    <NewTicketDialog onSuccess={refetchTickets} />
                </div>
            </div>
            <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                    {tickets.map(ticket => (
                        <Link key={ticket.id} href={`/support/${ticket.id}`} legacyBehavior>
                            <a className={cn(
                                "block p-3 rounded-lg hover:bg-muted cursor-pointer",
                                activeTicketId === ticket.id && "bg-muted"
                            )}>
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <span className={cn("h-2.5 w-2.5 rounded-full", getStatusColor(ticket.status))}></span>
                                        <h3 className="font-semibold text-sm truncate pr-4">{ticket.subject}</h3>
                                    </div>
                                    <p className="text-xs text-muted-foreground whitespace-nowrap">
                                        {formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}
                                    </p>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                    Department: {ticket.department} &bull; Priority: {ticket.priority}
                                </p>
                            </a>
                        </Link>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
