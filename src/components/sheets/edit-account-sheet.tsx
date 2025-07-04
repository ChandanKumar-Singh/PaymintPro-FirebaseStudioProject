'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface EditAccountSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    account: { id: string; name: string; bank: string; accountNumber: string; balance: number; type: string; } | null;
}

export function EditAccountSheet({ open, onOpenChange, account }: EditAccountSheetProps) {
    const [name, setName] = useState('');
    const [bank, setBank] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        if (account) {
            setName(account.name);
            setBank(account.bank);
        }
    }, [account]);

    const handleSaveChanges = () => {
        toast({
            title: "Account Updated",
            description: "Your account details have been saved.",
        });
        onOpenChange(false);
    }

    if (!account) return null;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Account</SheetTitle>
                    <SheetDescription>
                        Make changes to your connected account here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="account-name">Account Name</Label>
                        <Input id="account-name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="bank-name">Bank</Label>
                        <Input id="bank-name" value={bank} onChange={(e) => setBank(e.target.value)} disabled/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="account-type">Account Type</Label>
                        <Select defaultValue={account.type.toLowerCase()}>
                            <SelectTrigger id="account-type">
                                <SelectValue placeholder="Select account type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="checking">Checking</SelectItem>
                                <SelectItem value="savings">Savings</SelectItem>
                                <SelectItem value="investment">Investment</SelectItem>
                            </SelectContent>
                        </Select>
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
