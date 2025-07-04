import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

export default function TradingPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Trading</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Trading Platform</CardTitle>
                    <CardDescription>Manage your investments and trade assets.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Trading platform interface will be displayed here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
