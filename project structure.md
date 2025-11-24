# Project Structure and File Relationships

## Table of Contents
- [Tree](#tree)
- [DetailedTree](#detailedtree)
- [File Details, Relations, and Modifiability](#file-details-relations-and-modifiability)
- [Safe-to-Modify Summary](#safe-to-modify-summary)
- [Linkage Map](#linkage-map)
- [Update Policy](#update-policy)

Last Updated: 2025-11-24

## Tree
```
/(repo root)
├─ index.html
├─ readme.md
├─ QnA.md
├─ project structure.md
├─ diagnostics.html
├─ assets/
│  ├─ styles.css
│  ├─ script.js
│  ├─ script.ts
│  └─ config.js
├─ issues/
│  ├─ index.html
│  └─ 2025-11-24/
│     └─ index.html
├─ content/
│  └─ input.example.md
└─ tools/
   └─ generate_issue.py
```

## DetailedTree
```
/(repo root)
├─ index.html // Homepage: brand, search, language toggle, patrika links, contact chips
├─ readme.md // Updated site guide: features, structure, deployment
├─ QnA.md // Log of questions, answers, and implemented changes
├─ project structure.md // Authoritative guide to structure and file relations
├─ diagnostics.html // Client-side diagnostics for titles, legacy text, and asset checks
├─ assets/
│  ├─ styles.css // Responsive CSS: masthead, grid, cards, chips, contact modal
│  ├─ script.js // Client logic: language toggle, TTS, search, settings, media lazy-load, WhatsApp contact menu
│  ├─ script.ts // TypeScript dev version of client logic (not loaded at runtime)
│  └─ config.js // Holds API base (window.__API_BASE) for backend TTS proxy
├─ issues/
│  ├─ index.html // Listing page aggregating all daily issue pages
│  └─ 2025-11-24/
│     └─ index.html // Sample daily issue page using shared assets
├─ content/
│  └─ input.example.md // Markdown template for generating new issue content
└─ tools/
   └─ generate_issue.py // Generator: builds issues/<date>/index.html and issues/index.html
```

## File Details, Relations, and Modifiability

- index.html
  - Purpose: Homepage in newspaper layout; shows brand, search, language toggle, articles grid, links to patrika pages, contact chips (YouTube, Instagram, Email, WhatsApp).
  - Relations: Uses `assets/styles.css`, `assets/config.js`, `assets/script.js` for styling, API base, functionality, and WhatsApp contact menu.
  - Modifiability: Safe to edit text and sections; keep element IDs/classes used by JS: `#searchInput`, `.lang-btn`, `.card`, `.media`, `.tts-btn`. Changing these requires updating `assets/script.js` accordingly.

- readme.md
  - Purpose: Updated site documentation: features, structure, contacts, diagnostics, deployment.
  - Relations: References file paths and selectors for editing guidance.
  - Modifiability: Free to modify; treat as primary project guide.

- QnA.md
  - Purpose: Log of your questions and my answers and implemented changes.
  - Relations: None.
  - Modifiability: Free to modify; I will append entries as the project proceeds.

- project structure.md (this file)
  - Purpose: Authoritative structure, relations, and modifiability guide.
  - Relations: None.
  - Modifiability: I will update this whenever files are added/removed/renamed.

- assets/styles.css
  - Purpose: Responsive CSS for masthead, navigation chips, contact chips, cards, grids, settings panel, footer buttons, and contact modal.
  - Relations: Referenced by `index.html`, `issues/*/index.html`, `issues/index.html`, `diagnostics.html`.
  - Modifiability: Safe to tweak typography, spacing, colors. Avoid removing classes used by HTML.

- assets/script.js
  - Purpose: Client logic for language toggle, text-to-speech, media lazy preview, search highlighting, settings panel, and WhatsApp contact message chooser.
  - Relations: Expects DOM structure and classes/IDs: `.lang-btn`, `[data-lang]`, `.tts-btn`, `.media`, `#searchInput`, `.settings-toggle`, `#settingsPanel`, `#rate`, `#pitch`, `#voiceHi`, `#voiceEn`, `a.contact` (WhatsApp links).
  - Modifiability: Can be modified independently but keep selectors in sync with HTML. If changing selectors/IDs, update this file. No build step required.

- assets/script.ts
  - Purpose: TypeScript version of client logic with types for development.
  - Relations: Not loaded by HTML at runtime; scope-isolated via `export {}`.
  - Modifiability: Safe to modify; will not affect runtime unless you compile and replace `script.js`.
  - Note: can be deleted later (if not using TypeScript).

- assets/config.js
  - Purpose: Holds `window.__API_BASE` for secure backend proxy. Prevents exposing keys client-side.
  - Relations: Used by `assets/script.js`/`assets/script.ts` to call remote TTS at `${API_BASE}/api/tts`.
  - Modifiability: Safe to set to your backend URL (e.g., `https://your-worker.example.workers.dev`).

- issues/index.html
  - Purpose: Listing page for all daily issues.
  - Relations: Rebuilt by `tools/generate_issue.py` to include all `issues/<date>/index.html`.
  - Modifiability: Typically auto-generated; if you edit manually, the generator may overwrite. Prefer editing via the generator.

- issues/2025-11-24/index.html
  - Purpose: Sample issue page demonstrating the layout and features.
  - Relations: Uses `assets/styles.css`, `assets/config.js`, `assets/script.js`.
  - Modifiability: Safe to edit content; structure should match selectors used in `assets/script.js`.

- content/input.example.md
  - Purpose: Template for creating a new daily issue in markdown.
  - Relations: Parsed by `tools/generate_issue.py`.
  - Modifiability: Safe to copy and adapt; the exact tags (`[body_hi]`, `[body_en]`, `[shlok]`) are expected by the generator.

- tools/generate_issue.py
  - Purpose: Converts `content/<date>.md` into `issues/<date>/index.html` and rebuilds `issues/index.html`.
  - Relations: Reads `content/*.md`; writes to `issues/`.
  - Modifiability: Safe to extend (e.g., multi-article support, new fields). Ensure generated HTML keeps classes/IDs used by `assets/script.js`.

- diagnostics.html
  - Purpose: Runs client-side checks to detect legacy labels, missing assets, and accessibility gaps; suggests fixes.
  - Relations: Loads `assets/styles.css`; fetches pages (`index.html`, `issues/index.html`, `issues/<date>/index.html`).
  - Modifiability: Safe to extend checks; add more pages to the scanned list or auto-discovery.

## Safe-to-Modify Summary
- Safest: `QnA.md`, `readme.md`, `project structure.md`, `content/*.md`, `assets/config.js`, `assets/styles.css`.
- Safe with care: `index.html`, `issues/*/index.html` (keep JS selectors), `assets/script.js` (update selectors consistently), `tools/generate_issue.py` (keep generated HTML compatible).
- Optional/Removable: `assets/script.ts`.

## Linkage Map
- `index.html` → `assets/styles.css`, `assets/config.js`, `assets/script.js`, `issues/index.html`.
- `issues/*/index.html` → `assets/styles.css`, `assets.config.js`, `assets.script.js`.
- `assets/script.js` ↔ HTML selectors (`.lang-btn`, `.tts-btn`, `.media`, `#searchInput`, settings panel IDs, `a.contact`).
- `assets/config.js` → `assets/script.js` URL base for backend.
- `tools/generate_issue.py` → reads `content/*.md` → writes `issues/<date>/index.html`, `issues/index.html`.
- `diagnostics.html` → scans `index.html`, `issues/index.html`, selected `issues/*/index.html` and validates asset links.

## Update Policy
- Whenever files are added/removed/renamed or relationships change, this document will be updated to reflect the latest repository state.
