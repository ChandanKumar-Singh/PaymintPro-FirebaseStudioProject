
'use client';

import React, { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MoreHorizontal, Search, Download, ListFilter } from "lucide-react"
import { DateRangePicker } from "@/components/date-range-picker"
import { cn } from '@/lib/utils';
import { EditTransactionSheet } from '@/components/sheets/edit-transaction-sheet';

const transactionsData = [
  {
    id: "txn_001",
    customer: "Liam Johnson",
    email: "liam@example.com",
    type: "Sale",
    status: "Success",
    date: "2023-06-23",
    amount: 250.00,
  },
  {
    id: "txn_002",
    customer: "Olivia Smith",
    email: "olivia@example.com",
    type: "Refund",
    status: "Declined",
    date: "2023-06-24",
    amount: 150.00,
  },
  {
    id: "txn_003",
    customer: "Noah Williams",
    email: "noah@example.com",
    type: "Subscription",
    status: "Success",
    date: "2023-06-25",
    amount: 350.00,
  },
  {
    id: "txn_004",
    customer: "Emma Brown",
    email: "emma@example.com",
    type: "Sale",
    status: "Processing",
    date: "2023-06-25",
    amount: 450.00,
  },
  {
    id: "txn_005",
    customer: "James Jones",
    email: "james@example.com",
    type: "Sale",
    status: "Success",
    date: "2023-06-26",
    amount: 550.00,
  },
    {
    id: "txn_006",
    customer: "Ava Davis",
    email: "ava@example.com",
    type: "Subscription",
    status: "Success",
    date: "2023-06-27",
    amount: 200.00,
  },
  {
    id: "txn_007",
    customer: "Lucas Miller",
    email: "lucas@example.com",
    type: "Sale",
    status: "Success",
    date: "2023-06-28",
    amount: 300.00,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Success':
      return <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">Success</Badge>;
    case 'Processing':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Processing</Badge>;
    case 'Declined':
      return <Badge variant="outline" className="bg-rose-100 text-rose-800 border-rose-200">Declined</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

type Transaction = typeof transactionsData[0];

export default function TransactionsPage() {
    const [editSheetOpen, setEditSheetOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    const handleEditClick = (transaction: Transaction) => {
      setSelectedTransaction(transaction);
      setEditSheetOpen(true);
    }

    return (
      <Tabs defaultValue="all" className="space-y-6">
        <EditTransactionSheet 
          open={editSheetOpen}
          onOpenChange={setEditSheetOpen}
          transaction={selectedTransaction}
        />
        <div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
                <div className="flex items-center gap-2">
                    <DateRangePicker />
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </div>
            </div>
            <div className="mt-4">
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="success">Success</TabsTrigger>
                    <TabsTrigger value="processing">Processing</TabsTrigger>
                    <TabsTrigger value="declined">Declined</TabsTrigger>
                    <TabsTrigger value="refunds">Refunds</TabsTrigger>
                </TabsList>
            </div>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <CardTitle>Transactions</CardTitle>
                  <CardDescription>
                    Recent transactions from your store.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search transactions..." className="pl-8 w-full sm:w-auto" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-1">
                        <ListFilter className="h-4 w-4" />
                        <span>Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Success
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Processing
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Declined
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px] px-4">
                      <Checkbox />
                    </TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionsData.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="px-4">
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{transaction.customer}</div>
                        <div className="text-sm text-muted-foreground">{transaction.email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn(transaction.type === 'Refund' && 'bg-gray-100')}>{transaction.type}</Badge>
                      </TableCell>
                      <TableCell>
                          {getStatusBadge(transaction.status)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
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
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditClick(transaction)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between py-4">
              <div className="text-sm text-muted-foreground">
                Showing <strong>1-7</strong> of <strong>32</strong> transactions
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    );
}
