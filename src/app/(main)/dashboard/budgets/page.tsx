'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { AddBudgetDialog } from '@/components/dialogs/add-budget-dialog';
import { MoreHorizontal, Target, PlusCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { EditBudgetSheet } from '@/components/sheets/edit-budget-sheet';
import { ConfirmDialog } from '@/components/dialogs/confirm-dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/auth-provider';
import { getBudgets, deleteDocument, type Budget } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/empty-state';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function BudgetsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { toast } = useToast();

    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [loading, setLoading] = useState(true);
    
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [budgetToDelete, setBudgetToDelete] = useState<Budget | null>(null);

    // URL-driven state
    const action = searchParams.get('action');
    const selectedBudgetId = searchParams.get('id');

    const isAddOpen = action === 'add-budget';
    const isEditOpen = action === 'edit-budget' && !!selectedBudgetId;
    
    const selectedBudget = useMemo(() => {
        if (!selectedBudgetId || !isEditOpen) return null;
        return budgets.find(b => b.id === selectedBudgetId) || null;
    }, [budgets, selectedBudgetId, isEditOpen]);


    const fetchBudgets = useCallback(async () => {
        if (user?.uid) {
            setLoading(true);
            const userBudgets = await getBudgets(user.uid);
            setBudgets(userBudgets);
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchBudgets();
    }, [fetchBudgets]);

    useEffect(() => {
        if (isEditOpen && !loading && budgets.length > 0 && !selectedBudget) {
            const params = new URLSearchParams(searchParams.toString());
            params.delete('action');
            params.delete('id');
            router.replace(`${pathname}?${params.toString()}`);
        }
    }, [isEditOpen, selectedBudget, budgets.length, loading, searchParams, router, pathname]);

    const handleOpen = (newAction: string, id?: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('action', newAction);
        if (id) {
            params.set('id', id);
        } else {
            params.delete('id');
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleClose = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('action');
        params.delete('id');
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleDeleteClick = (budget: Budget) => {
        setBudgetToDelete(budget);
        setConfirmOpen(true);
    }

    const handleDeleteConfirm = async () => {
        if (!budgetToDelete || !user?.uid) return;
        
        try {
            await deleteDocument(user.uid, 'budgets', budgetToDelete.id!);
            toast({
                title: "Budget Deleted",
                description: "The budget has been successfully deleted.",
            });
            await fetchBudgets();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete budget. Please try again.",
                variant: 'destructive'
            });
        } finally {
            setConfirmOpen(false);
            setBudgetToDelete(null);
        }
    }

    return (
        <div className="space-y-6">
            <ConfirmDialog 
                open={confirmOpen}
                onOpenChange={setConfirmOpen}
                onConfirm={handleDeleteConfirm}
                title="Are you sure?"
                description="This will permanently delete the budget. This action cannot be undone."
            />
            <AddBudgetDialog
                open={isAddOpen}
                onOpenChange={(open) => !open && handleClose()}
                onSuccess={() => {
                    fetchBudgets();
                    handleClose();
                }}
            />
            <EditBudgetSheet 
                open={isEditOpen && !!selectedBudget}
                onOpenChange={(open) => !open && handleClose()}
                budget={selectedBudget}
                onSuccess={() => {
                    fetchBudgets();
                    handleClose();
                }}
            />
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
                <Button onClick={() => handleOpen('add-budget')}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Budget
                </Button>
            </div>

            {loading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-48 w-full" />)}
                </div>
            ) : budgets.length === 0 ? (
                 <EmptyState
                    icon={Target}
                    title="No budgets created"
                    description="Get started by creating a new budget to track your spending."
                    actionButton={<Button onClick={() => handleOpen('add-budget')}>Add Budget</Button>}
                />
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {budgets.map(budget => {
                        const progress = Math.min((budget.spent / budget.total) * 100, 100);
                        return (
                            <Card key={budget.id}>
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
                                            <DropdownMenuItem onClick={() => handleOpen('edit-budget', budget.id!)}>Edit Budget</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleDeleteClick(budget)}>Delete Budget</DropdownMenuItem>
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
            )}
        </div>
    );
}
