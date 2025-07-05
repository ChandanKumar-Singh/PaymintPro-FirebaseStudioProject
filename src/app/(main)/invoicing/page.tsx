'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, PlusCircle, FileWarning, FileClock, FileCheck, FileText } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import Link from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";
import { ConfirmDialog } from "@/components/dialogs/confirm-dialog";
import { useToast } from "@/hooks/use-toast";
import { EditInvoiceSheet } from "@/components/sheets/edit-invoice-sheet";
import { useAuth } from "@/components/auth-provider";
import { getInvoices, deleteDocument, type Invoice } from '@/lib/data';
import { Skeleton } from "@/components/ui/skeleton";
import { subDays } from "date-fns";
import { EmptyState } from "@/components/empty-state";

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Paid':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Paid</Badge>;
    case 'Overdue':
      return <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">Overdue</Badge>;
    case 'Sent':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Sent</Badge>;
    case 'Draft':
      return <Badge variant="secondary">Draft</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function InvoicingPage() {
    const { user } = useAuth();
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [editSheetOpen, setEditSheetOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const { toast } = useToast();

    const fetchInvoices = useCallback(async () => {
        if(user?.uid) {
            setLoading(true);
            const userInvoices = await getInvoices(user.uid);
            setInvoices(userInvoices);
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchInvoices();
    }, [fetchInvoices]);

    const handleDeleteClick = (invoice: Invoice) => {
        setSelectedInvoice(invoice);
        setConfirmOpen(true);
    }

    const handleEditClick = (invoice: Invoice) => {
        setSelectedInvoice(invoice);
        setEditSheetOpen(true);
    }
    
    const handleDeleteConfirm = async () => {
        if (!selectedInvoice || !user?.uid) return;
        
        try {
            await deleteDocument(user.uid, 'invoices', selectedInvoice.id!);
            toast({
                title: "Invoice Deleted",
                description: "The invoice has been successfully deleted.",
            });
            await fetchInvoices();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete invoice.",
                variant: 'destructive'
            });
        }
        
        setConfirmOpen(false);
        setSelectedInvoice(null);
    }

    const handleSendReminder = (customer: string) => {
         toast({
            title: "Reminder Sent",
            description: `A reminder has been sent to ${customer}.`,
        });
    }

    const { overdueAmount, draftAmount, paidLast30d } = useMemo(() => {
        const thirtyDaysAgo = subDays(new Date(), 30);
        
        let overdue = 0;
        let draft = 0;
        let paid = 0;

        invoices.forEach(invoice => {
            if (invoice.status === 'Overdue') {
                overdue += invoice.amount;
            } else if (invoice.status === 'Draft') {
                draft += invoice.amount;
            } else if (invoice.status === 'Paid' && new Date(invoice.date) >= thirtyDaysAgo) {
                paid += invoice.amount;
            }
        });

        return { overdueAmount: overdue, draftAmount: draft, paidLast30d: paid };

    }, [invoices]);

    return (
        <div className="space-y-6">
            <ConfirmDialog 
                open={confirmOpen}
                onOpenChange={setConfirmOpen}
                onConfirm={handleDeleteConfirm}
                title="Are you sure?"
                description="This will permanently delete the invoice. This action cannot be undone."
            />
            <EditInvoiceSheet
                open={editSheetOpen}
                onOpenChange={setEditSheetOpen}
                invoice={selectedInvoice}
                onSuccess={fetchInvoices}
            />
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Invoicing</h1>
                <Link href="/invoicing/new" passHref>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Invoice
                    </Button>
                </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard title="Overdue" value={overdueAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} change={`${invoices.filter(i => i.status === 'Overdue').length} invoice(s)`} icon={FileWarning} />
                <StatCard title="Draft" value={draftAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} change={`${invoices.filter(i => i.status === 'Draft').length} invoice(s)`} icon={FileClock} />
                <StatCard title="Paid (Last 30d)" value={paidLast30d.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} change="In the last 30 days" icon={FileCheck} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Invoices</CardTitle>
                    <CardDescription>Manage your invoices here.</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                         <div className="space-y-4">
                            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                        </div>
                    ) : invoices.length === 0 ? (
                        <EmptyState 
                            icon={FileText}
                            title="No invoices created"
                            description="Create your first invoice to get started."
                            actionButton={
                                <Button asChild>
                                    <Link href="/invoicing/new">
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Create Invoice
                                    </Link>
                                </Button>
                            }
                        />
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Invoice #</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Due Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoices.map((invoice) => (
                                    <TableRow key={invoice.id}>
                                        <TableCell className="font-medium">{invoice.customer}</TableCell>
                                        <TableCell>{invoice.invoiceNumber}</TableCell>
                                        <TableCell>{new Date(invoice.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</TableCell>
                                        <TableCell>{new Date(invoice.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</TableCell>
                                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                                        <TableCell className="text-right font-medium">{invoice.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleEditClick(invoice)}>View Invoice</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleEditClick(invoice)}>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleSendReminder(invoice.customer)}>Send Reminder</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleDeleteClick(invoice)}>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
