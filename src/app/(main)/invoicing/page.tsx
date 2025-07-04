import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

export default function InvoicingPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Invoicing</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Manage Invoices</CardTitle>
                    <CardDescription>Create, send, and track your invoices.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Invoicing features will be available here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
