import React from 'react';
import { TargetIcon, TypeIcon, GlobeIcon, ShieldLockIcon, SparklesIcon } from '../Icons';

export const WhyProfessionals: React.FC = () => {
  const cards = [
    {
      icon: <TargetIcon size={20} />,
      colorClass: 'blue',
      title: 'Accurate Conversion',
      description: 'Pixel perfect output every time without broken matras or incorrect conjuncts.',
    },
    {
      icon: <TypeIcon size={20} />,
      colorClass: 'magenta',
      title: 'Supports All DTP Fonts',
      description: 'Kruti Dev, DevLys, Chanakya, Shusha & more legacy font encodings supported.',
    },
    {
      icon: <GlobeIcon size={20} />,
      colorClass: 'cyan',
      title: 'Works Everywhere',
      description: 'Windows, Mac, Web, CorelDraw, PageMaker, Photoshop — all platforms.',
    },
    {
      icon: <ShieldLockIcon size={20} />,
      colorClass: 'yellow',
      title: 'No Internet Needed',
      description: 'Complete client-side offline conversion. Zero server logs or data uploads.',
    },
    {
      icon: <SparklesIcon size={20} />,
      colorClass: 'green',
      title: 'Save Time & Money',
      description: 'Boost productivity 10x, eliminate manual typing errors and re-work.',
    },
  ];

  return (
    <section id="features" className="ht-section">
      <div className="ht-container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <h2 className="ht-h2">
            Why <span className="cmyk-gradient-text">Professionals</span> Choose Us
          </h2>
          <p className="ht-body" style={{ marginTop: '10px' }}>
            Built specifically for Indian graphic designers, DTP operators, print shops, and content creators.
          </p>
        </div>

        <div className="ht-why-grid">
          {cards.map((card, idx) => (
            <div key={idx} className="ht-why-card">
              <div className={`ht-icon-chip ${card.colorClass}`}>
                {card.icon}
              </div>
              <h3 className="ht-card-title">{card.title}</h3>
              <p className="ht-card-desc">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
