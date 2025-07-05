'use client';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../auth-provider";
import { addTicketAndFirstMessage } from "@/lib/data";
import { Textarea } from "../ui/textarea";

interface NewTicketDialogProps {
    onSuccess: () => void;
}

export function NewTicketDialog({ onSuccess }: NewTicketDialogProps) {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const [subject, setSubject] = useState('');
    const [department, setDepartment] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [message, setMessage] = useState('');

    const handleCreateTicket = async () => {
        if (!user) {
            toast({ title: "Authentication Error", description: "You must be logged in.", variant: "destructive" });
            return;
        }
        if (!subject || !department || !priority || !message) {
            toast({ title: "Missing Information", description: "Please fill out all fields.", variant: "destructive" });
            return;
        }

        setLoading(true);
        try {
            await addTicketAndFirstMessage(user.uid, {
                subject,
                department,
                priority,
            }, message);

            toast({
                title: "Ticket Created",
                description: "Your support ticket has been created successfully.",
            });
            onSuccess();
            setOpen(false);
            // Reset form
            setSubject('');
            setDepartment('');
            setPriority('Medium');
            setMessage('');
        } catch (error) {
            toast({ title: "Error", description: "Failed to create ticket.", variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Ticket
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle>Create Support Ticket</DialogTitle>
                    <DialogDescription>
                        Our support team will get back to you as soon as possible.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="e.g., Issue with my latest invoice" value={subject} onChange={e => setSubject(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Select value={department} onValueChange={setDepartment}>
                                <SelectTrigger id="department">
                                    <SelectValue placeholder="Select a department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Billing">Billing</SelectItem>
                                    <SelectItem value="Technical Support">Technical Support</SelectItem>
                                    <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="priority">Priority</Label>
                            <Select value={priority} onValueChange={setPriority}>
                                <SelectTrigger id="priority">
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Please describe your issue in detail..." value={message} onChange={e => setMessage(e.target.value)} rows={5} />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit" onClick={handleCreateTicket} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create Ticket
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}