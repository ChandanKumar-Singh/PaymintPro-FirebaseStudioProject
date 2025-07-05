'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/date-picker";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, PlusCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { addDocument } from "@/lib/data";
import { format } from 'date-fns';

interface LineItem {
  id: number;
  description: string;
  quantity: number;
  price: number;
}

export default function NewInvoicePage() {
    const { user } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const [customerName, setCustomerName] = useState('');
    const [invoiceDate, setInvoiceDate] = useState<Date | undefined>(new Date());
    const [dueDate, setDueDate] = useState<Date | undefined>();
    const [lineItems, setLineItems] = useState<LineItem[]>([
        { id: 1, description: '', quantity: 1, price: 0 }
    ]);
    const [loading, setLoading] = useState(false);

    const handleAddItem = () => {
        setLineItems([...lineItems, { id: Date.now(), description: '', quantity: 1, price: 0 }]);
    };

    const handleRemoveItem = (id: number) => {
        setLineItems(lineItems.filter(item => item.id !== id));
    };
    
    const handleItemChange = (id: number, field: keyof Omit<LineItem, 'id'>, value: string | number) => {
        setLineItems(lineItems.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const subtotal = lineItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const tax = subtotal * 0.08; // Example tax rate
    const total = subtotal + tax;

    const handleCreateInvoice = async (status: 'Sent' | 'Draft') => {
        if(!user) {
            toast({ title: "Authentication Error", description: "You must be logged in to create an invoice.", variant: "destructive" });
            return;
        }
        if(!customerName || !invoiceDate || !dueDate || lineItems.some(item => !item.description || item.price <= 0)) {
            toast({ title: "Missing Information", description: "Please fill all required fields.", variant: "destructive" });
            return;
        }

        setLoading(true);
        try {
            const newInvoice = {
                customer: customerName,
                invoiceNumber: `INV-${Math.floor(Math.random() * 9000) + 1000}`,
                date: format(invoiceDate, 'yyyy-MM-dd'),
                dueDate: format(dueDate, 'yyyy-MM-dd'),
                amount: total,
                status,
                // In a real app, line items would be a subcollection
            };
            await addDocument(user.uid, 'invoices', newInvoice);

            toast({
                title: status === 'Sent' ? "Invoice Sent" : "Draft Saved",
                description: `The invoice has been successfully ${status === 'Sent' ? 'created and sent' : 'saved as a draft'}.`,
            });
            router.push('/invoicing');
        } catch (error) {
            toast({ title: "Error", description: "Failed to create invoice.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Create New Invoice</h1>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleCreateInvoice('Draft')} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save as Draft
                    </Button>
                    <Button onClick={() => handleCreateInvoice('Sent')} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Send Invoice
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Invoice Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="customer-name">Customer Name</Label>
                                <Input id="customer-name" placeholder="Enter customer name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="invoice-date">Invoice Date</Label>
                                    <DatePicker date={invoiceDate} setDate={setInvoiceDate} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="due-date">Due Date</Label>
                                    <DatePicker date={dueDate} setDate={setDueDate} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Line Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-1/2">Description</TableHead>
                                        <TableHead>Qty</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                        <TableHead className="w-[50px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {lineItems.map(item => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <Input value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} placeholder="Item description" />
                                            </TableCell>
                                            <TableCell>
                                                <Input type="number" value={item.quantity} onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)} className="w-16" />
                                            </TableCell>
                                            <TableCell>
                                                <Input type="number" value={item.price} onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)} placeholder="$0.00" />
                                            </TableCell>
                                            <TableCell className="text-right font-medium">
                                                {(item.quantity * item.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)} className="text-muted-foreground hover:text-destructive">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Button variant="outline" size="sm" className="mt-4" onClick={handleAddItem}>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Item
                            </Button>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle>Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Textarea placeholder="Add any notes for the customer..." />
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card className="sticky top-20">
                        <CardHeader>
                            <CardTitle>Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="flex justify-between">
                               <span className="text-muted-foreground">Subtotal</span>
                               <span className="font-medium">{subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                           </div>
                            <div className="flex justify-between">
                               <span className="text-muted-foreground">Tax (8%)</span>
                               <span className="font-medium">{tax.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                           </div>
                           <div className="flex justify-between text-lg font-bold border-t pt-4">
                               <span>Total</span>
                               <span>{total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                           </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
