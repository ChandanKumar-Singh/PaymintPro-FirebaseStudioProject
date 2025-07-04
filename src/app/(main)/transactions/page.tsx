import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

export default function TransactionsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Transactions</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>A detailed list of all your transactions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Transaction history will be displayed here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
