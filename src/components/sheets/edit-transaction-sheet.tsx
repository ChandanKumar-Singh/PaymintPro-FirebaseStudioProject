'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { type Transaction, updateDocument } from "@/lib/data";
import { Loader2 } from "lucide-react";


interface EditTransactionSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    transaction: Transaction | null;
    onSuccess: () => void;
}

export function EditTransactionSheet({ open, onOpenChange, transaction, onSuccess }: EditTransactionSheetProps) {
    const { user } = useAuth();
    const [customer, setCustomer] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        if (transaction) {
            setCustomer(transaction.customer);
            setEmail(transaction.email);
            setStatus(transaction.status);
        }
    }, [transaction]);

    const handleSaveChanges = async () => {
        if (!transaction || !user?.uid) return;
        setLoading(true);
        try {
            await updateDocument(user.uid, 'transactions', transaction.id!, {
                customer,
                email,
                status: status as Transaction['status'],
            });
            toast({
                title: "Transaction Updated",
                description: "The transaction details have been saved.",
            });
            onSuccess();
            onOpenChange(false);
        } catch (error) {
            toast({ title: "Error", description: "Failed to update transaction.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
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
                         <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger id="status-edit-txn">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Success">Success</SelectItem>
                                <SelectItem value="Processing">Processing</SelectItem>
                                <SelectItem value="Declined">Declined</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <SheetFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button type="submit" onClick={handleSaveChanges} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
