'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/components/auth-provider';
import { getTicketById, getTicketMessages, addMessageToTicket, type Ticket, type TicketMessage } from '@/lib/data';
import { useParams, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

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

export default function TicketDetailPage() {
    const { user } = useAuth();
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const ticketId = params.id as string;
    
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [messages, setMessages] = useState<TicketMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);

    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const fetchData = useCallback(async () => {
        if (user?.uid && ticketId) {
            setLoading(true);
            try {
                const [ticketData, messagesData] = await Promise.all([
                    getTicketById(user.uid, ticketId),
                    getTicketMessages(user.uid, ticketId)
                ]);
                setTicket(ticketData);
                setMessages(messagesData);
            } catch (error) {
                toast({ title: "Error", description: "Could not fetch ticket details.", variant: "destructive" });
                router.push('/support');
            } finally {
                setLoading(false);
            }
        }
    }, [user, ticketId, toast, router]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        // Scroll to bottom when new messages are loaded
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!user || !ticketId || !newMessage.trim()) return;

        setSending(true);
        try {
            const message: Omit<TicketMessage, 'id'> = {
                content: newMessage,
                createdAt: new Date().toISOString(),
                sender: 'user',
            };
            await addMessageToTicket(user.uid, ticketId, message);
            setNewMessage('');
            await fetchData(); // Refresh data
        } catch (error) {
            toast({ title: "Error", description: "Could not send message.", variant: "destructive" });
        } finally {
            setSending(false);
        }
    };

    if (loading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }
    
    if (!ticket) {
        return <div>Ticket not found.</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <Button variant="ghost" asChild>
                    <Link href="/support">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to all tickets
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-2xl">{ticket.subject}</CardTitle>
                            <CardDescription>
                                Ticket #{ticket.id?.slice(0, 8)} opened on {format(new Date(ticket.createdAt), "PPP")}
                            </CardDescription>
                        </div>
                        {getStatusBadge(ticket.status)}
                    </div>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[450px] space-y-6 p-4 border rounded-md" ref={scrollAreaRef}>
                       {messages.map(message => (
                           <div key={message.id} className={cn("flex items-end gap-3", message.sender === 'user' ? 'justify-end' : 'justify-start')}>
                                {message.sender === 'agent' && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="support agent" />
                                        <AvatarFallback>S</AvatarFallback>
                                    </Avatar>
                                )}
                               <div className={cn(
                                   "max-w-md p-3 rounded-lg",
                                   message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                               )}>
                                   <p className="text-sm">{message.content}</p>
                                   <p className="text-xs opacity-70 mt-2 text-right">
                                       {format(new Date(message.createdAt), "p")}
                                   </p>
                               </div>
                                {message.sender === 'user' && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user?.photoURL || ''} />
                                        <AvatarFallback>{user?.displayName?.[0]}</AvatarFallback>
                                    </Avatar>
                                )}
                           </div>
                       ))}
                    </ScrollArea>
                </CardContent>
                {ticket.status !== 'Closed' && (
                    <CardFooter className="pt-4 border-t">
                        <div className="w-full flex items-center gap-2">
                            <Textarea 
                                placeholder="Type your reply..." 
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                                disabled={sending}
                            />
                            <Button onClick={handleSendMessage} disabled={sending || !newMessage.trim()} size="icon">
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}