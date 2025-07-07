'use client';
import Image from 'next/image';

const solutions = [
    { title: "Consulting", image: 'https://placehold.co/400x300.png', dataAiHint: 'consulting meeting' },
    { title: "E-commerce", image: 'https://placehold.co/400x300.png', dataAiHint: 'ecommerce online shopping' },
    { title: "Financial services", image: 'https://placehold.co/400x300.png', dataAiHint: 'finance stock market' },
    { title: "Airlines", image: 'https://placehold.co/400x300.png', dataAiHint: 'airplane flying' },
    { title: "Fashion", image: 'https://placehold.co/400x300.png', dataAiHint: 'fashion clothing store' },
    { title: "Travel", image: 'https://placehold.co/400x300.png', dataAiHint: 'travel beach' },
    { title: "Manufacture", image: 'https://placehold.co/400x300.png', dataAiHint: 'factory manufacturing' },
    { title: "SaaS", image: 'https://placehold.co/400x300.png', dataAiHint: 'saas dashboard' },
    { title: "Remittance", image: 'https://placehold.co/400x300.png', dataAiHint: 'money transfer' },
];

export function GlobalSolutions() {
    return (
        <section className="py-20 sm:py-28 bg-white">
            <div className="container mx-auto px-4 text-center">
                <p className="font-bold text-[#052011]/60 mb-2">SOLUTIONS</p>
                <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] tracking-tight max-w-3xl mx-auto">
                    As your business grows, so do our global payment solutions.
                </h2>
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {solutions.map((solution) => (
                        <div key={solution.title} className="group">
                            <div className="overflow-hidden rounded-xl">
                                <Image 
                                    src={solution.image} 
                                    alt={solution.title} 
                                    data-ai-hint={solution.dataAiHint}
                                    width={400} 
                                    height={300} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-[#052011] mt-4">{solution.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
