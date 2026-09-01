import React from 'react';
import { PencilIcon, TypeIcon, CopyIcon, CheckIcon, ArrowRightIcon, ActivityIcon, PackageIcon, TargetIcon, ShieldLockIcon } from '../Icons';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '1',
      colorClass: 'blue',
      icon: <PencilIcon size={24} />,
      title: 'Paste Unicode Text',
      description: 'Type or paste your Hindi text in Unicode, Mangal, or phonetic Hinglish.',
    },
    {
      number: '2',
      colorClass: 'magenta',
      icon: <TypeIcon size={24} />,
      title: 'Select Legacy Font',
      description: 'Choose from Kruti Dev 010, DevLys 010, Chanakya, or Shusha fonts.',
    },
    {
      number: '3',
      colorClass: 'yellow',
      icon: <CopyIcon size={24} />,
      title: 'Copy & Use',
      description: 'Instant 1-click copy with preserved formatting and characters.',
    },
    {
      number: '4',
      colorClass: 'green',
      icon: <CheckIcon size={24} />,
      title: 'Done!',
      description: 'Paste directly into CorelDraw, PageMaker, InDesign or Photoshop.',
    },
  ];

  const stats = [
    {
      icon: <ActivityIcon size={20} />,
      colorClass: 'blue',
      title: '1M+',
      subtitle: 'Conversions Done',
    },
    {
      icon: <PackageIcon size={20} />,
      colorClass: 'blue',
      title: '15+',
      subtitle: 'Legacy Fonts',
    },
    {
      icon: <TargetIcon size={20} />,
      colorClass: 'magenta',
      title: '99.9%',
      subtitle: 'Accuracy',
    },
    {
      icon: <ShieldLockIcon size={20} />,
      colorClass: 'green',
      title: '100%',
      subtitle: 'Offline & Secure',
    },
  ];

  return (
    <section id="how-it-works" className="ht-section" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="ht-container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <h2 className="ht-h2">How It Works</h2>
          <p className="ht-body" style={{ marginTop: '8px' }}>
            Four effortless steps to transform any Unicode Hindi text into legacy DTP font format.
          </p>
        </div>

        {/* 4-Node Stepper */}
        <div className="ht-stepper-row">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="ht-step-card">
                <div className="ht-step-badge-wrap">
                  <div className={`ht-step-number-dot ${step.colorClass}`}>{step.number}</div>
                  <div className={`ht-step-circle ${step.colorClass}`}>{step.icon}</div>
                </div>
                <h3 className="ht-card-title">{step.title}</h3>
                <p className="ht-card-desc" style={{ maxWidth: '240px' }}>{step.description}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="ht-step-connector">
                  <ArrowRightIcon size={20} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Secondary Stats Row */}
        <div className="ht-secondary-stats">
          {stats.map((stat, idx) => (
            <div key={idx} className="ht-trust-item" style={{ justifyContent: 'center' }}>
              <div className={`ht-icon-chip ${stat.colorClass}`}>
                {stat.icon}
              </div>
              <div className="ht-trust-text">
                <span className="ht-trust-title">{stat.title}</span>
                <span className="ht-trust-sub">{stat.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
