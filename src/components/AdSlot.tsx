
import { ADS } from '../config/ads';

interface AdSlotProps {
  slotName: string;
}

export function AdSlot({ slotName }: AdSlotProps) {
  const ad = ADS.find(a => a.slot === slotName);

  if (!ad) {
    return null; // Gracefully render nothing
  }

  return (
    <div className="ad-container">
      <div className="ad-label">Advertisement</div>
      <a href={ad.linkUrl} target="_blank" rel="noopener noreferrer" className="ad-link">
        <img src={ad.imageUrl} alt={ad.altText} className="ad-image" />
      </a>
    </div>
  );
}
