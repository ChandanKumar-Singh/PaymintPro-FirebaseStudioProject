'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

interface EditBudgetSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    budget: { id: string, name: string; spent: number; total: number; } | null;
}

export function EditBudgetSheet({ open, onOpenChange, budget }: EditBudgetSheetProps) {
    const [name, setName] = useState('');
    const [total, setTotal] = useState(0);
    const { toast } = useToast();

    useEffect(() => {
        if (budget) {
            setName(budget.name);
            setTotal(budget.total);
        }
    }, [budget]);

    const handleSaveChanges = () => {
        toast({
            title: "Budget Updated",
            description: "Your budget has been successfully updated.",
        });
        onOpenChange(false);
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
                    <Button type="submit" onClick={handleSaveChanges}>Save Changes</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
