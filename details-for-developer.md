# Project Documentation: Satsang Vachan Satsang Seva

**Last Updated:** 2026-04-11  
**Version:** 1.0.0

---

## 1. PROJECT OVERVIEW
- **Project Name**: Jay Guru Dev - Satsang Vachan Satsang Seva
- **Description**: A modern, high-performance spiritual web platform dedicated to sharing the teachings of Baba Jai Gurudev. It serves as a digital "Patrika" (magazine) offering bilingual spiritual articles, satsang videos, and resources.
- **Main Goal**: To deliver spiritual content effectively across all devices with a serene, devotional aesthetic and bilingual support.
- **Target Audience**: Devotees of Baba Jai Gurudev, spiritual seekers, and the vegetarian community worldwide.

---

## 2. TECH STACK
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+). No external frameworks (React/Vue) to ensure maximum performance and longevity.
- **Styling**: Custom CSS using CSS Variables, Flexbox, Grid, and Glassmorphism effects.
- **Backend**: None (Static website). It uses a "Vanilla" philosophy for static hosting.
- **Database**: None. Content is managed via Markdown files and compiled into static HTML.
- **Authentication**: None.
- **State Management**: `localStorage` is used to persist user preferences (e.g., Text-to-Speech settings).
- **Build Tools**: Python 3 script (`tools/generate_issue.py`) for static content generation from Markdown.
- **Package Manager**: None (Purely static, no `npm`/`yarn` dependencies).
- **Deployment**: GitHub Pages (Custom Domain: [satsangvachansatsangseva.online](http://satsangvachansatsangseva.online)).

---

## 3. FILE STRUCTURE

```text
satsang_vachan_satsang_seva/
├── about/                  # About Us section
│   └── index.html          # Dedicated About page
├── assets/                 # Core application assets
│   ├── config.js           # Configuration (e.g., API base URL)
│   ├── script.js           # Core logic: UI, TTS, Search, Navigation
│   ├── script.ts           # TypeScript dev version of client logic
│   └── styles.css          # Global styles, theme variables, and layouts
├── bhajan/                 # Bhajan section
│   └── index.html          # Dedicated Bhajan page
├── book/                   # Book/Literature section
│   └── index.html          # Dedicated Book page
├── contact/                # Contact section
│   └── index.html          # Dedicated Contact page
├── content/                # Raw content source
│   ├── input.md            # Active Markdown source for issues
│   ├── input.example.md    # Template for generating new issues
│   └── video_script.md     # Video production scripts
├── dotmdfile/              # Documentation and logs
│   ├── project_structure.md # Guide to file relationships
│   ├── QnA.md               # Log of changes and decisions
│   └── my.md               # Developer scratchpad (User Only)
├── images/                 # Project images and media
├── music/                  # Music section
│   └── index.html          # Dedicated Music page
├── patrika/                # Patrika (Magazine) archive
│   └── index.html          # Dedicated Patrika archive page
├── podcast/                # Podcast section
│   └── index.html          # Dedicated Podcast page
├── satsang/                # Satsang videos section
│   └── index.html          # Dedicated Satsang playlist page
├── tools/                  # Automation and build scripts
│   └── generate_issue.py   # Python script to compile MD -> HTML
├── .gitignore              # Git ignore rules
├── CNAME                   # GitHub Pages custom domain config
├── index.html              # Homepage (Main landing page)
└── readme.md               # General project overview
```

---

## 4. KEY COMPONENTS (Logical)
Since this is a vanilla JS project, "components" are identified by their semantic HTML structure and CSS classes/IDs handled by `assets/script.js`.

### **Site Header**
- **File Path**: `index.html` (and other pages)
- **Purpose**: Brand identity and main navigation.
- **Logic**: Handled by `initNavigation()` and `initActiveNav()` in `script.js`.
- **Dependencies**: `assets/styles.css`, `assets/script.js`.

### **Contact Bar**
- **File Path**: `index.html` (and other pages)
- **Purpose**: Quick links to social media and official contact channels.
- **Logic**: WhatsApp contact menu handled by `initContact()` in `script.js`.

### **Controls Section**
- **File Path**: `index.html`
- **Purpose**: Search input, language toggle, and settings toggle.
- **Logic**:
  - Search: `initSearch()` (Client-side real-time filtering).
  - Language: `initLangToggle()` (Bilingual visibility control).
  - Settings: `initSettings()` (Voice settings panel toggle).

### **Settings Panel**
- **File Path**: `index.html`
- **Purpose**: Customizable Text-to-Speech (TTS) settings (Rate, Pitch, Voice).
- **Logic**: Handled by `initSettings()` and `setPrefs()`/`getPrefs()`.
- **State**: Persisted in `localStorage`.

### **Video Grid / Card**
- **File Path**: `index.html` (and `satsang/index.html`)
- **Purpose**: Displaying YouTube videos with a devotional aesthetic.
- **Logic**: `initMedia()` in `script.js`.
- **Features**: Lazy loading, custom "Play" button, and JSON-LD VideoObject Schema injection.

---

## 5. ROUTING STRUCTURE
The project uses **Directory-Based Routing** for clean URLs.
- `/` -> `index.html` (Home)
- `/about/` -> `about/index.html`
- `/satsang/` -> `satsang/index.html`
- `/podcast/` -> `podcast/index.html`
- `/music/` -> `music/index.html`
- `/bhajan/` -> `bhajan/index.html`
- `/patrika/` -> `patrika/index.html`
- `/book/` -> `book/index.html`
- `/contact/` -> `contact/index.html`

---

## 6. API ENDPOINTS
- **TTS Proxy (Optional)**:
  - **Endpoint**: `/api/tts`
  - **Method**: `POST`
  - **Payload**: `{ text: string, lang: string }`
  - **Response**: Audio blob.
  - **Note**: Currently, `window.__API_BASE` in `assets/config.js` is empty, so the system defaults to the **Web Speech API** (`webSpeechSpeak`) if the remote call fails.

---

## 7. STYLING SYSTEM
- **Methodology**: Custom CSS with CSS Variables for theme management.
- **Theme**: "Dark Purple & Glassmorphism" for a devotional, serene experience.
- **Key Variables** (Defined in `assets/styles.css`):
  - `--bg-gradient`: Primary background.
  - `--glass-bg`: Semi-transparent background for cards/panels.
  - `--accent-gold`: Primary accent color for highlights.
- **Responsive Breakpoints**:
  - Desktop: Grid-based layouts.
  - Mobile: Flexbox-based single column layouts with "Mobile-First" design.

---

## 8. ENVIRONMENT VARIABLES
Configuration is handled in `assets/config.js` via the global `window` object:
- `window.__API_BASE`: Base URL for the optional backend TTS proxy.

---

## 9. SCRIPTS & COMMANDS
### **Local Development**
- **Serve Files**: Use VS Code "Live Server" or `python3 -m http.server 8000`.
- **Watch Assets**: No watcher (Vanilla JS).

### **Content Generation**
```bash
# Generate new Patrika issue from content/input.md
# Note: Currently generates to issues/ folder (needs update to patrika/)
python3 tools/generate_issue.py
```

---

## 10. CONTENT GENERATION WORKFLOW
The project uses a custom Python script to automate the creation of weekly "Patrika" (magazine) issues.

1.  **Prepare Content**: Edit `content/input.md` following the structure in `content/input.example.md`. This includes:
    - `[title_hi]` / `[title_en]`
    - `[body_hi]` / `[body_en]`
    - `[youtube_id]` or `[image_url]`
2.  **Run Generator**: Execute `python3 tools/generate_issue.py`.
3.  **Output**: The script currently generates a new HTML page in the `issues/` directory and updates the listing. 
    - **[TODO]**: Update `tools/generate_issue.py` to use the `patrika/` directory instead of `issues/` to match the new architecture.
4.  **Verification**: Use `diagnostics.html` (if available) or manual review to check for broken links or missing assets.

---

## 11. DEPENDENCIES
### **Core Dependencies**
- **None**: Zero external JS dependencies for maximum performance.
- **Fonts**: Google Fonts (Noto Sans Devanagari, Noto Serif).

### **Dev Dependencies**
- **Python 3**: Used for the static content generator script.

---

## 11. DEPLOYMENT NOTES
- **Platform**: GitHub Pages.
- **Branch**: `main`.
- **Custom Domain**: `satsangvachansatsangseva.online`.
- **Process**: Pushing changes to the `main` branch automatically triggers deployment via GitHub Actions or the default GitHub Pages integration.

---

## 12. FUTURE SECTIONS (Placeholder)
- **[TODO] PWA Support**: Implementation of Service Workers for offline reading.
- **[TODO] CMS Integration**: Potential migration to a headless CMS for easier content management.
- **[TODO] Newsletter**: Integration with an email subscription service.

---

**Last Updated By Developer Assistant**  
**Timestamp:** 2026-04-11T12:00:00Z
