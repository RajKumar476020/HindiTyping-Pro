import React from 'react';
import { PackageIcon, ShieldLockIcon, ShieldCheckIcon, LightningIcon, CmykDotsIcon } from '../Icons';

export const TrustBar: React.FC = () => {
  const trustItems = [
    {
      icon: <PackageIcon size={20} />,
      colorClass: 'blue',
      title: '15+',
      subtitle: 'Legacy Fonts',
    },
    {
      icon: <ShieldLockIcon size={20} />,
      colorClass: 'magenta',
      title: '100%',
      subtitle: 'Offline Conversion',
    },
    {
      icon: <ShieldCheckIcon size={20} />,
      colorClass: 'yellow',
      title: '0 Upload',
      subtitle: 'Your Data Stays Private',
    },
    {
      icon: <LightningIcon size={20} />,
      colorClass: 'cyan',
      title: 'Lightning Fast',
      subtitle: 'Under 50ms Speed',
    },
    {
      icon: <CmykDotsIcon size={22} />,
      colorClass: 'blue',
      title: 'Pure CMYK',
      subtitle: 'Print Perfect Output',
    },
  ];

  return (
    <section className="ht-container" style={{ paddingTop: '0', paddingBottom: '32px' }}>
      <div className="ht-trust-bar">
        {trustItems.map((item, idx) => (
          <div key={idx} className="ht-trust-item">
            <div className={`ht-icon-chip ${item.colorClass}`}>
              {item.icon}
            </div>
            <div className="ht-trust-text">
              <span className="ht-trust-title">{item.title}</span>
              <span className="ht-trust-sub">{item.subtitle}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
