import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type LucideIcon, ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  changeType: 'increase' | 'decrease';
}

export function StatCard({
  title,
  value,
  icon: Icon,
  change,
  changeType,
}: StatCardProps) {
  const isIncrease = changeType === 'increase';
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          {isIncrease ? (
            <ArrowUp className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDown className="h-4 w-4 text-destructive" />
          )}
          <span>{change} vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
