'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useAuth } from "../auth-provider";
import { updateDocument, type Account } from "@/lib/data";
import { Loader2 } from "lucide-react";


interface EditAccountSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    account: Account | null;
    onSuccess: () => void;
}

export function EditAccountSheet({ open, onOpenChange, account, onSuccess }: EditAccountSheetProps) {
    const { user } = useAuth();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        if (account) {
            setName(account.name);
            setType(account.type);
        }
    }, [account]);

    const handleSaveChanges = async () => {
        if (!account || !user?.uid) return;
        setLoading(true);

        try {
            await updateDocument(user.uid, 'accounts', account.id!, { name, type });
            toast({
                title: "Account Updated",
                description: "Your account details have been saved.",
            });
            onSuccess();
            onOpenChange(false);
        } catch (error) {
            toast({ title: "Error", description: "Failed to update account.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
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
                        <Input id="bank-name" value={account.bank} disabled/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="account-type">Account Type</Label>
                        <Select value={type} onValueChange={(value) => setType(value)}>
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
