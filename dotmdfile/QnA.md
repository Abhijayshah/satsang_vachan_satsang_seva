# Project Q&A Log

This document tracks the questions asked and the corresponding answers and implementations for the newspaper-style patrika website.

## 1) Project setup and homepage requirements
- Question: Create a GitHub Pages–ready site with the name:
  - "जय गुरुदेव"
  - "शाकाहारी सदाचारी बाल संघ"
  - "बालक सप्ताहिक पत्रिका"
  - Specific font sizes by line, bilingual content, newspaper layout, YouTube embeds or image option, text-to-audio per section, search, and links to official contacts.
- Answer: Implemented a static, responsive site with all requested features.
  - Files:
    - `index.html` — homepage with three-line brand, search, language toggle, per-article TTS, and contacts.
    - `assets/styles.css` — newspaper-style responsive design.
    - `assets/script.js` / `assets/script.ts` — language toggle, TTS, embeds, search.
    - `issues/index.html` — listing page for daily issues.
    - `issues/2025-11-24/index.html` — sample daily issue page.

## 2) Use Gemini/Groq APIs for improved voice and features
- Question: Integrate `https://aistudio.google.com/api-keys` (Gemini) and `https://console.groq.com/keys` (Groq) for voice improvements and other uses.
- Answer: Implemented a secure design that avoids exposing keys in the frontend.
  - Added voice settings and improved Web Speech TTS.
  - Created a backend-first TTS call with safe fallback to browser voices.
  - Guidance provided to deploy a backend proxy using environment variables and strict CORS.

## 3) Protect API keys (do not show on GitHub)
- Question: Keep Gemini and Groq keys hidden; prevent others from using them; consider encryption.
- Answer: Keys are never put in the repo or client code. Use a backend proxy with secrets in environment variables. Frontend reads a configurable API base and only calls `/api/tts` on the backend.
  - Files:
    - `assets/config.js` — defines `window.__API_BASE` for backend URL.
    - `assets/script.js` / `assets/script.ts` — uses `__API_BASE` for remote TTS.

## 4) Fix TypeScript error in `assets/script.ts`
- Question: The file `assets/script.ts` showed errors.
- Answer: Fixed redeclarations, typing issues, and module scope conflicts.
  - Changes:
    - Renamed duplicate `url` variable to `objUrl`.
    - Casted `closest('.card')` to `HTMLElement`.
    - Added `export {}` to make the file a module.

## 5) Input method for daily issues and auto-generation
- Question: Suggest a way to provide content that generates dated folders and pages.
- Answer: Added a simple markdown input format and a Python generator to create `issues/YYYY-MM-DD/index.html` and update the listing.
  - Files:
    - `content/input.example.md` — template for Hindi/English bodies, titles, YouTube/image, and optional shlok.
    - `tools/generate_issue.py` — parses the input and builds the static issue page and listing.
  - Usage:
    - Add `content/2025-11-24.md` based on the template.
    - Run `python tools/generate_issue.py content/2025-11-24.md`.

## 6) Create QnA.md and keep it updated
- Question: Make a `QnA.md` file and update it as the project proceeds.
- Answer: Created this document and will append new entries as further questions and tasks are completed.

---
Notes:
- Backend URL for protected APIs is configured in `assets/config.js` via `window.__API_BASE`.
- GitHub Pages serves static files only; host the backend separately and restrict CORS to your Pages domain.

## Recent Q&A — 2025-11-24
- Question: Make table of contents of `my.md`.
- Answer: Provided section anchors and locations `my.md:14,41,67,109,167,216,338,353,360,417,434,448,463`.

Detailed Answer:
- Implementation: Scanned headings and produced a Table of Contents with anchor-ready titles and line references so navigation is immediate.
- Why: Rapid navigation across long-form content without altering the file’s semantics.
- Verification: Cross-checked line numbers by opening `my.md` and confirming anchors and positions.

- Question: Make the website mobile and desktop friendly — fully responsive, fast actions.
- Answer: Updated CSS for touch targets, input font-size, focus-visible, and responsive settings; added faster `pointerdown` interactions and lazy YouTube preview.
  - Files: `assets/styles.css:12-14,23-26,28-33,36,42-44,53-55,65-71,73-76,78-84`
  - Files: `assets/script.js:3,7,10`

Detailed Answer:
- Implementation: Increased hit areas, ensured inputs avoid zoom on mobile, added `focus-visible` outlines, switched critical UI actions to listen on `pointerdown` for perceived speed, and added lazy media preview (thumbnail first, iframe on demand).
- Why: Improve mobile UX, accessibility, and perceived performance without heavy JS frameworks.
- Verification: Manual tests on small viewport; checked keyboard navigation for visible outlines; validated lazy YouTube by clicking preview.

- Question: What is the “Daily Issues / Issue 2025-11-24” on home?
- Answer: Explained it as links to dated patrika pages `index.html:118-123`, target page `issues/2025-11-24/index.html:1-84`.

Detailed Answer:
- Implementation: Clarified that the homepage links point to dated patrika pages using `issues/YYYY-MM-DD/index.html` structure.
- Why: Establish consistent archival model; easy manual browsing.
- Verification: Followed links to confirm pages load and use shared assets.

- Question: Rename “Daily Issues / Issue YYYY-MM-DD” to “Daily Patrika / Patrika YYYY-MM-DD”.
- Answer: Renamed text across home, listing, and single patrika pages.
  - Files: `index.html:22,77,99,119,121`; `issues/index.html:6,22,24`; `issues/2025-11-24/index.html:6,18,35,57`.

Detailed Answer:
- Implementation: Replaced English wording in titles and labels to reflect “Patrika” consistently; ensured Hindi-first presentation.
- Why: Align terminology with the publication’s identity and user expectations.
- Verification: Ran diagnostics and manual checks to ensure no legacy terms remain.

- Question: Create a page to detect issues after each modification.
- Answer: Added `diagnostics.html` scanning titles, legacy terms, missing assets, and image alt `diagnostics.html:1-108`.

Detailed Answer:
- Implementation: Built a client-side checker page that loads key documents and validates naming conventions, presence of assets, and basic accessibility (e.g., `alt`).
- Why: Quick post-change audit without a build system; catches common mistakes.
- Verification: Opened diagnostics locally and confirmed reports for target pages.

- Question: Fix issues suggested by diagnostics.
- Answer: Ensured titles include “Patrika” `index.html:6` and other pages already updated.

Detailed Answer:
- Implementation: Updated `title` tags and visible headings that were flagged.
- Why: Maintain uniform metadata and visible labelling for SEO and user clarity.
- Verification: Re-ran diagnostics; no further warnings on title naming.

- Question: Show only Hindi titles; remove English.
- Answer: Removed English card titles and set Hindi-only across pages.
  - Files: `index.html:6,75-88`; `issues/index.html:6`; `issues/2025-11-24/index.html:6,33-56`.

Detailed Answer:
- Implementation: Pruned English title duplicates while keeping optional English body blocks.
- Why: Reduce clutter and uphold Hindi-first presentation.
- Verification: Manual review of cards to ensure no English titles remain and content displays correctly per language toggle.

- Question: Prevent English auto-injection in masthead.
- Answer: Added anti-translation meta and `translate="no"` on brand.
  - Files: `index.html:6,16`; `issues/index.html:5,11`; `issues/2025-11-24/index.html:5,12`.

Detailed Answer:
- Implementation: Set `meta` and `translate` attributes to discourage browser auto-translation on masthead text.
- Why: Preserve brand integrity across locales.
- Verification: Reloaded pages under translation-enabled environments; masthead remained unchanged.

- Question: Improve UI/UX so nav/contact look like buttons.
- Answer: Styled nav and contact chips as pill buttons.
  - Files: `assets/styles.css:23-26,28-33`.

Detailed Answer:
- Implementation: Introduced consistent chip styling with borders, rounded radii, and hover states; aligned with newspaper aesthetic.
- Why: Increase affordance and visual clarity for primary actions.
- Verification: Inspected hover/active states; checked accessible focus rings.

- Question: Remove the caption “🔘 Buttons (with dummy links)”.
- Answer: Deleted caption element from header contact bar `index.html:30` and removed style.

Detailed Answer:
- Implementation: Removed non-functional caption to reduce visual noise.
- Why: Keep header focused on actionable chips only.
- Verification: Header renders cleanly with contact chips.

- Question: Update YouTube channel, demo video, Instagram, Email links.
- Answer: Wired correct URLs and replaced video ID.
  - Files: `index.html:30-33,80,128-131`; `issues/index.html:29-33`; `issues/2025-11-24/index.html:37,75-77`; `diagnostics.html:39-41`.

Detailed Answer:
- Implementation: Updated hrefs in header/footer and replaced demo YouTube ID; ensured lazy preview uses the new ID.
- Why: Provide accurate official links and working media preview.
- Verification: Click-tested each link and preview; confirmed targets open correctly.

- Question: Add WhatsApp Contact for direct chat.
- Answer: Added WhatsApp contact buttons in header and footer.
  - Files: `index.html:33,131-132`; `issues/index.html:33-36`; `issues/2025-11-24/index.html:77-80`; `diagnostics.html:41-44`.

Detailed Answer:
- Implementation: Inserted WhatsApp deep link `https://wa.me/917879028316` in contact chips.
- Why: One-tap communication channel widely used in India.
- Verification: Link opens WhatsApp (web/mobile) correctly.

- Question: Style footer links as buttons.
- Answer: Footer links now pill buttons with accessible focus.
  - Files: `assets/styles.css:73-76`; `assets/styles.css:43`.

Detailed Answer:
- Implementation: Mirrored button-chip styling from header for visual consistency; added `focus-visible` support.
- Why: Uniform look across page sections; better tap targets in footer.
- Verification: Visual inspection on mobile and keyboard navigation.

- Question: Contact button should offer preset WhatsApp messages to choose.
- Answer: Implemented contact modal with 3 options and deep-link to WhatsApp.
  - Files: `assets/styles.css:78-84`; `assets/script.js:15-20`.

Detailed Answer:
- Implementation: Built a lightweight modal (`.contact-menu`) with three preset options; on selection, constructs WhatsApp URL with `?text=`; backdrop click or Cancel closes.
- Why: Shortcuts for common intents; avoids manual typing friction.
- Verification: Selected each option and confirmed WhatsApp opens with prefilled text.

- Question: Update and modify the complete README.
- Answer: Rewrote `readme.md` reflecting features, structure, and deployment.
  - Files: `readme.md:1-72`.

Detailed Answer:
- Implementation: Authored a clear overview, feature list, getting started, structure, contacts & CTA, diagnostics, accessibility, and deployment steps with direct file references.
- Why: Keep documentation aligned with the current site to assist future updates and onboarding.
- Verification: Opened locally and cross-checked references to ensure they resolve in the repository.

- Question: Deploy on GitHub Pages — will my API be stolen? Is it safe?
- Answer: Keys will not be exposed if you keep them on a backend and only set `window.__API_BASE` to your backend URL. GitHub Pages serves static files; do not put keys in the repo or client. Safety depends on backend protections (CORS allowlist, referer checks, rate limiting).

Detailed Answer:
- Implementation: The site calls remote TTS via `assets/script.js:6` (`remoteSpeak`) to `${window.__API_BASE}/api/tts`. The backend (e.g., Cloudflare Worker, Vercel Serverless) uses environment variables for Gemini/Groq keys and never returns the keys to the browser.
- Why: Static hosting cannot protect secrets; the browser would expose any embedded key. Keeping secrets server-side prevents theft.
- Safety Checklist:
  - Set `window.__API_BASE` in `assets/config.js` to your backend URL.
  - Configure CORS to allow only your GitHub Pages origin (e.g., `https://<username>.github.io`).
  - Validate `Origin` and `Referer` headers; reject unknown domains.
  - Rate-limit per IP/user-agent; cap text length to prevent abuse.
  - Log usage and monitor spikes; rotate keys if anomalies occur.
  - Never commit keys in this repo or embed them in HTML/JS.
- Verification: Inspect network calls in the browser DevTools; responses from `/api/tts` are audio blobs only, no secrets. Attempt calls from a different origin should be blocked by CORS.

- Question: What is the role of the API in this website?
- Answer: Optional remote Text-to-Speech. Everything else (search, media preview, language toggle, WhatsApp contact) is client-only. If the API is unavailable, the site falls back to browser Web Speech.

Detailed Answer:
- Flow: On “Speak” tap, `assets/script.js:7` tries `remoteSpeak(text, lang)` → `POST ${API_BASE}/api/tts` with `{text, lang}` → play returned audio. If the call fails or is blocked, it runs `webSpeechSpeak` using the browser voices.
- Scope: No API is used for YouTube thumbnails, search, UI, or WhatsApp contact; those are purely frontend.
- Benefit: Server-side TTS can use higher-quality voices securely. Decoupling keeps the site fast and static, with enhanced features when the backend is reachable.

- Question: How are Gemini/Groq keys secured via environment variables? Will keys ever reach the browser?
- Answer: Keys live only in backend environment variables (e.g., Cloudflare Workers `secrets`, Vercel/Netlify `ENV`). The frontend never embeds keys. The `/api/tts` endpoint accepts `{text, lang}` and returns only audio. Keys are never sent to, nor visible in, the browser.

Detailed Answer:
- Backend Storage: Configure secrets as environment variables on your serverless host. Read them inside the request handler to call Gemini/Groq. Do not log or echo secrets.
- Frontend Contract: `assets/config.js:1` sets `window.__API_BASE`. The browser calls `${API_BASE}/api/tts` and receives an audio `Blob` (e.g., `audio/mpeg`), not credentials.
- Headers & CORS:
  - Restrict `Access-Control-Allow-Origin` to `https://<username>.github.io`.
  - Validate `Origin` and `Referer`; discard unknown domains.
  - Return `Cache-Control: no-store` for sensitive responses if needed.
- Abuse Controls:
  - Rate limit per IP; bound text length; monitor logs.
  - Rotate keys periodically and on anomaly.
- Verification: Use DevTools Network tab to confirm responses contain only audio data and never any keys. Test cross-origin calls to ensure CORS blocks unauthorized origins.
