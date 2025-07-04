import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Application Settings</CardTitle>
                    <CardDescription>Manage your account and application preferences.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Settings options will be available here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
