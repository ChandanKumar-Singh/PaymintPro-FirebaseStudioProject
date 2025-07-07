
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { FinalCTA } from '@/components/landing/FinalCTA';

const platforms = [
  { name: 'Trustpilot', rating: '4.5', reviews: '150,000+', logo: 'https://placehold.co/120x30.png', dataAiHint: 'trustpilot logo' },
  { name: 'App Store', rating: '4.8', reviews: '50,000+', logo: 'https://placehold.co/120x30.png', dataAiHint: 'app store logo' },
  { name: 'Google Play', rating: '4.7', reviews: '100,000+', logo: 'https://placehold.co/120x30.png', dataAiHint: 'google play logo' },
];

const testimonials = [
  { quote: "Paymint has been a game-changer for my freelance business. Receiving payments from international clients is now seamless and incredibly fast. The low fees are a huge bonus!", author: "Sarah L.", country: "Canada", image: 'https://placehold.co/80x80.png', dataAiHint: 'woman portrait smiling' },
  { quote: "I travel a lot for work, and the Paymint multi-currency card is my constant companion. I can switch between currencies with a tap, and I always get the real exchange rate. Highly recommended!", author: "Marco R.", country: "Italy", image: 'https://placehold.co/80x80.png', dataAiHint: 'man portrait' },
  { quote: "As a small e-commerce store owner, Paymint helped me expand my business globally. The integration was easy, and accepting payments in different currencies is no longer a headache.", author: "Priya K.", country: "India", image: 'https://placehold.co/80x80.png', dataAiHint: 'woman portrait professional' },
  { quote: "The best part about Paymint is the transparency. No hidden fees, no surprises. What you see is what you get. Their customer support is also top-notch.", author: "Kenji T.", country: "Japan", image: 'https://placehold.co/80x80.png', dataAiHint: 'man portrait glasses' },
  { quote: "Sending money back home to my family used to be expensive and slow. With Paymint, it's affordable and the money arrives almost instantly. It gives me peace of mind.", author: "Fatima A.", country: "Nigeria", image: 'https://placehold.co/80x80.png', dataAiHint: 'woman portrait smiling' },
  { quote: "The user interface is so clean and intuitive. Managing multiple currencies and tracking my spending has never been easier. I use it for both personal and business finances.", author: "David C.", country: "United Kingdom", image: 'https://placehold.co/80x80.png', dataAiHint: 'man professional portrait' },
];

export default function ReviewsPage() {
  return (
    <main className="bg-white text-[#052011]">
      <section className="py-20 sm:py-28 text-center bg-[#E7FAD1]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">Loved by millions.</h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-700">
            See what our customers are saying about their experience with Paymint across the globe.
          </p>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {platforms.map(platform => (
              <Card key={platform.name} className="bg-white/70 backdrop-blur-sm border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <Image src={platform.logo} alt={platform.name} width={120} height={30} data-ai-hint={platform.dataAiHint} className="mx-auto mb-4" />
                  <div className="flex items-center justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < Math.floor(parseFloat(platform.rating)) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-xl font-bold mt-2">{platform.rating} out of 5</p>
                  <p className="text-sm text-gray-500">Based on {platform.reviews} reviews</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="break-inside-avoid shadow-lg border-gray-200">
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <Image src={testimonial.image} alt={testimonial.author} width={50} height={50} data-ai-hint={testimonial.dataAiHint} className="rounded-full" />
                    <div>
                      <p className="font-bold">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.country}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
