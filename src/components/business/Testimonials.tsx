'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const testimonials = [
    {
        logo: "https://placehold.co/100x40.png",
        dataAiHint: "uber logo",
        text: "Uber systemizes the driver experience with Paymint, so we can focus on our core business.",
        author: "John Doe",
        title: "CEO, Uber"
    },
    {
        logo: "https://placehold.co/100x40.png",
        dataAiHint: "webuth logo",
        text: "Webuth.com.au BSL increase in authorization rates with Paymint.",
        author: "Jane Smith",
        title: "CFO, Webuth"
    },
    {
        logo: "https://placehold.co/100x40.png",
        dataAiHint: "asana logo",
        text: "Asana chose Paymint to subscribe globally.",
        author: "Sam Wilson",
        title: "Product Manager, Asana"
    },
    {
        logo: "https://placehold.co/100x40.png",
        dataAiHint: "google logo",
        text: "Paymint's reliability has been a game-changer for our international operations.",
        author: "Sundar Pichai",
        title: "CEO, Google"
    }
];

export function Testimonials() {
    return (
        <section className="py-20 sm:py-28 bg-white">
            <div className="container mx-auto px-4">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                    <div className="flex flex-col md:flex-row justify-between md:items-center mb-12">
                        <div className="max-w-xl">
                            <p className="font-bold text-[#052011]/60 mb-2">Customer stories</p>
                            <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] tracking-tight">Customer success is our success</h2>
                        </div>
                        <div className="flex gap-2 mt-6 md:mt-0">
                           <CarouselPrevious className="static translate-y-0 rounded-full h-12 w-12 border-gray-300 text-gray-800 hover:bg-gray-100" />
                           <CarouselNext className="static translate-y-0 rounded-full h-12 w-12 bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90" />
                        </div>
                    </div>
                    <CarouselContent>
                        {testimonials.map((testimonial, index) => (
                           <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <Card className="h-full">
                                        <CardContent className="bg-[#E7FAD1] p-8 rounded-2xl flex flex-col h-full">
                                            <div className="flex-grow">
                                                <Image src={testimonial.logo} data-ai-hint={testimonial.dataAiHint} alt="Company Logo" width={100} height={40} className="mb-6"/>
                                                <p className="text-lg text-gray-700 font-medium">"{testimonial.text}"</p>
                                            </div>
                                            <div className="mt-6 pt-6 border-t border-gray-400/50">
                                                <h4 className="font-bold text-lg text-[#052011]">{testimonial.author}</h4>
                                                <p className="text-sm text-gray-500">{testimonial.title}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
}
