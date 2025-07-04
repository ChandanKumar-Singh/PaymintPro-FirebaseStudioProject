import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

export default function AdvisorPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">AI Financial Advisor</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Get Personalized Advice</CardTitle>
                    <CardDescription>Our AI assistant is here to help you with your financial goals.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>The AI Financial Advisor interface will be available here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
