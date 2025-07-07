'use client';
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LegalNav } from "@/components/legal/legal-nav";
import React from 'react';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white">
      <LandingHeader />
      <main className="container mx-auto px-4 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <aside className="lg:col-span-1">
                <LegalNav />
            </aside>
            <div className="lg:col-span-3">
                {children}
            </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
