import os
import sys
from pathlib import Path

def read_file(p):
    with open(p, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(p, s):
    Path(p).parent.mkdir(parents=True, exist_ok=True)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(s)

def parse_input(text):
    meta = {}
    body_hi = []
    body_en = []
    shlok = []
    lines = text.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if not line:
            i += 1
            continue
        if line.startswith('[') and line.endswith(']'):
            tag = line[1:-1]
            buf = []
            i += 1
            while i < len(lines) and lines[i].strip() != f'[/{tag}]':
                buf.append(lines[i])
                i += 1
            if tag == 'body_hi':
                body_hi = buf
            elif tag == 'body_en':
                body_en = buf
            elif tag == 'shlok':
                shlok = buf
            i += 1
            continue
        if ':' in line:
            k, v = line.split(':', 1)
            meta[k.strip()] = v.strip()
        i += 1
    return meta, body_hi, body_en, shlok

def html_escape(s):
    return s.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')

def render_issue(meta, body_hi, body_en, shlok):
    title_hi = meta.get('title_hi','')
    title_en = meta.get('title_en','')
    topic_hi = meta.get('topic_hi','')
    youtube_id = meta.get('youtube_id','')
    image = meta.get('image','')
    date = meta.get('date','')
    media_attr = ''
    if youtube_id:
        media_attr = f' data-youtube-id="{html_escape(youtube_id)}"'
    elif image:
        media_attr = f' data-image="{html_escape(image)}"'
    body_hi_html = ''.join([f'<p>{html_escape(x)}</p>' for x in body_hi if x.strip()])
    body_en_html = ''.join([f'<p>{html_escape(x)}</p>' for x in body_en if x.strip()])
    return f'''<!doctype html>
<html lang="hi">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Issue {html_escape(date)} • जय गुरुदेव पत्रिका</title>
    <link rel="stylesheet" href="../../assets/styles.css" />
  </head>
  <body>
    <header class="site-header">
      <div class="brand">
        <div class="brand-line brand-line-1">जय गुरुदेव</div>
        <div class="brand-line brand-line-2">शाकाहारी सदाचारी बाल संघ</div>
        <div class="brand-line brand-line-3">बालक सप्ताहिक पत्रिका</div>
      </div>
      <nav class="site-nav">
        <a href="../../index.html">Home</a>
        <a href="../index.html">All Issues</a>
      </nav>
    </header>
    <main class="layout">
      <section class="controls">
        <div class="lang-toggle" role="group" aria-label="Language">
          <button class="lang-btn" data-lang-select="hi" aria-pressed="true">हिन्दी</button>
          <button class="lang-btn" data-lang-select="en" aria-pressed="false">English</button>
          <button class="lang-btn" data-lang-select="both" aria-pressed="false">Both</button>
        </div>
      </section>
      <section class="grid">
        <article class="card" data-topic="{html_escape(topic_hi)}">
          <header class="card-header">
            <h2 class="title" data-lang="hi">{html_escape(title_hi)}</h2>
            <h2 class="title" data-lang="en">{html_escape(title_en)}</h2>
            <div class="meta">Issue: {html_escape(date)} • Category: {html_escape(topic_hi)}</div>
          </header>
          <div class="media"{media_attr} aria-label="Media"></div>
          <div class="card-body">
            <div class="content" data-lang="hi">{body_hi_html}</div>
            <div class="content" data-lang="en">{body_en_html}</div>
            <div class="actions">
              <button class="tts-btn" data-lang="auto">Listen / सुनें</button>
            </div>
          </div>
        </article>
      </section>
    </main>
    <footer class="site-footer">
      <div class="footer-links">
        <a href="https://www.youtube.com/@satsang_vachan_satsang_seva" target="_blank" rel="noopener noreferrer">YouTube</a>
        <a href="https://www.instagram.com/satsang_vachan_satsang_seva" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="mailto:satsang_vachan_satsang_seva@gmail.com">Email</a>
      </div>
    </footer>
    <script defer src="../../assets/config.js"></script>
    <script defer src="../../assets/script.js"></script>
  </body>
</html>'''

def render_listing(issues_root):
    entries = []
    for d in os.listdir(issues_root):
        p = os.path.join(issues_root, d)
        if os.path.isdir(p) and os.path.isfile(os.path.join(p, 'index.html')):
            entries.append(d)
    entries.sort(reverse=True)
    lis = '\n'.join([f'          <li><a href="{e}/index.html">Issue {e}</a></li>' for e in entries])
    return f'''<!doctype html>
<html lang="hi">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Issues • जय गुरुदेव पत्रिका</title>
    <link rel="stylesheet" href="../assets/styles.css" />
  </head>
  <body>
    <header class="site-header">
      <div class="brand">
        <div class="brand-line brand-line-1">जय गुरुदेव</div>
        <div class="brand-line brand-line-2">शाकाहारी सदाचारी बाल संघ</div>
        <div class="brand-line brand-line-3">बालक सप्ताहिक पत्रिका</div>
      </div>
      <nav class="site-nav">
        <a href="../index.html">Home</a>
      </nav>
    </header>
    <main class="layout">
      <section class="issues-links">
        <h3>Daily Issues</h3>
        <ul>
{lis}
        </ul>
      </section>
    </main>
    <footer class="site-footer">
      <div class="footer-links">
        <a href="https://www.youtube.com/@satsang_vachan_satsang_seva" target="_blank" rel="noopener noreferrer">YouTube</a>
        <a href="https://www.instagram.com/satsang_vachan_satsang_seva" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="mailto:satsang_vachan_satsang_seva@gmail.com">Email</a>
      </div>
    </footer>
    <script defer src="../assets/config.js"></script>
    <script defer src="../assets/script.js"></script>
  </body>
</html>'''

def main():
    if len(sys.argv) < 2:
        print('Usage: python tools/generate_issue.py content/<date>.md')
        sys.exit(1)
    in_path = sys.argv[1]
    text = read_file(in_path)
    meta, body_hi, body_en, shlok = parse_input(text)
    date = meta.get('date','').strip()
    if not date:
        print('Missing date in input')
        sys.exit(1)
    out_dir = os.path.join('issues', date)
    out_html = render_issue(meta, body_hi, body_en, shlok)
    write_file(os.path.join(out_dir, 'index.html'), out_html)
    listing = render_listing('issues')
    write_file(os.path.join('issues', 'index.html'), listing)
    print(f'Generated issues/{date}/index.html')

if __name__ == '__main__':
    main()
