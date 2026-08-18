import { useRef } from 'react';
import { Hero } from '../components/Landing/Hero';
import { ProblemSolution } from '../components/Landing/ProblemSolution';
import { HowItWorks } from '../components/Landing/HowItWorks';
import { FeaturesGrid } from '../components/Landing/FeaturesGrid';
import { FontShowcase } from '../components/Landing/FontShowcase';
import { About } from '../components/Landing/About';
import { Footer } from '../components/Landing/Footer';
import '../components/Landing/Landing.css';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Select all main sections inside the container
    const sections = gsap.utils.toArray<HTMLElement>('.gsap-section');

    sections.forEach((section) => {
      gsap.from(section, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });

  }, { scope: containerRef });

  return (
    <div className="landing-page" ref={containerRef}>
      <main>
        <div className="gsap-section"><Hero /></div>
        <div className="gsap-section"><ProblemSolution /></div>
        <div className="gsap-section"><HowItWorks /></div>
        <div className="gsap-section"><FeaturesGrid /></div>
        <div className="gsap-section"><FontShowcase /></div>
        <div className="gsap-section"><About /></div>
      </main>
      <Footer />
    </div>
  );
}
