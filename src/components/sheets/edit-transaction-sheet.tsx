'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

interface EditTransactionSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    transaction: { id: string; customer: string; email: string; type: string; status: string; date: string; amount: number; } | null;
}

export function EditTransactionSheet({ open, onOpenChange, transaction }: EditTransactionSheetProps) {
    const [customer, setCustomer] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        if (transaction) {
            setCustomer(transaction.customer);
            setEmail(transaction.email);
            setStatus(transaction.status);
        }
    }, [transaction]);

    const handleSaveChanges = () => {
        toast({
            title: "Transaction Updated",
            description: "The transaction details have been saved.",
        });
        onOpenChange(false);
    }

    if (!transaction) return null;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Edit Transaction</SheetTitle>
                    <SheetDescription>
                        Make changes to the transaction here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="customer-name">Customer</Label>
                        <Input id="customer-name" value={customer} onChange={(e) => setCustomer(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email-edit">Email</Label>
                        <Input id="email-edit" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="status-edit-txn">Status</Label>
                         <Select value={status.toLowerCase()} onValueChange={setStatus}>
                            <SelectTrigger id="status-edit-txn">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="success">Success</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="declined">Declined</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <SheetFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button type="submit" onClick={handleSaveChanges}>Save Changes</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
