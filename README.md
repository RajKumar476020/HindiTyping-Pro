# HindiTyping Pro

> **The Ultimate Modern Hindi Font Converter & Hinglish Typing Tool for Designers, DTP Operators & Publishers.**

Live real-time transliteration from Hinglish to Unicode Hindi, and instant converter to legacy Hindi fonts: **Kruti Dev 010**, **DevLys 010**, **Chanakya**, and **Shusha**.

---

## ✨ Features

- **Hinglish to Hindi Phonetic Typing**: Type naturally in Roman English (e.g., `namaste`) and get accurate Hindi Devanagari in real-time.
- **Direct Unicode Hindi Input**: Paste or write Unicode Devanagari Hindi text directly.
- **Multiple Legacy Font Encoders**:
  - Kruti Dev 010
  - DevLys 010
  - Chanakya
  - Shusha
- **Instant Preview & Character Counters**: Live output preview with accurate font rendering, character counters, and word counters.
- **1-Click Copy & Quick Actions**: Copy encoded text instantly for use in Photoshop, CorelDRAW, InDesign, PageMaker, MS Word, and more.
- **Smart Conversion History**: Local storage backed conversion history with quick reload and export options.
- **Modern UI & Light / Dark Themes**: Beautiful modern design built with TailwindCSS and GSAP smooth animations.
- **Zero Server Overhead**: 100% client-side conversion engine for blazing-fast speed and complete privacy.

---

## 🛠️ Tech Stack

- **[React 19](https://react.dev)** - UI framework with the latest concurrent features
- **[TypeScript 6](https://www.typescriptlang.org)** - Full type safety across the entire codebase
- **[Vite 8](https://vite.dev)** - Lightning-fast dev server and optimized production bundler
- **[TailwindCSS 4](https://tailwindcss.com)** - Utility-first CSS framework for rapid UI development
- **[GSAP 3 + @gsap/react](https://gsap.com)** - Professional-grade entrance animations
- **[React Router DOM 7](https://reactrouter.com)** - Client-side routing for Landing and Converter pages
- **[Oxlint](https://oxc.rs/docs/guide/usage/linter.html)** - Blazing-fast Rust-based linter

---

## 🚀 Getting Started

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

## 💡 How It Works

```
+-------------------------------------------------------------+
|                     INPUT PIPELINE                          |
|                                                             |
|  Hinglish Text  -->  hinglishTransliterator.ts              |
|  (e.g. "namaste")     (phonetic rules engine)  -->  Unicode |
|                                                      Hindi  |
|  Unicode Hindi  ---------------------------------->  Hindi  |
|  (pasted directly)                                          |
+-------------------------------------------------------------+
                               |  Unicode Devanagari string
                               v
+-------------------------------------------------------------+
|                   ENCODING PIPELINE                         |
|                                                             |
|  devanagariParser.ts  -->  fontEncoders/krutiDev.ts         |
|  (parse Unicode chars)      fontEncoders/devLys.ts          |
|                             fontEncoders/chanakya.ts        |
|                             fontEncoders/shusha.ts          |
+-------------------------------------------------------------+
                               |  Legacy-encoded strings
                               v
                    +------------------+
                    |   OutputPanel    |
                    |  (copy & paste)  |
                    +------------------+
```

### Input Modes

1. **Hinglish / Phonetic** - Type roman text -> live transliteration -> editable Unicode intermediate -> encoded output
2. **Unicode Hindi** - Paste Devanagari directly -> encoded output

---

## 🔤 Supported Fonts

| Font | Common Use |
|---|---|
| **Kruti Dev 010** | Newspapers, government printing |
| **DevLys 010** | DTP and publishing |
| **Chanakya** | Magazines, editorial |
| **Shusha** | Books, formal documents |

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint for code quality checks |

---

## 🌐 Deployment

This project is configured for **[Vercel](https://vercel.com)** out of the box. The `vercel.json` includes an SPA rewrite rule so that direct navigation to `/convert` works correctly.

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 🤝 Contributing

Contributions are welcome! If you'd like to add a new font encoder, improve the transliteration engine, or fix a bug:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-font`
3. Commit your changes: `git commit -m 'feat: add new font encoder'`
4. Push to the branch: `git push origin feature/new-font`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

**HindiTyping Pro - Designed for Indian Graphic Designers & DTP Operators.**

Made with ❤️ for the Indian DTP community.

</div>
