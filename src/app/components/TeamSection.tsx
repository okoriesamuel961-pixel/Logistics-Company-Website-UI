import { Linkedin, Twitter, Mail } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

const TEAM = [
  {
    name: 'Marcus Reid',
    role: 'Chief Executive Officer',
    bio: 'With 20+ years in global logistics, Marcus drives SwiftLogix\'s vision of redefining supply chain intelligence.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzgwNDY3MzMwfDA&ixlib=rb-4.1.0&q=80&w=400',
    linkedin: '#',
    twitter: '#',
    email: 'marcus@swiftlogix.com',
    accent: 'bg-[#ff6b35]',
  },
  {
    name: 'Sarah Johnson',
    role: 'Chief Operations Officer',
    bio: 'Sarah orchestrates our global delivery network, ensuring every package reaches its destination on time.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzgwNDY3MzMwfDA&ixlib=rb-4.1.0&q=80&w=400',
    linkedin: '#',
    twitter: '#',
    email: 'sarah@swiftlogix.com',
    accent: 'bg-blue-500',
  },
  {
    name: 'Daniel Osei',
    role: 'Chief Technology Officer',
    bio: 'Daniel leads our engineering team, building the real-time tracking and AI-powered logistics platform.',
    image: 'https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzgwNDY3MzMwfDA&ixlib=rb-4.1.0&q=80&w=400',
    linkedin: '#',
    twitter: '#',
    email: 'daniel@swiftlogix.com',
    accent: 'bg-purple-500',
  },
  {
    name: 'Priya Menon',
    role: 'Head of Customer Experience',
    bio: 'Priya ensures every client interaction reflects our commitment to transparency, speed, and care.',
    image: 'https://images.unsplash.com/photo-1685760259914-ee8d2c92d2e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzgwNDY3MzMwfDA&ixlib=rb-4.1.0&q=80&w=400',
    linkedin: '#',
    twitter: '#',
    email: 'priya@swiftlogix.com',
    accent: 'bg-green-500',
  },
  {
    name: 'Aisha Kamara',
    role: 'VP of Global Partnerships',
    bio: 'Aisha builds and manages relationships with our carrier network spanning 50+ countries worldwide.',
    image: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzgwNDY3MzMwfDA&ixlib=rb-4.1.0&q=80&w=400',
    linkedin: '#',
    twitter: '#',
    email: 'aisha@swiftlogix.com',
    accent: 'bg-[#ff6b35]',
  },
  {
    name: 'Sophie Laurent',
    role: 'Head of Sales',
    bio: 'Sophie drives revenue growth by connecting businesses with the right logistics solutions for their scale.',
    image: 'https://images.unsplash.com/photo-1701096374092-bb70915fdc5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzgwNDY3MzMwfDA&ixlib=rb-4.1.0&q=80&w=400',
    linkedin: '#',
    twitter: '#',
    email: 'sophie@swiftlogix.com',
    accent: 'bg-pink-500',
  },
  {
    name: 'Yemi Adeyemi',
    role: 'Head of Compliance & Risk',
    bio: 'Yemi keeps SwiftLogix operating safely across all regulatory environments and international trade laws.',
    image: 'https://images.unsplash.com/photo-1609436132311-e4b0c9370469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzgwNDY3MzMwfDA&ixlib=rb-4.1.0&q=80&w=400',
    linkedin: '#',
    twitter: '#',
    email: 'yemi@swiftlogix.com',
    accent: 'bg-yellow-500',
  },
  {
    name: 'Liam Hartley',
    role: 'Lead Engineer',
    bio: 'Liam architects the backbone of our logistics platform, from real-time APIs to mobile tracking systems.',
    image: 'https://images.unsplash.com/photo-1590086782957-93c06ef21604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzgwNDY3MzMwfDA&ixlib=rb-4.1.0&q=80&w=400',
    linkedin: '#',
    twitter: '#',
    email: 'liam@swiftlogix.com',
    accent: 'bg-blue-500',
  },
];

export function TeamSection() {
  return (
    <section id="team" className="py-12 md:py-16 lg:py-20 bg-white dark:bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[#ff6b35] font-semibold text-base uppercase tracking-wider">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] dark:text-[#f1f5f9] mt-3 mb-4">
            The People Behind SwiftLogix
          </h2>
          <p className="text-base text-[#64748b] dark:text-[#94a3b8] max-w-2xl mx-auto">
            A passionate team of logistics experts, engineers, and customer champions united by one mission — delivering excellence, every time.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="group relative bg-[#f8fafc] dark:bg-[#1e293b] rounded-2xl overflow-hidden border border-[#e2e8f0] dark:border-[#334155] hover:shadow-xl dark:hover:shadow-[#000]/40 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Photo */}
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Social links — revealed on hover */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <a
                    href={member.linkedin}
                    onClick={(e) => e.preventDefault()}
                    className="w-9 h-9 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-[#ff6b35] transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={member.twitter}
                    onClick={(e) => e.preventDefault()}
                    className="w-9 h-9 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-[#ff6b35] transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="w-9 h-9 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-[#ff6b35] transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                {/* Role accent bar */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${member.accent} flex-shrink-0`} />
                  <span className="text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wide truncate">
                    {member.role}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#0f172a] dark:text-[#f1f5f9] mb-2">
                  {member.name}
                </h3>
                <p className="text-sm text-[#64748b] dark:text-[#94a3b8] leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="mt-16 rounded-2xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-2xl lg:text-[28px] font-bold text-white mb-2">
              Want to join our team?
            </h3>
            <p className="text-base text-gray-300 mb-3">
              We're always looking for passionate, driven people who want to reshape the future of global logistics. Join a team that values innovation, ownership, and impact.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Competitive salaries', 'Remote-friendly', 'Career growth', 'Global exposure'].map((perk) => (
                <span key={perk} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 bg-[#ff6b35] rounded-full" />
                  {perk}
                </span>
              ))}
            </div>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 px-6 py-3 bg-[#ff6b35] text-white rounded-xl hover:bg-[#ff5722] transition-colors font-medium text-base shadow-lg hover:shadow-[#ff6b35]/30"
          >
            View Open Roles
          </a>
        </div>
      </div>
    </section>
  );
}
