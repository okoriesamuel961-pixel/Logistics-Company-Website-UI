import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect, useCallback } from 'react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechRetail Inc.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    rating: 5,
    text: 'SwiftLogix completely transformed our supply chain operations. Their real-time tracking is phenomenal — we know exactly where every package is at any moment. Customer service is always proactive and responsive. I wholeheartedly recommend them to any e-commerce business.',
  },
  {
    name: 'Michael Chen',
    role: 'Operations Director, GlobalMart',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    rating: 5,
    text: "We've relied on SwiftLogix for 3 years and they've consistently exceeded expectations. Their international shipping is both reliable and cost-effective, with customs clearance handled seamlessly. A track record of zero major delivery failures — truly rare in this industry.",
  },
  {
    name: 'Emily Rodriguez',
    role: 'Founder, ArtisanBox',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    rating: 5,
    text: 'As a small business owner shipping fragile artisan goods, I need logistics I can fully trust. SwiftLogix handles every item with exceptional care and their pricing is completely transparent — no hidden fees. They genuinely feel like an extension of my team.',
  },
  {
    name: 'David Okafor',
    role: 'Supply Chain Manager, NovaTech',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    rating: 5,
    text: 'SwiftLogix cut our fulfilment time by 40% in the very first month. Their team integrated seamlessly with our existing ERP systems from day one with zero disruption. The ROI has been exceptional and support throughout the entire engagement has been outstanding.',
  },
  {
    name: 'Priya Nair',
    role: 'E-commerce Director, StyleHub',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    rating: 5,
    text: 'Last-mile delivery was our biggest operational headache — SwiftLogix solved it entirely. Our customers now receive real-time delivery notifications and our on-time rate jumped from 87% to 98.5%. The measurable impact on customer satisfaction has been remarkable.',
  },
  {
    name: 'James Whitfield',
    role: 'CEO, Atlantic Cargo Group',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop',
    rating: 5,
    text: 'For freight forwarding across 20+ countries, SwiftLogix is our undisputed go-to partner. Their customs expertise is unmatched and cargo handling protocols are meticulous. Every shipment is treated with the same care regardless of size. Truly world-class at every touchpoint.',
  },
];

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = testimonials.length;

  const getCardWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const card = track.querySelector<HTMLElement>('[data-card]');
    return card ? card.offsetWidth + 16 : 0; // 16 = gap-4
  }, []);

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cardW = getCardWidth();
    track.scrollTo({ left: index * cardW, behavior: 'smooth' });
  }, [getCardWidth]);

  const prev = () => {
    const next = Math.max(0, activeIndex - 1);
    scrollTo(next);
  };

  const next = () => {
    const visibleCards = getVisibleCount();
    const maxIndex = total - visibleCards;
    const n = Math.min(maxIndex, activeIndex + 1);
    scrollTo(n);
  };

  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 2;
    if (window.innerWidth >= 1024) return 3;
    return 2;
  };

  // Sync active dot on scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const handler = () => {
      const cardW = getCardWidth();
      if (!cardW) return;
      setActiveIndex(Math.round(track.scrollLeft / cardW));
    };
    track.addEventListener('scroll', handler, { passive: true });
    return () => track.removeEventListener('scroll', handler);
  }, [getCardWidth]);

  const visibleCount = getVisibleCount();
  const maxIndex = Math.max(0, total - visibleCount);

  return (
    <section id="testimonials" className="py-12 md:py-16 lg:py-20 bg-[#f8fafc] dark:bg-[#0a0f1a]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <span className="text-[#ff6b35] font-semibold text-base uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] dark:text-[#f1f5f9] mt-3 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-base text-[#64748b] dark:text-[#94a3b8] max-w-sm mx-auto text-center">
            Don't just take our word for it.{' '}
            <br className="hidden sm:block" />
            Here's what our clients say about working with SwiftLogix.
          </p>
        </div>

        {/* Carousel wrapper */}
        <div className="relative">

          {/* Prev arrow — desktop only */}
          <button
            onClick={prev}
            disabled={activeIndex === 0}
            className="hidden md:flex absolute -left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] rounded-full items-center justify-center shadow-md hover:bg-[#ff6b35] hover:border-[#ff6b35] hover:text-white dark:hover:bg-[#ff6b35] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next arrow — desktop only */}
          <button
            onClick={next}
            disabled={activeIndex >= maxIndex}
            className="hidden md:flex absolute -right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] rounded-full items-center justify-center shadow-md hover:bg-[#ff6b35] hover:border-[#ff6b35] hover:text-white dark:hover:bg-[#ff6b35] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Scroll track */}
          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollSnapType: 'x mandatory' }}
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                data-card
                className="shrink-0 w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-3 sm:p-5 lg:p-6 border border-[#e2e8f0] dark:border-[#334155] hover:shadow-lg dark:hover:shadow-black/30 transition-all relative h-full">
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-[#ff6b35]/10 dark:text-[#ff6b35]/20" />

                  {/* Avatar + name */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-9 h-9 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0 border-2 border-[#ff6b35]/20"
                    />
                    <div className="min-w-0">
                      <h4 className="font-semibold text-[#0f172a] dark:text-[#f1f5f9] truncate">{t.name}</h4>
                      <p className="text-xs text-[#64748b] dark:text-[#94a3b8] truncate">{t.role}</p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#f59e0b] fill-[#f59e0b]" />
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-sm text-[#475569] dark:text-[#94a3b8] leading-relaxed line-clamp-4">
                    {t.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Hide scrollbar in webkit */}
          <style>{`[data-track]::-webkit-scrollbar{display:none}`}</style>
        </div>

        {/* Dots + mobile arrows */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prev}
            disabled={activeIndex === 0}
            className="md:hidden w-9 h-9 bg-white dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] rounded-full flex items-center justify-center shadow hover:bg-[#ff6b35] hover:border-[#ff6b35] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-6 h-2.5 bg-[#ff6b35]'
                    : 'w-2.5 h-2.5 bg-[#cbd5e1] dark:bg-[#334155] hover:bg-[#ff6b35]/50'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={activeIndex >= maxIndex}
            className="md:hidden w-9 h-9 bg-white dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] rounded-full flex items-center justify-center shadow hover:bg-[#ff6b35] hover:border-[#ff6b35] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
