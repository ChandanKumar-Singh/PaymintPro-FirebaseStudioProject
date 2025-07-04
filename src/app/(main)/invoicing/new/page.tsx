'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/date-picker";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


interface LineItem {
  id: number;
  description: string;
  quantity: number;
  price: number;
}

export default function NewInvoicePage() {
    const [lineItems, setLineItems] = useState<LineItem[]>([
        { id: 1, description: '', quantity: 1, price: 0 }
    ]);
    const { toast } = useToast();
    const router = useRouter();

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

    const handleSendInvoice = () => {
        toast({
            title: "Invoice Sent",
            description: "The new invoice has been created and sent successfully.",
        });
        router.push('/invoicing');
    }
    
    const handleSaveDraft = () => {
        toast({
            title: "Draft Saved",
            description: "The invoice has been saved as a draft.",
        });
         router.push('/invoicing');
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Create New Invoice</h1>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleSaveDraft}>Save as Draft</Button>
                    <Button onClick={handleSendInvoice}>Send Invoice</Button>
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
                                <Label htmlFor="customer">Customer</Label>
                                <Select>
                                    <SelectTrigger id="customer">
                                        <SelectValue placeholder="Select a customer" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="acme">Acme Inc.</SelectItem>
                                        <SelectItem value="stark">Stark Industries</SelectItem>
                                        <SelectItem value="wayne">Wayne Enterprises</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="invoice-date">Invoice Date</Label>
                                    <DatePicker />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="due-date">Due Date</Label>
                                    <DatePicker />
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
