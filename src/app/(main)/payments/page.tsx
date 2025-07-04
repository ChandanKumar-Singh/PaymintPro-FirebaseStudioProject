import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

export default function PaymentsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Manage Payments</CardTitle>
                    <CardDescription>Schedule and manage your bill payments.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Payment features will be available here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
