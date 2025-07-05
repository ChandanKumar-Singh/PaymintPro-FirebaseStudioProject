'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../auth-provider";
import { addDocument } from "@/lib/data";

interface AddAccountDialogProps {
    onSuccess: () => void;
}

export function AddAccountDialog({ onSuccess }: AddAccountDialogProps) {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const [bank, setBank] = useState('');
    const [accountName, setAccountName] = useState('');
    const [accountType, setAccountType] = useState<'Checking' | 'Savings' | 'Investment' | ''>('');

    const handleAddAccount = async () => {
        if (!user) {
            toast({ title: "Authentication Error", description: "You must be logged in.", variant: "destructive" });
            return;
        }
        if (!bank || !accountName || !accountType) {
            toast({ title: "Missing Information", description: "Please fill out all fields.", variant: "destructive" });
            return;
        }
        
        setLoading(true);
        try {
            const newAccount = {
                name: accountName,
                bank,
                accountNumber: `**** **** **** ${Math.floor(1000 + Math.random() * 9000)}`,
                balance: Math.floor(Math.random() * (25000 - 1000 + 1) + 1000),
                type: accountType,
            };
            await addDocument(user.uid, 'accounts', newAccount);
            toast({
                title: "Account Added",
                description: "The new bank account has been connected successfully.",
            });
            onSuccess();
            setOpen(false);
            // Reset form
            setBank('');
            setAccountName('');
            setAccountType('');
        } catch (error) {
            toast({ title: "Error", description: "Failed to add account.", variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Account</DialogTitle>
                    <DialogDescription>
                        Connect a new bank account to manage your finances.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="bank-name">Bank Name</Label>
                        <Select value={bank} onValueChange={setBank}>
                            <SelectTrigger id="bank-name">
                                <SelectValue placeholder="Select a bank" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Capital One">Capital One</SelectItem>
                                <SelectItem value="Chase">Chase</SelectItem>
                                <SelectItem value="Fidelity">Fidelity</SelectItem>
                                <SelectItem value="Bank of America">Bank of America</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="account-name">Account Nickname</Label>
                        <Input id="account-name" placeholder="e.g., Business Checking" value={accountName} onChange={e => setAccountName(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="account-type">Account Type</Label>
                        <Select value={accountType} onValueChange={(value) => setAccountType(value as any)}>
                            <SelectTrigger id="account-type">
                                <SelectValue placeholder="Select account type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Checking">Checking</SelectItem>
                                <SelectItem value="Savings">Savings</SelectItem>
                                <SelectItem value="Investment">Investment</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit" onClick={handleAddAccount} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Connect Account
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
