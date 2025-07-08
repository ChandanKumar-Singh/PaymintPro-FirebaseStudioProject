
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function PrivacyPolicyPage() {
  const [lastUpdated, setLastUpdated] = useState<string>('...');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-semibold text-primary mb-1">Terms & Policies</p>
        <h1 className="text-5xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
        <p className="mt-2 text-muted-foreground">Last updated: {lastUpdated}</p>
         <Button variant="default" className="mt-6">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
        </Button>
      </div>
      <article className="space-y-4 text-foreground/80 leading-relaxed prose prose-neutral max-w-none">
        <p>Welcome to Paymint ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.</p>

        <h2 className="text-2xl font-bold text-foreground pt-4">1. Information We Collect</h2>
        <p>We may collect personal information that you provide to us directly, such as your name, email address, and financial information when you register for an account, connect your financial accounts, or communicate with us.</p>
        <p>We also collect information automatically when you use our service, including your IP address, device information, and browsing activity.</p>

        <h2 className="text-2xl font-bold text-foreground pt-4">2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, operate, and maintain our services.</li>
          <li>Improve, personalize, and expand our services.</li>
          <li>Understand and analyze how you use our services.</li>
          <li>Develop new products, services, features, and functionality.</li>
          <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the webapp, and for marketing and promotional purposes.</li>
          <li>Process your transactions and prevent fraudulent transactions.</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground pt-4">3. Sharing Your Information</h2>
        <p>We do not share your personal information with third parties except as described in this Privacy Policy. We may share your information with third-party vendors and service providers that perform services for us, or with law enforcement if required by law.</p>
        
        <h2 className="text-2xl font-bold text-foreground pt-4">4. Security of Your Information</h2>
        <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

        <h2 className="text-2xl font-bold text-foreground pt-4">5. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.</p>

        <h2 className="text-2xl font-bold text-foreground pt-4">6. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@paymint.com" className="text-primary font-semibold">privacy@paymint.com</a>.</p>
      </article>

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
