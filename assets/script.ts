type Lang = 'hi' | 'en' | 'both'

function setLang(lang: Lang) {
  const buttons = document.querySelectorAll<HTMLButtonElement>('.lang-btn')
  buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.langSelect === lang)))
  const hiEls = document.querySelectorAll<HTMLElement>('[data-lang="hi"]')
  const enEls = document.querySelectorAll<HTMLElement>('[data-lang="en"]')
  if (lang === 'both') { hiEls.forEach(e => e.style.display = ''); enEls.forEach(e => e.style.display = '') }
  if (lang === 'hi') { hiEls.forEach(e => e.style.display = ''); enEls.forEach(e => e.style.display = 'none') }
  if (lang === 'en') { hiEls.forEach(e => e.style.display = 'none'); enEls.forEach(e => e.style.display = '') }
}

function initLangToggle() {
  document.querySelectorAll<HTMLButtonElement>('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.langSelect as Lang))
  })
  setLang('hi')
}

function sanitizeText(t: string): string {
  return t.replace(/[\u0000-\u001F\u007F]/g, ' ').trim()
}

async function speak(text: string, langHint: Lang) {
  const utter = new SpeechSynthesisUtterance(sanitizeText(text))
  let langCode = langHint === 'en' ? 'en-IN' : 'hi-IN'
  if (langHint === 'both') langCode = 'hi-IN'
  const voices = speechSynthesis.getVoices()
  const match = voices.find(v => v.lang.toLowerCase().startsWith(langCode.toLowerCase()))
  if (match) utter.voice = match
  utter.lang = match?.lang || langCode
  utter.rate = 0.95
  speechSynthesis.cancel()
  speechSynthesis.speak(utter)
}

function initTTS() {
  document.querySelectorAll<HTMLButtonElement>('.tts-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.card')
      const currentLangBtn = document.querySelector<HTMLButtonElement>('.lang-btn[aria-pressed="true"]')
      const langSel = (currentLangBtn?.dataset.langSelect || 'hi') as Lang
      const block = langSel === 'en' ? card?.querySelector<HTMLElement>('.content[data-lang="en"]') : card?.querySelector<HTMLElement>('.content[data-lang="hi"]')
      const text = block?.innerText || card?.innerText || ''
      speak(text, langSel)
    })
  })
}

function createYouTubeEmbed(el: HTMLElement, id: string) {
  const iframe = document.createElement('iframe')
  iframe.width = '100%'
  iframe.height = '100%'
  iframe.src = `https://www.youtube.com/embed/${encodeURIComponent(id)}`
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
  iframe.referrerPolicy = 'strict-origin-when-cross-origin'
  iframe.loading = 'lazy'
  iframe.title = 'YouTube video'
  el.appendChild(iframe)
}

function createImage(el: HTMLElement, src: string) {
  const img = new Image()
  img.src = src
  img.alt = 'Related image'
  img.loading = 'lazy'
  img.style.width = '100%'
  img.style.height = '100%'
  img.style.objectFit = 'cover'
  el.appendChild(img)
}

function initMedia() {
  document.querySelectorAll<HTMLElement>('.media').forEach(el => {
    const yt = el.getAttribute('data-youtube-id')
    const img = el.getAttribute('data-image')
    if (yt) { createYouTubeEmbed(el, yt) }
    else if (img) { createImage(el, img) }
  })
}

function debounce<T extends (...args: any[]) => void>(fn: T, delay = 200) {
  let t: number | undefined
  return (...args: Parameters<T>) => {
    window.clearTimeout(t)
    t = window.setTimeout(() => fn(...args), delay)
  }
}

function initSearch() {
  const input = document.getElementById('searchInput') as HTMLInputElement | null
  const cards = Array.from(document.querySelectorAll<HTMLElement>('.card'))
  const run = () => {
    const q = (input?.value || '').toLowerCase().trim()
    cards.forEach(c => {
      const text = (c.innerText || '').toLowerCase()
      c.style.display = q && !text.includes(q) ? 'none' : ''
    })
  }
  if (input) { input.addEventListener('input', debounce(run, 150)); run() }
}

function init() {
  initLangToggle()
  initTTS()
  initMedia()
  initSearch()
}

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init) } else { init() }
