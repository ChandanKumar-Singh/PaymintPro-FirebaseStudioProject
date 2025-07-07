import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

const productLinks = ["Personal", "Business", "Paymint Card", "Pricing"];
const companyLinks = ["About us", "Careers", "Blog", "Contact us"];
const supportLinks = ["Help center", "FAQ", "Security"];

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
       <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="hsl(var(--primary))"/>
        <path d="M19.3173 10.6667H14.6667V26.6667H19.3173V20.752H22.4427C25.5733 20.752 27.3333 18.464 27.3333 15.712C27.3333 12.96 25.5733 10.6667 22.4427 10.6667H19.3173ZM19.3173 17.2533V14.1707H22.2667C23.5733 14.1707 24.2773 14.752 24.2773 15.712C24.2773 16.672 23.5733 17.2533 22.2667 17.2533H19.3173Z" fill="white"/>
       </svg>
      <span className="text-2xl font-bold">Paymint</span>
    </div>
  );
}


export function LandingFooter() {
  return (
    <footer className="bg-muted/30 pt-16 sm:pt-24 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <Link href="/" className="mb-6 block">
              <Logo />
            </Link>
            <p className="text-muted-foreground mb-6">
              The secure and easy way to manage your finances.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Twitter"><Twitter className="h-6 w-6 text-muted-foreground hover:text-primary" /></Link>
              <Link href="#" aria-label="LinkedIn"><Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary" /></Link>
              <Link href="#" aria-label="Facebook"><Facebook className="h-6 w-6 text-muted-foreground hover:text-primary" /></Link>
              <Link href="#" aria-label="Instagram"><Instagram className="h-6 w-6 text-muted-foreground hover:text-primary" /></Link>
            </div>
          </div>
          
          <div className="lg:col-span-8 grid sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-lg mb-4">Product</h4>
              <ul className="space-y-3">
                {productLinks.map(link => (
                  <li key={link}><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">{link}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map(link => (
                  <li key={link}><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">{link}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Support</h4>
              <ul className="space-y-3">
                {supportLinks.map(link => (
                  <li key={link}><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">{link}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="text-muted-foreground">&copy; {new Date().getFullYear()} Paymint. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
