
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Download, ThumbsDown, ThumbsUp } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";


export default function CookiesPolicyPage() {
  const { toast } = useToast();
  const [lastUpdated, setLastUpdated] = useState<string>('...');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  const handleSaveChanges = () => {
    toast({
        title: "Preferences Saved",
        description: "Your cookie settings have been updated.",
    });
  }

  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-semibold text-primary mb-1">Terms & Policies</p>
        <h1 className="text-5xl font-bold tracking-tight text-foreground">Cookie Policy</h1>
        <p className="mt-2 text-muted-foreground">Last updated: {lastUpdated}</p>
         <Button variant="default" className="mt-6">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
        </Button>
      </div>
      <article className="space-y-4 text-foreground/80 leading-relaxed prose prose-neutral max-w-none">
        <p>This Cookie Policy explains how Paymint ("we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our websites. It explains what these technologies are and why we use them, as well as your rights to control our use of them.</p>

        <h2 className="text-2xl font-bold text-foreground pt-4">1. What are cookies?</h2>
        <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>

        <h2 className="text-2xl font-bold text-foreground pt-4">2. Why do we use cookies?</h2>
        <p>We use first and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Websites to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties.</p>
        
        <h2 className="text-2xl font-bold text-foreground pt-4">3. Types of cookies we use</h2>
        <ul>
            <li><strong>Strictly Necessary Cookies:</strong> These cookies are essential to provide you with services available through our Websites and to enable you to use some of its features.</li>
            <li><strong>Performance and Functionality Cookies:</strong> These cookies are used to enhance the performance and functionality of our Websites but are non-essential to their use.</li>
            <li><strong>Analytics and Customization Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our Websites are being used or how effective our marketing campaigns are.</li>
            <li><strong>Advertising Cookies:</strong> These cookies are used to make advertising messages more relevant to you.</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground pt-4">4. How can I control cookies?</h2>
        <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager below. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.</p>
        
      </article>

      <section id="settings" className="mt-16 scroll-mt-24">
        <Card>
            <CardHeader>
                <CardTitle>Cookie Consent Manager</CardTitle>
                <CardDescription>Manage your cookie preferences for our website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="essential-cookies" className="font-semibold">Strictly Necessary Cookies</Label>
                        <Switch id="essential-cookies" checked disabled />
                    </div>
                    <p className="text-sm text-muted-foreground">These cookies are essential for you to browse the website and use its features, such as accessing secure areas of the site. They cannot be disabled.</p>
                </div>
                <div className="space-y-2 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="performance-cookies" className="font-semibold">Performance & Functionality Cookies</Label>
                        <Switch id="performance-cookies" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground">These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.</p>
                </div>
                <div className="space-y-2 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="analytics-cookies" className="font-semibold">Analytics & Customization Cookies</Label>
                        <Switch id="analytics-cookies" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground">These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are.</p>
                </div>
                <div className="space-y-2 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="advertising-cookies" className="font-semibold">Advertising Cookies</Label>
                        <Switch id="advertising-cookies" />
                    </div>
                    <p className="text-sm text-muted-foreground">These cookies are used to make advertising messages more relevant to you and your interests. They perform functions like preventing the same ad from continuously reappearing.</p>
                </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
                <Button onClick={handleSaveChanges}>Save Changes</Button>
            </CardFooter>
      </Card>
      </section>

       <Card className="mt-16 bg-muted">
            <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="font-semibold text-foreground">Was this article helpful?</p>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="bg-background"><ThumbsUp className="mr-2 h-4 w-4" /> Yes</Button>
                    <Button variant="outline" className="bg-background"><ThumbsDown className="mr-2 h-4 w-4" /> No</Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
