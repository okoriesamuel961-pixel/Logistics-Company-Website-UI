import { TrendingUp, Users, Globe, Target } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export function Statistics() {
  const stats = [
    { icon: TrendingUp, value: '10,000+', label: 'Monthly Deliveries',     color: 'text-[#ff6b35]'  },
    { icon: Users,      value: '500+',    label: 'Business Clients',        color: 'text-blue-500'   },
    { icon: Globe,      value: '50+',     label: 'Countries Served',        color: 'text-green-500'  },
    { icon: Target,     value: '99.8%',   label: 'Delivery Success Rate',   color: 'text-purple-500' },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-[#0f172a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1735047974891-df59713d8192?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxjYXJnbyUyMGNvbnRhaW5lcnMlMjBzaGlwcGluZyUyMHBvcnR8ZW58MXx8fHwxNzc4NTA4NzgzfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#ff6b35] font-semibold text-base uppercase tracking-wider">Our Impact</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] dark:text-[#f1f5f9] mt-3 mb-4">
            Trusted by Thousands Worldwide
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-sm rounded-2xl py-6 px-4 border border-[#e2e8f0] dark:border-[#334155] hover:shadow-xl dark:hover:shadow-[#000]/30 transition-all"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-[#f8fafc] dark:bg-[#0f172a] rounded-xl mb-4">
                  <Icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div className="text-4xl lg:text-[40px] font-bold text-[#0f172a] dark:text-[#f1f5f9] mb-2">{stat.value}</div>
                <p className="text-base font-semibold text-[#64748b] dark:text-[#94a3b8]">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
