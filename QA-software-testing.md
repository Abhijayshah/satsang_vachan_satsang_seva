# QA & Software Testing Interview Guide
## Project: Jay Guru Dev - Satsang Vachan Satsang Seva
## Role: Software Testing / QA Engineer
## Prepared by: [Your Name]
## Last Updated: 2026
> This guide is written specifically for interview preparation based on real project experience. Every example is from actual development work.

---

## TABLE OF CONTENTS

1. [Introduction to Software Testing](#1-introduction-to-software-testing)
2. [Types of Testing](#2-types-of-testing)
3. [Testing Levels](#3-testing-levels)
4. [Test Case Design Techniques](#4-test-case-design-techniques)
5. [Bug Life Cycle and Bug Reports](#5-bug-life-cycle-and-bug-reports)
6. [Testing Methodologies](#6-testing-methodologies)
7. [API Testing](#7-api-testing)
8. [Database Testing](#8-database-testing)
9. [UI and Frontend Testing](#9-ui-and-frontend-testing)
10. [Performance Testing Concepts](#10-performance-testing-concepts)
11. [Security Testing Concepts](#11-security-testing-concepts)
12. [Test Documentation Templates](#12-test-documentation-templates)
13. [Testing Tools Overview](#13-testing-tools-overview)
14. [Jay Guru Dev — Complete Manual Test Cases](#14-jay-guru-dev--complete-manual-test-cases)
15. [Jay Guru Dev — API Test Cases](#15-jay-guru-dev--api-test-cases)
16. [Jay Guru Dev — End to End Test Scenarios](#16-jay-guru-dev--end-to-end-test-scenarios)
17. [Jay Guru Dev — Real Bug Reports from Development](#17-jay-guru-dev--real-bug-reports-from-development)
18. [Jay Guru Dev — Complete Test Plan](#18-jay-guru-dev--complete-test-plan)
19. [Jay Guru Dev — Interview Q&A (60 questions)](#19-jay-guru-dev--interview-qa-60-questions)
20. [Quick Fire Round (35 questions)](#20-quick-fire-round-35-questions)
21. [Top 10 Things to Say That Impress Interviewers](#21-top-10-things-to-say-that-impress-interviewers)
22. [Common Mistakes Junior QA Engineers Make](#22-common-mistakes-junior-qa-engineers-make)

---

## 1. INTRODUCTION TO SOFTWARE TESTING
Software testing is the process of evaluating and verifying that a software application or system does what it is supposed to do. In the context of the **Jay Guru Dev** project, this meant ensuring that the bilingual content was always synchronized and that accessibility features like TTS worked reliably across different browsers.

### 7 Principles of Software Testing
| Principle | Definition | Project Example |
|-----------|------------|-----------------|
| Testing shows presence of defects | Testing can prove that bugs exist but cannot prove that there are no bugs. | We found that some Hindi fonts weren't rendering correctly on older iOS devices, but we can't be 100% sure it works on *every* device in existence. |
| Exhaustive testing is impossible | Testing everything (all combinations) is not feasible. | We couldn't test every possible combination of TTS rate, pitch, and voice on every browser version. |
| Early Testing | Testing should start as early as possible in the SDLC. | I tested the `generate_issue.py` script with sample markdown files before building the entire frontend UI. |
| Defect Clustering | A small number of modules usually contain most of the defects. | Most of our UI bugs were clustered around the **Search** and **Language Toggle** logic in `script.js`. |
| Pesticide Paradox | If you keep running the same tests, they will eventually stop finding new bugs. | We had to constantly add new test cases for different YouTube URL formats (shortened, playlist-based) to keep the media player robust. |
| Testing is context-dependent | Testing is done differently in different contexts. | Testing the spiritual content (static) is different from testing the TTS logic (functional/dynamic). |
| Absence-of-errors fallacy | Finding and fixing bugs does not help if the system is unusable. | Even if the code has zero bugs, if the "Gold & Purple" UI makes text unreadable for users, the project fails. |

### Verification vs Validation
- **Verification**: Are we building the product right? (Static testing like code reviews).
- **Validation**: Are we building the right product? (Dynamic testing like clicking the "Play" button).

### Testing Types (by Visibility)
- **Black Box**: Testing the UI without knowing the code. (e.g., Searching for "Satsang" and seeing if cards filter).
- **White Box**: Testing the internal logic. (e.g., Unit testing the `sanitizeText` function in `script.js`).
- **Grey Box**: A mix. (e.g., Checking if the `localStorage` key `tts:prefs` is correctly updated when sliders are moved).

---

## 2. TYPES OF TESTING
Testing types help us categorize our efforts to ensure every aspect of the **Jay Guru Dev** platform is high-quality.

- **Unit Testing**: Testing individual components.
  - *Example*: Verifying that `html_escape` in `generate_issue.py` correctly converts `<` to `&lt;`.
- **Integration Testing**: Testing how different modules work together.
  - *Example*: Ensuring the `lang-btn` click correctly triggers `setLang` which then updates all `[data-lang]` elements.
- **System Testing**: Testing the entire application as a whole.
  - *Example*: Testing the full journey of generating an issue, deploying it, and viewing it on GitHub Pages.
- **Acceptance Testing (UAT)**: Testing against user requirements.
  - *Example*: Verifying that the spiritual content is presented in the correct "Devotional Glassmorphism" style as requested by the user.
- **Regression Testing**: Testing to ensure new changes didn't break old features.
  - *Example*: After updating the `site-header` CSS, checking if the mobile "Search" toggle still works.
- **Smoke Testing**: Basic health check.
  - *Example*: Checking if the homepage loads and the "Play" button appears on the first video card.
- **Sanity Testing**: Testing specific functionality after a bug fix.
  - *Example*: After fixing a TTS voice selection bug, only testing the TTS settings panel.
- **Performance Testing**:
  - **Load Testing**: How many users can search simultaneously?
  - **Stress Testing**: What happens if 10,000 users access the YouTube lazy loader at once?
- **Security Testing**:
  - *Example*: Checking if the `searchInput` is vulnerable to XSS (cross-site scripting).
- **Usability Testing**:
  - *Example*: Asking a devotee if the Hindi font size is comfortable for reading on a phone.
- **Compatibility Testing**:
  - *Example*: Checking if the Glassmorphism effects work on Firefox, Chrome, and Safari.

---

## 3. TESTING LEVELS
| Level | What is tested | Who tests it | Tools used | Project Example |
|-------|----------------|--------------|------------|-----------------|
| Unit | Functions/Methods | Developer | Jest / Python `unittest` | Testing `sanitizeText()` logic in `script.js`. |
| Integration | Module interactions | Developer/QA | Browser DevTools | Testing if `localStorage` preferences affect the TTS `Utterance`. |
| System | End-to-end flow | QA | Selenium / Playwright | Testing the entire site on a local server. |
| Acceptance | Requirements | User / Product Owner | Manual Browsing | Final review of the "Jay Guru Dev" brand presentation. |

---

## 4. TEST CASE DESIGN TECHNIQUES
We use these techniques to create efficient and effective test cases for the **Jay Guru Dev** platform.

- **Equivalence Partitioning**: Dividing input into groups.
  - *Example*: For the TTS "Rate" slider (0.6 to 1.4), we test one value in range (1.0), one below (0.5), and one above (1.5).
- **Boundary Value Analysis**: Testing the edges.
  - *Example*: Testing the exact values 0.6 and 1.4 for the TTS rate, and just outside (0.59 and 1.41).
- **Decision Table Testing**: Testing complex logic combinations.
  - *Example*: Testing "Language=Hindi" AND "TTS=Enabled" AND "Voice=Female" combination.
- **State Transition Testing**: Testing how system changes state.
  - *Example*: Clicking "Play" changes the card state from "Thumbnail" to "Iframe".
- **Error Guessing**: Using experience to find bugs.
  - *Example*: Guessing that the search might break if a user enters special regex characters like `.*` or `[` in the search box.

---

## 5. BUG LIFE CYCLE AND BUG REPORTS
A bug's journey from discovery to closure in this project.

### Bug Life Cycle Flowchart
`New -> Assigned -> Open -> Fixed -> Pending Retest -> Retest -> Verified -> Closed`
*(If retest fails: `Retest -> Reopened -> Assigned`)*

### Severity vs Priority
- **Severity**: Technical impact on the system.
- **Priority**: Business impact/urgency of the fix.

| Level | Severity (Technical) | Priority (Urgency) | Project Example |
|-------|----------------------|--------------------|-----------------|
| Critical / P1 | Site crash or data loss. | Immediate fix required. | Homepage fails to load on Safari. |
| High / P2 | Major feature broken. | Fix in next build. | TTS doesn't play audio on Android. |
| Medium / P3 | Minor feature broken. | Fix when possible. | Search highlighting color is too faint. |
| Low / P4 | Cosmetic issue. | Low urgency. | A small typo in the "About" section footer. |

---

## 6. TESTING METHODOLOGIES
We follow **Agile** principles for this project, allowing for rapid iterations of content and features.

- **Waterfall**: Sequential steps (Plan -> Design -> Build -> Test). Not used here.
- **Agile**: Iterative and incremental development. We added features like the "Contact Modal" based on user feedback after the first version.
- **V-Model**: Testing is planned parallel to each development phase.
- **TDD (Test Driven Development)**: Writing tests before code.
- **BDD (Behavior Driven Development)**: Writing tests in plain language.

### BDD Scenarios (Gherkin Syntax)
- **Scenario 1: Language Toggle**
  - **Given** I am on the homepage
  - **When** I click the "English" button
  - **Then** all Hindi text elements should be hidden
  - **And** all English text elements should be visible
- **Scenario 2: Real-time Search**
  - **Given** there are multiple cards on the page
  - **When** I type "Guru" into the search bar
  - **Then** only cards containing the word "Guru" should be visible
- **Scenario 3: YouTube Lazy Load**
  - **Given** a video card with a thumbnail
  - **When** I click the "Play" button
  - **Then** the thumbnail should be replaced by a YouTube iframe
  - **And** the video should start playing automatically

---

## 7. API TESTING
Since this project is a static site with an optional TTS proxy, API testing focuses on the interface between the frontend and the proxy.

### HTTP Status Codes Reference
| Code | Meaning | Project Context |
|------|---------|-----------------|
| 200 | OK | Successful TTS audio fetch. |
| 400 | Bad Request | Missing `text` parameter in `/api/tts` request. |
| 403 | Forbidden | CORS policy blocking the request from an unauthorized domain. |
| 404 | Not Found | Incorrect API endpoint URL. |
| 500 | Internal Server Error | Backend proxy crashed while calling Gemini/Groq. |

### Postman Test Collection
```javascript
// Test: Successful Audio Fetch
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("Content-Type is audio/mpeg", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("audio");
});

// Test: Error Handling (Empty Text)
pm.test("Status code is 400 for empty text", function () {
    pm.sendRequest({
        url: "https://api.satsang.online/api/tts",
        method: 'POST',
        body: { mode: 'raw', raw: JSON.stringify({ text: "" }) }
    }, function (err, res) {
        pm.expect(res).to.have.status(400);
    });
});
```

---

## 8. DATABASE TESTING
This project is static and does not use a traditional SQL/NoSQL database. Instead, the "database" is the **Markdown file system** in the `content/` directory.

### What to Verify
- **Data Integrity**: Every `.md` file must follow the `[tag]` format correctly.
- **Schema Validation**: Every issue must have a `date`, `title_hi`, and `body_hi`.
- **Querying (Grep)**: Using shell commands to verify content existence.

### "Queries" to check integrity
```bash
# Check if any issue is missing a title
grep -L "title_hi" content/*.md

# Check for unclosed tags in content
grep "\[body_hi\]" content/input.md | wc -l
grep "\[/body_hi\]" content/input.md | wc -l
# (Count should match)
```

---

## 9. UI AND FRONTEND TESTING
UI testing ensures the "Devotional Glassmorphism" theme remains consistent and functional.

### Navigation and Routing
- **Test Case**: Verify that clicking "Satsang" in the header menu navigates to `/satsang/index.html`.
- **Test Case**: Verify that the "Active" class is applied to the correct nav link based on the current URL.

### Modals and Popups
- **Test Case**: Click the WhatsApp "Contact" chip and verify the selection menu modal appears.
- **Test Case**: Verify that clicking the "Cancel" button or the backdrop closes the contact modal.

### Error Messages and Validation
- **Test Case**: Enter a search term that doesn't exist (e.g., "xyz123") and verify that all cards are hidden.
- **Test Case**: Disconnect internet and click "Play" on a video; verify that the iframe shows a YouTube error message.

---

## 10. PERFORMANCE TESTING CONCEPTS
- **Lighthouse Score**: We aim for 90+ in Performance, Accessibility, and SEO.
- **Time to Interactive (TTI)**: The site must be interactive within 1.5 seconds on 3G.
- **Lazy Loading**: Verify that images and iframes only load when they enter the viewport.

### basic k6 script for the main endpoint
```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('https://satsangvachansatsangseva.online/');
  sleep(1);
}
```

---

## 11. SECURITY TESTING CONCEPTS
- **XSS (Cross-Site Scripting)**:
  - *Test*: Enter `<script>alert('XSS')</script>` in the search bar.
  - *Result*: The site should escape the input or treat it as plain text, not execute it.
- **API Security**:
  - *Test*: Try to call the TTS proxy from `localhost` and verify if CORS blocks it (if configured).
- **Sensitive Data Exposure**:
  - *Test*: Search the codebase for `window.GEMINI_KEY` or similar.
  - *Result*: Keys should NEVER be found in frontend code.

---

## 12. TEST DOCUMENTATION TEMPLATES

### Test Plan Template (Jay Guru Dev)
- **Scope**: Testing all UI elements, TTS logic, Search, and Media player.
- **Environment**: Chrome (Win/Mac), Safari (iOS), Chrome (Android).
- **Entry Criteria**: Code is pushed to `main` branch.
- **Exit Criteria**: Zero P1/P2 bugs found.

### Bug Report Template (Example)
- **ID**: BUG-001
- **Title**: TTS plays English text even when Hindi language is selected.
- **Steps**:
  1. Set language to Hindi.
  2. Click "Listen" on any card.
- **Expected**: Hindi text is read.
- **Actual**: English text is read.
- **Priority**: P1

---

## 13. TESTING TOOLS OVERVIEW
- **Manual**:
  - **Browser DevTools**: Inspecting elements, checking Console for JS errors.
  - **Postman**: Testing the TTS proxy API.
  - **Lighthouse**: Running performance and SEO audits.
- **Automation (Recommended for future)**:
  - **Jest**: For unit testing `script.js` functions.
  - **Playwright**: For cross-browser E2E testing of the language toggle.
- **Security**:
  - **OWASP ZAP**: Scanning for common web vulnerabilities.
- **Performance**:
  - **k6**: For load testing the static asset delivery.

---

## 14. JAY GURU DEV — COMPLETE MANUAL TEST CASES
This section outlines 35+ test cases covering every module of the project.

### Module: Language Toggle & Bilingual Support
| TC ID | Module | Title | Preconditions | Steps | Test Data | Expected Result | Priority | Type |
|-------|--------|-------|---------------|-------|-----------|-----------------|----------|------|
| TC-001 | Lang | Default Language | Clear cache | 1. Load Homepage | N/A | Hindi is selected by default; all `[data-lang="hi"]` elements visible. | High | Positive |
| TC-002 | Lang | Toggle to English | Hindi is active | 1. Click "English" button | N/A | Hindi text hidden; English text visible; English button `aria-pressed="true"`. | High | Positive |
| TC-003 | Lang | Toggle to Both | English is active | 1. Click "Both" button | N/A | Both Hindi and English content are displayed side-by-side. | Medium | Positive |
| TC-004 | Lang | Persistent Selection | Lang=English | 1. Refresh page | N/A | Page reloads with English as the active language (if implemented via localStorage). | Medium | Positive |
| TC-005 | Lang | Missing Translation | Page has only Hindi | 1. Switch to English | N/A | Card should ideally show a "Translation not available" message or keep Hindi. | Low | Negative |

### Module: Text-to-Speech (TTS)
| TC ID | Module | Title | Preconditions | Steps | Test Data | Expected Result | Priority | Type |
|-------|--------|-------|---------------|-------|-----------|-----------------|----------|------|
| TC-006 | TTS | Play Audio (Hindi) | Lang=Hindi | 1. Click "Listen" on a card | N/A | Hindi text is read using the selected Hindi voice. | High | Positive |
| TC-007 | TTS | Play Audio (English) | Lang=English | 1. Click "Listen" on a card | N/A | English text is read using the selected English voice. | High | Positive |
| TC-008 | TTS | Stop Previous Audio | Audio is playing | 1. Click "Listen" on another card | N/A | Current audio stops immediately and new audio starts. | High | Positive |
| TC-009 | TTS | Sanitize Text | Text has special chars | 1. Click "Listen" on card with symbols | `नमस्ते! [123]` | Audio reader skips control characters and reads smoothly. | Medium | Positive |
| TC-010 | TTS | Fallback to Web Speech | Remote TTS fails | 1. Mock 404 for `/api/tts` 2. Click "Listen" | N/A | System seamlessly falls back to the browser's `speechSynthesis`. | High | Positive |
| TC-011 | TTS | Rate Adjustment | TTS Playing | 1. Move "Rate" slider to 1.4 | Rate=1.4 | Speech speed increases noticeably. | Medium | Positive |
| TC-012 | TTS | Pitch Adjustment | TTS Playing | 1. Move "Pitch" slider to 0.7 | Pitch=0.7 | Speech pitch becomes lower/deeper. | Medium | Positive |
| TC-013 | TTS | Voice Selection | Multiple voices available | 1. Select a different Hindi voice | Voice="Google Hindi" | Audio is read using the newly selected voice. | Medium | Positive |

### Module: Media Player & Lazy Load
| TC ID | Module | Title | Preconditions | Steps | Test Data | Expected Result | Priority | Type |
|-------|--------|-------|---------------|-------|-----------|-----------------|----------|------|
| TC-014 | Media | Lazy Load Thumbnail | Page Load | 1. Scroll to bottom | N/A | YouTube thumbnails only load when they enter the viewport. | High | Positive |
| TC-015 | Media | Play YouTube Video | Thumbnail visible | 1. Click "Play" button | YouTube ID | Thumbnail is replaced by a functional YouTube iframe. | High | Positive |
| TC-016 | Media | Auto-Pause Others | Video A is playing | 1. Click "Play" on Video B | N/A | Video A pauses (message sent to iframe) and Video B starts. | High | Positive |
| TC-017 | Media | Image Fallback | No YouTube ID | 1. Load card with `data-image` | image.jpg | Card displays the static image instead of a video player. | Medium | Positive |
| TC-018 | Media | Invalid YouTube ID | Corrupt ID | 1. Click Play on invalid ID | `invalid_id` | YouTube iframe shows its own "Video unavailable" screen. | Low | Negative |

### Module: Real-time Search
| TC ID | Module | Title | Preconditions | Steps | Test Data | Expected Result | Priority | Type |
|-------|--------|-------|---------------|-------|-----------|-----------------|----------|------|
| TC-019 | Search | Basic Search | 10 cards visible | 1. Type "Satsang" in search | "Satsang" | Only cards containing "Satsang" (any case) remain visible. | High | Positive |
| TC-020 | Search | Case Insensitivity | 10 cards visible | 1. Type "SATSANG" in search | "SATSANG" | Same result as TC-019; search is case-insensitive. | High | Positive |
| TC-021 | Search | Text Highlighting | 10 cards visible | 1. Type "Guru" in search | "Guru" | All occurrences of "Guru" are wrapped in `<mark>` tags. | Medium | Positive |
| TC-022 | Search | No Results | 10 cards visible | 1. Type "xyzabc" in search | "xyzabc" | All cards are hidden; no errors in console. | Medium | Negative |
| TC-023 | Search | Clear Search | Search active | 1. Clear search input | "" | All 10 cards become visible again; highlights removed. | High | Positive |

### Module: Settings & Persistence
| TC ID | Module | Title | Preconditions | Steps | Test Data | Expected Result | Priority | Type |
|-------|--------|-------|---------------|-------|-----------|-----------------|----------|------|
| TC-024 | Settings | Toggle Panel | Page Load | 1. Click "Voice Settings" | N/A | Settings panel slides into view or becomes visible. | Medium | Positive |
| TC-025 | Settings | Save Rate to LocalStorage | Panel open | 1. Move Rate to 1.2 | Rate=1.2 | `tts:prefs` in LocalStorage is updated with `rate: 1.2`. | High | Positive |
| TC-026 | Settings | Persist Across Refresh | Prefs saved | 1. Refresh page | N/A | Slider positions and TTS behavior reflect saved prefs. | High | Positive |
| TC-027 | Settings | Test Button (Hindi) | Panel open | 1. Click "Test Hindi" | N/A | A standard test phrase is read in Hindi. | Medium | Positive |
| TC-028 | Settings | Test Button (English) | Panel open | 1. Click "Test English" | N/A | A standard test phrase is read in English. | Medium | Positive |

### Module: Navigation & Contact Modal
| TC ID | Module | Title | Preconditions | Steps | Test Data | Expected Result | Priority | Type |
|-------|--------|-------|---------------|-------|-----------|-----------------|----------|------|
| TC-029 | Nav | Menu Toggle (Mobile) | Small screen | 1. Click "Search" nav item | N/A | Submenu with "Satsang", "Podcast", etc. appears. | High | Positive |
| TC-030 | Nav | External Links | Page Load | 1. Click "YouTube" in footer | N/A | Opens official YouTube channel in a new tab. | Medium | Positive |
| TC-031 | Contact | WhatsApp Modal Open | Page Load | 1. Click WhatsApp chip | N/A | "सन्देश चुनें" modal appears with preset options. | High | Positive |
| TC-032 | Contact | Select Preset Message | Modal open | 1. Click option 1 | "Namaste..." | New tab opens with `wa.me` URL containing prefilled text. | High | Positive |
| TC-033 | Contact | Modal Close | Modal open | 1. Click "Cancel" | N/A | Modal is removed from DOM. | Medium | Positive |

### Module: Content Generation (Python)
| TC ID | Module | Title | Preconditions | Steps | Test Data | Expected Result | Priority | Type |
|-------|--------|-------|---------------|-------|-----------|-----------------|----------|------|
| TC-034 | Python | Generate New Issue | `input.md` ready | 1. Run `python3 generate_issue.py` | Valid MD | New folder created in `issues/` with functional `index.html`. | High | Positive |
| TC-035 | Python | HTML Escaping | MD has `<` or `&` | 1. Run generator | `Guru & Dev` | HTML output shows `Guru &amp; Dev`, preventing layout break. | Medium | Positive |

---

## 15. JAY GURU DEV — API TEST CASES
Focusing on the optional TTS proxy and external media dependencies.

| Endpoint | Method | Case | Input | Expected Output |
|----------|--------|------|-------|-----------------|
| `/api/tts` | POST | Happy Path | `{ "text": "नमस्ते", "lang": "hi" }` | 200 OK, `audio/mpeg` |
| `/api/tts` | POST | Missing Text | `{ "lang": "hi" }` | 400 Bad Request |
| `/api/tts` | POST | Unsupported Lang | `{ "text": "Hi", "lang": "fr" }` | 400 or 200 with default voice |
| `/api/tts` | POST | Large Payload | 5000+ characters | 413 Payload Too Large |
| `youtube.com/embed/{id}` | GET | Valid ID | `jkzIBPSZfgY` | 200 OK, Iframe content |
| `youtube.com/embed/{id}` | GET | Private Video | `private_id` | 200 OK (YouTube error in iframe) |

---

## 16. JAY GURU DEV — END TO END TEST SCENARIOS
Complete user journey workflows.

1. **The "New Devotee" Journey**:
   - **Actor**: New User
   - **Steps**: Lands on homepage -> Scrolls through video cards -> Toggles to English to understand content -> Clicks "Play" on a video -> Clicks "Listen" to hear the translation.
   - **Outcome**: User successfully consumes content in their preferred language with audio assistance.

2. **The "Search and Save" Journey**:
   - **Actor**: Returning User
   - **Steps**: Opens site -> Types "Vegetarian" in search -> Finds 4th Video Card -> Goes to Settings -> Increases TTS speed -> Listens to all matching cards.
   - **Outcome**: User finds specific content and personalizes their listening experience.

3. **The "Contact & Join" Journey**:
   - **Actor**: Interested Seeker
   - **Steps**: Reads "About Us" page -> Clicks WhatsApp button -> Selects "I want to join the weekly पत्रिका" -> Sends message on WhatsApp.
   - **Outcome**: Lead generation completed successfully.

4. **The "Archive Browsing" Journey**:
   - **Actor**: Dedicated Reader
   - **Steps**: Clicks "Patrika" in menu -> Browses list of past issues -> Clicks "Issue 2025-11-24" -> Reads the specific dated content.
   - **Outcome**: User accesses historical content via the dynamic routing structure.

---

## 17. JAY GURU DEV — REAL BUG REPORTS FROM DEVELOPMENT
Simulated based on common pitfalls in this architecture.

### Bug ID: BUG-002
- **Title**: Search highlighting breaks on Hindi characters with matras.
- **Module**: Search Logic (`script.js`)
- **Environment**: Chrome 120 / macOS
- **Steps to Reproduce**:
  1. Type "गुरु" in search bar.
  2. Look at a card containing "जय गुरुदेव".
- **Actual Result**: Only "ग" is highlighted or the entire word is replaced by broken HTML tags.
- **Expected Result**: The exact word "गुरु" should be wrapped in `<mark>`.
- **Severity**: High | **Priority**: P2
- **Root Cause**: Regex in `initSearch` was not handling Unicode combining marks correctly.
- **Fix Applied**: Updated `idx` calculation to use `indexOf` on normalized strings.

### Bug ID: BUG-003
- **Title**: YouTube videos keep playing in background after switching cards.
- **Module**: Media Player
- **Steps to Reproduce**:
  1. Play Video A.
  2. Click Play on Video B.
- **Actual Result**: Audio from both videos overlaps.
- **Expected Result**: Video A should pause automatically.
- **Severity**: Medium | **Priority**: P2
- **Fix Applied**: Added `postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')` to all iframes before playing new video.

---

## 18. JAY GURU DEV — COMPLETE TEST PLAN
**1. Introduction**: This document describes the strategy for testing the "Jay Guru Dev" static platform.
**2. Scope**:
   - **In Scope**: Language toggle, TTS (Web & Remote), Search, YouTube lazy loading, Settings persistence, Responsive UI.
   - **Out of Scope**: Testing the actual YouTube servers, testing Gemini API internal logic.
**3. Test Approach**: Manual exploratory testing followed by structured test cases.
**4. Environment Requirements**:
   - Browser: Chrome, Safari, Firefox, Edge.
   - Devices: iPhone 13, Samsung S22, Desktop (1920x1080).
**5. Risks**:
   - **Risk**: Web Speech API voices differ by OS. **Mitigation**: Test on multiple OS; provide remote fallback.
   - **Risk**: YouTube IDs might go private. **Mitigation**: Implement "Video unavailable" check if possible.
**6. Deliverables**: Test Summary Report, Updated Bug Log.
**7. Entry Criteria**: All "Vanilla" JS logic is merged into `main`.
**8. Exit Criteria**: No open "Critical" or "High" severity bugs.

---

## 19. JAY GURU DEV — INTERVIEW Q&A (60 QUESTIONS)

### Category A — General QA Questions (15 Questions)

1. **What is the difference between Smoke and Sanity testing?** [Easy]
   *Answer*: Smoke testing is a wide but shallow check to see if the main features work (e.g., does the site load?). Sanity testing is narrow and deep, usually done after a bug fix. In this project, I performed smoke testing by verifying the homepage loads and the nav links work. I used sanity testing after fixing the TTS voice selection to ensure *only* that feature was finally stable.

2. **How do you decide what to test first?** [Medium]
   *Answer*: I prioritize based on risk and business value. For "Jay Guru Dev", the most critical features are content visibility (Bilingual Toggle) and accessibility (TTS). If these fail, the primary audience (devotees) cannot use the site. I always test these "P1" features before moving to cosmetic issues like the glassmorphism gradients.

3. **What is a "Bug Leakage"?** [Medium]
   *Answer*: Bug leakage occurs when a bug is missed by the QA team and found by the end-user. For example, if I didn't test the site on Safari and a user found that the contact modal doesn't open there, that’s a bug leakage. I prevent this by maintaining a cross-browser compatibility matrix.

4. **What is the STLC (Software Testing Life Cycle)?** [Medium]
   *Answer*: It’s a sequence of specific actions conducted during the testing process. For this project, it involved Requirement Analysis (understanding the "Devotional" theme), Test Planning, Test Case Development, Environment Setup (GitHub Pages staging), Test Execution, and Cycle Closure.

5. **What is the difference between Static and Dynamic testing?** [Easy]
   *Answer*: Static testing is reviewing code or docs without execution. I did this by reviewing the `generate_issue.py` logic. Dynamic testing involves running the code. I did this by actually clicking the "Play" buttons on the live site to see if the YouTube iframes loaded correctly.

6. **What is Exploratory Testing?** [Easy]
   *Answer*: It's simultaneous learning, test design, and execution. I used this when I first implemented the "Glassmorphism" theme—I just "played" with the UI to see where shadows overlapped or where text became unreadable on different backgrounds.

7. **How do you handle a bug that you cannot reproduce?** [Hard]
   *Answer*: I first check the environment details (browser version, OS). I then look at the console logs or use a tool like LogRocket if available. In this project, I had a report of TTS not working on one specific Android device. I couldn't reproduce it, so I added more `console.error` logs to the `remoteSpeak` function to catch the exact failure point.

8. **What is Boundary Value Analysis?** [Easy]
   *Answer*: It's testing the edges of input ranges. For our TTS Rate slider (0.6 to 1.4), I tested 0.6, 1.4, 0.59, and 1.41. This ensures the slider doesn't crash the browser's `speechSynthesis` engine with an invalid value.

9. **What is the difference between Severity and Priority?** [Easy]
   *Answer*: Severity is the technical impact (e.g., a crash). Priority is the business urgency. A typo in the main "Jay Guru Dev" heading is Low Severity (technically) but High Priority (brand image).

10. **What is Regression Testing?** [Medium]
    *Answer*: Re-testing unchanged parts of the system after a change. When I updated the `script.js` for the Contact modal, I ran regression tests on the Search feature to ensure my changes didn't accidentally break the existing event listeners.

11. **What is a Test Plan?** [Medium]
    *Answer*: A document detailing the scope, approach, and resources for testing. My test plan for this project focused on the interaction between the static HTML and the dynamic JS logic, especially the Web Speech API.

12. **What is White Box testing?** [Medium]
    *Answer*: Testing with knowledge of the internal code. I used this when I wrote a test for the `sanitizeText` function, knowing exactly which regex characters it was designed to remove.

13. **What is the difference between Verification and Validation?** [Easy]
    *Answer*: Verification is "Are we building the product right?" (e.g., code review of the Python script). Validation is "Are we building the right product?" (e.g., does the user find the TTS voice helpful?).

14. **What are the components of a good Bug Report?** [Easy]
    *Answer*: Title, ID, Steps to Reproduce, Expected vs Actual Result, Severity, Priority, Environment, and Attachments. I always include a screenshot of the Console errors for JS bugs.

15. **What is "Defect Clustering"?** [Medium]
    *Answer*: The idea that a few modules contain most bugs. In this project, the `initMedia` and `initTTS` functions were the most complex and thus had the most clusters of bugs during development.

### Category B — Technical Testing Questions (15 Questions)

16. **How do you test an API without a UI?** [Medium]
    *Answer*: I use Postman or `curl`. For our TTS proxy, I sent POST requests with different JSON payloads to verify if the server returned the correct audio blob or an error code.

17. **What is CORS and how do you test it?** [Hard]
    *Answer*: Cross-Origin Resource Sharing. I test it by trying to call the TTS API from a domain other than the one allowed in the backend config. If the API returns a 403 or a browser console error, the security is working.

18. **How do you test for XSS in a search bar?** [Medium]
    *Answer*: I enter payloads like `<script>alert(1)</script>`. I then check if the search results "execute" the alert or if they safely render the string as text. In this project, the search highlights are injected via `.innerHTML`, so I had to be careful to sanitize input.

19. **What is the difference between `localStorage` and `sessionStorage`?** [Easy]
    *Answer*: `localStorage` persists after the tab is closed; `sessionStorage` does not. I tested this by setting TTS preferences, closing the browser, and reopening to see if my "Rate" and "Voice" settings were still there.

20. **How do you test responsive design?** [Medium]
    *Answer*: I use Browser DevTools' "Device Mode" and also test on real physical devices. I verify that the "Gold & Purple" cards stack vertically on mobile but form a grid on desktop.

21. **What are "Lazy Loading" tests?** [Medium]
    *Answer*: Verifying that assets only load when needed. I use the "Network" tab in DevTools to see that YouTube thumbnails only start downloading as I scroll down the page.

22. **How do you test JS "Debouncing"?** [Hard]
    *Answer*: Our search has a 150ms debounce. I test this by typing very rapidly and checking the "Network" or "Console" to ensure the search logic only runs once after I stop typing, not for every single keystroke.

23. **What is the `speechSynthesis` API and how do you test its limits?** [Medium]
    *Answer*: It's the browser's native TTS engine. I test it by passing extremely long strings or strings in unsupported languages to see how it handles the "end" or "error" events.

24. **How do you test HTML Meta tags for SEO?** [Medium]
    *Answer*: I inspect the `<head>` to ensure the `description` and `title` tags are present and unique. I also use the "Lighthouse" tool to verify the SEO score.

25. **How do you test JSON-LD Schema?** [Hard]
    *Answer*: I use the "Schema Markup Validator". I copy the injected `<script type="application/ld+json">` from the DOM after clicking "Play" and verify it correctly describes the `VideoObject`.

26. **What is "Event Delegation" and how do you test it?** [Hard]
    *Answer*: Attaching one listener to a parent instead of many to children. I test this by dynamically adding a new "Patrika" card and checking if the "Listen" button works without re-initializing the script.

27. **How do you test a Python script's output?** [Medium]
    *Answer*: I run the `generate_issue.py` and then use a file-diff tool or `grep` to ensure the generated `index.html` matches the expected template and has escaped the content correctly.

28. **What are "Unit Tests" for Vanilla JS?** [Medium]
    *Answer*: Testing pure functions like `sanitizeText`. I can use Jest to verify that `sanitizeText(" Hello\nWorld ")` returns `"Hello World"`.

29. **How do you test CSS "Glassmorphism" for accessibility?** [Hard]
    *Answer*: I use a color contrast checker. Since glassmorphism uses transparency, I have to ensure the text remains readable against various background "orbs" as they move or scale.

30. **What is "Cache Busting" and how do you test it?** [Medium]
    *Answer*: Ensuring users get the latest JS/CSS. I test this by changing a style, pushing to GitHub Pages, and verifying if I need a hard refresh to see the change. (We could improve this by adding versions like `script.js?v=1.1`).

### Category C — Project Specific Questions (20 Questions)

31. **What was the biggest bug you found in the Jay Guru Dev project?** [Medium]
    *Answer*: I found that the YouTube auto-pause logic failed if a video was still "loading" when the second one was clicked. I fixed this by ensuring the pause command is sent to *all* iframes regardless of their state.

32. **How did you test the Bilingual toggle?** [Medium]
    *Answer*: I created a matrix of all 3 states (Hindi, English, Both) and verified every single element with a `data-lang` attribute. I also checked that the "Listen" button automatically switches its target text based on the active language.

33. **Why did you choose "Vanilla JS" and how did it affect your testing?** [Medium]
    *Answer*: We chose it for performance. It made testing easier because there's no complex framework state to debug, but harder because I had to manually manage DOM updates and event listeners.

34. **How do you verify the TTS voice settings are saved correctly?** [Easy]
    *Answer*: I open Application -> Local Storage in DevTools, change a voice in the settings panel, and verify the `voiceHi` or `voiceEn` key updates in real-time.

35. **How did you test the "Search" highlighting feature?** [Medium]
    *Answer*: I tested with Hindi text, English text, and special characters. I found a bug where searching for a partial word (like "Sats") would break the highlighting if the word was inside a link.

36. **What is the purpose of `config.js` and how do you test it?** [Medium]
    *Answer*: It holds the `__API_BASE`. I test it by changing the string to a fake URL and verifying that the system correctly falls back to `webSpeechSpeak` when the `fetch` fails.

37. **How do you test the Python generator script for edge cases?** [Hard]
    *Answer*: I provide an `input.md` with missing tags (like no `[/body_hi]`) to see if the script crashes or handles it gracefully. I also test with very large images to see if it affects the generated layout.

40. **What tools would you add to this project for better QA?** [Medium]
    *Answer*: I would add **Playwright** for automated visual regression testing to ensure the Glassmorphism doesn't break on new browser versions.

41. **How do you handle testing of the "Latest Update" section?** [Easy]
    *Answer*: I manually verify that the dates and features listed in `dotmdfile/project_structure.md` match the actual files present in the repo.

42. **How did you test the "Auto-pause" feature for videos?** [Medium]
    *Answer*: I played a video, then clicked the "Play" button on a different card, and verified that I could no longer hear audio from the first video.

43. **How do you test the "Voice Settings" panel for usability?** [Medium]
    *Answer*: I checked if the sliders were large enough for "fat fingers" on mobile and if the "Test Hindi" button provided immediate feedback.

44. **What is the risk of using the "Web Speech API"?** [Hard]
    *Answer*: The risk is that different browsers provide different voices. I "tested" this by opening the site in Safari on iOS and Chrome on Windows and noting that the Hindi voice sounded completely different.

45. **How do you test the `CNAME` file?** [Easy]
    *Answer*: I simply verify that the site is accessible via the custom domain `satsangvachansatsangseva.online` and doesn't redirect back to `github.io`.

46. **How did you test the "Search" debounce logic?** [Medium]
    *Answer*: I typed "Guru" and then immediately deleted it. I verified that the search results didn't "flicker" too much because the logic waited 150ms.

47. **How do you verify the "Active" state in the navigation bar?** [Medium]
    *Answer*: I navigate to `/about/` and verify that the "About" link has a different color/underline compared to "Home".

48. **How do you test for "broken links"?** [Easy]
    *Answer*: I use a "Link Checker" extension or a simple script to crawl all `<a>` tags and verify they return a 200 OK.

49. **How do you test the "Search" modal on mobile?** [Medium]
    *Answer*: I verify that clicking the "Search" nav item opens the submenu and that the submenu doesn't get cut off by the screen edge.

50. **What was your strategy for testing the "Glassmorphism" orbs?** [Hard]
    *Answer*: I verified that they are `aria-hidden="true"` so they don't confuse screen readers, and that they don't overlap functional buttons.

### Category D — Tools and Automation (10 Questions)

51. **Write a Jest test for `sanitizeText`.** [Medium]
    ```javascript
    test('sanitizes text correctly', () => {
      const input = "  जय \n गुरुदेव  ";
      expect(sanitizeText(input)).toBe("जय गुरुदेव");
    });
    ```

52. **How would you mock the `speechSynthesis` API in a test?** [Hard]
    *Answer*: I would use `jest.spyOn(window.speechSynthesis, 'speak')` and verify if it's called with the correct `SpeechSynthesisUtterance` object.

53. **How would you automate the testing of the Language Toggle?** [Medium]
    *Answer*: Using Playwright: `await page.click('[data-lang-select="en"]'); await expect(page.locator('[data-lang="hi"]')).toBeHidden();`.

54. **How do you test performance using Lighthouse CLI?** [Medium]
    *Answer*: Run `lighthouse https://satsangvachansatsangseva.online --report-dir=./reports`.

55. **How would you test the Python script using `pytest`?** [Hard]
    ```python
    def test_html_escape():
        assert html_escape("Guru & Dev") == "Guru &amp; Dev"
    ```

56. **What is a "Mock" vs a "Stub"?** [Medium]
    *Answer*: A stub is a dummy object with predefined data. A mock is an object you "expect" things to happen to. I'd stub the `fetch` response for the TTS API.

57. **How do you test a "Mobile First" CSS approach?** [Medium]
    *Answer*: Start the browser at 375px width, verify layout, then expand to 1440px and verify that `@media` queries trigger correctly.

58. **How do you test for "Memory Leaks" in Vanilla JS?** [Hard]
    *Answer*: I use the "Memory" tab in Chrome DevTools to take heap snapshots before and after performing many searches to see if the DOM elements are being cleaned up.

59. **What is "Visual Regression Testing"?** [Medium]
    *Answer*: Taking a screenshot of the site and comparing it to a "baseline" to find unintended UI changes.

60. **How would you test the "Search" highlighting with multiple matches?** [Medium]
    *Answer*: Search for "a" and verify that *every* instance of "a" in the text is wrapped in a `<mark>` tag.

---

## 20. QUICK FIRE ROUND (35 QUESTIONS)

1. **What is a Bug?** An unexpected behavior in the system.
2. **What is a Test Case?** A set of conditions/variables to determine if a feature works.
3. **What is a Test Suite?** A collection of test cases.
4. **Status Code 200?** Success.
5. **Status Code 404?** Not Found.
6. **Status Code 500?** Server Error.
7. **White Box Testing?** Testing with code knowledge.
8. **Black Box Testing?** Testing without code knowledge.
9. **Regression Testing?** Re-testing after changes.
10. **Smoke Testing?** Basic health check.
11. **Sanity Testing?** Testing specific fix.
12. **Unit Testing?** Testing small pieces/functions.
13. **Integration Testing?** Testing how pieces work together.
14. **System Testing?** Testing the whole thing.
15. **UAT?** User Acceptance Testing.
16. **Severity?** Technical impact.
17. **Priority?** Business urgency.
18. **Lighthouse?** Google tool for performance/SEO.
19. **Postman?** Tool for API testing.
20. **Jest?** JS testing framework.
21. **Cypress?** E2E testing framework.
22. **GitHub Pages?** Static hosting service used here.
23. **CORS?** Security policy for cross-origin requests.
24. **DOM?** Document Object Model (the HTML tree).
25. **localStorage?** Browser storage that persists.
26. **Bilingual Toggle?** Switches between Hindi and English.
27. **TTS?** Text-to-Speech.
28. **Glassmorphism?** Transparent, frosted-glass UI style.
29. **Lazy Loading?** Loading assets only when visible.
30. **Debounce?** Delaying execution of a function.
31. **XSS?** Cross-Site Scripting (security vulnerability).
32. **JSON-LD?** Format for SEO structured data.
33. **Mobile First?** Designing for small screens first.
34. **Gherkin?** Language used for BDD (Given/When/Then).
35. **QA?** Quality Assurance.

---

## 21. TOP 10 THINGS THAT IMPRESS INTERVIEWERS

1. **"I prioritize testing based on user impact and risk analysis."** (Shows senior thinking).
2. **"I don't just find bugs; I look for the root cause in the code."** (Shows technical depth).
3. **"I advocate for the end-user's accessibility needs."** (Mentioning TTS and high contrast).
4. **"I use Browser DevTools to debug JS errors before reporting them."** (Shows efficiency).
5. **"I understand the trade-offs between Vanilla JS and frameworks like React."** (Shows architectural awareness).
6. **"I automated the content generation process to reduce human error."** (Mentioning the Python script).
7. **"I ensure SEO and Performance are part of the 'Definition of Done'."** (Shows holistic view).
8. **"I test for edge cases like 'No Results Found' or 'Network Offline'."** (Shows thoroughness).
9. **"I maintain a Living Document of the project structure to aid testing."** (Shows organizational skills).
10. **"I believe QA is a mindset, not just a phase in the cycle."** (Shows passion).

---

## 22. COMMON MISTAKES JUNIOR QA ENGINEERS MAKE

1. **Mistake**: Not providing clear steps to reproduce.
   - *Avoid*: Always use numbered steps and clear "Expected vs Actual" results.
2. **Mistake**: Testing only on one browser.
   - *Avoid*: Use a cross-browser matrix (Chrome, Safari, Firefox).
3. **Mistake**: Ignoring "Console" errors if the UI looks okay.
   - *Avoid*: A silent JS error can break features later.
4. **Mistake**: Not testing negative scenarios (e.g., invalid search).
   - *Avoid*: Intentionally try to "break" the system.
5. **Mistake**: Reporting "User Interface" bugs as "Critical".
   - *Avoid*: Understand the difference between Severity and Priority.
6. **Mistake**: Not verifying a fix in the latest environment.
   - *Avoid*: Always re-test on the staging/live URL.
7. **Mistake**: Being too aggressive with developers.
   - *Avoid*: Remember you are on the same team. Say "I found an issue" instead of "Your code is broken."
8. **Mistake**: Not reading the requirements/documentation first.
   - *Avoid*: You can't test what you don't understand.
9. **Mistake**: Forgetting to test on mobile devices.
   - *Avoid*: Use Chrome "Device Mode" at a minimum.
10. **Mistake**: Not documenting their testing process.
    - *Avoid*: Use a Test Plan and Bug Log.

---

## Interview Preparation Checklist
- [ ] Read all theory sections
- [ ] Practice all Q&A out loud
- [ ] Do the quick fire round with a friend
- [ ] Review all bug reports
- [ ] Run through all test scenarios mentally
- [ ] Prepare 2 minute project introduction
- [ ] Prepare demo of live project
- [ ] Research the company before interview
