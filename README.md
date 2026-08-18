<div align="center">

# ????? � HindiTyping Pro

**The professional-grade Unicode ? Legacy Font converter for Indian graphic designers.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://gsap.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

---

## ? Overview

**HindiTyping Pro** is a fast, private, and beautifully designed web application that bridges the gap between modern **Unicode Hindi** and the **legacy DTP fonts** still heavily used in Indian print and graphic design workflows.

Whether you're a journalist, typesetter, or graphic designer working with CorelDraw, PageMaker, or InDesign � HindiTyping Pro gives you the converted text in milliseconds, right in your browser, with **zero server round-trips**.

---

## ?? Features

| Feature | Description |
|---|---|
| **?? Hinglish / Phonetic Input** | Type naturally in English (e.g. `namaste`) and get instant Devanagari (`??????`) via a smart transliteration engine |
| **?? Unicode Direct Input** | Paste any standard Unicode Hindi (Mangal, etc.) and convert to legacy encodings |
| **?? 4 Legacy Fonts Supported** | Kruti Dev 010, DevLys 010, Chanakya, and Shusha � the most-used DTP fonts in India |
| **?? Editable Intermediate** | The transliterated Unicode result is fully editable before encoding � fix any edge cases on the fly |
| **?? Conversion History** | Last 10 conversions are automatically saved locally and can be restored in one click |
| **?? 100% Client-Side** | All processing happens entirely in your browser. Your text never leaves your device |
| **?? Debounced for Performance** | Large texts are debounced to keep the UI responsive even with thousands of characters |
| **?? One-Click Copy** | Copy encoded output for each font independently |

---

## ??? Preview

> **Two input modes ? Font-encoded output, instantly.**

```
[ Hinglish Tab ] [ Unicode Hindi Tab ]
-----------------------------------------------------
  namaste                         ?  Kruti Dev: ueLrs
  kaise ho                        ?  DevLys:    dSls gks
  bharat mahan hai                ?  Chanakya:  Hkkjr egku gS
-----------------------------------------------------
          ? Ready to copy and paste
```

---

## ??? Project Structure

```
HindiTyping Pro/
+-- public/                    # Static assets & robots.txt
+-- src/
�   +-- components/
�   �   +-- Landing/           # Landing page sections
�   �   �   +-- Hero.tsx       # Animated hero with live demo
�   �   �   +-- FeaturesGrid.tsx
�   �   �   +-- HowItWorks.tsx
�   �   �   +-- FontShowcase.tsx
�   �   �   +-- ProblemSolution.tsx
�   �   �   +-- About.tsx
�   �   �   +-- Footer.tsx
�   �   +-- HinglishInput.tsx  # Phonetic input + Unicode preview
�   �   +-- UnicodeInput.tsx   # Direct Unicode input
�   �   +-- FontSelector.tsx   # Multi-font picker (persisted)
�   �   +-- OutputPanel.tsx    # Per-font encoded result + copy
�   �   +-- HistoryDrawer.tsx  # Slide-in history panel
�   �   +-- AdSlot.tsx         # Ad placement component
�   +-- hooks/
�   �   +-- useLocalStorage.ts # Generic persisted state hook
�   �   +-- useDebounce.ts     # Input debounce hook
�   +-- lib/
�   �   +-- hinglishTransliterator.ts  # Phonetic ? Devanagari engine
�   �   +-- devanagariParser.ts        # Unicode Hindi parser
�   �   +-- fontEncoders/
�   �       +-- krutiDev.ts    # Kruti Dev 010 encoding map
�   �       +-- devLys.ts      # DevLys 010 encoding map
�   �       +-- chanakya.ts    # Chanakya encoding map
�   �       +-- shusha.ts      # Shusha encoding map
�   �       +-- index.ts       # Unified encode(fontId, unicode) API
�   +-- pages/
�   �   +-- LandingPage.tsx    # Marketing landing page
�   �   +-- ConverterPage.tsx  # Main converter app
�   +-- App.tsx                # Router (/ ? Landing, /convert ? App)
+-- index.html
+-- vite.config.ts
+-- vercel.json                # SPA fallback routing for Vercel
```

---

## ?? Tech Stack

- **[React 19](https://react.dev)** � UI framework with the latest concurrent features
- **[TypeScript 6](https://www.typescriptlang.org)** � Full type safety across the entire codebase
- **[Vite 8](https://vite.dev)** � Lightning-fast dev server and optimized production bundler
- **[TailwindCSS 4](https://tailwindcss.com)** � Utility-first CSS framework for rapid UI development
- **[GSAP 3 + @gsap/react](https://gsap.com)** � Professional-grade entrance animations
- **[React Router DOM 7](https://reactrouter.com)** � Client-side routing for Landing and Converter pages
- **[Oxlint](https://oxc.rs/docs/guide/usage/linter.html)** � Blazing-fast Rust-based linter

---

## ??? Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/RajKumar476020/HindiTyping-Pro.git

# 2. Navigate into the project
cd HindiTyping-Pro

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be live at **`http://localhost:5173`**.

### Build for Production

```bash
npm run build
```

Output is placed in the `dist/` folder, ready for deployment to Vercel, Netlify, or any static host.

---

## ?? How It Works

```
+-------------------------------------------------------------+
�                     INPUT PIPELINE                          �
�                                                             �
�  Hinglish Text  --?  hinglishTransliterator.ts              �
�  (e.g. "namaste")     (phonetic rules engine)  --?  Unicode �
�                                                      Hindi  �
�  Unicode Hindi  ----------------------------------?  Hindi  �
�  (pasted directly)                                          �
+-------------------------------------------------------------+
                               �  Unicode Devanagari string
                               ?
+-------------------------------------------------------------+
�                   ENCODING PIPELINE                         �
�                                                             �
�  devanagariParser.ts  --?  fontEncoders/krutiDev.ts         �
�  (parse Unicode chars)      fontEncoders/devLys.ts          �
�                             fontEncoders/chanakya.ts        �
�                             fontEncoders/shusha.ts          �
+-------------------------------------------------------------+
                               �  Legacy-encoded strings
                               ?
                    +------------------+
                    �   OutputPanel    �
                    �  (copy & paste)  �
                    +------------------+
```

### Input Modes

1. **Hinglish / Phonetic** � Type roman text ? live transliteration ? editable Unicode intermediate ? encoded output
2. **Unicode Hindi** � Paste Devanagari directly ? encoded output

---

## ?? Supported Fonts

| Font | Common Use |
|---|---|
| **Kruti Dev 010** | Newspapers, government printing |
| **DevLys 010** | DTP and publishing |
| **Chanakya** | Magazines, editorial |
| **Shusha** | Books, formal documents |

> ?? More fonts are planned for future releases.

---

## ?? Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint for code quality checks |

---

## ?? Deployment

This project is configured for **[Vercel](https://vercel.com)** out of the box. The `vercel.json` includes an SPA rewrite rule so that direct navigation to `/convert` works correctly.

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

To deploy:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## ?? Contributing

Contributions are welcome! If you'd like to add a new font encoder, improve the transliteration engine, or fix a bug:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/add-mangal-font`
3. Commit your changes: `git commit -m 'feat: add Mangal font encoder'`
4. Push to the branch: `git push origin feature/add-mangal-font`
5. Open a Pull Request

---

## ?? License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

**????? � Designed for Indian graphic designers.**

Made with ?? for the Indian DTP community.

</div>
