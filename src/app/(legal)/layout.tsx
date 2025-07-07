import React from 'react';
import { LandingHeader } from '@/components/landing/Header';
import { LandingFooter } from '@/components/landing/Footer';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <LandingHeader />
      <main className="flex-1">
        <div className="container py-12 md:py-16 lg:py-20 px-4 mx-auto">
            {children}
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
