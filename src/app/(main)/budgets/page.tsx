import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

export default function BudgetsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Budgets</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Budgeting Tools</CardTitle>
                    <CardDescription>Create and track your budgets.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Budgeting tools will be available here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
