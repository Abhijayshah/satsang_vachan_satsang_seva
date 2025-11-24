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
