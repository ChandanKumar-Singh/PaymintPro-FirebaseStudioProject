
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Book, Code, Terminal, LifeBuoy, Check } from 'lucide-react';
import { FinalCTA } from '@/components/landing/FinalCTA';

const resources = [
  {
    icon: Book,
    title: 'Documentation',
    description: 'Explore our comprehensive API documentation with examples for every endpoint.',
    href: '#'
  },
  {
    icon: Code,
    title: 'API Reference',
    description: 'Detailed information on all our API endpoints, parameters, and responses.',
    href: '#'
  },
  {
    icon: Terminal,
    title: 'SDKs & Libraries',
    description: 'Integrate faster with our official libraries for your favorite languages.',
    href: '#'
  },
  {
    icon: LifeBuoy,
    title: 'Developer Support',
    description: 'Get help from our expert support team when you need it.',
    href: '#'
  }
];

export default function DevelopersPage() {
    return (
        <main className="bg-background text-foreground">
            <section className="bg-sidebar text-sidebar-foreground pt-32 pb-20 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="inline-block bg-primary/10 text-primary font-bold py-1 px-3 rounded-full text-sm mb-4">
                        DEVELOPER PLATFORM
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight max-w-4xl mx-auto">
                        Build the future of finance with Paymint APIs
                    </h1>
                    <p className="text-lg text-sidebar-foreground/80 mb-10 max-w-2xl mx-auto">
                        Access our powerful, reliable, and secure APIs to create innovative financial products and services.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-5 text-base font-bold">
                            <Link href="#">Get API Keys</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="text-sidebar-foreground border-sidebar-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-md px-6 py-5 text-base font-bold">
                            <Link href="/contact">Contact Sales</Link>
                        </Button>
                    </div>
                </div>
            </section>
            
            <section className="py-20 sm:py-28">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-foreground mb-4 tracking-tight">Everything you need to build</h2>
                        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                            Our platform provides all the tools and resources you need to integrate payments, manage accounts, and build amazing financial experiences.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {resources.map((resource, index) => (
                             <Card key={index} className="bg-secondary/50 hover:bg-card hover:shadow-lg transition-all duration-300 rounded-xl">
                                <CardContent className="p-6">
                                    <div className="bg-accent p-3 rounded-full inline-block mb-4">
                                        <resource.icon className="h-7 w-7 text-foreground" />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">{resource.title}</h3>
                                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                                    <Button asChild variant="link" className="p-0 text-primary font-bold">
                                        <Link href={resource.href}>Explore <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

             <section className="bg-secondary/50 py-20 sm:py-28">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="pr-8">
                            <h2 className="text-4xl font-bold text-foreground mb-4 tracking-tight">Global Payments Engine</h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                Our API gives you access to a global payments network. Process payments in multiple currencies, manage payouts, and scale your business internationally.
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary"/> Multi-currency payment processing</li>
                                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary"/> Automated payouts and mass payments</li>
                                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary"/> Secure and compliant infrastructure</li>
                            </ul>
                            <Button asChild variant="link" className="p-0 text-primary font-bold text-lg">
                                <Link href="#">View Documentation <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>
                        </div>
                         <div className="bg-card text-card-foreground p-2 rounded-xl shadow-2xl border">
                            <div className="bg-muted p-4 rounded-t-lg">
                               <pre className="text-xs text-muted-foreground overflow-x-auto"><code className="language-json">
{`{
  "amount": 1000,
  "currency": "USD",
  "source": "tok_visa",
  "destination": "acct_123456789",
  "description": "API Payment"
}`}
                                </code></pre>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FinalCTA />
        </main>
    );
}
