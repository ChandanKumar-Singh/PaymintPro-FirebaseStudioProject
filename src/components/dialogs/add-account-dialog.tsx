'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";


export function AddAccountDialog() {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    const handleAddAccount = () => {
        // Here you would typically handle the form submission
        toast({
            title: "Account Added",
            description: "The new bank account has been connected successfully.",
        });
        setOpen(false);
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
                        <Select>
                            <SelectTrigger id="bank-name">
                                <SelectValue placeholder="Select a bank" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="capital-one">Capital One</SelectItem>
                                <SelectItem value="chase">Chase</SelectItem>
                                <SelectItem value="fidelity">Fidelity</SelectItem>
                                <SelectItem value="bank-of-america">Bank of America</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="account-name">Account Name</Label>
                        <Input id="account-name" placeholder="e.g., Business Checking" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="account-type">Account Type</Label>
                        <Select>
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
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit" onClick={handleAddAccount}>Connect Account</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
