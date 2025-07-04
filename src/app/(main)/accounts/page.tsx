import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

export default function AccountsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Manage Accounts</CardTitle>
                    <CardDescription>View and manage your connected bank accounts.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Accounts management interface will be displayed here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
