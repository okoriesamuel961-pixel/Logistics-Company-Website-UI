import { HeroSection } from '../components/HeroSection';
import { TrustedCompanies } from '../components/TrustedCompanies';
import { ServicesSection } from '../components/ServicesSection';
import { TrackingSection } from '../components/TrackingSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { TeamSection } from '../components/TeamSection';
import { Statistics } from '../components/Statistics';
import { Testimonials } from '../components/Testimonials';
import { MobileApp } from '../components/MobileApp';
import { FAQ } from '../components/FAQ';
import { ContactSection } from '../components/ContactSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedCompanies />
      <ServicesSection />
      <TrackingSection />
      <WhyChooseUs />
      <TeamSection />
      <Statistics />
      <Testimonials />
      <MobileApp />
      <FAQ />
      <ContactSection />
    </>
  );
}
