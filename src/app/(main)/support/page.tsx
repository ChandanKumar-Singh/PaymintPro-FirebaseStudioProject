'use client';
import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, LifeBuoy } from "lucide-react";
import { NewTicketDialog } from '@/components/dialogs/new-ticket-dialog';
import { useAuth } from '@/components/auth-provider';
import { getTickets, type Ticket } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/empty-state';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'Open':
            return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Open</Badge>;
        case 'In Progress':
            return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>;
        case 'Closed':
            return <Badge variant="secondary">Closed</Badge>;
        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
};

const getPriorityBadge = (priority: string) => {
    switch (priority) {
        case 'High':
            return <Badge variant="destructive">High</Badge>;
        case 'Medium':
            return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Medium</Badge>;
        case 'Low':
            return <Badge variant="outline">Low</Badge>;
        default:
            return <Badge variant="secondary">{priority}</Badge>;
    }
}

export default function SupportPage() {
    const { user } = useAuth();
    const router = useRouter();
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

    const handleViewTicket = (ticketId: string) => {
        router.push(`/support/${ticketId}`);
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
                <NewTicketDialog onSuccess={fetchTickets} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>My Tickets</CardTitle>
                    <CardDescription>View your past and current support tickets here.</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                        </div>
                    ) : tickets.length === 0 ? (
                        <EmptyState
                            icon={LifeBuoy}
                            title="No support tickets found"
                            description="Get help by creating your first support ticket."
                            actionButton={<NewTicketDialog onSuccess={fetchTickets} />}
                        />
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead className="hidden md:table-cell">Last Updated</TableHead>
                                    <TableHead className="w-[100px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tickets.map((ticket) => (
                                    <TableRow key={ticket.id}>
                                        <TableCell className="font-medium">{ticket.subject}</TableCell>
                                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                                        <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {format(new Date(ticket.updatedAt), "PPP p")}
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm" onClick={() => handleViewTicket(ticket.id!)}>View</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}