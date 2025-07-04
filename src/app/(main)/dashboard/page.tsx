import { StatCard } from '@/components/stat-card';
import { TransactionChart } from '@/components/transaction-chart';
import { RecentTransactions } from '@/components/recent-transactions';
import { MyCards } from '@/components/my-cards';
import { QuickInvoice } from '@/components/quick-transfer';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/date-range-picker';
import { DollarSign, Users, CreditCard, Activity, ChevronDown } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Olivia!</h1>
          <p className="text-muted-foreground">
            Here's your financial overview for today.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <DateRangePicker />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>
                    Create New
                    <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>New Invoice</DropdownMenuItem>
                <DropdownMenuItem>New Payment</DropdownMenuItem>
                <DropdownMenuItem>New Transaction</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          change="+20.1% from last month"
          icon={DollarSign}
        />
        <StatCard
          title="Subscriptions"
          value="+2350"
          change="+180.1% from last month"
          icon={Users}
        />
        <StatCard
          title="Sales"
          value="+12,234"
          change="+19% from last month"
          icon={CreditCard}
        />
        <StatCard
          title="Active Now"
          value="+573"
          change="+201 since last hour"
          icon={Activity}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <div className="lg:col-span-4">
          <TransactionChart />
        </div>
        <div className="lg:col-span-3">
          <RecentTransactions />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MyCards />
        <QuickInvoice />
      </div>
    </div>
  );
}
