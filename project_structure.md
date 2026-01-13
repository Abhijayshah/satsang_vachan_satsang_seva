# Project Structure and File Relationships

## Table of Contents
- [Recent Changes (Change Log)](#recent-changes-change-log)
- [Tree](#tree)
- [DetailedTree](#detailedtree)
- [File Details, Relations, and Modifiability](#file-details-relations-and-modifiability)
- [Safe-to-Modify Summary](#safe-to-modify-summary)
- [Linkage Map](#linkage-map)
- [Update Policy](#update-policy)

Last Updated: 2026-01-13

## Recent Changes (Change Log)

### 2026-01-13
*   **Theme Update** (`assets/styles.css`):
    *   **What**: Implemented "Dark Purple & Glassmorphism" design.
    *   **Why**: To create a more devotional, serene, and engaging user experience as per user specifications.
*   **Content Update** (`index.html`):
    *   **What**: Replaced the previous 10-video playlist with a new set of user-provided YouTube embeds (Baba Jai Gurudev Satsang).
    *   **Why**: To refresh the homepage content with specific spiritual videos curated by the user.
*   **Documentation** (`project_structure.md`):
    *   **What**: Updated file tree and added change log.
    *   **Why**: To ensure documentation reflects the current state of the repository including new prototype files.

### 2025-11-24
*   **Initial Documentation**: Created `project_structure.md` and `readme.md` to establish project baselines.

## Tree
```
/(repo root)
├─ index.html
├─ readme.md
├─ QnA.md
├─ project_structure.md
├─ latestUpdate.md
├─ my.md
├─ diagnostics.html
├─ videos.html
├─ webisite.html
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
│  ├─ input.example.md
│  ├─ input.md
│  └─ video_script.md
└─ tools/
   └─ generate_issue.py
```

## DetailedTree
```
/(repo root)
├─ index.html // Homepage: brand, search, language toggle, patrika links, contact chips, video playlist
├─ readme.md // Site guide: features, structure, deployment
├─ QnA.md // Log of questions, answers, and implemented changes
├─ project_structure.md // Authoritative guide to structure and file relations
├─ latestUpdate.md // Backup/Duplicate of previous project structure state
├─ my.md // Developer scratchpad (Do Not Modify)
├─ diagnostics.html // Client-side diagnostics for titles, legacy text, and asset checks
├─ videos.html // Standalone video playlist page
├─ webisite.html // Experimental tab-based SPA prototype (Tailwind CSS)
├─ assets/
│  ├─ styles.css // Responsive CSS: Dark Purple/Glassmorphism theme, grid, cards
│  ├─ script.js // Client logic: language toggle, TTS, search, settings, media lazy-load
│  ├─ script.ts // TypeScript dev version of client logic (not loaded at runtime)
│  └─ config.js // Holds API base (window.__API_BASE) for backend TTS proxy
├─ issues/
│  ├─ index.html // Listing page aggregating all daily issue pages
│  └─ 2025-11-24/
│     └─ index.html // Sample daily issue page using shared assets
├─ content/
│  ├─ input.example.md // Markdown template for generating new issue content
│  ├─ input.md // Active content input file
│  └─ video_script.md // Script content for video production
└─ tools/
   └─ generate_issue.py // Generator: builds issues/<date>/index.html and issues/index.html
```

## File Details, Relations, and Modifiability

- **index.html**
  - **Purpose**: Main entry point. Features newspaper layout, video playlist, and contact links.
  - **Relations**: Linked to `assets/styles.css`, `assets/config.js`, `assets/script.js`.
  - **Modifiability**: Safe to edit content. Preserve IDs/classes: `#searchInput`, `.lang-btn`, `.card`, `.video-card`.

- **assets/styles.css**
  - **Purpose**: Core styling. Implements the "Dark Purple & Glassmorphism" theme (Variables: `--bg-gradient`, `--glass-bg`).
  - **Relations**: Used by `index.html`, `issues/*.html`.
  - **Modifiability**: Safe to tweak colors/spacing. Critical for site aesthetic.

- **assets/script.js**
  - **Purpose**: Frontend logic (TTS, Lazy Load, Search).
  - **Relations**: Manipulates DOM elements in `index.html`.
  - **Modifiability**: Update if changing HTML structure.

- **project_structure.md** (this file)
  - **Purpose**: Single authoritative source of truth for project structure.
  - **Modifiability**: Update strictly when files are added/removed or architecture changes.

- **my.md**
  - **Purpose**: Developer's personal scratchpad.
  - **Modifiability**: **DO NOT MODIFY** via AI tools. User only.

- **webisite.html**
  - **Purpose**: Prototype/Experiment for a tab-based interface using Tailwind CSS.
  - **Relations**: Independent.
  - **Modifiability**: Experimental.

- **videos.html**
  - **Purpose**: Dedicated page for video content.
  - **Relations**: Likely shares assets or content strategy with index.html.

- **tools/generate_issue.py**
  - **Purpose**: Python script to generate HTML issues from Markdown in `content/`.
  - **Relations**: Reads `content/*.md`, writes `issues/`.

## Safe-to-Modify Summary
- **Safest**: `readme.md`, `project_structure.md`, `content/*.md`.
- **Safe with care**: `index.html`, `assets/styles.css`, `assets/script.js`.
- **Restricted**: `my.md` (User only).

## Linkage Map
- `index.html` → `assets/styles.css`, `assets/script.js`
- `tools/generate_issue.py` → Reads `content/` → Writes `issues/`
- `diagnostics.html` → Scans `index.html`, `issues/`

## Update Policy
- Whenever files are added/removed/renamed or relationships change, this document will be updated to reflect the latest repository state.


