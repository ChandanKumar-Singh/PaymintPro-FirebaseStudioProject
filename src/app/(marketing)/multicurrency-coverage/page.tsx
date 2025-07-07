'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Smartphone, Globe, ShieldCheck, Wifi, Star, Play } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const appStoreBadges = [
    { name: 'App Store', icon: Play, rating: '4.8', dataAiHint: 'app store badge' },
    { name: 'Google Play', icon: Play, rating: '4.7', dataAiHint: 'google play badge' },
];

const features = [
    { icon: Smartphone, title: 'Manage your account', description: 'Access and manage your finances on the go. Move money and track transactions with Paymint in just a few clicks.' },
    { icon: Globe, title: 'Avoid unnecessary bank charges', description: 'There are no account opening fees, monthly maintenance charges, or minimum transaction requirements.' },
    { icon: ShieldCheck, title: 'Your funds are safe and secure', description: 'Relax knowing that your money is secure and protected with end-to-end encryption and bank-level security.' },
];

const registrationSteps = [
    {
        title: "Create your Paymint account",
        content: "Start your registration online or via the Paymint app. We'll ask for some personal information including your contact details, nationality and driver's license number options."
    },
    {
        title: "Get your ID verified",
        content: "To keep your account secure, we need to verify your identity. You can usually do this with a photo of your ID and a selfie."
    },
    {
        title: "Add currencies you want",
        content: "Once verified, you can add multiple currencies to your account instantly and start transacting globally."
    }
];

const countries = [
    "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi",
    "Cameroon", "Cape Verde", "Chad", "Comoros", "Congo", "Djibouti",
    "Egypt", "Eritrea", "Ethiopia", "Gabon", "Gambia", "Ghana"
];

function Hero() {
    return (
        <section className="bg-[#052011] text-white pt-32 pb-20">
            <div className="container mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 mb-4">
                    <Wifi className="h-4 w-4 text-[#B2F35F]" />
                    <span className="font-bold text-sm text-white">Multi-currency account</span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">One account for multiple countries & currencies.</h1>
                <p className="max-w-2xl mx-auto text-lg text-white/80">
                    150+ Countries. 35+ Currencies. One account.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Button size="lg" className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 rounded-md font-bold px-6 py-5 text-base">
                        Open account <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button size="lg" variant="outline" className="text-white border-white/40 hover:text-white hover:bg-white/10 rounded-md font-bold px-6 py-5 text-base">
                        See Pricing
                    </Button>
                </div>
                <div className="mt-16">
                     <Image
                        src="https://placehold.co/800x450.png"
                        data-ai-hint="mobile app balances"
                        alt="Paymint App Balances"
                        width={800}
                        height={450}
                        className="rounded-t-2xl mx-auto"
                    />
                </div>
            </div>
        </section>
    );
}

function SocialProof() {
    return (
        <section className="bg-white py-12">
            <div className="container mx-auto px-4 text-center">
                <h3 className="text-xl font-bold text-gray-800">Loved by more than 5 millions users</h3>
                <p className="text-gray-500 mb-6">5 millions+ reviews across all platforms</p>
                <div className="flex justify-center gap-4">
                    {appStoreBadges.map(badge => (
                        <Button key={badge.name} variant="outline" className="border-gray-300 h-14 px-6 rounded-lg text-left bg-white text-[#052011] hover:bg-gray-50">
                            <badge.icon className="h-6 w-6 mr-3" />
                            <div>
                                <p className="text-xs">GET IT ON</p>
                                <p className="font-bold">{badge.name}</p>
                            </div>
                            <div className="flex items-center ml-4">
                                <span className="font-bold text-lg">{badge.rating}</span>
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                            </div>
                        </Button>
                    ))}
                </div>
            </div>
        </section>
    );
}

function LocalBankDetails() {
    return (
        <section className="bg-[#052011] text-white py-20 sm:py-28">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="lg:pr-12">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-8 tracking-tight">Multi-currency accounts with local bank details</h2>
                        <ul className="space-y-8">
                            {features.map(feature => (
                                <li key={feature.title} className="flex items-start gap-4">
                                    <div className="bg-[#B2F35F]/10 p-2 rounded-full mt-1">
                                        <feature.icon className="h-6 w-6 text-[#B2F35F]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl">{feature.title}</h3>
                                        <p className="text-white/70">{feature.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <Image src="https://placehold.co/600x400.png" data-ai-hint="world map graphic" alt="Global currency network" width={600} height={400} />
                    </div>
                </div>
            </div>
        </section>
    )
}

function EasyRegistration() {
    return (
        <section className="bg-gray-50 py-20 sm:py-28">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="flex justify-center">
                        <Image src="https://placehold.co/400x550.png" data-ai-hint="registration form ui" alt="Paymint registration form" width={400} height={550} className="rounded-2xl shadow-xl" />
                    </div>
                     <div className="lg:pl-12">
                        <p className="font-bold text-gray-500 mb-2">How to get started</p>
                        <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] mb-8 tracking-tight">Register for a Multi-currency account is easy</h2>
                        <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                           {registrationSteps.map((step, index) => (
                                <AccordionItem key={index} value={`item-${index}`} className="border bg-white rounded-xl mb-3 px-6 data-[state=open]:shadow-lg transition-all duration-300">
                                    <AccordionTrigger className="text-lg font-medium text-left hover:no-underline [&[data-state=open]>svg]:text-[#B2F35F]">
                                        {step.title}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-base text-gray-600 pt-2 pb-4">
                                        {step.content}
                                    </AccordionContent>
                                </AccordionItem>
                           ))}
                        </Accordion>
                         <Button size="lg" className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 rounded-md font-bold px-6 py-5 text-base mt-6">
                            Get started now <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

function SendMoneyCTA() {
    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="container mx-auto px-4 text-center">
                <p className="font-bold text-gray-500 mb-2">Country coverage</p>
                <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] tracking-tight max-w-3xl mx-auto mb-8">
                    Send money to 150+ countries with Paymint
                </h2>
                <Tabs defaultValue="europe" className="w-full max-w-xl mx-auto">
                    <TabsList className="bg-gray-100 rounded-full p-1 mb-8">
                        <TabsTrigger value="all">All region</TabsTrigger>
                        <TabsTrigger value="asia">Asia</TabsTrigger>
                        <TabsTrigger value="europe">Europe</TabsTrigger>
                        <TabsTrigger value="americas">Americas</TabsTrigger>
                        <TabsTrigger value="africa">Africa</TabsTrigger>
                        <TabsTrigger value="oceania">Oceania</TabsTrigger>
                    </TabsList>
                    <TabsContent value="europe">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 text-left">
                            {countries.map(country => (
                                <Link href="#" key={country} className="text-gray-700 hover:text-lime-600 font-medium">{country}</Link>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}

export default function MulticurrencyCoveragePage() {
    return (
        <main>
            <Hero />
            <SocialProof />
            <LocalBankDetails />
            <EasyRegistration />
            <SendMoneyCTA />
        </main>
    );
}
