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
├─ index.html // Homepage: brand, search, language toggle, issues links
├─ readme.md // Legacy notes; not required by the site
├─ QnA.md // Log of questions, answers, and implemented changes
├─ project structure.md // Authoritative guide to structure and file relations
├─ assets/
│  ├─ styles.css // Responsive newspaper-style CSS for layout and components
│  ├─ script.js // Client logic: language toggle, TTS, search, settings panel
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
  - Purpose: Homepage in newspaper layout; shows brand, search, language toggle, articles grid, links to daily issues.
  - Relations: Uses `assets/styles.css`, `assets/config.js`, `assets/script.js` for styling, API base, and functionality.
  - Modifiability: Safe to edit text and sections; keep element IDs/classes used by JS: `#searchInput`, `.lang-btn`, `.card`, `.media`, `.tts-btn`. Changing these requires updating `assets/script.js` accordingly.

- readme.md
  - Purpose: Legacy notes; not required by the site.
  - Relations: None.
  - Modifiability: Free to modify or prune.
  - Note: can be deleted later.

- QnA.md
  - Purpose: Log of your questions and my answers and implemented changes.
  - Relations: None.
  - Modifiability: Free to modify; I will append entries as the project proceeds.

- project structure.md (this file)
  - Purpose: Authoritative structure, relations, and modifiability guide.
  - Relations: None.
  - Modifiability: I will update this whenever files are added/removed/renamed.

- assets/styles.css
  - Purpose: Responsive newspaper-style CSS; brand sizes, grid, cards, controls.
  - Relations: Referenced by `index.html`, `issues/*/index.html`, `issues/index.html`.
  - Modifiability: Safe to tweak typography, spacing, colors. Avoid removing classes used by HTML.

- assets/script.js
  - Purpose: Client logic for language toggle, text-to-speech, media embeds, search highlighting, settings panel.
  - Relations: Expects DOM structure and classes/IDs: `.lang-btn`, `[data-lang]`, `.tts-btn`, `.media`, `#searchInput`, `.settings-toggle`, `#settingsPanel`, `#rate`, `#pitch`, `#voiceHi`, `#voiceEn`.
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

## Safe-to-Modify Summary
- Safest: `QnA.md`, `readme.md`, `project structure.md`, `content/*.md`, `assets/config.js`, `assets/styles.css`.
- Safe with care: `index.html`, `issues/*/index.html` (keep JS selectors), `assets/script.js` (update selectors consistently), `tools/generate_issue.py` (keep generated HTML compatible).
- Optional/Removable: `assets/script.ts`, `readme.md`.

## Linkage Map
- `index.html` → `assets/styles.css`, `assets/config.js`, `assets/script.js`, `issues/index.html`.
- `issues/*/index.html` → `assets/styles.css`, `assets/config.js`, `assets/script.js`.
- `assets/script.js` ↔ HTML selectors (`.lang-btn`, `.tts-btn`, `.media`, `#searchInput`, settings panel IDs).
- `assets/config.js` → `assets/script.js` URL base for backend.
- `tools/generate_issue.py` → reads `content/*.md` → writes `issues/<date>/index.html`, `issues/index.html`.

## Update Policy
- Whenever files are added/removed/renamed or relationships change, this document will be updated to reflect the latest repository state.
