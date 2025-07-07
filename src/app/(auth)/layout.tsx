import React from 'react';
import { LandingHeader } from '@/components/landing/Header';
import { LandingFooter } from '@/components/landing/Footer';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <LandingHeader />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="mx-auto grid w-full max-w-[380px] gap-6">{children}</div>
      </main>
      <LandingFooter />
    </div>
  );
}
