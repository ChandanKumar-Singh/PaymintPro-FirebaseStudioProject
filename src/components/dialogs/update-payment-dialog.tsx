'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function UpdatePaymentDialog() {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    const handleUpdate = () => {
        toast({
            title: "Payment Method Updated",
            description: "Your payment method has been successfully updated.",
        });
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Update</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Payment Method</DialogTitle>
                    <DialogDescription>
                        Enter your new card details below.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="card-holder-update">Card Holder Name</Label>
                        <Input id="card-holder-update" placeholder="Olivia Martin" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="card-number-update">Card Number</Label>
                        <Input id="card-number-update" placeholder="**** **** **** 1234" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="expiry-date-update">Expiry Date</Label>
                            <Input id="expiry-date-update" placeholder="MM/YY" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="cvv-update">CVV</Label>
                            <Input id="cvv-update" placeholder="123" />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit" onClick={handleUpdate}>Update Card</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
