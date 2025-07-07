
'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, MessageSquareQuestion, Twitter, BookOpenCheck } from 'lucide-react';
import { FinalCTA } from '@/components/landing/FinalCTA';

const socialLinks = [
    { href: "#", icon: Facebook },
    { href: "#", icon: Twitter },
    { href: "#", icon: Instagram },
    { href: "#", icon: Linkedin },
];

const salesContacts = [
    { name: 'Indonesia (HQ)', flag: 'https://placehold.co/24x24.png', dataAiHint: 'indonesia flag', phone: '+62 123 456 7890' },
    { name: 'United States', flag: 'https://placehold.co/24x24.png', dataAiHint: 'usa flag', phone: '+1 123 456 7890' },
    { name: 'United Kingdom', flag: 'https://placehold.co/24x24.png', dataAiHint: 'uk flag', phone: '+44 123 456 7890' },
    { name: 'Germany', flag: 'https://placehold.co/24x24.png', dataAiHint: 'germany flag', phone: '+49 123 456 7890' },
    { name: 'France', flag: 'https://placehold.co/24x24.png', dataAiHint: 'france flag', phone: '+33 123 456 7890' },
    { name: 'Portugal', flag: 'https://placehold.co/24x24.png', dataAiHint: 'portugal flag', phone: '+351 123 456 7890' },
    { name: 'Spain', flag: 'https://placehold.co/24x24.png', dataAiHint: 'spain flag', phone: '+34 123 456 7890' },
    { name: 'Sweden', flag: 'https://placehold.co/24x24.png', dataAiHint: 'sweden flag', phone: '+46 123 456 7890' },
    { name: 'Netherlands', flag: 'https://placehold.co/24x24.png', dataAiHint: 'netherlands flag', phone: '+31 123 456 7890' },
    { name: 'Japan', flag: 'https://placehold.co/24x24.png', dataAiHint: 'japan flag', phone: '+81 123 456 7890' },
    { name: 'Singapore', flag: 'https://placehold.co/24x24.png', dataAiHint: 'singapore flag', phone: '+65 123 456 7890' },
    { name: 'Australia', flag: 'https://placehold.co/24x24.png', dataAiHint: 'australia flag', phone: '+61 123 456 7890' },
    { name: 'Brazil', flag: 'https://placehold.co/24x24.png', dataAiHint: 'brazil flag', phone: '+55 123 456 7890' },
    { name: 'Canada', flag: 'https://placehold.co/24x24.png', dataAiHint: 'canada flag', phone: '+1 123 456 7890' },
    { name: 'United Arab Emirates', flag: 'https://placehold.co/24x24.png', dataAiHint: 'uae flag', phone: '+971 123 456 7890' },
    { name: 'South Korea', flag: 'https://placehold.co/24x24.png', dataAiHint: 'south korea flag', phone: '+82 123 456 7890' },
];


function ContactHero() {
    return (
        <section className="bg-[#052011] text-white py-20 sm:py-28">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="flex flex-col gap-8">
                        <div>
                            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4">Contact us</h1>
                            <p className="text-lg text-white/80">Tell us a bit about yourself, and we'll tell you a lot more about us.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <Card className="bg-white/10 border-white/20 p-6 rounded-2xl">
                                <div className="bg-[#B2F35F] text-[#052011] rounded-full h-10 w-10 flex items-center justify-center mb-4">
                                    <MessageSquareQuestion className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Have a questions?</h3>
                                <p className="text-sm text-white/80">Find the answers to frequently asked questions here.</p>
                            </Card>
                            <Card className="bg-white/10 border-white/20 p-6 rounded-2xl">
                                 <div className="bg-[#B2F35F] text-[#052011] rounded-full h-10 w-10 flex items-center justify-center mb-4">
                                    <BookOpenCheck className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Paymint Blog</h3>
                                <p className="text-sm text-white/80">Keep up with the latest news and trends.</p>
                            </Card>
                        </div>
                        <div>
                            <h4 className="font-bold mb-3">Follow us</h4>
                            <div className="flex gap-3">
                                {socialLinks.map((link, i) => (
                                    <Link key={i} href={link.href}>
                                        <Button variant="outline" size="icon" className="rounded-full bg-transparent border-white/30 hover:bg-white/20 hover:text-white">
                                            <link.icon className="h-5 w-5" />
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <Card className="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl">
                            <form className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="first-name">First name</Label>
                                        <Input id="first-name" placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="last-name">Last name</Label>
                                        <Input id="last-name" placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <Input id="email" type="email" placeholder="Enter your email" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone-number">Phone number</Label>
                                    <div className="flex">
                                        <select className="rounded-l-md border-r-0 border-gray-300 bg-gray-50 focus:ring-lime-500 focus:border-lime-500">
                                            <option>US</option>
                                            <option>UK</option>
                                            <option>DE</option>
                                        </select>
                                        <Input id="phone-number" type="tel" placeholder="+1 (555) 000-0000" className="rounded-l-none" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label>Which products are you considering?</Label>
                                    <RadioGroup defaultValue="personal" className="flex gap-6">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="personal" id="personal" />
                                            <Label htmlFor="personal" className="font-normal">Personal</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="business" id="business" />
                                            <Label htmlFor="business" className="font-normal">Business</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea id="message" placeholder="Your message here..." rows={4} />
                                </div>
                                <Button type="submit" className="w-full bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 rounded-md py-6 text-lg font-bold">Submit</Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ContactSalesByPhone() {
    return (
        <section className="bg-white text-[#052011] py-20 sm:py-28">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 tracking-tight">Contact sales by phone</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {salesContacts.map((contact, i) => (
                        <Card key={i} className="bg-gray-50 border-gray-200 p-4 rounded-xl hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3">
                                <Image src={contact.flag} data-ai-hint={contact.dataAiHint} alt="" width={24} height={24} className="rounded-full" />
                                <div>
                                    <p className="font-semibold">{contact.name}</p>
                                    <p className="text-gray-600">{contact.phone}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}


export default function ContactPage() {
    return (
        <main>
            <ContactHero />
            <ContactSalesByPhone />
            <FinalCTA />
        </main>
    );
}
