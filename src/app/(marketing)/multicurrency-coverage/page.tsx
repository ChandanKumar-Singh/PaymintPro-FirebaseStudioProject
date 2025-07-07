
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Wifi, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FinalCTA } from '@/components/landing/FinalCTA';

const countries = {
    Europe: [
        { name: 'Albania', flag: 'https://placehold.co/24x24.png', dataAiHint: 'albania flag' },
        { name: 'Andorra', flag: 'https://placehold.co/24x24.png', dataAiHint: 'andorra flag' },
        { name: 'Austria', flag: 'https://placehold.co/24x24.png', dataAiHint: 'austria flag' },
        { name: 'Belgium', flag: 'https://placehold.co/24x24.png', dataAiHint: 'belgium flag' },
        { name: 'Bosnia & Herzegovina', flag: 'https://placehold.co/24x24.png', dataAiHint: 'bosnia flag' },
        { name: 'Bulgaria', flag: 'https://placehold.co/24x24.png', dataAiHint: 'bulgaria flag' },
        { name: 'Croatia', flag: 'https://placehold.co/24x24.png', dataAiHint: 'croatia flag' },
        { name: 'Cyprus', flag: 'https://placehold.co/24x24.png', dataAiHint: 'cyprus flag' },
        { name: 'Czechia', flag: 'https://placehold.co/24x24.png', dataAiHint: 'czechia flag' },
        { name: 'Denmark', flag: 'https://placehold.co/24x24.png', dataAiHint: 'denmark flag' },
        { name: 'Estonia', flag: 'https://placehold.co/24x24.png', dataAiHint: 'estonia flag' },
        { name: 'Finland', flag: 'https://placehold.co/24x24.png', dataAiHint: 'finland flag' },
        { name: 'France', flag: 'https://placehold.co/24x24.png', dataAiHint: 'france flag' },
        { name: 'Georgia', flag: 'https://placehold.co/24x24.png', dataAiHint: 'georgia flag' },
        { name: 'Germany', flag: 'https://placehold.co/24x24.png', dataAiHint: 'germany flag' },
        { name: 'Greece', flag: 'https://placehold.co/24x24.png', dataAiHint: 'greece flag' },
        { name: 'Hungary', flag: 'https://placehold.co/24x24.png', dataAiHint: 'hungary flag' },
        { name: 'Iceland', flag: 'https://placehold.co/24x24.png', dataAiHint: 'iceland flag' },
        { name: 'Ireland', flag: 'https://placehold.co/24x24.png', dataAiHint: 'ireland flag' },
        { name: 'Italy', flag: 'https://placehold.co/24x24.png', dataAiHint: 'italy flag' },
        { name: 'Latvia', flag: 'https://placehold.co/24x24.png', dataAiHint: 'latvia flag' },
        { name: 'Liechtenstein', flag: 'https://placehold.co/24x24.png', dataAiHint: 'liechtenstein flag' },
        { name: 'Lithuania', flag: 'https://placehold.co/24x24.png', dataAiHint: 'lithuania flag' },
        { name: 'Luxembourg', flag: 'https://placehold.co/24x24.png', dataAiHint: 'luxembourg flag' },
        { name: 'Malta', flag: 'https://placehold.co/24x24.png', dataAiHint: 'malta flag' },
        { name: 'Monaco', flag: 'https://placehold.co/24x24.png', dataAiHint: 'monaco flag' },
        { name: 'Montenegro', flag: 'https://placehold.co/24x24.png', dataAiHint: 'montenegro flag' },
        { name: 'Netherlands', flag: 'https://placehold.co/24x24.png', dataAiHint: 'netherlands flag' },
        { name: 'North Macedonia', flag: 'https://placehold.co/24x24.png', dataAiHint: 'macedonia flag' },
        { name: 'Norway', flag: 'https://placehold.co/24x24.png', dataAiHint: 'norway flag' },
        { name: 'Poland', flag: 'https://placehold.co/24x24.png', dataAiHint: 'poland flag' },
        { name: 'Portugal', flag: 'https://placehold.co/24x24.png', dataAiHint: 'portugal flag' },
        { name: 'Romania', flag: 'https://placehold.co/24x24.png', dataAiHint: 'romania flag' },
        { name: 'San Marino', flag: 'https://placehold.co/24x24.png', dataAiHint: 'san marino flag' },
        { name: 'Serbia', flag: 'https://placehold.co/24x24.png', dataAiHint: 'serbia flag' },
        { name: 'Slovakia', flag: 'https://placehold.co/24x24.png', dataAiHint: 'slovakia flag' },
        { name: 'Slovenia', flag: 'https://placehold.co/24x24.png', dataAiHint: 'slovenia flag' },
        { name: 'Spain', flag: 'https://placehold.co/24x24.png', dataAiHint: 'spain flag' },
        { name: 'Sweden', flag: 'https://placehold.co/24x24.png', dataAiHint: 'sweden flag' },
        { name: 'Switzerland', flag: 'https://placehold.co/24x24.png', dataAiHint: 'switzerland flag' },
        { name: 'Ukraine', flag: 'https://placehold.co/24x24.png', dataAiHint: 'ukraine flag' },
        { name: 'United Kingdom', flag: 'https://placehold.co/24x24.png', dataAiHint: 'uk flag' },
        { name: 'Vatican City', flag: 'https://placehold.co/24x24.png', dataAiHint: 'vatican flag' },
    ],
    Americas: [
        { name: 'Argentina', flag: 'https://placehold.co/24x24.png', dataAiHint: 'argentina flag' },
        { name: 'Bolivia', flag: 'https://placehold.co/24x24.png', dataAiHint: 'bolivia flag' },
        { name: 'Brazil', flag: 'https://placehold.co/24x24.png', dataAiHint: 'brazil flag' },
        { name: 'Canada', flag: 'https://placehold.co/24x24.png', dataAiHint: 'canada flag' },
        { name: 'Chile', flag: 'https://placehold.co/24x24.png', dataAiHint: 'chile flag' },
        { name: 'Colombia', flag: 'https://placehold.co/24x24.png', dataAiHint: 'colombia flag' },
        { name: 'Costa Rica', flag: 'https://placehold.co/24x24.png', dataAiHint: 'costa rica flag' },
        { name: 'Ecuador', flag: 'https://placehold.co/24x24.png', dataAiHint: 'ecuador flag' },
        { name: 'El Salvador', flag: 'https://placehold.co/24x24.png', dataAiHint: 'el salvador flag' },
        { name: 'Grenada', flag: 'https://placehold.co/24x24.png', dataAiHint: 'grenada flag' },
        { name: 'Honduras', flag: 'https://placehold.co/24x24.png', dataAiHint: 'honduras flag' },
        { name: 'Jamaica', flag: 'https://placehold.co/24x24.png', dataAiHint: 'jamaica flag' },
        { name: 'Mexico', flag: 'https://placehold.co/24x24.png', dataAiHint: 'mexico flag' },
        { name: 'Nicaragua', flag: 'https://placehold.co/24x24.png', dataAiHint: 'nicaragua flag' },
        { name: 'Paraguay', flag: 'https://placehold.co/24x24.png', dataAiHint: 'paraguay flag' },
        { name: 'Peru', flag: 'https://placehold.co/24x24.png', dataAiHint: 'peru flag' },
        { name: 'Puerto Rico', flag: 'https://placehold.co/24x24.png', dataAiHint: 'puerto rico flag' },
        { name: 'Suriname', flag: 'https://placehold.co/24x24.png', dataAiHint: 'suriname flag' },
        { name: 'United States', flag: 'https://placehold.co/24x24.png', dataAiHint: 'usa flag' },
        { name: 'Uruguay', flag: 'https://placehold.co/24x24.png', dataAiHint: 'uruguay flag' },
    ],
    Asia: [
        { name: 'Armenia', flag: 'https://placehold.co/24x24.png', dataAiHint: 'armenia flag' },
        { name: 'Azerbaijan', flag: 'https://placehold.co/24x24.png', dataAiHint: 'azerbaijan flag' },
        { name: 'Bahrain', flag: 'https://placehold.co/24x24.png', dataAiHint: 'bahrain flag' },
        { name: 'Bangladesh', flag: 'https://placehold.co/24x24.png', dataAiHint: 'bangladesh flag' },
        { name: 'Bhutan', flag: 'https://placehold.co/24x24.png', dataAiHint: 'bhutan flag' },
        { name: 'Brunei', flag: 'https://placehold.co/24x24.png', dataAiHint: 'brunei flag' },
        { name: 'Cambodia', flag: 'https://placehold.co/24x24.png', dataAiHint: 'cambodia flag' },
        { name: 'China', flag: 'https://placehold.co/24x24.png', dataAiHint: 'china flag' },
        { name: 'Hong Kong', flag: 'https://placehold.co/24x24.png', dataAiHint: 'hong kong flag' },
        { name: 'India', flag: 'https://placehold.co/24x24.png', dataAiHint: 'india flag' },
        { name: 'Indonesia', flag: 'https://placehold.co/24x24.png', dataAiHint: 'indonesia flag' },
        { name: 'Israel', flag: 'https://placehold.co/24x24.png', dataAiHint: 'israel flag' },
        { name: 'Japan', flag: 'https://placehold.co/24x24.png', dataAiHint: 'japan flag' },
        { name: 'Jordan', flag: 'https://placehold.co/24x24.png', dataAiHint: 'jordan flag' },
        { name: 'Kazakhstan', flag: 'https://placehold.co/24x24.png', dataAiHint: 'kazakhstan flag' },
        { name: 'Kuwait', flag: 'https://placehold.co/24x24.png', dataAiHint: 'kuwait flag' },
        { name: 'Kyrgyzstan', flag: 'https://placehold.co/24x24.png', dataAiHint: 'kyrgyzstan flag' },
        { name: 'Laos', flag: 'https://placehold.co/24x24.png', dataAiHint: 'laos flag' },
        { name: 'Malaysia', flag: 'https://placehold.co/24x24.png', dataAiHint: 'malaysia flag' },
        { name: 'Maldives', flag: 'https://placehold.co/24x24.png', dataAiHint: 'maldives flag' },
        { name: 'Mongolia', flag: 'https://placehold.co/24x24.png', dataAiHint: 'mongolia flag' },
        { name: 'Myanmar', flag: 'https://placehold.co/24x24.png', dataAiHint: 'myanmar flag' },
        { name: 'Nepal', flag: 'https://placehold.co/24x24.png', dataAiHint: 'nepal flag' },
        { name: 'Oman', flag: 'https://placehold.co/24x24.png', dataAiHint: 'oman flag' },
        { name: 'Philippines', flag: 'https://placehold.co/24x24.png', dataAiHint: 'philippines flag' },
        { name: 'Qatar', flag: 'https://placehold.co/24x24.png', dataAiHint: 'qatar flag' },
        { name: 'Saudi Arabia', flag: 'https://placehold.co/24x24.png', dataAiHint: 'saudi arabia flag' },
        { name: 'Singapore', flag: 'https://placehold.co/24x24.png', dataAiHint: 'singapore flag' },
        { name: 'South Korea', flag: 'https://placehold.co/24x24.png', dataAiHint: 'south korea flag' },
        { name: 'Sri Lanka', flag: 'https://placehold.co/24x24.png', dataAiHint: 'sri lanka flag' },
        { name: 'Taiwan', flag: 'https://placehold.co/24x24.png', dataAiHint: 'taiwan flag' },
        { name: 'Thailand', flag: 'https://placehold.co/24x24.png', dataAiHint: 'thailand flag' },
        { name: 'Turkey', flag: 'https://placehold.co/24x24.png', dataAiHint: 'turkey flag' },
        { name: 'Turkmenistan', flag: 'https://placehold.co/24x24.png', dataAiHint: 'turkmenistan flag' },
        { name: 'United Arab Emirates', flag: 'https://placehold.co/24x24.png', dataAiHint: 'uae flag' },
        { name: 'Uzbekistan', flag: 'https://placehold.co/24x24.png', dataAiHint: 'uzbekistan flag' },
        { name: 'Vietnam', flag: 'https://placehold.co/24x24.png', dataAiHint: 'vietnam flag' },
    ],
    Africa: [
        { name: 'Algeria', flag: 'https://placehold.co/24x24.png', dataAiHint: 'algeria flag' },
        { name: 'Benin', flag: 'https://placehold.co/24x24.png', dataAiHint: 'benin flag' },
        { name: 'Botswana', flag: 'https://placehold.co/24x24.png', dataAiHint: 'botswana flag' },
        { name: 'Cameroon', flag: 'https://placehold.co/24x24.png', dataAiHint: 'cameroon flag' },
        { name: 'Cape Verde', flag: 'https://placehold.co/24x24.png', dataAiHint: 'cape verde flag' },
        { name: 'Comoros', flag: 'https://placehold.co/24x24.png', dataAiHint: 'comoros flag' },
        { name: 'Djibouti', flag: 'https://placehold.co/24x24.png', dataAiHint: 'djibouti flag' },
        { name: 'Egypt', flag: 'https://placehold.co/24x24.png', dataAiHint: 'egypt flag' },
        { name: 'Equatorial Guinea', flag: 'https://placehold.co/24x24.png', dataAiHint: 'equatorial guinea flag' },
        { name: 'Gabon', flag: 'https://placehold.co/24x24.png', dataAiHint: 'gabon flag' },
        { name: 'Gambia', flag: 'https://placehold.co/24x24.png', dataAiHint: 'gambia flag' },
        { name: 'Ghana', flag: 'https://placehold.co/24x24.png', dataAiHint: 'ghana flag' },
        { name: 'Kenya', flag: 'https://placehold.co/24x24.png', dataAiHint: 'kenya flag' },
        { name: 'Lesotho', flag: 'https://placehold.co/24x24.png', dataAiHint: 'lesotho flag' },
        { name: 'Madagascar', flag: 'https://placehold.co/24x24.png', dataAiHint: 'madagascar flag' },
        { name: 'Malawi', flag: 'https://placehold.co/24x24.png', dataAiHint: 'malawi flag' },
        { name: 'Mali', flag: 'https://placehold.co/24x24.png', dataAiHint: 'mali flag' },
        { name: 'Mauritius', flag: 'https://placehold.co/24x24.png', dataAiHint: 'mauritius flag' },
        { name: 'Morocco', flag: 'https://placehold.co/24x24.png', dataAiHint: 'morocco flag' },
        { name: 'Mozambique', flag: 'https://placehold.co/24x24.png', dataAiHint: 'mozambique flag' },
        { name: 'Namibia', flag: 'https://placehold.co/24x24.png', dataAiHint: 'namibia flag' },
        { name: 'Niger', flag: 'https://placehold.co/24x24.png', dataAiHint: 'niger flag' },
        { name: 'Nigeria', flag: 'https://placehold.co/24x24.png', dataAiHint: 'nigeria flag' },
        { name: 'Rwanda', flag: 'https://placehold.co/24x24.png', dataAiHint: 'rwanda flag' },
        { name: 'Senegal', flag: 'https://placehold.co/24x24.png', dataAiHint: 'senegal flag' },
        { name: 'Seychelles', flag: 'https://placehold.co/24x24.png', dataAiHint: 'seychelles flag' },
        { name: 'South Africa', flag: 'https://placehold.co/24x24.png', dataAiHint: 'south africa flag' },
        { name: 'Tanzania', flag: 'https://placehold.co/24x24.png', dataAiHint: 'tanzania flag' },
        { name: 'Togo', flag: 'https://placehold.co/24x24.png', dataAiHint: 'togo flag' },
        { name: 'Tanzania', flag: 'https://placehold.co/24x24.png', dataAiHint: 'tanzania flag' },
        { name: 'Zambia', flag: 'https://placehold.co/24x24.png', dataAiHint: 'zambia flag' },
    ],
    Oceania: [
        { name: 'Australia', flag: 'https://placehold.co/24x24.png', dataAiHint: 'australia flag' },
        { name: 'New Zealand', flag: 'https://placehold.co/24x24.png', dataAiHint: 'new zealand flag' },
        { name: 'Samoa', flag: 'https://placehold.co/24x24.png', dataAiHint: 'samoa flag' },
        { name: 'Fiji', flag: 'https://placehold.co/24x24.png', dataAiHint: 'fiji flag' },
        { name: 'Papua New Guinea', flag: 'https://placehold.co/24x24.png', dataAiHint: 'papua new guinea flag' },
        { name: 'Solomon Islands', flag: 'https://placehold.co/24x24.png', dataAiHint: 'solomon islands flag' },
        { name: 'Tonga', flag: 'https://placehold.co/24x24.png', dataAiHint: 'tonga flag' },
        { name: 'Vanuatu', flag: 'https://placehold.co/24x24.png', dataAiHint: 'vanuatu flag' },
        { name: 'Micronesia', flag: 'https://placehold.co/24x24.png', dataAiHint: 'micronesia flag' },
    ]
};

function Hero() {
    return (
        <section className="bg-[#052011] text-white pt-32 pb-20 relative">
             <Image
                src="https://placehold.co/1200x400.png"
                data-ai-hint="world map graphic"
                alt="World map"
                layout="fill"
                objectFit="cover"
                className="opacity-10"
            />
            <div className="container mx-auto px-4 text-center relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 mb-4">
                    <Wifi className="h-4 w-4 text-[#B2F35F]" />
                    <span className="font-bold text-sm text-white">Country coverage</span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">Check out all the countries we cover.</h1>
                <p className="max-w-2xl mx-auto text-lg text-white/80">
                    Send and receives money from 150+ countries worldwide.
                </p>
                <div className="mt-8 max-w-lg mx-auto flex items-center gap-2 bg-white rounded-full p-2 shadow-lg">
                    <Select defaultValue="all">
                        <SelectTrigger className="bg-transparent border-none w-auto text-gray-800 font-medium focus:ring-0">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Region</SelectItem>
                            <SelectItem value="europe">Europe</SelectItem>
                            <SelectItem value="americas">Americas</SelectItem>
                            <SelectItem value="asia">Asia</SelectItem>
                            <SelectItem value="africa">Africa</SelectItem>
                            <SelectItem value="oceania">Oceania</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="h-6 w-px bg-gray-200"></div>
                    <Search className="h-5 w-5 text-gray-400 ml-2" />
                    <Input placeholder="Search Country" className="flex-1 bg-transparent border-none focus:ring-0 text-gray-800 placeholder:text-gray-500"/>
                </div>
            </div>
        </section>
    );
}

function CountryList() {
    return (
        <section className="bg-gray-50 py-20 sm:py-28">
            <div className="container mx-auto px-4 space-y-12">
                {Object.entries(countries).map(([continent, list]) => (
                    <div key={continent}>
                        <h2 className="text-2xl font-bold text-[#052011] mb-6">{continent}</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-4">
                            {list.map(country => (
                                <Link href="#" key={country.name} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-200/50 transition-colors">
                                    <Image src={country.flag} alt={`${country.name} flag`} width={24} height={24} data-ai-hint={country.dataAiHint} />
                                    <span className="font-medium text-gray-700">{country.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}

                 <Card className="mt-16 bg-white border-gray-200 shadow-sm">
                    <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="font-semibold text-gray-700 text-lg">Is your country not listed here?</p>
                        <Button variant="outline" className="bg-white border-gray-300 text-gray-800 font-bold hover:bg-gray-100">
                            Contact us <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}


export default function CountryCoveragePage() {
    return (
        <main className="bg-white">
            <Hero />
            <CountryList />
            <FinalCTA />
        </main>
    );
}
