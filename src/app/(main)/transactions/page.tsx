
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, PlusCircle, Search, File, ListFilter, ShoppingCart, Coffee, DollarSign, Home, FileText } from "lucide-react"
import { DateRangePicker } from "@/components/date-range-picker"

const transactions = [
  {
    id: 'txn_1',
    name: 'Online Shopping',
    description: 'Zalando',
    date: '2024-07-28',
    amount: -79.90,
    status: 'Completed',
    icon: ShoppingCart,
  },
  {
    id: 'txn_2',
    name: 'Food & Drinks',
    description: 'Starbucks',
    date: '2024-07-27',
    amount: -12.50,
    status: 'Completed',
    icon: Coffee,
  },
  {
    id: 'txn_3',
    name: 'Salary',
    description: 'Acme Corp',
    date: '2024-07-26',
    amount: 2500.00,
    status: 'Completed',
    icon: DollarSign,
  },
  {
    id: 'txn_4',
    name: 'House',
    description: 'IKEA',
    date: '2024-07-25',
    amount: -499.00,
    status: 'Pending',
    icon: Home,
  },
  {
    id: 'txn_5',
    name: 'Bills & Fees',
    description: 'Electricity Bill',
    date: '2024-07-24',
    amount: -85.50,
    status: 'Completed',
    icon: FileText,
  },
  {
    id: 'txn_6',
    name: 'Food & Drinks',
    description: 'Burger King',
    date: '2024-07-23',
    amount: -25.75,
    status: 'Failed',
    icon: Coffee,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Completed':
      return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-transparent">Completed</Badge>;
    case 'Pending':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-transparent">Pending</Badge>;
    case 'Failed':
      return <Badge variant="destructive">Failed</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};


export default function TransactionsPage() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold">Transactions</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <File className="mr-2" />
                Export
              </Button>
              <Button>
                <PlusCircle className="mr-2" />
                New Transaction
              </Button>
            </div>
          </div>

        <Tabs defaultValue="all">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  className="pl-8 w-full sm:w-[200px] lg:w-[300px]"
                />
              </div>
              <DateRangePicker />
            </div>
          </div>
          <TabsContent value="all" className="mt-4">
            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>A detailed list of all your transactions.</CardDescription>
                </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px] px-4">
                        <Checkbox />
                      </TableHead>
                      <TableHead>Transaction</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="px-4">
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-4">
                                <Avatar className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                                    <transaction.icon className="h-5 w-5 text-muted-foreground" />
                                </Avatar>
                                <div>
                                    <div className="font-medium">{transaction.name}</div>
                                    <div className="text-sm text-muted-foreground">{transaction.description}</div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </TableCell>
                        <TableCell>
                            {getStatusBadge(transaction.status)}
                        </TableCell>
                        <TableCell className={`text-right font-medium ${transaction.amount > 0 ? 'text-green-600' : ''}`}>
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
                              <DropdownMenuItem>Edit</DropdownMenuItem>
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
                  Showing <strong>1-6</strong> of <strong>32</strong> transactions
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="income">
            <p className="p-4">Income transactions will be shown here.</p>
          </TabsContent>
          <TabsContent value="expenses">
            <p className="p-4">Expense transactions will be shown here.</p>
          </TabsContent>
        </Tabs>
      </div>
    );
}
