
'use client';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

const securityPoints = [
    { title: 'Secure accounts', description: 'Your account is protected by our advanced fraud prevention tools.' },
    { title: 'Data level', description: 'All your financial data is encrypted and stored on secure servers.' },
    { title: 'Juros e estimativas', description: 'We\'re committed to keeping your money safe and secure.' },
];

export function Security() {
    return (
        <section className="bg-[#052011] text-white py-20 sm:py-28">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="font-bold text-white/60 mb-2">SECURE & TRUSTED</p>
                        <h2 className="text-4xl sm:text-5xl font-bold mb-8 tracking-tight">Bank-level Security</h2>
                        <ul className="space-y-6">
                            {securityPoints.map((point, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <CheckCircle className="w-8 h-8 text-[#B2F35F] mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-xl font-bold">{point.title}</h3>
                                        <p className="text-white/80">{point.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex justify-center">
                        <Image src="https://placehold.co/400x400.png" data-ai-hint="security shield 3d" alt="Security Shield" width={400} height={400}/>
                    </div>
                </div>
            </div>
        </section>
    );
}
