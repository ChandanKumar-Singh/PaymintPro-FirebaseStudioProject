'use client';
import { StatCard } from '@/components/stat-card';
import { TransactionChart } from '@/components/transaction-chart';
import { RecentTransactions } from '@/components/recent-transactions';
import { MyCards } from '@/components/my-cards';
import { DailyInsight } from '@/components/daily-insight';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/date-range-picker';
import { DollarSign, Users, CreditCard, Activity, ChevronDown } from 'lucide-react';
import { getDashboardStats, getCards, getOverviewData, type Transaction, type CardData } from '@/lib/data';
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/components/auth-provider';
import { Skeleton } from '@/components/ui/skeleton';
import { subDays } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { NewPaymentDialog } from '@/components/dialogs/new-payment-dialog';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';


type Stats = {
  totalRevenue: { value: number; change: number; };
  subscriptions: { value: number; change: number; };
  sales: { value: number; change: number; };
  activeNow: { value: number; change: number; };
};

type OverviewData = { name: string; total: number }[];


export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [stats, setStats] = useState<Stats | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [cards, setCards] = useState<CardData[]>([]);
  const [overviewData, setOverviewData] = useState<OverviewData>([]);
  const [loading, setLoading] = useState(true);
  
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 29),
    to: new Date(),
  });
  
  // URL-driven state
  const action = searchParams.get('action');
  const isNewPaymentOpen = action === 'new-payment';

  const handleOpen = (newAction: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('action', newAction);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('action');
    router.push(`${pathname}?${params.toString()}`);
  };
  
  const fetchData = useCallback(async () => {
    if (user?.uid && dateRange) {
        setLoading(true);
        const [dashboardData, cardsData, overview] = await Promise.all([
            getDashboardStats(user.uid, dateRange),
            getCards(user.uid),
            getOverviewData(user.uid, dateRange)
        ]);

        if (dashboardData) {
          setStats(dashboardData.stats);
          setRecentTransactions(dashboardData.recentTransactions);
        }
        
        setCards(cardsData);
        setOverviewData(overview);
        setLoading(false);
    }
  }, [user, dateRange]);

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
      <NewPaymentDialog 
        open={isNewPaymentOpen} 
        onOpenChange={(open) => !open && handleClose()} 
        onSuccess={() => {
          fetchData();
          handleClose();
        }}
      />
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.displayName?.split(' ')[0] || 'Olivia'}!</h1>
          <p className="text-muted-foreground">
            Here's your financial overview for the selected period.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <DateRangePicker date={dateRange} onSelect={setDateRange} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>
                    Create New
                    <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/invoicing/new">New Invoice</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleOpen('new-payment')}>
                    New Payment
                </DropdownMenuItem>
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
              change={stats ? `${formatChange(stats.totalRevenue.change)} from previous period` : '...'}
              icon={DollarSign}
            />
            <StatCard
              title="Subscriptions"
              value={stats ? `+${stats.subscriptions.value.toLocaleString()}` : '+0'}
              change={stats ? `${formatChange(stats.subscriptions.change)} from previous period` : '...'}
              icon={Users}
            />
            <StatCard
              title="Sales"
              value={stats ? `+${stats.sales.value.toLocaleString()}`: '+0'}
              change={stats ? `${formatChange(stats.sales.change)} from previous period`: '...'}
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
              <RecentTransactions transactions={recentTransactions} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MyCards cards={cards} />
            <DailyInsight />
          </div>
        </>
      )}
    </div>
  );
}
