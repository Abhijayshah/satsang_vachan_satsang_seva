type Lang = 'hi' | 'en' | 'both'
type VoicePrefs = { rate: number; pitch: number; voiceHi?: string; voiceEn?: string }

const defaultPrefs: VoicePrefs = { rate: 0.95, pitch: 1 }
let voicesCache: SpeechSynthesisVoice[] = []

function getPrefs(): VoicePrefs {
  try {
    const raw = localStorage.getItem('tts:prefs')
    if (!raw) return { ...defaultPrefs }
    const p = JSON.parse(raw) as VoicePrefs
    return { ...defaultPrefs, ...p }
  } catch { return { ...defaultPrefs } }
}

function setPrefs(p: Partial<VoicePrefs>) {
  const merged = { ...getPrefs(), ...p }
  localStorage.setItem('tts:prefs', JSON.stringify(merged))
}

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

async function webSpeechSpeak(text: string, langHint: Lang) {
  const prefs = getPrefs()
  const utter = new SpeechSynthesisUtterance(sanitizeText(text))
  let langCode = langHint === 'en' ? 'en-IN' : 'hi-IN'
  if (langHint === 'both') langCode = 'hi-IN'
  const voices = voicesCache.length ? voicesCache : speechSynthesis.getVoices()
  const desiredName = langHint === 'en' ? prefs.voiceEn : prefs.voiceHi
  let match: SpeechSynthesisVoice | undefined
  if (desiredName) match = voices.find(v => v.name === desiredName)
  if (!match) match = voices.find(v => v.lang.toLowerCase().startsWith(langCode.toLowerCase()))
  if (match) utter.voice = match
  utter.lang = match?.lang || langCode
  utter.rate = Math.min(1.4, Math.max(0.6, prefs.rate))
  utter.pitch = Math.min(1.3, Math.max(0.7, prefs.pitch))
  speechSynthesis.cancel()
  speechSynthesis.speak(utter)
}

async function remoteSpeak(text: string, langHint: Lang) {
  try {
    const base = (window as any).__API_BASE || ''
    const url = base ? `${base.replace(/\/$/, '')}/api/tts` : '/api/tts'
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, lang: langHint }) })
    if (!res.ok) return false
    const blob = await res.blob()
    const objUrl = URL.createObjectURL(blob)
    const audio = new Audio(objUrl)
    await audio.play()
    return true
  } catch { return false }
}

function initTTS() {
  document.querySelectorAll<HTMLButtonElement>('.tts-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.card') as HTMLElement | null
      const currentLangBtn = document.querySelector<HTMLButtonElement>('.lang-btn[aria-pressed="true"]')
      const langSel = (currentLangBtn?.dataset.langSelect || 'hi') as Lang
      const block = langSel === 'en' ? card?.querySelector<HTMLElement>('.content[data-lang="en"]') : card?.querySelector<HTMLElement>('.content[data-lang="hi"]')
      const text = block?.innerText || card?.innerText || ''
      remoteSpeak(text, langSel).then(done => { if (!done) webSpeechSpeak(text, langSel) })
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
      const titles = Array.from(c.querySelectorAll<HTMLElement>('.title'))
      titles.forEach(t => {
        const orig = t.dataset.orig || t.textContent || ''
        if (!t.dataset.orig) t.dataset.orig = orig
        if (!q) { t.textContent = orig; return }
        const idx = orig.toLowerCase().indexOf(q)
        if (idx >= 0) {
          const before = orig.slice(0, idx)
          const match = orig.slice(idx, idx + q.length)
          const after = orig.slice(idx + q.length)
          t.innerHTML = `${before}<mark>${match}</mark>${after}`
        } else {
          t.textContent = orig
        }
      })
    })
  }
  if (input) { input.addEventListener('input', debounce(run, 150)); run() }
}

function populateVoices() {
  voicesCache = speechSynthesis.getVoices()
  const hiSel = document.getElementById('voiceHi') as HTMLSelectElement | null
  const enSel = document.getElementById('voiceEn') as HTMLSelectElement | null
  if (!hiSel || !enSel) return
  const prefs = getPrefs()
  const hiVoices = voicesCache.filter(v => v.lang.toLowerCase().startsWith('hi'))
  const enVoices = voicesCache.filter(v => v.lang.toLowerCase().startsWith('en'))
  const fill = (sel: HTMLSelectElement, list: SpeechSynthesisVoice[], preferred?: string) => {
    sel.innerHTML = ''
    list.forEach(v => {
      const opt = document.createElement('option')
      opt.value = v.name
      opt.textContent = `${v.name} (${v.lang})`
      if (preferred && v.name === preferred) opt.selected = true
      sel.appendChild(opt)
    })
  }
  fill(hiSel, hiVoices, prefs.voiceHi)
  fill(enSel, enVoices, prefs.voiceEn)
}

function initSettings() {
  const toggle = document.querySelector<HTMLButtonElement>('.settings-toggle')
  const panel = document.getElementById('settingsPanel') as HTMLElement | null
  const rate = document.getElementById('rate') as HTMLInputElement | null
  const pitch = document.getElementById('pitch') as HTMLInputElement | null
  const rateVal = document.getElementById('rateVal') as HTMLElement | null
  const pitchVal = document.getElementById('pitchVal') as HTMLElement | null
  const voiceHi = document.getElementById('voiceHi') as HTMLSelectElement | null
  const voiceEn = document.getElementById('voiceEn') as HTMLSelectElement | null
  const testHi = document.getElementById('testHi') as HTMLButtonElement | null
  const testEn = document.getElementById('testEn') as HTMLButtonElement | null
  const prefs = getPrefs()
  if (rate && rateVal) { rate.value = String(prefs.rate); rateVal.textContent = String(prefs.rate) }
  if (pitch && pitchVal) { pitch.value = String(prefs.pitch); pitchVal.textContent = String(prefs.pitch) }
  toggle?.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true'
    toggle.setAttribute('aria-expanded', String(!expanded))
    if (panel) panel.hidden = expanded
  })
  rate?.addEventListener('input', () => { setPrefs({ rate: Number(rate.value) }); if (rateVal) rateVal.textContent = String(rate.value) })
  pitch?.addEventListener('input', () => { setPrefs({ pitch: Number(pitch.value) }); if (pitchVal) pitchVal.textContent = String(pitch.value) })
  voiceHi?.addEventListener('change', () => setPrefs({ voiceHi: voiceHi.value }))
  voiceEn?.addEventListener('change', () => setPrefs({ voiceEn: voiceEn.value }))
  testHi?.addEventListener('click', () => webSpeechSpeak('नमस्ते, यह परीक्षण है।', 'hi'))
  testEn?.addEventListener('click', () => webSpeechSpeak('Hello, this is a test.', 'en'))
  populateVoices()
  if ('onvoiceschanged' in speechSynthesis) speechSynthesis.onvoiceschanged = populateVoices
}

function init() {
  initLangToggle()
  initTTS()
  initMedia()
  initSearch()
  initSettings()
}

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init) } else { init() }
export {}
