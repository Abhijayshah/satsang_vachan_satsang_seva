# Project Structure and File Relationships

## Table of Contents
- [Recent Changes (Change Log)](#recent-changes-change-log)
- [Tree](#tree)
- [DetailedTree](#detailedtree)
- [File Details, Relations, and Modifiability](#file-details-relations-and-modifiability)
- [Safe-to-Modify Summary](#safe-to-modify-summary)
- [Linkage Map](#linkage-map)
- [Update Policy](#update-policy)

Last Updated: 2026-02-11

## Recent Changes (Change Log)

### 2026-02-11
*   **Feature Update**:
    *   **What**: Replaced `issues/` directory with `patrika/` for better branding.
    *   **Why**: "Patrika" is the preferred term for the weekly magazine.
*   **Architecture Update**:
    *   **What**: Implemented dedicated directory-based routing (`about/`, `satsang/`, `music/`, etc.) for clean URLs.
    *   **Why**: To support a multi-page architecture with separate, focused pages for each navigation item.
*   **Cleanup**:
    *   **What**: Deleted legacy/experimental files (`videos.html`, `webisite.html`, `diagnostics.html`).
    *   **Why**: To remove unused code and keep the repository clean.
*   **Organization**:
    *   **What**: Moved documentation files into `dotmdfile/` (except `readme.md`).
    *   **Why**: To unclutter the root directory.

### 2026-01-13
*   **Theme Update** (`assets/styles.css`):
    *   **What**: Implemented "Dark Purple & Glassmorphism" design.
    *   **Why**: To create a more devotional, serene, and engaging user experience as per user specifications.
*   **Content Update** (`index.html`):
    *   **What**: Replaced the previous 10-video playlist with a new set of user-provided YouTube embeds (Baba Jai Gurudev Satsang).
    *   **Why**: To refresh the homepage content with specific spiritual videos curated by the user.

## Tree
```
/(repo root)
├─ index.html
├─ readme.md
├─ CNAME
├─ .gitignore
├─ about/
│  └─ index.html
├─ satsang/
│  └─ index.html
├─ podcast/
│  └─ index.html
├─ music/
│  └─ index.html
├─ bhajan/
│  └─ index.html
├─ patrika/
│  └─ index.html
├─ book/
│  └─ index.html
├─ contact/
│  └─ index.html
├─ assets/
│  ├─ styles.css
│  ├─ script.js
│  ├─ script.ts
│  └─ config.js
├─ dotmdfile/
│  ├─ QnA.md
│  ├─ project_structure.md
│  ├─ latestUpdate.md
│  └─ my.md
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
├─ index.html // Homepage: brand, search, language toggle, patrika links, contact chips
├─ readme.md // Site guide: features, structure, deployment
├─ CNAME // GitHub Pages custom domain configuration
├─ .gitignore // Git configuration
├─ about/index.html // Dedicated About Us page
├─ satsang/index.html // Dedicated Satsang video playlist page
├─ podcast/index.html // Dedicated Podcast page
├─ music/index.html // Dedicated Music page
├─ bhajan/index.html // Dedicated Bhajan page
├─ patrika/index.html // Dedicated Patrika (Magazine) archive page
├─ book/index.html // Dedicated Book/Literature page
├─ contact/index.html // Dedicated Contact page
├─ assets/
│  ├─ styles.css // Responsive CSS: Dark Purple/Glassmorphism theme, grid, cards
│  ├─ script.js // Client logic: language toggle, TTS, search, settings, media lazy-load
│  ├─ script.ts // TypeScript dev version of client logic (not loaded at runtime)
│  └─ config.js // Holds API base (window.__API_BASE) for backend TTS proxy
├─ dotmdfile/
│  ├─ QnA.md // Log of questions, answers, and implemented changes
│  ├─ project_structure.md // Authoritative guide to structure and file relations
│  ├─ latestUpdate.md // Backup/Duplicate of previous project structure state
│  └─ my.md // Developer scratchpad (Do Not Modify)
├─ content/
│  ├─ input.example.md // Markdown template for generating new issue content
│  ├─ input.md // Active content input file
│  └─ video_script.md // Script content for video production
└─ tools/
   └─ generate_issue.py // Generator: builds issues/<date>/index.html and issues/index.html (Needs update for Patrika)
```

## File Details, Relations, and Modifiability

- **index.html & */index.html**
  - **Purpose**: Main entry points for each section (Home, About, Satsang, etc.).
  - **Relations**: Linked to `assets/styles.css`, `assets/config.js`, `assets/script.js`.
  - **Modifiability**: Safe to edit content. Preserve IDs/classes: `#searchInput`, `.lang-btn`, `.card`, `.video-card`.

- **patrika/index.html**
  - **Purpose**: Replaces the old `issues/` directory. Serves as the archive for weekly magazines.
  - **Relations**: Linked from main navbar.

- **assets/styles.css**
  - **Purpose**: Core styling. Implements the "Dark Purple & Glassmorphism" theme (Variables: `--bg-gradient`, `--glass-bg`).
  - **Relations**: Used by all HTML pages.
  - **Modifiability**: Safe to tweak colors/spacing. Critical for site aesthetic.

- **assets/script.js**
  - **Purpose**: Frontend logic (TTS, Lazy Load, Search, Navigation).
  - **Relations**: Manipulates DOM elements in all HTML pages.
  - **Modifiability**: Update if changing HTML structure.

- **dotmdfile/project_structure.md** (this file)
  - **Purpose**: Single authoritative source of truth for project structure.
  - **Modifiability**: Update strictly when files are added/removed or architecture changes.

- **dotmdfile/my.md**
  - **Purpose**: Developer's personal scratchpad.
  - **Modifiability**: **DO NOT MODIFY** via AI tools. User only.

- **tools/generate_issue.py**
  - **Purpose**: Python script to generate HTML issues from Markdown in `content/`.
  - **Relations**: Reads `content/*.md`, writes `issues/` (Legacy).

## Safe-to-Modify Summary
- **Safest**: `readme.md`, `dotmdfile/project_structure.md`, `content/*.md`.
- **Safe with care**: `index.html`, `*/index.html`, `assets/styles.css`, `assets/script.js`.
- **Restricted**: `dotmdfile/my.md` (User only).

## Linkage Map
- `index.html` → `assets/styles.css`, `assets/script.js`, `satsang/`, `about/`, `patrika/`, etc.
- `tools/generate_issue.py` → Reads `content/` → Writes `issues/` (Legacy path, to be updated)

## Update Policy
- Whenever files are added/removed/renamed or relationships change, this document will be updated to reflect the latest repository state.
