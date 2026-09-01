import React from 'react';
import { Header } from '../components/Landing/Header';
import { Hero } from '../components/Landing/Hero';
import { TrustBar } from '../components/Landing/TrustBar';
import { WhyProfessionals } from '../components/Landing/WhyProfessionals';
import { HowItWorks } from '../components/Landing/HowItWorks';
import { FontShowcase } from '../components/Landing/FontShowcase';
import { TestimonialCta } from '../components/Landing/TestimonialCta';
import { SeoGuideAndFaq } from '../components/Landing/SeoGuideAndFaq';
import { Footer } from '../components/Landing/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="landing-page-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Hero />
        <TrustBar />
        <WhyProfessionals />
        <HowItWorks />
        <FontShowcase />
        <TestimonialCta />
        <SeoGuideAndFaq />
      </main>
      <Footer />
    </div>
  );
};
