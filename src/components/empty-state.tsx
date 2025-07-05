'use client';
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    actionButton?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, actionButton }: EmptyStateProps) {
    return (
        <Card className="flex items-center justify-center p-12">
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="p-3 bg-muted rounded-full">
                    <Icon className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <p className="text-muted-foreground max-w-sm">{description}</p>
                </div>
                {actionButton}
            </div>
        </Card>
    )
}
