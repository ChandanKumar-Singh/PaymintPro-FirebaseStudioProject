'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const regions = ['All region', 'Asia', 'Europe', 'Americas', 'Africa', 'Oceania'];

const countriesByRegion = {
    Europe: [
        { name: 'Austria', flag: 'https://placehold.co/40x40.png', dataAiHint: 'austria flag' },
        { name: 'Belgium', flag: 'https://placehold.co/40x40.png', dataAiHint: 'belgium flag' },
        { name: 'Croatia', flag: 'https://placehold.co/40x40.png', dataAiHint: 'croatia flag' },
        { name: 'Czech Republic', flag: 'https://placehold.co/40x40.png', dataAiHint: 'czech republic flag' },
        { name: 'Denmark', flag: 'https://placehold.co/40x40.png', dataAiHint: 'denmark flag' },
        { name: 'Finland', flag: 'https://placehold.co/40x40.png', dataAiHint: 'finland flag' },
        { name: 'France', flag: 'https://placehold.co/40x40.png', dataAiHint: 'france flag' },
        { name: 'Germany', flag: 'https://placehold.co/40x40.png', dataAiHint: 'germany flag' },
    ],
    // In a real application, you would populate the other regions as well.
    'All region': [],
    Asia: [],
    Americas: [],
    Africa: [],
    Oceania: [],
};

export function CountryCoverage() {
    const [activeRegion, setActiveRegion] = useState('Europe');
    
    // Fallback to Europe if the selected region has no countries
    const countriesToShow = countriesByRegion[activeRegion as keyof typeof countriesByRegion]?.length > 0 
        ? countriesByRegion[activeRegion as keyof typeof countriesByRegion]
        : countriesByRegion['Europe'];

    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="container mx-auto px-4">
                <div className="rounded-2xl border-2 border-dashed border-blue-300 bg-[#F9FAFB] p-8">
                    {/* Top Section */}
                    <div className="mb-8">
                        <div className="inline-block bg-[#E7FAD1] text-[#052011] font-bold py-1 px-3  text-sm mb-4">
                            Country coverage
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] mb-6 tracking-tight">
                            Send money to 150+ countries with Paymint
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {regions.map((region) => (
                                <Button
                                    key={region}
                                    onClick={() => setActiveRegion(region)}
                                    variant="outline"
                                    className={cn(
                                        "rounded-full px-5 py-2 text-base font-medium border-gray-300 h-auto",
                                        activeRegion === region
                                            ? 'bg-[#B2F35F] text-[#052011] border-transparent hover:bg-[#B2F35F]/90'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                    )}
                                >
                                    {region}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="pt-8 border-t-2 border-dashed border-blue-300 grid lg:grid-cols-2 gap-8 items-start">
                        {/* Left Column: Country List */}
                        <div className="lg:pr-8 flex flex-col h-full">
                            <div className="grid grid-cols-2 gap-y-8 flex-grow">
                                {countriesToShow.map((country) => (
                                    <div key={country.name} className="flex flex-col items-center text-center">
                                        <Image
                                            src={country.flag}
                                            data-ai-hint={country.dataAiHint}
                                            alt={country.name}
                                            width={40}
                                            height={40}
                                            className="rounded-full mb-2"
                                        />
                                        <span className="font-medium text-gray-800">{country.name}</span>
                                    </div>
                                ))}
                            </div>
                             <div className="mt-12">
                                <Button asChild variant="link" className="p-0 text-[#052011] font-bold text-base hover:no-underline">
                                    <Link href="/multicurrency-coverage">
                                        See full list of coverage <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                 </Button>
                            </div>
                        </div>

                        {/* Right Column: Map */}
                        <div className="relative lg:pl-8 hidden lg:block">
                             <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200">
                                 <div className="h-16 bg-[#052011]"></div>
                             </div>
                            <Image
                                src="https://placehold.co/600x450.png"
                                data-ai-hint="world map graphic europe"
                                alt="World Map with Europe highlighted"
                                width={600}
                                height={450}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
