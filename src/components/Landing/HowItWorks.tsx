

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Input Text",
      description: "Type phonetically in English (Hinglish) or paste your standard Unicode Hindi text."
    },
    {
      number: "02",
      title: "Select Fonts",
      description: "Choose your target legacy fonts like Kruti Dev, DevLys, Chanakya, or Shusha."
    },
    {
      number: "03",
      title: "Copy & Paste",
      description: "Instantly copy the converted text and paste it into your design software like CorelDraw."
    }
  ];

  return (
    <section className="how-it-works">
      <div className="container">
        <h2>How It Works</h2>
        <div className="steps-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="step-card">
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
