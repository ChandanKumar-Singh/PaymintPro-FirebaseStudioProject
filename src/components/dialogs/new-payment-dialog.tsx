'use client';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DatePicker } from "@/components/date-picker";
import { useAuth } from "../auth-provider";
import { addDocument } from "@/lib/data";
import { format } from "date-fns";

interface NewPaymentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export function NewPaymentDialog({ open, onOpenChange, onSuccess }: NewPaymentDialogProps) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState<Date>();
    const [frequency, setFrequency] = useState('one-time');

    const handleSchedulePayment = async () => {
        if (!user) return;
        
        if(!recipient || !amount || !date) {
            toast({ title: "Missing Information", description: "Please fill out all fields.", variant: "destructive"});
            return;
        }

        setLoading(true);
        try {
            await addDocument(user.uid, 'payments', {
                recipient,
                amount: parseFloat(amount),
                date: format(date, 'yyyy-MM-dd'),
                status: 'Upcoming',
            });
            toast({
                title: "Payment Scheduled",
                description: "Your new payment has been scheduled successfully.",
            });
            onSuccess();
            // Reset form
            setRecipient('');
            setAmount('');
            setDate(undefined);
            setFrequency('one-time');
        } catch (error) {
            toast({ title: "Error", description: "Failed to schedule payment.", variant: 'destructive'});
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Payment</DialogTitle>
                    <DialogDescription>
                        Schedule a new one-time or recurring payment.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                     <div className="space-y-2">
                        <Label htmlFor="recipient">Recipient</Label>
                        <Input id="recipient" name="recipient" placeholder="e.g., Landlord, AT&T" required value={recipient} onChange={e => setRecipient(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount" name="amount" type="number" placeholder="$0.00" required value={amount} onChange={e => setAmount(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="payment-date">Payment Date</Label>
                        <DatePicker date={date} setDate={setDate} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="frequency">Frequency</Label>
                         <Select name="frequency" value={frequency} onValueChange={setFrequency}>
                            <SelectTrigger id="frequency">
                                <SelectValue placeholder="One-time" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="one-time">One-time</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="quarterly">Quarterly</SelectItem>
                                <SelectItem value="annually">Annually</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} type="button">Cancel</Button>
                    <Button type="submit" onClick={handleSchedulePayment} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Schedule Payment
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
