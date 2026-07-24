import { Package, Facebook, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

const footerLinks: Record<string, { label: string; to: string; hash?: string }[]> = {
  Services: [
    { label: 'Freight Forwarding',     to: '/', hash: 'services' },
    { label: 'Warehouse Management',   to: '/', hash: 'services' },
    { label: 'Last-Mile Delivery',     to: '/', hash: 'services' },
    { label: 'International Shipping', to: '/', hash: 'services' },
  ],
  Company: [
    { label: 'About Us',  to: '/', hash: 'about'   },
    { label: 'Our Team',  to: '/', hash: 'team'    },
    { label: 'Careers',   to: '/', hash: 'contact' },
    { label: 'Partners',  to: '/', hash: 'contact' },
  ],
  Support: [
    { label: 'Track Shipment', to: '/track-shipment'    },
    { label: 'Get a Quote',    to: '/get-quote'         },
    { label: 'Contact Us',     to: '/', hash: 'contact' },
    { label: 'FAQ',            to: '/', hash: 'faq'     },
  ],
};

function FooterLink({ to, hash, label }: { to: string; hash?: string; label: string }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!hash) return;
    const scrollTo = () => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
    const isHome =
      window.location.pathname === '/' ||
      window.location.pathname === (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/';
    if (isHome) {
      scrollTo();
    } else {
      navigate(to);
      setTimeout(scrollTo, 300);
    }
  };

  if (hash) {
    return (
      <button onClick={handleClick} className="text-gray-400 hover:text-[#ff6b35] transition-colors text-base text-left">
        {label}
      </button>
    );
  }
  return (
    <Link to={to} className="text-gray-400 hover:text-[#ff6b35] transition-colors text-base">
      {label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#0f172a] dark:bg-[#080d14] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#ff6b35] rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold">SwiftLogix</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm text-base">
              Your trusted partner for fast, reliable, and smart logistics solutions worldwide.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/10 hover:bg-[#ff6b35] hover:scale-110 hover:shadow-lg hover:shadow-[#ff6b35]/20 rounded-lg flex items-center justify-center transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <FooterLink to={link.to} hash={link.hash} label={link.label} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-3">Subscribe to our newsletter</h4>
              <div className="flex gap-2 max-w-md">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-white placeholder-gray-400 text-base"
                  />
                </div>
                <button className="px-6 py-3 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff5722] hover:shadow-lg hover:shadow-[#ff6b35]/20 transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400 text-base">
          <p>&copy; 2026 SwiftLogix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
