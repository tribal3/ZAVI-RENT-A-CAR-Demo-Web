import puppeteer from 'puppeteer-core'
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const URL = 'http://localhost:4173/'
const OUT = '.tmp/shots'

await mkdir(OUT, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars'],
})

const consoleErrors = []

async function openPage(width, height, opts = {}) {
  const page = await browser.newPage()
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`${opts.name}: ${msg.text()}`)
  })
  page.on('pageerror', (err) => consoleErrors.push(`${opts.name}: ${err.message}`))
  await page.setViewport({ width, height, deviceScaleFactor: 1 })
  if (opts.lang) {
    await page.evaluateOnNewDocument((lang) => {
      localStorage.setItem('zavi-language', lang)
    }, opts.lang)
  }
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 })
  await page.evaluate(() => document.fonts.ready)
  await new Promise((r) => setTimeout(r, 700))
  return page
}

async function metrics(page) {
  return page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    dir: document.documentElement.dir,
    lang: document.documentElement.lang,
    title: document.title,
    cards: document.querySelectorAll('.car-card').length,
    sections: [...document.querySelectorAll('main > section, main > div')].map(
      (el) => el.id || el.className,
    ),
  }))
}

async function splitAndSave(buffer, name) {
  const image = sharp(buffer)
  const meta = await image.metadata()
  const chunk = 1700
  let index = 0
  for (let top = 0; top < meta.height; top += chunk) {
    const height = Math.min(chunk, meta.height - top)
    await sharp(buffer)
      .extract({ left: 0, top, width: meta.width, height })
      .resize({ width: 1200 })
      .png()
      .toFile(`${OUT}/${name}-${index}.png`)
    index += 1
  }
  console.log(name, 'height', meta.height, 'chunks', index)
}

// Desktop English
const desktop = await openPage(1440, 1000, { name: 'desktop' })
const desktopBuffer = await desktop.screenshot({ fullPage: true })
await sharp(desktopBuffer).toFile(`${OUT}/desktop-full.png`)
await splitAndSave(desktopBuffer, 'desktop')
console.log('desktop metrics', await metrics(desktop))

// Interaction checks on desktop
const interactions = await desktop.evaluate(() => {
  const chips = [...document.querySelectorAll('.chip')]
  const suv = chips.find((c) => c.textContent?.includes('SUV'))
  suv?.click()
  const counts = {
    afterSuv: document.querySelectorAll('.car-card').length,
  }
  return counts
})
await new Promise((r) => setTimeout(r, 400))
const cardCounts = await desktop.evaluate(() => ({
  suvCards: document.querySelectorAll('.car-card').length,
  firstCard: document.querySelector('.car-card h3')?.textContent,
}))

// Enquire from a card -> contact prefill
await desktop.evaluate(() => document.querySelector('.car-card__action')?.click())
await new Promise((r) => setTimeout(r, 700))
const prefill = await desktop.evaluate(() => {
  const banner = document.querySelector('.contact-form__prefill')
  return {
    banner: banner?.textContent?.trim(),
    category: document.querySelector('#contact-category')?.value,
    scrolled: window.scrollY > 2000,
  }
})

// Invalid submit
await desktop.evaluate(() => {
  document.querySelector('.contact-form')?.dispatchEvent(
    new Event('submit', { bubbles: true, cancelable: true }),
  )
})
await new Promise((r) => setTimeout(r, 300))
const errorCount = await desktop.evaluate(
  () => document.querySelectorAll('.form-error').length,
)

// Fill valid and submit
await desktop.evaluate(() => {
  const set = (selector, value) => {
    const el = document.querySelector(selector)
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value',
    ).set
    setter.call(el, value)
    el.dispatchEvent(new Event('input', { bubbles: true }))
  }
  set('#contact-name', 'Demo Guest')
  set('#contact-phone', '+968 9000 0000')
  set('#contact-pickup', '2026-11-05')
  set('#contact-return', '2026-11-09')
  document.querySelector('.contact-form')?.dispatchEvent(
    new Event('submit', { bubbles: true, cancelable: true }),
  )
})
await new Promise((r) => setTimeout(r, 400))
const success = await desktop.evaluate(() => {
  const panel = document.querySelector('.success')
  return {
    visible: Boolean(panel),
    title: document.querySelector('.success h4')?.textContent,
    body: document.querySelector('.success > p')?.textContent,
    whatsapp: document.querySelector('.success__actions a')?.getAttribute('href')?.slice(0, 80),
  }
})
await desktop.screenshot({ path: `${OUT}/desktop-contact-success.png` })

// Arabic
const arabic = await openPage(1440, 1000, { name: 'arabic', lang: 'ar' })
const arabicBuffer = await arabic.screenshot({ fullPage: true })
await splitAndSave(arabicBuffer, 'arabic')
console.log('arabic metrics', await metrics(arabic))
const rtl = await arabic.evaluate(() => {
  const hero = document.querySelector('.hero__content')?.getBoundingClientRect()
  const media = document.querySelector('.hero__media')?.getBoundingClientRect()
  const nav = document.querySelector('.logo')?.getBoundingClientRect()
  return {
    heroLeft: hero?.left,
    heroRight: hero?.right,
    mediaLeft: media?.left,
    logoLeft: nav?.left,
    font: getComputedStyle(document.body).fontFamily,
  }
})

// Tablet English
const tablet = await openPage(834, 1112, { name: 'tablet' })
await tablet.screenshot({ path: `${OUT}/tablet-top.png` })
await tablet.evaluate(() => document.querySelector('#fleet')?.scrollIntoView())
await new Promise((r) => setTimeout(r, 500))
await tablet.screenshot({ path: `${OUT}/tablet-fleet.png` })
console.log('tablet metrics', await metrics(tablet))

// Mobile English
const mobile = await openPage(390, 844, { name: 'mobile' })
await mobile.screenshot({ path: `${OUT}/mobile-top.png` })
const mobileMetrics = await metrics(mobile)
await mobile.evaluate(() => document.querySelector('.menu-btn')?.click())
await new Promise((r) => setTimeout(r, 300))
const menuOpen = await mobile.evaluate(() => ({
  expanded: document.querySelector('.menu-btn')?.getAttribute('aria-expanded'),
  visible: !document.querySelector('#mobile-menu')?.hasAttribute('hidden'),
  overflow: document.body.style.overflow,
}))
await mobile.screenshot({ path: `${OUT}/mobile-menu.png` })
await mobile.evaluate(() => document.querySelector('.menu-btn')?.click())
await mobile.evaluate(() => document.querySelector('#fleet')?.scrollIntoView())
await new Promise((r) => setTimeout(r, 500))
await mobile.screenshot({ path: `${OUT}/mobile-fleet.png` })
await mobile.evaluate(() => document.querySelector('#contact')?.scrollIntoView())
await new Promise((r) => setTimeout(r, 500))
await mobile.screenshot({ path: `${OUT}/mobile-contact.png` })
const mobileBuffer = await mobile.screenshot({ fullPage: true })
await sharp(mobileBuffer).toFile(`${OUT}/mobile-full.png`)

console.log('interactions', interactions, cardCounts)
console.log('prefill', prefill)
console.log('errorCount', errorCount)
console.log('success', success)
console.log('rtl', rtl)
console.log('mobile', mobileMetrics, menuOpen)
console.log('consoleErrors', consoleErrors)

await browser.close()
