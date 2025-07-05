'use client';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../auth-provider";
import { addDocument } from "@/lib/data";

interface AddCardDialogProps {
  onSuccess: () => void;
}

export function AddCardDialog({ onSuccess }: AddCardDialogProps) {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleAddCard = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user) return;

        const formData = new FormData(event.currentTarget);
        const cardData = {
            holder: formData.get('card-holder') as string,
            number: formData.get('card-number') as string,
            expiry: formData.get('expiry-date') as string,
            brand: 'visa' as 'visa' | 'mastercard', // Simplified for now
            status: 'Active' as 'Active' | 'Inactive',
            type: 'Virtual' as 'Virtual' | 'Physical',
        };

        if (!cardData.holder || !cardData.number || !cardData.expiry) {
            toast({ title: "Missing fields", description: "Please fill out all card details.", variant: 'destructive' });
            return;
        }

        setLoading(true);
        try {
            await addDocument(user.uid, 'cards', cardData);
            toast({
                title: "Card Added",
                description: "The new card has been added successfully.",
            });
            onSuccess();
            setOpen(false);
        } catch (error) {
             toast({ title: "Error", description: "Failed to add card.", variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Card
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleAddCard}>
                    <DialogHeader>
                        <DialogTitle>Add New Card</DialogTitle>
                        <DialogDescription>
                            Enter the details of your new card.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="card-holder">Card Holder Name</Label>
                            <Input id="card-holder" name="card-holder" placeholder="Olivia Martin" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input id="card-number" name="card-number" placeholder="**** **** **** 1234" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="expiry-date">Expiry Date</Label>
                                <Input id="expiry-date" name="expiry-date" placeholder="MM/YY" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cvv">CVV</Label>
                                <Input id="cvv" name="cvv" placeholder="123" required />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)} type="button">Cancel</Button>
                        <Button type="submit" disabled={loading}>
                             {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Add Card
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
