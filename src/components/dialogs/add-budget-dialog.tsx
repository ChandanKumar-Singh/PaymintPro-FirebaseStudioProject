'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function AddBudgetDialog() {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    const handleAddBudget = () => {
        toast({
            title: "Budget Created",
            description: "Your new budget has been created successfully.",
        });
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Budget
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Budget</DialogTitle>
                    <DialogDescription>
                        Set a new budget for a spending category.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="category-name">Category Name</Label>
                        <Input id="category-name" placeholder="e.g., Groceries" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="budget-amount">Budget Amount</Label>
                        <Input id="budget-amount" type="number" placeholder="$500.00" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="budget-period">Period</Label>
                        <Select defaultValue="monthly">
                            <SelectTrigger id="budget-period">
                                <SelectValue placeholder="Select a period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="quarterly">Quarterly</SelectItem>
                                <SelectItem value="annually">Annually</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit" onClick={handleAddBudget}>Create Budget</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
