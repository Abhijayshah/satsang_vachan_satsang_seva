Satsang Vachan Satsang Seva — Weekly Patrika

Overview
- Newspaper-style static site for the weekly patrika in Hindi.
- Mobile-first, fast interactions, and accessible focus outlines.
- Contact CTA with WhatsApp message choices for direct communication.

Key Features
- Three-line Hindi masthead with responsive typography `index.html:16-20`.
- Button-style navigation and contact chips `assets/styles.css:22-30`.
- Client-side search with inline highlight `index.html:37-40`, `assets/script.js:12`.
- Hindi/English content blocks per card; titles are Hindi-only `index.html:75-99`.
- Text-to-Speech with voice rate/pitch and selectable voices `index.html:47-71`, `assets/script.js:1-6,14`.
- YouTube lazy preview: thumbnail first, iframe on tap `index.html:80`, `assets/script.js:8-10`.
- Diagnostics page to detect naming/asset issues `diagnostics.html:1-108`.
- Contact buttons wired to YouTube, Instagram, Email, and WhatsApp `index.html:28-34,126-132`.

Getting Started
1) Run locally
- Python: `python3 -m http.server 8000`
- Visit `http://localhost:8000/`

2) Project structure
- `index.html` — Homepage and links to patrika items.
- `issues/index.html` — Index listing for patrika entries.
- `issues/2025-11-24/index.html` — Example patrika page.
- `assets/styles.css` — Global styles, responsive layout, button chips.
- `assets/script.js` — Search, TTS, media lazy-load, contact WhatsApp choices.
- `assets/config.js` — Client config placeholder.
- `diagnostics.html` — Project checks for naming and asset references.

Content & Media
- Add cards on the homepage in `index.html:74-116`.
- To embed a video, set `data-youtube-id` on `.media` `index.html:80`.
- English text blocks are optional; titles remain Hindi-only.

Create a New Patrika Page
1) Copy the example `issues/2025-11-24/index.html` to `issues/YYYY-MM-DD/index.html`.
2) Edit the masthead and card content as needed `issues/2025-11-24/index.html:12-71`.
3) Link it from the homepage list `index.html:118-123` or `issues/index.html:21-26`.

Contacts & CTA
- Header contact chips `index.html:28-34`:
  - YouTube Channel → `https://www.youtube.com/channel/UCEMWkI5hw0oLnaFJAwCMECg`
  - Instagram → `https://www.instagram.com/satsang_vachan_satsang_seva/`
  - Email → `mailto:abhijayshah74@gmail.com`
  - Contact (WhatsApp) → `https://wa.me/917879028316`
- The WhatsApp “Contact” opens a selection panel with preset messages `assets/script.js:14-16`.
  - Edit choices in the `opts` array inside `openContactMenu` to customize.

Diagnostics
- Visit `http://localhost:8000/diagnostics.html` after changes.
- Reports:
  - Pages missing “Patrika” in titles.
  - Legacy text: “Daily Patrika” vs “Daily Issues”, and “Patrika YYYY-MM-DD” vs “Issue YYYY-MM-DD”.
  - Missing styles/scripts and image `alt`.

Accessibility & UX
- Large touch targets and pill buttons for nav/contact chips.
- `focus-visible` outlines for keyboard users `assets/styles.css:38`.
- Prevent unwanted auto-translation for masthead with `translate="no"` and `notranslate` meta `index.html:6,16`.

Deployment (GitHub Pages)
1) Push repository to GitHub.
2) Repository → Settings → Pages → choose branch (`main` or `gh-pages`) and root.
3) Visit `https://<username>.github.io/<repo>/`.

Notes
- Use `Noto Sans Devanagari` for consistent Hindi typography `index.html:11`, `assets/styles.css:13`.
- TTS quality depends on the user’s browser; for higher fidelity, consider server-side TTS.
- YouTube preview thumbnails auto-generate from the video ID.
