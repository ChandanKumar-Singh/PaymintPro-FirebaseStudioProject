import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Reports</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Spending Analysis</CardTitle>
                    <CardDescription>Analyze your spending habits with detailed reports.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Financial reports and spending analysis will be displayed here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
