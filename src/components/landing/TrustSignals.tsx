
'use client';

import Image from 'next/image';

export function TrustSignals() {
    const partners = ['Remitly', 'Bloomberg', 'Forbes', 'Wise', 'PayPal'];
    const dataAiHints = ['remitly logo', 'bloomberg logo', 'forbes logo', 'wise logo', 'paypal logo'];
    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4 text-center">
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
