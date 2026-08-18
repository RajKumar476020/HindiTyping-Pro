

export function ProblemSolution() {
  return (
    <section className="problem-solution">
      <div className="container">
        <h2>Why Do You Need This Tool?</h2>
        <div className="content-grid">
          <div className="problem-card">
            <h3>The Problem</h3>
            <p>
              Modern internet text and voice typing use Unicode (Mangal/Aparajita) fonts. However, traditional graphic design and DTP software like CorelDraw, PageMaker, and older Photoshop versions rely on legacy non-Unicode fonts such as Kruti Dev, DevLys, Chanakya, and Shusha. Copy-pasting modern Hindi text directly into these tools results in gibberish.
            </p>
          </div>
          <div className="solution-card">
            <h3>The Solution</h3>
            <p>
              Our converter bridges this gap instantly. Type in English (Hinglish) or paste standard Unicode Hindi, and we perfectly encode it for your desired legacy font. This ensures your beautiful typography in CorelDraw or Photoshop displays exactly as intended, saving hours of manual re-typing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
