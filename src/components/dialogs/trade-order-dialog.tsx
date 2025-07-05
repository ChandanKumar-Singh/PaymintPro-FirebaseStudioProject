'use client';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface TradeOrderDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    tradeDetails: {
        action: 'Buy' | 'Sell';
        symbol: string;
        shares: number;
        price: number;
    },
    onConfirm: () => Promise<void>;
}

export function TradeOrderDialog({ open, onOpenChange, tradeDetails, onConfirm }: TradeOrderDialogProps) {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleConfirmTrade = async () => {
        setLoading(true);
        try {
            await onConfirm();
            toast({
                title: `Trade Executed`,
                description: `Successfully ${tradeDetails.action === 'Buy' ? 'bought' : 'sold'} ${tradeDetails.shares} shares of ${tradeDetails.symbol}.`,
            });
            onOpenChange(false);
        } catch(error) {
             toast({ title: "Error", description: "Trade could not be executed.", variant: 'destructive'});
        } finally {
            setLoading(false);
        }
    }
    
    const estimatedValue = tradeDetails.shares * tradeDetails.price;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Confirm Trade Order</DialogTitle>
                    <DialogDescription>
                        Please review your trade order before confirming.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Action</span>
                        <span className={`font-medium ${tradeDetails.action === 'Buy' ? 'text-green-600' : 'text-red-600'}`}>{tradeDetails.action}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Symbol</span>
                        <span className="font-medium">{tradeDetails.symbol}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Shares</span>
                        <span className="font-medium">{tradeDetails.shares}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Market Price</span>
                        <span className="font-medium">~{tradeDetails.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                    </div>
                     <div className="flex justify-between items-center border-t pt-4 mt-2">
                        <span className="font-bold">Estimated {tradeDetails.action === 'Buy' ? 'Cost' : 'Credit'}</span>
                        <span className="font-bold">{estimatedValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button 
                        onClick={handleConfirmTrade} 
                        className={tradeDetails.action === 'Sell' ? 'bg-destructive hover:bg-destructive/90' : ''}
                        disabled={loading}
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Confirm {tradeDetails.action}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
