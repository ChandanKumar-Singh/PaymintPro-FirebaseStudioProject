'use client';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DatePicker } from "@/components/date-picker";
import { useAuth } from "../auth-provider";
import { addDocument } from "@/lib/data";
import { format } from "date-fns";

interface NewPaymentDialogProps {
    onSuccess: () => void;
}

export function NewPaymentDialog({ onSuccess }: NewPaymentDialogProps) {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleSchedulePayment = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user) return;
        
        const formData = new FormData(event.currentTarget);
        const paymentData = {
            recipient: formData.get('recipient') as string,
            amount: parseFloat(formData.get('amount') as string),
            date: new Date(formData.get('payment-date') as string).toISOString().split('T')[0],
            status: 'Upcoming' as 'Upcoming',
        };

        if(!paymentData.recipient || !paymentData.amount || !paymentData.date) {
            toast({ title: "Missing Information", description: "Please fill out all fields.", variant: "destructive"});
            return;
        }

        setLoading(true);
        try {
            await addDocument(user.uid, 'payments', paymentData);
            toast({
                title: "Payment Scheduled",
                description: "Your new payment has been scheduled successfully.",
            });
            onSuccess();
            setOpen(false);
        } catch (error) {
            toast({ title: "Error", description: "Failed to schedule payment.", variant: 'destructive'});
        } finally {
            setLoading(false);
        }
    }

    const [date, setDate] = useState<Date>();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Payment
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSchedulePayment}>
                <DialogHeader>
                    <DialogTitle>New Payment</DialogTitle>
                    <DialogDescription>
                        Schedule a new one-time or recurring payment.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                     <div className="space-y-2">
                        <Label htmlFor="recipient">Recipient</Label>
                        <Input id="recipient" name="recipient" placeholder="e.g., Landlord, AT&T" required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount" name="amount" type="number" placeholder="$0.00" required/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="payment-date">Payment Date</Label>
                        <input type="hidden" name="payment-date" value={date ? format(date, 'yyyy-MM-dd') : ''} />
                        <DatePicker date={date} setDate={setDate} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="frequency">Frequency</Label>
                         <Select name="frequency" defaultValue="one-time">
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
                    <Button variant="outline" onClick={() => setOpen(false)} type="button">Cancel</Button>
                    <Button type="submit" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Schedule Payment
                    </Button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
