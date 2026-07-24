import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const INPUT = 'w-full px-4 py-3 bg-[#f8fafc] dark:bg-[#0f172a] border border-[#e2e8f0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-[#0f172a] dark:text-[#f1f5f9] placeholder-[#94a3b8]';

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      navigate('/contact-success', { state: { name: formData.name, email: formData.email } });
    }, 600);
  };

  const canSubmit = formData.name.trim() && formData.email.trim() && formData.message.trim();

  return (
    <section id="contact" className="py-12 md:py-16 lg:py-20 bg-[#f8fafc] dark:bg-[#0a0f1a]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <span className="text-[#ff6b35] font-semibold text-base uppercase tracking-wider">Get In Touch</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] dark:text-[#f1f5f9] mt-3 mb-4">
            Contact Our Team
          </h2>
          <p className="text-base text-[#64748b] dark:text-[#94a3b8] max-w-sm mx-auto text-center">
            Have questions? We're here to help.<br className="hidden sm:block" />
            Reach out and we'll get back to you shortly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-8 border border-[#e2e8f0] dark:border-[#334155] mb-8">
              <h3 className="text-2xl lg:text-[40px] text-[#0f172a] dark:text-[#f1f5f9] mb-6">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm text-[#475569] dark:text-[#94a3b8] mb-2">Full Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" className={INPUT} />
                </div>
                <div>
                  <label className="block text-sm text-[#475569] dark:text-[#94a3b8] mb-2">Email Address</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" className={INPUT} />
                </div>
                <div>
                  <label className="block text-sm text-[#475569] dark:text-[#94a3b8] mb-2">Phone Number</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+1 (555) 000-0000" className={INPUT} />
                </div>
                <div>
                  <label className="block text-sm text-[#475569] dark:text-[#94a3b8] mb-2">Message</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about your logistics needs..." rows={4} className={`${INPUT} resize-none`} />
                </div>
                <button
                  type="submit"
                  disabled={!canSubmit || submitting}
                  className="w-full px-6 py-4 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff5722] hover:shadow-lg hover:shadow-[#ff6b35]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  {submitting ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* Info + Map */}
          <div className="space-y-6">
            {[
              { icon: Phone, title: 'Phone',        lines: ['+1 (800) 123-4567', 'Mon-Fri: 8am - 8pm EST'] },
              { icon: Mail,  title: 'Email',        lines: ['support@swiftlogix.com', 'sales@swiftlogix.com'] },
              { icon: MapPin,title: 'Headquarters', lines: ['123 Logistics Avenue', 'New York, NY 10001', 'United States'] },
            ].map(({ icon: Icon, title, lines }) => (
              <div key={title} className="bg-white dark:bg-[#1e293b] rounded-2xl p-5 sm:p-6 border border-[#e2e8f0] dark:border-[#334155]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#ff6b35]/10 dark:bg-[#ff6b35]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[#ff6b35]" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base font-semibold text-[#0f172a] dark:text-[#f1f5f9] mb-1">{title}</h4>
                    {lines.map((l, i) => (
                      <p key={i} className="text-sm text-[#64748b] dark:text-[#94a3b8] leading-relaxed">{l}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Interactive Map */}
            <div className="relative rounded-2xl overflow-hidden border border-[#e2e8f0] dark:border-[#334155] shadow-sm" style={{ height: '320px' }}>
              <iframe
                title="SwiftLogix HQ Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0020%2C40.7460%2C-73.9820%2C40.7560&layer=mapnik&marker=40.7505%2C-73.9934"
                className="w-full h-full border-0"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-72 bg-white dark:bg-[#1e293b] rounded-xl shadow-xl border border-[#e2e8f0] dark:border-[#334155] p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#ff6b35] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0f172a] dark:text-[#f1f5f9] mb-0.5">SwiftLogix Headquarters</p>
                    <p className="text-xs text-[#64748b] dark:text-[#94a3b8] leading-relaxed">123 Logistics Avenue<br />New York, NY 10001, US</p>
                    <div className="flex items-center gap-3 mt-2">
                      <a href="https://www.openstreetmap.org/?mlat=40.7505&mlon=-73.9934#map=16/40.7505/-73.9934" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#ff6b35] hover:text-[#ff5722] transition-colors flex items-center gap-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        Get Directions
                      </a>
                      <span className="text-[#e2e8f0] dark:text-[#334155]">|</span>
                      <span className="text-xs text-[#94a3b8]">Open Mon–Fri, 8am–6pm</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-sm rounded-lg px-2.5 py-1 shadow-sm border border-[#e2e8f0] dark:border-[#334155]">
                <span className="text-[10px] font-semibold text-[#475569] dark:text-[#94a3b8] uppercase tracking-wide">HQ Location</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
