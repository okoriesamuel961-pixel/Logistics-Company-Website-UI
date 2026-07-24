import { Truck, Warehouse, MapPin, Globe, ShoppingCart, Package } from 'lucide-react';

export function ServicesSection() {
  const services = [
    { icon: Truck,         title: 'Freight Forwarding',     description: 'Efficient transportation of goods across land, sea, and air with complete tracking and insurance.' },
    { icon: Warehouse,     title: 'Warehouse Management',   description: 'State-of-the-art storage facilities with climate control and 24/7 security monitoring.' },
    { icon: MapPin,        title: 'Last-Mile Delivery',     description: 'Fast and reliable final delivery to customers with real-time GPS tracking and notifications.' },
    { icon: Globe,         title: 'International Shipping', description: 'Seamless cross-border logistics with customs clearance and documentation support.' },
    { icon: ShoppingCart,  title: 'E-commerce Logistics',   description: 'End-to-end fulfillment solutions optimized for online retailers and marketplaces.' },
    { icon: Package,       title: 'Cargo Handling',         description: 'Professional handling of all cargo types including fragile, hazardous, and oversized items.' },
  ];

  return (
    <section id="services" className="py-12 md:py-16 lg:py-20 bg-[#f8fafc] dark:bg-[#0a0f1a]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <span className="text-[#ff6b35] font-semibold text-sm md:text-base uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] dark:text-[#f1f5f9] mt-2 md:mt-3 mb-3 md:mb-4">
            Complete Logistics Solutions
          </h2>
          <p className="text-base text-[#64748b] dark:text-[#94a3b8] max-w-2xl mx-auto">
            From warehousing to last-mile delivery, we provide comprehensive logistics services tailored to your business needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group bg-white dark:bg-[#1e293b] rounded-xl md:rounded-2xl p-6 md:p-8 border border-[#e2e8f0] dark:border-[#334155] hover:border-[#ff6b35] dark:hover:border-[#ff6b35] hover:shadow-xl dark:hover:shadow-[#000]/30 transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#ff6b35]/10 dark:bg-[#ff6b35]/20 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-[#ff6b35] transition-colors">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#ff6b35] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl lg:text-2xl text-[#0f172a] dark:text-[#f1f5f9] mb-2 md:mb-3">{service.title}</h3>
                <p className="text-base text-[#64748b] dark:text-[#94a3b8] leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
