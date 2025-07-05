'use client';
import { StatCard } from '@/components/stat-card';
import { TransactionChart } from '@/components/transaction-chart';
import { RecentTransactions } from '@/components/recent-transactions';
import { MyCards } from '@/components/my-cards';
import { QuickInvoice } from '@/components/quick-transfer';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/date-range-picker';
import { DollarSign, Users, CreditCard, Activity, ChevronDown } from 'lucide-react';
import { getDashboardStats, getCards, getOverviewData, type Transaction, type CardData } from '@/lib/data';
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/components/auth-provider';
import { Skeleton } from '@/components/ui/skeleton';

type Stats = {
  totalRevenue: { value: number; change: number; };
  subscriptions: { value: number; change: number; };
  sales: { value: number; change: number; };
  activeNow: { value: number; change: number; };
};

type OverviewData = { name: string; total: number }[];


export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentSales, setRecentSales] = useState<Transaction[]>([]);
  const [cards, setCards] = useState<CardData[]>([]);
  const [overviewData, setOverviewData] = useState<OverviewData>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchData = useCallback(async () => {
    if (user?.uid) {
        setLoading(true);
        const [dashboardData, cardsData, overview] = await Promise.all([
            getDashboardStats(user.uid),
            getCards(user.uid),
            getOverviewData(user.uid)
        ]);

        if (dashboardData) {
          setStats(dashboardData.stats);
          setRecentSales(dashboardData.recentSales);
        }
        
        setCards(cardsData);
        setOverviewData(overview);
        setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatChange = (change: number) => {
    if (change === null || isNaN(change)) return '...';
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.displayName?.split(' ')[0] || 'Olivia'}!</h1>
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

       {loading ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
            <Skeleton className="h-80 lg:col-span-4" />
            <Skeleton className="h-80 lg:col-span-3" />
          </div>
        </>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Revenue"
              value={stats ? stats.totalRevenue.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '$0.00'}
              change={stats ? `${formatChange(stats.totalRevenue.change)} from last month` : '...'}
              icon={DollarSign}
            />
            <StatCard
              title="Subscriptions"
              value={stats ? `+${stats.subscriptions.value.toLocaleString()}` : '+0'}
              change={stats ? `${formatChange(stats.subscriptions.change)} from last month` : '...'}
              icon={Users}
            />
            <StatCard
              title="Sales"
              value={stats ? `+${stats.sales.value.toLocaleString()}`: '+0'}
              change={stats ? `${formatChange(stats.sales.change)} from last month`: '...'}
              icon={CreditCard}
            />
            <StatCard
              title="Active Now"
              value={stats ? `+${stats.activeNow.value}`: '+0'}
              change={stats ? `+${stats.activeNow.change} since last hour`: '...'}
              icon={Activity}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
            <div className="lg:col-span-4">
              <TransactionChart data={overviewData} />
            </div>
            <div className="lg:col-span-3">
              <RecentTransactions sales={recentSales} totalSalesThisMonth={stats?.sales.value || 0} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MyCards cards={cards} />
            <QuickInvoice />
          </div>
        </>
      )}
    </div>
  );
}
