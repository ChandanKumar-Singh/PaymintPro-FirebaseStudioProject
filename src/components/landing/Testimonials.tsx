
'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function Testimonials() {
    const testimonials = [
        { name: 'John Stones', title: 'CEO, Uber', text: "Uber systemizes the driver experience with Paymint, so we can focus on our core business.", image: 'https://placehold.co/350x250.png', dataAiHint: 'man professional portrait' },
        { name: 'Bernardo Silva', title: 'CFO, Webuth', text: "Webuth.com.au BSL increase in authorization rates with Paymint.", image: 'https://placehold.co/350x250.png', dataAiHint: 'man smiling portrait' },
        { name: 'Ruben Dias', title: 'PM, Asana', text: "Asana chose Paymint to subscribe globally.", image: 'https://placehold.co/350x250.png', dataAiHint: 'woman portrait professional' },
    ];
    return (
        <section className="bg-white pb-20 sm:pb-28">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <p className="font-bold text-muted-foreground mb-2">TESTIMONIAL</p>
                        <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">Customer success is our success</h2>
                    </div>
                    <div className="hidden md:flex gap-4">
                        <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <Button variant="secondary" size="icon" className="rounded-full h-12 w-12 bg-secondary text-secondary-foreground hover:bg-secondary/80">
                            <ArrowRight className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <div className="grid lg:grid-cols-3 gap-8">
                    {testimonials.map(t => (
                        <Card key={t.name} className="bg-accent border-none rounded-2xl overflow-hidden">
                            <CardContent className="p-0">
                                <Image src={t.image} alt={t.name} width={350} height={250} className="w-full" data-ai-hint={t.dataAiHint} />
                                <div className="p-6">
                                    <p className="text-lg font-medium text-accent-foreground mb-4">"{t.text}"</p>
                                    <h4 className="font-bold text-lg text-foreground">{t.name}</h4>
                                    <p className="text-sm text-muted-foreground">{t.title}</p>
                                    <Button asChild variant="link" className="p-0 h-auto mt-4 text-foreground font-bold">
                                      <Link href="#">Read story</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
