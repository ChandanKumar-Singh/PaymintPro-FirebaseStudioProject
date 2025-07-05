'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { updateDocument, type Budget } from "@/lib/data";
import { Loader2 } from "lucide-react";


interface EditBudgetSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    budget: Budget | null;
    onSuccess: () => void;
}

export function EditBudgetSheet({ open, onOpenChange, budget, onSuccess }: EditBudgetSheetProps) {
    const { user } = useAuth();
    const [name, setName] = useState('');
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        if (budget) {
            setName(budget.name);
            setTotal(budget.total);
        }
    }, [budget]);

    const handleSaveChanges = async () => {
        if (!budget || !user?.uid) return;
        setLoading(true);
        try {
            await updateDocument(user.uid, 'budgets', budget.id!, { name, total });
            toast({
                title: "Budget Updated",
                description: "Your budget has been successfully updated.",
            });
            onSuccess();
            onOpenChange(false);
        } catch (error) {
             toast({ title: "Error", description: "Failed to update budget.", variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    }

    if (!budget) return null;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Budget</SheetTitle>
                    <SheetDescription>
                        Make changes to your budget here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="budget-name">Category Name</Label>
                        <Input id="budget-name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="budget-total">Budget Amount</Label>
                        <Input id="budget-total" type="number" value={total} onChange={(e) => setTotal(parseFloat(e.target.value) || 0)} />
                    </div>
                </div>
                <SheetFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button type="submit" onClick={handleSaveChanges} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
