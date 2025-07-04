import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CheckCircle, BarChart, FileText, Sparkles, Twitter, Github, Linkedin } from 'lucide-react';
import { MobileNav } from '@/components/mobile-nav';

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

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" aria-label="Home">
            <Logo />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link href="#features" className="transition-colors hover:text-primary">Features</Link>
              <Link href="#pricing" className="transition-colors hover:text-primary">Pricing</Link>
              <Link href="#contact" className="transition-colors hover:text-primary">Contact</Link>
            </nav>
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                  <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          </div>
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-28 lg:py-32">
          <div className="container grid lg:grid-cols-2 gap-12 items-center px-4 md:px-6">
            <div className="space-y-6 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                    Financial Management, <span className="text-primary">Reimagined</span>.
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                    Paymint provides a seamless, intuitive, and intelligent platform to manage your finances. From invoicing to AI-powered advice, we've got you covered.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button size="lg" asChild>
                        <Link href="/register">Get Started Free</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="#features">Learn More</Link>
                    </Button>
                </div>
            </div>
            <div className="flex justify-center">
                <Image 
                    src="https://placehold.co/600x400.png"
                    data-ai-hint="dashboard fintech"
                    width={600}
                    height={400}
                    alt="Paymint Dashboard"
                    className="rounded-xl shadow-2xl"
                    priority
                />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-28 lg:py-32 bg-muted">
            <div className="container space-y-16 px-4 md:px-6">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold">Everything You Need, All in One Place</h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Powerful features to streamline your financial workflow and provide you with actionable insights.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <Card>
                        <CardHeader className="items-center text-center">
                            <div className="p-3 bg-primary/10 rounded-full mb-2">
                                <Sparkles className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>AI Financial Advisor</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center text-sm text-muted-foreground">
                            Get personalized financial advice by asking questions in plain English.
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="items-center text-center">
                             <div className="p-3 bg-primary/10 rounded-full mb-2">
                                <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>Effortless Invoicing</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center text-sm text-muted-foreground">
                            Create, send, and manage professional invoices in just a few clicks.
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="items-center text-center">
                            <div className="p-3 bg-primary/10 rounded-full mb-2">
                                <BarChart className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>Insightful Reporting</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center text-sm text-muted-foreground">
                            Visualize your financial data with comprehensive and easy-to-understand reports.
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="items-center text-center">
                            <div className="p-3 bg-primary/10 rounded-full mb-2">
                                <CheckCircle className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>Budget Tracking</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center text-sm text-muted-foreground">
                            Set budgets, track your spending, and achieve your financial goals with ease.
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-20 md:py-28 lg:py-32">
             <div className="container px-4 md:px-6">
                 <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Simple, Transparent Pricing</h2>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Choose the plan that's right for you. No hidden fees, ever.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
                     <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle>Starter</CardTitle>
                            <p className="text-4xl font-bold">$0<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                            <p>For individuals and freelancers getting started.</p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                               <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Basic Analytics</li>
                               <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> 5 Invoices/mo</li>
                               <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Basic Support</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant="outline" asChild><Link href="/register">Get Started</Link></Button>
                        </CardFooter>
                     </Card>
                     <Card className="flex flex-col border-primary shadow-lg ring-2 ring-primary">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>Pro</CardTitle>
                                <span className="text-xs font-semibold bg-primary text-primary-foreground px-2 py-1 rounded-full">Most Popular</span>
                            </div>
                            <p className="text-4xl font-bold">$20<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                            <p>For growing businesses that need more power.</p>
                             <ul className="space-y-2 text-sm text-muted-foreground">
                               <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Advanced Analytics</li>
                               <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Unlimited Invoices</li>
                               <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> AI Advisor Access</li>
                               <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Priority Support</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" asChild><Link href="/register">Choose Pro</Link></Button>
                        </CardFooter>
                     </Card>
                     <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle>Enterprise</CardTitle>
                            <p className="text-4xl font-bold">Custom</p>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                            <p>For large organizations with custom needs.</p>
                             <ul className="space-y-2 text-sm text-muted-foreground">
                               <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Custom Features</li>
                               <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Dedicated Support</li>
                               <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> SSO & Audit Logs</li>
                            </ul>
                        </CardContent>
                         <CardFooter>
                            <Button className="w-full" variant="outline" asChild><Link href="#contact">Contact Us</Link></Button>
                        </CardFooter>
                     </Card>
                </div>
             </div>
        </section>
      </main>

      <footer id="contact" className="bg-muted border-t">
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
                  <li><Link href="#features" className="text-muted-foreground hover:text-primary">Features</Link></li>
                  <li><Link href="#pricing" className="text-muted-foreground hover:text-primary">Pricing</Link></li>
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
