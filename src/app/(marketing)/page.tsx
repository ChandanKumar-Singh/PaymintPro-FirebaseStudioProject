
'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CirclePlay, ChevronDown, CheckCircle, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { CountryCoverage } from '@/components/landing/CountryCoverage';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { BestWays } from '@/components/landing/BestWays';
import { Security } from '@/components/landing/Security';
import { PricingComparison } from '@/components/landing/PricingComparison';

// Component 1: Hero
function Hero() {
  const [fromCurrency] = useState({ code: 'USD', name: 'USA', flag: 'https://placehold.co/24x24.png', dataAiHint: 'usa flag' });
  const [toCurrency] = useState({ code: 'NGN', name: 'Nigeria', flag: 'https://placehold.co/24x24.png', dataAiHint: 'nigeria flag' });

  return (
    <section className="bg-sidebar text-sidebar-foreground pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
              The fast and secure way to send money.
            </h1>
            <p className="text-lg text-sidebar-foreground/80 mb-10 max-w-lg mx-auto lg:mx-0">
              With our innovative fintech solutions, you can seamlessly handle
              all your financial needs. From international transfers to everyday
              payments, Paymint is your trusted partner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-base font-bold"
              >
                <Link href="/register">
                  Create account <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-full px-8 py-6 text-base font-bold"
              >
                <Link href="/contact">
                  <CirclePlay className="mr-2 w-5 h-5" />
                  Contact sales
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-card text-card-foreground p-6 rounded-2xl w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg">Amount</span>
                <button className="flex items-center gap-2 font-medium">
                  <Image src={fromCurrency.flag} data-ai-hint={fromCurrency.dataAiHint} alt={fromCurrency.name} width={24} height={24} className="rounded-full" />
                  {fromCurrency.code}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <Input
                type="text"
                defaultValue="2,000"
                className="text-4xl font-bold h-auto p-0 border-none focus-visible:ring-0 bg-transparent"
              />
              <div className="border-t my-4"></div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">They'll get</span>
                 <button className="flex items-center gap-2 font-medium">
                  <Image src={toCurrency.flag} data-ai-hint={toCurrency.dataAiHint} alt={toCurrency.name} width={24} height={24} className="rounded-full" />
                  {toCurrency.code}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <p className="text-4xl font-bold">2,997,298.58</p>
              <div className="text-sm text-muted-foreground mt-4 space-y-1">
                <div className="flex justify-between">
                  <span>Fee</span>
                  <span>$1.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Rate</span>
                  <span className="font-medium text-primary">1 USD = 1,498.45 NGN</span>
                </div>
              </div>
               <Button className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 text-lg font-bold">
                 Get Started
               </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Component 2: Trust Signals
function TrustSignals() {
    const partners = ['Remitly', 'Bloomberg', 'Forbes', 'Wise', 'PayPal', 'Visa', 'MasterCard'];
    const dataAiHints = ['remitly logo', 'bloomberg logo', 'forbes logo', 'wise logo', 'paypal logo', 'visa logo', 'mastercard logo'];
    return (
        <section className="bg-background py-20 sm:py-28">
            <div className="container mx-auto px-4 text-center">
                <p className="text-center text-lg font-medium text-muted-foreground mb-8">
                    We offer fast and secure money transfers
                </p>
                <div className="flex flex-wrap justify-center items-center gap-x-12 sm:gap-x-16 gap-y-6">
                    {partners.map((partner, index) => (
                        <Image
                            key={partner}
                            src={`https://placehold.co/130x32.png`}
                            alt={partner}
                            data-ai-hint={dataAiHints[index]}
                            width={130}
                            height={32}
                            className="opacity-70 hover:opacity-100 transition-opacity"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

// Component 3: Offerings
function Offerings() {
    return (
        <section className="bg-background pb-20 sm:pb-28">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-sidebar text-sidebar-foreground p-8 rounded-2xl">
                        <h3 className="text-3xl font-bold mb-4">For Individuals</h3>
                        <p className="text-sidebar-foreground/80 mb-6">Send, spend, and receive money from a single account.</p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-sidebar-primary" /> No subscription, monthly, or hidden fees.</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-sidebar-primary" /> Hold 35+ currencies</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-sidebar-primary" /> Get your Paymint card</li>
                        </ul>
                        <Button asChild variant="outline" className="bg-transparent text-sidebar-foreground border-sidebar-foreground/40 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                            <Link href="/features">Learn more</Link>
                        </Button>
                         <Image src="https://placehold.co/350x300.png" data-ai-hint="mobile money transfer" alt="Individual use" width={350} height={300} className="ml-auto mt-8" />
                    </div>
                    <div className="bg-sidebar text-sidebar-foreground p-8 rounded-2xl">
                        <h3 className="text-3xl font-bold mb-4">For Business</h3>
                        <p className="text-sidebar-foreground/80 mb-6">Tools for your business to grow globally.</p>
                         <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-sidebar-primary" /> No subscription, monthly, or hidden fees.</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-sidebar-primary" /> Mass Payouts</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-sidebar-primary" /> API Integrations</li>
                        </ul>
                        <Button asChild variant="outline" className="bg-transparent text-sidebar-foreground border-sidebar-foreground/40 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                           <Link href="/business">Learn more</Link>
                        </Button>
                         <Image src="https://placehold.co/350x300.png" data-ai-hint="business payment solution" alt="Business use" width={350} height={300} className="ml-auto mt-8" />
                    </div>
                </div>
            </div>
        </section>
    );
}

// Component 4: BestProvider
function BestProvider() {
  const features = [
    { icon: CheckCircle, title: 'Fast & Secure', description: 'With our innovative fintech solutions, you can seamlessly handle all your financial needs.' },
    { icon: CheckCircle, title: 'Low transfer fees', description: 'From international transfers to everyday payments, Paymint is your trusted partner.' },
    { icon: CheckCircle, title: 'No subscription', description: 'We believe in transparent pricing and fair rates for everyone.' },
    { icon: CheckCircle, title: '24/7 Support', description: 'Our dedicated support team is here to help you around the clock.' },
  ];
  return (
    <section className="bg-background pb-20 sm:pb-28">
      <div className="container mx-auto px-4">
        <p className="text-center font-bold text-muted-foreground mb-2">Why Paymint</p>
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground text-center mb-6 tracking-tight">
          We are the best international money transfer provider
        </h2>
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Millions of happy customers and a 4.5 star rating on Trustpilot.
        </p>
        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-bold mx-auto block w-fit">
            <Link href="/pricing">Check prices</Link>
        </Button>
        <div className="mt-16 grid sm:grid-cols-2 gap-x-8 gap-y-12 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-accent p-3 rounded-full">
                <feature.icon className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Component 5: MultiCurrency
function MultiCurrency() {
    return (
        <section className="bg-background pb-20 sm:pb-28">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="lg:pr-12">
                         <p className="font-bold text-muted-foreground mb-2">FEATURES</p>
                         <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight">One account for 35+ currencies around the world</h2>
                         <p className="text-lg text-muted-foreground mb-8">
                            With our innovative fintech solutions, you can seamlessly handle all your financial needs. From international transfers to everyday payments, Paymint is your trusted partner.
                         </p>
                         <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary" /> Bank-level security</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary" /> Millions of happy customers</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary" /> No hidden fees</li>
                         </ul>
                         <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-bold">
                            <Link href="/multicurrency-coverage">Get started</Link>
                         </Button>
                    </div>
                    <div>
                        <Image src="https://placehold.co/500x400.png" data-ai-hint="currency exchange rates" alt="Currency exchange" width={500} height={400} className="rounded-xl shadow-lg" />
                    </div>
                </div>
            </div>
        </section>
    );
}

// Component 6: CardExperience
function CardExperience() {
    return (
        <section className="bg-sidebar text-sidebar-foreground py-20 sm:py-28">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                     <div className="lg:order-2 lg:pl-12">
                         <p className="font-bold text-sidebar-foreground/60 mb-2">DEBIT CARD</p>
                         <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">The Ultimate Card Experience Across Borders</h2>
                         <p className="text-lg text-sidebar-foreground/80 mb-8">
                           Enjoy the flexibility of a physical and virtual card to send and receive money from your multi-currency account.
                         </p>
                         <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-sidebar-primary" /> Physical & virtual card</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-sidebar-primary" /> No hidden fees</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-sidebar-primary" /> Real exchange rate</li>
                         </ul>
                         <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-bold">
                            <Link href="/cards">Learn more</Link>
                         </Button>
                    </div>
                    <div className="lg:order-1">
                        <Image src="https://placehold.co/500x350.png" data-ai-hint="green credit card" alt="Paymint Debit Card" width={500} height={350} className="rounded-xl" />
                    </div>
                </div>
            </div>
        </section>
    );
}

// Component 7: MobileApp
function MobileApp() {
    return (
        <section className="bg-background py-20 sm:py-28">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="lg:pr-12">
                         <p className="font-bold text-muted-foreground mb-2">MOBILE APP</p>
                         <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight">One app for all your overseas transfers</h2>
                         <p className="text-lg text-muted-foreground mb-8">
                            With our innovative fintech solutions, you can seamlessly handle all your financial needs. From international transfers to everyday payments, Paymint is your trusted partner.
                         </p>
                         <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary" /> Send money and make payments</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary" /> Get real-time notifications</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary" /> Transfer money overseas</li>
                         </ul>
                         <div className="flex items-center gap-4">
                            <Link href="#"><Image src="https://placehold.co/150x50.png" data-ai-hint="app store badge" alt="App Store" width={150} height={50} /></Link>
                            <Link href="#"><Image src="https://placehold.co/150x50.png" data-ai-hint="google play badge" alt="Google Play" width={150} height={50} /></Link>
                         </div>
                    </div>
                    <div>
                        <Image src="https://placehold.co/500x500.png" data-ai-hint="mobile app interface" alt="Paymint Mobile App" width={500} height={500} />
                    </div>
                </div>
            </div>
        </section>
    );
}

// Component 8: Testimonials
function Testimonials() {
    const testimonials = [
        { name: 'John Stones', title: 'CEO, Uber', text: "Uber systemizes the driver experience with Paymint, so we can focus on our core business.", image: 'https://placehold.co/350x250.png', dataAiHint: 'man professional portrait' },
        { name: 'Bernardo Silva', title: 'CFO, Webuth', text: "Webuth.com.au BSL increase in authorization rates with Paymint.", image: 'https://placehold.co/350x250.png', dataAiHint: 'man smiling portrait' },
        { name: 'Ruben Dias', title: 'PM, Asana', text: "Asana chose Paymint to subscribe globally.", image: 'https://placehold.co/350x250.png', dataAiHint: 'woman portrait professional' },
    ];
    return (
        <section className="bg-background pb-20 sm:pb-28">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <p className="font-bold text-muted-foreground mb-2">TESTIMONIAL</p>
                        <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">Customer success is our success</h2>
                    </div>
                    <div className="hidden md:flex gap-4">
                        <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <Button variant="secondary" size="icon" className="rounded-full h-12 w-12 bg-sidebar text-sidebar-foreground hover:bg-sidebar/80">
                            <ArrowRight className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <div className="grid lg:grid-cols-3 gap-8">
                    {testimonials.map(t => (
                        <Card key={t.name} className="bg-accent border-none rounded-2xl overflow-hidden">
                            <CardContent className="p-0">
                                <Image src={t.image} alt={t.name} width={350} height={250} className="w-full" data-ai-hint={t.dataAiHint} />
                                <div className="p-6">
                                    <p className="text-lg font-medium text-accent-foreground mb-4">"{t.text}"</p>
                                    <h4 className="font-bold text-lg text-foreground">{t.name}</h4>
                                    <p className="text-sm text-muted-foreground">{t.title}</p>
                                    <Button asChild variant="link" className="p-0 h-auto mt-4 text-foreground font-bold">
                                      <Link href="#">Read story</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Component 9: HowItWorks
function HowItWorks() {
    return (
        <section className="bg-background pb-20 sm:pb-28">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                     <div>
                        <Image src="https://placehold.co/500x400.png" data-ai-hint="payment form ui" alt="Payment form" width={500} height={400} className="rounded-xl shadow-lg" />
                    </div>
                    <div className="lg:pl-12">
                        <p className="font-bold text-muted-foreground mb-2">How it works</p>
                        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight">It's simple to start using Paymint</h2>
                        <ol className="space-y-6">
                            <li className="flex items-start gap-4">
                                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">1</span>
                                <div>
                                    <h4 className="font-bold text-xl">Create an account</h4>
                                    <p className="text-muted-foreground">Register for free online or in the app. All you need is an email address.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">2</span>
                                <div>
                                    <h4 className="font-bold text-xl">Set up a transfer</h4>
                                    <p className="text-muted-foreground">Tell us the amount, where you're sending to, and the recipient's details.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">3</span>
                                <div>
                                    <h4 className="font-bold text-xl">Pay for transfer</h4>
                                    <p className="text-muted-foreground">Send your money with a bank transfer, or a debit or credit card.</p>
                                </div>
                            </li>
                        </ol>
                         <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-bold mt-8">
                            <Link href="/features">Learn more</Link>
                         </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Component 10: ZeroFeeCTA
function ZeroFeeCTA() {
    return (
        <section className="bg-background pb-20 sm:pb-28">
            <div className="container mx-auto px-4">
                 <div className="bg-sidebar text-sidebar-foreground rounded-2xl p-12 grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="font-bold text-primary mb-2">Promotion</p>
                        <h3 className="text-4xl font-bold mb-4">Get a Zero-fee on your first transfer</h3>
                        <p className="text-sidebar-foreground/80">Take advantage of a great introductory rate on your first international money transfer. Supply and fees are applied.</p>
                        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md mt-6 px-6 py-5 text-base font-bold">
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
    );
}

// Component 11: FAQ
function FAQ() {
    const faqs = [
        { q: "How do I register for a Paymint personal account?", a: "It's quick and simple to register for a Paymint account. To get started opening a personal account, just click Register. Signing up is easy, we'll just need some basic identification documents so that we can electronically verify your identity. This is to comply with standard regulatory requirements in each territory that we operate in." },
        { q: "Is my money safe and secure?", a: "Yes, your money and data are safe with us. We use bank-level security measures, including advanced encryption and fraud prevention tools, to protect your account and transactions." },
        { q: "How can I exchange currencies with Paymint?", a: "You can exchange currencies within your multi-currency account. Simply select the currencies you want to exchange, enter the amount, and confirm the transaction. We use the mid-market rate to ensure you get the best possible exchange." },
    ]
    return (
        <section className="bg-background pb-20 sm:pb-28">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-1">
                        <p className="font-bold text-muted-foreground mb-2">How can we help?</p>
                        <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">Common questions</h2>
                        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-bold mt-8">
                           <Link href="/faq">All FAQ's</Link>
                        </Button>
                    </div>
                    <div className="lg:col-span-2">
                       <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                           {faqs.map((faq, index) => (
                               <AccordionItem key={index} value={`item-${index}`} className="border-b py-4">
                                   <AccordionTrigger className="text-lg font-bold text-foreground hover:no-underline text-left">
                                       {faq.q}
                                   </AccordionTrigger>
                                   <AccordionContent className="text-base text-muted-foreground pt-2">
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


export default function MarketingPage() {
  return (
    <>
      <Hero />
      <TrustSignals />
      <Offerings />
      <BestProvider />
      <MultiCurrency />
      <CardExperience />
      <MobileApp />
      <Testimonials />
      <HowItWorks />
      <ZeroFeeCTA />
      <CountryCoverage />
      <PricingComparison />
      <Security />
      <BestWays />
      <FAQ />
      <FinalCTA />
    </>
  );
}
