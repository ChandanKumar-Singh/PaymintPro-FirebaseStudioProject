'use client';
import Image from 'next/image';

const partners = [
    { name: 'Wise', logo: 'https://placehold.co/130x32.png', dataAiHint: 'wise logo' },
    { name: 'Google', logo: 'https://placehold.co/130x32.png', dataAiHint: 'google logo' },
    { name: 'Subway', logo: 'https://placehold.co/130x32.png', dataAiHint: 'subway logo' },
    { name: 'Amazon', logo: 'https://placehold.co/130x32.png', dataAiHint: 'amazon logo' },
    { name: 'Vodafone', logo: 'https://placehold.co/130x32.png', dataAiHint: 'vodafone logo' },
];

export function Partners() {
    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4">
                <p className="text-center text-lg font-medium text-gray-600 mb-8">
                    Trusted by leading brands
                </p>
                <div className="flex flex-wrap justify-center items-center gap-x-12 sm:gap-x-16 gap-y-6">
                    {partners.map((partner) => (
                        <Image
                            key={partner.name}
                            src={partner.logo}
                            alt={partner.name}
                            data-ai-hint={partner.dataAiHint}
                            width={130}
                            height={32}
                            className="opacity-70 hover:opacity-100 transition-opacity"
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
