

export function FontShowcase() {
  const samplePhrase = "नमस्ते, कैसे हैं आप?";
  const fonts = [
    { name: "Kruti Dev 010", encoded: "ueLrs] dSls gSa vki\\" },
    { name: "DevLys 010", encoded: "ueLrs] dSls gSa vki\\" },
    { name: "Chanakya", encoded: "ueLrs, dSls gSa vki\\" }, // Placeholder encoding for showcase
    { name: "Shusha", encoded: "ueLrs, dSls gSa vki\\" }    // Placeholder encoding for showcase
  ];

  return (
    <section className="font-showcase">
      <div className="container">
        <h2>Live Font Showcase</h2>
        <p className="showcase-subtitle">See how standard Unicode text maps to your favorite design fonts.</p>
        
        <div className="showcase-demo">
          <div className="unicode-source">
            <span className="label">Unicode Source:</span>
            <span className="text">{samplePhrase}</span>
          </div>
          
          <div className="legacy-results">
            {fonts.map((font, idx) => (
              <div key={idx} className="result-row">
                <span className="font-name">{font.name}</span>
                <span className="font-encoded">{font.encoded}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
