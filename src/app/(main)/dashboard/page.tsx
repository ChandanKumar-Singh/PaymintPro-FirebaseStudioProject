import { StatCard } from '@/components/stat-card';
import { TransactionChart } from '@/components/transaction-chart';
import { RecentTransactions } from '@/components/recent-transactions';
import { MyCards } from '@/components/my-cards';
import { QuickTransfer } from '@/components/quick-transfer';
import { DollarSign, Wallet, ShoppingBag, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Brock!</h1>
            <p className="text-muted-foreground">
              Here's your financial overview for today.
            </p>
          </div>
          <Button>Add New Transaction</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Balance"
            value="$12,345.67"
            icon={Wallet}
            change="+2.5%"
            changeType="increase"
          />
          <StatCard
            title="Income"
            value="$5,600.00"
            icon={DollarSign}
            change="+10.2%"
            changeType="increase"
          />
          <StatCard
            title="Expenses"
            value="$3,450.12"
            icon={ShoppingBag}
            change="-3.1%"
            changeType="decrease"
          />
          <StatCard
            title="Savings"
            value="$1,234.56"
            icon={Landmark}
            change="+5.8%"
            changeType="increase"
          />
        </div>
        <TransactionChart />
        <RecentTransactions />
      </div>
      <div className="lg:col-span-1 space-y-6">
        <MyCards />
        <QuickTransfer />
      </div>
    </div>
  );
}
