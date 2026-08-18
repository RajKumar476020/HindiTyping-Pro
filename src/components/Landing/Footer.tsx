
import { AdSlot } from '../AdSlot';

export function Footer() {
  return (
    <footer className="landing-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>HindiTyping Pro</h3>
            <p>Designed for Indian graphic designers by Gayatri Art's.</p>
          </div>
        </div>

        <div className="footer-ad-wrapper">
          <AdSlot slotName="footer" />
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Gayatri Art's. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
