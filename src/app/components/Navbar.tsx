import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useTheme } from '../context/ThemeContext';

const SECTION_IDS = ['services', 'about', 'contact'];

const NAV_LINKS: { label: string; href: string; section?: string }[] = [
  { label: 'Services',       href: '/#services',     section: 'services' },
  { label: 'Track Shipment', href: '/track-shipment'                     },
  { label: 'About Us',       href: '/#about',        section: 'about'    },
  { label: 'Contact',        href: '/#contact',      section: 'contact'  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isMobileOpen, setIsMobileOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [clickedHref, setClickedHref]     = useState<string | null>(null);
  const clickTimer                         = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location                           = useLocation();
  const navigate                           = useNavigate();
  const { isDark, toggle }                 = useTheme();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') return;
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/') setActiveSection('');
    setIsMobileOpen(false);
  }, [location.pathname]);

  const scrollToSection = (section: string, href: string) => {
    if (clickTimer.current) clearTimeout(clickTimer.current);
    setClickedHref(href);
    clickTimer.current = setTimeout(() => setClickedHref(null), 800);
    setIsMobileOpen(false);

    const go = () => {
      const el = document.getElementById(section);
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
    };

    if (location.pathname === '/') {
      go();
    } else {
      // Navigate home first, then scroll after render
      navigate('/');
      setTimeout(go, 300);
    }
  };

  const handleLinkClick = (href: string) => {
    if (clickTimer.current) clearTimeout(clickTimer.current);
    setClickedHref(href);
    clickTimer.current = setTimeout(() => setClickedHref(null), 800);
    setIsMobileOpen(false);
  };

  const isActive = (link: (typeof NAV_LINKS)[number]) => {
    if (!link.section) return location.pathname === link.href;
    if (clickedHref === link.href) return true;
    return activeSection === link.section;
  };

  const desktopLinkClass = (active: boolean) =>
    [
      'relative flex flex-col items-center text-sm font-medium transition-colors duration-200',
      active ? 'text-[#ff6b35]' : 'text-[#475569] hover:text-[#0f172a] dark:text-[#94a3b8] dark:hover:text-[#f1f5f9]',
    ].join(' ');

  const mobileLinkClass = (active: boolean) =>
    active
      ? 'flex items-center gap-2 py-3 px-3 rounded-lg text-sm font-medium bg-[#ff6b35]/10 text-[#ff6b35]'
      : 'flex items-center gap-2 py-3 px-3 rounded-lg text-sm font-medium text-[#475569] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f1f5f9] hover:bg-gray-50 dark:hover:bg-[#1e293b] transition-colors';

  const Indicator = ({ active }: { active: boolean }) => (
    <span
      className="block h-[2.5px] rounded-full bg-[#ff6b35] transition-all duration-300 origin-center"
      style={{ width: '100%', transform: active ? 'scaleX(1)' : 'scaleX(0)', opacity: active ? 1 : 0, marginTop: '3px' }}
    />
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#0f172a] transition-shadow duration-300 ${
      isScrolled ? 'shadow-md dark:shadow-[#000]/40' : 'shadow-sm border-b border-[#e2e8f0] dark:border-[#1e293b]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Brand */}
          <Link to="/" className="flex items-center" onClick={() => handleLinkClick('/')}>
            <span className="text-xl font-bold tracking-tight text-[#0f172a] dark:text-[#f1f5f9]">
              Swift<span className="text-[#ff6b35]">Logix</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const active = isActive(link);
              return link.section ? (
                <button key={link.label} className={desktopLinkClass(active)} onClick={() => scrollToSection(link.section!, link.href)}>
                  {link.label}
                  <Indicator active={active} />
                </button>
              ) : (
                <Link key={link.label} to={link.href} className={desktopLinkClass(active)} onClick={() => handleLinkClick(link.href)}>
                  {link.label}
                  <Indicator active={active} />
                </Link>
              );
            })}

            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[#475569] dark:text-[#94a3b8] hover:bg-gray-100 dark:hover:bg-[#1e293b] transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5 text-[#f59e0b]" /> : <Moon className="w-5 h-5" />}
            </button>

            <Link
              to="/get-quote"
              onClick={() => handleLinkClick('/get-quote')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive({ label: 'Get a Quote', href: '/get-quote' })
                  ? 'bg-[#ff5722] text-white shadow-md'
                  : 'bg-[#ff6b35] text-white hover:bg-[#ff5722] hover:shadow-md'
              }`}
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile right side */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[#475569] dark:text-[#94a3b8] hover:bg-gray-100 dark:hover:bg-[#1e293b] transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5 text-[#f59e0b]" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1e293b] transition-colors" aria-label="Toggle menu" onClick={() => setIsMobileOpen((v) => !v)}>
              {isMobileOpen
                ? <X className="w-6 h-6 text-[#0f172a] dark:text-[#f1f5f9]" />
                : <Menu className="w-6 h-6 text-[#0f172a] dark:text-[#f1f5f9]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <div className="md:hidden bg-white dark:bg-[#0f172a] border-t border-[#e2e8f0] dark:border-[#1e293b] shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link);
              return link.section ? (
                <button key={link.label} className={mobileLinkClass(active)} onClick={() => scrollToSection(link.section!, link.href)}>
                  {active && <span className="w-1 h-5 rounded-full bg-[#ff6b35]" />}
                  {link.label}
                </button>
              ) : (
                <Link key={link.label} to={link.href} className={mobileLinkClass(active)} onClick={() => handleLinkClick(link.href)}>
                  {active && <span className="w-1 h-5 rounded-full bg-[#ff6b35]" />}
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                to="/get-quote"
                className="block w-full px-6 py-3 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff5722] transition-colors text-center text-sm font-medium"
                onClick={() => handleLinkClick('/get-quote')}
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
