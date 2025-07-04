import Link from 'next/link';
import { Twitter, Github, Linkedin } from 'lucide-react';

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="12" fill="hsl(var(--primary))" />
        <path
          d="M14.488 8H11V20H14.488V15.564H17.332C19.932 15.564 21.5 13.848 21.5 11.784C21.5 9.72 19.932 8 17.332 8H14.488ZM14.488 12.94V10.628H17.2C18.3 10.628 18.928 11.064 18.928 11.784C18.928 12.504 18.3 12.94 17.2 12.94H14.488Z"
          fill="hsl(var(--primary-foreground))"
          transform="translate(-2, -2)"
        />
      </svg>
      <span className="text-xl font-semibold">
        Paymint
      </span>
    </div>
  );
}

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" aria-label="Home">
            <Logo />
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-12 md:py-16 lg:py-20">
            {children}
        </div>
      </main>

      <footer className="bg-muted border-t">
        <div className="container py-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-4">
            <div className="space-y-4">
              <Logo />
              <p className="text-sm text-muted-foreground max-w-xs">
                Financial Management, Reimagined. Take control of your finances with Paymint.
              </p>
              <div className="flex space-x-4">
                  <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
                  <Link href="#" aria-label="Github"><Github className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
                  <Link href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:col-span-3">
              <div>
                <h4 className="font-semibold mb-3">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/#features" className="text-muted-foreground hover:text-primary">Features</Link></li>
                  <li><Link href="/#pricing" className="text-muted-foreground hover:text-primary">Pricing</Link></li>
                  <li><Link href="/register" className="text-muted-foreground hover:text-primary">Sign Up</Link></li>
                </ul>
              </div>
              <div>
                 <h4 className="font-semibold mb-3">Company</h4>
                 <ul className="space-y-2 text-sm">
                  <li><Link href="#" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-primary">Blog</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-primary">Careers</Link></li>
                </ul>
              </div>
              <div>
                 <h4 className="font-semibold mb-3">Legal</h4>
                 <ul className="space-y-2 text-sm">
                  <li><Link href="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                  <li><Link href="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Paymint Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
