'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { useAuth } from "../auth-provider";
import { updateDocument } from "@/lib/data";
import type { Subscription } from "@/lib/data";

const plans: { name: Subscription['plan'], price: string, features: string[] }[] = [
    { name: 'Starter', price: '$0', features: ['Basic Analytics', '5 Invoices/mo', 'Basic Support'] },
    { name: 'Pro', price: '$20', features: ['Advanced Analytics', 'Unlimited Invoices', 'Priority Support', 'AI Advisor'] },
    { name: 'Enterprise', price: 'Custom', features: ['Custom Features', 'Dedicated Support', 'SSO & Audit Logs'] },
];

interface ChangePlanDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentPlan?: Subscription['plan'];
    onSuccess?: () => void;
}

export function ChangePlanDialog({ open, onOpenChange, currentPlan, onSuccess }: ChangePlanDialogProps) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleChangePlan = async (newPlan: Subscription['plan']) => {
        if (!user) {
            toast({ title: "Not Authenticated", description: "You must be logged in to change your plan.", variant: 'destructive'});
            return;
        }
        setLoading(true);
        try {
            await updateDocument(user.uid, 'users', user.uid, {
                subscription: { plan: newPlan, status: 'active' }
            });

            toast({
                title: "Plan Changed",
                description: `Your subscription plan has been updated to ${newPlan}.`,
            });
            onSuccess?.();
        } catch (error) {
            toast({ title: "Error", description: "Could not update your plan.", variant: 'destructive'});
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Change Subscription Plan</DialogTitle>
                    <DialogDescription>
                        Choose the plan that best fits your needs.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4 md:grid-cols-3">
                    {plans.map(plan => (
                        <Card key={plan.name} className={plan.name === currentPlan ? "border-primary" : ""}>
                            <CardHeader>
                                <CardTitle>{plan.name}</CardTitle>
                                <CardDescription className="text-2xl font-bold">{plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col flex-1">
                                <ul className="space-y-2 text-sm flex-1">
                                    {plan.features.map(feature => (
                                        <li key={feature} className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button 
                                    className="w-full mt-6" 
                                    disabled={plan.name === currentPlan || loading}
                                    onClick={() => handleChangePlan(plan.name)}
                                >
                                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {plan.name === currentPlan ? "Current Plan" : "Choose Plan"}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}
