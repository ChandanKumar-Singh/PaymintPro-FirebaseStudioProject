
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const featuredPosts = [
  {
    title: 'Weboth Joins Paymint to Enhance Global Money Transfers Capabilities',
    author: 'Reese Jones',
    date: 'Dec 05, 2024',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'modern office collaboration',
    tags: ['News', 'Partnership'],
    authorImage: 'https://placehold.co/40x40.png',
    authorImageHint: 'man portrait',
  },
  {
    title: 'Paymint launches new cards for customers',
    author: 'Paymint',
    date: 'Nov 28, 2024',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'credit cards floating',
    tags: ['News', 'Product'],
    authorImage: 'https://placehold.co/40x40.png',
    authorImageHint: 'company logo',
  },
];

const latestPosts = [
  {
    title: 'Paymint App is now available in Dark Mode on iOS & Android',
    author: 'Reese Jones',
    date: 'Nov 27, 2024',
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'mobile phone dark mode',
    tags: ['Product', 'Update'],
    authorImage: 'https://placehold.co/40x40.png',
    authorImageHint: 'man portrait',
  },
  {
    title: 'Mission Update',
    author: 'Paymint',
    date: 'Nov 25, 2024',
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'company mission statement',
    tags: ['News'],
    authorImage: 'https://placehold.co/40x40.png',
    authorImageHint: 'company logo',
  },
  {
    title: 'Top 5 easiest bank accounts to open online (2025 List)',
    author: 'Vanissa Benson',
    date: 'Nov 24, 2024',
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'woman smiling laptop',
    tags: ['Personal Finance'],
    authorImage: 'https://placehold.co/40x40.png',
    authorImageHint: 'woman portrait',
  },
  {
    title: 'Paymint Reports Fourth Quarter and Full Year 2024 Results',
    author: 'Paymint',
    date: 'Nov 11, 2024',
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'financial report chart',
    tags: ['News'],
    authorImage: 'https://placehold.co/40x40.png',
    authorImageHint: 'company logo',
  },
  {
    title: 'Elon Musks story joining the Paymint team',
    author: 'Baron Mint',
    date: 'Nov 16, 2024',
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'man professional portrait',
    tags: ['News'],
    authorImage: 'https://placehold.co/40x40.png',
    authorImageHint: 'man smiling',
  },
  {
    title: 'How to get a SIM card in Iceland? (2025 Complete Guide)',
    author: 'Vanissa Benson',
    date: 'Nov 10, 2024',
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'iceland flag',
    tags: ['Travel'],
    authorImage: 'https://placehold.co/40x40.png',
    authorImageHint: 'woman portrait',
  },
  {
    title: 'The payments fees for transferring to SEK are changing',
    author: 'Reese Jones',
    date: 'Nov 9, 2024',
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'man on train phone',
    tags: ['Product', 'Update'],
    authorImage: 'https://placehold.co/40x40.png',
    authorImageHint: 'man portrait',
  },
  {
    title: 'What is SWIFT? The Banking System and Payment Network',
    author: 'Reese Jones',
    date: 'Nov 8, 2024',
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'abstract tech background',
    tags: ['General Finance', 'Banking'],
    authorImage: 'https://placehold.co/40x40.png',
    authorImageHint: 'man portrait',
  },
  {
    title: '5 Best Bank Account for Small Business Owners',
    author: 'Vanissa Benson',
    date: 'Nov 5, 2024',
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'small business owner',
    tags: ['Business'],
    authorImage: 'https://placehold.co/40x40.png',
    authorImageHint: 'woman portrait',
  },
];

const categories = ['All', 'News', 'Personal Finance', 'Business', 'Product', 'People', 'Travel'];

const stories = [
    {
        logo: 'https://placehold.co/100x30.png',
        dataAiHint: 'asana logo',
        title: 'Asana choose Paymint to power paid subscriptions globally.',
        image: 'https://placehold.co/120x120.png',
        dataAiHint: 'woman professional portrait',
        bgColor: 'bg-[#052011]',
        textColor: 'text-white',
        buttonColor: 'bg-[#B2F35F]',
        buttonTextColor: 'text-[#052011]',
    },
    {
        logo: 'https://placehold.co/100x30.png',
        dataAiHint: 'electrolux logo',
        title: 'Electrolux select Paymint to create a single partner for global billing and payments.',
        image: 'https://placehold.co/120x120.png',
        dataAiHint: 'man smiling portrait',
        bgColor: 'bg-[#E7FAD1]',
        textColor: 'text-[#052011]',
        buttonColor: 'bg-white',
        buttonTextColor: 'text-[#052011]',
    },
    {
        logo: 'https://placehold.co/100x30.png',
        dataAiHint: 'uber logo',
        title: 'Uber optimises the driver experience using Paymint as their main payment.',
        image: 'https://placehold.co/120x120.png',
        dataAiHint: 'man professional glasses',
        bgColor: 'bg-[#E7FAD1]',
        textColor: 'text-[#052011]',
        buttonColor: 'bg-white',
        buttonTextColor: 'text-[#052011]',
    },
    {
        logo: 'https://placehold.co/100x30.png',
        dataAiHint: 'webuth logo',
        title: 'Webuth sees an 8% increase in authorization rates with Paymint.',
        image: 'https://placehold.co/120x120.png',
        dataAiHint: 'man developer portrait',
        bgColor: 'bg-[#052011]',
        textColor: 'text-white',
        buttonColor: 'bg-[#B2F35F]',
        buttonTextColor: 'text-[#052011]',
    },
    {
        logo: 'https://placehold.co/100x30.png',
        dataAiHint: 'ebay logo',
        title: 'Ebay improves auth and preventing fraud with Paymint.',
        image: 'https://placehold.co/120x120.png',
        dataAiHint: 'woman smiling professional',
        bgColor: 'bg-[#E7FAD1]',
        textColor: 'text-[#052011]',
        buttonColor: 'bg-white',
        buttonTextColor: 'text-[#052011]',
    }
]

const Pagination = () => (
    <div className="flex justify-between items-center mt-12">
        <Button variant="outline" className="rounded-md hidden sm:flex bg-white text-[#052011] border-gray-300 hover:bg-gray-100">
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90">1</Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-[#052011] hover:bg-gray-200">2</Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-[#052011] hover:bg-gray-200">3</Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-[#052011] hover:bg-gray-200">4</Button>
            <span className="text-gray-500">...</span>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-[#052011] hover:bg-gray-200">12</Button>
        </div>
        <Button variant="outline" className="rounded-md bg-white text-[#052011] border-gray-300 hover:bg-gray-100">
            Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
    </div>
);

export default function BlogPage() {
    return (
        <main className="bg-white text-[#052011]">
            {/* Hero Section */}
            <section className="py-12 sm:py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-5 gap-8">
                        {featuredPosts.map((post, index) => (
                            <Link href="#" key={index} className={`group ${index === 0 ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
                                <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 border-gray-200 h-full flex flex-col">
                                    <CardContent className="p-0 flex-grow flex flex-col">
                                        <div className="relative">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                width={600}
                                                height={400}
                                                data-ai-hint={post.dataAiHint}
                                                className="w-full h-auto aspect-[3/2] object-cover"
                                            />
                                        </div>
                                        <div className="p-6 flex-grow flex flex-col">
                                            <div className="flex gap-2 mb-2">
                                                {post.tags.map(tag => (
                                                    <Badge key={tag} variant="outline" className="bg-[#E7FAD1] text-gray-800 border-lime-200 font-bold">{tag}</Badge>
                                                ))}
                                            </div>
                                            <h2 className="text-2xl font-bold mb-3 group-hover:text-lime-600 transition-colors flex-grow">{post.title}</h2>
                                            <div className="flex items-center gap-3 text-sm text-gray-600 mt-auto">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={post.authorImage} data-ai-hint={post.authorImageHint} />
                                                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <span>{post.author}</span>
                                                <span>&bull;</span>
                                                <span>{post.date}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Latest Section */}
            <section className="py-12 sm:py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-8">The Latest</h2>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {categories.map((cat, index) => (
                            <Button key={cat} variant={index === 0 ? "default" : "outline"} className={index === 0 ? "bg-[#052011] text-white hover:bg-gray-800 rounded-full" : "rounded-full border-gray-300 text-[#052011] bg-white hover:bg-gray-100"}>
                                {cat}
                            </Button>
                        ))}
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {latestPosts.map((post, index) => (
                             <Link href="#" key={index} className="group">
                                <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 border-gray-200 h-full flex flex-col">
                                    <CardContent className="p-0 flex-grow flex flex-col">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            width={400}
                                            height={300}
                                            data-ai-hint={post.dataAiHint}
                                            className="w-full h-auto aspect-[4/3] object-cover"
                                        />
                                        <div className="p-6 flex-grow flex flex-col">
                                            <div className="flex gap-2 mb-2">
                                                 {post.tags.map(tag => (
                                                    <Badge key={tag} variant="outline" className="bg-[#E7FAD1] text-gray-800 border-lime-200 font-bold">{tag}</Badge>
                                                ))}
                                            </div>
                                            <h3 className="text-xl font-bold mb-3 flex-grow group-hover:text-lime-600 transition-colors">{post.title}</h3>
                                            <div className="flex items-center gap-3 text-sm text-gray-600 mt-auto">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={post.authorImage} data-ai-hint={post.authorImageHint} />
                                                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <span>{post.author}</span>
                                                <span>&bull;</span>
                                                <span>{post.date}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                             </Link>
                        ))}
                    </div>
                    <Pagination />
                </div>
            </section>
            
            {/* Customer Stories Section */}
            <section className="py-12 sm:py-20 bg-[#F9FAFB]">
                <div className="container mx-auto px-4">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <div className="flex flex-col md:flex-row justify-between md:items-center mb-12">
                            <h2 className="text-4xl font-bold mb-8 md:mb-0 text-center md:text-left">Customer stories</h2>
                            <div className="flex gap-2 justify-center">
                                <CarouselPrevious className="static translate-y-0 rounded-full h-12 w-12 border-gray-300 text-gray-800 hover:bg-gray-100" />
                                <CarouselNext className="static translate-y-0 rounded-full h-12 w-12 bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90" />
                            </div>
                        </div>
                        <CarouselContent>
                           {stories.map((story, index) => (
                               <CarouselItem key={index} className="md:basis-1/2 lg:basis-2/5">
                                    <div className="p-1 h-full">
                                        <Link href="#" className="group h-full block">
                                            <Card className={`rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col ${story.bgColor} ${story.textColor}`}>
                                                <CardContent className="p-8 flex-grow flex flex-col">
                                                    <Image src={story.logo} alt={story.title} width={100} height={30} data-ai-hint={story.dataAiHint} className="mb-4" />
                                                    <h3 className="text-2xl font-bold flex-grow">{story.title}</h3>
                                                    <div className="flex justify-between items-end mt-6">
                                                        <Button className={`rounded-md font-bold ${story.buttonColor} ${story.buttonTextColor} hover:opacity-90`}>
                                                            Read story <ArrowRight className="ml-2 h-4 w-4" />
                                                        </Button>
                                                        <Image src={story.image} alt="" width={100} height={100} data-ai-hint={story.dataAiHint} className="rounded-full" />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </div>
                               </CarouselItem>
                           ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </section>
            
            {/* Newsletter Section */}
            <section className="py-12 sm:py-20 bg-[#052011] text-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Subscribe to our newsletter</h2>
                            <p className="text-lg text-white/80 mb-8">
                                Get the latest Paymint news, releases and tips, interesting articles, and exclusive services in your inbox every week.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Input type="email" placeholder="Email address" className="bg-white text-gray-800 placeholder:text-gray-500 h-14 rounded-lg flex-grow"/>
                                <Button size="lg" className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 rounded-lg px-6 h-14 text-base font-bold">
                                    Subscribe
                                </Button>
                            </div>
                        </div>
                        <div className="hidden lg:flex justify-center">
                            <Image src="https://placehold.co/400x500.png" data-ai-hint="payment terminal success" alt="Newsletter" width={400} height={500} className="rounded-2xl" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );

}