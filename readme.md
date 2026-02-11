# Jay Guru Dev - Satsang Vachan Satsang Seva

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Tech Stack](https://img.shields.io/badge/tech-HTML%20%7C%20CSS%20%7C%20JS-yellow.svg)

**Jay Guru Dev - Shakahari Sadachari Bal Sangh - Balak Saptahik Patrika** is a spiritual web platform dedicated to sharing the teachings of Baba Jai Gurudev. It serves as a digital "Patrika" (magazine) offering bilingual spiritual articles, satsang videos, and resources for millions of followers worldwide.

## 📖 Project Overview

This project is a modern, high-performance static website built to deliver spiritual content effectively across all devices. It features a devotional "Glassmorphism" aesthetic, seamless bilingual support (Hindi/English), and accessibility tools like Text-to-Speech.

**Target Audience:** Devotees, spiritual seekers, and the vegetarian community.

---

## 🛠 Tech Stack

The project adheres to a "Vanilla" philosophy for maximum performance, longevity, and ease of maintenance.

*   **Frontend:** HTML5, CSS3, JavaScript (ES6+)
*   **Styling:** Custom CSS with CSS Variables, Flexbox, Grid, and Glassmorphism effects.
*   **Logic:** Pure Vanilla JS (No frameworks like React or Vue).
*   **Build Tools:** Python 3 (for static content generation).
*   **Deployment:** GitHub Pages (Custom Domain: [satsangvachansatsangseva.online](http://satsangvachansatsangseva.online)).

---

## 📂 Folder Structure

```
satsang_vachan_satsang_seva/
├── assets/                 # Static assets
│   ├── styles.css          # Global styles, variables, and themes
│   └── script.js           # Core application logic (UI, TTS, Media)
├── content/                # Raw content source
│   ├── input.md            # Markdown source for new issues
│   └── video_script.md     # Video production scripts
├── issues/                 # Generated static pages
│   ├── index.html          # Archive/Listing of all issues
│   └── [date]/index.html   # Individual issue pages
├── tools/                  # Automation scripts
│   └── generate_issue.py   # Python script to compile MD -> HTML
├── index.html              # Main Landing Page
├── videos.html             # Dedicated Video Gallery
├── latestUpdate.md         # Changelog and update tracking
├── project_structure.md    # Detailed documentation of file relationships
└── CNAME                   # Custom domain configuration
```

---

## ✨ Key Features

*   **🎨 Devotional Glassmorphism UI:** A serene, modern interface featuring deep purple gradients, gold accents, and frosted glass effects to create a spiritual ambiance.
*   **🇮🇳/🇬🇧 Bilingual Toggle:** Instantly switch content visibility between Hindi and English or view both side-by-side.
*   **🗣️ Text-to-Speech (TTS):** Integrated Web Speech API reader with customizable rate, pitch, and voice selection for accessibility.
*   **🎥 Optimized Video Player:** Custom-built YouTube embeds with:
    *   Lazy loading (thumbnail first).
    *   Auto-pause logic (stops other videos when one plays).
    *   JSON-LD VideoObject Schema injection for SEO.
    *   Devotional "Play" button styling.
*   **⚡ High Performance:**
    *   Zero external JS dependencies.
    *   Lazy loading for all images and iframes.
    *   Minimal DOM footprint.
*   **🔍 Instant Search:** Client-side real-time search with text highlighting.
*   **📱 Fully Responsive:** "Mobile-First" design using CSS Grid/Flexbox to ensure perfect rendering on phones, tablets, and desktops.

---

## 🚀 Setup & Local Development

Since this is a static site, setup is incredibly simple.

### Prerequisites
*   A modern web browser (Chrome, Firefox, Edge, Safari).
*   (Optional) Python 3.x if you intend to generate new issue pages.

### Running Locally
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YourUsername/satsang_vachan_satsang_seva.git
    cd satsang_vachan_satsang_seva
    ```
2.  **Serve the files:**
    *   **VS Code:** Install the "Live Server" extension and click "Go Live".
    *   **Python:** Run `python3 -m http.server 8000` and open `http://localhost:8000`.

### Generating New Content
To create a new "Patrika" issue from Markdown:
1.  Edit `content/input.md` with your article content (supports custom tags like `[body_hi]`, `[body_en]`).
2.  Run the generator script:
    ```bash
    python3 tools/generate_issue.py
    ```
3.  The new HTML page will be generated in the `issues/` directory.

---

## 🌐 Deployment

The site is configured for **GitHub Pages**.

*   **Branch:** `main`
*   **Custom Domain:** `satsangvachansatsangseva.online`
*   **Configuration:** The `CNAME` file in the root ensures traffic is correctly routed.

To deploy changes, simply push to the `main` branch:
```bash
git add .
git commit -m "Update content"
git push origin main
```

---

## ⚡ Performance & Best Practices

*   **SEO:** Extensive use of Semantic HTML (`<article>`, `<section>`, `<nav>`), Meta tags, and JSON-LD Structured Data for videos.
*   **Accessibility:** ARIA labels for interactive elements, keyboard navigation support, and high-contrast text.
*   **Efficiency:**
    *   `loading="lazy"` on all media.
    *   Debounced search input to prevent layout thrashing.
    *   Event delegation for handling dynamic content.

---

## 🔮 Future Improvements

*   [ ] **PWA Support:** Add a Service Worker and Manifest for offline reading.
*   [ ] **Backend Integration:** Transition to a CMS for easier content management without Git.
*   [ ] **Newsletter:** Email subscription integration.
*   [ ] **Dark/Light Mode:** Toggle for reading preference (currently optimized for Dark Devotional theme).

---

## 🤝 Contribution Guidelines

Contributions are welcome! Please follow these steps:
1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <b>Jay Guru Dev</b><br>
  <i>Spiritual inspiration for a better life.</i>
</div>
