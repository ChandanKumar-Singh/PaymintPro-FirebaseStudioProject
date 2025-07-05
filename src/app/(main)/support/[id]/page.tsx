'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/components/auth-provider';
import { getTicketById, getTicketMessages, addMessageToTicket, updateDocument, type Ticket, type TicketMessage } from '@/lib/data';
import { useParams, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send, Sparkles, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getSuggestedReplies } from '@/ai/flows/suggest-replies';
import { enhanceReply } from '@/ai/flows/enhance-reply';


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
    const [isAgentReplying, setIsAgentReplying] = useState(false);
    const [suggestedReplies, setSuggestedReplies] = useState<string[]>([]);
    const [suggestionsLoading, setSuggestionsLoading] = useState(false);
    const [enhancingReply, setEnhancingReply] = useState(false);


    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const fetchData = useCallback(async (isInitialLoad = false) => {
        if (user?.uid && ticketId) {
            if (isInitialLoad) setLoading(true);
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
                if (isInitialLoad) setLoading(false);
            }
        }
    }, [user, ticketId, toast, router]);

    useEffect(() => {
        fetchData(true);
    }, [fetchData]);

    // Fetch suggestions when messages change
     useEffect(() => {
        const fetchSuggestions = async () => {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage && lastMessage.sender === 'agent') {
                setSuggestionsLoading(true);
                setSuggestedReplies([]);
                try {
                    const result = await getSuggestedReplies({ lastMessage: lastMessage.content });
                    setSuggestedReplies(result.suggestions);
                } catch (error) {
                    // Fail silently, suggestions are a non-critical enhancement
                    console.error("Failed to fetch suggestions:", error);
                } finally {
                    setSuggestionsLoading(false);
                }
            } else {
                setSuggestedReplies([]);
            }
        };

        if (messages.length > 0) {
            fetchSuggestions();
        }
    }, [messages]);


    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!user || !ticketId || !newMessage.trim()) return;

        setSending(true);
        const userMessageContent = newMessage;
        setNewMessage(''); 

        try {
            const userMessage: Omit<TicketMessage, 'id'> = {
                content: userMessageContent,
                createdAt: new Date().toISOString(),
                sender: 'user',
            };
            await addMessageToTicket(user.uid, ticketId, userMessage);
            await fetchData(); 
            
            setIsAgentReplying(true);
            setTimeout(async () => {
                try {
                    const agentReply: Omit<TicketMessage, 'id'> = {
                        content: "Thanks for reaching out! We've received your message and an agent will review it shortly. Please allow up to 24 hours for a detailed response.",
                        createdAt: new Date().toISOString(),
                        sender: 'agent',
                    };
                    await addMessageToTicket(user.uid, ticketId, agentReply);
                    await fetchData();
                } catch (error) {
                    console.error("Failed to simulate agent reply:", error);
                } finally {
                    setIsAgentReplying(false);
                }
            }, 2500);

        } catch (error) {
            toast({ title: "Error", description: "Could not send message.", variant: "destructive" });
            setNewMessage(userMessageContent);
        } finally {
            setSending(false);
        }
    };
    
    const handleCloseTicket = async () => {
        if (!user || !ticketId || !ticket) return;
        try {
            await updateDocument(user.uid, 'tickets', ticketId, { status: 'Closed' });
            toast({ title: "Ticket Closed", description: "This support ticket has been marked as closed."});
            fetchData();
        } catch (error) {
            toast({ title: "Error", description: "Failed to close ticket.", variant: "destructive"});
        }
    }

    const handleEnhanceReply = async () => {
        if (!newMessage.trim()) return;
        setEnhancingReply(true);
        try {
            const conversationContext = messages.slice(-4).map(m => `${m.sender === 'user' ? 'You' : 'Agent'}: ${m.content}`).join('\n');
            const result = await enhanceReply({ conversation: conversationContext, draft: newMessage });
            setNewMessage(result.enhancedReply);
        } catch (error) {
            toast({ title: "Error", description: "Could not enhance reply. Please try again.", variant: "destructive"});
        } finally {
            setEnhancingReply(false);
            textareaRef.current?.focus();
        }
    }

    const handleSuggestionClick = (suggestion: string) => {
        setNewMessage(suggestion);
        textareaRef.current?.focus();
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
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <div>
                            <CardTitle className="text-2xl">{ticket.subject}</CardTitle>
                            <CardDescription>
                                Ticket #{ticket.id?.slice(0, 8)} &bull; Department: {ticket.department} &bull; Opened: {format(new Date(ticket.createdAt), "PPP")}
                            </CardDescription>
                        </div>
                        <div className="flex flex-col items-start sm:items-end gap-2">
                             <div className="flex items-center gap-2">
                                {getPriorityBadge(ticket.priority)}
                                {getStatusBadge(ticket.status)}
                            </div>
                            {ticket.status !== 'Closed' && (
                                <Button variant="outline" size="sm" onClick={handleCloseTicket}>Close Ticket</Button>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[450px] space-y-6 p-4 border rounded-md" ref={scrollAreaRef}>
                       {messages.map((message, index) => (
                           <div key={message.id || index} className={cn("flex items-end gap-3", message.sender === 'user' ? 'justify-end' : 'justify-start')}>
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
                                   <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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
                       {isAgentReplying && (
                            <div className="flex items-end gap-3 justify-start">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="support agent" />
                                    <AvatarFallback>S</AvatarFallback>
                                </Avatar>
                                <div className="bg-muted px-4 py-3 rounded-lg flex items-center gap-1">
                                    <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse delay-0"></span>
                                    <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse delay-150"></span>
                                    <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse delay-300"></span>
                                </div>
                            </div>
                        )}
                    </ScrollArea>
                </CardContent>

                {ticket.status !== 'Closed' && (
                    <CardContent className="pt-2">
                        {suggestionsLoading ? (
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-8 w-32" />
                                <Skeleton className="h-8 w-40" />
                                <Skeleton className="h-8 w-28" />
                            </div>
                        ) : suggestedReplies.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2">
                                <p className="text-sm text-muted-foreground mr-2">Suggestions:</p>
                                {suggestedReplies.map((reply, i) => (
                                    <Button key={i} variant="outline" size="sm" onClick={() => handleSuggestionClick(reply)}>
                                        {reply}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </CardContent>
                )}
                
                <CardFooter className="pt-4 border-t">
                    {ticket.status !== 'Closed' ? (
                        <div className="w-full flex items-center gap-2">
                            <Textarea 
                                ref={textareaRef}
                                placeholder="Type your reply..." 
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                                disabled={sending || isAgentReplying || enhancingReply}
                                rows={1}
                                className="min-h-[40px] max-h-[200px]"
                            />
                            <Button onClick={handleEnhanceReply} disabled={sending || isAgentReplying || enhancingReply || !newMessage.trim()} size="icon" variant="ghost">
                                {enhancingReply ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                                <span className="sr-only">Enhance with AI</span>
                            </Button>
                            <Button onClick={handleSendMessage} disabled={sending || !newMessage.trim() || isAgentReplying || enhancingReply} size="icon">
                                <Send className="h-4 w-4" />
                                <span className="sr-only">Send Message</span>
                            </Button>
                        </div>
                    ) : (
                         <p className="text-sm text-muted-foreground w-full text-center">This ticket has been closed. To reopen it, please create a new ticket.</p>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
