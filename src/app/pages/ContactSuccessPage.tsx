import { CheckCircle, Home, MessageSquare, Phone, Mail, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router';

export function ContactSuccessPage() {
  const location = useLocation();
  const { name, email } = (location.state as { name: string; email: string }) || {};

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0a0f1a] pt-20 md:pt-24 flex items-center">
      <div className="max-w-2xl mx-auto px-5 sm:px-6 lg:px-8 py-12 w-full">

        {/* Success icon */}
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-14 h-14 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] dark:text-[#f1f5f9] mb-4">
            Message Sent!
          </h1>
          <p className="text-base md:text-lg text-[#64748b] dark:text-[#94a3b8] max-w-md mx-auto">
            {name ? `Thanks, ${name}!` : 'Thank you!'} Your message has been received. Our team will get back to you shortly.
          </p>
          {email && (
            <p className="text-sm text-[#94a3b8] mt-2">
              A confirmation has been sent to <span className="font-medium text-[#ff6b35]">{email}</span>
            </p>
          )}
        </div>

        {/* What to expect card */}
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 md:p-8 border border-[#e2e8f0] dark:border-[#334155] mb-6">
          <h2 className="text-lg font-bold text-[#0f172a] dark:text-[#f1f5f9] mb-5 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#ff6b35]" />
            What happens next?
          </h2>
          <div className="space-y-4">
            {[
              { step: '01', title: 'Message received', desc: 'We\'ve logged your inquiry and it\'s been assigned to the right team.' },
              { step: '02', title: 'Review within 2 hours', desc: 'Our support team reviews all messages during business hours (Mon–Fri, 8am–8pm EST).' },
              { step: '03', title: 'We\'ll reach out', desc: 'Expect a reply via email within 24 hours, or sooner for urgent matters.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4">
                <div className="w-9 h-9 bg-[#ff6b35]/10 dark:bg-[#ff6b35]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-[#ff6b35]">{step}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0f172a] dark:text-[#f1f5f9]">{title}</p>
                  <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact alternatives */}
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-[#e2e8f0] dark:border-[#334155] mb-8">
          <p className="text-sm font-semibold text-[#475569] dark:text-[#94a3b8] mb-4">Need an urgent response? Reach us directly:</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="tel:+18001234567" className="flex items-center gap-2 text-sm text-[#64748b] dark:text-[#94a3b8] hover:text-[#ff6b35] dark:hover:text-[#ff6b35] transition-colors">
              <Phone className="w-4 h-4 text-[#ff6b35]" />
              +1 (800) 123-4567
            </a>
            <span className="hidden sm:inline text-[#e2e8f0] dark:text-[#334155]">|</span>
            <a href="mailto:support@swiftlogix.com" className="flex items-center gap-2 text-sm text-[#64748b] dark:text-[#94a3b8] hover:text-[#ff6b35] dark:hover:text-[#ff6b35] transition-colors">
              <Mail className="w-4 h-4 text-[#ff6b35]" />
              support@swiftlogix.com
            </a>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="flex-1 px-6 py-4 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff5722] hover:shadow-lg hover:shadow-[#ff6b35]/20 transition-all flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            to="/get-quote"
            className="flex-1 px-6 py-4 bg-white dark:bg-[#1e293b] border-2 border-[#e2e8f0] dark:border-[#334155] text-[#0f172a] dark:text-[#f1f5f9] rounded-lg hover:border-[#ff6b35] dark:hover:border-[#ff6b35] hover:shadow-md transition-all flex items-center justify-center gap-2 text-sm font-medium"
          >
            Get a Quote
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
