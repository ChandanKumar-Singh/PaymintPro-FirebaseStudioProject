'use client';

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NewPaymentDialog } from "@/components/dialogs/new-payment-dialog";
import { ConfirmDialog } from "@/components/dialogs/confirm-dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const initialPayments = [
  { id: 'pay_1', recipient: 'Rent', date: '2024-08-01', amount: 2200.00, status: 'Upcoming' },
  { id: 'pay_2', recipient: 'AT&T', date: '2024-07-28', amount: 120.55, status: 'Upcoming' },
  { id: 'pay_3', recipient: 'Con Edison', date: '2024-07-22', amount: 85.70, status: 'Completed' },
  { id: 'pay_4', recipient: 'Amex Credit Card', date: '2024-07-20', amount: 540.23, status: 'Completed' },
  { id: 'pay_5', recipient: 'Spotify', date: '2024-07-15', amount: 10.99, status: 'Completed' },
  { id: 'pay_6', recipient: 'Insurance Premium', date: '2024-07-10', amount: 250.00, status: 'Failed' },
  { id: 'pay_7', recipient: 'Car Payment', date: '2024-07-05', amount: 450.00, status: 'Completed' },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Upcoming':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Upcoming</Badge>;
    case 'Completed':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
    case 'Failed':
      return <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">Failed</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function PaymentsPage() {
    const [payments, setPayments] = useState(initialPayments);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<{id: string, action: 'cancel' | 'retry'} | null>(null);
    const { toast } = useToast();

    const handleActionClick = (paymentId: string, action: 'cancel' | 'retry') => {
        setSelectedPayment({id: paymentId, action});
        setConfirmOpen(true);
    }
    
    const handleViewDetails = () => {
        toast({
            title: "Feature not available",
            description: "Viewing payment details is not yet implemented.",
        });
    }

    const handleConfirmAction = () => {
        if (!selectedPayment) return;

        if (selectedPayment.action === 'cancel') {
            setPayments(payments.filter(p => p.id !== selectedPayment.id));
             toast({ title: "Payment Canceled", description: "The upcoming payment has been canceled." });
        } else if (selectedPayment.action === 'retry') {
            setPayments(payments.map(p => p.id === selectedPayment.id ? {...p, status: 'Upcoming'} : p));
             toast({ title: "Payment Retried", description: "The failed payment will be retried." });
        }
       
        setConfirmOpen(false);
        setSelectedPayment(null);
    }

    const PaymentsTable = ({ data }: { data: (typeof initialPayments) }) => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((payment) => (
                    <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.recipient}</TableCell>
                        <TableCell>{new Date(payment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell className="text-right font-medium">
                            {payment.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={handleViewDetails}>View Details</DropdownMenuItem>
                                    {payment.status === 'Upcoming' && <DropdownMenuItem onClick={() => handleActionClick(payment.id, 'cancel')}>Cancel Payment</DropdownMenuItem>}
                                    {payment.status === 'Failed' && <DropdownMenuItem onClick={() => handleActionClick(payment.id, 'retry')}>Retry Payment</DropdownMenuItem>}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );

    const upcomingPayments = payments.filter(p => p.status === 'Upcoming');
    const completedPayments = payments.filter(p => p.status === 'Completed');
    const failedPayments = payments.filter(p => p.status === 'Failed');

    return (
        <div className="space-y-6">
            <ConfirmDialog 
                open={confirmOpen}
                onOpenChange={setConfirmOpen}
                onConfirm={handleConfirmAction}
                title={`Are you sure you want to ${selectedPayment?.action} this payment?`}
                description="This action may not be reversible depending on the payment status."
            />
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
                <NewPaymentDialog />
            </div>

            <Tabs defaultValue="upcoming">
                <TabsList>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="failed">Failed</TabsTrigger>
                </TabsList>
                <div className="mt-4">
                    <TabsContent value="upcoming">
                        <Card>
                            <CardHeader>
                                <CardTitle>Upcoming Payments</CardTitle>
                                <CardDescription>These are your scheduled and upcoming payments.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <PaymentsTable data={upcomingPayments} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="completed">
                        <Card>
                            <CardHeader>
                                <CardTitle>Completed Payments</CardTitle>
                                <CardDescription>These payments have been successfully processed.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <PaymentsTable data={completedPayments} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="failed">
                        <Card>
                            <CardHeader>
                                <CardTitle>Failed Payments</CardTitle>
                                <CardDescription>These payments could not be processed.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <PaymentsTable data={failedPayments} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
