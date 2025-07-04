'use client';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { AddBudgetDialog } from '@/components/dialogs/add-budget-dialog';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const budgets = [
    { name: 'Groceries', spent: 450.75, total: 800 },
    { name: 'Dining Out', spent: 210.50, total: 300 },
    { name: 'Software', spent: 49.99, total: 50 },
    { name: 'Travel', spent: 1200, total: 2500 },
    { name: 'Shopping', spent: 175.20, total: 400 },
];


export default function BudgetsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
                <AddBudgetDialog />
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {budgets.map(budget => {
                    const progress = Math.min((budget.spent / budget.total) * 100, 100);
                    return (
                        <Card key={budget.name}>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-lg">{budget.name}</CardTitle>
                                     <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Edit Budget</DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive focus:text-destructive">Delete Budget</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Progress value={progress} />
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>{budget.spent.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                                    <span>{budget.total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                                </div>
                            </CardContent>
                             <CardFooter>
                                <p className="text-xs text-muted-foreground">
                                    {budget.spent > budget.total 
                                        ? `${(budget.spent - budget.total).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} over budget`
                                        : `${(budget.total - budget.spent).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} remaining`
                                    }
                                </p>
                             </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
}
