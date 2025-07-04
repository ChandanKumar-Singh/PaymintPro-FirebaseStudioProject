'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
    { name: 'Starter', price: '$0', features: ['Basic Analytics', '5 Invoices/mo', 'Basic Support'] },
    { name: 'Pro', price: '$20', features: ['Advanced Analytics', 'Unlimited Invoices', 'Priority Support', 'AI Advisor'], current: true },
    { name: 'Enterprise', price: 'Custom', features: ['Custom Features', 'Dedicated Support', 'SSO & Audit Logs'] },
];

export function ChangePlanDialog({ children }: { children?: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    const handleChangePlan = () => {
        toast({
            title: "Plan Changed",
            description: "Your subscription plan has been updated.",
        });
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || <Button variant="outline">Change Plan</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Change Subscription Plan</DialogTitle>
                    <DialogDescription>
                        Choose the plan that best fits your needs.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4 md:grid-cols-3">
                    {plans.map(plan => (
                        <Card key={plan.name} className={plan.current ? "border-primary" : ""}>
                            <CardHeader>
                                <CardTitle>{plan.name}</CardTitle>
                                <CardDescription className="text-2xl font-bold">{plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ul className="space-y-2 text-sm">
                                    {plan.features.map(feature => (
                                        <li key={feature} className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button className="w-full" disabled={plan.current} onClick={handleChangePlan}>
                                    {plan.current ? "Current Plan" : "Choose Plan"}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}
