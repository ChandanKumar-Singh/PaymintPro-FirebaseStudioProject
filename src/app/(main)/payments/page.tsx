'use client';

import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NewPaymentDialog } from "@/components/dialogs/new-payment-dialog";
import { ConfirmDialog } from "@/components/dialogs/confirm-dialog";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth-provider";
import { getPayments, deleteDocument, updateDocument, type Payment } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/transactions-table";
import { type ColumnDef } from "@tanstack/react-table";

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

type ActionType = 'cancel' | 'retry';

export default function PaymentsPage() {
    const { user } = useAuth();
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<{id: string, action: ActionType} | null>(null);
    const { toast } = useToast();

    const fetchPayments = useCallback(async () => {
        if(user?.uid) {
            setLoading(true);
            const userPayments = await getPayments(user.uid);
            setPayments(userPayments);
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchPayments();
    }, [fetchPayments]);

    const handleActionClick = (paymentId: string, action: ActionType) => {
        setSelectedPayment({id: paymentId, action});
        setConfirmOpen(true);
    }
    
    const handleViewDetails = () => {
        toast({
            title: "Feature not available",
            description: "Viewing payment details is not yet implemented.",
        });
    }

    const handleConfirmAction = async () => {
        if (!selectedPayment || !user?.uid) return;

        try {
            if (selectedPayment.action === 'cancel') {
                await deleteDocument(user.uid, 'payments', selectedPayment.id);
                toast({ title: "Payment Canceled", description: "The upcoming payment has been canceled." });
            } else if (selectedPayment.action === 'retry') {
                await updateDocument(user.uid, 'payments', selectedPayment.id, { status: 'Upcoming' });
                toast({ title: "Payment Retried", description: "The failed payment will be retried." });
            }
            await fetchPayments();
        } catch (error) {
             toast({ title: "Error", description: "The action could not be completed.", variant: 'destructive'});
        }
       
        setConfirmOpen(false);
        setSelectedPayment(null);
    }

    const columns = useMemo<ColumnDef<Payment>[]>(() => [
        { accessorKey: 'recipient', header: 'Recipient' },
        { 
            accessorKey: 'date', 
            header: 'Date',
            cell: ({ row }) => new Date(row.original.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        },
        { 
            accessorKey: 'status', 
            header: 'Status',
            cell: ({ row }) => getStatusBadge(row.original.status)
        },
        { 
            accessorKey: 'amount', 
            header: () => <div className="text-right">Amount</div>,
            cell: ({ row }) => (
                <div className="text-right font-medium">
                    {row.original.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </div>
            )
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <div className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={handleViewDetails}>View Details</DropdownMenuItem>
                            {row.original.status === 'Upcoming' && <DropdownMenuItem onClick={() => handleActionClick(row.original.id!, 'cancel')}>Cancel Payment</DropdownMenuItem>}
                            {row.original.status === 'Failed' && <DropdownMenuItem onClick={() => handleActionClick(row.original.id!, 'retry')}>Retry Payment</DropdownMenuItem>}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }
    ], [fetchPayments]);


    const renderTabContent = (status: 'Upcoming' | 'Completed' | 'Failed') => {
        const filteredPayments = payments.filter(p => p.status === status);
        return (
            <Card>
                <CardHeader>
                    <CardTitle>{status} Payments</CardTitle>
                    <CardDescription>
                        {
                            status === 'Upcoming' ? "These are your scheduled and upcoming payments." :
                            status === 'Completed' ? "These payments have been successfully processed." :
                            "These payments could not be processed."
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? <Skeleton className="h-48 w-full" /> : <DataTable columns={columns} data={filteredPayments} searchKey="recipient" />}
                </CardContent>
            </Card>
        )
    }

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
                <NewPaymentDialog onSuccess={fetchPayments}/>
            </div>

            <Tabs defaultValue="upcoming">
                <TabsList>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="failed">Failed</TabsTrigger>
                </TabsList>
                <div className="mt-4">
                    <TabsContent value="upcoming">{renderTabContent('Upcoming')}</TabsContent>
                    <TabsContent value="completed">{renderTabContent('Completed')}</TabsContent>
                    <TabsContent value="failed">{renderTabContent('Failed')}</TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
