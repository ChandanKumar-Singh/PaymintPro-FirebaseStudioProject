
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link';
import { 
    Search, 
    ArrowUpRight, 
    User, 
    ArrowDownLeft, 
    CreditCard, 
    Repeat, 
    BookOpen,
    ArrowRight
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const topics = [
    { 
        icon: ArrowUpRight, 
        title: "Sending money", 
        links: ["Sending a bank transfer", "Transfers between Paymint users", "Transfers in Other Countries and Currencies"] 
    },
    { 
        icon: User, 
        title: "Manage your account", 
        links: ["Update Personal Details", "Currency account details", "Getting your account verified"] 
    },
    { 
        icon: ArrowDownLeft, 
        title: "Receiving money", 
        links: ["Request money from other users", "Receiving a money transfer with your account", "Getting Paid by Card"] 
    },
    { 
        icon: CreditCard, 
        title: "Paymint card", 
        links: ["Getting started with Paymint card", "Spending fees", "Problem using cards"] 
    },
    { 
        icon: Repeat, 
        title: "Conversion", 
        links: ["Creating conversion", "Foreign exchange rate calculation", "Minimum and maximum limit"] 
    },
    { 
        icon: BookOpen, 
        title: "How to guides", 
        links: ["Set up rate alerts", "Multi-currencies accounts", "Low balance alerts"] 
    },
];

const faqs = [
    {
        question: "How do I register for a Paymint personal account?",
        answer: "It's quick and simple to register for a Paymint account. To get started opening a personal account, just click Register. Signing up is easy, we'll just need some basic identification documents so that we can electronically verify your identity. This is to comply with standard regulatory requirements in each territory that we operate in."
    },
    {
        question: "Is my money safe and secure?",
        answer: "Yes, your money and data are safe with us. We use bank-level security measures, including advanced encryption and fraud prevention tools, to protect your account and transactions."
    },
    {
        question: "How can I exchange currencies with Paymint?",
        answer: "You can exchange currencies within your multi-currency account. Simply select the currencies you want to exchange, enter the amount, and confirm the transaction. We use the mid-market rate to ensure you get the best possible exchange."
    },
    {
        question: "How long do international transfers take?",
        answer: "Transfer times vary depending on the destination and payment method. Most transfers are completed within 1-2 business days, but some can be much faster, arriving in minutes."
    },
    {
        question: "How do I add money to my Paymint balance?",
        answer: "You can add money to your Paymint balance using several methods, including bank transfers, debit cards, or credit cards. Just navigate to the 'Add Money' section in your account."
    }
]

export default function FAQPage() {
    return (
        <div className="bg-white text-[#052011]">
            <header className="py-16 sm:py-20 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">How can we help?</h1>
                    <div className="relative max-w-2xl mx-auto">
                        <Input 
                            placeholder="Search help articles" 
                            className="h-14 pl-12 rounded-lg border-gray-300 focus-visible:ring-lime-500 text-base"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 bg-[#B2F35F] text-[#052011] rounded-lg hover:bg-[#B2F35F]/90">
                            <Search className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 pb-20 sm:pb-28">
                <Tabs defaultValue="personal" className="w-full flex flex-col items-center mb-12">
                    <TabsList className="bg-gray-200 rounded-lg p-1">
                        <TabsTrigger value="personal" className="px-6 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow">Personal</TabsTrigger>
                        <TabsTrigger value="business" className="px-6 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow">Business</TabsTrigger>
                    </TabsList>
                    <TabsContent value="personal" className="w-full mt-8">
                        <section>
                            <h2 className="text-2xl font-bold mb-6">Browse topics</h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {topics.map((topic, i) => (
                                    <Card key={i} className="bg-gray-50/70 hover:bg-white hover:shadow-lg transition-all duration-300 rounded-xl border-gray-200">
                                        <CardContent className="p-6">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="bg-[#E7FAD1] p-2 rounded-full">
                                                    <topic.icon className="h-6 w-6 text-[#052011]" />
                                                </div>
                                                <h3 className="text-lg font-bold text-[#052011]">{topic.title}</h3>
                                            </div>
                                            <ul className="space-y-2">
                                                {topic.links.map((link) => (
                                                    <li key={link}>
                                                        <Link href="#" className="text-gray-600 hover:text-lime-600 text-sm">{link}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    </TabsContent>
                    <TabsContent value="business" className="w-full mt-8">
                        <p className="text-center text-gray-500">Business topics will be available soon.</p>
                    </TabsContent>
                </Tabs>
                
                <section className="mt-20 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
                    <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border bg-gray-50/70 rounded-xl mb-3 px-6 data-[state=open]:bg-white data-[state=open]:shadow-lg transition-all duration-300">
                                <AccordionTrigger className="text-lg font-medium text-left hover:no-underline">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-base text-gray-600 pt-2 pb-4">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>

                <section className="mt-20">
                    <div className="bg-[#052011] text-white rounded-2xl p-10 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Can't find your answer?</h2>
                            <p className="text-white/80">Our customer support team is here to help.</p>
                        </div>
                        <Button asChild size="lg" className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 rounded-md mt-6 md:mt-0 px-6 py-5 font-bold">
                            <Link href="/contact">
                                Contact us <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    );
}
