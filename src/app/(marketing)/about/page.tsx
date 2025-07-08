
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Linkedin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FinalCTA } from '@/components/landing/FinalCTA';

const stats = [
    { value: '10m+', label: 'Personal users' },
    { value: '200k+', label: 'Web/Mobile users' },
    { value: '150+', label: 'Countries and regions' },
    { value: '35+', label: 'Priced currencies' },
];

const history = [
    { year: '2019', title: 'Our Co-founders Reece James and Phil Jones launch Paymint' },
    { year: '2020', title: 'Reached 1 million users and expanded to Europe' },
    { year: '2021', title: 'Launched Paymint for Business and the Paymint Card' },
    { year: '2022', title: 'Opened new offices in New York and Singapore' },
    { year: '2023', title: 'Processed over $10 billion in transactions' },
];

const leadership = [
    { name: 'Reece James', title: 'Founder & CO-CEO', image: 'https://placehold.co/300x400.png', dataAiHint: 'man portrait' },
    { name: 'Phil Jones', title: 'Co-founder & CEO', image: 'https://placehold.co/300x400.png', dataAiHint: 'man portrait smiling' },
    { name: 'Carmela Solono', title: 'Head of User monetization', image: 'https://placehold.co/300x400.png', dataAiHint: 'woman portrait professional' },
    { name: 'Jason McKinney', title: 'Chief Technology Officer', image: 'https://placehold.co/300x400.png', dataAiHint: 'man glasses portrait' },
    { name: 'Michelle Williams', title: 'Chief Financial Officer', image: 'https://placehold.co/300x400.png', dataAiHint: 'woman portrait professional' },
];

const offices = [
    { name: 'Yogyakarta', country: 'Indonesia', image: 'https://placehold.co/300x200.png', dataAiHint: 'yogyakarta landmark' },
    { name: 'San Francisco', country: 'USA', image: 'https://placehold.co/300x200.png', dataAiHint: 'san francisco bridge' },
    { name: 'Berlin', country: 'Germany', image: 'https://placehold.co/300x200.png', dataAiHint: 'berlin landmark' },
    { name: 'London', country: 'United Kingdom', image: 'https://placehold.co/300x200.png', dataAiHint: 'london landmark' },
];

function AboutHero() {
    return (
        <section className="bg-[#E7FAD1] text-[#052011] pt-32 pb-12">
            <div className="container mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-4">
                    <div className="bg-[#B2F35F] rounded-full p-1">
                         <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.69141 15.5312C9.26953 15.5312 8.90234 15.375 8.58984 15.0625C8.27734 14.75 8.12109 14.3828 8.12109 13.9609V7.17188H5.05859C4.63672 7.17188 4.26953 7.01562 3.95703 6.70312C3.64453 6.39062 3.48828 6.02344 3.48828 5.60156V2.53906C3.48828 2.11719 3.64453 1.75 3.95703 1.4375C4.26953 1.125 4.63672 0.96875 5.05859 0.96875H10.9414C11.3633 0.96875 11.7305 1.125 12.043 1.4375C12.3555 1.75 12.5117 2.11719 12.5117 2.53906V5.375C12.5117 5.71875 12.4258 6.02734 12.2539 6.30078C12.082 6.57422 11.8477 6.78516 11.5508 6.93359C11.2539 7.08203 10.9219 7.15625 10.5547 7.15625H9.69141V13.9609C9.69141 14.3828 9.53516 14.75 9.22266 15.0625C8.91016 15.375 8.54297 15.5312 8.12109 15.5312H7.96484C8.40234 15.5312 8.78516 15.375 9.11328 15.0625C9.44141 14.75 9.60547 14.3828 9.60547 13.9609V8.75H10.5547C10.9922 8.75 11.375 8.59375 11.7031 8.28125C12.0312 7.96875 12.1953 7.59375 12.1953 7.15625V2.53906C12.1953 2.23438 12.1055 1.96484 11.9258 1.73047C11.7461 1.49609 11.5117 1.32422 11.2227 1.21484C10.9336 1.10547 10.6367 1.03125 10.3359 1.03125H5.05859C4.75781 1.03125 4.47266 1.10547 4.19922 1.21484C3.92578 1.32422 3.69141 1.49609 3.5 1.73047C3.30859 1.96484 3.21094 2.23438 3.21094 2.53906V5.60156C3.21094 5.90625 3.30859 6.17578 3.5 6.41016C3.69141 6.64453 3.92578 6.81641 4.19922 6.92578C4.47266 7.03516 4.75781 7.09375 5.05859 7.09375H8.20703V2.53906C8.20703 2.11719 8.36328 1.75 8.67578 1.4375C8.98828 1.125 9.35547 0.96875 9.77734 0.96875H9.69141V15.5312Z" fill="#052011"/>
                        </svg>
                    </div>
                    <span className="font-bold text-sm">ABOUT US</span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">We've moving money globally since 2019</h1>
                <p className="max-w-3xl mx-auto text-lg text-gray-700">
                    Since its inception in 2019, Paymint has grown from an idea that were had to be a welfare, fast way to send money around the world.
                </p>
                <div className="mt-8">
                    <Image 
                        src="https://placehold.co/1200x600.png"
                        data-ai-hint="modern office collaboration"
                        alt="Paymint office"
                        width={1200}
                        height={600}
                        className="rounded-2xl shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
}

function OurStory() {
    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-[#052011] mb-6 tracking-tight">Our story</h2>
                        <p className="text-gray-600 space-y-4">
                           <span>Paymint was born in 2019 when our Founders <span className="font-bold">Reece James</span> & <span className="font-bold">Phil Jones</span> moved to new city. The first thing on their to-do list was to open a bank account, so that they could receive their salary, find a place to stay and send money to their families in United States. To open a bank account they needed proof of the address, utility bills and countless other documents, but they couldn't get any of those without having a bank account.</span>
                           <span>After being stuck in this frustrating loop, they knew they had to find a better way so that no one else have to go through the same ordeal experience again. Later, they come up with the idea for <span className="font-bold">Paymint, an online multi-currency borderless account that makes everyone can money stored in an account, cheaper, and faster way.</span></span>
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <Image src="https://placehold.co/500x350.png" data-ai-hint="two men smiling" alt="Paymint Founders" width={500} height={350} className="rounded-2xl" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function StatsSection() {
    return (
        <section className="bg-[#052011] text-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat) => (
                        <div key={stat.label}>
                            <p className="text-4xl sm:text-5xl font-bold text-[#B2F35F]">{stat.value}</p>
                            <p className="text-white/80 mt-2">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function HistorySection() {
    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold text-[#052011] mb-2 tracking-tight">Our history</h2>
                <p className="text-gray-600 mb-8">See how Paymint has grown global presence, community and product like over time.</p>
                <Tabs defaultValue="2019" className="w-full max-w-2xl mx-auto">
                    <TabsList className="mb-8 bg-gray-100 rounded-full p-1">
                        {history.map(item => (
                            <TabsTrigger key={item.year} value={item.year} className="rounded-full data-[state=active]:bg-[#B2F35F] data-[state=active]:text-[#052011] px-4 py-1.5 font-semibold">
                                {item.year}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {history.map(item => (
                         <TabsContent key={item.year} value={item.year}>
                             <Card className="bg-[#052011] text-white rounded-2xl p-8 max-w-sm mx-auto">
                                 <CardContent className="text-center">
                                     <p className="text-2xl font-bold mb-4">{item.year}</p>
                                     <p className="text-lg mb-6">{item.title}</p>
                                     <div className="relative inline-block">
                                        <div className="absolute -left-12 -right-12 top-1/2 -translate-y-1/2 h-1 bg-orange-400"></div>
                                        <div className="relative bg-[#B2F35F] p-4 rounded-full inline-block">
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19.3828 31.0625C18.5391 31.0625 17.8047 30.75 17.1797 30.125C16.5547 29.5 16.2422 28.7656 16.2422 27.9219V14.3438H10.1172C9.27344 14.3438 8.53906 14.0312 7.91406 13.4062C7.28906 12.7812 6.97656 12.0469 6.97656 11.2031V5.07812C6.97656 4.23438 7.28906 3.5 7.91406 2.875C8.53906 2.25 9.27344 1.9375 10.1172 1.9375H21.8828C22.7266 1.9375 23.4609 2.25 24.0859 2.875C24.7109 3.5 25.0234 4.23438 25.0234 5.07812V10.75C25.0234 11.4375 24.8516 12.0547 24.5078 12.6016C24.1641 13.1484 23.6953 13.5703 23.1016 13.8672C22.5078 14.1641 21.8438 14.3125 21.1094 14.3125H19.3828V27.9219C19.3828 28.7656 19.0703 29.5 18.4453 30.125C17.8203 30.75 17.0859 31.0625 16.2422 31.0625H15.9297C16.8047 31.0625 17.5703 30.75 18.2266 30.125C18.8828 29.5 19.2109 28.7656 19.2109 27.9219V17.5H21.1094C21.9844 17.5 22.75 17.1875 23.4062 16.5625C24.0625 15.9375 24.3906 15.1875 24.3906 14.3125V5.07812C24.3906 4.46875 24.2109 3.92969 23.8516 3.46094C23.4922 2.99219 23.0312 2.64844 22.4688 2.42969C21.9062 2.21094 21.3281 2.0625 20.7344 2.0625H10.1172C9.52344 2.0625 8.94531 2.21094 8.38281 2.42969C7.82031 2.64844 7.35938 2.99219 7 3.46094C6.64062 3.92969 6.46094 4.46875 6.46094 5.07812V11.2031C6.46094 11.8125 6.64062 12.3516 7 12.8203C7.35938 13.2891 7.82031 13.6328 8.38281 13.8516C8.94531 14.0703 9.52344 14.1875 10.1172 14.1875H16.4141V5.07812C16.4141 4.23438 16.7266 3.5 17.3516 2.875C17.9766 2.25 18.7109 1.9375 19.5547 1.9375H19.3828V31.0625Z" fill="#052011"/>
                                            </svg>
                                        </div>
                                     </div>
                                 </CardContent>
                             </Card>
                         </TabsContent>
                    ))}
                </Tabs>
                <div className="mt-8 flex justify-center gap-4">
                    <Button variant="outline" size="icon" className="h-12 w-12 border-gray-300">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <Button variant="secondary" size="icon" className="h-12 w-12 bg-[#052011] text-white hover:bg-gray-800">
                        <ArrowRight className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
}

function LeadershipSection() {
    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="container mx-auto px-4">
                <Carousel opts={{ align: "start" }} className="w-full">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-4xl font-bold text-[#052011] tracking-tight">Our leadership</h2>
                        <div className="flex items-center gap-4">
                            <p className="text-gray-500 font-medium">1/2</p>
                            <CarouselPrevious className="static translate-y-0 rounded-full h-12 w-12 border-gray-300 text-gray-800 hover:bg-gray-100" />
                            <CarouselNext className="static translate-y-0 rounded-full h-12 w-12 bg-[#052011] text-white hover:bg-gray-800" />
                        </div>
                    </div>
                    <CarouselContent>
                        {leadership.map((person, index) => (
                            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
                                <Card className="border-none shadow-none">
                                    <CardContent className="p-2">
                                        <Image src={person.image} data-ai-hint={person.dataAiHint} alt={person.name} width={300} height={400} className="rounded-2xl w-full mb-4" />
                                        <h3 className="font-bold text-lg">{person.name}</h3>
                                        <p className="text-gray-600 mb-2">{person.title}</p>
                                        <Link href="#"><Linkedin className="h-5 w-5 text-gray-500 hover:text-[#052011]" /></Link>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    )
}

function CareersSection() {
    return (
        <section className="bg-white pb-20 sm:pb-28">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="grid grid-cols-2 gap-6">
                        {offices.map((office, i) => (
                             <Card key={i} className="rounded-2xl overflow-hidden group">
                                <CardContent className="p-0 relative">
                                    <Image src={office.image} data-ai-hint={office.dataAiHint} alt={office.name} width={300} height={200} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/30"></div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h4 className="font-bold text-xl">{office.name}</h4>
                                        <p>{office.country}</p>
                                    </div>
                                </CardContent>
                             </Card>
                        ))}
                    </div>
                    <div className="lg:pl-8">
                        <p className="font-bold text-[#052011]/60 mb-2">CAREERS</p>
                        <h2 className="text-4xl font-bold text-[#052011] mb-6 tracking-tight">Explore roles at Paymint's offices around the world</h2>
                        <p className="text-gray-600 mb-8">
                           We're looking talented, all over the world. It a remote company with employees from eight countries around the globe. Our team is big on collaboration and flexibility.
                        </p>
                        <Button className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 font-bold px-6 py-5 text-base">
                            View open roles <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default function AboutPage() {
    return (
        <main>
            <AboutHero />
            <OurStory />
            <StatsSection />
            <HistorySection />
            <LeadershipSection />
            <CareersSection />
            <FinalCTA />
        </main>
    );
}
