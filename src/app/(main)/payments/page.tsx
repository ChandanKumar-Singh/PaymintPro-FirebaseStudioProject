import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

export default function PaymentsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Payments</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Bill Payments</CardTitle>
                    <CardDescription>Schedule and manage your bill payments.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Bill payment features will be available here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
