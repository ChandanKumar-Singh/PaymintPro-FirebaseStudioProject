
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FinalCTA } from '@/components/landing/FinalCTA';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Minus, Info, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';


const plans = [
    {
        name: 'Standard',
        description: 'Free and Paymint account in GBP, EUR and USD.',
        price: 'Free',
        cardImage: 'https://placehold.co/200x126.png',
        cardColors: ['#B2F35F'],
        cardHint: 'green credit card',
        popular: false
    },
    {
        name: 'Classic',
        description: 'Perfect for your plus spending and everyday needs.',
        price: '$4.99/Month',
        cardImage: 'https://placehold.co/200x126.png',
        cardColors: ['#34D399', '#3B82F6', '#F59E0B'],
        cardHint: 'teal credit card',
        popular: false
    },
    {
        name: 'Plus',
        description: 'Perfect for smart plus spending and everyday needs.',
        price: '$9.99/Month',
        cardImage: 'https://placehold.co/200x126.png',
        cardColors: ['#2DD4BF', '#6366F1', '#EC4899'],
        cardHint: 'dark green credit card',
        popular: true
    },
    {
        name: 'Premium',
        description: 'More comprehensive plan with bonus.',
        price: '$14.99/Month',
        cardImage: 'https://placehold.co/200x126.png',
        cardColors: ['#111827', '#FBBF24', '#F87171', '#60A5FA'],
        cardHint: 'black credit card',
        popular: false
    }
];

const featureSections = [
    {
        title: 'Payment & Transfers',
        features: [
            { name: 'Instant transfers', values: ['Free', 'Free', 'Free', 'Free'] },
            { name: 'International transfers', values: ['3% fee', '2% fee', '0.5% fee', 'Free'], info: true },
            { name: 'Local transfers', values: ['Free', 'Free', 'Free', 'Free'] },
            { name: 'Recurring payments and direct debits', values: [false, true, true, true], info: true },
        ]
    },
    {
        title: 'Paymint Cards',
        features: [
            { name: 'Physical card', values: ['$6.00', '1 free', '1 free', '2 free'] },
            { name: 'Virtual card', values: [false, true, true, true] },
            { name: 'Contactless payments', values: [true, true, true, true] },
            { name: 'Google pay / Apple Pay', values: [true, true, true, true], info: true },
            { name: 'Free card delivery', values: ['$6.90', 'Free', 'Free', 'Free'] },
            { name: 'Cashback on card payments', values: [false, false, true, true], info: true },
        ]
    },
    {
        title: 'Cash',
        features: [
            { name: 'Free ATM withdrawals abroad', values: [false, '3 free', true, true] },
            { name: 'Cash top ups', values: ['5.0% fee', '$200 free monthly', '$400 free monthly', '$1,000 free monthly'], info: true },
        ]
    },
    {
        title: 'Account',
        features: [
            { name: 'Hold 25+ currencies', values: [false, true, true, true] },
            { name: 'Ability for global transfers', values: [true, true, true, true] },
            { name: 'Access your account with Paymint on mobile app and Earn a stamp', values: [true, true, true, true], info: true },
        ]
    },
    {
        title: 'Support',
        features: [
            { name: '24/7 Live chat support', values: [false, false, true, true] },
            { name: 'Priority live chat support', values: [false, false, 'In-app chat', 'In-app chat and request a call back'] },
            { name: 'Multilingual live phone support', values: [false, false, true, true], info: true },
        ]
    }
];

const faqs = [
    { q: "How do I register for a Paymint personal account?", a: "It's quick and simple to register for a Paymint account. To get started opening a personal account, just click Register. Signing up is easy, we'll just need some basic identification documents so that we can electronically verify your identity. This is to comply with standard regulatory requirements in each territory that we operate in." },
    { q: "How much does it cost to open a Personal account?", a: "Opening a Personal account with Paymint is completely free. We offer different plans with various features, some of which may have a monthly fee, but there is no cost to simply open the account." },
    { q: "How long does it take to get a Paymint card?", a: "After ordering your card, standard delivery usually takes between 5-7 business days within the US and UK. International delivery times may vary." },
    { q: "How long do International transfers take?", a: "Transfer times can vary depending on the destination currency and country. Many transfers are instant or arrive within the same day, while some can take up to 2-3 business days." },
    { q: "How do I add money to my Paymint balance?", a: "You can add money easily via bank transfer, debit card, or credit card directly within the Paymint app or website." }
]


function PricingPage() {
    return (
        <main className="bg-white text-[#052011]">
            <section className="text-center py-20 sm:py-28">
                <div className="container mx-auto px-4">
                    <Tabs defaultValue="personal" className="w-full max-w-sm mx-auto mb-10">
                        <TabsList className="grid w-full grid-cols-2 bg-gray-200 rounded-lg p-1">
                            <TabsTrigger value="personal" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-md">Personal</TabsTrigger>
                            <TabsTrigger value="business" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-md">Business</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Choose your plan</h1>
                    <p className="text-lg text-gray-600">Find the perfect plan to suit your individual needs.</p>
                </div>
            </section>

            <section className="pb-20 sm:pb-28">
                <div className="container mx-auto px-4">
                    <div className="hidden lg:grid grid-cols-5 gap-8 items-end">
                        <div className="col-span-1"></div>
                        {plans.map(plan => (
                            <div key={plan.name} className={cn("col-span-1 p-6 rounded-t-2xl", plan.popular ? "bg-[#052011] text-white" : "")}>
                                {plan.popular && <p className="text-center text-sm font-bold text-[#B2F35F] mb-2">Most popular</p>}
                                <h3 className="text-xl font-bold text-center">{plan.name}</h3>
                            </div>
                        ))}
                    </div>
                    <div className="overflow-x-auto">
                        <div className="grid lg:hidden grid-cols-4 gap-4 mb-8">
                             {plans.map(plan => (
                                <div key={plan.name} className="min-w-[250px]">
                                     <Card className={cn("h-full border-2", plan.popular ? "border-[#052011]" : "border-gray-200")}>
                                         <CardContent className="p-4 flex flex-col items-center text-center">
                                            {plan.popular && <p className="text-xs font-bold text-white bg-[#052011] rounded-full px-3 py-1 -mt-6 mb-2">Most popular</p>}
                                            <h3 className="text-lg font-bold">{plan.name}</h3>
                                            <p className="text-xs text-gray-500 flex-grow mt-1 mb-3">{plan.description}</p>
                                            <Image src={plan.cardImage} alt={plan.name} width={120} height={75} data-ai-hint={plan.cardHint} />
                                             <div className="flex justify-center gap-1.5 my-3">
                                                {plan.cardColors.map(color => <span key={color} className="h-4 w-4 rounded-full border border-gray-300" style={{ backgroundColor: color }}></span>)}
                                            </div>
                                            <p className="font-bold my-2">{plan.price}</p>
                                            <Button className={cn("w-full mt-2 bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90", plan.popular && "bg-white text-[#052011] hover:bg-gray-100")}>Get started</Button>
                                         </CardContent>
                                     </Card>
                                </div>
                            ))}
                        </div>

                         <div className="hidden lg:grid grid-cols-5 gap-8 items-center bg-gray-50 p-6 rounded-b-2xl">
                            <div className="col-span-1"></div>
                            {plans.map(plan => (
                                <div key={plan.name} className="col-span-1 flex flex-col items-center text-center">
                                    <p className="text-sm text-gray-500 h-10">{plan.description}</p>
                                    <Image src={plan.cardImage} alt={plan.name} width={150} height={94} data-ai-hint={plan.cardHint} className="my-4" />
                                    <div className="flex gap-2 my-2">
                                        {plan.cardColors.map(color => <span key={color} className="h-5 w-5 rounded-full border border-gray-300" style={{ backgroundColor: color }}></span>)}
                                    </div>
                                    <p className="text-lg font-bold my-4">{plan.price}</p>
                                    <Button className={cn("w-full bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90", plan.popular && "bg-white text-[#052011] hover:bg-gray-100")}>Get started</Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {featureSections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="mt-8">
                            <h4 className="text-xl font-bold mb-4">{section.title}</h4>
                            <div className="divide-y divide-gray-200">
                                {section.features.map((feature, featureIndex) => (
                                    <div key={featureIndex} className="grid grid-cols-1 lg:grid-cols-5 gap-4 py-4 items-center">
                                        <div className="flex items-center gap-2 col-span-1 lg:col-span-1">
                                            <span className="font-medium text-gray-700">{feature.name}</span>
                                            {feature.info && <Info className="h-4 w-4 text-gray-400" />}
                                        </div>
                                        <div className="col-span-1 lg:col-span-4 grid grid-cols-4 gap-4 text-center">
                                            {feature.values.map((value, valueIndex) => (
                                                <div key={valueIndex} className="font-medium text-gray-800">
                                                    {typeof value === 'boolean' ? (
                                                        value ? <Check className="h-6 w-6 text-green-500 mx-auto" /> : <Minus className="h-6 w-6 text-gray-400 mx-auto" />
                                                    ) : (
                                                        <span>{value}</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-12 sm:py-20">
                 <div className="container mx-auto px-4">
                    <div className="bg-[#052011] text-white rounded-2xl p-10 grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="font-bold text-[#B2F35F] mb-2">Promotion</p>
                            <h3 className="text-4xl font-bold mb-4">Get a Zero-fee on your first transfer</h3>
                            <p className="text-white/80">Take advantage of a great introductory rate on your first international money transfer. Supply and fees are applied.</p>
                            <Button asChild className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 mt-6 px-6 py-5 text-base font-bold">
                            <Link href="/register">
                                Register Now <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            </Button>
                        </div>
                        <div className="flex justify-center">
                            <Image src="https://placehold.co/300x300.png" data-ai-hint="zero percent 3d" alt="0% Fee" width={250} height={250}/>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="bg-white py-20 sm:py-28">
                <div className="container mx-auto px-4">
                     <div className="grid lg:grid-cols-3 gap-12">
                         <div className="lg:col-span-1">
                            <p className="font-bold text-[#052011]/60 mb-2">How can we help?</p>
                            <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] tracking-tight">Personal account FAQ</h2>
                            <p className="mt-4 text-lg text-gray-600">
                                Find the answers to Personal account common questions.
                            </p>
                            <div className="mt-8">
                                <Button className="w-full justify-start gap-3 p-6 text-left text-base rounded-lg bg-[#E7FAD1] text-[#052011] hover:bg-[#d8f5a7]">
                                    <HelpCircle className="w-6 h-6" />
                                    <div>
                                        <p className="font-bold">Need further support?</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 ml-auto"/>
                                </Button>
                            </div>
                         </div>
                         <div className="lg:col-span-2">
                            <Accordion type="single" collapsible className="w-full">
                                {faqs.map((faq, index) => (
                                    <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 py-4">
                                        <AccordionTrigger className="text-lg font-bold text-[#052011] hover:no-underline text-left">
                                            {faq.q}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-base text-gray-600 pt-2">
                                            {faq.a}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                         </div>
                     </div>
                </div>
            </section>
            
            <FinalCTA />
        </main>
    );
}

export default PricingPage;
