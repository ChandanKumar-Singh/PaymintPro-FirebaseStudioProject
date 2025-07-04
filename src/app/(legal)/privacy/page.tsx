export default function PrivacyPolicyPage() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <p>Welcome to Paymint ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.</p>

      <h2>1. Information We Collect</h2>
      <p>We may collect personal information that you provide to us directly, such as your name, email address, and financial information when you register for an account, connect your financial accounts, or communicate with us.</p>

      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide, operate, and maintain our services.</li>
        <li>Improve, personalize, and expand our services.</li>
        <li>Understand and analyze how you use our services.</li>
        <li>Develop new products, services, features, and functionality.</li>
        <li>Communicate with you, either directly or through one of our partners.</li>
      </ul>

      <h2>3. Sharing Your Information</h2>
      <p>We do not share your personal information with third parties except as described in this Privacy Policy. We may share your information with third-party vendors and service providers that perform services for us.</p>
      
      <h2>4. Security of Your Information</h2>
      <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>

      <h2>5. Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

      <h2>6. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at contact@paymint.com.</p>
    </article>
  );
}
