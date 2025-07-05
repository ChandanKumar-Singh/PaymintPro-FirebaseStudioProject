'use client';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth-provider";
import { addDocument } from "@/lib/data";

interface AddBudgetDialogProps {
  onSuccess: () => void;
}

export function AddBudgetDialog({ onSuccess }: AddBudgetDialogProps) {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [total, setTotal] = useState('');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleAddBudget = async () => {
        if (!user || !name || !total) {
            toast({ title: "Missing Information", description: "Please fill out all fields.", variant: "destructive" });
            return;
        }

        setLoading(true);
        try {
            await addDocument(user.uid, 'budgets', {
                name,
                total: parseFloat(total),
                spent: 0 // New budgets start with 0 spent
            });
            toast({
                title: "Budget Created",
                description: "Your new budget has been created successfully.",
            });
            onSuccess();
            setOpen(false);
            setName('');
            setTotal('');
        } catch (error) {
            toast({ title: "Error", description: "Failed to create budget.", variant: 'destructive' });
        } finally {
            setLoading(false);
        }
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
                        <Input id="category-name" placeholder="e.g., Groceries" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="budget-amount">Budget Amount</Label>
                        <Input id="budget-amount" type="number" placeholder="$500.00" value={total} onChange={(e) => setTotal(e.target.value)} />
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
                    <Button type="submit" onClick={handleAddBudget} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create Budget
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
