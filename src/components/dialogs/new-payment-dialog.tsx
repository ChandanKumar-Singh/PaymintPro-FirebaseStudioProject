'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DatePicker } from "@/components/date-picker";

export function NewPaymentDialog() {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    const handleSchedulePayment = () => {
        toast({
            title: "Payment Scheduled",
            description: "Your new payment has been scheduled successfully.",
        });
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Payment
                </Button>
            </DialogTrigger>
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
                        <Input id="recipient" placeholder="e.g., Landlord, AT&T" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount" type="number" placeholder="$0.00" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="payment-date">Payment Date</Label>
                        <DatePicker />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="frequency">Frequency</Label>
                         <Select>
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
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit" onClick={handleSchedulePayment}>Schedule Payment</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
