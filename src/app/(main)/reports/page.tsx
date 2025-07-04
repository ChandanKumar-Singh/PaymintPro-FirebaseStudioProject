import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Financial Reports</CardTitle>
                    <CardDescription>Analyze your finances with detailed reports.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Financial reports and analysis will be displayed here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
