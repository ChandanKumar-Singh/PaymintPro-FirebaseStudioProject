'use client';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const steps = [
    { title: "Create your Paymint account", content: "Open your registration form to create your free account, which you can use for your personal and business transactions security and trusted worldwide." },
    { title: "Enter purchasable limits", content: "Set your own limits for transactions to manage your finances effectively." },
    { title: "Send funds for your transfer", content: "Easily send funds across borders with competitive rates and low fees." },
]

export function GettingStarted() {
    return (
        <section className="py-20 sm:py-28 bg-[#F9FAFB]">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="flex justify-center">
                         <Image src="https://placehold.co/500x600.png" data-ai-hint="mobile app form" alt="Paymint Account Creation" width={450} height={600} className="rounded-xl shadow-lg" />
                    </div>
                    <div className="lg:pl-12">
                        <p className="font-bold text-[#052011]/60 mb-2">How to get started</p>
                        <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] mb-8 tracking-tight">It’s simple to start using Paymint</h2>
                        <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="item-0">
                            {steps.map((step, index) => (
                                <AccordionItem key={index} value={`item-${index}`} className="bg-white border border-gray-200 rounded-lg px-6">
                                    <AccordionTrigger className="text-lg text-left hover:no-underline font-bold text-[#052011]">
                                        <span className="flex items-center gap-4">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E7FAD1] text-[#052011] font-bold text-lg">
                                                {index + 1}
                                            </span>
                                            {step.title}
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-600 pl-12">
                                        {step.content}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                        <Button asChild size="lg" variant="outline" className="border-[#052011] text-[#052011] hover:bg-[#052011]/10 hover:text-[#052011] rounded-full mt-8 px-6 py-5 text-base font-bold">
                            <Link href="#">
                                Get started now <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
