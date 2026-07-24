import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Slider from 'react-slick';
import { useRef } from 'react';

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
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: 'slick-dots !bottom-[-36px]',
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640,  settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section id="testimonials" className="py-12 md:py-16 lg:py-20 bg-[#f8fafc] dark:bg-[#0a0f1a]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <span className="text-[#ff6b35] font-semibold text-base uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] dark:text-[#f1f5f9] mt-3 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-base text-[#64748b] dark:text-[#94a3b8] max-w-sm mx-auto text-center">
            Don't just take our word for it.<br className="hidden sm:block" />
            Here's what our clients say about working with SwiftLogix.
          </p>
        </div>

        {/* Prev / Next row on mobile, absolute on desktop */}
        <div className="flex items-center justify-center gap-3 mb-4 md:hidden">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="w-9 h-9 bg-white dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] rounded-full flex items-center justify-center shadow-md hover:bg-[#ff6b35] hover:border-[#ff6b35] hover:text-white transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="w-9 h-9 bg-white dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] rounded-full flex items-center justify-center shadow-md hover:bg-[#ff6b35] hover:border-[#ff6b35] hover:text-white transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="relative pb-12">
          {/* Desktop-only side arrows */}
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="hidden md:flex absolute -left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] rounded-full items-center justify-center shadow-md hover:bg-[#ff6b35] hover:border-[#ff6b35] hover:text-white dark:hover:bg-[#ff6b35] dark:hover:border-[#ff6b35] transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="hidden md:flex absolute -right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] rounded-full items-center justify-center shadow-md hover:bg-[#ff6b35] hover:border-[#ff6b35] hover:text-white dark:hover:bg-[#ff6b35] dark:hover:border-[#ff6b35] transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="px-2 md:px-3">
                <div className="bg-white dark:bg-[#1e293b] rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 border border-[#e2e8f0] dark:border-[#334155] hover:shadow-lg dark:hover:shadow-[#000]/30 transition-all relative h-full">
                  <Quote className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 text-[#ff6b35]/10 dark:text-[#ff6b35]/20" />

                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover flex-shrink-0"
                    />
                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-[#0f172a] dark:text-[#f1f5f9]">{testimonial.name}</h4>
                      <p className="text-xs md:text-sm text-[#64748b] dark:text-[#94a3b8]">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-3 md:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-[#f59e0b] fill-[#f59e0b]" />
                    ))}
                  </div>

                  <p className="text-sm md:text-base text-[#475569] dark:text-[#94a3b8] leading-relaxed line-clamp-4">{testimonial.text}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <style>{`
        .slick-dots li button:before {
          color: #cbd5e1;
          font-size: 10px;
          opacity: 1;
        }
        .slick-dots li.slick-active button:before {
          color: #ff6b35;
          opacity: 1;
        }
        /* slick core */
        .slick-slider{position:relative;display:block;box-sizing:border-box;user-select:none;touch-action:pan-y}
        .slick-list{position:relative;overflow:hidden;display:block;margin:0;padding:0}
        .slick-list:focus{outline:none}
        .slick-list.dragging{cursor:pointer}
        .slick-track{position:relative;left:0;top:0;display:flex;margin-left:auto;margin-right:auto}
        .slick-track:before,.slick-track:after{content:"";display:table}
        .slick-track:after{clear:both}
        .slick-slide{display:none;float:left;height:100%;min-height:1px}
        .slick-slide>div{height:100%}
        .slick-initialized .slick-slide{display:block}
        .slick-dots{position:absolute;bottom:-36px;list-style:none;display:flex!important;justify-content:center;gap:6px;padding:0;margin:0;width:100%}
        .slick-dots li{width:10px;height:10px}
        .slick-dots li button{font-size:0;width:10px;height:10px;padding:0;border:none;background:#cbd5e1;border-radius:50%;cursor:pointer;transition:background .2s}
        .slick-dots li.slick-active button{background:#ff6b35}
      `}</style>
    </section>
  );
}
