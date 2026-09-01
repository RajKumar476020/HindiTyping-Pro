import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon, SparklesIcon, ShieldCheckIcon, PackageIcon } from '../Icons';

export const SeoGuideAndFaq: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'हिंदी यूनिकोड को कृति देव में कैसे बदलें? (How to convert Hindi Unicode to Kruti Dev?)',
      a: 'HindiTyping Pro पर बस अपने Unicode Hindi टेक्स्ट (या Google Input Tools / Mangal font टेक्स्ट) को ऊपर दिए गए बॉक्स में पेस्ट करें। हमारा फ्री टूल बिना किसी देरी के तुरंत आपके टेक्स्ट को 100% शुद्ध Kruti Dev 010 (कृति देव कन्वर्टर) और DevLys 010 में बदल देता है। इसे आप 1-क्लिक में कॉपी करके CorelDraw, Photoshop या PageMaker में उपयोग कर सकते हैं।',
    },
    {
      q: 'बिना कृति देव कीबोर्ड सीखे Kruti Dev में हिंदी कैसे टाइप करें? (How to type in Kruti Dev without knowing layout?)',
      a: 'अगर आपको Kruti Dev 010 का Remington या Inscript कीबोर्ड लेआउट नहीं आता, तो आप हमारे "Hinglish to Kruti Dev Converter" मोड का उपयोग कर सकते हैं। जैसे आप WhatsApp पर "namaste" लिखते हैं, वैसे ही टाइप करें। यह टूल अपने आप उसे शुद्ध Devanagari Unicode और फिर Kruti Dev / DevLys फॉन्ट में कन्वर्ट कर देगा।',
    },
    {
      q: 'CorelDraw और Graphic Design के लिए यह टूल कैसे उपयोगी है? (CorelDraw Hindi Typing & DTP Operator Tool)',
      a: 'CorelDraw (सभी वर्ज़न X7, 2019, 2021, 2024), Adobe Illustrator और PageMaker में अक्सर Unicode टेक्स्ट पेस्ट करने पर मात्राएं टूट जाती हैं या डिब्बे (boxes) दिखाई देते हैं। HindiTyping Pro लिगेसी फॉन्ट एन्कोडिंग (Kruti Dev 010, DevLys 010, Chanakya, Shusha) जनरेट करता है जिससे CorelDraw और प्रिंट डिजाइनिंग में कभी भी मात्रा या संयुक्ताक्षर खराब नहीं होते।',
    },
    {
      q: 'क्या यह कनवर्टर सरकारी परीक्षाओं और गवर्नमेंट फॉर्म्स (Government Exams / Forms) के लिए मान्य है?',
      a: 'हाँ! SSC, UP Police, High Court, Rajasthan Court, MP CPCT और अन्य राज्य स्तरीय भर्ती परीक्षाओं में Kruti Dev 010 / DevLys 010 टाइपिंग टेस्ट और टाइपिंग अभ्यास के लिए यह सबसे भरोसेमंद टूल है। आप अपने अभ्यास पैसेज को तुरंत यूनिकोड से कृति देव में बदलकर फॉन्ट टेस्ट कर सकते हैं।',
    },
    {
      q: 'What makes HindiTyping Pro the best free Kruti Dev converter online in India?',
      a: 'Unlike slow server-based converters with annoying popups, HindiTyping Pro runs completely offline in your browser. It guarantees 100% data privacy (zero server upload), lightning-fast sub-50ms conversion speed, and handles complex Hindi ligatures, half-characters (हलंत), reph (र्), and matras with pixel-perfect accuracy.',
    },
    {
      q: 'Which legacy Hindi fonts are supported besides Kruti Dev 010?',
      a: 'HindiTyping Pro supports all major Indian printing and publishing fonts: Kruti Dev 010, DevLys 010, Chanakya (चाणक्य), Shusha (शुषा), and more. You can convert between Unicode and all these fonts in one unified interface.',
    },
  ];

  return (
    <section id="seo-guide" className="ht-seo-guide-section">
      <div className="ht-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
          <div className="ht-pill-badge" style={{ margin: '0 auto 12px auto' }}>
            <SparklesIcon size={14} />
            <span>Complete Hindi Typing & DTP Solution India</span>
          </div>
          <h2 className="ht-h2">
            The Ultimate <span className="cmyk-gradient-text">Hindi to Kruti Dev</span> Converter Tool
          </h2>
          <p className="ht-body" style={{ marginTop: '12px' }}>
            Everything you need for CorelDraw Hindi typing, print design, DTP publishing, and typing tests without memorizing complex keyboard layouts.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '36px' }}>
          <div className="ht-why-card">
            <div className="ht-icon-chip blue">
              <SparklesIcon size={20} />
            </div>
            <h3 className="ht-card-title">English & Hinglish to Kruti Dev</h3>
            <p className="ht-card-desc">
              Type Hindi phonetically in English (e.g. &apos;aap kaise ho&apos; → &apos;आप कैसे हो&apos;) and instantly get clean Kruti Dev 010 output without needing a specialized Hindi keyboard.
            </p>
          </div>

          <div className="ht-why-card">
            <div className="ht-icon-chip magenta">
              <PackageIcon size={20} />
            </div>
            <h3 className="ht-card-title">CorelDraw & DTP Ready</h3>
            <p className="ht-card-desc">
              Direct compatibility with CorelDraw, Adobe InDesign, Photoshop, Illustrator, and PageMaker. No missing characters or broken matras during high-res print output.
            </p>
          </div>

          <div className="ht-why-card">
            <div className="ht-icon-chip green">
              <ShieldCheckIcon size={20} />
            </div>
            <h3 className="ht-card-title">Government Forms & Typing Tests</h3>
            <p className="ht-card-desc">
              Prepare for CPCT, SSC, High Court, and State typing exams with accurate Kruti Dev 010 and DevLys 010 conversion and instant preview.
            </p>
          </div>
        </div>

        {/* FAQ Accordion for Google Snippets & Ranking */}
        <div id="faq" style={{ marginTop: '56px' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 24px auto' }}>
            <h2 className="ht-h2">Frequently Asked Questions</h2>
            <p className="ht-body" style={{ marginTop: '8px' }}>
              Common questions about Hindi font conversion, keyboard layouts, and CorelDraw workflows.
            </p>
          </div>

          <div className="ht-faq-accordion">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`ht-faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="ht-faq-question"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronDownIcon size={18} /> : <ChevronRightIcon size={18} />}
                  </button>
                  {isOpen && (
                    <div className="ht-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
