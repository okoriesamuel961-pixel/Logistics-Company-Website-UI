import amazonLogo  from '../../imports/pngwing.com__10_-1.png';
import shopifyLogo from '../../imports/pngwing.com__11_-1.png';
import walmartLogo from '../../imports/pngwing.com__12_-1.png';
import fedexLogo   from '../../imports/pngwing.com__13_-1.png';
import dhlLogo     from '../../imports/pngwing.com__14_-1.png';
import ebayLogo    from '../../imports/pngwing.com__15_.png';
import maerskLogo  from '../../imports/pngwing.com__16_.png';
import bestbuyLogo from '../../imports/pngwing.com__17_.png';

const LOGOS = [
  { name: 'Amazon',   src: amazonLogo,  h: 'h-8'  },
  { name: 'Shopify',  src: shopifyLogo, h: 'h-9'  },
  { name: 'Walmart',  src: walmartLogo, h: 'h-9'  },
  { name: 'FedEx',    src: fedexLogo,   h: 'h-8'  },
  { name: 'DHL',      src: dhlLogo,     h: 'h-8'  },
  { name: 'eBay',     src: ebayLogo,    h: 'h-9'  },
  { name: 'Maersk',   src: maerskLogo,  h: 'h-8'  },
  { name: 'Best Buy', src: bestbuyLogo, h: 'h-12' },
];

const doubled = [...LOGOS, ...LOGOS];

export function TrustedCompanies() {
  return (
    <section className="pt-0 pb-10 bg-white dark:bg-[#0f172a] border-b border-[#e2e8f0] dark:border-[#1e293b] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-8 mb-6">
        <span className="block text-center text-[#ff6b35] font-semibold text-sm md:text-base uppercase tracking-wider">
          Trusted by leading companies worldwide
        </span>
      </div>

      <div className="relative">
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-[#0f172a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-[#0f172a] to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <div
            className="flex items-center gap-8 sm:gap-12 lg:gap-16 shrink-0"
            style={{ animation: 'marquee 40s linear infinite', willChange: 'transform' }}
          >
            {doubled.map((logo, i) => (
              <div key={i} className="shrink-0 flex items-center justify-center px-2">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className={`${logo.h} w-auto object-contain dark:invert`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
