
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { ArrowRight, Search, PlayCircle, Plus } from 'lucide-react';

const partners = [
    { name: 'Great Place to Work', logo: 'https://placehold.co/100x40.png', dataAiHint: 'award logo' },
    { name: 'Top Workplaces', logo: 'https://placehold.co/100x40.png', dataAiHint: 'award logo' },
    { name: 'Glassdoor', logo: 'https://placehold.co/100x40.png', dataAiHint: 'glassdoor logo' },
    { name: 'Fortune', logo: 'https://placehold.co/100x40.png', dataAiHint: 'fortune logo' },
    { name: 'Fast Company', logo: 'https://placehold.co/100x40.png', dataAiHint: 'fast company logo' },
];

const offices = [
    { name: 'Yogyakarta', country: 'Indonesia', icon: 'https://placehold.co/60x60.png', dataAiHint: 'yogyakarta landmark' },
    { name: 'San Francisco', country: 'United States', icon: 'https://placehold.co/60x60.png', dataAiHint: 'san francisco bridge' },
    { name: 'London', country: 'United Kingdom', icon: 'https://placehold.co/60x60.png', dataAiHint: 'london landmark' },
    { name: 'Berlin', country: 'Germany', icon: 'https://placehold.co/60x60.png', dataAiHint: 'berlin landmark' },
    { name: 'Dubai', country: 'United Arab Emirates', icon: 'https://placehold.co/60x60.png', dataAiHint: 'dubai landmark' },
    { name: 'Paris', country: 'France', icon: 'https://placehold.co/60x60.png', dataAiHint: 'paris landmark' },
    { name: 'Beijing', country: 'China', icon: 'https://placehold.co/60x60.png', dataAiHint: 'beijing landmark' },
    { name: 'Singapore', country: 'Singapore', icon: 'https://placehold.co/60x60.png', dataAiHint: 'singapore landmark' },
];

const departments = [
    "Analytics (12)", "Business Development", "Communications", "Design", "Engineering & Data", "Finance", "HR, IT & Legal", "Legal", "Marketing", "Operations", "Product", "Sales & Account Management"
];

const locations = [
    "All", "Yogyakarta", "San Francisco", "London", "Berlin", "Paris", "Dubai", "Beijing", "Singapore"
];

const jobs = [
    { title: 'Business Operations Manager - Banking, Lending & Insurance', department: 'Operations', location: 'London', featured: false },
    { title: 'Associate Technical Product Manager', department: 'Product', location: 'Yogyakarta', featured: true, salary: 'In-office' },
    { title: 'Head of Business Development', department: 'Business Development', location: 'Berlin', featured: false },
    { title: 'Software Engineer (iOS)', department: 'Engineering & Data', location: 'San Francisco', featured: false },
    { title: 'Senior Brand & Marketing Designer', department: 'Design', location: 'Singapore', featured: false },
    { title: 'Lead Financial Controller (Group Controlling)', department: 'Finance', location: 'Dubai', featured: false },
    { title: 'Performance Marketing Manager', department: 'Marketing', location: 'Paris', featured: false },
    { title: 'Recruitment Researcher - Business Hiring', department: 'HR, IT & Legal', location: 'Yogyakarta', featured: false },
];


function Hero() {
    return (
        <section className="bg-[#052011] text-white pt-32 pb-20 relative overflow-hidden">
            <div className="container mx-auto px-4 text-center relative z-10">
                <div className="inline-block bg-lime-500/10 text-[#B2F35F] font-bold py-1 px-3 rounded-full text-sm mb-4">
                    CAREERS AT PAYMINT
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight max-w-4xl mx-auto">
                    Transform the Future of Payment
                </h1>
                <Button size="lg" className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 rounded-md px-6 py-5 text-base font-bold">
                    See opportunities <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
            </div>
            {/* Decorative avatars */}
            <div className="absolute inset-0 z-0">
                <Image src="https://placehold.co/80x80.png" data-ai-hint="woman portrait smiling" alt="Avatar" width={80} height={80} className="rounded-full absolute top-[15%] left-[10%]" />
                <Image src="https://placehold.co/60x60.png" data-ai-hint="man portrait professional" alt="Avatar" width={60} height={60} className="rounded-full absolute top-[20%] right-[12%]" />
                <Image src="https://placehold.co/70x70.png" data-ai-hint="man portrait glasses" alt="Avatar" width={70} height={70} className="rounded-full absolute bottom-[25%] left-[20%]" />
                <Image src="https://placehold.co/90x90.png" data-ai-hint="woman professional portrait" alt="Avatar" width={90} height={90} className="rounded-full absolute top-[45%] right-[25%]" />
                <Image src="https://placehold.co/50x50.png" data-ai-hint="man portrait smiling" alt="Avatar" width={50} height={50} className="rounded-full absolute bottom-[15%] right-[15%]" />
            </div>
        </section>
    );
}

function CultureSection() {
    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="container mx-auto px-4 text-center">
                <div className="flex justify-center items-center gap-x-12 sm:gap-x-16 gap-y-6 mb-16 flex-wrap">
                    {partners.map((partner) => (
                        <Image key={partner.name} src={partner.logo} alt={partner.name} data-ai-hint={partner.dataAiHint} width={100} height={40} className="opacity-70 hover:opacity-100 transition-opacity"/>
                    ))}
                </div>
                <p className="font-bold text-[#052011]/60 mb-2">CULTURE</p>
                <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] mb-4 tracking-tight">What it's like to work at Paymint</h2>
                <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-12">
                    Hear from our CEO, Reece James, on what it’s like to work here and learn why this is the best opportunity to join the team.
                </p>
                <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden cursor-pointer group">
                    <Image src="https://placehold.co/900x500.png" data-ai-hint="man speaking office" alt="CEO Reece James" width={900} height={500} className="w-full" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <PlayCircle className="w-20 h-20 text-white/80 group-hover:text-white group-hover:scale-105 transition-all" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function LocationsSection() {
    return (
        <section className="bg-[#F9FAFB] py-20 sm:py-28">
            <div className="container mx-auto px-4 text-center">
                <p className="font-bold text-[#052011]/60 mb-2">OFFICES</p>
                <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] mb-4 tracking-tight">Where we're located</h2>
                <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-12">
                    You'll find our talented team spread across the globe.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {offices.map(office => (
                        <div key={office.name} className="flex flex-col items-center">
                            <div className="bg-[#052011] rounded-full p-4 mb-4">
                                <Image src={office.icon} alt={office.name} data-ai-hint={office.dataAiHint} width={60} height={60} />
                            </div>
                            <h3 className="font-bold text-lg text-[#052011]">{office.name}</h3>
                            <p className="text-gray-600">{office.country}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function TestimonialSection() {
    return (
        <section className="bg-[#052011] text-white py-20 sm:py-28">
            <div className="container mx-auto px-4 text-center">
                <blockquote className="max-w-4xl mx-auto">
                    <p className="text-3xl sm:text-4xl font-medium leading-snug">
                        "Everyone at Paymint thinks about creating the best UI/UX first, then works backward from there."
                    </p>
                    <footer className="mt-6">
                        <p className="font-bold text-lg">Evan Fletcher</p>
                        <p className="text-white/70">Senior Product Designer</p>
                    </footer>
                </blockquote>
            </div>
        </section>
    )
}

function OpportunitiesSection() {
    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="container mx-auto px-4">
                <p className="font-bold text-[#052011]/60 mb-2">OPPORTUNITIES</p>
                <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] mb-2 tracking-tight">Find the right role for you</h2>
                <p className="text-lg text-gray-600 mb-12">We have {jobs.length} open positions</p>

                <div className="grid lg:grid-cols-4 gap-12">
                    <aside className="lg:col-span-1">
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-bold mb-4">Department</h3>
                                <div className="space-y-3">
                                    {departments.map(dept => (
                                        <div key={dept} className="flex items-center">
                                            <Checkbox id={dept} />
                                            <label htmlFor={dept} className="ml-3 text-sm text-gray-700">{dept}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                             <div>
                                <h3 className="font-bold mb-4">Location</h3>
                                <div className="flex flex-wrap gap-2">
                                    {locations.map((loc, i) => (
                                        <Button key={loc} variant={i === 0 ? 'default' : 'outline'} size="sm" className={i===0 ? "bg-[#052011] text-white" : "text-gray-700 border-gray-300"}>
                                            {loc}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                    <main className="lg:col-span-3">
                        <div className="relative mb-8">
                             <Input placeholder="Search positions" className="pl-10 h-12" />
                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                        <div className="space-y-4">
                            {jobs.map(job => (
                                <Card key={job.title} className={job.featured ? 'bg-[#052011] text-white' : 'bg-white hover:bg-gray-50'}>
                                    <CardContent className="p-6 flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-lg">{job.title}</h4>
                                            <div className="flex items-center gap-2 text-sm mt-1">
                                                <span className={job.featured ? 'text-white/70' : 'text-gray-600'}>{job.department}</span>
                                                <span className={job.featured ? 'text-white/70' : 'text-gray-600'}>&bull;</span>
                                                <span className={job.featured ? 'text-white/70' : 'text-gray-600'}>{job.location}</span>
                                            </div>
                                            {job.salary && <p className="text-sm font-semibold text-[#B2F35F] mt-2">{job.salary}</p>}
                                        </div>
                                        <Button size="icon" variant={job.featured ? 'secondary' : 'outline'} className={job.featured ? 'bg-white/20 hover:bg-white/30 text-white' : 'border-gray-300'}>
                                            <Plus className="h-5 w-5" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <Button variant="outline" className="text-gray-800 border-gray-300">Show more</Button>
                        </div>
                    </main>
                </div>
            </div>
        </section>
    );
}

function NewsletterCTA() {
    return (
        <section className="bg-[#052011] text-white py-20">
             <div className="container mx-auto px-4 text-center max-w-2xl">
                 <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Don't see the role that you're looking for?</h2>
                 <p className="text-lg text-white/80 mb-8">Sign up to get notified when we post a new opportunity.</p>
                 <div className="flex flex-col sm:flex-row gap-3">
                    <Input type="email" placeholder="Email address" className="bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12 flex-grow" />
                    <Button size="lg" className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 h-12 font-bold">Subscribe</Button>
                 </div>
             </div>
        </section>
    );
}


export default function CareersPage() {
    return (
        <main>
            <Hero />
            <CultureSection />
            <LocationsSection />
            <TestimonialSection />
            <OpportunitiesSection />
            <NewsletterCTA />
        </main>
    );
}
