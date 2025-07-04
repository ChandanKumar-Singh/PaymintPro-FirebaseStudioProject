'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { DatePicker } from "../date-picker";

interface EditInvoiceSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    invoice: { id: string; customer: string; invoiceNumber: string; date: string; dueDate: string; amount: number; status: string; } | null;
}

export function EditInvoiceSheet({ open, onOpenChange, invoice }: EditInvoiceSheetProps) {
    const [customer, setCustomer] = useState('');
    const [status, setStatus] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        if (invoice) {
            setCustomer(invoice.customer);
            setStatus(invoice.status);
        }
    }, [invoice]);

    const handleSaveChanges = () => {
        toast({
            title: "Invoice Updated",
            description: "The invoice details have been saved.",
        });
        onOpenChange(false);
    }

    if (!invoice) return null;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Edit Invoice {invoice.invoiceNumber}</SheetTitle>
                    <SheetDescription>
                        Make changes to the invoice here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="customer-edit">Customer</Label>
                        <Input id="customer-edit" value={customer} onChange={(e) => setCustomer(e.target.value)} />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="invoice-date-edit">Invoice Date</Label>
                            <DatePicker />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="due-date-edit">Due Date</Label>
                            <DatePicker />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="status-edit">Status</Label>
                         <Select value={status.toLowerCase()} onValueChange={setStatus}>
                            <SelectTrigger id="status-edit">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="sent">Sent</SelectItem>
                                <SelectItem value="overdue">Overdue</SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
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
