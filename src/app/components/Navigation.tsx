import { Package, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#ff6b35] rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xl font-semibold transition-colors ${
              isScrolled ? 'text-[#0f172a]' : 'text-white'
            }`}>SwiftLogix</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="/#services" className={`transition-colors ${
              isScrolled ? 'text-[#475569] hover:text-[#0f172a]' : 'text-white hover:text-[#ff6b35]'
            }`}>
              Services
            </a>
            <Link to="/track-shipment" className={`transition-colors ${
              isScrolled ? 'text-[#475569] hover:text-[#0f172a]' : 'text-white hover:text-[#ff6b35]'
            }`}>
              Track Shipment
            </Link>
            <a href="/#about" className={`transition-colors ${
              isScrolled ? 'text-[#475569] hover:text-[#0f172a]' : 'text-white hover:text-[#ff6b35]'
            }`}>
              About Us
            </a>
            <a href="/#contact" className={`transition-colors ${
              isScrolled ? 'text-[#475569] hover:text-[#0f172a]' : 'text-white hover:text-[#ff6b35]'
            }`}>
              Contact
            </a>
            <Link to="/get-quote" className="px-6 py-2.5 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff5722] transition-colors">
              Get a Quote
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 transition-colors ${isScrolled ? 'text-[#0f172a]' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 transition-colors ${isScrolled ? 'text-[#0f172a]' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#e2e8f0]">
          <div className="px-4 py-4 space-y-3">
            <a
              href="/#services"
              className="block py-2 text-[#475569] hover:text-[#0f172a] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </a>
            <Link
              to="/track-shipment"
              className="block py-2 text-[#475569] hover:text-[#0f172a] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Track Shipment
            </Link>
            <a
              href="/#about"
              className="block py-2 text-[#475569] hover:text-[#0f172a] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </a>
            <a
              href="/#contact"
              className="block py-2 text-[#475569] hover:text-[#0f172a] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <Link
              to="/get-quote"
              className="block w-full px-6 py-2.5 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff5722] transition-colors text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
