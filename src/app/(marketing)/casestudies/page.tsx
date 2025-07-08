
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { FinalCTA } from '@/components/landing/FinalCTA';

const caseStudies = [
  {
    logo: 'https://placehold.co/100x40.png', dataAiHint: 'uber logo',
    title: 'Uber optimises the driver experience using Paymint as their main payment.',
    category: 'Ride Sharing',
    image: 'https://placehold.co/400x300.png', dataAiHint: 'man driving car'
  },
  {
    logo: 'https://placehold.co/100x40.png', dataAiHint: 'asana logo',
    title: 'Asana choose Paymint to power paid subscriptions globally.',
    category: 'SaaS',
    image: 'https://placehold.co/400x300.png', dataAiHint: 'project management board'
  },
  {
    logo: 'https://placehold.co/100x40.png', dataAiHint: 'electrolux logo',
    title: 'Electrolux select Paymint to create a single partner for global billing.',
    category: 'Manufacturing',
    image: 'https://placehold.co/400x300.png', dataAiHint: 'factory robots'
  },
  {
    logo: 'https://placehold.co/100x40.png', dataAiHint: 'webuth logo',
    title: 'Webuth sees an 8% increase in authorization rates with Paymint.',
    category: 'E-commerce',
    image: 'https://placehold.co/400x300.png', dataAiHint: 'online shopping'
  },
  {
    logo: 'https://placehold.co/100x40.png', dataAiHint: 'ebay logo',
    title: 'Ebay improves auth and preventing fraud with Paymint.',
    category: 'Marketplace',
    image: 'https://placehold.co/400x300.png', dataAiHint: 'payment security'
  },
  {
    logo: 'https://placehold.co/100x40.png', dataAiHint: 'subway logo',
    title: 'Subway expands its franchise payments with Paymint.',
    category: 'Food & Beverage',
    image: 'https://placehold.co/400x300.png', dataAiHint: 'fast food restaurant'
  },
];

const categories = ['All', 'SaaS', 'E-commerce', 'Marketplace', 'Ride Sharing', 'Food & Beverage'];

const Pagination = () => (
    <div className="flex justify-between items-center mt-12">
        <Button variant="outline" className="rounded-md hidden sm:flex bg-white text-[#052011] border-gray-300 hover:bg-gray-100">
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" className="h-10 w-10 bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90">1</Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 text-[#052011] hover:bg-gray-200">2</Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 text-[#052011] hover:bg-gray-200">3</Button>
        </div>
        <Button variant="outline" className="bg-white text-[#052011] border-gray-300 hover:bg-gray-100">
            Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
    </div>
);

export default function CaseStudiesPage() {
    return (
        <main className="bg-white text-[#052011]">
            <section className="py-20 sm:py-28 text-center bg-gray-50">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">Customer Stories</h1>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600">
                        See how the world's leading companies use Paymint to simplify their global payments.
                    </p>
                </div>
            </section>
            
            <section className="py-12 sm:py-20">
                <div className="container mx-auto px-4">
                     <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {categories.map((cat, index) => (
                            <Button key={cat} variant={index === 0 ? "default" : "outline"} className={index === 0 ? "bg-[#052011] text-white hover:bg-gray-800" : " border-gray-300 text-[#052011] bg-white hover:bg-gray-100"}>
                                {cat}
                            </Button>
                        ))}
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {caseStudies.map((story, index) => (
                            <Link href="#" key={index} className="group">
                                <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 border-gray-200 h-full flex flex-col">
                                    <CardContent className="p-0 flex-grow flex flex-col">
                                        <Image
                                            src={story.image} alt={story.title} width={400} height={300}
                                            data-ai-hint={story.dataAiHint} className="w-full h-auto aspect-[4/3] object-cover"
                                        />
                                        <div className="p-6 flex-grow flex flex-col">
                                            <Image src={story.logo} alt="" width={80} height={32} data-ai-hint={story.dataAiHint} className="mb-4" />
                                            <h3 className="text-xl font-bold mb-3 flex-grow">{story.title}</h3>
                                            <div className="flex justify-between items-center text-sm mt-auto">
                                                <p className="text-lime-600 font-bold">Read story <ArrowRight className="inline-block h-4 w-4" /></p>
                                                <p className="text-gray-500">{story.category}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                    <Pagination />
                </div>
            </section>

            <FinalCTA />
        </main>
    );
}
