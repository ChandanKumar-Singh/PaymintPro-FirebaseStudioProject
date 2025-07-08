
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import Link from "next/link";

export function FAQ() {
    const faqs = [
        { q: "How do I register for a Paymint personal account?", a: "It's quick and simple to register for a Paymint account. To get started opening a personal account, just click Register. Signing up is easy, we'll just need some basic identification documents so that we can electronically verify your identity. This is to comply with standard regulatory requirements in each territory that we operate in." },
        { q: "Is my money safe and secure?", a: "Yes, your money and data are safe with us. We use bank-level security measures, including advanced encryption and fraud prevention tools, to protect your account and transactions." },
        { q: "How can I exchange currencies with Paymint?", a: "You can exchange currencies within your multi-currency account. Simply select the currencies you want to exchange, enter the amount, and confirm the transaction. We use the mid-market rate to ensure you get the best possible exchange." },
    ]
    return (
        <section className="bg-white pb-20 sm:pb-28">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-1">
                        <p className="font-bold text-[#052011]/60 mb-2">How can we help?</p>
                        <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] tracking-tight">Common questions</h2>
                        <Button asChild size="lg" className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90  font-bold mt-8">
                           <Link href="/faq">All FAQ's</Link>
                        </Button>
                    </div>
                    <div className="lg:col-span-2">
                       <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
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
    );
}
