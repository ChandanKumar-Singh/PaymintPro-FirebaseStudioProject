'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import Link from "next/link";
import { CircleHelp, Mail } from "lucide-react";

const faqs = [
    {
        question: "How do I create a transfer with Paymint?",
        answer: "Creating a transfer is simple. First, create your free account. Then, tell us how much you want to send and where. Finally, pay for your transfer and track its progress."
    },
    {
        question: "How fast will my money arrive?",
        answer: "Most transfers arrive within 1-2 business days. Some transfers can be even faster, arriving within minutes. The exact time depends on the currencies and payment method you choose."
    },
    {
        question: "How much does it cost to use Paymint?",
        answer: "We believe in transparent pricing. Our fees are low and always shown upfront. Your first transfer is even zero-fee! The total cost depends on the amount, currency, and payment method."
    },
    {
        question: "Is my money and data secure with Paymint?",
        answer: "Absolutely. We use bank-level security and advanced encryption to protect your money and personal information. We are regulated by financial authorities around the world."
    },
];

export function FAQ() {
    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="container mx-auto px-4">
                 <div className="grid lg:grid-cols-3 gap-12">
                     <div className="lg:col-span-1">
                        <p className="font-bold text-[#052011]/60 mb-2">How can we help?</p>
                        <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] tracking-tight">Common questions</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Can't find the answer you're looking for? Please chat with our friendly team.
                        </p>
                        <div className="mt-8 space-y-4">
                            <Button className="w-full justify-start gap-3 p-6 text-left text-base rounded-lg bg-[#E7FAD1] text-[#052011] hover:bg-[#d8f5a7]">
                                <CircleHelp className="w-6 h-6" />
                                <div>
                                    <p className="font-bold">Chat with us</p>
                                    <p className="font-normal text-sm">Our team is here to help</p>
                                </div>
                            </Button>
                             <Button className="w-full justify-start gap-3 p-6 text-left text-base rounded-lg bg-[#E7FAD1] text-[#052011] hover:bg-[#d8f5a7]">
                                <Mail className="w-6 h-6" />
                                <div>
                                    <p className="font-bold">Email us</p>
                                    <p className="font-normal text-sm">We'll get back to you soon</p>
                                </div>
                            </Button>
                        </div>
                     </div>
                     <div className="lg:col-span-2">
                        <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 py-4">
                                    <AccordionTrigger className="text-lg font-bold text-[#052011] hover:no-underline text-left">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-base text-gray-600 pt-2">
                                        {faq.answer}
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
