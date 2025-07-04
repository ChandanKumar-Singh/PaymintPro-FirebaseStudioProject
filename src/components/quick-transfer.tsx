'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export function QuickInvoice() {
  const { toast } = useToast();
  const router = useRouter();

  const handleSendInvoice = () => {
    toast({
        title: "Invoice Sent",
        description: "The quick invoice has been created and sent.",
    });
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
          <Label htmlFor="customer-select">Customer</Label>
          <Select>
            <SelectTrigger id="customer-select">
              <SelectValue placeholder="Select customer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="liam">Liam Johnson</SelectItem>
              <SelectItem value="olivia">Olivia Smith</SelectItem>
              <SelectItem value="noah">Noah Williams</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="invoice-name">Invoice Name</Label>
          <Input id="invoice-name" placeholder="e.g. Website Redesign" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" placeholder="$0.00" />
        </div>
        <div className="flex justify-between gap-4 pt-2">
            <Button variant="outline" className="w-full" onClick={handleSaveDraft}>
                More Options
            </Button>
            <Button className="w-full" onClick={handleSendInvoice}>
                Send Invoice
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
