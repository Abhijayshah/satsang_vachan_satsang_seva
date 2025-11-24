Satsang_vachan_satsang_seva    


Nice — I built a complete, GitHub Pages–ready static site plan + ready-to-use code for the newspaper-style patrika you described. It includes:

the three-line header with the exact relative font sizes you requested

newspaper layout (columns, large headlines, smaller body text)

per-article Text→Audio (Web Speech API) buttons (Hindi / English)

YouTube embed preview or replace-with-image option (thumbnail shown)

client-side search across articles (title + body)

instructions + small GitHub Action snippet to auto-create daily issue files (optional)

contact links (YouTube / Instagram / email) already wired in


Below you’ll find the code (3 files + an example article + optional GitHub Action). Copy these into a repo and deploy to GitHub Pages (branch gh-pages or use main + Pages setting). I also included a short structure and usage guide at the end.

(Note: I referenced your uploaded prompt-engineering doc while preparing guidance.) 


---

What to copy into your repo

Create these files at repo root (or inside docs/ if you prefer GitHub Pages from docs/):

1. index.html — homepage / listing of daily issues


2. article-template.html — single-article template (also used as example daily file)


3. assets/css/style.css — styling


4. assets/js/site.js — script for search, audio, embeds, listing


5. issues/list.json — index of issues (managed manually or by action)


6. issues/2025-11-24-issue.html — example issue file




---

1) index.html

<!doctype html>
<html lang="hi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>जय गुरुदेव — बालक सप्ताहिक पत्रिका</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <header class="masthead">
    <div class="title-lines">
      <div class="line line-1">जय गुरुदेव</div>
      <div class="line line-2">शाकाहारी सदाचारी बाल संघ</div>
      <div class="line line-3">बालक सप्ताहिक पत्रिका</div>
    </div>
    <div class="contact">
      <a href="https://www.youtube.com/@satsang_vachan_satsang_seva" target="_blank" rel="noopener">YouTube</a> |
      <a href="https://www.instagram.com/satsang_vachan_satsang_seva" target="_blank" rel="noopener">Instagram</a> |
      <a href="mailto:satsang_vachan_satsang_seva@gmail.com">satsang_vachan_satsang_seva@gmail.com</a>
    </div>
  </header>

  <main class="container">
    <section class="searchbar">
      <input id="q" placeholder="खोजें / Search..." />
      <label for="langToggle">
        <input type="checkbox" id="langToggle" /> Show English
      </label>
    </section>

    <section id="issuesList" class="issues"></section>
  </main>

  <script src="assets/js/site.js"></script>
</body>
</html>


---

2) article-template.html (also example daily file)

<!doctype html>
<html lang="hi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Patrika — 2025-11-24</title>
  <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
  <header class="masthead small">
    <div class="title-lines">
      <div class="line line-1">जय गुरुदेव</div>
      <div class="line line-2">शाकाहारी सदाचारी बाल संघ</div>
      <div class="line line-3">बालक सप्ताहिक पत्रिका — अंक 2025-11-24</div>
    </div>
    <div class="contact">
      <a href="https://www.youtube.com/@satsang_vachan_satsang_seva" target="_blank">YouTube</a> |
      <a href="https://www.instagram.com/satsang_vachan_satsang_seva" target="_blank">Instagram</a> |
      <a href="mailto:satsang_vachan_satsang_seva@gmail.com">Email</a>
    </div>
  </header>

  <main class="container article-page">
    <!-- Example article block -->
    <article class="news-block" data-lang="hi" data-title="शांति पर प्रवचन" data-youtube="dQw4w9WgXcQ">
      <h1 class="headline">शांति पर प्रवचन</h1>
      <h2 class="subtitle">बाबा जयगुरुदेव के विचार</h2>

      <!-- left: image/thumbnail -->
      <aside class="media">
        <!-- Developer may replace the data-image-src attribute with an image url to override youtube thumbnail. -->
        <img class="thumb" alt="thumbnail" src="https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg" />
        <button class="toggle-video" data-video-id="dQw4w9WgXcQ">▶️ Preview Video</button>
      </aside>

      <!-- body text - Hindi and English -->
      <section class="body">
        <p class="body-hi">यहाँ बाबा जयगुरुदेव का प्रवचन संक्षेप में दिया गया है... (हिन्दी में)।</p>
        <p class="body-en" style="display:none;">Here is Baba Jaygurudev's speech summary in English...</p>
      </section>

      <div class="controls">
        <button class="tts-btn" data-voice="hi-IN">🔊 पढ़ें (हिन्दी)</button>
        <button class="tts-btn" data-voice="en-IN">🔊 Read (English)</button>
        <a class="full-article" href="../index.html">Back to Home</a>
      </div>
    </article>
  </main>

  <script src="../assets/js/site.js"></script>
</body>
</html>


---

3) assets/css/style.css

:root{
  --max-width:1100px;
  --line-2-size: clamp(36px, 6vw, 64px); /* biggest */
  --line-1-size: calc(var(--line-2-size) / 2); /* half of second line */
  --line-3-size: calc(var(--line-1-size) / 2); /* half of first line */
  --headline-size: clamp(22px, 3.2vw, 36px);
  --subtitle-size: clamp(16px, 2.2vw, 20px);
  --body-size: 1rem;
}

*{box-sizing:border-box}
body{font-family: "Noto Sans", "Lohit Devanagari", sans-serif;margin:0;color:#111;background:#fff}
.masthead{padding:18px 12px;border-bottom:2px solid #ddd;background:#f8f8f6;text-align:center}
.title-lines{line-height:1}
.title-lines .line-1{font-size:var(--line-1-size);font-weight:700}
.title-lines .line-2{font-size:var(--line-2-size);font-weight:900;letter-spacing:0.6px}
.title-lines .line-3{font-size:var(--line-3-size);font-weight:600;opacity:.95}

.contact{margin-top:8px;font-size:0.9rem}

.container{max-width:var(--max-width);margin:22px auto;padding:0 14px}
.searchbar{display:flex;gap:10px;align-items:center;margin-bottom:16px}
.searchbar input{flex:1;padding:8px;border:1px solid #ccc;border-radius:6px}

.issues .issue-card{border-bottom:1px dashed #ddd;padding:16px 0;display:grid;grid-template-columns:1fr 240px;gap:14px;align-items:start}
.issue-card h3{font-size:var(--headline-size);margin:0 0 6px}
.issue-card p.lead{font-size:var(--subtitle-size);margin:0 0 10px}
.issue-meta{font-size:0.85rem;color:#666}

.news-block{display:grid;grid-template-columns: 1fr 320px;gap:18px;align-items:start;margin-bottom:22px;padding-bottom:18px;border-bottom:1px solid #eee}
.news-block .headline{font-size:var(--headline-size);margin:0 0 6px}
.news-block .subtitle{font-size:var(--subtitle-size);color:#444;margin:0 0 12px}
.media .thumb{width:100%;height:auto;border-radius:6px}
.controls{display:flex;gap:10px;align-items:center;margin-top:10px}
.controls .tts-btn{padding:8px 10px;border-radius:6px;border:1px solid #bbb;background:#fff;cursor:pointer}

.article-page .body{font-size:var(--body-size);line-height:1.6}

/* responsive */
@media (max-width:900px){
  .issues .issue-card, .news-block{grid-template-columns:1fr}
  .media{order:-1}
}


---

4) assets/js/site.js (search, TTS, YouTube preview, dynamic listing)

// site.js - client-side logic: load issues/list.json, render cards, search, tts, youtube preview
document.addEventListener('DOMContentLoaded', init);

async function init(){
  // load issues list
  const listUrl = 'issues/list.json';
  let issues = [];
  try {
    const r = await fetch(listUrl);
    if(!r.ok) throw new Error('no list.json');
    issues = await r.json();
  } catch(e){
    console.warn('Could not load issues list.json:', e);
    issues = []; // proceed empty
  }

  const issuesList = document.getElementById('issuesList');
  if(issuesList){
    if(issues.length === 0){
      issuesList.innerHTML = `<p>No issues found. Add files to <code>issues/</code> and update <code>issues/list.json</code>.</p>`;
    } else {
      issuesList.innerHTML = issues.map(i => renderCard(i)).join('');
      // attach listeners
      attachToggles();
    }
  }

  // search
  const q = document.getElementById('q');
  if(q){
    q.addEventListener('input', ()=>filter(q.value));
  }
  // language toggle: show english blocks on index if page contains them
  const langToggle = document.getElementById('langToggle');
  if(langToggle){
    langToggle.addEventListener('change', e => {
      const enEls = document.querySelectorAll('.body-en');
      enEls.forEach(el => el.style.display = e.target.checked ? 'block' : 'none');
    });
  }

  // global handlers for TTS & YouTube on the page (for single article pages too)
  document.body.addEventListener('click', async (ev) => {
    const t = ev.target;
    if(t.classList.contains('tts-btn')){
      const container = t.closest('.news-block') || t.closest('article') || document;
      const hi = container.querySelector('.body-hi')?.innerText || '';
      const en = container.querySelector('.body-en')?.innerText || '';
      const voicePref = t.getAttribute('data-voice') || 'hi-IN';
      speak(voicePref, (voicePref.startsWith('hi') ? hi : en) || hi || en);
    }
    if(t.classList.contains('toggle-video')){
      const vid = t.getAttribute('data-video-id');
      if(vid){
        const parent = t.closest('article') || t.parentElement;
        const frame = document.createElement('iframe');
        frame.width = "320"; frame.height="180";
        frame.src = `https://www.youtube.com/embed/${vid}?rel=0`;
        frame.setAttribute('allow','accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
        frame.allowFullscreen = true;
        parent.querySelector('.media').innerHTML = '';
        parent.querySelector('.media').appendChild(frame);
      }
    }
  }, false);
}

function renderCard(info){
  // info: {date, title_hi, title_en, excerpt_hi, excerpt_en, file}
  return `
  <article class="issue-card">
    <div>
      <h3>${escapeHtml(info.title_hi || info.title_en || 'Untitled')}</h3>
      <p class="lead">${escapeHtml(info.excerpt_hi || info.excerpt_en || '')}</p>
      <div class="issue-meta">${escapeHtml(info.date)} &nbsp; | &nbsp; <a href="${info.file}">Open</a></div>
    </div>
    <div>
      ${info.thumbnail ? `<img src="${info.thumbnail}" style="width:100%;border-radius:6px" alt="">` : ''}
    </div>
  </article>`;
}

function attachToggles(){
  // ensure any server-rendered thumbnails use YouTube thumb if youtube id present
  document.querySelectorAll('article[data-youtube]').forEach(a=>{
    const id = a.getAttribute('data-youtube');
    const img = a.querySelector('.thumb');
    if(img && (!img.src || img.src.indexOf('img.youtube.com')>-1)){
      img.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    }
  });
}

function filter(q){
  const s = q.trim().toLowerCase();
  document.querySelectorAll('.issue-card').forEach(card=>{
    const text = card.innerText.toLowerCase();
    card.style.display = (text.indexOf(s) !== -1) ? '' : 'none';
  });
}

function speak(voiceTag, text){
  if(!text) return alert('No text to read.');
  if(!('speechSynthesis' in window)) return alert('Text-to-Speech not supported in this browser.');
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  // pick voice heuristically
  const voices = window.speechSynthesis.getVoices();
  const candidate = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(voiceTag.split('-')[0]));
  if(candidate) utter.voice = candidate;
  utter.lang = voiceTag;
  window.speechSynthesis.speak(utter);
}

// small helper
function escapeHtml(s){ return (s||'').replace(/[&<>"']/g, (m)=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[m]); }


---

5) issues/list.json (example)

[
  {
    "date": "2025-11-24",
    "title_hi": "शांति पर प्रवचन — अंक 2025-11-24",
    "excerpt_hi": "बाबा जयगुरुदेव के प्रेरणादायी विचार और संस्मरण।",
    "file": "issues/2025-11-24-issue.html",
    "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
  }
]


---

6) Example issue already included: issues/2025-11-24-issue.html

(see article-template.html above — save it with that filename)


---

Optional: GitHub Action to auto-create a dated issue every day

Place in .github/workflows/create-daily-issue.yml. This is optional; it creates a new issue-file from a simple template on a schedule (you can modify schedule).

name: Create daily issue (template)
on:
  schedule:
    - cron: '0 0 * * *' # daily UTC midnight — customize
  workflow_dispatch:

jobs:
  create-issue:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Create dated issue file
        run: |
          DATE=$(date -u +"%Y-%m-%d")
          FILE="issues/${DATE}-issue.html"
          if [ -f "$FILE" ]; then echo "Issue exists: $FILE"; exit 0; fi
          cat > "$FILE" <<'HTML'
          <!-- minimal template - edit body -->
          <!doctype html><html lang="hi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Issue $DATE</title><link rel="stylesheet" href="../assets/css/style.css"></head><body>
          <header class="masthead small"><div class="title-lines"><div class="line line-1">जय गुरुदेव</div><div class="line line-2">शाकाहारी सदाचारी बाल संघ</div><div class="line line-3">बालक सप्ताहिक पत्रिका — अंक $DATE</div></div></header>
          <main class="container article-page"><article class="news-block" data-lang="hi"><h1 class="headline">शीर्षक यहाँ</h1><p class="body-hi">यहाँ लेख लिखें...</p></article></main>
          </body></html>
          HTML
      - name: Update list.json
        run: |
          python - <<'PY'
          import json,sys,os,datetime
          date = datetime.datetime.utcnow().strftime('%Y-%m-%d')
          listpath = 'issues/list.json'
          if os.path.exists(listpath):
            data = json.load(open(listpath,'r',encoding='utf-8'))
          else:
            data = []
          entry = {"date":date,"title_hi":f"अंक {date}","excerpt_hi":"","file":f"issues/{date}-issue.html"}
          data = [entry] + [e for e in data if e.get('date')!=date]
          json.dump(data, open(listpath,'w',encoding='utf-8'), ensure_ascii=False, indent=2)
          print("Updated list.json")
          PY
      - name: Commit & push
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add issues/
          git commit -m "Create issue $DATE" || echo "no changes"
          git push

> Note: GitHub Actions will need write permissions; review before enabling. The Action above creates a minimal HTML file and updates issues/list.json. You can expand the template to include structure as you like.




---

How to maintain / add new issues

1. Add a new HTML file issues/YYYY-MM-DD-issue.html (use article-template.html as starter).


2. Add an entry at top of issues/list.json (date, title_hi, excerpt_hi, file path, optional thumbnail).


3. Commit & push -> deployed automatically by GitHub Pages.



If you enable the GitHub Action above, it can create the empty dated file and update list.json automatically.


---

Notes & small recommendations

For robust Hindi rendering, include Google/Noto fonts if you want consistent typography. Add <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari&display=swap" rel="stylesheet"> in head and use font-family.

The Web Speech API TTS quality depends on user browser and available voices. For better server-side TTS (higher-quality Hindi/voice options) consider integrating a cloud TTS and pre-generating audio files.

YouTube thumbnails are fetched via https://img.youtube.com/vi/VIDEOID/hqdefault.jpg. If you want to replace thumbnail with your own image, set data-image-src or edit the <img> src in the issue file.

To support Sanskrit slokas, place them in <p class="body-hi"> (or separate .slok style) and include proper unicode; you can style slok lines differently.



---

Quick deployment checklist

1. Put files above in repo (root or docs/).


2. Enable GitHub Pages: Repository → Settings → Pages → choose branch (e.g. main / gh-pages) and root (or /docs).


3. Push. Visit https://<username>.github.io/<repo>/ to view.




---

If you want, I can now:

produce a complete ZIP of these files ready to drop into a repo (I can create the files here for you to copy), or

generate a slightly fancier printable template for each article (multi-column newspaper layout with CSS columns), or

add server-side suggestions (better TTS, RSS generation, i18n switching UI).


Tell me which of the three you want next and I’ll produce the files (no waiting — I'll deliver them immediately).
