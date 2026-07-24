import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { question: 'How do I track my shipment?', answer: 'You can track your shipment using the tracking number provided in your confirmation email. Enter the tracking number on our website or mobile app to see real-time updates on your delivery status.' },
    { question: 'What are your delivery timeframes?', answer: 'Delivery times vary depending on the service level and destination. Standard domestic delivery takes 3-5 business days, express delivery takes 1-2 business days, and international shipping typically takes 7-14 business days.' },
    { question: 'Do you offer insurance for shipments?', answer: 'Yes, we offer comprehensive cargo insurance for all shipment types. Basic coverage is included in our standard pricing, and additional coverage can be purchased for high-value items at competitive rates.' },
    { question: 'How are shipping costs calculated?', answer: 'Shipping costs are calculated based on package weight, dimensions, destination, and service level. You can get an instant quote using our online calculator or by contacting our sales team for bulk shipping rates.' },
    { question: 'Can I schedule a pickup?', answer: 'Absolutely! You can schedule pickups through our website, mobile app, or by calling our customer service. We offer same-day pickup for requests made before 2 PM in most major cities.' },
    { question: 'What items are prohibited for shipping?', answer: 'We cannot ship hazardous materials, explosives, illegal substances, or perishable items without proper packaging and documentation. For a complete list of prohibited items and special handling requirements, please visit our shipping guidelines page.' },
  ];

  return (
    <section id="faq" className="py-12 md:py-16 lg:py-20 bg-white dark:bg-[#0f172a]">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <span className="text-[#ff6b35] font-semibold text-base uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] dark:text-[#f1f5f9] mt-3 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#64748b] dark:text-[#94a3b8]">
            Find answers to common questions about our logistics services
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[#e2e8f0] dark:border-[#334155] rounded-xl overflow-hidden bg-white dark:bg-[#1e293b] hover:shadow-md dark:hover:shadow-[#000]/20 transition-all"
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-[#243347] transition-colors rounded-xl"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg lg:text-[18px] text-[#0f172a] dark:text-[#f1f5f9] pr-8">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-[#ff6b35] flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-base text-[#64748b] dark:text-[#94a3b8] leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
