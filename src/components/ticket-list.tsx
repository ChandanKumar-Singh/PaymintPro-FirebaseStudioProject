'use client';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Ticket } from "@/lib/data";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from 'date-fns';
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

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
    onNewTicket: () => void;
}

export function TicketList({ tickets, onNewTicket }: TicketListProps) {
    const params = useParams();
    const activeTicketId = params.id as string;
    
    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Inbox</h2>
                    <Button onClick={onNewTicket}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create New Ticket
                    </Button>
                </div>
            </div>
            <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                    {tickets.map(ticket => (
                        <Link
                            key={ticket.id}
                            href={`/dashboard/support/${ticket.id}`}
                            className={cn(
                                "block p-3 rounded-lg hover:bg-muted cursor-pointer",
                                activeTicketId === ticket.id && "bg-muted"
                            )}
                        >
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
                        </Link>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
