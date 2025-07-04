import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, PlusCircle, FileWarning, FileClock, FileCheck } from "lucide-react";
import { StatCard } from "@/components/stat-card";

const invoices = [
  { id: 'inv_1', customer: 'Acme Inc.', invoiceNumber: 'INV-007', date: '2024-07-15', dueDate: '2024-08-14', amount: 12000.00, status: 'Paid' },
  { id: 'inv_2', customer: 'Stark Industries', invoiceNumber: 'INV-006', date: '2024-07-10', dueDate: '2024-07-25', amount: 7500.00, status: 'Overdue' },
  { id: 'inv_3', customer: 'Wayne Enterprises', invoiceNumber: 'INV-005', date: '2024-07-05', dueDate: '2024-08-04', amount: 2500.00, status: 'Sent' },
  { id: 'inv_4', customer: 'Cyberdyne Systems', invoiceNumber: 'INV-004', date: '2024-07-01', dueDate: '2024-07-31', amount: 5000.00, status: 'Draft' },
  { id: 'inv_5', customer: 'Ollivanders Wand Shop', invoiceNumber: 'INV-003', date: '2024-06-25', dueDate: '2024-07-25', amount: 350.00, status: 'Paid' },
];

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
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Invoicing</h1>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Invoice
                </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard title="Overdue" value="$7,500.00" change="1 invoice" icon={FileWarning} />
                <StatCard title="Draft" value="$5,000.00" change="1 invoice" icon={FileClock} />
                <StatCard title="Paid (Last 30d)" value="$12,350.00" change="+15% from last month" icon={FileCheck} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Invoices</CardTitle>
                    <CardDescription>Manage your invoices here.</CardDescription>
                </CardHeader>
                <CardContent>
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
                                                <DropdownMenuItem>View Invoice</DropdownMenuItem>
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
