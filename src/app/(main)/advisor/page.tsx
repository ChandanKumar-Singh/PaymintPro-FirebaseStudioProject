'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AdvisorPage() {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // This is a placeholder for a real AI interaction.
        // In a real app, you would call your Genkit flow here.
        setIsLoading(true);
        setError('');
        setResponse('');
        
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
        
        if (query.toLowerCase().includes('error')) {
            setError('This is a simulated error. Please try a different query.');
        } else {
            setResponse(`Based on your question about "${query}", here is some personalized financial advice... (This is a placeholder response)`);
        }
        
        setIsLoading(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Sparkles className="h-8 w-8 text-primary" />
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">AI Financial Advisor</h1>
                    <p className="text-muted-foreground">Get personalized financial insights and advice.</p>
                </div>
            </div>
            <Card>
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Ask a question</CardTitle>
                        <CardDescription>What would you like to know? Ask about your spending, investment opportunities, or saving strategies.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea 
                            placeholder="e.g., Can you analyze my spending last month and suggest where I can save?"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            rows={4}
                        />
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button type="submit" disabled={isLoading || !query}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isLoading ? 'Thinking...' : 'Get Advice'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            {error && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {response && (
                <Card>
                    <CardHeader>
                        <CardTitle>Your Personalized Advice</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="whitespace-pre-wrap">{response}</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
