
'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Youtube, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Logo } from './Logo';

export function LandingFooter() {
  return (
    <footer className="bg-[#0A2D1A] text-white pt-16 sm:pt-24 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
             <div className="mb-6"><Logo /></div>
          </div>
          <div className="lg:col-span-9 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-lg mb-4">Product</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-white/80 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="text-white/80 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="text-white/80 hover:text-white transition-colors">Case studies</Link></li>
                <li><Link href="#" className="text-white/80 hover:text-white transition-colors">Reviews</Link></li>
                <li><Link href="#" className="text-white/80 hover:text-white transition-colors">Updates</Link></li>
              </ul>
            </div>
             <div>
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-white/80 hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="text-white/80 hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-white/80 hover:text-white transition-colors">News</Link></li>
                <li><Link href="/contact" className="text-white/80 hover:text-white transition-colors">Contact us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><Link href="/blog" className="text-white/80 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-white/80 hover:text-white transition-colors">Infographics</Link></li>
                <li><Link href="#" className="text-white/80 hover:text-white transition-colors">Templates</Link></li>
                <li><Link href="#" className="text-white/80 hover:text-white transition-colors">TUTORIALS</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link href="/terms" className="text-white/80 hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/privacy" className="text-white/80 hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="#" className="text-white/80 hover:text-white transition-colors">Cookies</Link></li>
                <li><Link href="#" className="text-white/80 hover:text-white transition-colors">Licenses</Link></li>
                <li><Link href="#" className="text-white/80 hover:text-white transition-colors">Settings</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
            <div className="flex space-x-4 order-2 sm:order-1 mt-4 sm:mt-0">
                <Link href="#" aria-label="Youtube"><Youtube className="h-6 w-6 text-white/80 hover:text-white"/></Link>
                <Link href="#" aria-label="Facebook"><Facebook className="h-6 w-6 text-white/80 hover:text-white"/></Link>
                <Link href="#" aria-label="Twitter"><Twitter className="h-6 w-6 text-white/80 hover:text-white"/></Link>
                <Link href="#" aria-label="Instagram"><Instagram className="h-6 w-6 text-white/80 hover:text-white"/></Link>
                <Link href="#" aria-label="LinkedIn"><Linkedin className="h-6 w-6 text-white/80 hover:text-white"/></Link>
            </div>
          <p className="text-white/60 order-1 sm:order-2">© {new Date().getFullYear()} Paymint. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
