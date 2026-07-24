import { Bell, MapPin, Package, Download, Wifi, Battery, Signal } from 'lucide-react';

export function MobileApp() {
  const features = [
    { icon: MapPin,   title: 'Real-time Tracking',      description: 'Monitor your shipments on the go' },
    { icon: Bell,     title: 'Delivery Notifications',  description: 'Get instant alerts and updates'    },
    { icon: Package,  title: 'Route Updates',           description: 'View detailed delivery routes'     },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-40" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Phone mockup ─────────────────────────────────────────── */}
          <div className="order-2 lg:order-1 flex justify-center">
            <div className="relative" style={{ perspective: '1000px' }}>

              {/* Glow behind phone */}
              <div className="absolute inset-0 rounded-[3rem] blur-3xl opacity-30 bg-[#ff6b35] scale-90 translate-y-8" />

              {/* Outer shell */}
              <div
                className="relative w-[270px] rounded-[3.25rem] shadow-2xl"
                style={{
                  background: 'linear-gradient(145deg, #2d3748 0%, #1a202c 40%, #2d3748 100%)',
                  padding: '3px',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)',
                }}
              >
                {/* Side buttons – volume */}
                <div className="absolute -left-[4px] top-24 w-[4px] h-8 rounded-l-md bg-[#374151]" />
                <div className="absolute -left-[4px] top-36 w-[4px] h-8 rounded-l-md bg-[#374151]" />
                {/* Side buttons – power */}
                <div className="absolute -right-[4px] top-28 w-[4px] h-12 rounded-r-md bg-[#374151]" />

                {/* Inner bezel */}
                <div
                  className="rounded-[3rem] overflow-hidden"
                  style={{ background: '#0a0f1a' }}
                >
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-6 pt-4 pb-2 bg-[#0a0f1a]">
                    <span className="text-white text-[11px] font-semibold">9:41</span>
                    <div className="flex items-center gap-1.5">
                      <Signal className="w-3 h-3 text-white" />
                      <Wifi className="w-3 h-3 text-white" />
                      <Battery className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>

                  {/* Dynamic island */}
                  <div className="flex justify-center -mt-1 mb-2">
                    <div className="w-24 h-6 bg-black rounded-full" />
                  </div>

                  {/* App header */}
                  <div className="flex items-center justify-between px-5 pb-3">
                    <div>
                      <p className="text-[#94a3b8] text-[10px]">Good morning,</p>
                      <p className="text-white text-sm font-semibold">Alex 👋</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#ff6b35] flex items-center justify-center">
                      <span className="text-white text-xs font-bold">A</span>
                    </div>
                  </div>

                  {/* Map strip */}
                  <div className="mx-4 rounded-2xl overflow-hidden h-32 relative mb-3">
                    <div className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(135deg, #1e3a5f 0%, #164e63 30%, #0f3460 60%, #1a365d 100%)',
                      }}
                    />
                    {/* Grid lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#60a5fa" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                    {/* Route line */}
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 30 100 Q 100 40 210 25" stroke="#ff6b35" strokeWidth="2" fill="none" strokeDasharray="4 3" />
                      <circle cx="30" cy="100" r="5" fill="#22c55e" />
                      <circle cx="210" cy="25" r="5" fill="#ff6b35" />
                    </svg>
                    {/* Live badge */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[9px] text-white font-medium">LIVE</span>
                    </div>
                    {/* Driver pin */}
                    <div className="absolute top-5 right-16 w-7 h-7 bg-[#ff6b35] rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                      <Package className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>

                  {/* Active shipment card */}
                  <div className="mx-4 bg-[#ff6b35] rounded-2xl p-3.5 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-[10px] font-medium uppercase tracking-wide">Active Shipment</span>
                      <span className="text-orange-200 text-[10px]">ETA 2h 15m</span>
                    </div>
                    <p className="text-white text-xs font-semibold mb-2">TRK-2024-8492</p>
                    <div className="flex items-center gap-1.5">
                      <div className="flex-1 h-1 rounded-full bg-white/30">
                        <div className="h-full w-[72%] rounded-full bg-white" />
                      </div>
                      <span className="text-orange-200 text-[9px]">72%</span>
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="text-orange-200 text-[9px]">New York, NY</span>
                      <span className="text-white text-[9px] font-medium">Boston, MA</span>
                    </div>
                  </div>

                  {/* Recent list */}
                  <div className="px-4 mb-2">
                    <p className="text-[#64748b] text-[10px] font-medium mb-2 uppercase tracking-wide">Recent</p>
                    <div className="space-y-2">
                      {[
                        { id: 'TRK-2024-7381', dest: 'Detroit, MI',       badge: 'Out for Delivery', color: 'text-amber-400',  bg: 'bg-amber-500/10' },
                        { id: 'TRK-2024-6295', dest: 'Atlanta, GA',       badge: 'In Transit',       color: 'text-blue-400',   bg: 'bg-blue-500/10'  },
                        { id: 'TRK-2024-5183', dest: 'San Francisco, CA', badge: 'Delivered',        color: 'text-green-400',  bg: 'bg-green-500/10' },
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-[#1e293b] flex items-center justify-center">
                              <MapPin className="w-2.5 h-2.5 text-[#ff6b35]" />
                            </div>
                            <div>
                              <p className="text-white text-[10px] font-medium leading-none mb-0.5">{item.id}</p>
                              <p className="text-[#64748b] text-[9px]">{item.dest}</p>
                            </div>
                          </div>
                          <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${item.color} ${item.bg}`}>
                            {item.badge}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom nav bar */}
                  <div className="flex justify-around items-center px-4 pt-3 pb-5 border-t border-white/5">
                    {[
                      { label: 'Home',    active: false },
                      { label: 'Track',   active: true  },
                      { label: 'History', active: false },
                      { label: 'Profile', active: false },
                    ].map((tab) => (
                      <div key={tab.label} className="flex flex-col items-center gap-1">
                        <div className={`w-5 h-1 rounded-full ${tab.active ? 'bg-[#ff6b35]' : 'bg-transparent'}`} />
                        <span className={`text-[9px] font-medium ${tab.active ? 'text-[#ff6b35]' : 'text-[#475569]'}`}>
                          {tab.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating notification */}
              <div className="absolute -right-10 top-20 bg-white rounded-2xl shadow-2xl px-4 py-3 w-44">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Package className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className="text-[10px] font-semibold text-[#0f172a]">Package Update</span>
                </div>
                <p className="text-[9px] text-[#64748b]">Your order is out for delivery. Arriving in 2h 15m.</p>
              </div>
            </div>
          </div>

          {/* ── Copy ─────────────────────────────────────────────────── */}
          <div className="order-1 lg:order-2">
            <span className="text-[#ff6b35] font-semibold text-base uppercase tracking-wider">
              Mobile App
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 mb-6">
              Track Shipments On The Go
            </h2>
            <p className="text-base text-gray-300 mb-8">
              Download our mobile app for iOS and Android to manage your logistics from anywhere. Stay connected with real-time updates and notifications.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#ff6b35]/10 border border-[#ff6b35]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#ff6b35]" />
                    </div>
                    <div>
                      <h4 className="text-lg text-white font-medium mb-1">{feature.title}</h4>
                      <p className="text-base text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center gap-3 px-6 py-3 bg-white text-[#0f172a] rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-gray-500">Download on the</p>
                  <p className="font-semibold text-sm">App Store</p>
                </div>
              </button>
              <button className="flex items-center gap-3 px-6 py-3 bg-white text-[#0f172a] rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M3.18 23.76c.3.17.64.24.99.19l13.1-7.57-2.79-2.79-11.3 10.17z" fill="#EA4335"/>
                  <path d="M21.8 10.25l-2.87-1.66-3.14 3.14 3.14 3.14 2.9-1.68a1.66 1.66 0 000-2.94z" fill="#FBBC05"/>
                  <path d="M3.18.24A1.65 1.65 0 002 1.76v20.48c0 .64.35 1.18.88 1.47L14.49 12 3.18.24z" fill="#4285F4"/>
                  <path d="M4.17.43L15.88 12 13.1 14.78 3.18.24a1.6 1.6 0 011-.19l-.01.38z" fill="#34A853"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-gray-500">Get it on</p>
                  <p className="font-semibold text-sm">Google Play</p>
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
