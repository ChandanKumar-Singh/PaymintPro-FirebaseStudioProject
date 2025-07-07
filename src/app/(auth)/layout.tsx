import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Logo } from '@/components/landing/Logo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen bg-[#052011]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
                <Link href="/" className="flex justify-center items-center">
                    <Logo />
                </Link>
            </div>
            <div className="bg-white text-black rounded-lg p-8">
                {children}
            </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://placehold.co/1920x1080.png"
          data-ai-hint="finance abstract"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
