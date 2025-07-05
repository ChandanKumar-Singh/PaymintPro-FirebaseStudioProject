'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from './auth-provider';
import { addDocument } from '@/lib/data';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';

export function QuickInvoice() {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useAuth();
  const [customerName, setCustomerName] = useState('');
  const [invoiceName, setInvoiceName] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSendInvoice = async () => {
    if (!user) {
        toast({ title: "Authentication Error", description: "You must be logged in.", variant: "destructive" });
        return;
    }
    if (!customerName || !invoiceName || !amount) {
        toast({ title: "Missing Information", description: "Please fill all fields.", variant: "destructive" });
        return;
    }

    setLoading(true);
    try {
        const newInvoice = {
            customer: customerName,
            invoiceNumber: `INV-${Math.floor(Math.random() * 9000) + 1000}`,
            date: format(new Date(), 'yyyy-MM-dd'),
            dueDate: format(new Date(new Date().setDate(new Date().getDate() + 30)), 'yyyy-MM-dd'), // Due in 30 days
            amount: parseFloat(amount),
            status: 'Sent',
        };
        await addDocument(user.uid, 'invoices', newInvoice);

        toast({
            title: "Invoice Sent",
            description: "The quick invoice has been created and sent.",
        });

        // Reset form
        setCustomerName('');
        setInvoiceName('');
        setAmount('');

    } catch (error) {
        toast({ title: "Error", description: "Failed to create invoice.", variant: "destructive" });
    } finally {
        setLoading(false);
    }
  }

  const handleSaveDraft = () => {
     router.push('/invoicing/new');
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Invoice</CardTitle>
        <CardDescription>Create and send an invoice quickly.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="customer-name">Customer Name</Label>
          <Input id="customer-name" placeholder="e.g., Liam Johnson" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="invoice-name">Invoice Name</Label>
          <Input id="invoice-name" placeholder="e.g. Website Redesign" value={invoiceName} onChange={(e) => setInvoiceName(e.target.value)} />
        </div>
        <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" placeholder="$0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div className="flex justify-between gap-4 pt-2">
            <Button variant="outline" className="w-full" onClick={handleSaveDraft}>
                More Options
            </Button>
            <Button className="w-full" onClick={handleSendInvoice} disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Invoice
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
