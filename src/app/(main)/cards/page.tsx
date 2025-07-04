import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

export default function CardsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Cards</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Manage Your Cards</CardTitle>
                    <CardDescription>View and manage your physical and virtual cards.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card management interface will be displayed here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
