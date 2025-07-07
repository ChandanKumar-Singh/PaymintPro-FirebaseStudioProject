import Image from 'next/image';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    logo: "https://placehold.co/100x40.png",
    logoHint: "uber logo",
    quote: "Uber systemizes the driver experience with Paymint, so we can focus on our core business.",
    authorName: "John Doe",
    authorTitle: "CEO, Uber"
  },
  {
    logo: "https://placehold.co/100x40.png",
    logoHint: "webuth logo",
    quote: "Webuth.com.au BSL increase in authorization rates with Paymint.",
    authorName: "Jane Smith",
    authorTitle: "CFO, Webuth"
  },
  {
    logo: "https://placehold.co/100x40.png",
    logoHint: "asana logo",
    quote: "Asana chose Paymint to subscribe globally.",
    authorName: "Sam Wilson",
    authorTitle: "Product Manager, Asana"
  },
];

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28 bg-[#F9FAFB]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-12">
            <div className="max-w-xl">
                <p className="font-bold text-[#052011]/60 mb-2">Customer stories</p>
                <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] tracking-tight">
                    Customer success is our success
                </h2>
            </div>
            <div className="flex gap-2 mt-6 md:mt-0">
                <Button size="icon" variant="outline" className="rounded-full h-12 w-12 border-gray-300">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <Button size="icon" className="rounded-full h-12 w-12 bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90">
                    <ArrowRight className="h-6 w-6" />
                </Button>
            </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col">
              <div className="flex-grow">
                <Image
                  src={testimonial.logo}
                  data-ai-hint={testimonial.logoHint}
                  alt="Company Logo"
                  width={100}
                  height={40}
                  className="mb-6"
                />
                <p className="text-lg text-gray-700 font-medium">"{testimonial.quote}"</p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-lg text-[#052011]">{testimonial.authorName}</h4>
                <p className="text-sm text-gray-500">{testimonial.authorTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
