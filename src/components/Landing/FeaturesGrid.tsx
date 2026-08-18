

export function FeaturesGrid() {
  const features = [
    {
      title: "Hinglish Support",
      description: "Type naturally in English, and let our engine convert it to perfectly formed Hindi words on the fly."
    },
    {
      title: "Unicode to Legacy",
      description: "Paste standard Mangal or any Unicode Hindi and get precise legacy encodings instantly."
    },
    {
      title: "Top DTP Fonts Supported",
      description: "Currently supports Kruti Dev 010, DevLys 010, Chanakya, and Shusha. More coming soon."
    },
    {
      title: "100% Privacy",
      description: "All conversions happen directly in your browser. Your text is never sent to any server."
    }
  ];

  return (
    <section className="features-grid">
      <div className="container">
        <h2>Features Designed for Professionals</h2>
        <div className="grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
