import { Search, MapPin, Package, Truck, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export function TrackingSection() {
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      navigate(`/track-shipment?tracking=${encodeURIComponent(trackingNumber)}`);
    } else {
      navigate('/track-shipment');
    }
  };

  return (
    <section id="tracking" className="py-12 md:py-16 lg:py-20 bg-white dark:bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <span className="text-[#ff6b35] font-semibold text-base uppercase tracking-wider">Real-Time Tracking</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] dark:text-[#f1f5f9] mt-3 mb-6">
              Track Your Shipment in Real-Time
            </h2>
            <p className="text-base text-[#64748b] dark:text-[#94a3b8] mb-8">
              Stay informed every step of the way with our advanced tracking system. Get instant updates and accurate delivery estimates.
            </p>

            <div className="bg-[#f8fafc] dark:bg-[#1e293b] rounded-2xl p-6 border border-[#e2e8f0] dark:border-[#334155]">
              <form onSubmit={handleTrack}>
                <label className="block text-sm text-[#475569] dark:text-[#94a3b8] mb-3">Enter Tracking Number</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="e.g., TRK-2024-8492"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="flex-1 px-4 py-3 bg-white dark:bg-[#0f172a] border border-[#e2e8f0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-sm md:text-base text-[#0f172a] dark:text-[#f1f5f9] placeholder-[#94a3b8]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff5722] transition-colors flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base"
                  >
                    <Search className="w-5 h-5" />
                    Track
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div
            className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-2xl p-8 cursor-pointer hover:shadow-2xl transition-all"
            onClick={() => navigate('/track-shipment?tracking=TRK-2024-8492')}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-gray-400 text-sm mb-1">Tracking Number (Click to track)</p>
                <p className="text-white font-semibold hover:text-[#ff6b35] transition-colors">TRK-2024-8492</p>
              </div>
              <div className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
                <span className="text-green-400 text-sm font-medium">In Transit</span>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { icon: CheckCircle, label: 'Package Picked Up',  sub: 'New York Distribution Center', time: 'May 10, 2026 - 09:30 AM', lineColor: 'bg-green-500', done: true  },
                { icon: Truck,       label: 'In Transit',         sub: 'En route to Boston Hub',        time: 'May 11, 2026 - 06:15 AM', lineColor: 'bg-[#ff6b35]',  done: true  },
                { icon: Package,     label: 'Out for Delivery',   sub: 'Expected today by 2:00 PM',     time: 'Pending',                 lineColor: 'bg-gray-700',   done: false, current: true },
                { icon: MapPin,      label: 'Delivered',          sub: 'Awaiting delivery',             time: '',                        lineColor: '',              done: false },
              ].map((step, i, arr) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="flex gap-4">
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.current
                          ? 'bg-[#ff6b35]/20 border-2 border-[#ff6b35]'
                          : step.done ? 'bg-green-500' : 'bg-gray-700'
                      }`}>
                        <Icon className={`w-6 h-6 ${step.current ? 'text-[#ff6b35]' : step.done ? 'text-white' : 'text-gray-500'}`} />
                      </div>
                      {i < arr.length - 1 && (
                        <div className={`absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-12 ${step.lineColor}`} />
                      )}
                    </div>
                    <div className="flex-1 pb-12">
                      <p className="text-white mb-1">{step.label}</p>
                      <p className="text-gray-400 text-sm">{step.sub}</p>
                      {step.time && <p className="text-gray-500 text-xs mt-1">{step.time}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
