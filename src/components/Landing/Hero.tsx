import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Hero() {
  const [displayText, setDisplayText] = useState('');
  const fullText = "namaste";

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setDisplayText(fullText.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === fullText.length) {
        clearInterval(intervalId);
      }
    }, 150);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="landing-hero">
      <div className="hero-content">
        <h1>Convert Hindi Unicode to Legacy Fonts <span className="highlight">Instantly</span></h1>
        <p>Seamlessly convert modern Hindi text to Kruti Dev, DevLys, Chanakya, and Shusha for your graphic design needs.</p>
        
        <div className="hero-demo">
          <div className="demo-input">
            <span className="demo-label">You type:</span>
            <span className="demo-text typing-effect">{displayText}</span>
          </div>
          <div className="demo-arrow">→</div>
          <div className="demo-output">
            <span className="demo-label">Kruti Dev:</span>
            <span className="demo-text legacy-font">ueLrs</span>
          </div>
        </div>

        <Link to="/convert" className="btn-primary hero-cta">Start Converting Free</Link>
      </div>
    </section>
  );
}
