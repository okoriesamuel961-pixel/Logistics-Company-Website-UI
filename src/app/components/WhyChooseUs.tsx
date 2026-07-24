import { Zap, Headphones, Globe, Shield, DollarSign, Smartphone } from 'lucide-react';

export function WhyChooseUs() {
  const features = [
    {
      icon: Zap, title: 'Fast Delivery', color: 'text-yellow-500', bg: 'bg-yellow-500/10',
      description: 'We offer a full range of express shipping options with guaranteed delivery windows tailored to your urgency. Whether it\'s same-day, next-day, or time-definite freight, our optimised routing ensures your shipment arrives on time, every time.',
    },
    {
      icon: Headphones, title: '24/7 Support', color: 'text-blue-500', bg: 'bg-blue-500/10',
      description: 'Our dedicated customer support team is always on standby — day or night, weekends and holidays. Whether you need help tracking a shipment, resolving a delay, or planning a complex delivery, our experts are just a call or message away.',
    },
    {
      icon: Globe, title: 'Global Coverage', color: 'text-green-500', bg: 'bg-green-500/10',
      description: 'With an active delivery network spanning 50+ countries and partnerships with leading carriers worldwide, SwiftLogix ensures your cargo reaches virtually any destination — across continents, borders, and time zones — without disruption.',
    },
    {
      icon: Shield, title: 'Secure Handling', color: 'text-purple-500', bg: 'bg-purple-500/10',
      description: 'Every shipment is handled with the highest standards of care, backed by advanced cargo insurance and rigorous security protocols. From fragile electronics to bulk freight, we ensure your goods arrive intact, verified, and fully protected.',
    },
    {
      icon: DollarSign, title: 'Affordable Pricing', color: 'text-[#ff6b35]', bg: 'bg-[#ff6b35]/10',
      description: 'We offer highly competitive rates with a fully transparent pricing structure — no hidden fees, no surprises. Our flexible plans scale to businesses of any size, ensuring you get maximum value without compromising on service quality.',
    },
    {
      icon: Smartphone, title: 'Smart Tracking', color: 'text-pink-500', bg: 'bg-pink-500/10',
      description: 'Our AI-powered tracking system continuously analyses route data and carrier performance to deliver precise, real-time delivery estimates. Get predictive ETAs, proactive delay alerts, and full shipment visibility right from your dashboard.',
    },
  ];

  return (
    <section id="about" className="py-12 md:py-16 lg:py-20 bg-[#f8fafc] dark:bg-[#0a0f1a]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <span className="text-[#ff6b35] font-semibold text-base uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] dark:text-[#f1f5f9] mt-3 mb-4">
            The SwiftLogix Advantage
          </h2>
          <p className="text-base text-[#64748b] dark:text-[#94a3b8] max-w-2xl mx-auto">
            Experience the difference with our cutting-edge logistics solutions and customer-first approach.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white dark:bg-[#1e293b] rounded-xl md:rounded-2xl p-6 md:p-8 border border-[#e2e8f0] dark:border-[#334155] hover:shadow-lg dark:hover:shadow-[#000]/30 transition-all"
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 ${feature.bg} rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6`}>
                  <Icon className={`w-6 h-6 md:w-7 md:h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-[#0f172a] dark:text-[#f1f5f9] mb-2 md:mb-3">{feature.title}</h3>
                <p className="text-base font-medium text-[#64748b] dark:text-[#94a3b8] leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
