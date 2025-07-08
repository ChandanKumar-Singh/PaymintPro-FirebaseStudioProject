
'use client';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';

const countries = [
    { name: 'France', flag: 'https://placehold.co/24x24.png', dataAiHint: 'france flag' },
    { name: 'Italy', flag: 'https://placehold.co/24x24.png', dataAiHint: 'italy flag' },
    { name: 'Spain', flag: 'https://placehold.co/24x24.png', dataAiHint: 'spain flag' },
    { name: 'China', flag: 'https://placehold.co/24x24.png', dataAiHint: 'china flag' },
    { name: 'Mexico', flag: 'https://placehold.co/24x24.png', dataAiHint: 'mexico flag' },
    { name: 'Austria', flag: 'https://placehold.co/24x24.png', dataAiHint: 'austria flag' },
    { name: 'Belgium', flag: 'https://placehold.co/24x24.png', dataAiHint: 'belgium flag' },
    { name: 'Croatia', flag: 'https://placehold.co/24x24.png', dataAiHint: 'croatia flag' },
    { name: 'Finland', flag: 'https://placehold.co/24x24.png', dataAiHint: 'finland flag' },
    { name: 'Denmark', flag: 'https://placehold.co/24x24.png', dataAiHint: 'denmark flag' },
    { name: 'France', flag: 'https://placehold.co/24x24.png', dataAiHint: 'france flag' },
    { name: 'Germany', flag: 'https://placehold.co/24x24.png', dataAiHint: 'germany flag' },
];

export function CountryCoverage() {
    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="container mx-auto px-4">
                <p className="text-center font-bold text-[#052011]/60 mb-2">GLOBAL COVERAGE</p>
                <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] text-center mb-12 tracking-tight">
                    Send money to 150+ countries with Paymint
                </h2>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                        {countries.map((country, index) => (
                             <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
                                <Image src={country.flag} data-ai-hint={country.dataAiHint} alt={country.name} width={24} height={24} className="rounded-full" />
                                <span className="font-medium text-gray-700">{country.name}</span>
                             </div>
                        ))}
                         <div className="flex items-center col-span-full justify-center mt-4">
                             <Button asChild variant="link" className="text-[#052011] font-bold">
                                <Link href="/multicurrency-coverage">See all 150+ countries</Link>
                             </Button>
                         </div>
                    </div>
                    <div className="flex justify-center">
                       <Link href="/multicurrency-coverage">
                         <Image src="https://placehold.co/600x400.png" data-ai-hint="world map graphic" alt="World Map" width={600} height={400} />
                       </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
