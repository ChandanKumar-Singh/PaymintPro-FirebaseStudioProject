'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { DatePicker } from "../date-picker";
import { useAuth } from "../auth-provider";
import { updateDocument, type Invoice } from "@/lib/data";
import { Loader2 } from "lucide-react";

interface EditInvoiceSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    invoice: Invoice | null;
    onSuccess: () => void;
}

export function EditInvoiceSheet({ open, onOpenChange, invoice, onSuccess }: EditInvoiceSheetProps) {
    const { user } = useAuth();
    const [customer, setCustomer] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        if (invoice) {
            setCustomer(invoice.customer);
            setStatus(invoice.status);
        }
    }, [invoice]);

    const handleSaveChanges = async () => {
        if (!invoice || !user?.uid) return;
        setLoading(true);
        try {
            await updateDocument(user.uid, 'invoices', invoice.id!, { customer, status });
            toast({
                title: "Invoice Updated",
                description: "The invoice details have been saved.",
            });
            onSuccess();
            onOpenChange(false);
        } catch (error) {
             toast({ title: "Error", description: "Failed to update invoice.", variant: "destructive"});
        } finally {
            setLoading(false);
        }
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
                                <SelectItem value="Paid">Paid</SelectItem>
                                <SelectItem value="Sent">Sent</SelectItem>
                                <SelectItem value="Overdue">Overdue</SelectItem>
                                <SelectItem value="Draft">Draft</SelectItem>
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
