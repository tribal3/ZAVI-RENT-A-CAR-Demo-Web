import puppeteer from 'puppeteer-core'
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const URL = 'http://localhost:4173/'
const OUT = '.tmp/shots2'
await mkdir(OUT, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars'],
})

const errors = []

async function newPage(width, height, lang = 'en') {
  const context = await browser.createBrowserContext()
  const page = await context.newPage()
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  page.on('pageerror', (err) => errors.push(err.message))
  await page.setViewport({ width, height, deviceScaleFactor: 1 })
  await page.evaluateOnNewDocument((l) => {
    localStorage.setItem('zavi-language', l)
  }, lang)
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 })
  await page.addStyleTag({
    content: 'html{scroll-behavior:auto!important} .whatsapp-fab{display:none!important}',
  })
  await page.evaluate(() => document.fonts.ready)
  await loadImages(page)
  return { page, context }
}

async function loadImages(page) {
  await page.evaluate(async () => {
    document.querySelectorAll('img').forEach((img) => {
      img.loading = 'eager'
    })
    const height = document.documentElement.scrollHeight
    for (let y = 0; y < height; y += 500) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 60))
    }
    window.scrollTo(0, 0)
    await Promise.all(
      [...document.images].map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.onload = resolve
              img.onerror = resolve
            }),
      ),
    )
    await new Promise((r) => setTimeout(r, 400))
  })
}

async function shot(page, selector, name) {
  const el = await page.$(selector)
  if (!el) {
    console.log('missing selector', selector)
    return
  }
  const buffer = await el.screenshot()
  await sharp(buffer).resize({ width: 1200 }).jpeg({ quality: 80 }).toFile(`${OUT}/${name}.jpg`)
}

// ---------- English desktop ----------
const { page: desktop } = await newPage(1440, 1000, 'en')
await pageShot(desktop, 'desktop')

// search flow
await desktop.evaluate(() => {
  const select = document.querySelector('#search-category')
  const setter = Object.getOwnPropertyDescriptor(
    window.HTMLSelectElement.prototype,
    'value',
  ).set
  setter.call(select, 'family')
  select.dispatchEvent(new Event('change', { bubbles: true }))
  document.querySelector('.booking-panel').dispatchEvent(
    new Event('submit', { bubbles: true, cancelable: true }),
  )
})
await new Promise((r) => setTimeout(r, 900))
const searchResult = await desktop.evaluate(() => ({
  cards: document.querySelectorAll('.car-card').length,
  activeChip: document.querySelector('.chip.is-active')?.textContent,
  result: document.querySelector('.fleet__result')?.textContent,
  scrollY: Math.round(window.scrollY),
  fleetTop: Math.round(document.querySelector('#fleet').getBoundingClientRect().top),
}))

// RTL toggle by clicking
await desktop.evaluate(() => {
  window.scrollTo(0, 0)
  document.querySelector('.lang-switch button[lang="ar"]')?.click()
})
await new Promise((r) => setTimeout(r, 500))
const toggledRtl = await desktop.evaluate(() => ({
  dir: document.documentElement.dir,
  lang: document.documentElement.lang,
  heroRight: Math.round(
    document.querySelector('.hero__content').getBoundingClientRect().right,
  ),
  mediaLeft: Math.round(document.querySelector('.hero__media').getBoundingClientRect().left),
  title: document.title,
}))
await loadImages(desktop)
await pageShot(desktop, 'arabic-toggle')
await desktop.evaluate(() =>
  document.querySelector('.lang-switch button[lang="en"]')?.click(),
)

// ---------- English mobile ----------
const { page: mobile } = await newPage(390, 844, 'en')
await mobile.screenshot({ path: `${OUT}/mobile-top.png` })
await mobile.evaluate(() => document.querySelector('#fleet')?.scrollIntoView())
await mobile.screenshot({ path: `${OUT}/mobile-fleet.png` })
await mobile.evaluate(() => document.querySelector('.car-card')?.scrollIntoView())
await mobile.screenshot({ path: `${OUT}/mobile-card.png` })
await mobile.evaluate(() => document.querySelector('#about')?.scrollIntoView())
await mobile.screenshot({ path: `${OUT}/mobile-about.png` })
await mobile.evaluate(() => document.querySelector('#contact')?.scrollIntoView())
await mobile.screenshot({ path: `${OUT}/mobile-contact.png` })
await mobile.evaluate(() => document.querySelector('.contact-form')?.scrollIntoView())
await mobile.screenshot({ path: `${OUT}/mobile-form.png` })
await mobile.evaluate(() => document.querySelector('.menu-btn')?.click())
await new Promise((r) => setTimeout(r, 250))
await mobile.screenshot({ path: `${OUT}/mobile-menu.png` })

// ---------- Tablet ----------
const { page: tablet } = await newPage(834, 1112, 'en')
await tablet.evaluate(() => document.querySelector('#fleet')?.scrollIntoView())
await tablet.screenshot({ path: `${OUT}/tablet-fleet.png` })
await tablet.evaluate(() => document.querySelector('#explore')?.scrollIntoView())
await tablet.screenshot({ path: `${OUT}/tablet-explore.png` })

// ---------- Overflow checks ----------
const { page: overflow } = await newPage(1440, 900, 'en')
const widths = [360, 390, 414, 768, 834, 1024, 1180, 1280, 1440]
const overflowResults = []
for (const width of widths) {
  await overflow.setViewport({ width, height: 900 })
  await new Promise((r) => setTimeout(r, 200))
  const result = await overflow.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }))
  overflowResults.push({ width, ...result, overflow: result.scrollWidth > result.innerWidth })
}
await overflow.evaluate(() =>
  document.querySelector('.lang-switch button[lang="ar"]')?.click(),
)
const rtlWidths = []
for (const width of [390, 834, 1440]) {
  await overflow.setViewport({ width, height: 900 })
  await new Promise((r) => setTimeout(r, 200))
  rtlWidths.push(
    await overflow.evaluate(() => ({
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
    })),
  )
}

console.log('search', searchResult)
console.log('toggledRtl', toggledRtl)
console.log('overflow', overflowResults)
console.log('rtlWidths', rtlWidths)
console.log('errors', errors)

await browser.close()

async function pageShot(page, name) {
  const buffer = await page.screenshot({ fullPage: true })
  await sharp(buffer).resize({ width: 1200 }).jpeg({ quality: 80 }).toFile(`${OUT}/${name}-full.jpg`)
  const meta = await sharp(buffer).metadata()
  const chunk = 2000
  let index = 0
  for (let top = 0; top < meta.height; top += chunk) {
    const height = Math.min(chunk, meta.height - top)
    await sharp(buffer)
      .extract({ left: 0, top, width: meta.width, height })
      .resize({ width: 1150 })
      .jpeg({ quality: 80 })
      .toFile(`${OUT}/${name}-${index}.jpg`)
    index += 1
  }
  console.log(name, 'full height', meta.height, 'chunks', index)
}
