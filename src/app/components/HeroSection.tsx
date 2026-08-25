import { Search, Star, ArrowRight, MapPin } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { Link } from 'react-router';

const REVIEW_AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop',
];

export function HeroSection() {
  return (
    <section className="relative sm:min-h-screen overflow-hidden bg-[#0f172a]">

      {/* ── Full-bleed background image ── */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1724597500306-a4cbb7d1324e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMGNvbnRhaW5lciUyMHNoaXAlMjBzYWlsaW5nJTIwb2NlYW4lMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc4NDI5NDY5Mnww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Aerial view of cargo container ship"
          className="w-full h-full object-cover object-[center_65%] sm:object-center"
        />
        {/* Heavy dark on left → transparent on right so ship shows */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/75 to-[#0f172a]/10" />
        {/* Subtle top + bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/50 via-transparent to-[#0f172a]/80" />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start justify-between pt-28 sm:pt-32 md:pt-36 pb-10 sm:pb-52 md:pb-60">

          {/* Left: headline + CTAs */}
          <div className="max-w-xl lg:max-w-2xl w-full lg:w-auto text-center lg:text-left">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#ff6b35]/15 border border-[#ff6b35]/30 rounded-full mb-6 md:mb-8">
              <span className="w-2 h-2 bg-[#ff6b35] rounded-full animate-pulse flex-shrink-0" />
              <span className="text-[#ff6b35] text-sm font-medium">Trusted by 500+ Companies Worldwide</span>
            </div>

            {/* 2-line heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-white leading-[1.08] tracking-tight mb-6">
              Fast, Reliable<br />
              <span className="text-[#ff6b35]">&amp; Smart Logistics.</span>
            </h1>

            <p className="text-base md:text-lg text-gray-300 mb-8 md:mb-10 max-w-md leading-relaxed mx-auto lg:mx-0">
              Streamline your supply chain with cutting-edge delivery and warehousing services — from local last-mile to global freight forwarding.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/get-quote"
                className="px-7 py-4 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff5722] hover:shadow-lg hover:shadow-[#ff6b35]/30 transition-all flex items-center justify-center gap-2 font-medium"
              >
                Get a Quote
              </Link>
              <Link
                to="/track-shipment"
                className="px-7 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg hover:bg-white/20 hover:border-white/40 transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Track Shipment
              </Link>
            </div>
          </div>

          {/* Right: floating review card (desktop only) */}
          <div className="hidden lg:block mt-16 xl:mt-24 flex-shrink-0">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-2xl w-64">
              <div className="flex items-center justify-between mb-3">
                {/* Stacked avatars */}
                <div className="flex -space-x-2">
                  {REVIEW_AVATARS.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="w-9 h-9 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <button
                  onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-xs text-[#ff6b35] font-semibold flex items-center gap-0.5 hover:underline cursor-pointer"
                >
                  Leave a Review <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                Trusted by businesses of all sizes. See why companies trust our logistics services.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold text-[#0f172a] leading-none">4.8</span>
                <Star className="w-7 h-7 text-[#f59e0b] fill-[#f59e0b]" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom floating cards ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-6 sm:pb-8 flex items-end justify-between gap-4">

          {/* Bottom-left: service promo card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 hidden sm:flex items-start gap-4">
            <div className="flex-1">
              <span className="text-xs font-bold text-[#ff6b35] uppercase tracking-wider">Express</span>
              <h3 className="text-sm font-bold text-white mt-1 mb-2 leading-snug whitespace-nowrap">
                Book Express Delivery Today
              </h3>
              <Link
                to="/get-quote"
                className="text-xs text-[#ff6b35] font-semibold hover:underline flex items-center gap-1"
              >
                Book Now <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Bottom-right: live route tracker card */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xl hidden md:block min-w-[240px]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-xs text-gray-400 font-medium">Live Shipment</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">From</p>
                <p className="text-sm font-bold text-[#0f172a]">CN SHG</p>
              </div>
              <div className="flex-1 flex items-center gap-1 mx-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff6b35] flex-shrink-0" />
                <div className="flex-1 h-0.5 bg-gradient-to-r from-[#ff6b35] to-green-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0" />
              </div>
              <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">To</p>
                <p className="text-sm font-bold text-[#0f172a]">US OAK</p>
              </div>
            </div>
            <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">ATD</p>
                <p className="text-xs font-semibold text-[#0f172a]">May 3 · 22:57</p>
              </div>
              <div className="flex items-center">
                <MapPin className="w-3 h-3 text-[#ff6b35]" />
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">ETA</p>
                <p className="text-xs font-semibold text-[#0f172a]">May 5 · 09:00</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
