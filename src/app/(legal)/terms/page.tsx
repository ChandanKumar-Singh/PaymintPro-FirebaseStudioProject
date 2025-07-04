export default function TermsOfServicePage() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Terms of Service</h1>
      <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Paymint application (the "Service") operated by Paymint Inc. ("us", "we", or "our").</p>

      <h2>1. Accounts</h2>
      <p>When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>

      <h2>2. Intellectual Property</h2>
      <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Paymint Inc. and its licensors.</p>
      
      <h2>3. Links To Other Web Sites</h2>
      <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by Paymint Inc. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.</p>

      <h2>4. Termination</h2>
      <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
      
      <h2>5. Governing Law</h2>
      <p>These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which our company is established, without regard to its conflict of law provisions.</p>

      <h2>6. Changes</h2>
      <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect.</p>

      <h2>7. Contact Us</h2>
      <p>If you have any questions about these Terms, please contact us at contact@paymint.com.</p>
    </article>
  );
}
